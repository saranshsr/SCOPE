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

/** THE VIBE LEXICON — how a prompt becomes a musical read. Each entry
 *  maps feel-words to Audius's own metadata: moods (their taxonomy),
 *  genres (their names), and a bpm range. Multiple hits blend. */
interface VibeSense {
  moods?: string[]
  genres?: string[]
  bpm?: [number, number]
}

const LEXICON: [RegExp, VibeSense][] = [
  // -- energy / activity
  [/gym|workout|lift|rage|hype|beast|pump/i, { moods: ['Aggressive', 'Energizing', 'Fiery', 'Rowdy'], genres: ['Trap', 'Dubstep', 'Drum & Bass', 'Hip-Hop/Rap'], bpm: [130, 180] }],
  [/run|running|cardio|sprint/i, { moods: ['Energizing', 'Upbeat'], genres: ['Drum & Bass', 'House', 'Electronic'], bpm: [150, 180] }],
  [/party|club|dance|banger|festival/i, { moods: ['Excited', 'Rowdy', 'Upbeat'], genres: ['House', 'Tech House', 'Electronic', 'Dancehall'], bpm: [120, 132] }],
  [/rave|warehouse|underground/i, { moods: ['Gritty', 'Fiery'], genres: ['Techno', 'Tech House', 'Jungle'], bpm: [128, 145] }],
  // -- time / place
  [/late night|night drive|midnight|3am|after ?hours/i, { moods: ['Brooding', 'Cool', 'Sophisticated'], genres: ['Electronic', 'Deep House', 'Downtempo', 'R&B/Soul'], bpm: [95, 122] }],
  [/drive|driving|highway|cruis/i, { moods: ['Cool', 'Defiant'], genres: ['Hip-Hop/Rap', 'Electronic', 'House'], bpm: [90, 125] }],
  [/sunset|rooftop|golden hour|beach|pool/i, { moods: ['Easygoing', 'Romantic', 'Upbeat'], genres: ['Deep House', 'Disco', 'House'], bpm: [110, 124] }],
  [/morning|sunrise|coffee/i, { moods: ['Peaceful', 'Easygoing', 'Tender'], genres: ['Lo-Fi', 'Downtempo', 'Jazz'], bpm: [70, 105] }],
  [/rain|rainy|grey|gray|winter|cozy/i, { moods: ['Melancholy', 'Sentimental', 'Peaceful'], genres: ['Lo-Fi', 'Downtempo', 'Ambient', 'R&B/Soul'], bpm: [60, 100] }],
  // -- state of mind
  [/study|focus|deep work|coding|concentrat/i, { moods: ['Peaceful', 'Easygoing'], genres: ['Lo-Fi', 'Ambient', 'Downtempo', 'Electronic'], bpm: [60, 110] }],
  [/chill|relax|calm|unwind|laid ?back/i, { moods: ['Easygoing', 'Peaceful', 'Cool'], genres: ['Lo-Fi', 'Deep House', 'Downtempo'], bpm: [80, 115] }],
  [/sad|heartbreak|cry|miss|lonely/i, { moods: ['Melancholy', 'Yearning', 'Sentimental'], genres: ['R&B/Soul', 'Lo-Fi', 'Downtempo'], bpm: [60, 100] }],
  [/angry|mad|fury|vent/i, { moods: ['Aggressive', 'Defiant', 'Fiery'], genres: ['Metal', 'Trap', 'Dubstep'], bpm: [130, 175] }],
  [/happy|joy|good mood|feel ?good|smile/i, { moods: ['Upbeat', 'Excited', 'Empowering'], genres: ['Disco', 'House', 'Pop', 'Funk'], bpm: [110, 128] }],
  [/love|romantic|date|slow dance/i, { moods: ['Romantic', 'Tender', 'Sentimental'], genres: ['R&B/Soul', 'Jazz', 'Downtempo'], bpm: [65, 105] }],
  [/dark|sinister|villain|menac/i, { moods: ['Brooding', 'Serious', 'Gritty'], genres: ['Techno', 'Trap', 'Electronic'], bpm: [100, 140] }],
  [/space|cosmic|float|dream|ethereal/i, { moods: ['Peaceful', 'Stirring'], genres: ['Ambient', 'Electronic', 'Downtempo'], bpm: [60, 110] }],
  // -- direct style words pass straight through
  [/house/i, { genres: ['House', 'Deep House', 'Tech House'], bpm: [118, 128] }],
  [/techno/i, { genres: ['Techno'], bpm: [125, 140] }],
  [/dnb|drum and bass|drum & bass|jungle/i, { genres: ['Drum & Bass', 'Jungle'], bpm: [160, 180] }],
  [/dubstep|bass music|wobble/i, { genres: ['Dubstep'], bpm: [135, 150] }],
  [/trap|808/i, { genres: ['Trap'], bpm: [130, 160] }],
  [/hip ?hop|rap/i, { genres: ['Hip-Hop/Rap'], bpm: [80, 150] }],
  [/lo ?-?fi/i, { genres: ['Lo-Fi'], bpm: [60, 95] }],
  [/disco|funk|groove/i, { genres: ['Disco', 'Funk'], bpm: [105, 125] }],
  [/ambient|drone/i, { genres: ['Ambient'], bpm: [50, 90] }],
  [/jazz/i, { genres: ['Jazz'] }],
  [/soul|rnb|r&b/i, { genres: ['R&B/Soul'], bpm: [70, 110] }],
  [/reggae|dub(?!step)/i, { genres: ['Reggae'], bpm: [70, 100] }],
  [/latin|reggaeton/i, { genres: ['Latin'], bpm: [90, 110] }],
  [/phonk|drift/i, { moods: ['Gritty', 'Brooding'], genres: ['Trap', 'Electro', 'Hip-Hop/Rap'], bpm: [125, 165] }],
  [/hyperpop|glitch/i, { moods: ['Excited', 'Rowdy'], genres: ['Hyperpop', 'Glitch Hop', 'Electronic'], bpm: [130, 170] }],
  [/trance|uplifting|euphoric/i, { moods: ['Stirring', 'Empowering'], genres: ['Trance', 'Progressive House'], bpm: [132, 142] }],
  [/hardstyle|hardcore|gabber/i, { moods: ['Aggressive', 'Rowdy'], genres: ['Hardstyle'], bpm: [145, 180] }],
  [/vaporwave|synthwave|retro|80s/i, { moods: ['Cool', 'Sentimental'], genres: ['Vaporwave', 'Electronic', 'Electro'], bpm: [80, 118] }],
  [/afro|amapiano|afrobeats?/i, { moods: ['Upbeat', 'Easygoing'], genres: ['Afrobeat', 'House', 'Dancehall'], bpm: [100, 118] }],
  [/future bass|melodic bass|chill trap/i, { moods: ['Stirring', 'Yearning'], genres: ['Future Bass', 'Electronic'], bpm: [130, 160] }],
  [/sad boy|sadboy|down bad|in my feels|feels/i, { moods: ['Melancholy', 'Yearning'], genres: ['Lo-Fi', 'R&B/Soul', 'Hip-Hop/Rap'], bpm: [60, 105] }],
  [/rock|guitar|band/i, { genres: ['Rock', 'Alternative'], bpm: [100, 160] }],
  [/metal|heavy/i, { moods: ['Aggressive', 'Fiery'], genres: ['Metal'], bpm: [120, 190] }],
  [/pop\b|catchy|radio/i, { moods: ['Upbeat'], genres: ['Pop'], bpm: [100, 130] }],
]

/** Read a prompt: blend every lexicon hit into one sense + a human line. */
export function readVibe(prompt: string): { sense: VibeSense; read: string } {
  const moods = new Set<string>()
  const genres = new Set<string>()
  let bpmLo = Infinity
  let bpmHi = -Infinity
  for (const [re, v] of LEXICON) {
    if (!re.test(prompt)) continue
    v.moods?.forEach((m) => moods.add(m))
    v.genres?.forEach((g) => genres.add(g))
    if (v.bpm) {
      bpmLo = Math.min(bpmLo, v.bpm[0])
      bpmHi = Math.max(bpmHi, v.bpm[1])
    }
  }
  const sense: VibeSense = {
    moods: moods.size ? [...moods] : undefined,
    genres: genres.size ? [...genres] : undefined,
    bpm: isFinite(bpmLo) ? [bpmLo, bpmHi] : undefined,
  }
  const bits: string[] = []
  if (sense.moods) bits.push(sense.moods.slice(0, 2).join('/').toLowerCase())
  if (sense.genres) bits.push(sense.genres.slice(0, 2).join('/').toLowerCase())
  if (sense.bpm) bits.push(`${sense.bpm[0]}-${sense.bpm[1]}bpm`)
  return { sense, read: bits.length ? `read as ${bits.join(' · ')}` : 'no read · searching the words themselves' }
}

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
    // the directory lists the api gateway itself first these days — it
    // serves JSON fine but its stream redirects are unreliable, so only
    // real discovery nodes qualify
    const nodes = (hosts.data ?? []).filter((h) => !h.includes('api.audius.co'))
    if (nodes.length) hostCache = nodes[Math.floor(Math.random() * Math.min(3, nodes.length))]
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

/** THE VIBE: prompt in, playlist out. Candidates come from trending in
 *  the read's genres plus a full-text search of the prompt itself; every
 *  candidate is scored against the read (mood match, genre match, bpm in
 *  range, plays, search hit) and the best 30 play. */
export async function fetchVibe(prompt: string): Promise<{ tracks: TrackInfo[]; read: string }> {
  const { sense, read } = readVibe(prompt)
  try {
    const host = await resolveHost()
    const genres = sense.genres ?? CLUB
    const pool = new Map<string, { t: AudiusTrack; fromSearch: boolean }>()
    const jobs: Promise<void>[] = genres.slice(0, 5).map(async (g) => {
      const r = await fetch(
        `${host}/v1/tracks/trending?genre=${encodeURIComponent(g)}&app_name=${APP}&limit=30`,
        { signal: AbortSignal.timeout(6000) },
      )
      if (!r.ok) return
      const d = (await r.json()) as { data?: AudiusTrack[] }
      for (const t of d.data ?? []) if (playable(t) && !pool.has(t.id)) pool.set(t.id, { t, fromSearch: false })
    })
    jobs.push(
      (async () => {
        const r = await fetch(
          `${host}/v1/tracks/search?query=${encodeURIComponent(prompt)}&app_name=${APP}&limit=40`,
          { signal: AbortSignal.timeout(7000) },
        )
        if (!r.ok) return
        const d = (await r.json()) as { data?: AudiusTrack[] }
        for (const t of d.data ?? []) {
          if (!playable(t)) continue
          const prev = pool.get(t.id)
          if (prev) prev.fromSearch = true
          else pool.set(t.id, { t, fromSearch: true })
        }
      })(),
    )
    await Promise.allSettled(jobs)

    const scored = [...pool.values()].map(({ t, fromSearch }) => {
      let score = Math.log10(1 + (t.play_count ?? 0)) * 0.5
      if (fromSearch) score += 1
      if (sense.moods && t.mood && sense.moods.includes(t.mood)) score += 2
      if (sense.genres && t.genre && sense.genres.includes(t.genre)) score += 1.5
      if (sense.bpm && t.bpm && t.bpm >= sense.bpm[0] && t.bpm <= sense.bpm[1]) score += 1
      return { t, score }
    })
    scored.sort((a, b) => b.score - a.score)
    const top = scored.slice(0, 30).map((x) => x.t)
    // light shuffle inside the top tier so replays differ
    for (let i = Math.min(top.length, 12) - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[top[i], top[j]] = [top[j], top[i]]
    }
    return { tracks: top.map((t) => toTrack(t, host)), read }
  } catch {
    return { tracks: [], read }
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
