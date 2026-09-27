/**
 * AJ mode — pure-frequency music, generated live.
 *
 * For Anmol: tones, drones, binaural pairs and slow glass-bell tunes on
 * the "solfeggio" roots (432, 528, 396, 639 ...). No drums, no voices,
 * nothing sampled: every sound is an oscillator or a noise buffer built
 * here, and the score is written by a seeded PRNG as it plays, so it never
 * loops identically.
 *
 * STRUCTURE
 *   A session is a string of MOVEMENTS (50–85 s), each centred on one root.
 *   Consecutive movements overlap in a 10 s linear crossfade (gains sum to
 *   one, so peaks never stack). Inside a movement:
 *
 *     root      pure sine at the root, loudest thing in the mix, so a
 *               spectral-peak detector reads the movement's frequency
 *     halo      a second sine 0.1–0.2 Hz off the root: a slow ripple
 *     partial   the fifth (3/2) or octave (2/1), fading in and out
 *     binaural  L/R sines at root/2 ± beat/2 (beat 4–10 Hz, drifting)
 *     breath    0.05–0.15 Hz amplitude LFO over the whole pad
 *     bells     FM glass/bell tones on a just-intonation pentatonic built
 *               from the root, playing an evolving motif (the "tune")
 *   Session-wide: an airy band-limited noise shimmer and a generated-impulse
 *   convolution reverb, all through a 4.8 kHz low-pass and a soft safety
 *   compressor.
 *
 * TIMING
 *   "A tale of two clocks": a setTimeout loop wakes every ~120 ms and
 *   schedules everything that falls within the next few seconds against
 *   ctx.currentTime. Drones are free-running, so a throttled timer can at
 *   worst delay a bell phrase or stretch a movement, never glitch the
 *   sound. With an OfflineAudioContext the whole render is scheduled up
 *   front (used for verification).
 *
 * The page gets ONE output node (start(dest)); stop() fades out and frees
 * every node it created.
 */

export interface AJState {
  freq: number
  label: string
  section: string
  beat?: number
}

// ---------------------------------------------------------------- tuning

/** The cycle of roots. Neighbouring moves are near-consonant: 528→396 is
 *  a fourth down, 396→639 a minor sixth up, 639→852 a fourth up, 963→432
 *  a ninth down, home. */
const ROOTS = [432, 528, 396, 639, 852, 417, 741, 963]

/** Just-intonation pentatonic degrees (ratios over the bell register). */
const PENTA = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3, 10 / 3]

const XFADE = 10 // s, movement crossfade
const LOOKAHEAD = 4 // s scheduled ahead of currentTime
const TICK = 120 // ms, scheduler wake-up
const OUT = 0.8 // master trim: peaks land near -6 dBFS

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

// --------------------------------------------------------------- session

interface Movement {
  index: number
  root: number
  start: number // ctx time the fade-in begins
  end: number // ctx time the fade-out begins (crossfade to the next)
  done: number // ctx time it is silent
  beat: number // binaural beat, Hz, at start
  beat1: number // ... and where it drifts to by the end
  fadeIn: number
  fadeOut: number
  bus: GainNode
  bellBus: GainNode
  kill: GainNode // release envelopes: fresh nodes with no prior automation,
  bellKill: GainNode // so a skip never has to cancel a ramp mid-flight
  cancelled: boolean
  sources: Set<AudioScheduledSourceNode>
  nodes: Set<AudioNode>
  // tune
  register: number
  motif: { deg: number; dur: number }[]
  unit: number
  nextPhrase: number
  fmRatio: number
  fmIndex: number
  successorMade: boolean
  disposed: boolean
}

class Session {
  readonly ctx: BaseAudioContext
  readonly r: Rand
  readonly master: GainNode
  private out: GainNode
  private lp: BiquadFilterNode
  private comp: DynamicsCompressorNode
  readonly dry: GainNode
  readonly verbSend: GainNode
  private verb: ConvolverNode
  private verbRet: GainNode
  private noise: AudioBuffer
  private global: AudioNode[] = []
  private globalSrc: AudioScheduledSourceNode[] = []
  movements: Movement[] = []
  private cursor: number // index into ROOTS of the next movement to make
  private timer: ReturnType<typeof setTimeout> | null = null
  private offlineEnd = 0
  stopped = false
  /** Live node count, for leak checks. */
  static live = 0

  constructor(ctx: BaseAudioContext, seed: number, dest: AudioNode) {
    this.ctx = ctx
    this.r = prng(seed)
    this.cursor = 0

    const now = ctx.currentTime
    this.master = this.g(0)
    this.lp = ctx.createBiquadFilter()
    this.lp.type = 'lowpass'
    this.lp.frequency.value = 4800
    this.lp.Q.value = 0.5
    this.comp = ctx.createDynamicsCompressor()
    this.comp.threshold.value = -3
    this.comp.knee.value = 2
    this.comp.ratio.value = 12
    this.comp.attack.value = 0.005
    this.comp.release.value = 0.4
    this.dry = this.g(1)
    this.verbSend = this.g(1)
    this.verb = ctx.createConvolver()
    this.verb.buffer = this.impulse(6.5)
    this.verbRet = this.g(0.42)
    this.global.push(this.lp, this.comp, this.verb)
    Session.live += 3

    this.dry.connect(this.lp)
    this.verbSend.connect(this.verb)
    this.verb.connect(this.verbRet)
    this.verbRet.connect(this.lp)
    this.lp.connect(this.comp)
    this.out = this.g(1)
    this.comp.connect(this.master)
    this.master.connect(this.out)
    this.out.connect(dest)

    // Fade in ~1.5 s.
    this.master.gain.setValueAtTime(0, now)
    this.master.gain.linearRampToValueAtTime(OUT, now + 1.5)

    this.noise = this.noiseBuffer(7)
    this.shimmer(now)

    this.offlineEnd =
      typeof OfflineAudioContext !== 'undefined' && ctx instanceof OfflineAudioContext
        ? ctx.length / ctx.sampleRate
        : 0

    this.makeMovement(now, true)
    this.pump()
  }

  // ------------------------------------------------------------ helpers

  private g(v: number, bag?: Set<AudioNode>) {
    const n = this.ctx.createGain()
    n.gain.value = v
    if (bag) bag.add(n)
    else this.global.push(n)
    Session.live++
    return n
  }

  private osc(freq: number, m: Movement | null, type: OscillatorType = 'sine') {
    const o = this.ctx.createOscillator()
    o.type = type
    o.frequency.value = freq
    Session.live++
    if (m) {
      m.sources.add(o)
      m.nodes.add(o)
    } else {
      this.globalSrc.push(o)
      this.global.push(o)
    }
    return o
  }

  private noiseBuffer(sec: number) {
    const sr = this.ctx.sampleRate
    const len = Math.floor(sec * sr)
    const b = this.ctx.createBuffer(2, len, sr)
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c)
      for (let i = 0; i < len; i++) d[i] = this.r() * 2 - 1
      // Seamless loop: crossfade the last 0.25 s into the head.
      const x = Math.floor(0.25 * sr)
      for (let i = 0; i < x; i++) {
        const w = i / x
        d[len - x + i] = d[len - x + i] * (1 - w) + d[i] * w
      }
    }
    return b
  }

  /** Stereo room impulse: exponentially decaying noise whose brightness
   *  falls as it decays (one-pole low-pass sweeping down), 18 ms pre-delay. */
  private impulse(sec: number) {
    const sr = this.ctx.sampleRate
    const len = Math.floor(sec * sr)
    const b = this.ctx.createBuffer(2, len, sr)
    const pre = Math.floor(0.018 * sr)
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c)
      let y = 0
      for (let i = pre; i < len; i++) {
        const t = (i - pre) / sr
        const env = Math.exp((-6.9 * t) / (sec * 0.8)) // ~RT60 = 0.8·sec
        const fc = 5200 * Math.exp(-t / 1.4) + 350
        const a = 1 - Math.exp((-2 * Math.PI * fc) / sr)
        y += a * ((this.r() * 2 - 1) - y)
        // Soft onset so the early field doesn't read as a slap.
        const on = Math.min(1, t / 0.04)
        d[i] = y * env * on
      }
    }
    return b
  }

  /** The air: stereo noise in a slowly wandering band around 2–3.5 kHz,
   *  very quiet, half of it into the reverb. */
  private shimmer(t: number) {
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    src.loop = true
    Session.live++
    this.globalSrc.push(src)
    this.global.push(src)
    const bp = this.ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 2600
    bp.Q.value = 0.9
    const hp = this.ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 1200
    this.global.push(bp, hp)
    Session.live += 2
    const lvl = this.g(0)
    lvl.gain.setValueAtTime(0, t)
    lvl.gain.linearRampToValueAtTime(0.012, t + 6)
    // Slow wander of the band and the level.
    const lfo = this.osc(0.031, null)
    const lfoAmt = this.g(700)
    lfo.connect(lfoAmt)
    lfoAmt.connect(bp.frequency)
    const lfo2 = this.osc(0.047, null)
    const lfo2Amt = this.g(0.005)
    lfo2.connect(lfo2Amt)
    lfo2Amt.connect(lvl.gain)
    src.connect(hp)
    hp.connect(bp)
    bp.connect(lvl)
    lvl.connect(this.dry)
    const send = this.g(0.8)
    lvl.connect(send)
    send.connect(this.verbSend)
    src.start(t)
    lfo.start(t)
    lfo2.start(t)
  }

  // ---------------------------------------------------------- movements

  private makeMovement(start: number, first: boolean) {
    const r = this.r
    const index = this.cursor
    const root = ROOTS[index % ROOTS.length]
    this.cursor++
    const len = range(r, 50, 85)
    const bus = this.g(0, new Set())
    const nodes = new Set<AudioNode>([bus])
    const bellBus = this.g(1, nodes)
    const m: Movement = {
      index,
      root,
      start,
      end: start + len,
      done: start + len + XFADE,
      beat: range(r, 4.5, 9.5),
      beat1: range(r, 4, 10),
      fadeIn: first ? 0 : XFADE,
      fadeOut: XFADE,
      bus,
      bellBus,
      kill: this.g(1, nodes),
      bellKill: this.g(1, nodes),
      cancelled: false,
      sources: new Set(),
      nodes,
      register: root < 560 ? root : root / 2,
      motif: [],
      unit: range(r, 0.55, 0.85),
      nextPhrase: start + range(r, 7, 13),
      fmRatio: pick(r, [1.4, 2, 2, 3]),
      fmIndex: range(r, 0.35, 0.9),
      successorMade: false,
      disposed: false,
    }
    m.motif = this.newMotif()
    this.movements.push(m)

    // Crossfade envelope. The very first movement rides the master fade.
    const fadeIn = first ? 0.05 : XFADE
    bus.gain.setValueAtTime(0, start)
    bus.gain.linearRampToValueAtTime(1, start + fadeIn)

    bus.connect(m.kill)
    m.kill.connect(this.dry)
    const padSend = this.g(0.14, nodes)
    m.kill.connect(padSend)
    padSend.connect(this.verbSend)
    bellBus.connect(m.bellKill)
    m.bellKill.connect(this.dry)
    const bellSend = this.g(0.7, nodes)
    m.bellKill.connect(bellSend)
    bellSend.connect(this.verbSend)

    // Breath: an LFO riding a gain that sits at 0.88 ± 0.10.
    const breath = this.g(0.88, nodes)
    const bLfo = this.osc(range(r, 0.05, 0.15), m)
    const bAmt = this.g(range(r, 0.06, 0.1), nodes)
    bLfo.connect(bAmt)
    bAmt.connect(breath.gain)
    breath.connect(bus)

    // Root: loudness trimmed gently for the high roots (equal-ish loudness).
    const rootAmp = 0.3 * Math.pow(432 / root, 0.22)
    const rootO = this.osc(root, m)
    const rootG = this.g(rootAmp, nodes)
    rootO.connect(rootG)
    rootG.connect(breath)

    // Halo: a sine a hair off the root → a slow ripple through the drone.
    const halo = this.osc(root + range(r, 0.09, 0.2) * (r() < 0.5 ? -1 : 1), m)
    const haloG = this.g(0, nodes)
    haloG.gain.setValueAtTime(0, start)
    haloG.gain.linearRampToValueAtTime(rootAmp * 0.14, start + 12)
    halo.connect(haloG)
    haloG.connect(breath)

    // Partial: fifth or octave, arriving after the root settles, breathing
    // on its own slower cycle.
    const ratio = root > 800 ? pick(r, [0.75, 1.5]) : pick(r, [1.5, 1.5, 2])
    const part = this.osc(root * ratio, m)
    const partG = this.g(0, nodes)
    const partAmp = rootAmp * (ratio === 2 ? 0.14 : 0.2)
    partG.gain.setValueAtTime(0, start)
    partG.gain.linearRampToValueAtTime(0, start + len * 0.1)
    partG.gain.linearRampToValueAtTime(partAmp, start + len * 0.3)
    const pLfo = this.osc(range(r, 0.018, 0.035), m)
    const pAmt = this.g(partAmp * 0.45, nodes)
    pLfo.connect(pAmt)
    pAmt.connect(partG.gain)
    part.connect(partG)
    partG.connect(breath)

    // Binaural pair at root/2, hard left and right; the beat drifts slowly
    // toward a second target across the movement.
    const car = root / 2
    const b0 = m.beat
    const b1 = m.beat1
    const bAmp = rootAmp * 0.22
    for (const side of [-1, 1] as const) {
      const o = this.osc(car + (side * b0) / 2, m)
      o.frequency.setValueAtTime(car + (side * b0) / 2, start)
      o.frequency.linearRampToValueAtTime(car + (side * b1) / 2, start + len)
      const gg = this.g(0, nodes)
      gg.gain.setValueAtTime(0, start)
      gg.gain.linearRampToValueAtTime(bAmp, start + Math.min(18, len * 0.25))
      const p = this.ctx.createStereoPanner()
      p.pan.value = side
      nodes.add(p)
      Session.live++
      o.connect(gg)
      gg.connect(p)
      p.connect(breath)
    }

    for (const s of m.sources) s.start(start)
    return m
  }

  /** A motif: 4–6 pentatonic degrees by small steps, mixed durations. */
  private newMotif() {
    const r = this.r
    const n = 4 + Math.floor(r() * 3)
    let deg = pick(r, [0, 2, 3, 5])
    const out: { deg: number; dur: number }[] = []
    for (let i = 0; i < n; i++) {
      out.push({ deg, dur: pick(r, [1, 1, 1.5, 2, 2, 3]) })
      const step = pick(r, [-2, -1, -1, 1, 1, 2, 0])
      deg = Math.max(0, Math.min(PENTA.length - 1, deg + step))
    }
    out[out.length - 1].dur = 3 // phrases come to rest
    return out
  }

  /** Which section the movement is in at time t. */
  sectionAt(m: Movement, t: number) {
    const len = m.end - m.start
    const x = (t - m.start) / len
    if (t >= m.end) return 'dissolve'
    if (x < 0.14 || t < m.start + m.fadeIn + 3) return 'emerge'
    if (x < 0.3) return 'drone'
    if (x < 0.88) return 'tune'
    return 'dissolve'
  }

  /** One bell: sine carrier, sine modulator (FM), sharp-soft attack,
   *  exponential decay; the brightness decays faster than the body. */
  private bell(m: Movement, t: number, freq: number, vel: number, decay: number) {
    const ctx = this.ctx
    const car = ctx.createOscillator()
    car.frequency.value = freq
    const mod = ctx.createOscillator()
    mod.frequency.value = freq * m.fmRatio
    const idx = ctx.createGain()
    const env = ctx.createGain()
    const pan = ctx.createStereoPanner()
    pan.pan.value = range(this.r, -0.55, 0.55)
    const nodes = [car, mod, idx, env, pan]
    Session.live += nodes.length
    for (const n of nodes) m.nodes.add(n)
    m.sources.add(car)
    m.sources.add(mod)

    const dev = freq * m.fmRatio * m.fmIndex
    idx.gain.setValueAtTime(dev, t)
    idx.gain.exponentialRampToValueAtTime(dev * 0.04, t + decay * 0.45)
    env.gain.setValueAtTime(0, t)
    env.gain.linearRampToValueAtTime(vel, t + 0.02)
    env.gain.exponentialRampToValueAtTime(vel * 0.001, t + decay)
    env.gain.linearRampToValueAtTime(0, t + decay + 0.05)

    mod.connect(idx)
    idx.connect(car.frequency)
    car.connect(env)
    env.connect(pan)
    pan.connect(m.bellBus)
    const end = t + decay + 0.1
    car.start(t)
    mod.start(t)
    car.stop(end)
    mod.stop(end)
    car.onended = () => {
      for (const n of nodes) {
        n.disconnect()
        if (m.nodes.delete(n)) Session.live--
      }
      m.sources.delete(car)
      m.sources.delete(mod)
    }
  }

  /** Mutate the motif a little: the tune evolves instead of repeating. */
  private vary(src: Movement) {
    const r = this.r
    const motif = src.motif.map((n) => ({ ...n }))
      const op = r()
      let notes = motif
      if (op < 0.3) {
        // as written
      } else if (op < 0.5) {
        const s = pick(r, [-1, 1])
        notes = motif.map((n) => ({ ...n, deg: Math.max(0, Math.min(PENTA.length - 1, n.deg + s)) }))
      } else if (op < 0.65) {
        notes = motif.slice().reverse()
        notes[notes.length - 1].dur = 3
      } else if (op < 0.8) {
        notes = motif.slice(0, Math.max(2, motif.length - 2))
        notes[notes.length - 1].dur = 3
      } else {
        notes = motif.map((n) => ({ ...n, dur: n.dur * 1.5 }))
      }
      // Permanent drift: one note of the source motif moves by a step.
      if (r() < 0.35) {
        const i = Math.floor(r() * src.motif.length)
        const d = src.motif[i].deg + pick(r, [-1, 1])
        src.motif[i].deg = Math.max(0, Math.min(PENTA.length - 1, d))
      }
    return notes
  }

  private schedulePhrases(m: Movement, until: number) {
    const r = this.r
    const last = m.end + XFADE * 0.4
    while (m.nextPhrase < until && m.nextPhrase < last) {
      const t0 = m.nextPhrase
      const sec = this.sectionAt(m, t0)
      let gap: number
      if (sec === 'emerge' || sec === 'drone' || sec === 'dissolve') {
        // Sparse: a single bell, or two, on the root's own degrees.
        const deg = pick(r, [0, 3, 5, 0, 2])
        const f = m.register * PENTA[deg]
        this.bell(m, t0, f, range(r, 0.045, 0.068), range(r, 4.5, 7))
        if (r() < 0.4) {
          const f2 = m.register * PENTA[Math.min(PENTA.length - 1, deg + pick(r, [1, 2, 3]))]
          this.bell(m, t0 + m.unit * pick(r, [1.5, 2, 3]), f2, range(r, 0.032, 0.05), range(r, 4, 6))
        }
        gap = range(r, 6, 13)
      } else {
        // The tune.
        const notes = this.vary(m)
        let t = t0
        for (let i = 0; i < notes.length; i++) {
          const n = notes[i]
          let f = m.register * PENTA[n.deg]
          if (f > 1400) f /= 2 // fold, never clamp: stay in the scale
          const accent = i === 0 ? 1 : range(r, 0.72, 0.92)
          this.bell(m, t + range(r, 0, 0.025), f, 0.078 * accent, range(r, 3.2, 5.5) + n.dur * 0.4)
          t += n.dur * m.unit
        }
        gap = t - t0 + range(r, 4, 10)
        // Once in a while, a new motif grows out of the old.
        if (r() < 0.18) m.motif = this.newMotif()
      }
      m.nextPhrase = t0 + gap
    }
  }

  /** Fade a movement out from `t` over `dur`, then free it. */
  private release(m: Movement, t: number, dur: number) {
    if (m.disposed) return
    m.disposed = true
    if (t < m.start) {
      // Never started: just cancel it.
      m.cancelled = true
      m.kill.gain.value = 0
      m.bellKill.gain.value = 0
      for (const s of m.sources) {
        try { s.stop(m.start) } catch { /* ignore */ }
      }
      m.done = m.start
    } else {
      for (const k of [m.kill.gain, m.bellKill.gain]) {
        k.setValueAtTime(1, t)
        k.linearRampToValueAtTime(0, t + Math.max(0.02, dur))
      }
      for (const s of m.sources) {
        try { s.stop(t + dur + 0.05) } catch { /* ignore */ }
      }
      m.end = Math.min(m.end, t)
      m.fadeOut = Math.max(0.01, dur)
      m.done = t + dur
    }
    m.nextPhrase = Infinity
  }

  private free(m: Movement) {
    for (const s of m.sources) {
      s.onended = null
      try { s.stop() } catch { /* ignore */ }
    }
    for (const n of m.nodes) {
      n.disconnect()
      Session.live--
    }
    m.nodes.clear()
    m.sources.clear()
  }

  // ---------------------------------------------------------- scheduler

  pump() {
    if (this.stopped) return
    const now = this.ctx.currentTime
    const until = this.offlineEnd > 0 ? this.offlineEnd : now + LOOKAHEAD
    // Chain movements: the successor starts exactly when its predecessor
    // begins to fade.
    for (;;) {
      const cur = this.movements[this.movements.length - 1]
      if (!cur || cur.successorMade || cur.end > until) break
      cur.successorMade = true
      if (!cur.disposed) {
        cur.bus.gain.setValueAtTime(1, cur.end)
        cur.bus.gain.linearRampToValueAtTime(0, cur.end + XFADE)
        for (const s of cur.sources) {
          try { s.stop(cur.done + 0.05) } catch { /* ignore */ }
        }
      }
      this.makeMovement(cur.end, false)
    }
    for (const m of this.movements) {
      if (m.nextPhrase !== Infinity) this.schedulePhrases(m, until)
    }
    // Garbage: movements fully faded.
    if (this.offlineEnd === 0) {
      this.movements = this.movements.filter((m) => {
        if (m.done + 0.5 < now && m !== this.movements[this.movements.length - 1]) {
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

  /** The movement that dominates at `t` (crossfade midpoint switches). */
  current(t: number): Movement | null {
    let best: Movement | null = null
    for (const m of this.movements) {
      if (t < m.start || m.cancelled) continue
      const inW = m.fadeIn <= 0 ? 1 : Math.min(1, (t - m.start) / m.fadeIn)
      const outW = t < m.end ? 1 : Math.max(0, 1 - (t - m.end) / m.fadeOut)
      const w = Math.min(inW, outW)
      if (!best || w >= 0.5) best = m
      if (w >= 0.5) break
    }
    return best
  }

  skip() {
    const now = this.ctx.currentTime
    const t = now + 0.02
    // Drop anything not yet sounding; fade whatever is audible.
    const live: Movement[] = []
    for (const m of this.movements) {
      if (m.start > t) this.release(m, t, 0)
      else live.push(m)
    }
    const cur = this.current(now)
    // Next root after the one you're hearing, not after the pre-made one.
    if (cur) this.cursor = cur.index + 1
    for (const m of live) if (m !== cur) this.release(m, t, Math.min(2, XFADE))
    if (cur) {
      this.release(cur, t, 4)
      cur.successorMade = true
    }
    const m = this.makeMovement(t, false)
    m.fadeIn = 4
    m.bus.gain.cancelScheduledValues(0)
    m.bus.gain.setValueAtTime(0, t)
    m.bus.gain.linearRampToValueAtTime(1, t + 4)
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
    for (const n of this.global) {
      n.disconnect()
      Session.live--
    }
    this.global = []
    this.globalSrc = []
    this.out.disconnect()
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

  next(): void {
    if (!this.session || this.session.stopped) return
    this.session.skip()
    this.emit()
  }

  read(): AJState {
    const s = this.session
    if (!s || s.stopped) return { freq: 0, label: 'off', section: 'off' }
    const t = this.ctx.currentTime
    const m = s.current(t)
    if (!m) return { freq: 0, label: '—', section: 'silence' }
    const len = m.end - m.start
    const x = Math.max(0, Math.min(1, (t - m.start) / Math.max(1, len)))
    // The binaural beat drifts linearly toward its target; report it live.
    const beat = m.beat + (m.beat1 - m.beat) * x
    return {
      freq: m.root,
      label: `${m.root} Hz`,
      section: s.sectionAt(m, t),
      beat: Math.round(beat * 10) / 10,
    }
  }

  private emit() {
    const st = this.read()
    const key = `${st.freq}|${st.section}`
    if (key === this.last) return
    this.last = key
    this.onChange?.(st)
  }
}
