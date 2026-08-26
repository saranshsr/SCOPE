/**
 * The stem deck — multitrack playback for separated stems.
 *
 * Drop the output of any splitter (StemDeck exports vocals/drums/bass/
 * guitar/piano/other) and each file decodes into an AudioBuffer, playing
 * SAMPLE-LOCKED from one clock: every source starts at the same context
 * timestamp, so there is no element drift, ever. Per-stem gain taps feed a
 * mix bus that plugs into the head of the performance desk — the whole
 * existing instrument (EQ, sweep, echo, solo, analyser, star) hears the
 * sum, while small per-stem analysers give the visuals each part's pulse.
 */

export type StemRole = 'vocals' | 'drums' | 'bass' | 'other'

export interface StemInfo {
  role: StemRole
  name: string
  level: number // live rms, 0..~1
  gain: number  // user gain, 0..2
  muted: boolean
}

interface StemNode {
  role: StemRole
  name: string
  buffer: AudioBuffer
  gain: GainNode
  tap: AnalyserNode
  source: AudioBufferSourceNode | null
  userGain: number
  muted: boolean
  level: number
  bin: Float32Array
}

const ROLE_PATTERNS: [RegExp, StemRole][] = [
  [/vocal|vox|acapella|voice/i, 'vocals'],
  [/drum|beat|perc/i, 'drums'],
  [/bass|sub|808/i, 'bass'],
]

export function detectRole(filename: string): StemRole {
  for (const [re, role] of ROLE_PATTERNS) if (re.test(filename)) return role
  return 'other' // guitar, piano, melody, inst, unknown
}

/** A multi-file drop counts as a stem set when ≥2 audio files arrive
 *  together and at least one carries a stem-role name. */
export function looksLikeStems(files: File[]): boolean {
  if (files.length < 2 || files.length > 8) return false
  return files.some((f) => ROLE_PATTERNS.some(([re]) => re.test(f.name)))
}

export class StemDeck {
  private ctx: AudioContext
  private out: GainNode
  private stems: StemNode[] = []
  private startAt = 0   // ctx time the sources started
  private offset = 0    // seconds into the material at start
  private _playing = false
  duration = 0

  constructor(ctx: AudioContext, desk: AudioNode) {
    this.ctx = ctx
    this.out = ctx.createGain()
    this.out.connect(desk)
  }

  /** Load pre-decoded stems (the in-browser splitter's output) — same
   *  node graph as file loads, no re-decode. */
  loadBuffers(stems: { role: StemRole; name: string; buffer: AudioBuffer }[]) {
    this.disposeSources()
    this.stems = []
    this.soloRole = null
    for (const s of stems) {
      const gain = this.ctx.createGain()
      const tap = this.ctx.createAnalyser()
      tap.fftSize = 256
      gain.connect(this.out)
      gain.connect(tap)
      this.stems.push({
        role: s.role,
        name: s.name.slice(0, 22),
        buffer: s.buffer, gain, tap,
        source: null, userGain: 1, muted: false, level: 0,
        bin: new Float32Array(256),
      })
    }
    this.duration = Math.max(...this.stems.map((s) => s.buffer.duration))
  }

  async load(files: File[]) {
    this.disposeSources()
    this.stems = []
    for (const f of files) {
      const buffer = await this.ctx.decodeAudioData(await f.arrayBuffer())
      const gain = this.ctx.createGain()
      const tap = this.ctx.createAnalyser()
      tap.fftSize = 256
      gain.connect(this.out)
      gain.connect(tap)
      this.stems.push({
        role: detectRole(f.name),
        name: f.name.replace(/\.[^.]+$/, '').slice(0, 22),
        buffer, gain, tap,
        source: null, userGain: 1, muted: false, level: 0,
        bin: new Float32Array(256),
      })
    }
    this.duration = Math.max(...this.stems.map((s) => s.buffer.duration))
  }

  /** Sample-locked start: one timestamp for every source. */
  play(offset = this.offset) {
    this.disposeSources()
    const t0 = this.ctx.currentTime + 0.06
    this.offset = Math.max(0, Math.min(this.duration - 0.05, offset))
    let longest: AudioBufferSourceNode | null = null
    let longestDur = -1
    for (const s of this.stems) {
      const src = this.ctx.createBufferSource()
      src.buffer = s.buffer
      src.connect(s.gain)
      src.start(t0, Math.min(this.offset, s.buffer.duration - 0.05))
      s.source = src
      if (s.buffer.duration > longestDur) {
        longestDur = s.buffer.duration
        longest = src
      }
    }
    // The material has an end: when the longest stem finishes, the deck is
    // paused at the tail — not stuck claiming 'playing' forever.
    if (longest) {
      const mySources = this.stems.map((s) => s.source)
      longest.onended = () => {
        if (this._playing && this.stems.some((s) => mySources.includes(s.source))) {
          this.offset = this.duration
          this._playing = false
        }
      }
    }
    this.startAt = t0
    this._playing = true
  }

  pause() {
    this.offset = this.currentTime()
    this.disposeSources()
    this._playing = false
  }

  seek(t: number) {
    const was = this._playing
    this.offset = t
    if (was) this.play(t)
  }

  currentTime() {
    return this._playing ? Math.min(this.duration, this.offset + (this.ctx.currentTime - this.startAt)) : this.offset
  }

  get playing() {
    return this._playing
  }

  /** True stem control: gain 0 is a REAL mute, not a filter guess. */
  setStemGain(role: StemRole, g: number) {
    for (const s of this.stems) {
      if (s.role !== role) continue
      s.userGain = Math.max(0, Math.min(2, g))
      this.apply(s)
    }
  }

  toggleMute(idx: number) {
    const s = this.stems[idx]
    if (!s) return
    s.muted = !s.muted
    this.apply(s)
  }

  toggleMuteRole(role: StemRole) {
    let muted = false
    for (const s of this.stems) if (s.role === role) muted = muted || !s.muted
    for (const s of this.stems) {
      if (s.role !== role) continue
      s.muted = muted
      this.apply(s)
    }
  }

  /** Solo one stem — everything else drops out until released. */
  solo(role: StemRole | null) {
    this.soloRole = role
    for (const s of this.stems) this.apply(s)
  }

  soloRole: StemRole | null = null

  /** One resolver for the three mute-ish states, so they can't fight. */
  private apply(s: StemNode) {
    const g = s.muted || (this.soloRole && s.role !== this.soloRole) ? 0 : s.userGain
    s.gain.gain.setTargetAtTime(g, this.ctx.currentTime, 0.03)
  }

  /** Live per-stem levels for the visuals' voices. */
  info(): StemInfo[] {
    return this.stems.map((s) => {
      s.tap.getFloatTimeDomainData(s.bin as Float32Array<ArrayBuffer>)
      let sum = 0
      for (let i = 0; i < s.bin.length; i++) sum += s.bin[i] * s.bin[i]
      s.level = Math.sqrt(sum / s.bin.length) * (s.muted ? 0 : 1)
      return { role: s.role, name: s.name, level: s.level, gain: s.userGain, muted: s.muted }
    })
  }

  /** Combined per-pixel peaks from the decoded buffers — the full-track
   *  strip works instantly, no fetch, no ffmpeg. */
  peaks(px = 20): { amp: Float32Array; secondsPerPixel: number } {
    const rate = this.stems[0]?.buffer.sampleRate ?? 44100
    const spp = Math.round(rate / px)
    const n = Math.floor((this.duration * rate) / spp)
    const amp = new Float32Array(n)
    for (const s of this.stems) {
      const ch = s.buffer.getChannelData(0)
      for (let i = 0; i < n; i++) {
        let m = 0
        const end = Math.min(ch.length, (i + 1) * spp)
        for (let k = i * spp; k < end; k += 4) {
          const v = Math.abs(ch[k])
          if (v > m) m = v
        }
        amp[i] = Math.min(1, amp[i] + m * 0.5)
      }
    }
    return { amp, secondsPerPixel: spp / rate }
  }

  private disposeSources() {
    for (const s of this.stems) {
      try { s.source?.stop() } catch { /* already stopped */ }
      s.source = null
    }
  }

  dispose() {
    this.disposeSources()
    this.out.disconnect()
    this.stems = []
    this._playing = false
  }
}
