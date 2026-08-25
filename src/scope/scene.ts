/**
 * The instrument: a star made of particles.
 *
 * ~38k points on a fibonacci sphere, displaced by three octaves of true 3D
 * simplex noise — organic, non-repeating turbulence, nothing like a sum of
 * sines. Bass swells the whole photosphere, mids drive the surface boil,
 * highs add fine grain, and beats kick the turbulence outward. A dense
 * gaussian core burns in the middle. Every audio parameter arrives through
 * a critically-damped spring, so the surface flows instead of strobing.
 *
 * Interactive like the reference cluster: damped hover aim, grab-to-spin
 * (free — a star has no wrong side), slow drift. Crisp by construction:
 * small points, restrained bloom, per-particle twinkle.
 */

import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'

const SHELL_N = 58000
const CORE_N = 2600
const EJECTA_N = 3600
const LINK_N = 2200 // constellation segments

/** Ashima 3D simplex noise — the standard GLSL implementation. */
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

const SHELL_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uTurb;
  uniform float uExpo;
  attribute vec3 aDir;
  attribute float aHash;
  varying float vGlow;
  varying float vHash;
  __SNOISE__

  void main() {
    // Three octaves of drifting 3D noise: swell, boil, grain. Non-repeating
    // by construction — the field itself advects through time.
    float n1 = snoise(aDir * 2.1 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float n2 = snoise(aDir * 5.3 + vec3(uTime * 0.26, 0.0, -uTime * 0.19));
    float n3 = snoise(aDir * 11.0 + vec3(-uTime * 0.53, uTime * 0.41, 0.0));

    float disp = (
      n1 * (0.05 + uLow * 0.30) +
      n2 * (uMid * 0.24 + uPulse * 0.10) +
      n3 * (uHigh * 0.13)) * uTurb;

    // Volumetric body, not a hollow shell: each particle owns a depth
    // inside the ball (surface-biased), so the face-on view is a boiling
    // solid mass like the reference, and tilting reveals real volume.
    float h2 = fract(aHash * 57.719);
    float depth = mix(0.42, 1.0, pow(h2, 0.38));
    // The photosphere: base radius breathes with the bass; anticipation
    // (the peaks feed) raises the surface tension before a drop lands.
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp) * depth;
    vec3 p = aDir * r;

    // Hot where deformed — flares glow. A slow per-particle twinkle keeps
    // the surface grainy even in still passages.
    float k = clamp(abs(disp) * 3.2, 0.0, 1.0);
    float tw = 0.72 + 0.28 * sin(uTime * (2.0 + aHash * 6.0) + aHash * 40.0);
    // Interior burns slightly dimmer than the surface — the fabric reads
    // as one mass with depth, not two nested skins.
    vGlow = (0.10 + 0.40 * k + uPulse * 0.13) * tw * (0.55 + 0.45 * depth) * uExpo;
    vHash = aHash;

    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + k * 1.5 + uPulse * 0.35) * on * (2.75 / max(0.4, -mv.z));
  }
`

const SHELL_FRAG = /* glsl */ `
  precision mediump float;
  varying float vGlow;
  varying float vHash;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    // Hard-edged sprites read crisp; the soft halo is bloom's job only.
    float m = smoothstep(0.5, 0.18 + vHash * 0.1, length(uv));
    gl_FragColor = vec4(vec3(0.93) * vGlow * m, 1.0);
  }
`

/** Coronal ejecta — the lifecycle layer. Spawned on beats from a ring
 *  pool (no allocation, no GC), simulated entirely in the shader with an
 *  analytic exponential-drag flight, faded and shrunk over a short life.
 *  Dead slots cost one vertex transform and zero fill. */
const EJECTA_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform float uR;
  uniform float uDensity;
  attribute vec3 aDir;
  attribute float aBirth;  // scene-time of launch; large negative = dead slot
  attribute float aSpd;
  attribute float aHash;
  varying float vFade;

  void main() {
    float age = uTime - aBirth;
    float life = 1.3 + aHash * 0.9;
    float a01 = clamp(age / life, 0.0, 1.0);
    float alive = step(0.0, age) * (1.0 - step(1.0, a01)) * step(fract(aHash * 331.7), uDensity);

    // Exponential drag: fast leave, coasting arrival. Closed-form, so a
    // dead-or-alive particle costs the same and nothing runs on the CPU.
    float k = 2.1;
    float dist = aSpd * (1.0 - exp(-k * age)) / k;
    vec3 p = aDir * (uR * 0.60 + dist);

    vFade = (1.0 - a01) * (1.0 - a01) * (0.55 + uPulse * 0.25);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.1 - a01 * 1.5) * alive * (2.75 / max(0.4, -mv.z));
  }
`

const EJECTA_FRAG = /* glsl */ `
  precision mediump float;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.12, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vFade * m, 1.0);
  }
`

/** Constellation wireframe — the reference cluster's LineSegments, alive.
 *  Each segment's endpoints run the SAME noise displacement as the shell,
 *  so the lattice rides the boiling surface. Subsets flash on beats via a
 *  time-rotating gate; between beats the lattice is a whisper. */
const LINK_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uTurb;
  attribute vec3 aDir;
  attribute float aHash;  // shared per segment
  varying float vA;
  __SNOISE__

  void main() {
    float n1 = snoise(aDir * 2.1 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float n2 = snoise(aDir * 5.3 + vec3(uTime * 0.26, 0.0, -uTime * 0.19));
    float disp = (n1 * (0.05 + uLow * 0.30) + n2 * (uMid * 0.24 + uPulse * 0.10)) * uTurb;
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp);
    vec3 p = aDir * r;

    // Rotating gate: a different ~fifth of the lattice arms on each beat
    // window; uPulse lights the armed subset.
    float gate = step(0.8, fract(aHash * 17.31 + floor(uTime * 0.8) * 0.618));
    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vA = (0.028 + gate * uPulse * 0.34) * on;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const LINK_FRAG = /* glsl */ `
  precision mediump float;
  varying float vA;
  void main() {
    gl_FragColor = vec4(vec3(0.9), vA);
  }
`

const CORE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  attribute float aHash;
  attribute vec3 aSeed;
  varying float vHeat;

  void main() {
    float coreR = uR * (0.16 + uLow * 0.14 + uPulse * 0.03);
    float t = uTime * (0.4 + aHash * 1.2);
    vec3 wob = vec3(
      sin(t * 3.1 + aHash * 40.0),
      cos(t * 2.7 + aHash * 71.0),
      sin(t * 2.2 + aHash * 23.0)
    ) * coreR * (0.10 + uHigh * 0.4);
    vec3 p = aSeed * coreR + wob;
    float dist = length(p) / max(coreR * 2.2, 1e-4);
    float clump = 0.45 + 0.55 * sin(aHash * 43.7 + uTime * 0.9);
    vHeat = min(0.55, (1.0 - clamp(dist, 0.0, 1.0)) * (0.22 + uLow * 0.55 + uMid * 0.18) * (0.5 + clump));
    float on = step(fract(aHash * 613.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + vHeat * 2.4) * on * (2.75 / max(0.4, -mv.z));
  }
`

const CORE_FRAG = /* glsl */ `
  precision mediump float;
  varying float vHeat;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.06, length(uv));
    gl_FragColor = vec4(vec3(1.0) * vHeat * m, 1.0);
  }
`

/** Critically-damped smoother — fast attack, settle without overshoot. */
class Env {
  v = 0
  private vel = 0
  update(target: number, dt: number, omega: number) {
    const x = this.v - target
    const t = (this.vel + omega * x) * dt
    this.v = target + (x + t) * Math.exp(-omega * dt)
    this.vel = (this.vel - omega * t) * Math.exp(-omega * dt)
    return this.v
  }
}

export class Scene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private cluster = new THREE.Group()
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private after!: AfterimagePass
  /** Owner dial, 0.25..2: scales the drift/spin rate. */
  spinDial = 1
  private uniforms: Record<string, THREE.IUniform>
  private lowE = new Env()
  private midE = new Env()
  private highE = new Env()
  private pulseE = new Env()
  private aheadE = new Env()
  private ejecta!: { dir: THREE.BufferAttribute; birth: THREE.BufferAttribute; spd: THREE.BufferAttribute; cursor: number }
  private ptr = { x: 0, y: 0, tx: 0, ty: 0 }
  private drag = { x: 0, y: 0, tx: 0, ty: 0 }
  private driftT = 0
  private born = performance.now()
  private t = 0
  private focusFrac = 0.5
  private quality = 1
  /** Reduced-motion visitors get a still star that still hears the music —
   *  the boil is content, the spin is decoration. */
  private calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  private lastW = 2
  private lastH = 1

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
    // Display-space pipeline (the composer double-encoded sRGB and washed
    // the frame grey — measured at the glass): what we set is what shows.
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    THREE.ColorManagement.enabled = false
    this.renderer.setClearColor(0x0a0a0a, 1)
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20)
    this.camera.position.z = 1 / Math.tan((40 / 2) * (Math.PI / 180))
    this.scene.add(this.cluster)

    this.uniforms = {
      uTime: { value: 0 },
      uLow: { value: 0 },
      uMid: { value: 0 },
      uHigh: { value: 0 },
      uPulse: { value: 0 },
      uAhead: { value: 0 },
      uR: { value: 1 },
      uReveal: { value: 0 },
      // Adaptive quality: fraction of particles allowed to render. The
      // app's frame loop lowers this on hardware that can't hold 60.
      uDensity: { value: 1 },
      // Owner dials: turbulence and exposure multipliers (spin lives on the
      // CPU side of the motion law).
      uTurb: { value: 1 },
      uExpo: { value: 1 },
    }

    // --- the shell: fibonacci sphere ----------------------------------------
    {
      const dir = new Float32Array(SHELL_N * 3)
      const hash = new Float32Array(SHELL_N)
      const pos = new Float32Array(SHELL_N * 3)
      const GA = Math.PI * (3 - Math.sqrt(5)) // golden angle
      for (let i = 0; i < SHELL_N; i++) {
        const y = 1 - (i / (SHELL_N - 1)) * 2
        const rad = Math.sqrt(1 - y * y)
        const th = GA * i
        dir[i * 3] = Math.cos(th) * rad
        dir[i * 3 + 1] = y
        dir[i * 3 + 2] = Math.sin(th) * rad
        hash[i] = Math.random()
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', new THREE.BufferAttribute(dir, 3))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: SHELL_VERT.replace('__SNOISE__', SNOISE),
        fragmentShader: SHELL_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
    }

    // --- the core ------------------------------------------------------------
    {
      const seed = new Float32Array(CORE_N * 3)
      const hash = new Float32Array(CORE_N)
      const pos = new Float32Array(CORE_N * 3)
      for (let i = 0; i < CORE_N; i++) {
        // Shell-biased 3D ball: structure and cracks, not a white blob.
        const u = Math.random() * Math.PI * 2
        const v = Math.acos(2 * Math.random() - 1)
        const rr = 0.45 + Math.pow(Math.random(), 0.45) * 0.85
        seed[i * 3] = Math.sin(v) * Math.cos(u) * rr
        seed[i * 3 + 1] = Math.sin(v) * Math.sin(u) * rr
        seed[i * 3 + 2] = Math.cos(v) * rr
        hash[i] = Math.random()
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: CORE_VERT,
        fragmentShader: CORE_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
    }

    // --- the ejecta pool -------------------------------------------------
    {
      const dir = new Float32Array(EJECTA_N * 3)
      const birth = new Float32Array(EJECTA_N).fill(-1e4) // all dead
      const spd = new Float32Array(EJECTA_N)
      const hash = new Float32Array(EJECTA_N)
      const pos = new Float32Array(EJECTA_N * 3)
      for (let i = 0; i < EJECTA_N; i++) hash[i] = Math.random()
      const geo = new THREE.BufferGeometry()
      const aDir = new THREE.BufferAttribute(dir, 3)
      const aBirth = new THREE.BufferAttribute(birth, 1)
      const aSpd = new THREE.BufferAttribute(spd, 1)
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', aDir)
      geo.setAttribute('aBirth', aBirth)
      geo.setAttribute('aSpd', aSpd)
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: EJECTA_VERT,
        fragmentShader: EJECTA_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
      this.ejecta = { dir: aDir, birth: aBirth, spd: aSpd, cursor: 0 }
    }

    // --- the constellation ---------------------------------------------
    {
      const GA = Math.PI * (3 - Math.sqrt(5))
      const dirOf = (i: number) => {
        const y = 1 - (i / (SHELL_N - 1)) * 2
        const rad = Math.sqrt(1 - y * y)
        const th = GA * i
        return [Math.cos(th) * rad, y, Math.sin(th) * rad]
      }
      const dir = new Float32Array(LINK_N * 2 * 3)
      const hash = new Float32Array(LINK_N * 2)
      const pos = new Float32Array(LINK_N * 2 * 3)
      // On a fibonacci lattice, index deltas of 1/13/21 land on spatial
      // neighbours — short chords, never random cross-sphere slashes.
      const DELTAS = [1, 13, 21]
      for (let s = 0; s < LINK_N; s++) {
        const i = Math.floor(Math.random() * (SHELL_N - 22))
        const j = i + DELTAS[(Math.random() * DELTAS.length) | 0]
        const h = Math.random()
        const a = dirOf(i)
        const b = dirOf(j)
        dir.set(a, s * 6)
        dir.set(b, s * 6 + 3)
        hash[s * 2] = h
        hash[s * 2 + 1] = h
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', new THREE.BufferAttribute(dir, 3))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: LINK_VERT.replace('__SNOISE__', SNOISE),
        fragmentShader: LINK_FRAG,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.LineSegments(geo, mat))
    }

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    // Phosphor persistence: the frame smears into itself like a slow CRT,
    // heavier when the bass leans in. Before bloom, so trails glow too.
    this.after = new AfterimagePass(0.82)
    this.composer.addPass(this.after)
    // Tight bloom: crisp particles first, halo second.
    this.bloom = new UnrealBloomPass(new THREE.Vector2(2, 2), 0.4, 0.25, 0.55)
    this.composer.addPass(this.bloom)
    if (import.meta.env.DEV) (window as unknown as { __scene: Scene }).__scene = this
  }

  get bloomPass() {
    return this.bloom
  }

  /** Owner tuning: turbulence / exposure / spin, each 0.25..2. */
  setTuning(turb: number, expo: number, spin: number) {
    this.uniforms.uTurb.value = turb
    this.uniforms.uExpo.value = expo
    this.spinDial = spin
  }

  /** Adaptive quality: q<1 halves the workload twice over — fewer
   *  particles AND a non-retina buffer. Called by the app's self-profiler. */
  setQuality(q: number) {
    this.quality = q
    this.uniforms.uDensity.value = q
    this.resize(this.lastW, this.lastH)
  }

  /** The POWER ON moment reaches the star itself: a fast partial re-reveal
   *  (reads as the instrument re-acquiring) plus a full-strength eruption. */
  powerOn() {
    this.born = performance.now() - 0.3 * 1700
    this.pulseE.v = 1.1
    this.burst(1)
  }

  setFocus(frac: number) {
    this.focusFrac = frac
    this.resize(this.lastW, this.lastH)
  }

  /** Hover aim, normalized -0.5..0.5 of the viewport. */
  setPointer(nx: number, ny: number) {
    this.ptr.tx = nx
    this.ptr.ty = ny
  }

  /** A beat erupts matter from the surface: take the next slots in the
   *  ring pool, stamp launch time, direction and speed. Recycling means a
   *  long build-up can never exhaust memory — old flares are overwritten. */
  burst(strength: number) {
    const n = Math.round(90 + strength * 240)
    const e = this.ejecta
    for (let i = 0; i < n; i++) {
      const s = e.cursor
      e.cursor = (e.cursor + 1) % EJECTA_N
      // Uniform random direction — flares leave the whole photosphere.
      const u = Math.random() * Math.PI * 2
      const v = Math.acos(2 * Math.random() - 1)
      e.dir.setXYZ(s, Math.sin(v) * Math.cos(u), Math.sin(v) * Math.sin(u), Math.cos(v))
      e.birth.setX(s, this.t)
      e.spd.setX(s, (0.5 + Math.random() * 0.9) * (0.5 + strength))
    }
    e.dir.needsUpdate = true
    e.birth.needsUpdate = true
    e.spd.needsUpdate = true
  }

  /** Drag deltas in radians. A star has no wrong side — spin is free. */
  dragBy(rx: number, ry: number) {
    this.drag.tx += rx
    this.drag.ty += ry
  }

  resize(w: number, h: number) {
    this.lastW = w
    this.lastH = h
    const dpr = this.quality < 1 ? 1 : Math.min(2, window.devicePixelRatio || 1)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h, false)
    this.composer.setSize(w, h)
    const aspect = w / Math.max(1, h)
    this.camera.aspect = aspect
    // Camera at x looking at (x,0,0) shows world-x at screen centre, so to
    // place world 0 RIGHT of centre the camera itself moves LEFT.
    const off = -(this.focusFrac - 0.5) * 2 * aspect
    this.camera.position.x = off
    this.camera.lookAt(off, 0, 0)
    this.camera.updateProjectionMatrix()
    // The subject dominates the stage, like the reference.
    this.uniforms.uR.value = 0.88
  }

  render(dt: number, low: number, mid: number, high: number, pulse: number, ahead = 0) {
    this.t += dt
    this.uniforms.uTime.value = this.t
    this.uniforms.uLow.value = this.lowE.update(low, dt, 11)
    this.uniforms.uMid.value = this.midE.update(mid, dt, 9)
    this.uniforms.uHigh.value = this.highE.update(high, dt, 13)
    this.uniforms.uPulse.value = this.pulseE.update(pulse, dt, 16)
    this.uniforms.uAhead.value = this.aheadE.update(ahead, dt, 1.6)
    this.uniforms.uReveal.value = Math.min(1, (performance.now() - this.born) / 1700)

    // Reference cluster's motion law, unclamped for a sphere: free spin.
    const ease = Math.min(1, dt * 4)
    this.ptr.x += (this.ptr.tx - this.ptr.x) * ease
    this.ptr.y += (this.ptr.ty - this.ptr.y) * ease
    this.drag.x += (this.drag.tx - this.drag.x) * ease
    this.drag.y += (this.drag.ty - this.drag.y) * ease
    if (!this.calm) this.driftT += dt * (0.06 + this.uniforms.uPulse.value * 0.05) * this.spinDial
    this.cluster.rotation.y = this.driftT + this.ptr.x * 0.6 + this.drag.x
    this.cluster.rotation.x =
      Math.sin(this.driftT * 0.4) * 0.12 - this.ptr.y * 0.5 + this.drag.y

    this.bloom.strength = (0.32 + this.uniforms.uLow.value * 0.3 + this.uniforms.uPulse.value * 0.15) * this.uniforms.uExpo.value
    // Persistence leans with the bass: quiet = crisp, heavy = long exposure.
    ;(this.after.uniforms as { damp: { value: number } }).damp.value = 0.76 + this.uniforms.uLow.value * 0.15
    this.composer.render()
  }
}
