/**
 * The splitter — source separation off the main thread.
 *
 * The star must never drop a frame, so the whole pipeline lives here:
 *   1. STFT (radix-2 4096, hann, 75% overlap)
 *   2. harmonic/percussive separation (Fitzgerald-style, sliding-window
 *      smoothing along time vs frequency, Wiener masks) -> DRUMS
 *   3. center-channel extraction on the harmonic part, band-limited to
 *      the voice's home (180Hz-10kHz) -> VOCALS
 *   4. crossover at 160Hz on the harmonic remainder -> BASS / OTHER
 *
 * The four stems sum back to (approximately) the mix — nothing invented,
 * nothing discarded. This is classical DSP, honest and instant; the MDX
 * neural vocal model plugs into this same worker as an upgrade stage.
 */

import * as ort from 'onnxruntime-web/all'

ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.29.0/dist/'
if (!(self as unknown as { crossOriginIsolated?: boolean }).crossOriginIsolated) ort.env.wasm.numThreads = 1

const N = 4096
const HOP = 1024
const BINS = N / 2 + 1

// --- FFT: iterative radix-2, precomputed twiddles -------------------------
const COS = new Float32Array(N / 2)
const SIN = new Float32Array(N / 2)
for (let i = 0; i < N / 2; i++) {
  COS[i] = Math.cos((-2 * Math.PI * i) / N)
  SIN[i] = Math.sin((-2 * Math.PI * i) / N)
}
const REV = new Uint32Array(N)
{
  const bits = Math.log2(N)
  for (let i = 0; i < N; i++) {
    let r = 0
    for (let b = 0; b < bits; b++) r = (r << 1) | ((i >> b) & 1)
    REV[i] = r
  }
}

function fft(re: Float32Array, im: Float32Array, inv: boolean) {
  for (let i = 0; i < N; i++) {
    const j = REV[i]
    if (j > i) {
      let t = re[i]; re[i] = re[j]; re[j] = t
      t = im[i]; im[i] = im[j]; im[j] = t
    }
  }
  for (let len = 2; len <= N; len <<= 1) {
    const half = len >> 1
    const step = N / len
    for (let i = 0; i < N; i += len) {
      for (let k = 0; k < half; k++) {
        const tw = k * step
        const wr = COS[tw]
        const wi = inv ? -SIN[tw] : SIN[tw]
        const a = i + k
        const b = a + half
        const xr = re[b] * wr - im[b] * wi
        const xi = re[b] * wi + im[b] * wr
        re[b] = re[a] - xr
        im[b] = im[a] - xi
        re[a] += xr
        im[a] += xi
      }
    }
  }
  if (inv) {
    for (let i = 0; i < N; i++) {
      re[i] /= N
      im[i] /= N
    }
  }
}

const WIN = new Float32Array(N)
for (let i = 0; i < N; i++) WIN[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / N)
// hann at 75% overlap sums to a constant 1.5 — normalize on synthesis
const COLA = 1.5

interface Spec {
  re: Float32Array // frames*BINS
  im: Float32Array
  frames: number
}

function stft(x: Float32Array): Spec {
  const frames = Math.max(1, Math.floor((x.length - N) / HOP) + 1)
  const re = new Float32Array(frames * BINS)
  const im = new Float32Array(frames * BINS)
  const fr = new Float32Array(N)
  const fi = new Float32Array(N)
  for (let t = 0; t < frames; t++) {
    const off = t * HOP
    for (let i = 0; i < N; i++) {
      fr[i] = (x[off + i] ?? 0) * WIN[i]
      fi[i] = 0
    }
    fft(fr, fi, false)
    re.set(fr.subarray(0, BINS), t * BINS)
    im.set(fi.subarray(0, BINS), t * BINS)
  }
  return { re, im, frames }
}

function istft(s: Spec, outLen: number): Float32Array {
  const out = new Float32Array(outLen)
  const fr = new Float32Array(N)
  const fi = new Float32Array(N)
  for (let t = 0; t < s.frames; t++) {
    const base = t * BINS
    fr[0] = s.re[base]; fi[0] = s.im[base]
    for (let k = 1; k < BINS; k++) {
      fr[k] = s.re[base + k]
      fi[k] = s.im[base + k]
      // hermitian mirror for a real signal
      fr[N - k] = s.re[base + k]
      fi[N - k] = -s.im[base + k]
    }
    fr[N / 2] = s.re[base + N / 2]
    fi[N / 2] = 0
    fft(fr, fi, true)
    const off = t * HOP
    for (let i = 0; i < N; i++) {
      const o = off + i
      if (o < outLen) out[o] += (fr[i] * WIN[i]) / COLA
    }
  }
  return out
}

/** Sliding-window mean along TIME for each bin (harmonic emphasis). */
function smoothTime(mag: Float32Array, frames: number, k: number): Float32Array {
  const out = new Float32Array(frames * BINS)
  const half = k >> 1
  for (let f = 0; f < BINS; f++) {
    let acc = 0
    let cnt = 0
    // prime the window
    for (let t = 0; t < Math.min(half, frames); t++) { acc += mag[t * BINS + f]; cnt++ }
    for (let t = 0; t < frames; t++) {
      const add = t + half
      if (add < frames) { acc += mag[add * BINS + f]; cnt++ }
      const rem = t - half - 1
      if (rem >= 0) { acc -= mag[rem * BINS + f]; cnt-- }
      out[t * BINS + f] = acc / Math.max(1, cnt)
    }
  }
  return out
}

/** Sliding-window mean along FREQUENCY for each frame (percussive emphasis). */
function smoothFreq(mag: Float32Array, frames: number, k: number): Float32Array {
  const out = new Float32Array(frames * BINS)
  const half = k >> 1
  for (let t = 0; t < frames; t++) {
    const base = t * BINS
    let acc = 0
    let cnt = 0
    for (let f = 0; f < Math.min(half, BINS); f++) { acc += mag[base + f]; cnt++ }
    for (let f = 0; f < BINS; f++) {
      const add = f + half
      if (add < BINS) { acc += mag[base + add]; cnt++ }
      const rem = f - half - 1
      if (rem >= 0) { acc -= mag[base + rem]; cnt-- }
      out[base + f] = acc / Math.max(1, cnt)
    }
  }
  return out
}

// ═══════════════════════════════════════════════════════════════════════
// THE NEURAL STAGE — MDX-Net vocal separation (UVR-MDX-NET-Voc_FT).
// torch-compatible STFT at n_fft=7680 (not a power of two: four-step
// mixed-radix FFT, 512×15), fixed 256-frame segments through the ONNX
// model, WOLA resynthesis. Every stage is numerically gated: the FFT
// verifies against a direct DFT, the STFT against round-trip SNR, and
// the model's channel order against a silent-channel probe.
// ═══════════════════════════════════════════════════════════════════════

const MN = 7680 // model n_fft (2^9 × 15)
const MHOP = 1024
const MBINS = MN / 2 + 1 // 3841
const DIMF = 3072
const DIMT = 256
const SEG = MHOP * (DIMT - 1) // 261120 samples per model window

// --- four-step FFT for N = R×C, R = 512 (radix-2), C = 15 (direct) -------
const R4 = 512
const C4 = 15
const COS512 = new Float32Array(R4 / 2)
const SIN512 = new Float32Array(R4 / 2)
for (let i = 0; i < R4 / 2; i++) {
  COS512[i] = Math.cos((-2 * Math.PI * i) / R4)
  SIN512[i] = Math.sin((-2 * Math.PI * i) / R4)
}
const REV512 = new Uint32Array(R4)
for (let i = 0; i < R4; i++) {
  let r = 0
  for (let b = 0; b < 9; b++) r = (r << 1) | ((i >> b) & 1)
  REV512[i] = r
}

function fft512(re: Float32Array, im: Float32Array, o: number, inv: boolean) {
  for (let i = 0; i < R4; i++) {
    const j = REV512[i]
    if (j > i) {
      let t = re[o + i]; re[o + i] = re[o + j]; re[o + j] = t
      t = im[o + i]; im[o + i] = im[o + j]; im[o + j] = t
    }
  }
  for (let len = 2; len <= R4; len <<= 1) {
    const half = len >> 1
    const step = R4 / len
    for (let i = 0; i < R4; i += len) {
      for (let k = 0; k < half; k++) {
        const wr = COS512[k * step]
        const wi = inv ? -SIN512[k * step] : SIN512[k * step]
        const a = o + i + k
        const b = a + half
        const xr = re[b] * wr - im[b] * wi
        const xi = re[b] * wi + im[b] * wr
        re[b] = re[a] - xr
        im[b] = im[a] - xi
        re[a] += xr
        im[a] += xi
      }
    }
  }
}

// direct 15-point DFT tables
const C15r = new Float32Array(C4 * C4)
const C15i = new Float32Array(C4 * C4)
for (let k = 0; k < C4; k++)
  for (let n = 0; n < C4; n++) {
    C15r[k * C4 + n] = Math.cos((-2 * Math.PI * k * n) / C4)
    C15i[k * C4 + n] = Math.sin((-2 * Math.PI * k * n) / C4)
  }

// twiddles W_N^(r·c) for the four-step
const TWr = new Float32Array(R4 * C4)
const TWi = new Float32Array(R4 * C4)
for (let r = 0; r < R4; r++)
  for (let c = 0; c < C4; c++) {
    TWr[r * C4 + c] = Math.cos((-2 * Math.PI * r * c) / MN)
    TWi[r * C4 + c] = Math.sin((-2 * Math.PI * r * c) / MN)
  }

const fsAre = new Float32Array(MN)
const fsAim = new Float32Array(MN)
const fsBre = new Float32Array(MN)
const fsBim = new Float32Array(MN)

/** X[k] for k = r·C + c ... mapping fixed by the self-test below. In the
 *  four-step (decimation-in-time over columns):
 *    A[r][c] = x[c·R + r]  (stored A[r·C + c])
 *    1) length-R FFT down each column c
 *    2) A[r][c] *= W_N^(r·c)
 *    3) length-C DFT along each row r
 *    4) X[c·? ...] — verified: X[r + R·c'] where c' is the row-DFT index?
 *  The assertive answer comes from selftest7680 against a direct DFT. */
function fft7680(xre: Float32Array, xim: Float32Array, outRe: Float32Array, outIm: Float32Array, inv: boolean) {
  // step 0: reorder into columns: col c holds x[c + n·C] (decimation in time by C)
  for (let r = 0; r < R4; r++)
    for (let c = 0; c < C4; c++) {
      fsAre[c * R4 + r] = xre[r * C4 + c]
      fsAim[c * R4 + r] = xim[r * C4 + c]
    }
  // step 1: R-point FFT on each of the C columns
  for (let c = 0; c < C4; c++) fft512(fsAre, fsAim, c * R4, inv)
  // step 2: twiddle A[c][r] *= W_N^(r·c)
  for (let c = 0; c < C4; c++)
    for (let r = 0; r < R4; r++) {
      const tr = TWr[r * C4 + c]
      const ti = inv ? -TWi[r * C4 + c] : TWi[r * C4 + c]
      const i = c * R4 + r
      const ar = fsAre[i]
      const ai = fsAim[i]
      fsAre[i] = ar * tr - ai * ti
      fsAim[i] = ar * ti + ai * tr
    }
  // step 3: C-point DFT across columns for each r; output X[c2·R + r]
  for (let r = 0; r < R4; r++) {
    for (let c2 = 0; c2 < C4; c2++) {
      let sr = 0
      let si = 0
      for (let c = 0; c < C4; c++) {
        const tr = C15r[c2 * C4 + c]
        const ti = inv ? -C15i[c2 * C4 + c] : C15i[c2 * C4 + c]
        const ar = fsAre[c * R4 + r]
        const ai = fsAim[c * R4 + r]
        sr += ar * tr - ai * ti
        si += ar * ti + ai * tr
      }
      fsBre[c2 * R4 + r] = sr
      fsBim[c2 * R4 + r] = si
    }
  }
  outRe.set(fsBre)
  outIm.set(fsBim)
  if (inv) {
    for (let i = 0; i < MN; i++) {
      outRe[i] /= MN
      outIm[i] /= MN
    }
  }
}

// torch hann_window(N) is PERIODIC
const MWIN = new Float32Array(MN)
for (let i = 0; i < MN; i++) MWIN[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / MN)

/** torch.stft compat: center=true (reflect pad), periodic hann, no norm.
 *  x must be exactly SEG samples -> DIMT frames × MBINS bins. */
function stft7680(x: Float32Array, outRe: Float32Array, outIm: Float32Array) {
  const half = MN / 2
  const padded = new Float32Array(SEG + MN)
  // reflect padding
  for (let i = 0; i < half; i++) padded[i] = x[half - i]
  padded.set(x, half)
  for (let i = 0; i < half; i++) padded[half + SEG + i] = x[SEG - 2 - i]
  const fr = new Float32Array(MN)
  const fi = new Float32Array(MN)
  const Fr = new Float32Array(MN)
  const Fi = new Float32Array(MN)
  for (let t = 0; t < DIMT; t++) {
    const off = t * MHOP
    for (let i = 0; i < MN; i++) {
      fr[i] = padded[off + i] * MWIN[i]
      fi[i] = 0
    }
    fft7680(fr, fi, Fr, Fi, false)
    outRe.set(Fr.subarray(0, MBINS), t * MBINS)
    outIm.set(Fi.subarray(0, MBINS), t * MBINS)
  }
}

/** torch.istft compat: WOLA with w² normalization, center trim. */
const WSUM = (() => {
  const w = new Float32Array(SEG + MN)
  for (let t = 0; t < DIMT; t++) {
    const off = t * MHOP
    for (let i = 0; i < MN; i++) w[off + i] += MWIN[i] * MWIN[i]
  }
  return w
})()

function istft7680(sre: Float32Array, sim: Float32Array, out: Float32Array) {
  const half = MN / 2
  const acc = new Float32Array(SEG + MN)
  const fr = new Float32Array(MN)
  const fi = new Float32Array(MN)
  const Fr = new Float32Array(MN)
  const Fi = new Float32Array(MN)
  for (let t = 0; t < DIMT; t++) {
    const base = t * MBINS
    fr[0] = sre[base]; fi[0] = sim[base]
    for (let k = 1; k < MBINS; k++) {
      fr[k] = sre[base + k]
      fi[k] = sim[base + k]
      fr[MN - k] = sre[base + k]
      fi[MN - k] = -sim[base + k]
    }
    fi[MN / 2] = 0
    fft7680(fr, fi, Fr, Fi, true)
    const off = t * MHOP
    for (let i = 0; i < MN; i++) acc[off + i] += Fr[i] * MWIN[i]
  }
  for (let i = 0; i < SEG; i++) out[i] = acc[half + i] / Math.max(1e-8, WSUM[half + i])
}

interface SplitMsg {
  kind: 'split'
  ch0: Float32Array
  ch1: Float32Array
  sampleRate: number
  model?: ArrayBuffer | null
}
interface TestMsg { kind: 'selftest' }
interface Test7680Msg { kind: 'selftest7680' }
interface NeuralTestMsg { kind: 'neuraltest'; model: ArrayBuffer }

let session: ort.InferenceSession | null = null
let sessionEp = ''

async function ensureSession(model: ArrayBuffer): Promise<ort.InferenceSession> {
  if (session) return session
  const bytes = new Uint8Array(model)
  try {
    session = await ort.InferenceSession.create(bytes, { executionProviders: ['webgpu'] })
    sessionEp = 'webgpu'
  } catch {
    session = await ort.InferenceSession.create(bytes, { executionProviders: ['wasm'] })
    sessionEp = 'wasm'
  }
  return session
}

/** One model window: stereo SEG samples -> neural vocal SEG samples.
 *  Tensor layout [1, 4, DIMF, DIMT], channels [ReL, ImL, ReR, ImR]. */
async function neuralWindow(
  sess: ort.InferenceSession,
  segL: Float32Array,
  segR: Float32Array,
  bufs: {
    LRe: Float32Array; LIm: Float32Array; RRe: Float32Array; RIm: Float32Array
    input: Float32Array; vRe: Float32Array; vIm: Float32Array
    outL: Float32Array; outR: Float32Array
  },
): Promise<void> {
  stft7680(segL, bufs.LRe, bufs.LIm)
  stft7680(segR, bufs.RRe, bufs.RIm)
  const { LRe, LIm, RRe, RIm, input } = bufs
  const plane = DIMF * DIMT
  for (let f = 0; f < DIMF; f++) {
    for (let t = 0; t < DIMT; t++) {
      const src = t * MBINS + f
      const dst = f * DIMT + t
      input[dst] = LRe[src]
      input[plane + dst] = LIm[src]
      input[2 * plane + dst] = RRe[src]
      input[3 * plane + dst] = RIm[src]
    }
  }
  const feeds: Record<string, ort.Tensor> = {}
  feeds[sess.inputNames[0]] = new ort.Tensor('float32', input, [1, 4, DIMF, DIMT])
  const res = await sess.run(feeds)
  const out = res[sess.outputNames[0]].data as Float32Array
  // rebuild complex vocal spectra; bins >= DIMF stay zero
  const { vRe, vIm } = bufs
  for (let ch = 0; ch < 2; ch++) {
    vRe.fill(0)
    vIm.fill(0)
    const ro = ch * 2 * plane
    const io = ro + plane
    for (let f = 0; f < DIMF; f++) {
      for (let t = 0; t < DIMT; t++) {
        const src = f * DIMT + t
        const dst = t * MBINS + f
        vRe[dst] = out[ro + src]
        vIm[dst] = out[io + src]
      }
    }
    istft7680(vRe, vIm, ch === 0 ? bufs.outL : bufs.outR)
  }
}

async function neuralVocals(
  ch0: Float32Array,
  ch1: Float32Array,
  model: ArrayBuffer,
  post: (stage: string, pct: number) => void,
): Promise<[Float32Array, Float32Array]> {
  post('model', 0)
  const sess = await ensureSession(model)
  post(`vocals·${sessionEp}`, 0)
  const len = ch0.length
  const MARGIN = 32768
  const step = SEG - 2 * MARGIN
  const nChunks = Math.max(1, Math.ceil(len / step))
  const v0 = new Float32Array(len)
  const v1 = new Float32Array(len)
  const bufs = {
    LRe: new Float32Array(DIMT * MBINS),
    LIm: new Float32Array(DIMT * MBINS),
    RRe: new Float32Array(DIMT * MBINS),
    RIm: new Float32Array(DIMT * MBINS),
    input: new Float32Array(4 * DIMF * DIMT),
    vRe: new Float32Array(DIMT * MBINS),
    vIm: new Float32Array(DIMT * MBINS),
    outL: new Float32Array(SEG),
    outR: new Float32Array(SEG),
  }
  const segL = new Float32Array(SEG)
  const segR = new Float32Array(SEG)
  for (let i = 0; i < nChunks; i++) {
    const start = i * step - (i > 0 ? MARGIN : 0)
    segL.fill(0)
    segR.fill(0)
    for (let k = 0; k < SEG; k++) {
      const p = start + k
      if (p >= 0 && p < len) {
        segL[k] = ch0[p]
        segR[k] = ch1[p]
      }
    }
    await neuralWindow(sess, segL, segR, bufs)
    // keep the interior; edges of the window carry reflect-pad artifacts
    const keepFrom = i === 0 ? 0 : MARGIN
    const keepTo = i === nChunks - 1 ? SEG : SEG - MARGIN
    for (let k = keepFrom; k < keepTo; k++) {
      const p = start + k
      if (p >= 0 && p < len) {
        v0[p] = bufs.outL[k]
        v1[p] = bufs.outR[k]
      }
    }
    post(`vocals·${sessionEp}`, ((i + 1) / nChunks) * 100)
  }
  return [v0, v1]
}

/** The classical pipeline (drums/bass/other + optional center-vocals). */
function dspSplit(
  ch0: Float32Array,
  ch1: Float32Array,
  sampleRate: number,
  extractVocals: boolean,
  post: (stage: string, pct: number) => void,
): { order: readonly string[]; channels: Float32Array[] } {
  const len = ch0.length
  post('analyze', 0)
  const SL = stft(ch0)
  const SR = stft(ch1)
  const frames = SL.frames
  post('analyze', 25)

  const mag = new Float32Array(frames * BINS)
  for (let i = 0; i < frames * BINS; i++) {
    const mr = (SL.re[i] + SR.re[i]) * 0.5
    const mi = (SL.im[i] + SR.im[i]) * 0.5
    mag[i] = Math.hypot(mr, mi)
  }
  const H = smoothTime(mag, frames, 31)
  const P = smoothFreq(mag, frames, 31)
  post('analyze', 55)

  const binHz = sampleRate / N
  const bassTop = Math.round(160 / binHz)
  const voLo = Math.round(180 / binHz)
  const voHi = Math.round(10000 / binHz)

  const mk = (): Spec => ({ re: new Float32Array(frames * BINS), im: new Float32Array(frames * BINS), frames })
  const stems = { drums: [mk(), mk()], bass: [mk(), mk()], vocals: [mk(), mk()], other: [mk(), mk()] }

  for (let t = 0; t < frames; t++) {
    const base = t * BINS
    for (let f = 0; f < BINS; f++) {
      const i = base + f
      const h = H[i]
      const p = P[i]
      const d = h * h + p * p + 1e-12
      const mP = (p * p) / d
      const mH = 1 - mP
      const lr = SL.re[i]; const li = SL.im[i]
      const rr = SR.re[i]; const ri = SR.im[i]
      stems.drums[0].re[i] = lr * mP; stems.drums[0].im[i] = li * mP
      stems.drums[1].re[i] = rr * mP; stems.drums[1].im[i] = ri * mP
      const hlr = lr * mH; const hli = li * mH
      const hrr = rr * mH; const hri = ri * mH
      if (f <= bassTop) {
        stems.bass[0].re[i] = hlr; stems.bass[0].im[i] = hli
        stems.bass[1].re[i] = hrr; stems.bass[1].im[i] = hri
        continue
      }
      let mV = 0
      if (extractVocals && f >= voLo && f <= voHi) {
        const mr = (hlr + hrr) * 0.5
        const mi = (hli + hri) * 0.5
        const sr2 = (hlr - hrr) * 0.5
        const si2 = (hli - hri) * 0.5
        const mm = Math.hypot(mr, mi)
        const ss = Math.hypot(sr2, si2)
        mV = Math.max(0, Math.min(1, (mm - ss * 1.2) / (mm + 1e-9)))
        mV *= mV
      }
      stems.vocals[0].re[i] = hlr * mV; stems.vocals[0].im[i] = hli * mV
      stems.vocals[1].re[i] = hrr * mV; stems.vocals[1].im[i] = hri * mV
      const mO = 1 - mV
      stems.other[0].re[i] = hlr * mO; stems.other[0].im[i] = hli * mO
      stems.other[1].re[i] = hrr * mO; stems.other[1].im[i] = hri * mO
    }
    if (t % 400 === 0) post('separate', 55 + (t / frames) * 25)
  }
  post('render', 80)

  const order = ['vocals', 'drums', 'bass', 'other'] as const
  const channels: Float32Array[] = []
  for (let s2 = 0; s2 < order.length; s2++) {
    const key = order[s2] as keyof typeof stems
    channels.push(istft(stems[key][0], len), istft(stems[key][1], len))
    post('render', 80 + ((s2 + 1) / 4) * 20)
  }
  return { order, channels }
}

self.onmessage = async (ev: MessageEvent<SplitMsg | TestMsg | Test7680Msg | NeuralTestMsg>) => {
  const msg = ev.data
  const post = (stage: string, pct: number) =>
    (self as unknown as Worker).postMessage({ kind: 'progress', stage, pct })

  if (msg.kind === 'selftest') {
    const len = 44100
    const x = new Float32Array(len)
    for (let i = 0; i < len; i++) x[i] = Math.sin((2 * Math.PI * (220 + i * 0.02) * i) / 44100) * 0.7
    const y = istft(stft(x), len)
    let se = 0
    let sx = 0
    for (let i = N; i < len - N; i++) {
      const e = x[i] - y[i]
      se += e * e
      sx += x[i] * x[i]
    }
    ;(self as unknown as Worker).postMessage({ kind: 'selftest', snr: 10 * Math.log10(sx / Math.max(1e-12, se)) })
    return
  }

  if (msg.kind === 'selftest7680') {
    // 1. forward FFT vs direct DFT at 48 random bins
    const xr = new Float32Array(MN)
    const xi = new Float32Array(MN)
    let seed = 1234567
    const rand = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1
    for (let i = 0; i < MN; i++) xr[i] = rand()
    const Fr = new Float32Array(MN)
    const Fi = new Float32Array(MN)
    fft7680(xr, xi, Fr, Fi, false)
    let errN = 0
    let refN = 0
    for (let s2 = 0; s2 < 48; s2++) {
      const k = Math.floor(((s2 + 0.5) / 48) * MN)
      let dr = 0
      let di = 0
      for (let n2 = 0; n2 < MN; n2++) {
        const ph = (-2 * Math.PI * k * n2) / MN
        dr += xr[n2] * Math.cos(ph)
        di += xr[n2] * Math.sin(ph)
      }
      errN += (Fr[k] - dr) ** 2 + (Fi[k] - di) ** 2
      refN += dr * dr + di * di
    }
    const fftErrDb = 10 * Math.log10(errN / Math.max(1e-20, refN))
    // 2. inverse round trip
    const br = new Float32Array(MN)
    const bi = new Float32Array(MN)
    fft7680(Fr, Fi, br, bi, true)
    let e2 = 0
    let r2 = 0
    for (let i = 0; i < MN; i++) {
      e2 += (br[i] - xr[i]) ** 2
      r2 += xr[i] * xr[i]
    }
    const invErrDb = 10 * Math.log10(e2 / Math.max(1e-20, r2))
    // 3. STFT7680 WOLA round trip on a chirp
    const x2 = new Float32Array(SEG)
    for (let i = 0; i < SEG; i++) x2[i] = Math.sin((2 * Math.PI * (180 + i * 0.01) * i) / 44100) * 0.6
    const sre = new Float32Array(DIMT * MBINS)
    const sim = new Float32Array(DIMT * MBINS)
    stft7680(x2, sre, sim)
    const y2 = new Float32Array(SEG)
    istft7680(sre, sim, y2)
    let se3 = 0
    let sx3 = 0
    for (let i = MN; i < SEG - MN; i++) {
      const e = x2[i] - y2[i]
      se3 += e * e
      sx3 += x2[i] * x2[i]
    }
    const stftSnrDb = 10 * Math.log10(sx3 / Math.max(1e-20, se3))
    ;(self as unknown as Worker).postMessage({ kind: 'selftest7680', fftErrDb, invErrDb, stftSnrDb })
    return
  }

  if (msg.kind === 'neuraltest') {
    // channel-order probe: L carries voice-band content, R is silent.
    // With layout [ReL, ImL, ReR, ImR] correct, vocal_R stays ~silent.
    try {
      const sess = await ensureSession(msg.model)
      const segL = new Float32Array(SEG)
      const segR = new Float32Array(SEG)
      for (let i = 0; i < SEG; i++) {
        const t = i / 44100
        const vib = Math.sin(2 * Math.PI * 5.5 * t) * 12
        segL[i] =
          0.5 * Math.sin(2 * Math.PI * (320 + vib) * t) +
          0.25 * Math.sin(2 * Math.PI * (640 + 2 * vib) * t) +
          0.15 * Math.sin(2 * Math.PI * (960 + 3 * vib) * t)
      }
      const bufs = {
        LRe: new Float32Array(DIMT * MBINS), LIm: new Float32Array(DIMT * MBINS),
        RRe: new Float32Array(DIMT * MBINS), RIm: new Float32Array(DIMT * MBINS),
        input: new Float32Array(4 * DIMF * DIMT),
        vRe: new Float32Array(DIMT * MBINS), vIm: new Float32Array(DIMT * MBINS),
        outL: new Float32Array(SEG), outR: new Float32Array(SEG),
      }
      await neuralWindow(sess, segL, segR, bufs)
      const rms = (a: Float32Array) => {
        let e = 0
        for (let i = MN; i < SEG - MN; i += 8) e += a[i] * a[i]
        return Math.sqrt(e / ((SEG - 2 * MN) / 8))
      }
      ;(self as unknown as Worker).postMessage({
        kind: 'neuraltest',
        ep: sessionEp,
        vL: rms(bufs.outL),
        vR: rms(bufs.outR),
        inL: rms(segL),
      })
    } catch (e) {
      ;(self as unknown as Worker).postMessage({ kind: 'neuraltest', error: String(e) })
    }
    return
  }

  // ---- the split ----------------------------------------------------------
  const { ch0, ch1, sampleRate, model } = msg
  const len = ch0.length
  let vocals: [Float32Array, Float32Array] | null = null
  if (model) {
    try {
      vocals = await neuralVocals(ch0, ch1, model, post)
    } catch {
      vocals = null // fall back to the classical path whole
    }
  }
  let result: { order: readonly string[]; channels: Float32Array[] }
  if (vocals) {
    // instrumental = mix - neural vocals; classical split carves the rest
    const i0 = new Float32Array(len)
    const i1 = new Float32Array(len)
    for (let i = 0; i < len; i++) {
      i0[i] = ch0[i] - vocals[0][i]
      i1[i] = ch1[i] - vocals[1][i]
    }
    result = dspSplit(i0, i1, sampleRate, false, post)
    result.channels[0] = vocals[0]
    result.channels[1] = vocals[1]
  } else {
    result = dspSplit(ch0, ch1, sampleRate, true, post)
  }
  ;(self as unknown as Worker).postMessage(
    { kind: 'done', order: result.order, channels: result.channels },
    { transfer: result.channels.map((a) => a.buffer) },
  )
}
