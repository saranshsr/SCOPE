/**
 * The beat clock — a stroke grid phase-locked to the music.
 *
 * Knowing the BPM is not enough to dance: the tempo estimate gives a *rate*,
 * but a wing-stroke that drifts against the kick reads as coincidence, not
 * rhythm. This keeps a phase too — every detected onset nudges the grid so
 * that grid-zero converges onto where the hits actually land (a tiny PLL).
 * Not every onset is a downbeat, but the IOI histogram already picked the
 * period, so on-grid onsets pull coherently and off-grid ones average out.
 *
 * The grid anticipates: triggers fire `lead` seconds before the beat so the
 * *bottom* of the downstroke — the visual hit — lands on the audible one.
 *
 * Above ~140 BPM the grid runs half-time. A 174 BPM breakbeat at one stroke
 * per beat is a moth in a panic; every second beat reads as a dancer
 * pocketing double-time.
 */

import type { Features } from './features'
import type { Fingerprint } from './fingerprint'

export interface Beat {
  /** True on every beat — drives the tube thump and the velocity-edit warp. */
  trigger: boolean
  /** True on the beats a wing-stroke should fire — the grid folded to a
   *  realistic stroke rate (≤ ~72/min: every 2nd beat at 90 BPM, every bar
   *  on a 174 BPM break). The body cuts on every beat; the wings stay slow. */
  strokeTrigger: boolean
  /** 0..1 — how hard the triggering beat hits. */
  strength: number
  /** Locked to a tempo grid, vs following raw onsets. */
  locked: boolean
  /** Seconds per beat. */
  period: number
  /** Seconds per wing-stroke interval (period × fold). */
  strokePeriod: number
}

export class BeatClock {
  private phase = 0
  private period = 0.75
  private locked = false
  private lastTrigger = -9
  private pending = 0 // strength gathered from onsets since last trigger
  private tick = 0

  readonly value: Beat = {
    trigger: false,
    strokeTrigger: false,
    strength: 0.5,
    locked: false,
    period: 0.75,
    strokePeriod: 1.5,
  }

  update(f: Features, fp: Fingerprint, now: number, dt: number): Beat {
    const v = this.value
    v.trigger = false
    v.strokeTrigger = false

    this.locked = fp.tempoConfidence > 0.15 && fp.tempo > 0
    if (this.locked) this.period = 60 / fp.tempo
    v.locked = this.locked
    v.period = this.period
    // Fold by powers of two until the stroke rate is unhurried — a big
    // morpho flaps at about a hertz, not at a hi-hat.
    let strokeEvery = 1
    while (60 / this.period / strokeEvery > 72) strokeEvery *= 2
    v.strokePeriod = this.period * strokeEvery

    // The visual hit is the downstroke bottom, downDur after the trigger —
    // so the grid target sits `lead` of a period early.
    const downDur = Math.min(0.16, Math.max(0.09, this.period * 0.3))
    const lead = downDur / this.period

    if (f.onset) {
      // Strength: spectral flux says how hard, bass says how heavy.
      const s = Math.min(1, f.flux * 26 * 0.6 + f.low * 0.7)
      this.pending = Math.max(this.pending, s)

      if (this.locked) {
        // Nudge grid-zero toward this onset (compensated for the lead).
        const err = signedMod(this.phase + lead)
        if (Math.abs(err) < 0.3) this.phase -= err * 0.4
      } else if (now - this.lastTrigger > 0.28) {
        // No grid yet: every onset is its own stroke. This is what makes the
        // first seconds — and ambient material — feel wired to the sound.
        this.phase = 1
      }
    }

    this.phase += dt / this.period
    if (this.phase >= 1) {
      this.phase -= Math.floor(this.phase)
      // In locked mode the grid ticks regardless of onsets (the beat exists
      // even when the drummer rests); strength falls back to current energy.
      if (this.locked || now - this.lastTrigger <= 0.28 || this.pending > 0) {
        v.trigger = true
        this.tick++
        v.strokeTrigger = this.tick % Math.max(1, Math.round(v.strokePeriod / this.period)) === 0
        v.strength = Math.max(this.pending, Math.min(1, f.rms * 0.9))
        this.pending = 0
        this.lastTrigger = now
      }
    }

    return v
  }
}

/** Wrap a phase into [-0.5, 0.5) — signed distance from grid-zero. */
function signedMod(p: number) {
  const m = ((p % 1) + 1) % 1
  return m > 0.5 ? m - 1 : m
}
