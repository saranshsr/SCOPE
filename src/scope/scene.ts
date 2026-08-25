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

// The shell carries a RESERVE: at zoom 1 only ~55% of it renders (same
// cost as before), and zooming in spends the rest, so magnification adds
// real detail instead of magnifying gaps.
const SHELL_N = 108000
const BASE_DENSITY = 0.55
const CORE_N = 2600
const EJECTA_N = 3600
const LINK_N = 2200 // constellation segments
const CORONA_N = 2600 // the vocal ring

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
  uniform float uSnap;
  uniform float uZoom;
  uniform vec3 uGrabPos;
  uniform float uGrabStr;
  uniform float uGrabBand;
  uniform vec3 uEqVis;
  uniform float uBands[24];
  uniform float uDissect;
  uniform float uTiers;
  uniform float uGap;
  uniform float uTierOf[24];
  uniform float uTierLvl[6];
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

    // Spectral anatomy: each angular sector of the body belongs to one of
    // the analyser's 24 bands — the hi-hat shimmers HERE, the bass heaves
    // THERE. Sectors rotate with the body, so the anatomy is anatomical.
    float sector = (atan(aDir.z, aDir.x) / 6.28318 + 0.5) * 24.0;
    int si = int(mod(floor(sector), 24.0));
    float bandE = uBands[si];
    // The EQ made visible: killed bands' sectors collapse dark, boosted
    // bands bulge bright. 1.0 = flat.
    float eqV = si < 8 ? uEqVis.x : si < 16 ? uEqVis.y : uEqVis.z;
    bandE *= eqV;

    float disp = (
      n1 * (0.05 + uLow * 0.30) +
      n2 * (uMid * 0.24 + uPulse * 0.10) +
      n3 * (uHigh * 0.13) +
      n2 * bandE * 0.20) * uTurb;

    float eqBody = 0.52 + 0.48 * min(eqV, 1.25); // kills CAVE, boosts flare
    // Volumetric body, not a hollow shell: each particle owns a depth
    // inside the ball (surface-biased), so the face-on view is a boiling
    // solid mass like the reference, and tilting reveals real volume.
    float h2 = fract(aHash * 57.719);
    float depth = mix(0.42, 1.0, pow(h2, 0.38));
    // The photosphere: base radius breathes with the bass; anticipation
    // (the peaks feed) raises the surface tension before a drop lands.
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp) * depth * eqBody;
    vec3 p = aDir * r;

    // THE DISSECTION. Pulled apart, the star shears into stacked survey
    // rings — one per tier, frequency-honest (this particle's band decides
    // its tier), each ring still breathing with its own bands' energy.
    // Lower tiers leave first: an exploded engineering drawing, not a fade.
    float dl = 0.0;
    float tl = 1.0;
    if (uDissect > 0.001) {
      float tier = uTierOf[si];
      // The tier's OWN voice — for stems this is the stem's real post-gain
      // level, so killing a stem collapses and darkens its ring directly,
      // not via the shared spectrum. The band mapping alone can't promise
      // that: a muted vocal's energy was smeared across every tier's bands.
      tl = uTierLvl[int(min(tier, 5.0))];
      dl = clamp(uDissect * 1.15 - tier * 0.05, 0.0, 1.0);
      dl = dl * dl * (3.0 - 2.0 * dl);
      float ty = (tier - (uTiers - 1.0) * 0.5) * uGap;
      // A tier owns only its slice of the sphere's azimuth — kept as-is the
      // ring would be a crescent. Respread the slice around the FULL circle:
      // each ring becomes its own complete spectrum wheel, its 8 bands laid
      // out as angular segments that breathe independently.
      float tierW = 24.0 / uTiers;
      float th2 = ((sector - tier * tierW) / tierW) * 6.28318;
      vec2 az = vec2(cos(th2), sin(th2));
      float ringR = uR * (0.50 + bandE * 0.20 + n2 * 0.05 * uTurb) * eqBody * mix(1.0, depth, 0.22)
        * (0.45 + 0.55 * min(tl, 1.4));
      vec3 tp = vec3(az.x * ringR, ty + n3 * 0.035 + (h2 - 0.5) * 0.06, az.y * ringR);
      p = mix(p, tp, dl);
    }

    // The hand in the matter. Band-selective: you grab the BASS and the
    // bass sectors' particles stream to your hand — everything else barely
    // stirs. Wider falloff + stronger pull than v1: the tendril must READ.
    float pullHeat = 0.0;
    if (uGrabStr > 0.001) {
      float grp = si < 8 ? 0.0 : si < 16 ? 1.0 : 2.0;
      float bandW = uGrabBand < -0.5 ? 1.0 : (abs(grp - uGrabBand) < 0.5 ? 1.0 : 0.12);
      float pullW = exp(-length(p - uGrabPos) * 1.6) * uGrabStr * bandW;
      p = mix(p, uGrabPos, min(0.92, pullW));
      pullHeat = pullW * 0.55; // pulled matter burns brighter — the tendril is hot
    }

    // Hot where deformed — flares glow. A slow per-particle twinkle keeps
    // the surface grainy even in still passages.
    float k = clamp(abs(disp) * 3.2, 0.0, 1.0);
    float tw = 0.72 + 0.28 * sin(uTime * (2.0 + aHash * 6.0) + aHash * 40.0);
    // Interior burns slightly dimmer than the surface — the fabric reads
    // as one mass with depth, not two nested skins.
    // Snap is unsprung: the kick flashes the frame it lands.
    vGlow = (0.10 + 0.40 * k + uPulse * 0.13 + uSnap * 0.22 + bandE * 0.18) * tw * (0.55 + 0.45 * depth) * uExpo * (0.55 + 0.45 * eqV) * (1.0 + dl * 0.18) * mix(1.0, 0.22 + 0.78 * min(tl, 1.3), dl) + pullHeat;
    vHash = aHash;

    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // Perspective would balloon every point as the camera closes in; the
    // zoom divisor keeps them near-crisp so detail comes from COUNT, not
    // from fatter dots.
    gl_PointSize = (1.0 + k * 1.5 + uPulse * 0.35 + uSnap * 0.9) * on
      * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`

const SHELL_FRAG = /* glsl */ `
  precision mediump float;
  varying float vGlow;
  varying float vHash;
  void main() {
    // A real luminous profile: tight gaussian core plus a faint halo. Flat
    // discs read as blobs the moment you zoom in; this holds up magnified.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;
    float core = exp(-d * d * 5.0);
    float halo = smoothstep(1.0, 0.2, d) * (0.22 + vHash * 0.1);
    gl_FragColor = vec4(vec3(0.93) * vGlow * (core + halo), 1.0);
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
  uniform float uZoom;
  uniform float uDissect;
  attribute vec3 aDir;
  attribute vec3 aOrg;     // launch point — the surface, or a tier's ring
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
    vec3 p = aOrg + aDir * dist;

    vFade = (1.0 - a01) * (1.0 - a01) * (0.55 + uPulse * 0.25) * (1.0 - uDissect * 0.6);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.1 - a01 * 1.5) * alive * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
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
  uniform float uSnap;
  uniform float uOnsetN;
  uniform float uDissect;
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

    // Onset-driven: every real transient (snare, hat, stab) re-deals which
    // fifth of the lattice is armed, and the unsprung snap lights it the
    // same frame the sound happens.
    float gate = step(0.8, fract(aHash * 17.31 + uOnsetN * 0.618));
    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    // A chord between two tiers is a lie once the tiers separate.
    vA = (0.028 + gate * max(uPulse * 0.3, uSnap * 0.5)) * on * (1.0 - uDissect);
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
  uniform float uZoom;
  uniform float uDissect;
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
    // Dissected, there is no centre for a furnace to live in.
    vHeat = min(0.55, (1.0 - clamp(dist, 0.0, 1.0)) * (0.22 + uLow * 0.55 + uMid * 0.18) * (0.5 + clump)) * (1.0 - uDissect * 0.9);
    float on = step(fract(aHash * 613.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + vHeat * 2.4) * on * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
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

/** The corona — the vocal stem's visible voice. A tilted ring of embers
 *  around the body that only exists while a voice sings: radius breathes
 *  with it, particles drift along the ring, noise keeps it organic. Kill
 *  the vocal stem and the corona dies with it — feedback that cannot be
 *  missed. */
const CORONA_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uVocal;
  uniform float uR;
  uniform float uZoom;
  uniform float uDissect;
  uniform float uCoronaY;
  attribute float aTheta;
  attribute float aHash;
  varying float vA;
  __SNOISE__

  void main() {
    float th = aTheta + uTime * (0.08 + aHash * 0.05);
    float r = uR * (0.86 + uVocal * 0.16 + 0.03 * snoise(vec3(cos(th), sin(th), uTime * 0.3) * 2.0 + aHash * 7.0));
    // a ring tilted out of the body's plane so it reads as its own object
    vec3 p = vec3(cos(th) * r, sin(th) * r * 0.42, sin(th) * r * 0.5);
    // Dissected, the corona is no longer a halo — it settles flat onto the
    // vocals' own tier and becomes that ring's fire.
    vec3 pd = vec3(cos(th) * r * 0.70, uCoronaY + sin(th * 3.0 + uTime) * 0.02, sin(th) * r * 0.70);
    p = mix(p, pd, uDissect);
    vA = uVocal * (0.25 + 0.75 * fract(aHash * 91.7)) * smoothstep(0.02, 0.2, uVocal);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.2 + uVocal * 1.6) * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`

const CORONA_FRAG = /* glsl */ `
  precision mediump float;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.1, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vA * m, 1.0);
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
  private dissectE = new Env()
  private dissectTarget = 0
  private tierCount = 3
  private lastDis = 0
  private _v = new THREE.Vector3()
  private ejecta!: { dir: THREE.BufferAttribute; org: THREE.BufferAttribute; birth: THREE.BufferAttribute; spd: THREE.BufferAttribute; cursor: number }
  private ptr = { x: 0, y: 0, tx: 0, ty: 0 }
  private drag = { x: 0, y: 0, tx: 0, ty: 0 }
  private driftT = 0
  private born = performance.now()
  private t = 0
  private focusFrac = 0.5
  private quality = 1
  /** Camera zoom, 1..5. Damped toward zoomTarget every frame. */
  private zoom = 1
  private zoomTarget = 1
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
      // The transient fast-path: sub-frame attack, ~150ms decay, NO spring.
      uSnap: { value: 0 },
      uZoom: { value: 1 },
      // The grab: a point in cluster-local space that attracts nearby
      // matter, and per-band-group EQ visual multipliers (low/mid/high).
      uGrabPos: { value: new THREE.Vector3() },
      uGrabStr: { value: 0 },
      uGrabBand: { value: -1 }, // 0 low / 1 mid / 2 high / -1 all
      // The vocal voice: 0 = no corona; rises with vocal-stem presence.
      uVocal: { value: 0 },
      // THE DISSECTION: 0 = one star, 1 = exploded survey stack. Spring-
      // damped here; the app only sets the target.
      uDissect: { value: 0 },
      uTiers: { value: 3 },
      uGap: { value: 1.55 / 2 },
      // band index -> tier index. Default: the spectral anatomy itself
      // (low/mid/high), so dissection works on ANY source, stems or not.
      uTierOf: { value: new Float32Array(24).map((_, i) => Math.floor(i / 8)) },
      // each tier's live voice (stems: real post-gain rms; spectral: kill
      // state) — the caller smooths, the shader only reads.
      uTierLvl: { value: new Float32Array(6).fill(1) },
      // where the vocals tier sits (cluster-local y), for the corona.
      uCoronaY: { value: 0 },
      uEqVis: { value: new THREE.Vector3(1, 1, 1) },
      // The full analyser: 24 log bands, mapped to angular sectors of the
      // body — the star's spectral anatomy.
      uBands: { value: new Float32Array(24) },
      // Onset counter rotates which constellations arm.
      uOnsetN: { value: 0 },
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
      const org = new Float32Array(EJECTA_N * 3)
      const birth = new Float32Array(EJECTA_N).fill(-1e4) // all dead
      const spd = new Float32Array(EJECTA_N)
      const hash = new Float32Array(EJECTA_N)
      const pos = new Float32Array(EJECTA_N * 3)
      for (let i = 0; i < EJECTA_N; i++) hash[i] = Math.random()
      const geo = new THREE.BufferGeometry()
      const aDir = new THREE.BufferAttribute(dir, 3)
      const aOrg = new THREE.BufferAttribute(org, 3)
      const aBirth = new THREE.BufferAttribute(birth, 1)
      const aSpd = new THREE.BufferAttribute(spd, 1)
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', aDir)
      geo.setAttribute('aOrg', aOrg)
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
      this.ejecta = { dir: aDir, org: aOrg, birth: aBirth, spd: aSpd, cursor: 0 }
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

    // --- the corona --------------------------------------------------------
    {
      const theta = new Float32Array(CORONA_N)
      const hash = new Float32Array(CORONA_N)
      const pos = new Float32Array(CORONA_N * 3)
      for (let i = 0; i < CORONA_N; i++) {
        theta[i] = (i / CORONA_N) * Math.PI * 2
        hash[i] = Math.random()
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aTheta', new THREE.BufferAttribute(theta, 1))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: CORONA_VERT.replace('__SNOISE__', SNOISE),
        fragmentShader: CORONA_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
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
    // Without this the uniform keeps its initial 1 and the whole reserve
    // renders at zoom 1 — double the intended cost, zero headroom left.
    this.applyDensity()
    if (import.meta.env.DEV) (window as unknown as { __scene: Scene }).__scene = this
  }

  get bloomPass() {
    return this.bloom
  }

  /** The full analyser feed — 24 log bands into the anatomy. */
  setBands(bands: Float32Array) {
    const u = this.uniforms.uBands.value as Float32Array
    for (let i = 0; i < 24; i++) u[i] = bands[i]
  }

  /** A real transient happened — re-deal the armed constellations. */
  onset() {
    this.uniforms.uOnsetN.value = (this.uniforms.uOnsetN.value + 1) % 4096
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
    this.applyDensity()
    this.resize(this.lastW, this.lastH)
  }

  /** Visible fraction = the governor's budget x whatever zoom has spent.
   *  Zoomed in, the view covers less sphere, so more of the reserve can
   *  render for the same fragment cost. */
  private applyDensity() {
    const spend = Math.min(1, BASE_DENSITY * (0.55 + 0.45 * this.zoom * 1.15))
    this.uniforms.uDensity.value = Math.min(1, spend) * this.quality
  }

  /** Pinch / wheel zoom, clamped. 1 = full body, 5 = surface detail. */
  zoomBy(factor: number) {
    this.zoomTarget = Math.max(1, Math.min(5, this.zoomTarget * factor))
  }
  setZoom(z: number) {
    this.zoomTarget = Math.max(1, Math.min(5, z))
  }
  /** Ray-cast a screen point against the body sphere. Returns the hit in
   *  CLUSTER-LOCAL space (what the shader needs) or null on miss. nx/ny in
   *  [-1,1] NDC. */
  bodyHit(nx: number, ny: number): THREE.Vector3 | null {
    const ray = new THREE.Raycaster()
    ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera)
    const bodyR = 0.88 * 0.62 // uR x resting photosphere
    const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), bodyR)
    const hit = new THREE.Vector3()
    if (!ray.ray.intersectSphere(sphere, hit)) return null
    return this.cluster.worldToLocal(hit)
  }

  /** The vocal stem's presence, damped by the caller. */
  setVocal(v: number) {
    this.uniforms.uVocal.value = Math.max(0, Math.min(1.4, v))
  }

  /** Target for the pull-apart, 0..1. The spring does the rest. */
  setDissect(t: number) {
    this.dissectTarget = Math.max(0, Math.min(1, t))
  }

  /** Where the shear actually is right now (sprung). */
  get dissect(): number {
    return this.uniforms.uDissect.value as number
  }

  /** Re-plumb the anatomy: which band belongs to which tier. Spectral
   *  fallback is 3 tiers of 8; stems get one tier per separated part. */
  setTierMap(tierOf: number[], count: number, vocalTier = -1) {
    const u = this.uniforms.uTierOf.value as Float32Array
    for (let i = 0; i < 24; i++) u[i] = tierOf[i] ?? 0
    this.tierCount = count
    this.uniforms.uTiers.value = count
    this.uniforms.uGap.value = 1.55 / Math.max(1, count - 1)
    this.uniforms.uCoronaY.value = vocalTier >= 0 ? this.tierYFull(vocalTier) : 0
  }

  get tiers(): number {
    return this.tierCount
  }

  /** Per-tier voices for the dissected rings — pre-smoothed by the caller. */
  setTierLevels(lvls: ArrayLike<number>) {
    const u = this.uniforms.uTierLvl.value as Float32Array
    for (let i = 0; i < 6; i++) u[i] = lvls[i] ?? 1
  }

  /** A tier's resting altitude at full dissection (cluster-local y). */
  tierYFull(tier: number): number {
    return (tier - (this.tierCount - 1) * 0.5) * (this.uniforms.uGap.value as number)
  }

  /** Where the tier is NOW — mirrors the shader's per-tier shear stagger
   *  exactly, so the survey chrome rides the same motion as the matter. */
  tierYNow(tier: number): number {
    const d = this.uniforms.uDissect.value as number
    const x = Math.max(0, Math.min(1, d * 1.15 - tier * 0.05))
    return this.tierYFull(tier) * x * x * (3 - 2 * x)
  }

  /** Cluster-local point -> CSS pixels. Valid right after render(). */
  projectLocal(x: number, y: number, z: number): { x: number; y: number } {
    this._v.set(x, y, z).applyMatrix4(this.cluster.matrixWorld).project(this.camera)
    return { x: (this._v.x * 0.5 + 0.5) * this.lastW, y: (-this._v.y * 0.5 + 0.5) * this.lastH }
  }

  /** A point on a tier's survey ring (rs scales the ring radius; 0 = the
   *  tier's centre on the axis). */
  surveyPoint(tier: number, theta: number, rs = 1): { x: number; y: number } {
    const r = 0.88 * 0.56 * rs
    return this.projectLocal(Math.cos(theta) * r, this.tierYNow(tier), Math.sin(theta) * r)
  }

  /** Cursor ray -> the body's depth plane. ALWAYS returns a point, so the
   *  tendril follows the hand even after it leaves the silhouette — that
   *  was the broken first link of the feedback chain. */
  grabPlane(nx: number, ny: number): THREE.Vector3 {
    const ray = new THREE.Raycaster()
    ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const hit = new THREE.Vector3()
    ray.ray.intersectPlane(plane, hit)
    return this.cluster.worldToLocal(hit)
  }

  /** Drive the grab visual: local point + strength + band (0/1/2, -1 all). */
  setGrab(local: THREE.Vector3 | null, strength: number, band = -1) {
    if (local) (this.uniforms.uGrabPos.value as THREE.Vector3).copy(local)
    this.uniforms.uGrabStr.value = local ? strength : 0
    this.uniforms.uGrabBand.value = band
  }

  /** EQ visual multipliers, 1 = flat, 0 = killed, ~1.5 = boosted. */
  setEqVis(low: number, mid: number, high: number) {
    ;(this.uniforms.uEqVis.value as THREE.Vector3).set(low, mid, high)
  }

  /** What fraction of the shell is actually rendering right now. */
  get densityNow() {
    return this.uniforms.uDensity.value as number
  }

  get zoomLevel() {
    return this.zoom
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
   *  ring pool, stamp launch time, origin, direction and speed. Recycling
   *  means a long build-up can never exhaust memory — old flares are
   *  overwritten. Pass a tier index and the eruption leaves THAT ring
   *  instead of the photosphere — dissected, the drums erupt from the
   *  drums' own tier, not from the empty centre the star vacated. */
  burst(strength: number, tier: number | null = null) {
    const n = Math.round(90 + strength * 240)
    const e = this.ejecta
    const fromRing = tier != null && (this.uniforms.uDissect.value as number) > 0.35
    const ringY = fromRing ? this.tierYNow(tier as number) : 0
    const ringR = 0.88 * 0.5
    for (let i = 0; i < n; i++) {
      const s = e.cursor
      e.cursor = (e.cursor + 1) % EJECTA_N
      if (fromRing) {
        // Launch from the ring's rim, spraying outward and off-plane.
        const th = Math.random() * Math.PI * 2
        e.org.setXYZ(s, Math.cos(th) * ringR, ringY, Math.sin(th) * ringR)
        const up = Math.random() * 1.6 - 0.5
        const m = Math.hypot(1, up)
        e.dir.setXYZ(s, Math.cos(th) / m, up / m, Math.sin(th) / m)
      } else {
        // Uniform random direction — flares leave the whole photosphere.
        const u = Math.random() * Math.PI * 2
        const v = Math.acos(2 * Math.random() - 1)
        const dx = Math.sin(v) * Math.cos(u)
        const dy = Math.sin(v) * Math.sin(u)
        const dz = Math.cos(v)
        e.dir.setXYZ(s, dx, dy, dz)
        e.org.setXYZ(s, dx * 0.88 * 0.6, dy * 0.88 * 0.6, dz * 0.88 * 0.6)
      }
      e.birth.setX(s, this.t)
      e.spd.setX(s, (0.5 + Math.random() * 0.9) * (0.5 + strength))
    }
    e.dir.needsUpdate = true
    e.org.needsUpdate = true
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
    this.camera.aspect = w / Math.max(1, h)
    this.placeCamera()
    // The subject dominates the stage, like the reference.
    this.uniforms.uR.value = 0.88
  }

  /** Camera at x looking at (x,0,0) shows world-x at screen centre, so to
   *  place world 0 RIGHT of centre the camera itself moves LEFT.
   *  Closer camera = magnification; the pan offset shrinks with it so the
   *  subject stays where the chrome expects it. Dissection dollies back —
   *  the exploded stack is taller than the star it came from. */
  private placeCamera() {
    const aspect = this.camera.aspect
    const dis = this.uniforms.uDissect.value as number
    const baseZ = 1 / Math.tan((40 / 2) * (Math.PI / 180))
    this.camera.position.z = (baseZ / this.zoom) * (1 + dis * 0.5)
    const off = (-(this.focusFrac - 0.5) * 2 * aspect) / this.zoom
    this.camera.position.x = off
    this.camera.lookAt(off, 0, 0)
    this.camera.updateProjectionMatrix()
  }

  render(dt: number, low: number, mid: number, high: number, pulse: number, ahead = 0, snap = 0) {
    // The velocity edit: simulation time itself lurches on hits and eases
    // back between them — motion CUTS on the beat instead of drifting
    // through it. Snap is unsprung by design.
    this.uniforms.uSnap.value = snap
    const warp = 0.7 + this.uniforms.uPulse.value * 1.6 + snap * 1.4
    this.t += dt * warp
    this.uniforms.uTime.value = this.t
    this.uniforms.uLow.value = this.lowE.update(low, dt, 11)
    this.uniforms.uMid.value = this.midE.update(mid, dt, 9)
    this.uniforms.uHigh.value = this.highE.update(high, dt, 13)
    this.uniforms.uPulse.value = this.pulseE.update(pulse, dt, 16)
    this.uniforms.uAhead.value = this.aheadE.update(ahead, dt, 1.6)
    this.uniforms.uReveal.value = Math.min(1, (performance.now() - this.born) / 1700)

    // The shear itself is sprung: release your grip mid-pull and the stack
    // slams shut like a real mechanism, not a UI transition.
    const dis = this.dissectE.update(this.dissectTarget, dt, 7)
    this.uniforms.uDissect.value = dis
    if (Math.abs(dis - this.lastDis) > 1e-3) {
      this.lastDis = dis
      this.placeCamera()
    }

    // Damped zoom: the dolly glides, and spending the reserve is gradual.
    if (Math.abs(this.zoom - this.zoomTarget) > 1e-4) {
      this.zoom += (this.zoomTarget - this.zoom) * Math.min(1, dt * 6)
      this.uniforms.uZoom.value = this.zoom
      this.applyDensity()
      this.resize(this.lastW, this.lastH)
    }

    // Reference cluster's motion law, unclamped for a sphere: free spin.
    const ease = Math.min(1, dt * 4)
    this.ptr.x += (this.ptr.tx - this.ptr.x) * ease
    this.ptr.y += (this.ptr.ty - this.ptr.y) * ease
    this.drag.x += (this.drag.tx - this.drag.x) * ease
    this.drag.y += (this.drag.ty - this.drag.y) * ease
    if (!this.calm) this.driftT += dt * (0.06 + this.uniforms.uPulse.value * 0.05) * this.spinDial * (0.75 + warp * 0.25)
    this.cluster.rotation.y = this.driftT + this.ptr.x * 0.6 + this.drag.x
    // Dissected, the view settles into the surveyor's tilt — looking
    // slightly down the axis so the rings read as the drawing's ellipses.
    // The y-spin stays: numbered markers orbiting is the drawing, alive.
    const baseRx = Math.sin(this.driftT * 0.4) * 0.12 - this.ptr.y * 0.5 + this.drag.y
    this.cluster.rotation.x = baseRx * (1 - dis) + 0.42 * dis

    this.bloom.strength = (0.32 + this.uniforms.uLow.value * 0.3 + this.uniforms.uPulse.value * 0.15) * this.uniforms.uExpo.value
    // Persistence leans with the bass: quiet = crisp, heavy = long exposure.
    ;(this.after.uniforms as { damp: { value: number } }).damp.value = 0.76 + this.uniforms.uLow.value * 0.15
    this.composer.render()
  }
}
