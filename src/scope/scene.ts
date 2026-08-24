/**
 * The instrument, on the GPU.
 *
 * ~30k particles arranged as concentric rings around a gaussian core, every
 * displacement computed in the vertex shader from a handful of SMOOTHED
 * uniforms — the CPU's only job per frame is easing envelopes. That's where
 * the reference's liquid feel comes from: nothing on screen ever receives a
 * raw analyser value; every parameter is critically damped, so a kick reads
 * as a swell with a fast front edge, never a strobe.
 *
 * Additive blending + UnrealBloom give the phosphor body the glyph pass
 * could not: particles pile up into glow where they crowd, and the core
 * whites out on real bass exactly like the reference footage.
 */

import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const RINGS = 34
const PER_RING = 700
const CORE_N = 2400

const RING_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;  // upcoming-energy pre-arm, 0..1
  uniform float uR;      // outer radius, world units
  uniform float uReveal;
  attribute float aRing;  // 0 inner .. 1 outer
  attribute float aTheta;
  attribute float aHash;
  varying float vGlow;
  varying float vHash;

  void main() {
    // Turbulence grows inward; outer rings stay calm — the reference's law.
    float inward = 1.0 - aRing;
    float turb = (uMid * 1.5 + uHigh * 0.8 + uLow * 0.35) * (0.18 + inward * 1.45);

    float base = uR * (0.17 + 0.83 * pow(aRing, 0.92)) * (1.0 + uPulse * 0.035);
    float th = aTheta;

    // Three incommensurate angular waves; per-ring phase from the hash so
    // rings never align into moiré.
    float ph = aHash * 6.2831;
    float sp = 0.5 + aHash * 0.9;
    // Higher angular orders: low-order sines make symmetric petals; the
    // reference ripples nervously at fine scale. Displacement is capped so
    // rings tangle without collapsing into the core.
    float d =
      sin(th * 5.0 + ph + uTime * sp * 1.15) * turb * uR * 0.009 +
      sin(th * 11.0 - ph * 2.0 + uTime * sp * 1.9) * turb * turb * uR * 0.014 +
      sin(th * 23.0 + ph * 3.0 + uTime * sp * 3.6 + aRing * 40.0) * turb * uR * 0.008 +
      sin(th * 41.0 + uTime * sp * 5.5) * uHigh * turb * uR * 0.006;
    d = clamp(d, -uR * 0.045, uR * 0.045);

    float r = base + d;
    vec3 p = vec3(cos(th) * r, sin(th) * r, 0.0);

    // Local intensity: displacement relative to calm = brightness. Additive
    // blending stacks ~3 overlapping sprites per ring pixel, so per-particle
    // energy stays LOW — a calm ring should read as a dim etched line.
    float k = clamp(abs(d) / (uR * 0.02), 0.0, 1.0);
    // The machine sees the future: outer rings arm faintly as a loud
    // section approaches — anticipation, read from the precomputed peaks.
    vGlow = (0.11 + 0.3 * k + 0.14 * turb + uPulse * 0.12) * (1.0 + uAhead * 0.5 * aRing);
    vHash = aHash;

    // Reveal: particles bloom outward from nothing on power-up.
    float on = step(fract(aHash * 977.0), uReveal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.3 + k * 1.8 + uPulse * 0.5) * on;
  }
`

const RING_FRAG = /* glsl */ `
  precision mediump float;
  varying float vGlow;
  varying float vHash;
  void main() {
    // Soft round sprite, slightly irregular per particle.
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.08 + vHash * 0.12, length(uv));
    gl_FragColor = vec4(vec3(0.92, 0.92, 0.92) * vGlow * m, 1.0);
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
  attribute float aHash;
  attribute vec3 aSeed; // gaussian ball seed, |aSeed| ~ N(0,1)
  varying float vHeat;

  void main() {
    float coreR = uR * (0.07 + uLow * 0.21 + uPulse * 0.04);
    // Each particle orbits its seed slowly; the ball boils, not scatters.
    float t = uTime * (0.4 + aHash * 1.2);
    vec3 wob = vec3(
      sin(t * 3.1 + aHash * 40.0),
      cos(t * 2.7 + aHash * 71.0),
      0.0
    ) * coreR * (0.10 + uHigh * 0.5);
    vec3 p = aSeed * coreR + wob;
    // Heat: center hottest, boils brighter with the music.
    float dist = length(p) / max(coreR * 2.2, 1.0);
    // Capped: the loud state must BOIL, not flatten into a white disc —
    // texture inside the hot mass is what the reference's peaks look like.
    // Clumped heat: neighbouring particles share hash bands, so the mass
    // reads as bright florets with dark cracks instead of an even glow.
    float clump = 0.45 + 0.55 * sin(aHash * 43.7 + uTime * 0.9);
    vHeat = min(0.42, (1.0 - clamp(dist, 0.0, 1.0)) * (0.14 + uLow * 0.5 + uMid * 0.16) * (0.5 + clump));
    float on = step(fract(aHash * 613.0), uReveal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.5 + vHeat * 2.6) * on;
  }
`

const CORE_FRAG = /* glsl */ `
  precision mediump float;
  varying float vHeat;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.05, length(uv));
    gl_FragColor = vec4(vec3(1.0) * vHeat * m, 1.0);
  }
`

/** Critically-damped smoother — fast attack, slow settle, no overshoot. */
class Env {
  v = 0
  private vel = 0
  update(target: number, dt: number, omega: number) {
    // Standard critically damped spring toward target.
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
  private camera: THREE.OrthographicCamera
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private uniforms: Record<string, THREE.IUniform>
  private lowE = new Env()
  private midE = new Env()
  private highE = new Env()
  private pulseE = new Env()
  private aheadE = new Env()
  private born = performance.now()
  private t = 0

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
    // Display-space pipeline: automatic colorspace encoding is OFF. Measured
    // at the glass, the composer route was encoding twice (clear #0a0a0a
    // arrived as #383838), so all hidden transforms are disabled and every
    // value in the shaders is tuned as what the screen actually shows.
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    THREE.ColorManagement.enabled = false
    this.renderer.setClearColor(0x0a0a0a, 1)
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    this.camera.position.z = 5

    this.uniforms = {
      uTime: { value: 0 },
      uLow: { value: 0 },
      uMid: { value: 0 },
      uHigh: { value: 0 },
      uPulse: { value: 0 },
      uAhead: { value: 0 },
      uR: { value: 1 },
      uReveal: { value: 0 },
    }

    // --- ring cloud --------------------------------------------------------
    {
      const n = RINGS * PER_RING
      const ring = new Float32Array(n)
      const theta = new Float32Array(n)
      const hash = new Float32Array(n)
      const pos = new Float32Array(n * 3) // unused by shader; three requires it
      let p = 0
      for (let i = 0; i < RINGS; i++) {
        const ringHash = Math.random()
        for (let s = 0; s < PER_RING; s++) {
          ring[p] = i / (RINGS - 1)
          theta[p] = (s / PER_RING) * Math.PI * 2 + (i % 2) * 0.5
          hash[p] = ringHash
          p++
        }
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aRing', new THREE.BufferAttribute(ring, 1))
      geo.setAttribute('aTheta', new THREE.BufferAttribute(theta, 1))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: RING_VERT,
        fragmentShader: RING_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        transparent: false,
      })
      this.scene.add(new THREE.Points(geo, mat))
    }

    // --- core ---------------------------------------------------------------
    {
      const seed = new Float32Array(CORE_N * 3)
      const hash = new Float32Array(CORE_N)
      const pos = new Float32Array(CORE_N * 3)
      for (let i = 0; i < CORE_N; i++) {
        // Gaussian-ish ball via Box–Muller pairs, flattened to the disc plane.
        // Shell-biased, not a filled ball: a gaussian ball stacks additive
        // sprites into a featureless white disc at the middle. The reference's
        // hot mass is cauliflower — structure and dark cracks — which falls
        // out of a shell with clumped density.
        const th = Math.random() * Math.PI * 2
        const rr = 0.45 + Math.pow(Math.random(), 0.45) * 0.85
        seed[i * 3] = Math.cos(th) * rr
        seed[i * 3 + 1] = Math.sin(th) * rr
        seed[i * 3 + 2] = 0
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
      this.scene.add(new THREE.Points(geo, mat))
    }

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    // Threshold matters most: only genuinely hot pixels may bloom, or the
    // whole frame washes grey.
    this.bloom = new UnrealBloomPass(new THREE.Vector2(2, 2), 0.5, 0.35, 0.55)
    this.composer.addPass(this.bloom)
    // Debug probe — lets the pipeline be bisected from the console.
    ;(window as unknown as { __scene: Scene }).__scene = this
  }

  get bloomPass() {
    return this.bloom
  }

  /** Horizontal focus as a viewport fraction — the disc sits at 0.5 on the
   *  standby poster and shifts right when the console rail opens. */
  private focusFrac = 0.5
  private lastW = 2
  private lastH = 1
  setFocus(frac: number) {
    this.focusFrac = frac
    this.resize(this.lastW, this.lastH)
  }

  resize(w: number, h: number) {
    this.lastW = w
    this.lastH = h
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h, false)
    // Composer multiplies by the renderer's pixelRatio itself — passing
    // device pixels here would quadruple the bloom targets.
    this.composer.setSize(w, h)
    const aspect = w / Math.max(1, h)
    // To make world x=0 APPEAR at focusFrac of the width, the camera window
    // shifts the opposite way: frac = (0 - left) / (right - left).
    const off = -(this.focusFrac - 0.5) * 2 * aspect
    this.camera.left = -aspect + off
    this.camera.right = aspect + off
    this.camera.top = 1
    this.camera.bottom = -1
    this.camera.updateProjectionMatrix()
    // Disc radius in world units: 0.72 of the half-height.
    this.uniforms.uR.value = 0.72
  }

  render(dt: number, low: number, mid: number, high: number, pulse: number, ahead = 0) {
    this.t += dt
    // The liquid: attack ~fast (omega 14), release rides the spring settle.
    this.uniforms.uTime.value = this.t
    this.uniforms.uLow.value = this.lowE.update(low, dt, 11)
    this.uniforms.uMid.value = this.midE.update(mid, dt, 9)
    this.uniforms.uHigh.value = this.highE.update(high, dt, 13)
    this.uniforms.uPulse.value = this.pulseE.update(pulse, dt, 16)
    // Very slow spring: anticipation should creep in over seconds.
    this.uniforms.uAhead.value = this.aheadE.update(ahead, dt, 1.6)
    this.uniforms.uReveal.value = Math.min(1, (performance.now() - this.born) / 1700)
    // Bloom breathes with the bass — the whole picture inhales.
    this.bloom.strength = 0.35 + this.uniforms.uLow.value * 0.35 + this.uniforms.uPulse.value * 0.18
    this.composer.render()
  }
}
