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

export async function splitTrack(
  src: string,
  ctx: AudioContext,
  onProgress: (p: SplitProgress) => void,
): Promise<SplitResult[]> {
  onProgress({ stage: 'fetch', pct: 0 })
  const [resp, model] = await Promise.all([fetch(src), fetchModel(onProgress)])
  if (!resp.ok) throw new Error(`fetch ${resp.status}`)
  const raw = await resp.arrayBuffer()
  onProgress({ stage: 'decode', pct: 0 })
  // decode at 44100 — the model's native rate; AudioBufferSourceNode
  // resamples on playback, so the deck doesn't care
  const oac = new OfflineAudioContext(2, 2, 44100)
  const buf = await oac.decodeAudioData(raw)

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
        resolve(out)
      }
    }
    w.addEventListener('message', onMsg)
    w.addEventListener('error', (e) => reject(new Error(e.message)), { once: true })
    w.postMessage({ kind: 'split', ch0: a, ch1: b, sampleRate: 44100, model }, [a.buffer, b.buffer])
  })
}
