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
  /** film or session, from the verified oEmbed title */
  from: string
  /**
   * Singers, taken from the LABEL'S OWN credit in the upload description —
   * the "Singer -" line, or the ARTIST/Vocals block on the Coke Studio
   * uploads. Not from memory: the film version of Kesariya credits Antara
   * Mitra alongside Arijit Singh, which a from-memory list would have
   * missed. Two spellings are normalised to the artists' own — the
   * descriptions write "Chinmaye" and "Sheykhar".
   */
  singers: string
}

/**
 * Individual songs, not mixtapes. Every id below was resolved from a real
 * YouTube search and then confirmed through the oEmbed endpoint, which
 * returns the canonical title and channel — so each entry is verified twice
 * over: that it embeds at all (oEmbed 401s when a rights holder disables
 * embedding) and that the id is genuinely the song it claims to be.
 *
 * Official label channels ONLY. Fan reuploads of the same songs are
 * usually unlicensed and get pulled, and curating them into a product
 * would be both fragile and wrong.
 *
 * `from` is the film or session, taken from the verified oEmbed title.
 * Singers are deliberately NOT listed: unlike the title and the channel,
 * they are not in anything we fetched, and asserting them from memory is
 * exactly the kind of unverified value DESIGN.md law 3 forbids.
 */
export const HINDI: TubeTrack[] = [
  { id: '6mr4cYJ7yew', title: 'kesariya', from: 'brahmastra', singers: 'arijit singh, antara mitra' },
  { id: '81qmmlsIE3k', title: 'tum hi ho', from: 'aashiqui 2', singers: 'arijit singh' },
  { id: 'bzSTpdcs-EI', title: 'channa mereya', from: 'ae dil hai mushkil', singers: 'arijit singh' },
  { id: 'GLGuLXKT9Ng', title: 'raataan lambiyan', from: 'shershaah', singers: 'jubin nautiyal, asees kaur' },
  { id: 'ElZfdU54Cp8', title: 'apna bana le', from: 'bhediya', singers: 'arijit singh, sachin-jigar' },
  { id: 'VAdGW7QDJiU', title: 'chaleya', from: 'jawan', singers: 'arijit singh, shilpa rao' },
  { id: 'RLzC55ai0eo', title: 'heeriye', from: 'jasleen royal', singers: 'arijit singh, jasleen royal' },
  { id: 'X7WXHhokylc', title: 'tere vaaste', from: 'zara hatke zara bachke', singers: 'varun jain, sachin-jigar, shadab faridi, altamash faridi' },
  { id: 'fdubeMFwuGs', title: 'ilahi', from: 'yeh jawaani hai deewani', singers: 'arijit singh' },
  { id: 'npwn6KVMtFI', title: 'o bedardeya', from: 'tu jhoothi main makkaar', singers: 'arijit singh' },
  { id: 'jHNNMj5bNQw', title: 'kabira', from: 'yeh jawaani hai deewani', singers: 'tochi raina, rekha bhardwaj' },
  { id: 'sK7riqg2mr4', title: 'agar tum saath ho', from: 'tamasha', singers: 'alka yagnik, arijit singh' },
  { id: 'T94PHkuydcw', title: 'kun faya kun', from: 'rockstar', singers: 'a.r. rahman, javed ali, mohit chauhan' },
  { id: 'k3g_WjLCsXM', title: 'sajni', from: 'laapataa ladies', singers: 'arijit singh' },
  { id: 'hxMNYkLN7tI', title: 'aaj ki raat', from: 'stree 2', singers: 'madhubanti bagchi, divya kumar, sachin-jigar' },
  { id: 'mNuhKUOD_A0', title: 'deva deva', from: 'brahmastra', singers: 'arijit singh, jonita gandhi' },
  { id: '9JDSGhhiOwI', title: 'tere bina', from: 'guru', singers: 'a.r. rahman, chinmayi, murtuza khan, qadir khan' },
  { id: '5Eqb_-j3FDA', title: 'pasoori', from: 'coke studio 14', singers: 'ali sethi, shae gill' },
  { id: '-2RAq5o5pwc', title: 'jhol', from: 'coke studio 15', singers: 'maanu, annural khalid' },
  { id: 'YxWlaYCA8MU', title: 'jhoome jo pathaan', from: 'pathaan', singers: 'arijit singh, sukriti kakar, vishal-shekhar' },
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
    // Keep the cursor with what is actually playing, or SKIP resumes from
    // wherever the list was last left — pick track 14, press skip, land on
    // track 2. Unknown ids (a pasted link) leave the cursor alone, so skip
    // continues from the last curated song rather than jumping to the top.
    const at = this.list.findIndex((t) => t.id === id)
    if (at >= 0) this.index = at
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
