/**
 * Search YouTube, server-side, so the key never ships.
 *
 * The jukebox used to take a link or an 11-character id and nothing else,
 * which meant leaving scope to find anything. This is the search behind the
 * same field.
 *
 * WHY THIS IS A FUNCTION AND NOT A FETCH IN THE BROWSER. YouTube has no
 * keyless, CORS-enabled search endpoint, so the only in-browser options are
 * an unofficial mirror or shipping a key in the bundle. This repository is
 * PUBLIC and a VITE_ variable is embedded verbatim in the built JS, so a key
 * there is a key anyone can read and drain. Here it is read from the server
 * environment at request time and never reaches the client.
 *
 * The same handler serves `vite dev` — see scope-dev-api in vite.config.ts —
 * so there is one implementation and dev behaves like production.
 *
 * ── configuration ────────────────────────────────────────────────────
 *   YT_API_KEY   (Vercel project env, NOT VITE_ prefixed)
 *
 * Unset, it falls back to a keyless mirror and still works — a clone with no
 * key gets a jukebox that searches, which is the same courtesy the radio
 * already extends when the local library is absent.
 */

/** YouTube Data API v3 costs 100 quota units per search against a 10,000/day
 *  free ceiling: a hundred searches a day. The edge cache below is not a
 *  nicety, it is most of the budget — repeated queries never reach Google. */
const CACHE = 'public, s-maxage=3600, stale-while-revalidate=86400'

/** Keyless mirrors, tried in order. These ROT: measured 2026-09-14, five of
 *  six well-known public instances were dead or CORS-blocked and Piped's own
 *  instance directory (piped-instances.kavin.rocks) did not resolve at all.
 *  That is exactly why the official path above is the one to configure. */
const MIRRORS = [
  'https://api.piped.private.coffee',
  'https://pipedapi.adminforge.de',
  'https://pipedapi.kavin.rocks',
]

const TIMEOUT = 7000
const MAX_Q = 120
/* Six, and the number comes from the module rather than from taste. The
 * jukebox's own comment rejected six PERMANENT starting-point rows as "264px
 * of permanent furniture in a module already taking 60% of the rail", and
 * settled on three. Search results are transient — they arrive on demand and
 * clear with the field — so they may spend what permanence could not, but
 * 264px is the ceiling that module already established for itself. Eight rows
 * pushed the spectrum below the fold on a 900px desktop. */
const MAX_RESULTS = 6

/** YouTube returns titles HTML-escaped (`&amp;`, `&#39;`). The rail prints
 *  text, not markup, so they come back as characters. */
function unescapeHtml(s) {
  return String(s ?? '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
}

async function viaApi(q, key) {
  const u = new URL('https://www.googleapis.com/youtube/v3/search')
  u.searchParams.set('part', 'snippet')
  u.searchParams.set('q', q)
  u.searchParams.set('type', 'video')
  // The one parameter that matters most here. A result whose rights holder
  // has disabled embedding loads into the hidden player and plays nothing,
  // which reads as scope being broken rather than as the video being closed.
  u.searchParams.set('videoEmbeddable', 'true')
  u.searchParams.set('maxResults', String(MAX_RESULTS))
  u.searchParams.set('key', key)
  const r = await fetch(u, { signal: AbortSignal.timeout(TIMEOUT) })
  if (!r.ok) throw new Error(`youtube ${r.status}`)
  const d = await r.json()
  return (d.items ?? [])
    .filter((i) => i?.id?.videoId)
    .map((i) => ({ id: i.id.videoId, title: unescapeHtml(i.snippet?.title), channel: unescapeHtml(i.snippet?.channelTitle) }))
}

async function viaMirror(q) {
  let last = null
  for (const host of MIRRORS) {
    try {
      const u = `${host}/search?q=${encodeURIComponent(q)}&filter=videos`
      const r = await fetch(u, { signal: AbortSignal.timeout(TIMEOUT) })
      if (!r.ok) { last = new Error(`${host} ${r.status}`); continue }
      const d = await r.json()
      // A HOST THAT ANSWERED HAS ANSWERED. Falling through to the next mirror
      // because this one found nothing conflates "no results" with "broken",
      // and the first draft did exactly that: every host was tried, every one
      // legitimately had nothing for an odd query, and the endpoint returned
      // 502. The rail then said "search failed" for a search that had worked
      // perfectly and simply found no music. An empty list is an answer.
      return (d.items ?? [])
        // A 43-second Short is not a track. Neither is a 4-hour stream.
        .filter((i) => !i.isShort && i.duration > 60 && i.duration < 3 * 3600)
        .map((i) => ({ id: String(i.url ?? '').slice(-11), title: unescapeHtml(i.title), channel: unescapeHtml(i.uploaderName) }))
        .filter((i) => /^[A-Za-z0-9_-]{11}$/.test(i.id))
        .slice(0, MAX_RESULTS)
    } catch (e) { last = e }
  }
  throw last ?? new Error('no mirror answered')
}

export default async function handler(req, res) {
  const send = (code, body) => {
    res.statusCode = code
    res.setHeader('content-type', 'application/json; charset=utf-8')
    if (code === 200) res.setHeader('cache-control', CACHE)
    res.end(JSON.stringify(body))
  }
  // Parsed from the url rather than req.query, because this same handler is
  // called by the vite dev middleware, where req.query does not exist.
  const q = (new URL(req.url, 'http://localhost').searchParams.get('q') ?? '').trim().slice(0, MAX_Q)
  if (!q) return send(400, { error: 'say what to look for' })

  const key = process.env.YT_API_KEY
  try {
    if (key) return send(200, { source: 'youtube', items: await viaApi(q, key) })
  } catch (e) {
    // A key that is out of quota, restricted to the wrong referrer, or simply
    // wrong should degrade to the mirror rather than take the feature down.
    // The reason is logged for the operator and never returned to the client.
    console.error('yt-search: official api failed, falling back to a mirror:', e?.message)
  }
  try {
    return send(200, { source: 'mirror', items: await viaMirror(q) })
  } catch (e) {
    console.error('yt-search: every mirror failed:', e?.message)
    return send(502, { error: 'search is unreachable', detail: key ? 'the api and every mirror failed' : 'no YT_API_KEY is set and every mirror failed' })
  }
}
