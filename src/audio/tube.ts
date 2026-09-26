/**
 * The jukebox: YouTube's catalogue, played in YouTube's own player.
 *
 * scope cannot analyse this audio directly — it lives in a cross-origin
 * iframe, which is exactly why saloon.wtf and its kind show a static
 * illustration rather than a reacting visual. We get the reaction back a
 * different way: the tab's own output is capturable, and that captured
 * stream feeds the same analyser everything else uses (see
 * `AudioEngine.useTabAudio`).
 *
 * The player is mounted and never seen: a 1px clip at zero opacity, kept
 * composited because chrome throttles and eventually stalls a player it
 * believes nobody is watching. It is not display:none and not
 * visibility:hidden, either of which says exactly that. "What am I even
 * listening to" is answered by the rail's 01.1 JUKEBOX rows, which read
 * their values from this player.
 *
 * ---------------------------------------------------------------------
 * Engine API (the UI layer wires this up; this class only exposes it):
 *
 *   mount(host, startId?, startSeconds?)  create/replace the hidden player.
 *     startSeconds seeks there once ready — pass Tube.resume()'s `t` to
 *     pick up where a visitor left off. Mounting never auto-resumes on its
 *     own; the caller decides whether to use resume() at all.
 *   load(id)              play a single pasted link right now. The queue
 *     becomes [id, ...whatever was still ahead in the old queue] — pasting
 *     a link doesn't erase the rest of what was queued up, it just cuts in
 *     line.
 *   setQueue(items, startIndex)  replace the queue outright and play
 *     items[startIndex]. This is what search results and "play this list"
 *     actions should call — it's the only way to point next()/prev() at
 *     something other than HINDI.
 *   next() / prev()        walk the current queue, wrapping at either end.
 *   queue / index          readonly getters onto the live queue and where
 *     playback is in it.
 *   seek(seconds)           jump playback to a timestamp.
 *   recents()               last 8 distinct videos actually played
 *     (id/title/channel), most recent first.
 *   resume()                last known videoId + elapsed seconds, or null
 *     if there's nothing (or localStorage is unavailable — private mode
 *     etc. degrades to "no memory", never a throw).
 *   onChange                 fire-and-forget callback invoked whenever the
 *     queue, index, or currently-loading video changes, so the UI can
 *     re-render without polling for it.
 *   onError                  unchanged: fired on an embed-disabled error.
 *     The engine now also auto-skips to the next queue item on error, and
 *     gives up (stops trying) once every item in the queue has failed once
 *     in a row — otherwise an all-broken queue would spin forever.
 *   ENDED playback advances to the next queue item on its own; nothing
 *     further to wire up for that.
 * ---------------------------------------------------------------------
 */

export interface TubeTrack {
  id: string
  title: string
  channel: string
}

/** A queue entry once a real queue can hold search hits, not just curated
 *  tracks — title/channel are cosmetic and often unknown until playback
 *  starts reporting them itself (see `read()`). */
export interface TubeQueueItem {
  id: string
  title?: string
  channel?: string
}

/**
 * Curated starting point. Every id below was verified embeddable through
 * YouTube's oEmbed endpoint, which returns 401 when a rights holder has
 * disabled embedding — see JUKEBOX-READINESS.md.
 *
 * Official label channels ONLY. Fan reuploads of the same songs are
 * usually unlicensed and get pulled, and curating them into a product
 * would be both fragile and wrong.
 */
export const HINDI: TubeTrack[] = [
  { id: 'xZDDOwGqLFY', title: 'best of t-series mixtape', channel: 't-series' },
  { id: 'sqfHiNiRmug', title: 'bollywood soulful hits', channel: 't-series' },
  { id: 'ND4V-wgtGZ8', title: 'best hindi songs 2022', channel: 'saregama' },
  { id: '0XTJdt90Yf0', title: 'top hits of arijit & shreya', channel: 'saregama' },
  { id: 'N0jnLZxYwYc', title: 'mujhse mohabbat ka izhaar', channel: 'shemaroo' },
  { id: 'sivn5BX3Lic', title: 'uff', channel: 't-series' },
]

/** Accepts a full watch/share/embed URL or a bare 11-character id. */
export function parseVideoId(input: string): string | null {
  const s = input.trim()
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s
  const m =
    s.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
    s.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ||
    s.match(/\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

/** One search result: exactly what a rail row needs and nothing else. */
export interface TubeHit {
  id: string
  title: string
  channel: string
}

/**
 * Search YouTube by words instead of by link.
 *
 * The work happens in `/api/yt-search`, not here, because YouTube has no
 * keyless CORS-enabled search endpoint and the alternative is shipping an API
 * key inside a public bundle. That file explains the arrangement; this one
 * only has to ask.
 *
 * Throws with something a person can read, because the caller puts it
 * straight on the announce line.
 */
export async function searchTube(query: string, signal?: AbortSignal): Promise<TubeHit[]> {
  const q = query.trim()
  if (!q) return []
  const url = `${import.meta.env.BASE_URL}api/yt-search?q=${encodeURIComponent(q)}`
  let r: Response
  try {
    r = await fetch(url, { signal: signal ?? AbortSignal.timeout(12000) })
  } catch {
    throw new Error('search could not be reached')
  }
  if (!r.ok) {
    // The route answers JSON on every path it controls. HTML here means the
    // route is not deployed at all, which is a different fault and deserves
    // to say so rather than "search failed".
    const body = await r.json().catch(() => null)
    throw new Error(body?.error ?? (r.status === 404 ? 'search is not deployed' : `search failed (${r.status})`))
  }
  const d = (await r.json()) as { items?: TubeHit[] }
  return (d.items ?? []).filter((i) => /^[A-Za-z0-9_-]{11}$/.test(i.id))
}

/** What the IFrame API will actually tell us — and nothing more. */
export interface TubeState {
  title: string | null
  /** Empty until playback starts; the row stays hidden until then. */
  channel: string | null
  videoId: string | null
  elapsed: number
  duration: number
  playing: boolean
  /** 101/150 mean the owner disabled embedding for this video. */
  error: number | null
}

interface YTPlayer {
  destroy(): void
  playVideo(): void
  pauseVideo(): void
  loadVideoById(id: string): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  mute(): void
  unMute(): void
  isMuted(): boolean
  setVolume(v: number): void
  getVideoData(): { title?: string; author?: string; video_id?: string }
  getCurrentTime(): number
  getDuration(): number
  getPlayerState(): number
}

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement | string, opts: unknown) => YTPlayer }
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<void> | null = null

/** Load the IFrame API once per page, however many callers ask. */
function loadApi(): Promise<void> {
  if (apiPromise) return apiPromise
  apiPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) return resolve()
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(s)
  })
  return apiPromise
}

const STORAGE_KEY = 'scope-tube-v1'
const RECENTS_MAX = 8
const PERSIST_MS = 5000 // write elapsed-time at most this often — localStorage is sync and cheap, but not free every tick

interface TubeRecent {
  id: string
  title: string
  channel: string
  ts: number
}

interface TubeMemory {
  last: { id: string; t: number } | null
  recents: TubeRecent[]
}

/** Every localStorage touch is wrapped — private mode throws on read AND
 *  write, and the jukebox degrading to "no memory" beats it breaking. */
function loadMemory(): TubeMemory {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { last: null, recents: [] }
    const d = JSON.parse(raw) as Partial<TubeMemory>
    return {
      last: d.last && typeof d.last.id === 'string' ? { id: d.last.id, t: Number(d.last.t) || 0 } : null,
      recents: Array.isArray(d.recents) ? d.recents.slice(0, RECENTS_MAX) : [],
    }
  } catch {
    return { last: null, recents: [] }
  }
}

function saveMemory(m: TubeMemory) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m))
  } catch {
    /* private mode, quota, disabled storage — memory is best-effort */
  }
}

export class Tube {
  private player: YTPlayer | null = null
  private lastError: number | null = null
  private _index = 0
  private _list: TubeQueueItem[] = HINDI
  /** How many auto-skips in a row were caused by an error, not an ENDED.
   *  Resets on any manual navigation; once it reaches the queue length
   *  every item has failed once and we stop rather than spin forever. */
  private errorSkipCount = 0
  private memory: TubeMemory = loadMemory()
  private lastPersistAt = 0
  /** Videoid the recents list already reflects, so read()'s 6Hz poll
   *  doesn't rewrite localStorage every tick once title/channel resolve. */
  private lastRecordedId: string | null = null
  private handlePageHide = () => this.persist(true)

  /** Fired when a video refuses to embed, so the UI can say so and move on. */
  onError: ((code: number) => void) | null = null
  /** Fired whenever queue/index/current video changes. */
  onChange: (() => void) | null = null

  get queue(): readonly TubeQueueItem[] {
    return this._list
  }

  get index(): number {
    return this._index
  }

  async mount(host: HTMLElement, startId?: string, startSeconds?: number) {
    await loadApi()
    if (!window.YT?.Player) return
    this.player?.destroy()
    this.lastError = null
    this.errorSkipCount = 0
    // YT.Player REPLACES the element it is given with the iframe, inheriting
    // its class. Handing it React's own node would leave the ref pointing at
    // a detached div and kill the styling on the next render. Give it a
    // disposable child instead and keep the wrapper intact.
    host.textContent = ''
    const slot = document.createElement('div')
    host.appendChild(slot)
    const initialId = startId ?? this._list[this._index]?.id ?? this._list[0]?.id
    // one mount per Tube instance in practice, but a remount shouldn't stack
    // a second pagehide listener writing the same thing twice.
    window.removeEventListener('pagehide', this.handlePageHide)
    window.addEventListener('pagehide', this.handlePageHide)
    this.player = new window.YT.Player(slot, {
      videoId: initialId,
      // The player is mounted inside a 1px clip and never seen, so its own
      // controls are unreachable by definition -- shipping them would leave
      // dead chrome in a surface nobody can look at. scope's transport is
      // now the only transport, which is the honest arrangement rather than
      // the previous one where two of them existed and one was hidden.
      // disablekb keeps the invisible frame from eating arrow keys.
      // `start` gets the resume point close on the initial load; the
      // onReady seekTo below corrects it to the exact second, since `start`
      // only takes whole seconds and only applies to the cue, not a running
      // player.
      playerVars: {
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        ...(startSeconds ? { start: Math.max(0, Math.floor(startSeconds)) } : {}),
      },
      events: {
        onReady: () => {
          if (startSeconds) {
            try {
              this.player?.seekTo(startSeconds, true)
            } catch {
              /* not ready yet somehow — start param already got us close */
            }
          }
        },
        onStateChange: (e: { data: number }) => {
          if (e.data === 0) this.autoAdvance(false) // ENDED
        },
        onError: (e: { data: number }) => {
          this.lastError = e.data
          this.onError?.(e.data)
          this.autoAdvance(true)
        },
      },
    })
    this.onChange?.()
  }

  /**
   * Play a single pasted link right now. The rest of the queue that was
   * already ahead of the current item keeps following it — pasting a link
   * cuts in line rather than discarding what was queued.
   */
  load(id: string) {
    const remainder = this._list.slice(this._index + 1)
    this._list = [{ id }, ...remainder]
    this._index = 0
    this.errorSkipCount = 0
    this.lastError = null
    this.lastRecordedId = null
    this.player?.loadVideoById(id)
    this.onChange?.()
  }

  /** Replace the queue outright and start at items[startIndex]. This is
   *  the only thing that should make next()/prev() walk something other
   *  than HINDI (a search result list, say). */
  setQueue(items: TubeQueueItem[], startIndex: number) {
    if (!items.length) return
    this._list = items.slice()
    this._index = ((startIndex % items.length) + items.length) % items.length
    this.errorSkipCount = 0
    this.loadCurrent()
  }

  play() { this.player?.playVideo() }
  pause() { this.player?.pauseVideo() }
  /** Muting YouTube also silences what we capture, so the star stops
   *  reacting — which is correct: no sound, no reaction. */
  mute() { this.player?.mute() }
  unMute() { this.player?.unMute() }
  isMuted(): boolean { try { return !!this.player?.isMuted() } catch { return false } }
  /** 0..1 — the volume slider has something real to drive after all. */
  setVolume(v: number) { try { this.player?.setVolume(Math.round(v * 100)) } catch { /* not ready */ } }
  seek(seconds: number) { try { this.player?.seekTo(seconds, true) } catch { /* not ready */ } }

  next() {
    if (!this._list.length) return
    this.errorSkipCount = 0 // manual nav clears the error-loop guard
    this._index = (this._index + 1) % this._list.length
    this.loadCurrent()
  }

  prev() {
    if (!this._list.length) return
    this.errorSkipCount = 0
    this._index = (this._index - 1 + this._list.length) % this._list.length
    this.loadCurrent()
  }

  /** ENDED walks forward normally; an error also walks forward, but counts
   *  toward the guard so a queue that's entirely unembeddable gives up
   *  instead of skipping forever. */
  private autoAdvance(fromError: boolean) {
    if (!this._list.length) return
    if (fromError) {
      this.errorSkipCount++
      if (this.errorSkipCount >= this._list.length) return // whole queue has now failed once — stop
    } else {
      this.errorSkipCount = 0
    }
    this._index = (this._index + 1) % this._list.length
    this.loadCurrent()
  }

  private loadCurrent() {
    const item = this._list[this._index]
    if (!item) return
    this.lastError = null
    this.lastRecordedId = null
    this.player?.loadVideoById(item.id)
    this.onChange?.()
  }

  /** Last 8 distinct videos actually played, most recent first. */
  recents(): { id: string; title: string; channel: string }[] {
    return this.memory.recents.map(({ id, title, channel }) => ({ id, title, channel }))
  }

  /** Where to pick up, if anywhere. Caller decides whether/how to use it —
   *  mount() never auto-resumes on its own. */
  resume(): { id: string; t: number } | null {
    return this.memory.last ? { ...this.memory.last } : null
  }

  /** Throttled to PERSIST_MS unless `force` (pagehide, dispose). */
  private persist(force = false) {
    const p = this.player
    const id = this._list[this._index]?.id
    if (!p || !id) return
    const now = Date.now()
    if (!force && now - this.lastPersistAt < PERSIST_MS) return
    this.lastPersistAt = now
    let t = 0
    try { t = p.getCurrentTime() } catch { /* not ready */ }
    this.memory.last = { id, t }
    saveMemory(this.memory)
  }

  private recordRecent(id: string, title: string, channel: string) {
    const filtered = this.memory.recents.filter((r) => r.id !== id)
    filtered.unshift({ id, title, channel, ts: Date.now() })
    this.memory.recents = filtered.slice(0, RECENTS_MAX)
    saveMemory(this.memory)
  }

  /** Only what the API actually reports. Unknowns stay null, never ''. */
  read(): TubeState {
    const p = this.player
    if (!p?.getPlayerState) {
      return { title: null, channel: null, videoId: null, elapsed: 0, duration: 0, playing: false, error: this.lastError }
    }
    let d: { title?: string; author?: string; video_id?: string } = {}
    try {
      d = p.getVideoData() ?? {}
    } catch {
      /* player still initialising */
    }
    const num = (f: () => number) => {
      try {
        const v = f()
        return Number.isFinite(v) ? v : 0
      } catch {
        return 0
      }
    }
    const title = d.title || null
    // author is '' until playback actually starts — null it so the row
    // hides rather than rendering an empty cell
    const channel = d.author || null
    const videoId = d.video_id || null
    if (videoId && title && channel && videoId !== this.lastRecordedId) {
      this.lastRecordedId = videoId
      this.recordRecent(videoId, title, channel)
    }
    this.persist()
    return {
      title,
      channel,
      videoId,
      elapsed: num(() => p.getCurrentTime()),
      duration: num(() => p.getDuration()),
      playing: num(() => p.getPlayerState()) === 1,
      error: this.lastError,
    }
  }

  dispose() {
    this.persist(true)
    window.removeEventListener('pagehide', this.handlePageHide)
    this.player?.destroy()
    this.player = null
  }
}
