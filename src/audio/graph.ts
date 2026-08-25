/**
 * The WebAudio graph and its three possible sources.
 *
 *   radio  — the curated set, shuffled, looping forever
 *   file   — a track the visitor dropped in
 *   mic    — live input
 *
 * All three land on the same analyser, so the visual language is identical
 * regardless of where the sound came from. That's deliberate: "drop your own
 * track" is only interesting if it's demonstrably the *same instrument*
 * reacting differently, not a separate mode.
 */

import { Analyser } from './features'

export type SourceKind = 'radio' | 'file' | 'mic'

export interface TrackInfo {
  title: string
  artist: string
  src: string
}

export class AudioEngine {
  readonly ctx: AudioContext
  readonly analyser: Analyser
  readonly el: HTMLAudioElement
  private gain: GainNode
  private elSource: MediaElementAudioSourceNode | null = null
  private micSource: MediaStreamAudioSourceNode | null = null
  private micStream: MediaStream | null = null
  private filter!: BiquadFilterNode
  private _rate = 1

  kind: SourceKind = 'radio'
  playlist: TrackInfo[] = []
  index = 0
  onTrackChange: ((t: TrackInfo | null) => void) | null = null

  constructor() {
    this.ctx = new AudioContext()
    this.analyser = new Analyser(this.ctx)
    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0.8

    // The solo filter: every source passes through it BEFORE analysis, so
    // soloing a band isolates what you hear AND what the star sees. Allpass
    // = transparent bypass; bandpass = the armed slice.
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'allpass'
    this.filter.frequency.value = 1000
    this.filter.Q.value = 0.0001
    this.filter.connect(this.analyser.node)

    this.el = new Audio()
    this.el.crossOrigin = 'anonymous'
    this.el.preload = 'auto'
    this.el.addEventListener('ended', () => this.next())
    // One persistent pair instead of per-call listeners (which leaked and
    // cross-fired between sources). 'playing' confirms sound actually flows;
    // 'error' is the designed-failure path for whatever was playing.
    // Browsers reset playbackRate on every src change, so the deck's rate
    // is engine state and gets re-applied on each load — otherwise the dial
    // keeps reading 70 while the audio silently runs at 100.
    this.el.addEventListener('loadstart', () => {
      this.el.playbackRate = this._rate
      this.el.preservesPitch = false
    })
    this.el.addEventListener('playing', () => {
      this.el.playbackRate = this._rate
      this.watchdog++ // real audio arrived — cancel any pending verdict
      this.errStreak = 0
      if (this.pendingAnnounce) {
        this.onTrackChange?.(this.pendingAnnounce)
        this.pendingAnnounce = null
      }
    })
    this.el.addEventListener('error', () => this.onElementError())

    this.analyser.node.connect(this.gain)
    this.gain.connect(this.ctx.destination)
  }

  /** Some hosts rewrite missing files to 200-HTML instead of 404 — the
   *  audio element then never fires 'error', it just stalls silently under
   *  an announced title. The watchdog gives every radio track a deadline:
   *  no real audio within 4s counts as a dead station. */
  private watchdog = 0
  private armWatchdog() {
    const token = ++this.watchdog
    setTimeout(() => {
      if (token !== this.watchdog || this.kind !== 'radio') return
      const alive = this.el.readyState >= 2 && isFinite(this.el.duration) && !this.el.paused
      if (!alive) this.onElementError()
    }, 4000)
  }

  /** Announce queued until the element reports 'playing'. */
  private pendingAnnounce: TrackInfo | null = null
  /** Consecutive element errors — the retune gives up after a few. */
  private errStreak = 0

  private onElementError() {
    this.pendingAnnounce = null
    if (this.kind === 'file') {
      // Undecodable upload: say why, then fall back — held long enough
      // that the radio's own announce doesn't erase the reason. The kind
      // flips first so UI derived from it doesn't lag the message.
      this.kind = 'radio'
      this.onTrackChange?.({ title: 'file not playable', artist: 'back to the radio', src: '' })
      setTimeout(() => void this.playRadio(), 1800)
      return
    }
    if (this.kind !== 'radio') return
    // A dead radio track must never strand the visitor under an 'on air'
    // sign — 'ended' never fires on an errored element, so skip ourselves.
    this.errStreak++
    if (this.errStreak > 3) {
      // Also the deployed reality: the radio library ships only on machines
      // that hold licensed audio — everywhere else this is the honest state.
      this.onTrackChange?.({ title: 'radio unavailable', artist: 'drop a track anywhere', src: '' })
      return
    }
    void this.next()
  }

  /** Must be called from a user gesture — browsers refuse audio otherwise. */
  async unlock() {
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    if (!this.elSource) {
      this.elSource = this.ctx.createMediaElementSource(this.el)
      this.elSource.connect(this.filter)
    }
  }

  setPlaylist(tracks: TrackInfo[]) {
    this.playlist = shuffle(tracks)
    this.index = 0
  }

  get current(): TrackInfo | null {
    return this.kind === 'radio' ? this.playlist[this.index] ?? null : null
  }

  async playRadio() {
    await this.unlock()
    this.stopMic()
    // Drop a queued upload announce: whatever it was waiting for is no
    // longer what's playing.
    this.pendingAnnounce = null
    this.kind = 'radio'
    const t = this.playlist[this.index]
    if (!t) return
    if (!this.el.src.endsWith(t.src)) this.el.src = t.src
    this.armWatchdog()
    await this.el.play().catch(() => {})
    this.onTrackChange?.(t)
  }

  async next() {
    if (this.kind !== 'radio' || !this.playlist.length) return
    this.pendingAnnounce = null
    this.index = (this.index + 1) % this.playlist.length
    this.el.src = this.playlist[this.index].src
    this.armWatchdog()
    await this.el.play().catch(() => {})
    this.onTrackChange?.(this.playlist[this.index])
  }

  private uploadUrl: string | null = null

  async playFile(file: File) {
    await this.unlock()
    this.stopMic()
    this.kind = 'file'
    // Revoke the previous upload's object URL — each one pins the whole file
    // in memory for the life of the page otherwise.
    if (this.uploadUrl) URL.revokeObjectURL(this.uploadUrl)
    const url = URL.createObjectURL(file)
    this.uploadUrl = url
    this.el.src = url
    // Announced by the persistent 'playing' handler once sound flows;
    // the persistent 'error' handler covers undecodable files.
    this.pendingAnnounce = {
      title: file.name.replace(/\.[^.]+$/, ''),
      artist: 'your upload',
      src: url,
    }
    await this.el.play().catch(() => {})
  }

  async useMic() {
    await this.unlock()
    this.pendingAnnounce = null
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        // Every one of these would fight the visualiser for control of the
        // dynamics. We want the raw room.
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
    } catch {
      // Denied or unavailable: the current source keeps playing and the
      // state speaks through the existing announce channel — a designed
      // failure, not a dead click.
      this.onTrackChange?.({
        title: 'live input blocked',
        artist: 'allow microphone access, then try again',
        src: '',
      })
      return
    }
    // Pause the running source only once the stream actually exists.
    this.el.pause()
    // Retire any previous mic only once the new stream is actually granted —
    // stopping at entry would kill a working mic when a re-request is denied.
    this.stopMic()
    this.micStream = stream
    this.micSource = this.ctx.createMediaStreamSource(stream)
    this.micSource.connect(this.filter)
    this.kind = 'mic'
    this.onTrackChange?.({ title: 'live input', artist: 'the room', src: '' })
  }

  private stopMic() {
    this.micSource?.disconnect()
    this.micSource = null
    this.micStream?.getTracks().forEach((t) => t.stop())
    this.micStream = null
  }

  /** Playback rate, 0.5..1.5. Vinyl-style: pitch bends with speed. */
  set rate(r: number) {
    this._rate = r
    this.el.playbackRate = r
    this.el.preservesPitch = false
  }
  get rate() {
    return this._rate
  }

  /** Solo one of the 24 log bands (60..12k), or null to hear everything.
   *  Smooth 60ms ramps — no clicks when arming or releasing. */
  solo(centerHz: number | null) {
    const t = this.ctx.currentTime
    if (centerHz == null) {
      this.filter.type = 'allpass'
      this.filter.Q.setTargetAtTime(0.0001, t, 0.06)
    } else {
      this.filter.type = 'bandpass'
      this.filter.frequency.setTargetAtTime(centerHz, t, 0.06)
      this.filter.Q.setTargetAtTime(4.5, t, 0.06)
    }
  }

  get playing() {
    return this.kind === 'mic' ? !!this.micStream : !this.el.paused
  }

  toggle() {
    if (this.kind === 'mic') return
    if (this.el.paused) this.el.play().catch(() => {})
    else this.el.pause()
  }

  private _volume = 0.8
  private _muted = false

  set volume(v: number) {
    this._volume = v
    if (!this._muted) this.gain.gain.value = v
  }

  private recDest: MediaStreamAudioDestinationNode | null = null

  /**
   * Pre-volume audio tap for the clip recorder — wired off the analyser, so
   * a muted or turned-down session still records with full music. Shares one
   * destination node across recordings.
   */
  get recordStream(): MediaStream {
    if (!this.recDest) {
      this.recDest = this.ctx.createMediaStreamDestination()
      this.analyser.node.connect(this.recDest)
    }
    return this.recDest.stream
  }

  get muted() {
    return this._muted
  }

  /** Mute kills the output, not the analysis — the butterfly keeps dancing. */
  set muted(m: boolean) {
    this._muted = m
    this.gain.gain.value = m ? 0 : this._volume
  }
}

function shuffle<T>(a: T[]): T[] {
  const out = a.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
