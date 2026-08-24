/**
 * The track fingerprint.
 *
 * `Features` describes *this instant*. A fingerprint describes *this track* —
 * slow-moving character that only shifts over tens of seconds. The butterfly
 * reads the fingerprint for its temperament (wing-beat rate, hue, nervousness)
 * and the raw features for its reflexes (glow, dodges, tear bands).
 *
 * Nothing here is genre *classification*. We never decide "this is DNB" — we
 * measure continuous properties and let the specimen respond to them. A track
 * between genres gets a butterfly between temperaments.
 */

import type { Features } from './features'

export interface Fingerprint {
  /** Estimated BPM, folded into 70–180. 0 until confident. */
  tempo: number
  /** 0..1 confidence in that tempo. */
  tempoConfidence: number
  /** 0..1 — dark/warm (dub, lofi) → bright/airy (dnb, hyperpop). */
  brightness: number
  /** 0..1 — smooth/sustained (pads, tape) → percussive/transient (breaks). */
  punch: number
  /** Onsets per second, normalised 0..1. Breakbeats sit near the top. */
  density: number
  /** 0..1 — how much the loudness moves. Compressed masters sit low. */
  dynamics: number
  /** Long-run average loudness 0..1. */
  loudness: number
}

const HISTORY = 900 // ~15s at 60fps

export class FingerprintTracker {
  private brightnessH: number[] = []
  private crestH: number[] = []
  private rmsH: number[] = []
  private densityEma = 0
  private elapsed = 0

  readonly value: Fingerprint = {
    tempo: 0,
    tempoConfidence: 0,
    brightness: 0.5,
    punch: 0.5,
    density: 0.3,
    dynamics: 0.5,
    loudness: 0.5,
  }

  /** Call once per frame with the live features and the analyser's onset log. */
  update(f: Features, onsets: readonly number[], now: number, dt: number): Fingerprint {
    this.elapsed += dt
    push(this.brightnessH, f.centroid)
    push(this.crestH, f.crest)
    push(this.rmsH, f.rms)

    const v = this.value
    v.brightness = mean(this.brightnessH)
    v.punch = clamp01((mean(this.crestH) - 0.18) / 0.42)
    v.loudness = mean(this.rmsH)
    v.dynamics = clamp01(std(this.rmsH) / 0.18)

    const recent = countSince(onsets, now - 8)
    const perSec = recent / Math.min(8, Math.max(1, this.elapsed))
    this.densityEma += (clamp01(perSec / 9) - this.densityEma) * Math.min(1, dt * 0.4)
    v.density = this.densityEma

    const t = estimateTempo(onsets, now)
    v.tempo = t.bpm
    v.tempoConfidence = t.confidence
    return v
  }
}

/**
 * Inter-onset-interval histogram, octave-folded into 70–180 BPM.
 *
 * Not as accurate as autocorrelating a full onset envelope, but it's ~40 lines
 * instead of ~200 and it locks onto a 174 BPM break and an 82 BPM lofi loop
 * inside a couple of bars, which is all the wings need.
 */
function estimateTempo(onsets: readonly number[], now: number): { bpm: number; confidence: number } {
  const window = 12
  const recent: number[] = []
  for (let i = onsets.length - 1; i >= 0; i--) {
    if (onsets[i] < now - window) break
    recent.push(onsets[i])
  }
  if (recent.length < 8) return { bpm: 0, confidence: 0 }
  recent.reverse()

  // 1 BPM buckets. Every onset pair votes, not just adjacent ones — that way a
  // missed hit doesn't poison the estimate.
  const votes = new Float32Array(181)
  let total = 0
  for (let i = 0; i < recent.length; i++) {
    for (let j = i + 1; j < Math.min(recent.length, i + 5); j++) {
      const iv = recent[j] - recent[i]
      if (iv < 0.15 || iv > 2.2) continue
      let bpm = 60 / iv
      while (bpm < 70) bpm *= 2
      while (bpm > 180) bpm /= 2
      const b = Math.round(bpm)
      if (b < 70 || b > 180) continue
      votes[b] += 1
      votes[b - 1] += 0.5
      votes[b + 1] += 0.5
      total += 2
    }
  }
  if (!total) return { bpm: 0, confidence: 0 }

  let best = 0
  let bestV = 0
  for (let b = 70; b <= 180; b++) {
    if (votes[b] > bestV) {
      bestV = votes[b]
      best = b
    }
  }
  return { bpm: best, confidence: clamp01((bestV / total) * 6) }
}

function push(a: number[], v: number) {
  a.push(v)
  if (a.length > HISTORY) a.shift()
}
function mean(a: number[]) {
  if (!a.length) return 0
  let s = 0
  for (const v of a) s += v
  return s / a.length
}
function std(a: number[]) {
  if (a.length < 2) return 0
  const m = mean(a)
  let s = 0
  for (const v of a) s += (v - m) * (v - m)
  return Math.sqrt(s / a.length)
}
function countSince(a: readonly number[], t: number) {
  let n = 0
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] < t) break
    n++
  }
  return n
}
function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x
}
