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

export class Analyser {
  readonly node: AnalyserNode
  // Explicit ArrayBuffer type args: TS 5.7 made typed arrays generic over their
  // backing buffer, and the WebAudio signatures reject the SharedArrayBuffer case.
  private freq: Uint8Array<ArrayBuffer>
  private time: Float32Array<ArrayBuffer>
  private prevMag: Float32Array
  private bandEnv: Envelope[]
  private bandEdges: number[]
  private fluxHistory = new Running(43) // ~0.7s at 60fps
  private pulseEnv = new Envelope(0.001, 0.16)
  private rmsEnv = new Envelope(0.01, 0.12)
  private centroidEnv = new Envelope(0.08, 0.25)
  private lastOnset = 0
  private t = 0

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
      for (let i = s; i < e; i++) acc += this.freq[i]
      const mag = acc / (e - s) / 255
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

    return f
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

