/**
 * The momentum layer.
 *
 * The star's vertex shader is stateless by construction: every particle's
 * position is a pure function of aDir, aHash, time and the audio uniforms.
 * That is why it can be 108k points and cost nothing, and also why it can
 * never have inertia. Nothing survives a frame, so nothing can carry
 * velocity, so a swipe can only push matter while the hand is there and
 * the matter snaps back the instant it leaves.
 *
 * This module adds the missing state, and only that. It runs a GPGPU
 * ping-pong over two float render targets and produces, per particle, a
 * DISPLACEMENT OFFSET in cluster-local space. The render side keeps
 * computing its target pose exactly as it does today and adds the offset
 * at the end. Audio reactivity, dissect, tiers, grab and mix are all
 * untouched: the sim never sees them and never needs to.
 *
 * Reading it back on the render side:
 *
 *   uniform sampler2D uOffset;
 *   uniform float uSimSize;
 *   attribute float aIndex;              // 0..count-1, one per particle
 *   ...
 *   vec2 suv = (vec2(mod(aIndex, uSimSize), floor(aIndex / uSimSize)) + 0.5) / uSimSize;
 *   vec4 sim = texture2D(uOffset, suv);
 *   p += sim.xyz;                        // momentum on top of the pose
 *   vGlow += sim.w * 0.18;               // fast matter burns brighter
 */

import * as THREE from 'three'

/**
 * Ashima 3D simplex noise, copied verbatim from scene.ts rather than
 * imported: SNOISE there is a module-private const and exporting it would
 * mean editing the file this module exists to leave alone.
 */
const SNOISE = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`

/** A fullscreen triangle, so there is no diagonal seam and no wasted quad
 *  half. Positions are already in clip space and the vertex shader writes
 *  them straight through, so the camera is a formality three insists on. */
const SIM_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

/** Shared preamble. highp is not optional: on any GPU that maps mediump to
 *  16-bit floats, integrating a 0.016s step into a position of order 1.0
 *  quantises the increment away entirely and the sim silently freezes. */
const SIM_HEAD = /* glsl */ `
  precision highp float;
  uniform sampler2D uOff;
  uniform sampler2D uVel;
  uniform sampler2D uBase;
  uniform vec3 uHand;
  uniform vec3 uHandVel;
  uniform float uHandStr;
  uniform float uDt;
  uniform float uTime;
  uniform float uStiff;
  uniform float uDamp;
  uniform float uPush;
  uniform float uDrag;
  uniform float uRadius;
  uniform float uCurl;
  uniform float uSwirl;
  uniform vec3 uViewAxis;
  uniform float uMaxOff;
  uniform float uMaxVel;
  varying vec2 vUv;
`

const VEL_FRAG = /* glsl */ `
  ${SIM_HEAD}
  __SNOISE__

  void main() {
    vec4 b = texture2D(uBase, vUv);
    // The base texture's alpha is the liveness flag. 108k particles live in
    // a 512x512 grid, so 154k slots are padding: they must integrate to
    // nothing or they show up as a bright band of garbage the moment the
    // render side samples an index it does not own. The flag is called
    // alive and not active because active is a RESERVED WORD in GLSL ES
    // and the only symptom is a link failure and a black sim.
    float alive = b.w;
    vec3 o = texture2D(uOff, vUv).xyz;
    vec3 v = texture2D(uVel, vUv).xyz;

    // PER-PARTICLE MASS, and it is what separates matter from a membrane.
    //
    // Every particle answering one push identically is a rubber sheet: the
    // field deforms and recovers as a single surface, which is legible as
    // a shape and not as a crowd of things with their own weight. Real
    // matter answers unevenly -- the light ones fling and the heavy ones
    // barely shift, and the SPREAD is the inertia cue.
    //
    // Hashed off the texel rather than an attribute: the sim has no
    // per-particle buffer of its own, and this is stable across frames
    // because vUv is.
    float mh = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    // roughly 3:1 between lightest and heaviest
    float invMass = mix(0.55, 1.8, mh);

    // The spring that makes this a momentum layer rather than a deformation:
    // rest is the pose the existing shader already computed, and the offset
    // is always being pulled back to zero.
    vec3 F = -uStiff * o - uDamp * v;

    // Distance is measured from where the particle actually IS, rest plus
    // its current offset. Measuring from rest alone lets the hand keep
    // pumping matter it has already thrown clear of the radius.
    vec3 p = b.xyz + o;

    float w = 0.0;
    if (uHandStr > 0.001) {
      vec3 d = p - uHand;
      float dist = length(d);
      // COMPACT SUPPORT, the same law the hover field in scene.ts follows:
      // past uRadius the weight is exactly zero, so touching the near side
      // cannot make the far limb flinch. An exponential leaks, and a field
      // that never quite reaches zero is a field the whole star feels.
      float x = clamp(1.0 - dist / max(uRadius, 1e-4), 0.0, 1.0);
      w = x * x * (3.0 - 2.0 * x) * uHandStr;
      vec3 dir = d / max(dist, 1e-4);
      F += dir * (w * uPush);
      // THE SWIRL, and it is the reason this reads as mass at all.
      //
      // Pure radial push is a bubble: matter leaves along the line you
      // pushed it and comes straight back down the same line, which the
      // eye reads as a deformation rather than as something with inertia.
      // A tangential component makes it ORBIT the hand instead, and an
      // orbit is the one motion that cannot be mistaken for a spring.
      //
      // Around the view axis, not an arbitrary one: the axis is handed in
      // already rotated into cluster space, so the curl is around what you
      // are looking down and the swirl reads on screen rather than at some
      // angle into the depth you cannot see.
      vec3 tang = cross(uViewAxis, dir);
      float tl = length(tang);
      if (tl > 1e-4) F += (tang / tl) * (w * uPush * uSwirl);
      // The wake. Pure radial repulsion gives a bubble that follows the
      // hand and nothing else; dragging along the hand's own velocity is
      // what makes a fast swipe carry matter with it and leave a trail.
      F += uHandVel * (w * uDrag);
    }

    // Turbulence, gated on how disturbed this particle already is. Gating
    // on displacement rather than on the hand is what keeps the SETTLE
    // curved instead of a clean radial collapse, and it also guarantees the
    // field is identically zero at rest, so an untouched star cannot drift.
    float stir = min(1.0, length(o) * 8.0 + w);
    if (stir > 0.0) {
      vec3 q = p * 2.7 + vec3(0.0, uTime * 0.35, uTime * 0.21);
      vec3 n = vec3(snoise(q), snoise(q + 19.19), snoise(q + 43.77));
      // Curl-STYLE, not curl. A true curl needs twelve noise taps for the
      // finite differences and we are paying per fragment at 262k of them.
      // Crossing a three-tap vector field with the radial direction buys
      // the property that actually matters here: the force is tangential,
      // so it bends the return path without fighting the spring head on.
      F += cross(n, normalize(p + vec3(1e-4))) * (uCurl * 1.2 * stir);
    }

    // Semi-implicit Euler: velocity first, and the offset pass then
    // integrates with the NEW velocity. Explicit Euler on a spring this
    // stiff gains energy every step and walks itself apart in seconds.
    // a = F/m, so the light ones leap and the heavy ones lean
    v += F * invMass * uDt;
    float s = length(v);
    if (s > uMaxVel) v *= uMaxVel / s;
    gl_FragColor = vec4(v * alive, 0.0);
  }
`

const OFF_FRAG = /* glsl */ `
  ${SIM_HEAD}

  void main() {
    float alive = texture2D(uBase, vUv).w;
    vec3 o = texture2D(uOff, vUv).xyz;
    vec3 v = texture2D(uVel, vUv).xyz;
    o += v * uDt;
    // Hard ceiling on the offset. dt is already clamped on the CPU, but a
    // sustained hand plus a tuning the owner dialled past stability can
    // still walk a particle out of the frame, and one escaped particle is
    // a visible streak across the whole plate.
    float m = length(o);
    if (m > uMaxOff) o *= uMaxOff / m;
    // Alpha carries speed so the render side can brighten fast matter
    // without a second texture fetch.
    gl_FragColor = vec4(o * alive, length(v) * alive);
  }
`

type Tuning = {
  stiffness?: number
  damping?: number
  /** tangential force as a multiple of the radial one; 0 is pure push */
  swirl?: number
  push?: number
  radius?: number
  curl?: number
}

/**
 * Defaults, and why.
 *
 * stiffness 34 puts the natural frequency at 5.83 rad/s, a 1.08s period,
 * which is the register the rest of the instrument already moves in (the
 * dissect spring runs omega 7, the audio envelopes 9 to 16).
 *
 * damping 6.5 is a damping ratio of 0.56: underdamped on purpose, so a
 * released swipe overshoots about a tenth of its throw and comes back.
 * Critically damped matter reads as syrup, and this is supposed to read
 * as matter.
 *
 * push 4.5 divided by stiffness is a 0.13 steady displacement at the
 * hand's centre, which is deliberately the same order as the existing
 * hover field's uR * 0.17. The two forces sit on top of each other and
 * one must not swamp the other.
 *
 * radius 0.34 is exactly the hover field's radius in scene.ts. Two fields
 * with different reach around one hand reads as two hands.
 *
 * curl 1 is a scale on an internal 1.2, small next to the spring's 34 so
 * turbulence can only bend the return, never drive it.
 */
const DEFAULTS = { stiffness: 7, damping: 1.9, push: 5.5, radius: 0.34, curl: 1, swirl: 1.2 }

/** A tab restored from the background hands over a dt of whole seconds,
 *  and one such frame at these constants is enough to throw every particle
 *  past the clamp at once, which reads as the star detonating. Two frames
 *  of catch-up is the most this sim will ever accept. */
const MAX_DT = 1 / 30

/** Ceilings the physics is not allowed to cross, in cluster-local units.
 *  The body's resting photosphere is about 0.53, so 0.42 of offset is far
 *  past anything the tuning should produce: this is a safety net, not a
 *  design value. */
const MAX_OFF = 0.42
const MAX_VEL = 14

/** A pointer that jumps across the canvas, or one whose first sample lands
 *  after a stall, reports a velocity of tens of units per second. Fed to
 *  the drag term that is an impulse nothing recovers from gracefully. */
const MAX_HAND_VEL = 6

export class ParticleSim {
  private renderer: THREE.WebGLRenderer
  private count: number
  private size: number
  private scene = new THREE.Scene()
  /** Positions are written straight to clip space, so this camera only
   *  exists because renderer.render demands one. */
  private cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private quad: THREE.Mesh
  private geo: THREE.BufferGeometry
  private velMat: THREE.ShaderMaterial
  private offMat: THREE.ShaderMaterial
  private uniforms: Record<string, THREE.IUniform>
  private baseTex: THREE.DataTexture
  private offRT: THREE.WebGLRenderTarget[] = []
  private velRT: THREE.WebGLRenderTarget[] = []
  private cur = 0
  private time = 0
  /** Set false when the GPU cannot render to a float target at all. The
   *  sim then hands back a 1x1 black texture and every particle reads an
   *  offset of zero, which is precisely today's behaviour. Degrading to
   *  the old star is the correct failure. */
  private live = true
  private dead: THREE.DataTexture
  private clearColor = new THREE.Color()

  constructor(renderer: THREE.WebGLRenderer, count: number, base: Float32Array) {
    this.renderer = renderer
    this.count = count

    // Next power of two whose area covers the count. 108000 lands on 512.
    // Power of two rather than a snug rectangle because non-POT float
    // targets are the sort of thing that works on the machine you test on.
    let size = 1
    while (size * size < count) size *= 2
    this.size = size

    // The rest pose, one texel per particle, alpha as the liveness flag.
    // Float32 regardless of what the render targets end up being: this is
    // a sampled texture, not a rendered one, so RGBA32F is always legal in
    // WebGL2 and there is no reason to give up precision on the one value
    // every force is measured against.
    const baseData = new Float32Array(size * size * 4)
    for (let i = 0; i < count; i++) {
      baseData[i * 4] = base[i * 3]
      baseData[i * 4 + 1] = base[i * 3 + 1]
      baseData[i * 4 + 2] = base[i * 3 + 2]
      baseData[i * 4 + 3] = 1
    }
    this.baseTex = new THREE.DataTexture(baseData, size, size, THREE.RGBAFormat, THREE.FloatType)
    this.baseTex.minFilter = THREE.NearestFilter
    this.baseTex.magFilter = THREE.NearestFilter
    this.baseTex.wrapS = THREE.ClampToEdgeWrapping
    this.baseTex.wrapT = THREE.ClampToEdgeWrapping
    this.baseTex.generateMipmaps = false
    this.baseTex.needsUpdate = true

    this.dead = new THREE.DataTexture(new Float32Array(4), 1, 1, THREE.RGBAFormat, THREE.FloatType)
    this.dead.needsUpdate = true

    // Half float first: it halves the bandwidth of four full-screen 512x512
    // targets and its ~3 significant digits are plenty for an offset that
    // never exceeds 0.42. Full float is the fallback for a context that
    // exposes EXT_color_buffer_float but not the half-float variant. If
    // neither is renderable the sim shuts itself off rather than writing
    // into an 8-bit target, where the offsets would quantise into visible
    // stair-stepping and negative values would clip to zero outright.
    const ext = renderer.extensions
    const halfOk = ext.has('EXT_color_buffer_half_float') || ext.has('EXT_color_buffer_float')
    const floatOk = ext.has('EXT_color_buffer_float')
    const type = halfOk ? THREE.HalfFloatType : THREE.FloatType
    this.live = halfOk || floatOk

    const mk = () =>
      new THREE.WebGLRenderTarget(size, size, {
        type,
        format: THREE.RGBAFormat,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: false,
      })
    if (this.live) {
      this.offRT = [mk(), mk()]
      this.velRT = [mk(), mk()]
    }

    this.uniforms = {
      uOff: { value: null },
      uVel: { value: null },
      uBase: { value: this.baseTex },
      uHand: { value: new THREE.Vector3() },
      uHandVel: { value: new THREE.Vector3() },
      uHandStr: { value: 0 },
      uDt: { value: 0 },
      uTime: { value: 0 },
      uStiff: { value: DEFAULTS.stiffness },
      uDamp: { value: DEFAULTS.damping },
      uPush: { value: DEFAULTS.push },
      // Drag is not on the tuning API on purpose: a wake that does not
      // scale with the push it comes from reads as two unrelated effects.
      uDrag: { value: DEFAULTS.push * 0.5 },
      uRadius: { value: DEFAULTS.radius },
      uCurl: { value: DEFAULTS.curl },
      uSwirl: { value: DEFAULTS.swirl },
      uViewAxis: { value: new THREE.Vector3(0, 0, 1) },
      uMaxOff: { value: MAX_OFF },
      uMaxVel: { value: MAX_VEL },
    }

    this.geo = new THREE.BufferGeometry()
    this.geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3))
    this.geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2))
    const matOpts = { depthTest: false, depthWrite: false }
    this.velMat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: SIM_VERT,
      fragmentShader: VEL_FRAG.replace('__SNOISE__', SNOISE),
      ...matOpts,
    })
    this.offMat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: SIM_VERT,
      fragmentShader: OFF_FRAG,
      ...matOpts,
    })
    this.quad = new THREE.Mesh(this.geo, this.velMat)
    // The triangle's bounding sphere sits outside a unit ortho frustum, so
    // three culls it and the sim renders nothing at all while every uniform
    // looks correct. Costs an hour to find, one line to prevent.
    this.quad.frustumCulled = false
    this.scene.add(this.quad)

    this.clearTargets()
  }

  /** Render target contents are undefined until something writes them, so
   *  the first frame would integrate whatever the driver left in memory.
   *  Clearing borrows the renderer's clear colour, which the scene has set
   *  to 0x0a0a0a: leave that changed and the whole app renders on grey. */
  private clearTargets() {
    if (!this.live) return
    const r = this.renderer
    const prevTarget = r.getRenderTarget()
    r.getClearColor(this.clearColor)
    const prevAlpha = r.getClearAlpha()
    r.setClearColor(0x000000, 0)
    for (const rt of [...this.offRT, ...this.velRT]) {
      r.setRenderTarget(rt)
      r.clear(true, false, false)
    }
    r.setClearColor(this.clearColor, prevAlpha)
    r.setRenderTarget(prevTarget)
  }

  /** rgb = displacement offset in cluster-local units, a = speed. */
  get offsetTexture(): THREE.Texture {
    return this.live ? this.offRT[this.cur].texture : this.dead
  }

  /** Square texture edge. Particle i lives at (i % size, floor(i / size)). */
  get texSize(): number {
    return this.size
  }

  /** How many particles this sim was built for, for the caller's sanity
   *  check against its own geometry. */
  get particleCount(): number {
    return this.count
  }

  /** False when the GPU refused float targets and the offsets are all
   *  zero, so the caller can skip its own hand plumbing. */
  get active(): boolean {
    return this.live
  }

  /**
   * Where the hand is, how fast it is moving, and how present it is.
   * localPos and vel are in CLUSTER-LOCAL space, the same space scene.ts
   * hands to setGrab and uHover, because the sim's rest positions are.
   * strength 0 switches the field off entirely.
   */
  /** The view axis, already rotated into cluster space, so the swirl
   *  orbits what the camera is looking down. */
  setViewAxis(axis: THREE.Vector3) {
    ;(this.uniforms.uViewAxis.value as THREE.Vector3).copy(axis).normalize()
  }

  setHand(localPos: THREE.Vector3, vel: THREE.Vector3, strength: number) {
    ;(this.uniforms.uHand.value as THREE.Vector3).copy(localPos)
    const v = this.uniforms.uHandVel.value as THREE.Vector3
    v.copy(vel)
    const s = v.length()
    if (s > MAX_HAND_VEL) v.multiplyScalar(MAX_HAND_VEL / s)
    this.uniforms.uHandStr.value = Math.max(0, Math.min(1, strength))
  }

  /** Owner tuning. Every value is clamped to a range the integrator is
   *  known stable in at the clamped dt: stiffness past ~1800 is unstable
   *  at 1/30s no matter how much damping sits next to it. */
  setTuning(o: Tuning) {
    if (o.stiffness !== undefined) this.uniforms.uStiff.value = Math.max(0, Math.min(600, o.stiffness))
    if (o.damping !== undefined) this.uniforms.uDamp.value = Math.max(0, Math.min(60, o.damping))
    if (o.swirl !== undefined) this.uniforms.uSwirl.value = Math.max(0, Math.min(4, o.swirl))
    if (o.push !== undefined) {
      const p = Math.max(0, Math.min(40, o.push))
      this.uniforms.uPush.value = p
      this.uniforms.uDrag.value = p * 0.5
    }
    if (o.radius !== undefined) this.uniforms.uRadius.value = Math.max(0.01, Math.min(4, o.radius))
    if (o.curl !== undefined) this.uniforms.uCurl.value = Math.max(0, Math.min(8, o.curl))
  }

  /** Integrate one frame. Two draws: velocity, then offset with the new
   *  velocity, which is what makes it semi-implicit rather than explicit.
   *  Multiple render targets would fold it into one draw and cost a GLSL3
   *  material for the privilege; at 262k fragments the second pass is not
   *  where the frame goes. */
  step(dt: number) {
    if (!this.live) return
    // A NaN dt from a stalled clock poisons every texel permanently: there
    // is no force that brings a NaN offset back, so the star never
    // recovers without a reload.
    if (!Number.isFinite(dt) || dt <= 0) return
    const d = Math.min(dt, MAX_DT)
    this.time += d
    this.uniforms.uDt.value = d
    this.uniforms.uTime.value = this.time

    const r = this.renderer
    // The main pass owns the render target, and on the frame the composer
    // is mid-chain that target is not null. Restoring whatever was there
    // is the whole contract this class has with scene.ts.
    const prevTarget = r.getRenderTarget()
    const next = 1 - this.cur

    this.uniforms.uOff.value = this.offRT[this.cur].texture
    this.uniforms.uVel.value = this.velRT[this.cur].texture
    this.quad.material = this.velMat
    r.setRenderTarget(this.velRT[next])
    r.render(this.scene, this.cam)

    this.uniforms.uVel.value = this.velRT[next].texture
    this.quad.material = this.offMat
    r.setRenderTarget(this.offRT[next])
    r.render(this.scene, this.cam)

    r.setRenderTarget(prevTarget)
    this.cur = next
  }

  /** The sim's grid is fixed by the particle count, not by the canvas, so
   *  a window resize costs it nothing. Present so the caller can call it
   *  from the same place it calls every other resize. */
  resize() {}

  dispose() {
    for (const rt of [...this.offRT, ...this.velRT]) rt.dispose()
    this.baseTex.dispose()
    this.dead.dispose()
    this.geo.dispose()
    this.velMat.dispose()
    this.offMat.dispose()
  }
}
