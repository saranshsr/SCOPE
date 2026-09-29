/**
 * AJ mode — lo-fi on the frequencies, generated live.
 *
 * For Anmol, who asked for "frequency only music, tunes", and then for
 * "actual low fidelity frequency music": a lo-fi hip-hop band whose key
 * centre is a solfeggio root (432, 528, 396, 639 ...). Nothing is sampled
 * and nothing is fetched: every drum, key and crackle is an oscillator or a
 * noise buffer built here, and a seeded PRNG writes the score as it plays.
 *
 * HARMONY
 *   Each MOVEMENT (~65-96 s) sits on one root in one mode (the root picks
 *   it: 528 is major, 396 minor, 639 dorian ...) and loops a 4- or 8-chord
 *   progression of jazzy voicings (maj9, m9, m11, 6/9, 9sus ...). All of it
 *   is JUST INTONATION: chord roots are small ratios of the movement root
 *   (IV = 4/3, bVI = 8/5, ii = 10/9 ...) and chord tones small ratios of the
 *   chord root, chosen so that nearly every tone is also pure against the
 *   root itself. The root is literally the tonal centre, and a soft sine AT
 *   the root (plus a quiet binaural pair an octave down) sits under the mix
 *   so the frequency is felt, louder when the drums drop out.
 *
 * THE BAND (per movement, 72-86 bpm, 16ths swung 57-62 %)
 *   drums   dusty tuned kick (sine, pitch drop, click), band-passed noise
 *           snare with a body tone and a short room, or a rimshot; closed
 *           hats with velocity/timing humanisation, open hats, ghost notes,
 *           fills at phrase ends, a lazy snare behind the beat
 *   bass    round sine+filtered-triangle "upright", on the kick onsets,
 *           following chord roots with approach notes; sidechain-ducked
 *   keys    FM electric piano (1:1 bark + tine), strummed close voicings
 *           around a fixed centre, comping patterns with anticipations,
 *           bpm-synced tremolo + autopan
 *   pad     detuned saws through a low-pass, swelling in intro and break
 *   lead    a generated pentatonic motif (call, answer, resolve to root)
 *           on an EP, a mellow FM bell or a breathy flute, snapped to the
 *           chord's just tones where a scale note would rub
 *
 * ARRANGEMENT   intro (filter opening) · groove 8 · break 4 (drums out,
 *   drone and lead up, filter dips, a snare roll back in) · drop 8 · outro
 *   (filter closing, drums thin, the last bar resolves to the tonic). The
 *   next movement starts on the old one's final bar line while its tonic
 *   chord rings out: a radio segue, not a crossfade of two grooves.
 *
 * LO-FI CHAIN   tonal voices pass a modulated delay (tape wow + flutter,
 *   about +-8 cents); everything meets a tanh saturator with a quiet
 *   bit-crushed parallel path, then vinyl crackle and a hiss bed join, a
 *   high-pass at 28 Hz, a 6.6 kHz low-pass, a small high-shelf cut, and
 *   a safety compressor. Reverbs are generated impulses: a plate for the
 *   keys, a short room for the snare.
 *
 * TIMING   a setTimeout loop wakes every 100 ms and schedules whole bars
 *   whose downbeat falls within the next 3 s. next() cuts on the next bar
 *   line: anything scheduled past it is stopped before it sounds, and what
 *   is ringing fades through per-movement "kill" gains that carry no other
 *   automation. With an OfflineAudioContext the whole render is scheduled
 *   up front (used for verification). stop() fades out and frees every
 *   node it made.
 */

export interface AJState {
  /** The current chord's root folded into the movement root's octave: in a
   *  528 movement i9 reads 528, iv9 704, bVImaj7 844.8. */
  freq: number
  label: string
  /** 'intro' | 'groove' | 'break' | 'drop' | 'outro' */
  section: string
  bpm: number
  /** roman numeral + quality, e.g. 'i9', 'IVmaj9', 'bVImaj7', 'V9sus' */
  chord: string
  /** the binaural beat of the drone bed, Hz */
  beat?: number
}

// ---------------------------------------------------------------- tuning

/** The cycle of roots. Neighbours are near-consonant: 528→396 is a fourth
 *  down, 639→852 a fourth up, 963→432 a ninth down, home. */
const ROOTS = [432, 528, 396, 639, 852, 417, 741, 963]

type Mode = 'major' | 'minor' | 'dorian'
/** Each root keeps one colour, so a frequency always sounds like itself. */
const MODE: Record<number, Mode> = {
  432: 'major', 528: 'major', 396: 'minor', 639: 'dorian',
  852: 'minor', 417: 'dorian', 741: 'minor', 963: 'major',
}

type Quality = 'maj7' | 'maj9' | 'm7' | 'm9' | 'm11' | 'dom9' | 'sus9' | 'add9' | '69'
/** Upper structure over the chord root (the bass has the root), just. */
const TONES: Record<Quality, number[]> = {
  maj7: [5 / 4, 3 / 2, 15 / 8],
  maj9: [5 / 4, 15 / 8, 9 / 4, 3 / 2],
  m7: [6 / 5, 9 / 5, 3 / 2],
  m9: [6 / 5, 9 / 5, 9 / 4, 3 / 2],
  m11: [6 / 5, 9 / 5, 9 / 4, 8 / 3],
  dom9: [5 / 4, 9 / 5, 9 / 4, 3 / 2],
  sus9: [4 / 3, 16 / 9, 9 / 4, 3 / 2],
  add9: [5 / 4, 3 / 2, 9 / 4],
  '69': [5 / 4, 5 / 3, 9 / 4, 3 / 2],
}

interface Chord { r: number; q: Quality; n: string }
const C = (r: number, q: Quality, n: string): Chord => ({ r, q, n })

// Chord roots are chosen so the chord's tones land on the root's own just
// scale: ii is 10/9 (not 9/8) so its third and fifth are 4/3 and 5/3; bVII
// is 16/9 so its fifth is 4/3 and its ninth the root itself.
const I9 = C(1, 'maj9', 'Imaj9'), I7 = C(1, 'maj7', 'Imaj7'), I69 = C(1, '69', 'I6/9'), Iadd9 = C(1, 'add9', 'Iadd9')
const ii9 = C(10 / 9, 'm9', 'ii9'), iii7 = C(5 / 4, 'm7', 'iii7'), IV9 = C(4 / 3, 'maj9', 'IVmaj9'), IV7 = C(4 / 3, 'maj7', 'IVmaj7')
const ivm9 = C(4 / 3, 'm9', 'iv9'), V9s = C(3 / 2, 'sus9', 'V9sus'), vi9 = C(5 / 3, 'm9', 'vi9')
const i9 = C(1, 'm9', 'i9'), i11 = C(1, 'm11', 'i11'), bIII = C(6 / 5, 'maj7', 'bIIImaj7'), bVI = C(8 / 5, 'maj7', 'bVImaj7')
const bVI9 = C(8 / 5, 'maj9', 'bVImaj9'), bVIIa = C(16 / 9, 'add9', 'bVIIadd9'), bVII7 = C(16 / 9, 'maj7', 'bVIImaj7')
const v7 = C(3 / 2, 'm7', 'v7'), IVdom = C(4 / 3, 'dom9', 'IV9')

const PROGS: Record<Mode, Chord[][]> = {
  major: [
    [I9, vi9, ii9, V9s],
    [I7, IV9, iii7, vi9],
    [I69, iii7, IV9, ivm9],
    [I9, IV7, Iadd9, IV7, vi9, ii9, IV9, V9s],
  ],
  minor: [
    [i9, bVI, ivm9, v7],
    [i9, ivm9, bVIIa, bIII],
    [i11, bVIIa, bVI, v7],
    [i9, bVI, bIII, bVIIa, ivm9, i11, bVI9, v7],
  ],
  dorian: [
    [i9, IVdom, i11, IVdom],
    [i9, IVdom, bVII7, bIII],
    [i9, bIII, IVdom, v7],
    [i9, IVdom, i9, IVdom, bIII, IVdom, bVII7, v7],
  ],
}
const TONIC: Record<Mode, Chord> = { major: I9, minor: i9, dorian: i9 }

/** Pentatonics for the lead, just. Dorian borrows the minor one. */
const PENT: Record<Mode, number[]> = {
  major: [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3],
  minor: [1, 6 / 5, 4 / 3, 3 / 2, 9 / 5],
  dorian: [1, 6 / 5, 4 / 3, 3 / 2, 9 / 5],
}

const LOOKAHEAD = 3 // s: bars whose downbeat is this close get scheduled
const TICK = 100 // ms, scheduler wake-up
const WOW = 0.012 // s, tape delay the tonal voices ride (drums/bass match it)
const OUT = 0.52 // master trim: peaks land near -6 dBFS

// Voice levels (pre-master, linear).
const KICK = 0.95
const SNARE = 0.5
const HAT = 0.1
const BASS = 0.115
const KEYS = 0.22
const PAD = 0.009
const LEAD = 0.12
const DRONE = 0.03

// ----------------------------------------------------------------- utils

/** mulberry32: tiny, fast, good enough for music. */
function prng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Rand = () => number
const range = (r: Rand, a: number, b: number) => a + (b - a) * r()
const pick = <T,>(r: Rand, xs: readonly T[]) => xs[Math.floor(r() * xs.length)]
const fold = (x: number, lo: number) => {
  while (x >= lo * 2) x /= 2
  while (x < lo) x *= 2
  return x
}
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x))

type SectionName = 'intro' | 'groove' | 'break' | 'drop' | 'outro'
interface Section { name: SectionName; from: number; bars: number }
type Lead = 'ep' | 'bell' | 'flute'
interface Note { s: number; d: number; len: number }
interface Hit { s: number; v: number }

// --------------------------------------------------------------- session

interface Movement {
  index: number
  root: number
  mode: Mode
  r: Rand
  bpm: number
  start: number
  barDur: number
  step: number
  swingOff: number
  plan: Section[]
  bars: number // bars that will be scheduled (shrinks on a cut)
  naturalBars: number
  nextBar: number
  end: number // ctx time of the final bar line
  freeAt: number
  prog: Chord[]
  tonic: Chord
  // registers
  bassBase: number
  keysBase: number
  keysCentre: number
  melBase: number
  kickF: number
  // style
  kickA: number[]
  kickB: number[]
  hat16: boolean
  comp: 'hold' | 'two' | 'dilla'
  pushProb: number
  ghostProb: number
  rimGroove: boolean
  snareLag: number
  lead: Lead
  breakLead: Lead
  motif: Note[]
  motifB: Note[]
  pushed: Set<number>
  beat0: number
  beat1: number
  // graph
  drumsIn: GainNode
  drumKill: GainNode
  roomSend: GainNode
  bassIn: GainNode
  bassDuck: GainNode
  bassKill: GainNode
  keysIn: GainNode
  padIn: GainNode
  leadIn: GainNode
  leadKill: GainNode
  leadSend: GainNode
  musicDuck: GainNode
  musicKill: GainNode
  droneKill: GainNode
  lfos: AudioScheduledSourceNode[]
  nodes: Set<AudioNode>
  srcs: Map<AudioScheduledSourceNode, number>
  successorMade: boolean
  fromSkip: boolean
  cut: boolean
  freed: boolean
}

class Session {
  readonly ctx: BaseAudioContext
  readonly r: Rand
  private out: GainNode
  private master: GainNode
  private drumBus: GainNode
  private bassBus: GainNode
  private tonalBus: GainNode
  private droneBus: GainNode
  private post: GainNode
  private plateIn: GainNode
  private roomIn: GainNode
  private noise: AudioBuffer
  private globals = new Set<AudioNode>()
  private globalSrc: AudioScheduledSourceNode[] = []
  private offs = new WeakMap<AudioScheduledSourceNode, number>()
  movements: Movement[] = []
  private cursor = 0
  private timer: ReturnType<typeof setTimeout> | null = null
  private offlineEnd = 0
  stopped = false
  /** Live node count, for leak checks. */
  static live = 0

  constructor(ctx: BaseAudioContext, seed: number, dest: AudioNode) {
    this.ctx = ctx
    this.r = prng(seed)
    const now = ctx.currentTime
    const G = this.globals

    // ---- master chain: pre → saturate (+ crushed parallel) → post →
    //      hp → lp → shelf → comp → master → out → dest
    const pre = this.gain(1, G)
    // The shaper sees half the signal, so its [-1, 1] domain covers +-2.
    const drive = this.gain(0.5, G)
    const sat = this.node(ctx.createWaveShaper(), G)
    sat.curve = this.tanhCurve(0.8)
    sat.oversample = '2x'
    const crush = this.node(ctx.createWaveShaper(), G)
    crush.curve = this.crushCurve(24)
    const crushBp = this.filt('bandpass', 1400, 0.45, G)
    const crushG = this.gain(0.05, G)
    this.post = this.gain(1, G)
    const hp = this.filt('highpass', 28, 0.7, G)
    const lp = this.filt('lowpass', 6600, 0.6, G)
    const shelf = this.filt('highshelf', 3600, 0.7, G)
    shelf.gain.value = -2.5
    const comp = this.node(ctx.createDynamicsCompressor(), G)
    comp.threshold.value = -2
    comp.knee.value = 1
    comp.ratio.value = 20
    comp.attack.value = 0.003
    comp.release.value = 0.25
    this.master = this.gain(0, G)
    this.out = this.gain(1, G)
    pre.connect(drive)
    drive.connect(sat)
    sat.connect(this.post)
    pre.connect(crush)
    crush.connect(crushBp)
    crushBp.connect(crushG)
    crushG.connect(this.post)
    this.post.connect(hp)
    hp.connect(lp)
    lp.connect(shelf)
    shelf.connect(comp)
    comp.connect(this.master)
    this.master.connect(this.out)
    this.out.connect(dest)
    this.master.gain.setValueAtTime(0, now)
    this.master.gain.linearRampToValueAtTime(OUT, now + 1.2)

    // ---- buses. Tonal voices ride the tape delay; drums and bass get the
    //      same fixed delay so the band stays tight.
    this.tonalBus = this.gain(1, G)
    const wow = this.node(ctx.createDelay(0.05), G)
    wow.delayTime.value = WOW
    for (const [f, amt] of [[0.55, 0.0011], [0.13, 0.002], [6.3, 0.00004]] as const) {
      const o = this.osc('sine', f * range(this.r, 0.93, 1.07), null)
      const a = this.gain(amt, G)
      o.connect(a)
      a.connect(wow.delayTime)
    }
    this.tonalBus.connect(wow)
    wow.connect(pre)

    this.drumBus = this.gain(1, G)
    const glue = this.node(ctx.createDynamicsCompressor(), G)
    glue.threshold.value = -14
    glue.knee.value = 6
    glue.ratio.value = 3
    glue.attack.value = 0.008
    glue.release.value = 0.14
    const dDelay = this.node(ctx.createDelay(0.05), G)
    dDelay.delayTime.value = WOW - 0.0058 // the glue compressor's own look-ahead
    this.drumBus.connect(glue)
    glue.connect(dDelay)
    dDelay.connect(pre)

    this.bassBus = this.gain(1, G)
    const bDelay = this.node(ctx.createDelay(0.05), G)
    bDelay.delayTime.value = WOW
    this.bassBus.connect(bDelay)
    bDelay.connect(pre)

    // The drone skips the saturator and the tape: it is the honest part.
    this.droneBus = this.gain(1, G)
    this.droneBus.connect(this.post)

    // ---- reverbs
    this.plateIn = this.gain(1, G)
    const plate = this.node(ctx.createConvolver(), G)
    plate.buffer = this.impulse(2.6, 4200, 0.022)
    const plateRet = this.gain(0.55, G)
    this.plateIn.connect(plate)
    plate.connect(plateRet)
    plateRet.connect(this.post)
    const plateSend = this.gain(0.2, G)
    wow.connect(plateSend)
    plateSend.connect(this.plateIn)

    this.roomIn = this.gain(1, G)
    const room = this.node(ctx.createConvolver(), G)
    room.buffer = this.impulse(0.55, 6500, 0.006)
    const roomRet = this.gain(0.5, G)
    this.roomIn.connect(room)
    room.connect(roomRet)
    roomRet.connect(this.post)

    // ---- the record: crackle and hiss, fading in with the master
    this.noise = this.whiteBuffer(2)
    const vinyl = this.gain(0, G)
    vinyl.gain.setValueAtTime(0, now)
    vinyl.gain.linearRampToValueAtTime(1, now + 2.5)
    vinyl.connect(this.post)
    const crackle = this.node(ctx.createBufferSource(), G)
    crackle.buffer = this.crackleBuffer(9.7)
    crackle.loop = true
    const crackleG = this.gain(0.06, G)
    crackle.connect(crackleG)
    crackleG.connect(vinyl)
    const hiss = this.node(ctx.createBufferSource(), G)
    hiss.buffer = this.hissBuffer(6.3)
    hiss.loop = true
    const hissG = this.gain(0.007, G)
    hiss.connect(hissG)
    hissG.connect(vinyl)
    this.globalSrc.push(crackle, hiss)
    for (const s of this.globalSrc) s.start(now)

    this.offlineEnd =
      typeof OfflineAudioContext !== 'undefined' && ctx instanceof OfflineAudioContext
        ? ctx.length / ctx.sampleRate
        : 0

    this.makeMovement(now + 0.1, 2)
    this.pump()
  }

  // ------------------------------------------------------------ helpers

  private node<T extends AudioNode>(n: T, bag: Set<AudioNode> | null): T {
    ;(bag ?? this.globals).add(n)
    Session.live++
    return n
  }

  private gain(v: number, bag: Set<AudioNode> | null) {
    const n = this.node(this.ctx.createGain(), bag)
    n.gain.value = v
    return n
  }

  private filt(type: BiquadFilterType, f: number, q: number, bag: Set<AudioNode> | null) {
    const n = this.node(this.ctx.createBiquadFilter(), bag)
    n.type = type
    n.frequency.value = f
    n.Q.value = q
    return n
  }

  /** bag null = session-global, started with the session. */
  private osc(type: OscillatorType, f: number, bag: Set<AudioNode> | null) {
    const o = this.node(this.ctx.createOscillator(), bag)
    o.type = type
    o.frequency.value = f
    if (!bag) this.globalSrc.push(o)
    return o
  }

  /** A noise source reading from a random point of the shared buffer. */
  private noiseSrc(m: Movement, loop = false) {
    const s = this.node(this.ctx.createBufferSource(), m.nodes)
    s.buffer = this.noise
    s.loop = loop
    this.offs.set(s, range(m.r, 0, 1.1))
    return s
  }

  /** Start/stop a one-shot voice and free its nodes when it ends. */
  private play(m: Movement, parts: AudioNode[], srcs: AudioScheduledSourceNode[], t0: number, t1: number) {
    for (const s of srcs) {
      const o = this.offs.get(s)
      if (o !== undefined) (s as AudioBufferSourceNode).start(t0, o)
      else s.start(t0)
      s.stop(t1)
      m.srcs.set(s, t0)
    }
    let done = false
    srcs[0].onended = () => {
      if (done) return
      done = true
      for (const n of parts) {
        n.disconnect()
        if (m.nodes.delete(n)) Session.live--
      }
      for (const s of srcs) m.srcs.delete(s)
    }
  }

  /** Unity gain for small signals, soft above: y = tanh(k·u)/k for the
   *  undivided input u = 2x (-0.4 dB at u = 0.5, -1.6 dB at u = 1). */
  private tanhCurve(k: number) {
    const n = 4097
    const c = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const u = ((i / (n - 1)) * 2 - 1) * 2
      c[i] = Math.tanh(k * u) / k
    }
    return c
  }

  /** Staircase transfer: a coarse quantiser, used quietly in parallel. */
  private crushCurve(levels: number) {
    const n = 8192
    const c = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1
      c[i] = Math.round(x * levels) / levels
    }
    return c
  }

  private whiteBuffer(sec: number) {
    const sr = this.ctx.sampleRate
    const len = Math.floor(sec * sr)
    const b = this.ctx.createBuffer(1, len, sr)
    const d = b.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = this.r() * 2 - 1
    return b
  }

  /** Vinyl: sparse ticks and the odd pop, band-limited, mostly mono. */
  private crackleBuffer(sec: number) {
    const sr = this.ctx.sampleRate
    const len = Math.floor(sec * sr)
    const b = this.ctx.createBuffer(2, len, sr)
    const L = b.getChannelData(0)
    const R = b.getChannelData(1)
    const r = this.r
    const events = Math.floor(sec * 14)
    for (let e = 0; e < events; e++) {
      const at = Math.floor(r() * (len - 64))
      const big = r() < 0.05
      const a = big ? range(r, 0.5, 1) : 0.04 + 0.4 * Math.pow(r(), 3)
      const n = big ? 10 + Math.floor(r() * 18) : 2 + Math.floor(r() * 6)
      const bal = range(r, 0.7, 1)
      const side = r() < 0.5
      for (let j = 0; j < n; j++) {
        const x = a * (r() * 2 - 1) * Math.exp(-j / (n * 0.35))
        L[at + j] += side ? x : x * bal
        R[at + j] += side ? x * bal : x
      }
    }
    // One-pole band-limit: roll off below ~500 Hz and above ~5 kHz.
    for (const d of [L, R]) {
      let lo = 0
      let hi = 0
      const aL = 1 - Math.exp((-2 * Math.PI * 5000) / sr)
      const aH = 1 - Math.exp((-2 * Math.PI * 500) / sr)
      for (let i = 0; i < len; i++) {
        lo += aL * (d[i] - lo)
        hi += aH * (lo - hi)
        d[i] = lo - hi
      }
      const x = Math.floor(0.02 * sr)
      for (let i = 0; i < x; i++) {
        d[i] *= i / x
        d[len - 1 - i] *= i / x
      }
    }
    return b
  }

  /** Pink-ish tape hiss, unit RMS, seamless loop. */
  private hissBuffer(sec: number) {
    const sr = this.ctx.sampleRate
    const len = Math.floor(sec * sr)
    const b = this.ctx.createBuffer(2, len, sr)
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c)
      let b0 = 0, b1 = 0, b2 = 0, hp = 0
      const aH = 1 - Math.exp((-2 * Math.PI * 300) / sr)
      let e = 0
      for (let i = 0; i < len; i++) {
        const w = this.r() * 2 - 1
        b0 = 0.99765 * b0 + w * 0.099046
        b1 = 0.963 * b1 + w * 0.2965164
        b2 = 0.57 * b2 + w * 1.0526913
        const p = b0 + b1 + b2 + w * 0.1848
        hp += aH * (p - hp)
        d[i] = p - hp
        e += d[i] * d[i]
      }
      const g = 1 / Math.sqrt(e / len)
      for (let i = 0; i < len; i++) d[i] *= g
      const x = Math.floor(0.25 * sr)
      for (let i = 0; i < x; i++) {
        const w = i / x
        d[len - x + i] = d[len - x + i] * (1 - w) + d[i] * w
      }
    }
    return b
  }

  /** Stereo impulse: decaying noise that darkens as it decays. */
  private impulse(sec: number, bright: number, preDelay: number) {
    const sr = this.ctx.sampleRate
    const len = Math.floor(sec * sr)
    const b = this.ctx.createBuffer(2, len, sr)
    const pre = Math.floor(preDelay * sr)
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c)
      let y = 0
      for (let i = pre; i < len; i++) {
        const t = (i - pre) / sr
        const env = Math.exp((-6.9 * t) / (sec * 0.85))
        const fc = bright * Math.exp(-t / (sec * 0.5)) + 300
        const a = 1 - Math.exp((-2 * Math.PI * fc) / sr)
        y += a * ((this.r() * 2 - 1) - y)
        d[i] = y * env * Math.min(1, t / 0.01)
      }
    }
    return b
  }

  /** Automation from a list of points; 'e' = exponential, 'l' = linear. */
  private curve(p: AudioParam, pts: [number, number, 's' | 'e' | 'l'][]) {
    for (const [t, v, k] of pts) {
      if (k === 's') p.setValueAtTime(v, t)
      else if (k === 'e') p.exponentialRampToValueAtTime(v, t)
      else p.linearRampToValueAtTime(v, t)
    }
  }

  // ---------------------------------------------------------- movements

  private makeMovement(start: number, introBars?: number) {
    const r = prng(Math.floor(this.r() * 4294967296))
    const index = this.cursor++
    const root = ROOTS[index % ROOTS.length]
    const mode = MODE[root]
    const bpm = Math.round(range(r, 72, 86))
    const barDur = 240 / bpm
    const step = barDur / 16
    const swing = range(r, 0.57, 0.62)
    const intro = introBars ?? pick(r, [2, 4, 4])
    const outro = pick(r, [2, 4])
    const plan: Section[] = []
    let from = 0
    for (const [name, bars] of [['intro', intro], ['groove', 8], ['break', 4], ['drop', 8], ['outro', outro]] as const) {
      plan.push({ name, from, bars })
      from += bars
    }
    const total = from
    const bassBase = fold(root, 41) // 41-82 Hz
    const keysBase = fold(root, 164)
    const kickA = pick(r, [[0, 10], [0, 7, 10], [0, 3, 10], [0, 6, 10], [0, 10, 11]])
    const extra = pick(r, [15, 13, 7, 14].filter((s) => !kickA.includes(s)))
    const nodes = new Set<AudioNode>()
    const g = (v: number) => this.gain(v, nodes)

    const m: Movement = {
      index, root, mode, r, bpm, start, barDur, step,
      swingOff: (swing - 0.5) * 2 * step,
      plan, bars: total, naturalBars: total, nextBar: 0,
      end: start + total * barDur,
      freeAt: Infinity,
      prog: pick(r, PROGS[mode]),
      tonic: TONIC[mode],
      bassBase,
      keysBase,
      keysCentre: keysBase * 1.45,
      melBase: fold(root, 352),
      kickF: bassBase <= 66 ? bassBase : bassBase * (2 / 3),
      kickA,
      kickB: [...kickA, extra].sort((a, b) => a - b),
      hat16: r() < 0.4,
      comp: pick(r, ['hold', 'two', 'two', 'dilla'] as const),
      pushProb: range(r, 0.2, 0.5),
      ghostProb: range(r, 0.2, 0.45),
      rimGroove: r() < 0.3,
      snareLag: range(r, 0.008, 0.02),
      lead: pick(r, ['ep', 'bell', 'flute'] as const),
      breakLead: 'bell',
      motif: [],
      motifB: [],
      pushed: new Set(),
      beat0: range(r, 4.5, 9.5),
      beat1: range(r, 4, 10),
      drumsIn: g(1), drumKill: g(1), roomSend: g(0.22),
      bassIn: g(1), bassDuck: g(1), bassKill: g(1),
      keysIn: g(1), padIn: g(1), leadIn: g(1), leadKill: g(1), leadSend: g(0.3),
      musicDuck: g(1), musicKill: g(1), droneKill: g(1),
      lfos: [],
      nodes,
      srcs: new Map(),
      successorMade: false,
      fromSkip: false,
      cut: false,
      freed: false,
    }
    m.breakLead = m.lead === 'flute' ? pick(r, ['bell', 'ep'] as const) : 'flute'
    m.motif = this.newMotif(r)
    m.motifB = this.newMotif(r)
    this.movements.push(m)

    const sec = (n: SectionName) => m.plan.find((s) => s.name === n)!
    const at = (bar: number) => start + bar * barDur
    const brk = sec('break')
    const outroS = sec('outro')

    // drums: → tone LP → kill → bus
    const drumTone = this.filt('lowpass', 12000, 0.6, nodes)
    m.drumsIn.connect(drumTone)
    drumTone.connect(m.drumKill)
    m.drumKill.connect(this.drumBus)
    m.roomSend.connect(this.roomIn)
    this.curve(drumTone.frequency, [
      [start, 12000, 's'],
      [at(brk.from + brk.bars - 1), 1200, 's'],
      [at(brk.from + brk.bars), 12000, 'e'],
      [at(outroS.from), 12000, 's'],
      [m.end, 2400, 'e'],
    ])

    // bass: → duck → kill → bus
    m.bassIn.connect(m.bassDuck)
    m.bassDuck.connect(m.bassKill)
    m.bassKill.connect(this.bassBus)

    // keys: tremolo + autopan at 8th-note rate
    const trem = g(0.86)
    const pan = this.node(this.ctx.createStereoPanner(), nodes)
    const rate = (bpm / 60) * 2
    const tLfo = this.osc('sine', rate, nodes)
    const tAmt = g(0.14)
    tLfo.connect(tAmt)
    tAmt.connect(trem.gain)
    const pLfo = this.osc('sine', rate / 2, nodes)
    const pAmt = g(0.35)
    pLfo.connect(pAmt)
    pAmt.connect(pan.pan)
    m.keysIn.connect(trem)
    trem.connect(pan)
    pan.connect(m.musicDuck)
    m.padIn.connect(m.musicDuck)

    // music: duck → kill → tone LP (the intro/break/outro filter moves)
    const musicTone = this.filt('lowpass', 800, 0.5, nodes)
    m.musicDuck.connect(m.musicKill)
    m.musicKill.connect(musicTone)
    musicTone.connect(this.tonalBus)
    const introEnd = at(m.plan[0].bars)
    this.curve(musicTone.frequency, [
      [start, 1200, 's'],
      [introEnd, 9000, 'e'],
      [at(brk.from), 9000, 's'],
      [at(brk.from) + barDur, 2400, 'e'],
      [at(brk.from + brk.bars) - barDur, 2400, 's'],
      [at(brk.from + brk.bars), 9000, 'e'],
      [at(outroS.from), 9000, 's'],
      [m.end + 0.5, 900, 'e'],
    ])

    // lead: its own kill, bypasses the tone filter, extra plate send
    m.leadIn.connect(m.leadKill)
    m.leadKill.connect(this.tonalBus)
    m.leadIn.connect(m.leadSend)
    m.leadSend.connect(this.plateIn)

    // drone: the root itself, a quiet binaural pair an octave down,
    // breathing slowly; up when the drums drop out.
    const amp = DRONE * Math.pow(432 / root, 0.3)
    const env = g(0)
    const breath = g(0.85)
    const bl = this.osc('sine', range(r, 0.05, 0.09), nodes)
    const bla = g(0.15)
    bl.connect(bla)
    bla.connect(breath.gain)
    const o = this.osc('sine', root, nodes)
    o.connect(breath)
    const len = m.end - start
    for (const side of [-1, 1] as const) {
      const b = this.osc('sine', root / 2 + (side * m.beat0) / 2, nodes)
      b.frequency.setValueAtTime(root / 2 + (side * m.beat0) / 2, start)
      b.frequency.linearRampToValueAtTime(root / 2 + (side * m.beat1) / 2, start + len)
      const bg = g(0.5)
      const bp = this.node(this.ctx.createStereoPanner(), nodes)
      bp.pan.value = side
      b.connect(bg)
      bg.connect(bp)
      bp.connect(breath)
      m.lfos.push(b)
    }
    breath.connect(env)
    env.connect(m.droneKill)
    m.droneKill.connect(this.droneBus)
    const bS = at(brk.from)
    const bE = at(brk.from + brk.bars)
    this.curve(env.gain, [
      [start, 0, 's'],
      [start + 4, amp, 'l'],
      [bS, amp, 'l'],
      [bS + barDur, amp * 1.8, 'l'],
      [bE - barDur * 0.5, amp * 1.8, 'l'],
      [bE, amp, 'l'],
      [m.end - barDur, amp, 'l'],
      [m.end + 2, 0, 'l'],
    ])
    m.lfos.push(tLfo, pLfo, bl, o)
    for (const s of m.lfos) {
      s.start(start)
      s.stop(m.end + 4)
      m.srcs.set(s, start)
    }
    return m
  }

  private sectionAt(m: Movement, bar: number): Section {
    for (const s of m.plan) if (bar < s.from + s.bars) return s
    return m.plan[m.plan.length - 1]
  }

  private chordAt(m: Movement, bar: number): Chord {
    if (bar >= m.naturalBars - 1) return m.tonic
    const L = m.prog.length
    const k = bar - m.plan[0].bars
    return m.prog[((k % L) + L) % L]
  }

  private stepT(m: Movement, bar: number, s: number) {
    const b = bar + Math.floor(s / 16)
    const st = ((s % 16) + 16) % 16
    return m.start + b * m.barDur + st * m.step + (st % 2 === 1 ? m.swingOff : 0)
  }

  /** Close voicing of the chord's upper tones around the keys centre. */
  private voicing(m: Movement, ch: Chord) {
    const base = m.keysBase * ch.r
    return TONES[ch.q]
      .map((t) => {
        const f0 = base * t
        const k = Math.round(Math.log2(m.keysCentre / f0))
        return f0 * Math.pow(2, k)
      })
      .sort((a, b) => a - b)
  }

  // ---------------------------------------------------------- the band

  private scheduleBar(m: Movement, b: number) {
    const sec = this.sectionAt(m, b)
    const idx = b - sec.from
    const ch = this.chordAt(m, b)
    const nch = b + 1 < m.naturalBars ? this.chordAt(m, b + 1) : null
    const next = b + 1 < m.naturalBars ? this.sectionAt(m, b + 1) : null
    const kicks = this.drums(m, b, sec, idx, next)
    this.bass(m, b, sec, idx, ch, nch, kicks, next)
    this.keys(m, b, sec, idx, ch, nch, next)
    this.pad(m, b, sec, ch)
    this.melody(m, b, sec, idx)
  }

  /** One bar of drums. Returns the kick steps (the bass follows them). */
  private drums(m: Movement, b: number, sec: Section, idx: number, next: Section | null): number[] {
    const r = m.r
    const last = idx === sec.bars - 1
    const n = sec.name
    let kicks: Hit[] = []
    let snares: (Hit & { rim?: boolean })[] = []
    let hats: (Hit & { open?: boolean })[] = []
    const full = n === 'groove' || n === 'drop' || (n === 'outro' && idx < sec.bars - 2)
    const eighths = (v: number) => {
      for (let s = 0; s < 16; s += 2) hats.push({ s, v: v * (s % 4 === 0 ? 1 : 0.72) })
    }

    if (n === 'intro') {
      if (sec.bars >= 4 && idx >= sec.bars - 2) eighths(0.45 + 0.15 * (idx - sec.bars + 2))
      if (last) {
        snares.push({ s: 13, v: 0.14 }, { s: 14, v: 0.24 }, { s: 15, v: 0.38 })
        if (sec.bars < 4) hats.push({ s: 8, v: 0.4 }, { s: 12, v: 0.5 })
      }
    } else if (n === 'break') {
      if (last) {
        const roll = [8, 10, 12, 13, 14, 15]
        roll.forEach((s, i) => snares.push({ s, v: 0.14 + (0.62 * i) / (roll.length - 1) }))
        hats.push({ s: 12, v: 0.35 }, { s: 14, v: 0.45 })
      }
    } else if (full) {
      kicks = (b % 2 === 0 ? m.kickA : m.kickB).map((s) => ({ s, v: s === 0 ? 1 : range(r, 0.78, 0.92) }))
      const rim = n === 'groove' && m.rimGroove
      snares.push({ s: 4, v: range(r, 0.86, 0.95), rim }, { s: 12, v: range(r, 0.93, 1), rim })
      for (const s of [2, 7, 9, 15]) {
        if (r() < m.ghostProb * (s === 2 ? 0.4 : 1)) snares.push({ s, v: range(r, 0.07, 0.15) })
      }
      const sixteen = m.hat16 || (n === 'drop' && r() < 0.5)
      for (let s = 0; s < 16; s++) {
        const onBeat = s % 4 === 0
        const eighth = s % 2 === 0
        if (!sixteen && !eighth && r() > 0.16) continue
        const v = onBeat ? 0.8 : eighth ? 0.58 : 0.3
        hats.push({ s, v: v * range(r, 0.85, 1.12) })
      }
      const openAt = r() < (n === 'drop' ? 0.35 : 0.18) ? 14 : r() < 0.1 ? 6 : -1
      if (openAt >= 0) {
        hats = hats.filter((h) => h.s !== openAt && h.s !== openAt + 1)
        hats.push({ s: openAt, v: 0.55, open: true })
      }
      // Phrase-end fills.
      if (last && next?.name === 'break') {
        // Stop-time: the band falls away after beat 3; a snare lands alone.
        kicks = kicks.filter((k) => k.s < 8)
        hats = hats.filter((h) => h.s < 12)
        snares = snares.filter((s) => s.s <= 12)
        snares.forEach((s) => { if (s.s === 12) { s.v = 1; s.rim = false } })
      } else if (last && sec.name !== 'outro') {
        hats = hats.filter((h) => h.s < 12)
        if (r() < 0.5) {
          snares = snares.filter((s) => s.s <= 12)
          snares.push({ s: 13, v: 0.32 }, { s: 14, v: 0.5 }, { s: 15, v: 0.72 })
          kicks.push({ s: 14, v: 0.8 })
          hats.push({ s: 12, v: 0.6 })
        } else {
          kicks = kicks.filter((k) => k.s < 11)
          kicks.push({ s: 11, v: 0.8 }, { s: 14, v: 0.85 })
          hats.push({ s: 12, v: 0.6 }, { s: 14, v: 0.6, open: true })
          snares.push({ s: 15, v: 0.3 })
        }
      } else if (idx % 4 === 3) {
        if (!snares.some((s) => s.s === 15)) snares.push({ s: 15, v: range(r, 0.22, 0.34) })
        if (r() < 0.45 && !kicks.some((k) => k.s >= 13)) kicks.push({ s: pick(r, [13, 15]), v: 0.75 })
      }
    } else if (n === 'outro') {
      if (idx === sec.bars - 2) {
        kicks = m.kickA.map((s) => ({ s, v: s === 0 ? 0.95 : 0.8 }))
        eighths(0.55)
        snares.push({ s: 12, v: 0.4, rim: true })
      } else {
        kicks = [{ s: 0, v: 0.85 }]
        hats.push({ s: 0, v: 0.45, open: true })
      }
    }

    kicks.sort((a, b) => a.s - b.s)
    const hum = (ms: number) => range(r, -ms, ms) / 1000
    for (const k of kicks) {
      const t = this.stepT(m, b, k.s) + hum(3)
      this.kick(m, t, k.v)
      // Sidechain: the bass ducks hard, the keys breathe.
      m.bassDuck.gain.setTargetAtTime(0.15, t, 0.004)
      m.bassDuck.gain.setTargetAtTime(1, t + 0.07, 0.1)
      m.musicDuck.gain.setTargetAtTime(0.78, t, 0.006)
      m.musicDuck.gain.setTargetAtTime(1, t + 0.05, 0.12)
    }
    for (const s of snares) {
      const ghost = s.v < 0.4
      const t = this.stepT(m, b, s.s) + m.snareLag * (ghost ? 0.5 : 1) + hum(4)
      if (s.rim) this.rim(m, t, s.v)
      else this.snare(m, t, s.v)
    }
    hats.sort((a, b) => a.s - b.s)
    hats.forEach((h, i) => {
      const t = this.stepT(m, b, h.s) + hum(6)
      const nxt = hats[i + 1]
      const choke = h.open ? (nxt ? this.stepT(m, b, nxt.s) : this.stepT(m, b, 16)) : 0
      this.hat(m, t, h.v * range(m.r, 0.9, 1.08), h.open ? Math.max(choke, t + 0.12) : 0)
    })
    return kicks.map((k) => k.s)
  }

  private kick(m: Movement, t: number, vel: number) {
    const N = m.nodes
    const o = this.osc('sine', 160, N)
    o.frequency.setValueAtTime(165, t)
    o.frequency.exponentialRampToValueAtTime(m.kickF * 1.03, t + 0.035)
    o.frequency.exponentialRampToValueAtTime(m.kickF, t + 0.3)
    const e = this.gain(0, N)
    e.gain.setValueAtTime(0, t)
    e.gain.linearRampToValueAtTime(vel * KICK, t + 0.0025)
    e.gain.setTargetAtTime(0, t + 0.03, 0.12)
    const c = this.noiseSrc(m)
    const ch = this.filt('highpass', 1800, 0.7, N)
    const ce = this.gain(0, N)
    ce.gain.setValueAtTime(0, t)
    ce.gain.linearRampToValueAtTime(vel * 0.22, t + 0.0006)
    ce.gain.setTargetAtTime(0, t + 0.0008, 0.004)
    o.connect(e)
    e.connect(m.drumsIn)
    c.connect(ch)
    ch.connect(ce)
    ce.connect(m.drumsIn)
    this.play(m, [o, e, c, ch, ce], [o, c], t, t + 1.05)
  }

  private snare(m: Movement, t: number, vel: number) {
    const N = m.nodes
    const ghost = vel < 0.4
    const nz = this.noiseSrc(m)
    const bp = this.filt('bandpass', ghost ? 2600 : 2100, 0.8, N)
    const ne = this.gain(0, N)
    ne.gain.setValueAtTime(0, t)
    ne.gain.linearRampToValueAtTime(vel * SNARE, t + 0.001)
    ne.gain.setTargetAtTime(0, t + 0.004, ghost ? 0.03 : 0.065)
    const body = this.osc('triangle', 215, N)
    body.frequency.setValueAtTime(215, t)
    body.frequency.exponentialRampToValueAtTime(172, t + 0.05)
    const be = this.gain(0, N)
    be.gain.setValueAtTime(0, t)
    be.gain.linearRampToValueAtTime(vel * SNARE * (ghost ? 0.3 : 0.7), t + 0.001)
    be.gain.setTargetAtTime(0, t + 0.004, 0.035)
    nz.connect(bp)
    bp.connect(ne)
    ne.connect(m.drumsIn)
    ne.connect(m.roomSend)
    body.connect(be)
    be.connect(m.drumsIn)
    this.play(m, [nz, bp, ne, body, be], [nz, body], t, t + 0.7)
  }

  private rim(m: Movement, t: number, vel: number) {
    const N = m.nodes
    const o = this.osc('triangle', 1680, N)
    const o2 = this.osc('sine', 820, N)
    const bp = this.filt('bandpass', 1900, 1.4, N)
    const e = this.gain(0, N)
    e.gain.setValueAtTime(0, t)
    e.gain.linearRampToValueAtTime(vel * 0.55, t + 0.0008)
    e.gain.setTargetAtTime(0, t + 0.002, 0.014)
    const nz = this.noiseSrc(m)
    const ne = this.gain(0, N)
    ne.gain.setValueAtTime(0, t)
    ne.gain.linearRampToValueAtTime(vel * 0.3, t + 0.0006)
    ne.gain.setTargetAtTime(0, t + 0.001, 0.006)
    o.connect(bp)
    o2.connect(bp)
    nz.connect(ne)
    ne.connect(bp)
    bp.connect(e)
    e.connect(m.drumsIn)
    e.connect(m.roomSend)
    this.play(m, [o, o2, bp, e, nz, ne], [o, o2, nz], t, t + 0.25)
  }

  private hat(m: Movement, t: number, vel: number, openUntil: number) {
    const N = m.nodes
    const nz = this.noiseSrc(m)
    const hp = this.filt('highpass', 6200, 0.8, N)
    const pk = this.filt('peaking', 8500, 1.2, N)
    pk.gain.value = 4
    const e = this.gain(0, N)
    e.gain.setValueAtTime(0, t)
    e.gain.linearRampToValueAtTime(vel * HAT, t + 0.0008)
    if (openUntil) {
      e.gain.setTargetAtTime(0, t + 0.002, 0.11)
      e.gain.setTargetAtTime(0, openUntil, 0.012)
    } else {
      e.gain.setTargetAtTime(0, t + 0.0015, 0.013 + vel * 0.008)
    }
    nz.connect(hp)
    hp.connect(pk)
    pk.connect(e)
    e.connect(m.drumsIn)
    if (openUntil) e.connect(m.roomSend)
    this.play(m, [nz, hp, pk, e], [nz], t, openUntil ? openUntil + 0.2 : t + 0.25)
  }

  // ----------------------------------------------------------- bass

  private bass(m: Movement, b: number, sec: Section, idx: number, ch: Chord, nch: Chord | null, kicks: number[], next: Section | null) {
    const n = sec.name
    const last = idx === sec.bars - 1
    const r = m.r
    const root = fold(m.bassBase * ch.r, 44)
    if (n === 'intro' || n === 'break') return
    if (n === 'outro' && last) {
      this.bassNote(m, this.stepT(m, b, 0), root, 0.9, this.stepT(m, b, 12))
      return
    }
    const on = kicks.length ? kicks.slice() : [0]
    if (on[0] !== 0) on.unshift(0)
    const stopTime = last && next?.name === 'break' ? 12.5 : 16
    let pickup: number | null = null
    if (nch && nch !== ch && stopTime === 16 && on[on.length - 1] <= 12 && r() < 0.4) {
      const nr = fold(m.bassBase * nch.r, 44)
      pickup = r() < 0.5 ? nr * (15 / 16) : nr * (9 / 8)
    }
    const endAll = pickup ? 13.7 : stopTime
    on.forEach((s, i) => {
      const e = Math.min(i + 1 < on.length ? on[i + 1] - 0.5 : endAll - 0.4, endAll - 0.4)
      if (e <= s) return
      let f = root
      if (i > 0) {
        const x = r()
        f = x < 0.68 ? root : x < 0.84 ? root * 1.5 : root * 2
        if (f > 130) f /= 2
      }
      this.bassNote(m, this.stepT(m, b, s), f, i === 0 ? 1 : range(r, 0.75, 0.9), this.stepT(m, b, e))
    })
    if (pickup) this.bassNote(m, this.stepT(m, b, 14), pickup, 0.7, this.stepT(m, b, 15.6))
  }

  private bassNote(m: Movement, t: number, f: number, vel: number, off: number) {
    const N = m.nodes
    const o = this.osc('sine', f, N)
    const tri = this.osc('triangle', f, N)
    for (const x of [o, tri]) {
      x.frequency.setValueAtTime(f * 1.012, t)
      x.frequency.exponentialRampToValueAtTime(f, t + 0.04)
    }
    const lp = this.filt('lowpass', 420, 0.6, N)
    const tg = this.gain(0.35, N)
    const e = this.gain(0, N)
    const v = vel * BASS
    e.gain.setValueAtTime(0, t)
    e.gain.linearRampToValueAtTime(v, t + 0.008)
    e.gain.setTargetAtTime(v * 0.6, t + 0.01, 0.3)
    e.gain.setTargetAtTime(0, off, 0.035)
    o.connect(e)
    tri.connect(lp)
    lp.connect(tg)
    tg.connect(e)
    e.connect(m.bassIn)
    this.play(m, [o, tri, lp, tg, e], [o, tri], t, off + 0.45)
  }

  // ----------------------------------------------------------- keys

  private keys(m: Movement, b: number, sec: Section, idx: number, ch: Chord, nch: Chord | null, next: Section | null) {
    const r = m.r
    const n = sec.name
    const last = idx === sec.bars - 1
    const barEnd = this.stepT(m, b, 16)
    const lvl = { intro: 1.15, groove: 0.9, break: 1.05, drop: 1, outro: 0.9 }[n]
    type Strike = { s: number; v: number; ch: Chord; off?: number }
    const strikes: Strike[] = []
    const sustained = n === 'intro' || n === 'break' || (n === 'outro' && last)
    if (sustained) {
      strikes.push({ s: 0, v: 0.8, ch })
    } else {
      strikes.push({ s: 0, v: 0.85, ch })
      if (m.comp === 'two') strikes.push({ s: 10, v: 0.55, ch })
      if (m.comp === 'dilla') strikes.push({ s: 7, v: 0.5, ch, off: 10 }, { s: 10, v: 0.6, ch })
      if (last && next?.name === 'break') {
        // stop-time bar: one chord, let it ring into the break
        strikes.splice(1)
      }
    }
    if (m.pushed.has(b)) strikes.shift()
    const canPush = (n === 'groove' || n === 'drop') && nch && nch !== ch && next && next.name === n
    if (canPush && r() < m.pushProb) {
      const s = r() < 0.6 ? 14 : 15
      for (let i = strikes.length - 1; i >= 0; i--) if (strikes[i].s >= s - 1) strikes.splice(i, 1)
      strikes.push({ s, v: 0.8, ch: nch! })
      m.pushed.add(b + 1)
    }
    strikes.forEach((st, i) => {
      const t0 = this.stepT(m, b, st.s)
      let off: number
      if (st.off !== undefined) off = this.stepT(m, b, st.off)
      else if (i + 1 < strikes.length) off = this.stepT(m, b, strikes[i + 1].s) - 0.02
      else if (st.s >= 14) off = this.stepT(m, b, 16 + 8)
      else if (n === 'outro' && last) off = m.end + 2
      else if (sustained) off = barEnd + 0.5
      else off = barEnd + 0.03
      const notes = this.voicing(m, st.ch)
      if (n === 'intro' || n === 'break') notes.unshift(fold(m.keysBase * st.ch.r, m.keysBase * 0.5))
      const spread = range(r, 0.006, 0.014)
      notes.forEach((f, j) => {
        const v = st.v * lvl * range(r, 0.82, 1) * (j === 0 && notes.length > 4 ? 0.7 : 1)
        this.epNote(m, t0 + j * spread + range(r, 0, 0.004), f, v, off, m.keysIn)
      })
    })
  }

  /** FM electric piano: 1:1 modulator for the bark, a 7x tine ping. */
  private epNote(m: Movement, t: number, f: number, vel: number, off: number, dest: AudioNode) {
    const N = m.nodes
    const car = this.osc('sine', f, N)
    const mod = this.osc('sine', f, N)
    const mg = this.gain(0, N)
    mg.gain.setValueAtTime(f * (0.9 + 1.5 * vel), t)
    mg.gain.setTargetAtTime(f * 0.22, t, 0.16)
    const tine = this.osc('sine', f * 7, N)
    const tg = this.gain(0, N)
    tg.gain.setValueAtTime(0, t)
    tg.gain.linearRampToValueAtTime(vel * 0.05, t + 0.001)
    tg.gain.setTargetAtTime(0, t + 0.002, 0.02)
    const e = this.gain(0, N)
    const a = vel * KEYS * Math.pow(300 / f, 0.25)
    e.gain.setValueAtTime(0, t)
    e.gain.linearRampToValueAtTime(a, t + 0.004)
    e.gain.setTargetAtTime(a * 0.45, t + 0.004, 0.28)
    if (off > t + 0.7) e.gain.setTargetAtTime(0, t + 0.7, 2 + 200 / f)
    e.gain.setTargetAtTime(0, Math.max(off, t + 0.01), 0.09)
    const p = this.node(this.ctx.createStereoPanner(), N)
    p.pan.value = clamp(Math.log2(f / m.keysCentre) * 0.5, -0.4, 0.4)
    mod.connect(mg)
    mg.connect(car.frequency)
    car.connect(e)
    tine.connect(tg)
    tg.connect(e)
    e.connect(p)
    p.connect(dest)
    this.play(m, [car, mod, mg, tine, tg, e, p], [car, mod, tine], t, Math.max(off, t + 0.01) + 0.85)
  }

  private pad(m: Movement, b: number, sec: Section, ch: Chord) {
    const lvl = { intro: 1.7, groove: 0.4, break: 1.7, drop: 0.5, outro: 0.9 }[sec.name] * PAD
    const N = m.nodes
    const t0 = this.stepT(m, b, 0)
    const t1 = b === m.naturalBars - 1 ? m.end + 1.5 : this.stepT(m, b, 16)
    const lp = this.filt('lowpass', 1500, 0.3, N)
    const e = this.gain(0, N)
    e.gain.setValueAtTime(0, t0)
    e.gain.setTargetAtTime(lvl, t0, 0.35)
    e.gain.setTargetAtTime(0, t1, 0.4)
    const parts: AudioNode[] = [lp, e]
    const srcs: AudioScheduledSourceNode[] = []
    for (const f of this.voicing(m, ch)) {
      for (const d of [-8, 8]) {
        const o = this.osc('sawtooth', f * 2, N)
        o.detune.value = d + range(m.r, -2, 2)
        o.connect(lp)
        parts.push(o)
        srcs.push(o)
      }
    }
    lp.connect(e)
    e.connect(m.padIn)
    this.play(m, parts, srcs, t0, t1 + 3)
  }

  // ----------------------------------------------------------- lead

  /** A 2-bar motif: 3-6 lazy notes on the swung grid, stepwise, spacious. */
  private newMotif(r: Rand): Note[] {
    const out: Note[] = []
    let s = pick(r, [0, 2, 3, 4, 6])
    let d = pick(r, [0, 2, 3, 4, 5])
    const count = 3 + Math.floor(r() * 4)
    for (let i = 0; i < count && s < 28; i++) {
      out.push({ s, d, len: 0 })
      s += pick(r, [2, 3, 3, 4, 4, 6, 8])
      d = clamp(d + pick(r, [-2, -1, -1, 1, 1, 2, 0, -3]), -2, 7)
    }
    for (let i = 0; i < out.length; i++) {
      const nx = i + 1 < out.length ? out[i + 1].s : 32
      out[i].len = Math.min(nx - out[i].s, i + 1 < out.length ? 8 : 12)
    }
    return out
  }

  /** The answer: same rhythm, the tail re-aimed; optionally resolved home. */
  private answer(r: Rand, src: Note[], home: boolean): Note[] {
    const a = src.map((n) => ({ ...n }))
    const k = a.length - 1
    if (home) a[k].d = a[k].d >= 3 ? 5 : 0
    else a[k].d = clamp(a[k].d + pick(r, [-2, -1, 1, 2]), -2, 7)
    if (a.length > 2 && r() < 0.5) a[k - 1].d = clamp(a[k - 1].d + pick(r, [-1, 1]), -2, 7)
    return a
  }

  private melFreq(m: Movement, d: number, ch: Chord) {
    const P = PENT[m.mode]
    const o = Math.floor(d / 5)
    let f = m.melBase * P[((d % 5) + 5) % 5] * Math.pow(2, o)
    // Snap to the chord's own just tones where the scale note would rub
    // (within ~a semitone), so melody and voicing never beat.
    const cr = m.melBase * ch.r
    let best = 0
    let bestAbs = Infinity
    for (const t of [1, ...TONES[ch.q]]) {
      let c = 1200 * Math.log2(f / (cr * t))
      c = ((((c + 600) % 1200) + 1200) % 1200) - 600
      if (Math.abs(c) < bestAbs) { bestAbs = Math.abs(c); best = c }
    }
    if (bestAbs < 130) f /= Math.pow(2, best / 1200)
    if (f > 1500) f /= 2
    return f
  }

  private melody(m: Movement, b: number, sec: Section, idx: number) {
    const r = m.r
    const n = sec.name
    let phrase: Note[] | null = null
    let voice = m.lead
    if (n === 'intro' && idx === 0) {
      // The frequency, announced: one bell on the root itself.
      this.bell(m, this.stepT(m, b, 0) + 0.02, m.root > 1100 ? m.root / 2 : m.root, 0.8)
      return
    }
    if (n === 'groove') {
      if (idx === 4) phrase = m.motif
      else if (idx === 6 && r() < 0.75) phrase = this.answer(r, m.motif, false)
    } else if (n === 'break') {
      voice = m.breakLead
      if (idx === 0) phrase = m.motifB
      else if (idx === 2) phrase = this.answer(r, m.motifB, true)
    } else if (n === 'drop') {
      if (idx === 0) phrase = m.motif
      else if (idx === 2) phrase = this.answer(r, m.motif, false)
      else if (idx === 4) phrase = m.motifB
      else if (idx === 6) phrase = this.answer(r, m.motif, true)
    } else if (n === 'outro' && idx === 0 && sec.bars >= 4) {
      phrase = this.answer(r, m.motif.slice(0, 3), true)
      phrase[phrase.length - 1].len = 12
    }
    if (!phrase) return
    for (const note of phrase) {
      const bar = b + Math.floor(note.s / 16)
      if (bar >= m.naturalBars) break
      const t = this.stepT(m, b, note.s) + range(r, 0.004, 0.022)
      const off = this.stepT(m, b, note.s + note.len) - 0.03
      const f = this.melFreq(m, note.d, this.chordAt(m, bar))
      const v = range(r, 0.78, 1)
      if (voice === 'bell') this.bell(m, t, f, v * 0.9)
      else if (voice === 'flute') this.flute(m, t, f, v, off)
      else this.epNote(m, t, f * (f < 420 ? 2 : 1), v * 1.25, off, m.leadIn)
    }
  }

  /** Mellow FM bell (4:1, low index): a vibraphone more than a church. */
  private bell(m: Movement, t: number, f: number, vel: number) {
    const N = m.nodes
    const car = this.osc('sine', f, N)
    const mod = this.osc('sine', f * 4, N)
    const mg = this.gain(0, N)
    mg.gain.setValueAtTime(f * 4 * 0.5, t)
    mg.gain.setTargetAtTime(f * 0.1, t, 0.25)
    const e = this.gain(0, N)
    const a = vel * LEAD * 0.9 * Math.pow(500 / f, 0.2)
    e.gain.setValueAtTime(0, t)
    e.gain.linearRampToValueAtTime(a, t + 0.003)
    e.gain.setTargetAtTime(0, t + 0.004, 0.85)
    mod.connect(mg)
    mg.connect(car.frequency)
    car.connect(e)
    e.connect(m.leadIn)
    this.play(m, [car, mod, mg, e], [car, mod], t, t + 7)
  }

  /** Breathy flute: sine + a little octave, delayed vibrato, chiff noise. */
  private flute(m: Movement, t: number, f: number, vel: number, off: number) {
    const N = m.nodes
    const o = this.osc('sine', f, N)
    const o2 = this.osc('sine', f * 2, N)
    const o2g = this.gain(0.16, N)
    const vib = this.osc('sine', range(m.r, 4.8, 5.6), N)
    const vg = this.gain(0, N)
    vg.gain.setValueAtTime(0, t)
    vg.gain.setValueAtTime(0, t + 0.25)
    vg.gain.linearRampToValueAtTime(11, t + 0.7)
    const nz = this.noiseSrc(m, true)
    const bp = this.filt('bandpass', Math.min(f * 2, 4000), 2.2, N)
    const ng = this.gain(0, N)
    const a = vel * LEAD * 0.95 * Math.pow(500 / f, 0.2)
    ng.gain.setValueAtTime(0, t)
    ng.gain.linearRampToValueAtTime(a * 0.9, t + 0.02)
    ng.gain.setTargetAtTime(a * 0.14, t + 0.02, 0.09)
    ng.gain.setTargetAtTime(0, off, 0.06)
    const e = this.gain(0, N)
    e.gain.setValueAtTime(0, t)
    e.gain.setTargetAtTime(a, t, 0.03)
    e.gain.setTargetAtTime(0, off, 0.08)
    vib.connect(vg)
    vg.connect(o.detune)
    vg.connect(o2.detune)
    o.connect(e)
    o2.connect(o2g)
    o2g.connect(e)
    nz.connect(bp)
    bp.connect(ng)
    ng.connect(m.leadIn)
    e.connect(m.leadIn)
    this.play(m, [o, o2, o2g, vib, vg, nz, bp, ng, e], [o, o2, vib, nz], t, off + 0.8)
  }

  // ---------------------------------------------------------- lifecycle

  /** Stop a movement at bar line T: nothing past T sounds, tails fade. */
  private cutAt(m: Movement, T: number, bar: number) {
    m.cut = true
    m.bars = Math.min(m.bars, bar)
    for (const [s, t0] of m.srcs) {
      if (t0 >= T - 1e-4) {
        try { s.stop(T) } catch { /* ignore */ }
      }
    }
    const fades: [GainNode, number][] = [
      [m.drumKill, 0.03], [m.bassKill, 0.25], [m.musicKill, 1.6], [m.leadKill, 1.6], [m.droneKill, 2],
    ]
    for (const [k, d] of fades) {
      k.gain.cancelScheduledValues(T)
      k.gain.setValueAtTime(1, T)
      k.gain.linearRampToValueAtTime(0, T + d)
    }
    m.leadSend.gain.cancelScheduledValues(T)
    m.leadSend.gain.setValueAtTime(m.leadSend.gain.value, T)
    m.leadSend.gain.linearRampToValueAtTime(0, T + 1.6)
    for (const s of m.lfos) {
      try { s.stop(T + 2.5) } catch { /* ignore */ }
    }
    m.end = Math.min(m.end, T)
    m.freeAt = T + 3.5
  }

  private free(m: Movement) {
    if (m.freed) return
    m.freed = true
    for (const s of m.srcs.keys()) {
      s.onended = null
      try { s.stop() } catch { /* ignore */ }
    }
    for (const n of m.nodes) {
      n.disconnect()
      Session.live--
    }
    m.nodes.clear()
    m.srcs.clear()
  }

  // ---------------------------------------------------------- scheduler

  pump() {
    if (this.stopped) return
    const now = this.ctx.currentTime
    const until = this.offlineEnd > 0 ? this.offlineEnd : now + LOOKAHEAD
    // Chain movements: the successor starts on the final bar line while the
    // old tonic rings out through its kill gains.
    for (;;) {
      const cur = this.movements[this.movements.length - 1]
      if (!cur || cur.successorMade || cur.end > until) break
      cur.successorMade = true
      const E = cur.end
      for (const [k, a, d] of [[cur.musicKill, 0.4, 2.8], [cur.leadKill, 0.4, 3], [cur.bassKill, 0.5, 1.5]] as const) {
        k.gain.setValueAtTime(1, E + a)
        k.gain.linearRampToValueAtTime(0, E + a + d)
      }
      cur.freeAt = E + 5
      this.makeMovement(E)
    }
    for (const m of this.movements) {
      while (m.nextBar < m.bars && m.start + m.nextBar * m.barDur < until) {
        this.scheduleBar(m, m.nextBar)
        m.nextBar++
      }
    }
    if (this.offlineEnd === 0) {
      const lastM = this.movements[this.movements.length - 1]
      this.movements = this.movements.filter((m) => {
        if (m !== lastM && m.freeAt < now) {
          this.free(m)
          return false
        }
        return true
      })
    }
  }

  run(onTick: () => void) {
    const loop = () => {
      if (this.stopped) return
      this.pump()
      onTick()
      this.timer = setTimeout(loop, TICK)
    }
    this.timer = setTimeout(loop, TICK)
  }

  /** The movement sounding at t: the latest one to have started. */
  current(t: number): Movement | null {
    let best: Movement | null = null
    for (const m of this.movements) if (m.start <= t + 1e-6) best = m
    return best ?? this.movements[0] ?? null
  }

  /** State at t, read from the plan (not from what has been scheduled). */
  stateAt(t: number) {
    const m = this.current(t)
    if (!m) return null
    const bar = clamp(Math.floor((t - m.start) / m.barDur), 0, m.bars - 1)
    const ch = this.chordAt(m, bar)
    const x = clamp((t - m.start) / Math.max(1, m.naturalBars * m.barDur), 0, 1)
    return {
      m,
      freq: Math.round(m.root * fold(ch.r, 1) * 10) / 10,
      chord: ch.n,
      section: this.sectionAt(m, bar).name,
      bpm: m.bpm,
      beat: Math.round((m.beat0 + (m.beat1 - m.beat0) * x) * 10) / 10,
    }
  }

  skip() {
    const now = this.ctx.currentTime
    const cur = this.current(now)
    if (!cur) return
    // Anything pre-made and not yet sounding is simply dropped. A second
    // press before the first lands moves on past the root it had queued.
    let cursor = cur.index + 1
    this.movements = this.movements.filter((m) => {
      if (m !== cur && m.start > now) {
        if (m.fromSkip) cursor = Math.max(cursor, m.index + 1)
        this.free(m)
        return false
      }
      return true
    })
    const bar = Math.min(cur.bars, Math.ceil((now + 0.15 - cur.start) / cur.barDur))
    const T = cur.start + bar * cur.barDur
    this.cutAt(cur, T, bar)
    cur.successorMade = true
    this.cursor = cursor
    this.makeMovement(T, 2).fromSkip = true
    this.pump()
  }

  stop(): number {
    this.stopped = true
    if (this.timer) clearTimeout(this.timer)
    this.timer = null
    const t = this.ctx.currentTime
    this.out.gain.setValueAtTime(1, t)
    this.out.gain.linearRampToValueAtTime(0, t + 0.8)
    return t + 0.8
  }

  destroy() {
    for (const m of this.movements) this.free(m)
    this.movements = []
    for (const s of this.globalSrc) {
      try { s.stop() } catch { /* ignore */ }
    }
    for (const n of this.globals) {
      n.disconnect()
      Session.live--
    }
    this.globals.clear()
    this.globalSrc = []
  }
}

// ------------------------------------------------------------ public API

export class AJTones {
  private ctx: BaseAudioContext
  private seed: number | undefined
  private session: Session | null = null
  private last = ''
  onChange: ((s: AJState) => void) | null = null

  /** `ctx` may also be an OfflineAudioContext (the whole render is then
   *  scheduled on start). `seed` fixes the score; omitted, it's per session. */
  constructor(ctx: AudioContext | BaseAudioContext, seed?: number) {
    this.ctx = ctx
    this.seed = seed
  }

  /** Nodes currently alive across all sessions (leak checks). */
  static get liveNodes() {
    return Session.live
  }

  get playing(): boolean {
    return !!this.session && !this.session.stopped
  }

  start(dest: AudioNode): void {
    if (this.playing) return
    const seed = this.seed ?? ((Date.now() ^ Math.floor(Math.random() * 2 ** 31)) >>> 0)
    const s = new Session(this.ctx, seed, dest)
    this.session = s
    this.last = ''
    s.run(() => this.emit())
    this.emit()
  }

  stop(): void {
    const s = this.session
    if (!s || s.stopped) return
    const at = s.stop()
    const ms = Math.max(0, (at - this.ctx.currentTime) * 1000) + 120
    setTimeout(() => s.destroy(), ms)
    this.emit()
  }

  /** Skip to the next root, on the next bar line. */
  next(): void {
    if (!this.session || this.session.stopped) return
    this.session.skip()
    this.emit()
  }

  read(): AJState {
    const s = this.session
    if (!s || s.stopped) return { freq: 0, label: 'off', section: 'off', bpm: 0, chord: '' }
    const st = s.stateAt(this.ctx.currentTime)
    if (!st) return { freq: 0, label: '—', section: 'silence', bpm: 0, chord: '' }
    return {
      freq: st.freq,
      label: `${Math.round(st.freq)} Hz`,
      section: st.section,
      bpm: st.bpm,
      chord: st.chord,
      beat: st.beat,
    }
  }

  private emit() {
    const st = this.read()
    const key = `${st.freq}|${st.chord}|${st.section}|${st.bpm}`
    if (key === this.last) return
    this.last = key
    this.onChange?.(st)
  }
}
