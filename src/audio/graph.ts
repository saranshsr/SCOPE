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

export type SourceKind = 'radio' | 'file' | 'mic' | 'stems'

export interface TrackInfo {
  title: string
  artist: string
  src: string
  /** The artist's OWN declared values, when the source provides them —
   *  printed beside scope's measured ones, never instead of them. */
  bpm?: number
  musicalKey?: string
  genre?: string
  plays?: number
  /** Attribution: a link back to the track's page on its platform. */
  link?: string
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
  private eqLow!: BiquadFilterNode
  private eqMid!: BiquadFilterNode
  private eqHigh!: BiquadFilterNode
  private sweepF!: BiquadFilterNode
  private tierFs: BiquadFilterNode[] = []
  private echoSend!: GainNode
  private echoDelay!: DelayNode
  private echoFb!: GainNode
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

    // THE PERFORMANCE CHAIN — every source passes through the whole desk
    // BEFORE analysis, so the star sees exactly what you hear, echoes and
    // kills included:  src -> eq(3) -> sweep -> solo -> [dry + echo] -> analyser
    this.eqLow = this.ctx.createBiquadFilter()
    this.eqLow.type = 'lowshelf'
    this.eqLow.frequency.value = 220
    this.eqMid = this.ctx.createBiquadFilter()
    this.eqMid.type = 'peaking'
    this.eqMid.frequency.value = 1200
    this.eqMid.Q.value = 0.8
    this.eqHigh = this.ctx.createBiquadFilter()
    this.eqHigh.type = 'highshelf'
    this.eqHigh.frequency.value = 4200

    // The colour filter: one knob, HP left, LP right. Allpass at centre.
    this.sweepF = this.ctx.createBiquadFilter()
    this.sweepF.type = 'allpass'
    this.sweepF.frequency.value = 800
    this.sweepF.Q.value = 0.9

    // The solo filter (spectrum tap-to-solo), unchanged in role.
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'allpass'
    this.filter.frequency.value = 1000
    this.filter.Q.value = 0.0001

    // Echo send/return: a feedback delay the star can hear ringing out.
    this.echoSend = this.ctx.createGain()
    this.echoSend.gain.value = 0
    this.echoDelay = this.ctx.createDelay(2)
    this.echoDelay.delayTime.value = 0.42
    this.echoFb = this.ctx.createGain()
    this.echoFb.gain.value = 0

    // The tier EQ: one peaking filter per dissection ring (up to 6), so
    // altering a RING alters the MUSIC — six independent hands on the
    // spectrum, not three shared shelves. Flat (0dB) filters are
    // transparent; centers/Q are retuned whenever the tier map changes.
    let prev: AudioNode = this.eqHigh
    for (let i = 0; i < 6; i++) {
      const f = this.ctx.createBiquadFilter()
      f.type = 'peaking'
      f.frequency.value = 60 * Math.pow(200, (i * 4 + 2) / 23)
      f.Q.value = 1.1
      f.gain.value = 0
      prev.connect(f)
      prev = f
      this.tierFs.push(f)
    }
    this.eqLow.connect(this.eqMid)
    this.eqMid.connect(this.eqHigh)
    prev.connect(this.sweepF)
    this.sweepF.connect(this.filter)
    this.filter.connect(this.analyser.node)          // dry
    this.filter.connect(this.echoSend)               // send
    this.echoSend.connect(this.echoDelay)
    this.echoDelay.connect(this.echoFb)
    this.echoFb.connect(this.echoDelay)              // feedback loop
    this.echoDelay.connect(this.analyser.node)       // return

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
    }, 5500) // remote streams (audius) legitimately take longer to arm
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
      this.elSource.connect(this.eqLow)
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
    this.micSource.connect(this.eqLow)
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

  /** The head of the performance desk — external sources (the stem deck)
   *  plug in here so EQ/sweep/echo/solo and the analyser hear them. */
  get busHead(): AudioNode {
    return this.eqLow
  }

  /** Enter stem-deck mode: the element and mic stand down; the deck owns
   *  playback and announces itself through the usual channel. */
  enterStems(title: string) {
    this.el.pause()
    this.stopMic()
    this.pendingAnnounce = null
    this.kind = 'stems'
    this.onTrackChange?.({ title, artist: 'stem deck', src: '' })
  }

  /** Performance EQ, momentary by design: the app springs it back. dB in
   *  [-30, +10]; -30 on a shelf is a real DJ kill. 40ms ramps, no zipper. */
  eq(band: 'low' | 'mid' | 'high', db: number) {
    const node = band === 'low' ? this.eqLow : band === 'mid' ? this.eqMid : this.eqHigh
    node.gain.setTargetAtTime(Math.max(-30, Math.min(10, db)), this.ctx.currentTime, 0.04)
  }

  /** Master mute: the gain node sits AFTER the analyser, so the star
   *  keeps dancing while muted — monitor silence, not instrument death.
   *  Covers radio, files, stems and mic alike (all route through it). */
  setMuted(m: boolean) {
    this.gain.gain.setTargetAtTime(m ? 0 : 1, this.ctx.currentTime, 0.02)
  }

  /** One ring, one filter: dB on the i-th tier's peaking band. */
  tierEq(i: number, db: number) {
    const f = this.tierFs[i]
    if (f) f.gain.setTargetAtTime(Math.max(-30, Math.min(10, db)), this.ctx.currentTime, 0.04)
  }

  /** Retune the tier filters to the current tier map: each covers its
   *  slice of the 24-band ladder (60Hz..12kHz, geometric). Unused tiers
   *  go transparent. */
  setTierBands(count: number) {
    const per = 24 / count
    for (let i = 0; i < 6; i++) {
      const f = this.tierFs[i]
      if (!f) continue
      if (i >= count) {
        f.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02)
        continue
      }
      const centerBand = i * per + per / 2
      f.frequency.value = 60 * Math.pow(200, centerBand / 23)
      // Q spans the tier's slice: bandwidth factor = 200^(per/24)
      const bw = Math.pow(200, per / 24)
      f.Q.value = 1 / (Math.sqrt(bw) - 1 / Math.sqrt(bw))
    }
  }

  /** The colour filter. x in [-1, 1]: negative sweeps a high-pass up
   *  (track thins to air), positive rolls a low-pass down (dissolves to
   *  murk), centre is transparent. */
  sweep(x: number) {
    const t = this.ctx.currentTime
    const ax = Math.abs(x)
    if (ax < 0.04) {
      this.sweepF.type = 'allpass'
      this.sweepF.Q.setTargetAtTime(0.0001, t, 0.05)
      return
    }
    this.sweepF.Q.setTargetAtTime(0.9, t, 0.05)
    if (x < 0) {
      this.sweepF.type = 'highpass'
      // 30Hz .. 3kHz, exponential feel
      this.sweepF.frequency.setTargetAtTime(30 * Math.pow(100, ax), t, 0.05)
    } else {
      this.sweepF.type = 'lowpass'
      // 18kHz .. 180Hz
      this.sweepF.frequency.setTargetAtTime(18000 * Math.pow(0.01, ax), t, 0.05)
    }
  }

  /** Echo build, 0..1: send + feedback rise together; the tail keeps
   *  ringing after amount returns to 0 because the loop drains naturally. */
  echo(amount: number) {
    const t = this.ctx.currentTime
    const a = Math.max(0, Math.min(1, amount))
    this.echoSend.gain.setTargetAtTime(a * 0.9, t, 0.06)
    this.echoFb.gain.setTargetAtTime(a * 0.72, t, 0.06)
  }

  /** Lock the echo to the music when the beat clock knows the tempo. */
  setEchoTime(sec: number) {
    this.echoDelay.delayTime.setTargetAtTime(Math.max(0.05, Math.min(1.8, sec)), this.ctx.currentTime, 0.1)
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
