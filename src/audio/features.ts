/**
 * Per-frame audio analysis.
 *
 * Raw FFT bins look like a bar chart and feel dead. What makes a visual feel
 * *played* rather than *plotted* is three things, all of which happen here:
 *
 *   1. log-spaced bands  — we hear pitch logarithmically; 24 log bands from
 *      30Hz–16kHz carry far more perceptual information than 1024 linear bins.
 *   2. envelope followers — fast attack, slow release, per band. This is why a
 *      kick "punches" and then relaxes instead of flickering.
 *   3. spectral flux      — onset detection independent of loudness, so a busy
 *      quiet break still registers hits.
 */

const FFT_SIZE = 2048
const BANDS = 24
const F_LO = 30
const F_HI = 16000

export interface Features {
  /** Per-band energy 0..1, envelope-followed. Length = BANDS. */
  bands: Float32Array
  /** Broadband loudness 0..1 (RMS, perceptually curved). */
  rms: number
  /** peak/rms — high on percussive material, low on pads/washes. */
  crest: number
  /** Spectral centroid normalised 0..1. Low = dark/warm, high = bright/airy. */
  centroid: number
  /** Positive spectral flux this frame, normalised against recent history. */
  flux: number
  /** True on the frame an onset was detected. */
  onset: boolean
  /** Rises to 1 on each onset, decays exponentially. The "kick follower". */
  pulse: number
  /** Seconds since the last detected onset. */
  sinceOnset: number
  /** Low / mid / high summary, envelope-followed. Convenience for renderers. */
  low: number
  mid: number
  high: number

  // ---- THE VOICES ------------------------------------------------------
  // Everything above is the SIGNAL. What follows is what the star needs in
  // order to be PLAYED rather than pumped, and every one of these was added
  // against a measurement, not a hunch (scratch harness, 22 radio tracks):
  //
  //   the absolute bands sit pinned. Over 30s of every local track, the
  //   sprung low drive averaged 0.55..0.82 with a std of 0.012..0.05. The
  //   body's bass swell moved under 1% of its radius on a kick, which is
  //   invisible, so the only thing that visibly answered a hit was the one
  //   generic onset flash -- identical for a kick, a snare and a hat
  //   (0.85 each). The star had one reflex for everything.
  //
  // So: per-band levels read against their own running mean, and three
  // typed onset detectors, each on its own region of the spectrum with its
  // own adaptive threshold. All relative scaling of real measurements, which
  // is what law 3 allows; nothing here is synthesised.

  /** Per-band level against THAT band's own running mean, 0..1: 0.5 is
   *  "at its usual level", +0.35 per doubling (the ring meters' ratio law,
   *  DESIGN.md primitive 4). Gated to 0 where the band carries no signal,
   *  so a noise floor never normalises itself into motion. */
  bandsRel: Float32Array
  /** Typed transient envelopes, 0..1: instant attack on that region's own
   *  onset, exponential decay. Strength is relative to the region's recent
   *  hits, so a quiet master and a brickwalled one both reach the top. */
  kick: number
  snare: number
  hat: number
  /** True on the frame that region's onset was detected. */
  kickHit: boolean
  snareHit: boolean
  hatHit: boolean
  /** Sustained mid energy, 0..1: the floor the mids hold BETWEEN
   *  transients. High under a pad or a held chord, low under dry drums. */
  sustain: number
  /** Dominant spectral peak in Hz (30Hz..5kHz), parabolic-interpolated, and
   *  0 when no peak stands clear of the spectrum. A real reading: it is
   *  what `//freq_` prints. */
  pitchHz: number
  /** 0..1 -- how far that peak stands above the spectrum around it. */
  pitchConf: number
}

/** Attack/release envelope follower. Attack is fast so transients survive. */
class Envelope {
  private v = 0
  constructor(private attack: number, private release: number) {}
  push(x: number, dt: number) {
    const c = x > this.v ? this.attack : this.release
    // time-constant form so behaviour is frame-rate independent
    const a = 1 - Math.exp(-dt / c)
    this.v += (x - this.v) * a
    return this.v
  }
  get value() {
    return this.v
  }
}

/** Rolling mean + variance, for adaptive onset thresholding. */
class Running {
  private buf: number[] = []
  constructor(private n: number) {}
  push(x: number) {
    this.buf.push(x)
    if (this.buf.length > this.n) this.buf.shift()
  }
  get mean() {
    if (!this.buf.length) return 0
    let s = 0
    for (const v of this.buf) s += v
    return s / this.buf.length
  }
  get std() {
    const m = this.mean
    if (this.buf.length < 2) return 0
    let s = 0
    for (const v of this.buf) s += (v - m) * (v - m)
    return Math.sqrt(s / this.buf.length)
  }
}

/** byte -> linear amplitude over the analyser's -90..-10dB range */
const LIN = (() => {
  const t = new Float32Array(256)
  for (let i = 1; i < 256; i++) t[i] = Math.pow(10, (-90 + (80 * i) / 255) / 20)
  return t
})()

/** O(1) rolling mean/std over a fixed window, allocation-free. `Running`
 *  above re-loops its buffer every read, which is fine once per frame and
 *  not fine three more times beside a 108k-particle sim. */
class Stat {
  private buf: Float64Array
  private head = 0
  private n = 0
  private sum = 0
  private sq = 0
  constructor(private cap: number) {
    this.buf = new Float64Array(cap)
  }
  push(x: number) {
    if (this.n === this.cap) {
      const o = this.buf[this.head]
      this.sum -= o
      this.sq -= o * o
    } else this.n++
    this.buf[this.head] = x
    this.sum += x
    this.sq += x * x
    this.head = (this.head + 1) % this.cap
  }
  get mean() {
    return this.n ? this.sum / this.n : 0
  }
  get std() {
    if (this.n < 2) return 0
    const m = this.sum / this.n
    // running sums can cancel a hair below zero; a NaN std silences a detector
    return Math.sqrt(Math.max(0, this.sq / this.n - m * m))
  }
}

/**
 * One typed onset detector: a region of the spectrum, its own adaptive
 * threshold, its own envelope.
 *
 * The global onset in `update` asks "did anything happen"; these ask "did
 * the LOW end hit", "did the snare body and snap hit together", "did only
 * the top move". The threshold is the same shape as the global one (mean +
 * k std over ~0.7s of this region's flux) so each voice calibrates to the
 * track playing and no genre is assumed.
 *
 * Strength is the hit's excess over the mean, against a slow-decaying peak
 * of recent excesses: the track's usual hit reads ~1, a ghost note reads
 * small. The peak decays over ~8s, not ~1s, so a quiet breakdown's hits do
 * stay smaller than the drop's for as long as the breakdown lasts.
 */
class Voice {
  private stat = new Stat(43)
  private peak = 0
  private last = -9
  env = 0
  hit = false
  constructor(
    private k: number,
    private refractory: number,
    private tau: number,
  ) {}
  /** `share` is how much of this frame's new energy is this region's (see
   *  `voices`): a hit only counts in proportion to it, so the broadband
   *  edge every transient has cannot fire all three voices at once. */
  update(flux: number, level: number, share: number, live: boolean, t: number, dt: number) {
    const m = this.stat.mean
    const sd = this.stat.std
    this.stat.push(flux)
    this.env *= Math.exp(-dt / this.tau)
    this.peak *= Math.exp(-dt / 8)
    const excess = flux - m
    this.hit = false
    const since = t - this.last
    // SUDDEN, not just more. A hit arrives within a frame or two, so its
    // new energy is a large fraction of the region's level; a pad swelling
    // on a 0.2Hz LFO adds a fraction of a percent a frame and, against a
    // threshold calibrated on its own near-constant flux, used to fire the
    // snare voice anyway.
    const sudden = excess > level * 0.2
    if (live && sudden && share > 0 && flux > m + this.k * sd + 1e-6 && since > this.refractory) {
      if (excess > this.peak) this.peak = excess
      const s = Math.min(1, (excess / Math.max(1e-7, this.peak)) * 0.9 + 0.1) * share
      if (s > 0.15) {
        this.hit = true
        this.last = t
        if (s > this.env) this.env = s
      }
    } else if (live && since < 0.05 && excess > 0) {
      // A hit's energy lands over two or three analyser frames (the window
      // is 43ms, a frame 17ms), and the first one to clear the threshold is
      // rarely the biggest. Inside 50ms of a hit the envelope may keep
      // climbing with it -- the attack follows the sound instead of freezing
      // at whatever fraction of it arrived first. Not a new hit.
      if (excess > this.peak) this.peak = excess
      const s = Math.min(1, (excess / Math.max(1e-7, this.peak)) * 0.9 + 0.1) * share
      if (s > this.env) this.env = s
    }
    return this.env
  }
}

function smooth(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export class Analyser {
  readonly node: AnalyserNode
  // Explicit ArrayBuffer type args: TS 5.7 made typed arrays generic over their
  // backing buffer, and the WebAudio signatures reject the SharedArrayBuffer case.
  private freq: Uint8Array<ArrayBuffer>
  private time: Float32Array<ArrayBuffer>
  private prevMag: Float32Array
  private bandEnv: Envelope[]
  private bandEdges: number[]
  private binHz: number
  private fluxHistory = new Running(43) // ~0.7s at 60fps
  private pulseEnv = new Envelope(0.001, 0.16)
  private rmsEnv = new Envelope(0.01, 0.12)
  private centroidEnv = new Envelope(0.08, 0.25)
  private lastOnset = 0
  private t = 0
  // voices
  private floatFreq: Float32Array<ArrayBuffer>
  private prevByte: Uint8Array
  private bandFlux = new Float32Array(BANDS)
  private bandLin = new Float32Array(BANDS)
  private bandMeanDb = new Float32Array(BANDS)
  private kickV = new Voice(1.7, 0.1, 0.14)
  private snareV = new Voice(1.7, 0.1, 0.1)
  private hatV = new Voice(1.7, 0.05, 0.06)
  private sustainFloor = 0
  private sustainPeak = 0
  private pitchLog = 0

  readonly features: Features = {
    bands: new Float32Array(BANDS),
    rms: 0,
    crest: 0,
    centroid: 0,
    flux: 0,
    onset: false,
    pulse: 0,
    sinceOnset: 99,
    low: 0,
    mid: 0,
    high: 0,
    bandsRel: new Float32Array(BANDS),
    kick: 0,
    snare: 0,
    hat: 0,
    kickHit: false,
    snareHit: false,
    hatHit: false,
    sustain: 0,
    pitchHz: 0,
    pitchConf: 0,
  }

  /** Onset timestamps (audio-clock seconds), for tempo estimation. */
  readonly onsets: number[] = []

  constructor(ctx: AudioContext) {
    this.node = ctx.createAnalyser()
    this.node.fftSize = FFT_SIZE
    // We do our own smoothing via envelope followers — the built-in one just
    // adds latency and mushes transients.
    this.node.smoothingTimeConstant = 0
    this.node.minDecibels = -90
    this.node.maxDecibels = -10

    const bins = this.node.frequencyBinCount
    this.freq = new Uint8Array(bins)
    this.time = new Float32Array(this.node.fftSize)
    this.prevMag = new Float32Array(bins)
    this.floatFreq = new Float32Array(bins)
    this.prevByte = new Uint8Array(bins)
    this.binHz = ctx.sampleRate / 2 / bins

    // Log-spaced band edges, expressed in bin indices.
    const nyquist = ctx.sampleRate / 2
    this.bandEdges = []
    for (let i = 0; i <= BANDS; i++) {
      const f = F_LO * Math.pow(F_HI / F_LO, i / BANDS)
      this.bandEdges.push(Math.min(bins - 1, Math.round((f / nyquist) * bins)))
    }

    // Low bands ring longer than high bands — mirrors how we hear decay, and
    // stops hi-hats from smearing into a constant glow.
    this.bandEnv = Array.from({ length: BANDS }, (_, i) => {
      const k = i / (BANDS - 1)
      return new Envelope(0.004 + k * 0.004, 0.22 - k * 0.14)
    })
  }

  update(dt: number): Features {
    this.t += dt
    const f = this.features
    this.node.getByteFrequencyData(this.freq)
    this.node.getFloatTimeDomainData(this.time)

    // --- loudness -------------------------------------------------------
    let sum = 0
    let peak = 0
    for (let i = 0; i < this.time.length; i++) {
      const s = this.time[i]
      sum += s * s
      const a = Math.abs(s)
      if (a > peak) peak = a
    }
    const rawRms = Math.sqrt(sum / this.time.length)
    // Perceptual curve — linear amplitude reads as "nothing then everything".
    //
    // The gain is 1.9, and the number came from five tracks, not one.
    //
    // The old 3.2 put the clip point at rawRms 0.3125. Only ~5% of frames
    // reach it, but each one pins the envelope at 1.0 and its release is
    // 0.12s, so the LEVEL METER read full for 61% of samples: a 5% overload
    // became a meter that was wrong most of the time.
    //
    // The first fix here was 2.4, chosen from one track's distribution, and
    // it was not a fix -- programme loudness varies about 5x across the
    // radio (measured rawRms medians 0.053 on one track, 0.280 on a
    // brickwalled dub), so 2.4 read 0.2% clipped on the track it was tuned
    // against and 36% on the loud one. No fixed gain is right for every
    // master; the question is which one is least wrong for all of them.
    //
    // Pooled over those five: 2.4 clips 10.5% of frames, 1.9 clips 4.9%,
    // 1.6 clips 1.3%. 1.6 was tried and is too safe -- it pushes the median
    // to 0.367 and the shipped meter down to 3..5 of 12 cells, trading a
    // meter that was always full for one that never leaves the bottom
    // third. 1.9 keeps the ceiling honest (6.5% of frames at the top bar,
    // against 61% before) and the scale in use.
    //
    // A fixed gain and not auto-ranging, deliberately: a track that is
    // genuinely louder must READ louder, and a meter that renormalises per
    // track throws away the one comparison it exists to make. The remaining
    // clipping is on a brickwalled master, where the top of the scale is
    // where that master actually lives.
    //
    // Three absolute thresholds read this number and all three moved by the
    // same (1.9/3.2)^0.62 = 0.724: FLOOR_RMS and DROP_MIN_LEVEL in
    // energy.ts, and the live gate in App.
    f.rms = this.rmsEnv.push(Math.min(1, Math.pow(rawRms * 1.9, 0.62)), dt)
    f.crest = rawRms > 1e-5 ? Math.min(8, peak / rawRms) / 8 : 0

    // --- bands ----------------------------------------------------------
    let centroidNum = 0
    let centroidDen = 0
    for (let b = 0; b < BANDS; b++) {
      const s = this.bandEdges[b]
      const e = Math.max(s + 1, this.bandEdges[b + 1])
      let acc = 0
      let fl = 0
      let lin = 0
      for (let i = s; i < e; i++) {
        const q = this.freq[i]
        acc += q
        // flux in LINEAR amplitude, not in the byte (dB) domain the global
        // detector uses. In dB a region climbing from -90 to -60 on a
        // window's sidelobes scores like a real hit, so every transient lit
        // every region; linearly that splatter is a thousandth of the kick.
        const d = LIN[q] - LIN[this.prevByte[i]]
        if (d > 0) fl += d
        lin += LIN[q]
        this.prevByte[i] = q
      }
      const mag = acc / (e - s) / 255
      this.bandFlux[b] = fl / (e - s)
      this.bandLin[b] = lin / (e - s)
      f.bands[b] = this.bandEnv[b].push(mag, dt)
      centroidNum += mag * b
      centroidDen += mag
    }
    const rawCentroid = centroidDen > 1e-4 ? centroidNum / centroidDen / (BANDS - 1) : 0
    f.centroid = this.centroidEnv.push(rawCentroid, dt)

    f.low = avg(f.bands, 0, 6)
    f.mid = avg(f.bands, 6, 15)
    f.high = avg(f.bands, 15, BANDS)

    // --- spectral flux + onset -------------------------------------------
    let flux = 0
    for (let i = 0; i < this.freq.length; i++) {
      const m = this.freq[i] / 255
      const d = m - this.prevMag[i]
      if (d > 0) flux += d
      this.prevMag[i] = m
    }
    flux /= this.freq.length
    f.flux = flux

    const thresh = this.fluxHistory.mean + 1.6 * this.fluxHistory.std + 0.0015
    const gap = this.t - this.lastOnset
    // 110ms refractory: above ~545 BPM nothing musical is happening, that's noise.
    f.onset = flux > thresh && gap > 0.11 && f.rms > 0.02
    this.fluxHistory.push(flux)

    if (f.onset) {
      this.lastOnset = this.t
      this.onsets.push(this.t)
      if (this.onsets.length > 240) this.onsets.shift()
    }
    f.sinceOnset = this.t - this.lastOnset
    f.pulse = this.pulseEnv.push(f.onset ? 1 : 0, dt)

    this.voices(dt)
    this.pitch(dt)
    return f
  }

  /**
   * Relative bands, the three typed voices, and sustain.
   *
   * REGIONS, from the band edges (30Hz * 533^(i/24)):
   *   kick   bands 0-4    30-110Hz  the fundamental of a kick and nothing else
   *   body   bands 6-9   142-400Hz  a snare's shell resonance
   *   snap   bands 16-20 1.9-6.9kHz a snare's wires (and a kick's click)
   *   top    bands 21-23 6.9-16kHz  hats and rides
   * Flux is measured per region and each voice fires only in proportion to
   * its region's SHARE of the frame's new energy (below).
   */
  private voices(dt: number) {
    const f = this.features
    const bf = this.bandFlux
    // A typed hit is a real onset, CLASSIFIED -- the global detector below
    // decides that something happened (its threshold has years of tuning
    // behind it), the regions only decide what. Without this a pad's
    // detuned partials, beating at ~17Hz up in the snap region, fired the
    // snare voice every few seconds under a passage with no onsets at all.
    const live = f.rms > 0.02 && this.t - this.lastOnset < 0.05
    const kickF = (bf[0] + bf[1] + bf[2] + bf[3] + bf[4]) / 5
    const bodyF = (bf[6] + bf[7] + bf[8] + bf[9]) / 4
    const snapF = (bf[16] + bf[17] + bf[18] + bf[19] + bf[20]) / 5
    const topF = (bf[21] + bf[22] + bf[23]) / 3
    // Who owns this frame's new energy. Measured on isolated hits (linear
    // flux, kick/body/snap/top): a kick is .018/.021/.0002/.0002, a snare
    // .0048/.0098/.0024/.0010, a hat 0/0/.0001/.0011. So the kick is low
    // flux with no snap under it, the snare is the one with real snap, and
    // the hat is top with almost nothing beneath. Snap is weighted x4 in the
    // kick's test because it is two orders quieter than the low end, and a
    // snare's snap has to outweigh the top above it or a hat's sizzle (snap
    // .0001 under top .0011) reads as wires.
    const bl = this.bandLin
    const kickL = (bl[0] + bl[1] + bl[2] + bl[3] + bl[4]) / 5
    const snapL = (bl[16] + bl[17] + bl[18] + bl[19] + bl[20]) / 5
    const topL = (bl[21] + bl[22] + bl[23]) / 3
    const all = kickF + bodyF + snapF + topF + 1e-9
    const kickShare = smooth(0.5, 0.8, kickF / (kickF + 4 * snapF + 1e-9))
    const snareShare = smooth(0.03, 0.1, snapF / all) * smooth(0.4, 1, snapF / (topF + 1e-9))
    const hatShare = smooth(0.3, 0.6, topF / (topF + snapF + 0.02 * kickF + 1e-9))
    f.kick = this.kickV.update(kickF, kickL, kickShare, live, this.t, dt)
    f.snare = this.snareV.update(snapF, snapL, snareShare, live, this.t, dt)
    f.hat = this.hatV.update(topF, topL, hatShare, live, this.t, dt)
    f.kickHit = this.kickV.hit
    f.snareHit = this.snareV.hit
    f.hatHit = this.hatV.hit

    // Relative bands. The means live in dB, which is what the byte data
    // already is (-90..-10 over 0..1), so "against its own mean" is a
    // subtraction and a doubling is 6.02dB. Seeded on the first frame the
    // band carries signal and only updated while it does: power-on happens
    // in silence, and a mean seeded from silence reads every band as
    // enormous for as long as it takes to catch up -- the exact fault the
    // ring meters shipped with once (App, TIER_FLOOR).
    const k = 1 - Math.exp(-dt / 4)
    for (let b = 0; b < BANDS; b++) {
      const db = -90 + 80 * f.bands[b]
      const has = f.bands[b] > 0.14 // -79dB: under this is dither, not music
      if (has) this.bandMeanDb[b] = this.bandMeanDb[b] === 0 ? db : this.bandMeanDb[b] + (db - this.bandMeanDb[b]) * k
      const rel = 0.5 + (0.35 * (db - this.bandMeanDb[b])) / 6.02
      // faded in over the floor rather than switched, so a band arriving
      // from silence grows instead of popping
      const gate = Math.min(1, Math.max(0, (f.bands[b] - 0.14) / 0.08))
      f.bandsRel[b] = Math.max(0, Math.min(1, rel)) * gate
    }

    // Sustain: how much of the mids PERSISTS between transients. A floor
    // follower (drops fast, climbs slowly) against a peak follower (the
    // reverse), both in dB: under a pad the two sit within a dB or two, under
    // dry drums the floor falls 20dB+ between hits. Read as a gap, not as a
    // level, so a quiet pad sustains as fully as a loud one -- measured, an
    // absolute floor read 0.00 on a groove at -18dB and 0.60 on the same
    // groove limited, which was loudness wearing sustain's name.
    const midDb = -90 + 80 * f.mid
    const down = 1 - Math.exp(-dt / 0.08)
    const up = 1 - Math.exp(-dt / 0.6)
    if (this.sustainFloor === 0) this.sustainFloor = this.sustainPeak = midDb
    this.sustainFloor += (midDb - this.sustainFloor) * (midDb < this.sustainFloor ? down : up)
    this.sustainPeak += (midDb - this.sustainPeak) * (midDb > this.sustainPeak ? down : up)
    const gap = Math.max(0, this.sustainPeak - this.sustainFloor)
    const audible = smooth(0.12, 0.25, f.mid)
    f.sustain = Math.max(0, Math.min(1, 1 - gap / 14)) * audible
  }

  /**
   * The dominant frequency. Float spectrum (not the byte copy, whose 0.31dB
   * steps flatten a peak's top), strongest bin 30Hz..5kHz, then a parabola
   * through it and its neighbours in dB -- a windowed sinusoid's main lobe
   * is close to a parabola there, so this reads a pure tone to well under a
   * bin (23Hz at 48k/2048). Confidence is how far the peak stands above the
   * mean of the searched spectrum, 30dB being "unmistakable".
   *
   * Smoothed in LOG frequency, so a glide reads as a glide and an octave
   * jump is one step, not a slow sweep through every note between.
   */
  private pitch(dt: number) {
    const f = this.features
    const ff = this.floatFreq
    this.node.getFloatFrequencyData(ff)
    const lo = Math.max(2, Math.floor(30 / this.binHz))
    const hi = Math.min(ff.length - 2, Math.ceil(5000 / this.binHz))
    let best = lo
    let sum = 0
    for (let i = lo; i <= hi; i++) {
      const v = ff[i]
      sum += v > -160 ? v : -160
      if (v > ff[best]) best = i
    }
    const mean = sum / (hi - lo + 1)
    const a = ff[best - 1]
    const b = ff[best]
    const c = ff[best + 1]
    const den = a - 2 * b + c
    const delta = den < 0 ? Math.max(-0.5, Math.min(0.5, (0.5 * (a - c)) / den)) : 0
    const conf = b > -75 && Number.isFinite(b) ? Math.max(0, Math.min(1, (b - mean) / 30)) : 0
    f.pitchConf += (conf - f.pitchConf) * (1 - Math.exp(-dt / 0.1))
    if (conf > 0.35) {
      const lg = Math.log2((best + delta) * this.binHz)
      // an octave or more away is a new note: jump, do not sweep
      if (this.pitchLog === 0 || Math.abs(lg - this.pitchLog) > 0.9) this.pitchLog = lg
      else this.pitchLog += (lg - this.pitchLog) * (1 - Math.exp(-dt / 0.12))
      f.pitchHz = Math.pow(2, this.pitchLog)
    } else if (f.pitchConf < 0.15) {
      f.pitchHz = 0
      this.pitchLog = 0
    }
  }

  get now() {
    return this.t
  }
}

function avg(a: Float32Array, s: number, e: number) {
  let acc = 0
  for (let i = s; i < e; i++) acc += a[i]
  return acc / (e - s)
}

