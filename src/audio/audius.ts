/**
 * The Audius radio — real released music, streamed legally.
 *
 * Audius is a streaming platform whose public API exists exactly for
 * third-party players: non-DRM streams with CORS open (verified:
 * access-control-allow-origin * on the stream redirect), so the analyser
 * can hear what plays. We pull trending tracks across club genres, rank by
 * real play counts, and hand the engine a playlist. No files hosted, no
 * redistribution — every play streams from their nodes with attribution.
 */

import type { TrackInfo } from './graph'

const APP = 'scope'
const GENRES = ['House', 'Deep House', 'Tech House', 'Electronic', 'Dubstep', 'Drum & Bass']

interface AudiusTrack {
  id: string
  title: string
  duration: number
  play_count: number
  is_streamable?: boolean
  user: { name: string }
}

export async function fetchAudiusRadio(limit = 40): Promise<TrackInfo[]> {
  try {
    // Resolve a healthy discovery host, fall back to the canonical one.
    let host = 'https://discoveryprovider.audius.co'
    try {
      const hosts = (await (await fetch('https://api.audius.co', { signal: AbortSignal.timeout(4000) })).json()) as { data?: string[] }
      if (hosts.data?.length) host = hosts.data[0]
    } catch { /* canonical fallback stands */ }

    const seen = new Map<string, AudiusTrack>()
    await Promise.allSettled(
      GENRES.map(async (g) => {
        const r = await fetch(
          `${host}/v1/tracks/trending?genre=${encodeURIComponent(g)}&app_name=${APP}&limit=24`,
          { signal: AbortSignal.timeout(6000) },
        )
        if (!r.ok) return
        const d = (await r.json()) as { data?: AudiusTrack[] }
        for (const t of d.data ?? []) {
          // Club-length singles, not hour-long radio shows.
          if (t.duration < 110 || t.duration > 540) continue
          if (t.is_streamable === false) continue
          seen.set(t.id, t)
        }
      }),
    )

    const ranked = [...seen.values()].sort((a, b) => (b.play_count ?? 0) - (a.play_count ?? 0)).slice(0, limit)
    // Shuffle within the top tier so the radio doesn't open identically.
    for (let i = ranked.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ranked[i], ranked[j]] = [ranked[j], ranked[i]]
    }
    return ranked.map((t) => ({
      title: t.title.slice(0, 42),
      artist: `${t.user.name.slice(0, 24)} · audius`,
      src: `${host}/v1/tracks/${t.id}/stream?app_name=${APP}`,
    }))
  } catch {
    return []
  }
}
