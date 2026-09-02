/**
 * musical intensity, in four tiers.
 *
 * `Features` says what the signal is doing this instant. this says what the
 * *music* is doing: drifting, ticking along, hitting hard, or dropping. the
 * visualiser needs that distinction because "react to rms" gives you a thing
 * that wobbles constantly and never has a moment. a moment needs a scale to
 * be measured against, and the only honest scale is the track's own.
 *
 * so every threshold here is derived from rolling statistics of the track
 * playing right now. lo-fi calibrates itself quiet, techno calibrates itself
 * loud, and no genre label appears anywhere. this is the same reasoning as
 * the adaptive onset threshold in features.ts, one level up.
 *
 * two detectors, and they are deliberately not the same shape:
 *
 *   STRONG is a *transient*. one onset whose strength sits above roughly the
 *   90th percentile of the recent onsets. it is instantaneous by definition.
 *
 *   DROP is a *section change*. rms steps up against its own lagging baseline
 *   and stays up for half a second. one loud kick is not a drop, which is why
 *   there is a sustain requirement and not just a threshold.
 *
 * the one thing that is NOT adaptive is the floor, and that is the whole
 * point of it. see FLOOR_RMS.
 *
 * the rolling windows are sized in FRAMES against a nominal 60fps, the same
 * way features.ts sizes its own. on a 120Hz display they cover half the wall
 * time; the detectors still work, they just have a shorter memory. only the
 * things where the duration is the meaning (warm-up, sustain, refractory,
 * every envelope) are in seconds and integrate dt.
 */

import type { Features } from './features'

// --- absolute floor -------------------------------------------------------
// the known failure of pure normalisation: an ambient track with no transients
// normalises its own noise floor into "beats", every threshold here scales
// down to meet it, and the star twitches at silence. statistics cannot tell
// the difference between quiet music and no music, so a fixed gate has to.
// below these the tier is LOW no matter what the rolling windows say.
//
// pick the number in dBFS, not by eye. the perceptual curve in features.ts
// ((raw*3.2)^0.62) is very steep down here, so a value that looks small in
// feature space is not: 0.06 reads like a sensible floor and is actually
// -50 dBFS, low enough that dither still gets called a beat. it was, in the
// synthetic near-silence test. 0.09 is about -44 dBFS, and quiet lo-fi in the
// same tests measures 0.17 upward: under real music, over a noise floor.
const FLOOR_RMS = 0.065 // 0.09 before the rms rescale in features.ts (x0.724)
// hysteresis, so a passage sitting exactly on the floor does not flicker
// between LOW and NORMAL at 60fps, which looks worse than either state.
const FLOOR_DROPOUT = 0.85
const FLOOR_FLUX = 0.002

// --- warm-up --------------------------------------------------------------
// rolling stats over one second of history are not statistics, they are the
// first second. reporting a tier off them means every track change fires
// garbage on frame one, so hold at LOW and say so via `ready`.
const WARMUP_S = 3.0

// --- onset strength -------------------------------------------------------
const FLUX_WIN = 90 // 1.5s at 60fps, long enough to hold a couple of bars
const FLUX_EPS = 0.0008 // stops the z-score exploding on a dead-flat window
const ONSET_MEM = 48 // recent onsets kept for the percentile
const ONSET_MIN = 12 // fewer than this and "90th percentile" means nothing
const STRONG_PCT = 0.9
// margin + absolute z, together. on perfectly uniform material every onset
// sits at the percentile and a bare `z > p90` would fire on half of them.
const STRONG_MARGIN = 1.12
const STRONG_Z_MIN = 2.6

// --- drop -----------------------------------------------------------------
const RMS_WIN = 300 // 5s of rms history
const RMS_GUARD = 60 // the last 1s of it, excluded from the baseline
const EDGE_S = 0.35 // how far back "did it jump" looks
const DROP_K = 2.2 // sigmas above the baseline that count as a step
const DROP_MIN_STEP = 0.06 // and an absolute step, for near-static baselines
const DROP_MIN_LEVEL = 0.109 // a drop into a whisper is not a drop. 0.15 pre-rescale
const DROP_EDGE_MIN = 0.04
const DROP_EDGE_K = 1.0
const DROP_SUSTAIN_S = 0.45 // hold time before it counts as a section
const DROP_BREAK = 3 // frames of credit burned per frame back below
const DROP_REFRACTORY_S = 4.0 // one drop is one event

// --- envelopes ------------------------------------------------------------
// all fast attack (set on the frame, no rise time) and exponential decay.
// a burst that ramps in has already missed the hit it was reacting to.
const DROP_TAU = 0.85 // ~10% left at 2s, gone by 2.5s
const STRONG_TAU = 0.17 // ~10% left at 0.4s
const BEAT_TAU = 0.13
const CALM_TAU = 0.6 // calm is a mood, not an event: smoothed both ways

const TIER3_AT = 0.3 // drop holds tier 3 for ~1.0s
const TIER2_AT = 0.25 // strong holds tier 2 for ~0.24s
const TIER1_SINCE = 1.2 // still "playing" this long after the last onset

const TRACK_TAU = 12 // long-run loudness, for calm
const CALM_DEV_MIN = 0.04 // a compressed master has near-zero deviation

export interface Energy {
  tier: 0 | 1 | 2 | 3
  /** 0..1 envelopes, fast attack + eased decay, for driving visuals */
  drop: number
  strong: number
  beat: number
  /** 0..1, how quiet this passage is relative to the track. drives the calm state */
  calm: number
  /** false until the rolling windows have enough history to mean anything */
  ready: boolean
}

/**
 * fixed ring with running sum and sum of squares, so mean and std are O(1).
 * the `Running` in features.ts re-loops its window every frame, which is fine
 * at 43 samples and is not fine at 300, beside a 108k particle sim.
 */
class Ring {
  private buf: Float64Array
  private head = 0
  private n = 0
  sum = 0
  sumSq = 0

  constructor(readonly cap: number) {
    this.buf = new Float64Array(cap)
  }

  push(x: number) {
    if (this.n === this.cap) {
      const old = this.buf[this.head]
      this.sum -= old
      this.sumSq -= old * old
    } else {
      this.n++
    }
    this.buf[this.head] = x
    this.sum += x
    this.sumSq += x * x
    this.head = (this.head + 1) % this.cap
  }

  /** value from `ago` frames back, 0 being the frame just pushed. */
  at(ago: number) {
    if (this.n === 0) return 0
    const k = Math.min(ago, this.n - 1)
    return this.buf[(this.head - 1 - k + this.cap * 2) % this.cap]
  }

  get count() {
    return this.n
  }
  get full() {
    return this.n === this.cap
  }

  clear() {
    this.head = 0
    this.n = 0
    this.sum = 0
    this.sumSq = 0
  }
}

export class EnergyTracker {
  private fluxRing = new Ring(FLUX_WIN)
  private rmsLong = new Ring(RMS_WIN)
  private rmsGuard = new Ring(RMS_GUARD)

  private onsetZ = new Float64Array(ONSET_MEM)
  private sortBuf = new Float64Array(ONSET_MEM)
  private onsetHead = 0
  private onsetN = 0
  private p90 = 0

  private live = false
  private armed = false
  private sustain = 0
  private lastDrop = -Infinity
  private elapsed = 0
  private seeded = false
  private trackMean = 0
  private trackDev = CALM_DEV_MIN

  readonly value: Energy = {
    tier: 0,
    drop: 0,
    strong: 0,
    beat: 0,
    calm: 1,
    ready: false,
  }

  /** call once per frame with the live features. the returned object is
   *  reused, so read it or copy it, never keep it as a snapshot. */
  update(f: Features, now: number, dt: number): Energy {
    const v = this.value

    // a new track's loudness has nothing to do with the last one's, and the
    // EMAs start at zero, so seed them from the first real frame instead of
    // reporting "much louder than the track" for the first ten seconds.
    if (!this.seeded) {
      this.trackMean = f.rms
      this.trackDev = CALM_DEV_MIN
      this.seeded = true
    }
    this.elapsed += dt

    // decay first, then let this frame's events set. that ordering is what
    // makes attack instant: an event written after the decay is at full
    // value on the frame it happened.
    v.drop *= Math.exp(-dt / DROP_TAU)
    v.strong *= Math.exp(-dt / STRONG_TAU)
    v.beat *= Math.exp(-dt / BEAT_TAU)

    this.live = f.rms >= (this.live ? FLOOR_RMS * FLOOR_DROPOUT : FLOOR_RMS)
    const live = this.live
    v.ready = this.elapsed >= WARMUP_S && this.fluxRing.full

    // --- onset strength ---------------------------------------------------
    // features.ts already decides *whether* this frame is an onset (rolling
    // mean + 1.6 std on flux, 0.11s refractory). we only need *how hard*, so
    // we keep a flux window purely to z-score it, and we score against the
    // window as it stood before this frame, exactly as features does. score
    // against a window containing the spike and the spike raises its own bar.
    const fn = this.fluxRing.count
    const fMean = fn > 0 ? this.fluxRing.sum / fn : 0
    const fStd = stdOf(this.fluxRing.sum, this.fluxRing.sumSq, fn)
    const z = (f.flux - fMean) / (fStd + FLUX_EPS)
    this.fluxRing.push(f.flux)

    const onset = f.onset && live && f.flux >= FLOOR_FLUX
    if (onset) {
      this.onsetZ[this.onsetHead] = z
      this.onsetHead = (this.onsetHead + 1) % ONSET_MEM
      if (this.onsetN < ONSET_MEM) this.onsetN++
      this.p90 = this.percentile(STRONG_PCT)

      const bar = Math.max(this.p90 * STRONG_MARGIN, STRONG_Z_MIN)
      // features' own gate is mean + 1.6 std, so 1.6 is the floor of what an
      // onset can score. map that span onto the beat envelope: barely-made
      // reads soft, a percentile-topping hit reads full.
      const beatLevel = clamp01(0.45 + (0.55 * (z - 1.6)) / Math.max(1, bar - 1.6))
      if (beatLevel > v.beat) v.beat = beatLevel

      if (v.ready && this.onsetN >= ONSET_MIN && z > bar) {
        const s = clamp01(0.7 + 0.3 * (z / bar - 1))
        if (s > v.strong) v.strong = s
      }
    }

    // --- drop: a sustained step in rms ------------------------------------
    this.rmsLong.push(f.rms)
    this.rmsGuard.push(f.rms)
    // the baseline excludes the most recent second on purpose. include it and
    // the step contributes to the bar it has to clear, which is how a step
    // large enough to matter ends up looking normal.
    const bn = this.rmsLong.count - this.rmsGuard.count
    const bSum = this.rmsLong.sum - this.rmsGuard.sum
    const bSq = this.rmsLong.sumSq - this.rmsGuard.sumSq
    const bMean = bn > 0 ? bSum / bn : 0
    const bStd = stdOf(bSum, bSq, bn)

    const stepBar = bMean + Math.max(DROP_MIN_STEP, DROP_K * bStd)
    const above = this.rmsLong.full && f.rms >= DROP_MIN_LEVEL && f.rms > stepBar
    const canFire = v.ready && now - this.lastDrop > DROP_REFRACTORY_S

    if (!canFire) {
      this.armed = false
      this.sustain = 0
    } else if (!this.armed) {
      // arming wants a fast EDGE, not just a high level. an 8s riser sits
      // above its own lagging baseline the entire way up, so level alone
      // fires a drop somewhere in the middle of the build, before the drop.
      const agoFrames = Math.max(1, Math.round(EDGE_S / Math.max(dt, 1e-4)))
      const edge = f.rms - this.rmsLong.at(agoFrames)
      if (above && edge >= Math.max(DROP_EDGE_MIN, DROP_EDGE_K * bStd)) {
        this.armed = true
        this.sustain = 0
      }
    } else if (above) {
      this.sustain += dt
      if (this.sustain >= DROP_SUSTAIN_S) {
        v.drop = 1
        this.lastDrop = now
        this.armed = false
        this.sustain = 0
      }
    } else {
      // a single loud kick clears the bar for about a tenth of a second. one
      // frame below burns three frames of credit so a kick can never limp its
      // way to the sustain time on a run of lucky frames.
      this.sustain -= dt * DROP_BREAK
      if (this.sustain <= 0) {
        this.armed = false
        this.sustain = 0
      }
    }

    // --- calm -------------------------------------------------------------
    const kTrack = 1 - Math.exp(-dt / TRACK_TAU)
    this.trackMean += (f.rms - this.trackMean) * kTrack
    this.trackDev += (Math.abs(f.rms - this.trackMean) - this.trackDev) * kTrack
    const dev = Math.max(CALM_DEV_MIN, this.trackDev * 1.5)
    // silence is maximally calm by definition, and it is the one reading the
    // floor must not leave to the statistics.
    const rawCalm = live ? 1 - smoothstep(this.trackMean - dev, this.trackMean + dev, f.rms) : 1
    v.calm += (rawCalm - v.calm) * (1 - Math.exp(-dt / CALM_TAU))

    // --- tier -------------------------------------------------------------
    let tier: 0 | 1 | 2 | 3 = 0
    if (v.ready && live) {
      if (v.drop >= TIER3_AT) tier = 3
      else if (v.strong >= TIER2_AT) tier = 2
      else if (f.sinceOnset < TIER1_SINCE || v.beat >= 0.05) tier = 1
    }
    v.tier = tier

    return v
  }

  /** new track. nothing measured about the last one transfers. */
  reset() {
    this.fluxRing.clear()
    this.rmsLong.clear()
    this.rmsGuard.clear()
    this.onsetHead = 0
    this.onsetN = 0
    this.p90 = 0
    this.live = false
    this.armed = false
    this.sustain = 0
    // -Infinity rather than a number, because `now` is an audio clock that
    // keeps running across the track change and any finite stamp is a lie
    // about a drop in a track that is no longer playing.
    this.lastDrop = -Infinity
    this.elapsed = 0
    this.seeded = false
    this.trackMean = 0
    this.trackDev = CALM_DEV_MIN

    const v = this.value
    v.tier = 0
    v.drop = 0
    v.strong = 0
    v.beat = 0
    v.calm = 1
    v.ready = false
  }

  /**
   * percentile of the recent onset strengths. copies into a preallocated
   * scratch and insertion-sorts it: 48 elements, and only on onset frames (a
   * few per second), never on the 60fps path proper.
   */
  private percentile(p: number) {
    const n = this.onsetN
    const s = this.sortBuf
    for (let i = 0; i < n; i++) s[i] = this.onsetZ[i]
    for (let i = 1; i < n; i++) {
      const x = s[i]
      let j = i - 1
      while (j >= 0 && s[j] > x) {
        s[j + 1] = s[j]
        j--
      }
      s[j + 1] = x
    }
    return s[Math.min(n - 1, Math.floor(p * (n - 1)))]
  }
}

function stdOf(sum: number, sumSq: number, n: number) {
  if (n < 2) return 0
  const m = sum / n
  // running sums cancel over tens of thousands of frames, so the variance can
  // land a hair below zero. unclamped that is a NaN std, and a NaN makes every
  // comparison downstream false: the tracker silently stops detecting.
  return Math.sqrt(Math.max(0, sumSq / n - m * m))
}

function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x
}

function smoothstep(a: number, b: number, x: number) {
  if (b <= a) return x >= b ? 1 : 0
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
