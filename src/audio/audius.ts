/**
 * The Audius tuner — real released music, streamed legally, and tunable.
 *
 * Audius is an artist-owned streaming platform whose public API exists
 * exactly for third-party players: non-DRM streams with CORS open (verified:
 * access-control-allow-origin * on the stream redirect), so the analyser can
 * hear what plays. No files hosted, no redistribution — every play streams
 * from their nodes, and every track carries a link back to the artist.
 *
 * Tracks arrive with the artist's OWN declared bpm and musical key. scope
 * shows those next to its measured values: source of truth beside the
 * instrument's reading, the way a survey drawing cites its datum.
 */

import type { TrackInfo } from './graph'

const APP = 'scope'

/** The dial: what the radio can be tuned to. `null` genre = across the board. */
export const AUDIUS_GENRES: { label: string; genre: string | null }[] = [
  { label: 'club', genre: null }, // the curated cross-genre default
  { label: 'house', genre: 'House' },
  { label: 'tech house', genre: 'Tech House' },
  { label: 'techno', genre: 'Techno' },
  { label: 'dnb', genre: 'Drum & Bass' },
  { label: 'dubstep', genre: 'Dubstep' },
  { label: 'trap', genre: 'Trap' },
  { label: 'hip-hop', genre: 'Hip-Hop/Rap' },
  { label: 'lo-fi', genre: 'Lo-Fi' },
  { label: 'electronic', genre: 'Electronic' },
]

/** Genres the 'club' preset sweeps. */
const CLUB = ['House', 'Deep House', 'Tech House', 'Techno', 'Electronic', 'Dubstep', 'Drum & Bass']

interface AudiusTrack {
  id: string
  title: string
  duration: number
  play_count?: number
  favorite_count?: number
  genre?: string
  mood?: string
  bpm?: number
  musical_key?: string
  permalink?: string
  release_date?: string
  is_streamable?: boolean
  is_stream_gated?: boolean
  is_delete?: boolean
  is_available?: boolean
  user: { name: string; handle?: string }
}

let hostCache: string | null = null

/** Resolve a healthy discovery host once per session. */
async function resolveHost(): Promise<string> {
  if (hostCache) return hostCache
  try {
    const r = await fetch('https://api.audius.co', { signal: AbortSignal.timeout(4000) })
    const hosts = (await r.json()) as { data?: string[] }
    if (hosts.data?.length) hostCache = hosts.data[Math.floor(Math.random() * Math.min(3, hosts.data.length))]
  } catch {
    /* canonical fallback below */
  }
  return (hostCache ??= 'https://discoveryprovider.audius.co')
}

/** A track is playable only if it is streamable, ungated and alive. Gated
 *  tracks return 402 to an unauthenticated player — silence with no error. */
function playable(t: AudiusTrack): boolean {
  if (t.is_streamable === false || t.is_stream_gated || t.is_delete) return false
  if (t.is_available === false) return false
  return t.duration >= 90 && t.duration <= 600
}

function toTrack(t: AudiusTrack, host: string): TrackInfo {
  return {
    title: t.title.slice(0, 42),
    artist: `${t.user.name.slice(0, 24)} · audius`,
    src: `${host}/v1/tracks/${t.id}/stream?app_name=${APP}`,
    // The artist's own declared values — scope prints them beside its own.
    bpm: t.bpm && t.bpm > 40 && t.bpm < 220 ? Math.round(t.bpm) : undefined,
    musicalKey: t.musical_key || undefined,
    genre: t.genre || undefined,
    plays: t.play_count,
    // Attribution: every track links back to its page on Audius.
    link: t.permalink ? `https://audius.co${t.permalink}` : undefined,
  }
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Trending for one genre, or the curated club sweep when genre is null. */
export async function fetchAudiusRadio(genre: string | null = null, limit = 40): Promise<TrackInfo[]> {
  try {
    const host = await resolveHost()
    const list = genre ? [genre] : CLUB
    const seen = new Map<string, AudiusTrack>()
    await Promise.allSettled(
      list.map(async (g) => {
        const r = await fetch(
          `${host}/v1/tracks/trending?genre=${encodeURIComponent(g)}&app_name=${APP}&limit=${genre ? 40 : 24}`,
          { signal: AbortSignal.timeout(6000) },
        )
        if (!r.ok) return
        const d = (await r.json()) as { data?: AudiusTrack[] }
        for (const t of d.data ?? []) if (playable(t)) seen.set(t.id, t)
      }),
    )
    const ranked = [...seen.values()].sort((a, b) => (b.play_count ?? 0) - (a.play_count ?? 0)).slice(0, limit)
    return shuffle(ranked).map((t) => toTrack(t, host))
  } catch {
    return []
  }
}

/** Search the whole platform. Ranked by plays so the top result is the one
 *  people actually listen to, not the first fuzzy match. */
export async function searchAudius(query: string, limit = 30): Promise<TrackInfo[]> {
  const q = query.trim()
  if (!q) return []
  try {
    const host = await resolveHost()
    const r = await fetch(
      `${host}/v1/tracks/search?query=${encodeURIComponent(q)}&app_name=${APP}&limit=50`,
      { signal: AbortSignal.timeout(7000) },
    )
    if (!r.ok) return []
    const d = (await r.json()) as { data?: AudiusTrack[] }
    const hits = (d.data ?? []).filter(playable)
    hits.sort((a, b) => (b.play_count ?? 0) - (a.play_count ?? 0))
    return hits.slice(0, limit).map((t) => toTrack(t, host))
  } catch {
    return []
  }
}
