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
 * The player is deliberately VISIBLE. YouTube's embedded-player policies
 * require it; using the iframe as a hidden audio source would be a
 * violation, and a hidden player would also make the "what am I even
 * listening to" question unanswerable.
 */

export interface TubeTrack {
  id: string
  title: string
  channel: string
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

export class Tube {
  private player: YTPlayer | null = null
  private lastError: number | null = null
  private index = 0
  private list: TubeTrack[] = HINDI

  /** Fired when a video refuses to embed, so the UI can say so and move on. */
  onError: ((code: number) => void) | null = null

  async mount(host: HTMLElement, startId?: string) {
    await loadApi()
    if (!window.YT?.Player) return
    this.player?.destroy()
    this.lastError = null
    // YT.Player REPLACES the element it is given with the iframe, inheriting
    // its class. Handing it React's own node would leave the ref pointing at
    // a detached div and kill the styling on the next render. Give it a
    // disposable child instead and keep the wrapper intact.
    host.textContent = ''
    const slot = document.createElement('div')
    host.appendChild(slot)
    this.player = new window.YT.Player(slot, {
      videoId: startId ?? this.list[0].id,
      // controls stay ON: scope's transport drives the engine, and pretending
      // to own a transport we only partly control would be a lie.
      playerVars: { rel: 0, playsinline: 1, modestbranding: 1 },
      events: {
        onError: (e: { data: number }) => {
          this.lastError = e.data
          this.onError?.(e.data)
        },
      },
    })
  }

  load(id: string) {
    this.lastError = null
    this.player?.loadVideoById(id)
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

  next() {
    if (!this.list.length) return
    this.index = (this.index + 1) % this.list.length
    this.load(this.list[this.index].id)
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
    return {
      title: d.title || null,
      // author is '' until playback actually starts — null it so the row
      // hides rather than rendering an empty cell
      channel: d.author || null,
      videoId: d.video_id || null,
      elapsed: num(() => p.getCurrentTime()),
      duration: num(() => p.getDuration()),
      playing: num(() => p.getPlayerState()) === 1,
      error: this.lastError,
    }
  }

  dispose() {
    this.player?.destroy()
    this.player = null
  }
}
