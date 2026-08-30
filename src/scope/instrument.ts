/**
 * The instrument — rings made of type, literally.
 *
 * No raster sampling: characters are PLACED along each deformed ring at
 * arc-length steps, so rings stay crisp at any density — a square glyph grid
 * resampling concentric circles always moirés, so the grid is gone. Each
 * character is chosen by the local signal (calm ring → thin dots and colons,
 * turbulent ring → hashes), and cells hit by a transient draw scramble
 * glyphs for a frame. The core is a boiling cluster of bright characters
 * over a soft phosphor bloom — the only smooth thing on the screen, because
 * it is light, not matter.
 *
 * Physics kept from the reference: outer rings stay calm, turbulence grows
 * inward, bass swells the core, and per-ring envelopes attack fast and decay
 * slow so a loud bar leaves a wake.
 */

import type { Features } from '../audio/features'
import { INK, HOT, EMBER } from '../theme'

const RINGS = 26
const RAMP = '·.:;=+*x/<>{}#@'
const CALM = '·:·:·'
const SCRAMBLE = ':=+xX#@'
const MONO = 'ui-monospace, Menlo, "SF Mono", monospace'

export class Instrument {
  private t = 0
  private turb = new Float32Array(RINGS)
  private phase = Float32Array.from({ length: RINGS }, () => Math.random() * Math.PI * 2)
  private speed = Float32Array.from({ length: RINGS }, () => 0.4 + Math.random() * 0.9)
  private born = performance.now()

  draw(c: CanvasRenderingContext2D, w: number, h: number, dt: number, f: Features, beatPulse: number) {
    this.t += dt
    const cx = w / 2
    const cy = h / 2
    const R = Math.min(w, h) * 0.36
    const breathe = 1 + beatPulse * 0.03
    const { low, mid, high } = f
    const live = f.rms > 0.015

    // Per-ring turbulence memory (index 0 = innermost).
    for (let i = 0; i < RINGS; i++) {
      const inward = 1 - i / RINGS
      const drive = mid * 1.35 + high * 0.75 + low * 0.35
      const target = Math.min(1.6, drive * (0.2 + inward * 1.6))
      const k = target > this.turb[i] ? 4.5 : 1.05
      this.turb[i] += (target - this.turb[i]) * Math.min(1, dt * k)
    }

    const reveal = smooth01((performance.now() - this.born) / 1600)
    const cellPx = Math.max(7, R / 24)
    c.textAlign = 'center'
    c.textBaseline = 'middle'

    // --- phosphor bloom under everything ----------------------------------
    const coreR = R * (0.1 + low * 0.3 + beatPulse * 0.04)
    const halo = c.createRadialGradient(cx, cy, 0, cx, cy, R * 1.2)
    halo.addColorStop(0, INK(0.1 + low * 0.22))
    halo.addColorStop(0.45, INK(0.04 + low * 0.06))
    halo.addColorStop(1, INK(0))
    c.fillStyle = halo
    c.beginPath()
    c.arc(cx, cy, R * 1.2, 0, Math.PI * 2)
    c.fill()

    // --- the rings ----------------------------------------------------------
    for (let i = RINGS - 1; i >= 0; i--) {
      // Outermost first so inner (brighter) rings print over them.
      const u = i / (RINGS - 1) // 0 inner → 1 outer
      const base = R * (0.16 + 0.84 * Math.pow(u, 0.92)) * breathe
      const turb = this.turb[i]
      const ph = this.phase[i]
      const sp = this.speed[i]
      // Displacement stays under ~half the ring gap: rings must deform as
      // CONTOURS, not scatter into loose characters — the reference keeps
      // its concentric lines readable even at full turbulence.
      const a1 = turb * R * 0.016
      const a2 = turb * turb * R * 0.018
      const a3 = high * turb * R * 0.009

      const steps = Math.max(18, Math.round((Math.PI * 2 * base) / cellPx))
      const fontPx = cellPx * 1.35
      c.font = `bold ${fontPx}px ${MONO}`
      const ringGlow = Math.min(1, 0.5 + turb * 0.5 + beatPulse * 0.25)

      for (let s = 0; s < steps; s++) {
        // Deterministic per-cell hash — reveal order and char jitter stay
        // stable frame to frame instead of boiling randomly.
        const hash = fract(Math.sin(i * 127.1 + s * 311.7) * 43758.5)
        if (hash > reveal) continue
        const th = (s / steps) * Math.PI * 2
        const d =
          a1 * Math.sin(th * 3 + ph + this.t * sp * 1.3) +
          a2 * Math.sin(th * 7 - ph * 2 + this.t * sp * 2.1) +
          a3 * Math.sin(th * 17 + this.t * sp * 6 + i)
        const r = base + d
        const x = cx + Math.cos(th) * r
        const y = cy + Math.sin(th) * r

        // Local intensity: how far this cell is thrown off its circle.
        const k = Math.min(1, Math.abs(d) / (R * 0.02) + turb * 0.35)
        let ch: string
        if (!live || k < 0.14) {
          ch = CALM[(s + i) % CALM.length]
        } else if (k > 0.75 && hash < beatPulse * 0.9) {
          ch = SCRAMBLE[((hash * 977) | 0) % SCRAMBLE.length]
        } else {
          ch = RAMP[Math.min(RAMP.length - 1, (k * (RAMP.length - 1)) | 0)]
        }

        const a = (0.38 + 0.55 * Math.max(k, live ? 0.2 : 0.06)) * ringGlow
        // A luminance ramp, not ink: each glyph's brightness IS its value,
        // so it stays greyscale. Left for the new language to rule on.
        const v = Math.round(186 + 68 * k)
        c.fillStyle = `rgba(${v},${v},${v},${Math.min(0.95, a)})`
        c.fillText(ch, x, y)
      }
    }

    // --- the core: bass as boiling matter ----------------------------------
    if (live) {
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.5)
      g.addColorStop(0, HOT(0.5 + low * 0.5))
      g.addColorStop(1, HOT(0))
      c.fillStyle = g
      c.beginPath()
      c.arc(cx, cy, coreR * 1.5, 0, Math.PI * 2)
      c.fill()

      const n = Math.round(10 + low * 70 + mid * 50 + high * 40)
      const fontPx = cellPx * 1.2
      c.font = `bold ${fontPx}px ${MONO}`
      for (let s = 0; s < n; s++) {
        const th = Math.random() * Math.PI * 2
        // Bias density toward the rim of the core — a ring of boil, hollow-ish
        // centre covered by the bloom.
        const rr = coreR * (0.35 + Math.pow(Math.random(), 0.6) * 0.95)
        const hot = Math.random()
        c.fillStyle = hot > 0.8 ? HOT(0.95) : EMBER(0.35 + hot * 0.45)
        c.fillText(
          hot > 0.72 ? '@' : hot > 0.4 ? '#' : '*',
          cx + Math.cos(th) * rr,
          cy + Math.sin(th) * rr,
        )
      }
    }
  }
}

function smooth01(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}
function fract(v: number) {
  return v - Math.floor(v)
}
