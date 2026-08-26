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

export async function splitTrack(
  src: string,
  ctx: AudioContext,
  onProgress: (p: SplitProgress) => void,
): Promise<SplitResult[]> {
  onProgress({ stage: 'fetch', pct: 0 })
  const resp = await fetch(src)
  if (!resp.ok) throw new Error(`fetch ${resp.status}`)
  const raw = await resp.arrayBuffer()
  onProgress({ stage: 'decode', pct: 0 })
  const buf = await ctx.decodeAudioData(raw)

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
          const sb = ctx.createBuffer(2, buf.length, buf.sampleRate)
          sb.copyToChannel(channels[i * 2] as Float32Array<ArrayBuffer>, 0)
          sb.copyToChannel(channels[i * 2 + 1] as Float32Array<ArrayBuffer>, 1)
          return { role, buffer: sb }
        })
        resolve(out)
      }
    }
    w.addEventListener('message', onMsg)
    w.addEventListener('error', (e) => reject(new Error(e.message)), { once: true })
    w.postMessage({ kind: 'split', ch0: a, ch1: b, sampleRate: buf.sampleRate }, [a.buffer, b.buffer])
  })
}
