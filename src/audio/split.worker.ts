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

interface SplitMsg {
  kind: 'split'
  ch0: Float32Array
  ch1: Float32Array
  sampleRate: number
}
interface TestMsg { kind: 'selftest' }

self.onmessage = (ev: MessageEvent<SplitMsg | TestMsg>) => {
  const msg = ev.data
  if (msg.kind === 'selftest') {
    // iSTFT(STFT(x)) must reconstruct: report SNR in dB on a chirp
    const len = 44100
    const x = new Float32Array(len)
    for (let i = 0; i < len; i++) x[i] = Math.sin((2 * Math.PI * (220 + i * 0.02) * i) / 44100) * 0.7
    const y = istft(stft(x), len)
    let se = 0
    let sx = 0
    // ignore the un-overlapped edges
    for (let i = N; i < len - N; i++) {
      const e = x[i] - y[i]
      se += e * e
      sx += x[i] * x[i]
    }
    const snr = 10 * Math.log10(sx / Math.max(1e-12, se))
    ;(self as unknown as Worker).postMessage({ kind: 'selftest', snr })
    return
  }

  const { ch0, ch1, sampleRate } = msg
  const len = ch0.length
  const post = (stage: string, pct: number) =>
    (self as unknown as Worker).postMessage({ kind: 'progress', stage, pct })

  post('analyze', 0)
  const SL = stft(ch0)
  const SR = stft(ch1)
  const frames = SL.frames
  post('analyze', 25)

  // mono mid magnitude drives the masks; masks then apply to both channels
  const mag = new Float32Array(frames * BINS)
  for (let i = 0; i < frames * BINS; i++) {
    const mr = (SL.re[i] + SR.re[i]) * 0.5
    const mi = (SL.im[i] + SR.im[i]) * 0.5
    mag[i] = Math.hypot(mr, mi)
  }
  const H = smoothTime(mag, frames, 31) // steady over time = harmonic
  const P = smoothFreq(mag, frames, 31) // broad over frequency = percussive
  post('analyze', 55)

  const binHz = sampleRate / N
  const bassTop = Math.round(160 / binHz)
  const voLo = Math.round(180 / binHz)
  const voHi = Math.round(10000 / binHz)

  const mk = (): Spec => ({ re: new Float32Array(frames * BINS), im: new Float32Array(frames * BINS), frames })
  const stems = {
    drums: [mk(), mk()],
    bass: [mk(), mk()],
    vocals: [mk(), mk()],
    other: [mk(), mk()],
  }

  for (let t = 0; t < frames; t++) {
    const base = t * BINS
    for (let f = 0; f < BINS; f++) {
      const i = base + f
      const h = H[i]
      const p = P[i]
      const d = h * h + p * p + 1e-12
      const mP = (p * p) / d // percussive Wiener mask
      const mH = 1 - mP
      // channel spectra
      const lr = SL.re[i]; const li = SL.im[i]
      const rr = SR.re[i]; const ri = SR.im[i]
      // drums: percussive share of both channels
      stems.drums[0].re[i] = lr * mP; stems.drums[0].im[i] = li * mP
      stems.drums[1].re[i] = rr * mP; stems.drums[1].im[i] = ri * mP
      // harmonic remainder
      const hlr = lr * mH; const hli = li * mH
      const hrr = rr * mH; const hri = ri * mH
      if (f <= bassTop) {
        // the low harmonic register belongs to the bass
        stems.bass[0].re[i] = hlr; stems.bass[0].im[i] = hli
        stems.bass[1].re[i] = hrr; stems.bass[1].im[i] = hri
        continue
      }
      // center dominance = voice-likelihood inside the vocal band
      let mV = 0
      if (f >= voLo && f <= voHi) {
        const mr = (hlr + hrr) * 0.5
        const mi = (hli + hri) * 0.5
        const sr2 = (hlr - hrr) * 0.5
        const si2 = (hli - hri) * 0.5
        const mm = Math.hypot(mr, mi)
        const ss = Math.hypot(sr2, si2)
        mV = Math.max(0, Math.min(1, (mm - ss * 1.2) / (mm + 1e-9)))
        mV *= mV // soften: only confidently-centered energy is voice
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
  const out: Float32Array[] = []
  for (let s = 0; s < order.length; s++) {
    out.push(istft(stems[order[s]][0], len), istft(stems[order[s]][1], len))
    post('render', 80 + ((s + 1) / 4) * 20)
  }
  ;(self as unknown as Worker).postMessage(
    { kind: 'done', order, channels: out },
    { transfer: out.map((a) => a.buffer) },
  )
}
