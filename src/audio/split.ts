/**
 * SPLIT — turn the playing track into stems, in the browser.
 *
 * Fetches whatever the deck is playing (Audius streams are CORS-open;
 * file drops are object URLs — both fetch fine), decodes it, hands the
 * samples to the separation worker, and returns four AudioBuffers ready
 * for the StemDeck. Nothing leaves the machine.
 */

import type { StemRole } from './stems'

export interface SplitResult {
  role: StemRole
  buffer: AudioBuffer
}

export type SplitProgress = { stage: string; pct: number }

/** What the person is told: three plain stages and ONE percent for the whole
 *  split, 0 to 100, that never goes backwards. */
export type SplitStage = 'reading' | 'vocals' | 'parts'
export type SplitReading = { stage: SplitStage; pct: number }

const MODEL_URL =
  'https://huggingface.co/Politrees/UVR_resources/resolve/main/models/MDXNet/UVR-MDX-NET-Voc_FT.onnx'

let modelBuf: ArrayBuffer | null = null

/** The MDX vocal model: fetched once with progress, cached forever in the
 *  Cache API. Any failure returns null and the split runs classical-only. */
async function fetchModel(onProgress: (p: SplitProgress) => void): Promise<ArrayBuffer | null> {
  if (modelBuf) return modelBuf
  try {
    const cache = await caches.open('scope-ml-v1')
    const hit = await cache.match(MODEL_URL)
    if (hit) return (modelBuf = await hit.arrayBuffer())
    const resp = await fetch(MODEL_URL)
    if (!resp.ok || !resp.body) return null
    const total = Number(resp.headers.get('content-length')) || 66762490
    const reader = resp.body.getReader()
    const parts: Uint8Array[] = []
    let got = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      parts.push(value)
      got += value.length
      onProgress({ stage: 'model', pct: (got / total) * 100 })
    }
    const all = new Uint8Array(got)
    let o = 0
    for (const p of parts) {
      all.set(p, o)
      o += p.length
    }
    await cache.put(MODEL_URL, new Response(all.slice().buffer, { headers: { 'content-type': 'application/octet-stream' } })).catch(() => {})
    return (modelBuf = all.buffer)
  } catch {
    return null
  }
}

let worker: Worker | null = null

function getWorker(): Worker {
  return (worker ??= new Worker(new URL('./split.worker.ts', import.meta.url), { type: 'module' }))
}

/** The worker's STFT round-trip, in dB SNR — a self-test hook for DEV. */
export function splitSelfTest(): Promise<number> {
  return new Promise((resolve) => {
    const w = getWorker()
    const onMsg = (ev: MessageEvent) => {
      if (ev.data?.kind === 'selftest') {
        w.removeEventListener('message', onMsg)
        resolve(ev.data.snr as number)
      }
    }
    w.addEventListener('message', onMsg)
    w.postMessage({ kind: 'selftest' })
  })
}

/** DEV: the 7680 FFT/STFT gates. */
export function split7680Test(): Promise<{ fftErrDb: number; invErrDb: number; stftSnrDb: number }> {
  return new Promise((resolve) => {
    const w = getWorker()
    const onMsg = (ev: MessageEvent) => {
      if (ev.data?.kind === 'selftest7680') {
        w.removeEventListener('message', onMsg)
        resolve(ev.data)
      }
    }
    w.addEventListener('message', onMsg)
    w.postMessage({ kind: 'selftest7680' })
  })
}

/** DEV: model channel-order probe (silent right channel must stay silent). */
export async function splitNeuralTest(onProgress: (p: SplitProgress) => void): Promise<unknown> {
  const model = await fetchModel(onProgress)
  if (!model) return { error: 'model unavailable' }
  return new Promise((resolve) => {
    const w = getWorker()
    const onMsg = (ev: MessageEvent) => {
      if (ev.data?.kind === 'neuraltest') {
        w.removeEventListener('message', onMsg)
        resolve(ev.data)
      }
    }
    w.addEventListener('message', onMsg)
    w.postMessage({ kind: 'neuraltest', model })
  })
}

/**
 * Fold the pipeline's own stages into one reading.
 *
 * The worker reports five stages, each restarting at 0% (model, fetch,
 * decode, vocals·<backend>, analyze, render), and the button printed them
 * raw: the number climbed to 100, fell to 0, climbed again, and ended in an
 * execution-provider suffix nobody asked about. A progress readout that
 * goes backwards is not reading progress. The weights below are where each
 * stage sits in one 0-100 span; the vocal model's pass is the long one, and
 * without it (the classical fallback) the parts stage owns the whole
 * remainder. `max` holds both the stage and the percent monotonic.
 */
function progressFolder(neural: () => boolean, out: (p: SplitReading) => void) {
  const order: SplitStage[] = ['reading', 'vocals', 'parts']
  let pct = 0
  let at = 0
  return (p: SplitProgress) => {
    const f = Math.max(0, Math.min(100, p.pct)) / 100
    let stage: SplitStage
    let v: number
    if (p.stage === 'model') [stage, v] = ['reading', f * 18]
    else if (p.stage === 'fetch') [stage, v] = ['reading', 0]
    else if (p.stage === 'decode') [stage, v] = ['reading', 19]
    else if (p.stage.startsWith('vocals')) [stage, v] = ['vocals', 20 + f * 45]
    else {
      // analyze 0..55 then render 55..100 is the worker's own split of this
      // stage, so its pct already runs once through 0..100 across both
      const lo = neural() ? 65 : 20
      ;[stage, v] = ['parts', lo + f * (99 - lo)]
    }
    at = Math.max(at, order.indexOf(stage))
    pct = Math.max(pct, v)
    out({ stage: order[at], pct: Math.floor(pct) })
  }
}

export async function splitTrack(
  src: string,
  ctx: AudioContext,
  report: (p: SplitReading) => void,
): Promise<SplitResult[]> {
  let neural = false
  const onProgress = progressFolder(() => neural, report)
  onProgress({ stage: 'fetch', pct: 0 })
  const [resp, model] = await Promise.all([fetch(src), fetchModel(onProgress)])
  if (!resp.ok) throw new Error(`fetch ${resp.status}`)
  const raw = await resp.arrayBuffer()
  onProgress({ stage: 'decode', pct: 0 })
  // decode at 44100 — the model's native rate; AudioBufferSourceNode
  // resamples on playback, so the deck doesn't care
  const oac = new OfflineAudioContext(2, 2, 44100)
  const buf = await oac.decodeAudioData(raw)
  onProgress({ stage: 'decode', pct: 100 })
  neural = !!model

  const ch0 = buf.getChannelData(0)
  const ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : buf.getChannelData(0)
  // copies: the worker takes ownership via transfer
  const a = new Float32Array(ch0)
  const b = new Float32Array(ch1)

  return new Promise((resolve, reject) => {
    const w = getWorker()
    const onMsg = (ev: MessageEvent) => {
      const m = ev.data
      if (m?.kind === 'progress') onProgress({ stage: m.stage as string, pct: m.pct as number })
      else if (m?.kind === 'done') {
        w.removeEventListener('message', onMsg)
        const order = m.order as StemRole[]
        const channels = m.channels as Float32Array[]
        const out: SplitResult[] = order.map((role, i) => {
          const sb = ctx.createBuffer(2, buf.length, 44100)
          sb.copyToChannel(channels[i * 2] as Float32Array<ArrayBuffer>, 0)
          sb.copyToChannel(channels[i * 2 + 1] as Float32Array<ArrayBuffer>, 1)
          return { role, buffer: sb }
        })
        report({ stage: 'parts', pct: 100 })
        resolve(out)
      }
    }
    w.addEventListener('message', onMsg)
    w.addEventListener('error', (e) => reject(new Error(e.message)), { once: true })
    w.postMessage({ kind: 'split', ch0: a, ch1: b, sampleRate: 44100, model }, [a.buffer, b.buffer])
  })
}
