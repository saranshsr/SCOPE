import { useEffect, useRef, useState } from 'react'
import { AudioEngine, type SourceKind, type TrackInfo } from './audio/graph'
import { FingerprintTracker } from './audio/fingerprint'
import { BeatClock } from './audio/beat'
import { Scene } from './scope/scene'
import { playlist } from './data/tracks'
import { loadPeaks, peaksFromFile, energyAhead, type TrackPeaks } from './scope/peaks'
import { fetchAudiusRadio } from './audio/audius'
import { StemDeck, looksLikeStems, type StemInfo, type StemRole } from './audio/stems'
import { Decode } from './scope/Decode'

/**
 * scope — a polar oscilloscope made of type.
 *
 * One canvas carries the instrument (field → glyph pass). Everything around
 * it is DOM chrome in the reference's telemetry language: crosshair with the
 * playhead %, flickering band readouts, filename + waveform + sample
 * counters, and a live 24-bar spectrum. Chrome values are written straight
 * to the DOM from the frame loop — React state only handles mode changes.
 */

const SOURCE_ID: Record<SourceKind, string> = { radio: '[01]', file: '[02]', mic: '[03]', stems: '[04]' }

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waveRef = useRef<HTMLCanvasElement>(null)
  const specRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Live-text chrome, written imperatively at ~6Hz from the loop.
  const labelRef = useRef<HTMLSpanElement>(null)
  const bandRefs = useRef<(HTMLDivElement | null)[]>([])
  const pctTopRef = useRef<HTMLSpanElement>(null)
  const pctLeftRef = useRef<HTMLSpanElement>(null)
  const cElapsedRef = useRef<HTMLDataElement>(null)
  const cTotalRef = useRef<HTMLDataElement>(null)

  const [started, setStarted] = useState(false)
  const [track, setTrack] = useState<TrackInfo | null>(null)
  const [source, setSource] = useState<SourceKind>('radio')
  const [playing, setPlaying] = useState(false)
  // The announcement moment: each track change gets one big display-type
  // entrance before the title settles into the rail. Keyed so React restarts
  // the CSS animation per track.
  const [announce, setAnnounce] = useState<{ text: string; key: number } | null>(null)
  const [decoding, setDecoding] = useState(false)
  const [paused, setPaused] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [tuning, setTuning] = useState({ turb: 1, expo: 1, spin: 1 })
  const [rate, setRate] = useState(1)
  const [solo, setSolo] = useState<number | null>(null) // band index 0..23
  const soloRef = useRef<number | null>(null)
  const [ambient, setAmbient] = useState(false)
  const [stemInfo, setStemInfo] = useState<StemInfo[] | null>(null)
  const stemDeckRef = useRef<StemDeck | null>(null)
  const tuningRef = useRef(tuning)
  // signal/machine stats, written imperatively at chrome rate
  const bpmRef = useRef<HTMLElement>(null)
  const lockRef = useRef<HTMLElement>(null)
  const levelRef = useRef<HTMLDivElement>(null)
  const peakRef = useRef<HTMLElement>(null)
  const fpsRef = useRef<HTMLElement>(null)
  const ptsRef = useRef<HTMLElement>(null)
  const qRef = useRef<HTMLElement>(null)
  const bufRef = useRef<HTMLElement>(null)
  const zoomRef = useRef<HTMLElement>(null)
  const fltRef = useRef<HTMLElement>(null)
  const fltCellRef = useRef<HTMLDivElement>(null)
  const echoRef = useRef<HTMLElement>(null)
  const echoCellRef = useRef<HTMLDivElement>(null)
  const retLabelRef = useRef<HTMLSpanElement>(null)
  const sceneRef = useRef<Scene | null>(null)

  const engineRef = useRef<AudioEngine | null>(null)
  const startedRef = useRef(false)
  const appRef = useRef<HTMLDivElement>(null)
  const reticleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  // Full-track peaks for whatever is playing; generation counter guards
  // against a slow fetch landing after the track has already changed.
  const peaksRef = useRef<TrackPeaks | null>(null)
  const peaksGen = useRef(0)

  useEffect(() => {
    tuningRef.current = tuning
    sceneRef.current?.setTuning(tuning.turb, tuning.expo, tuning.spin)
  }, [tuning])

  useEffect(() => {
    const e = engineRef.current
    if (e) e.el.volume = volume
  }, [volume])

  useEffect(() => {
    const e = engineRef.current
    if (!e) return
    // Chopped-and-screwed honesty: rate bends pitch like vinyl, not like a
    // podcast app. The analyser hears the bent audio, so the whole visual
    // system follows for free. The engine owns it so track changes can't
    // silently reset it.
    e.rate = rate
  }, [rate])

  useEffect(() => {
    soloRef.current = solo
    const e = engineRef.current
    if (!e) return
    e.solo(solo == null ? null : Math.round(60 * Math.pow(12000 / 60, solo / 23)))
  }, [solo])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new AudioEngine()
    engineRef.current = engine
    engine.setPlaylist(playlist)
    // Radio priority: the owner's local library (dev machine only), then
    // the Audius trending stream (real released club music, legal to
    // stream and analyse), then the shipped permissive set as the offline
    // floor. Whichever resolves best before power-on wins.
    let radioTier = 0 // 0 shipped, 1 audius, 2 local
    void fetchAudiusRadio().then((list) => {
      if (list.length >= 8 && radioTier < 1 && engine.kind === 'radio' && !startedRef.current) {
        radioTier = 1
        engine.setPlaylist(list)
      }
    })
    void fetch(`${import.meta.env.BASE_URL}tracks-local/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((local: TrackInfo[] | null) => {
        if (local?.length && engine.kind === 'radio' && !startedRef.current) {
          radioTier = 2
          engine.setPlaylist(local)
        }
      })
      .catch(() => {})
    engine.onTrackChange = (tr) => {
      if (engine.kind !== 'stems' && stemDeckRef.current?.playing) {
        stemDeckRef.current.pause()
        setStemInfo(null)
        scene.setVocal(0)
      }
      setTrack(tr)
      setSource(engine.kind)
      if (startedRef.current && tr) {
        setAnnounce({ text: tr.title, key: Date.now() })
      }
      // Radio tracks ship with build-time peaks; files are decoded at drop
      // time by their own handlers; mic has no future to read. The file
      // case must NOT touch the generation counter — this announce fires
      // after the drop handler already started its decode, and bumping here
      // was discarding the legitimate result.
      if (engine.kind === 'file') return
      const gen = ++peaksGen.current
      peaksRef.current = null
      if (engine.kind === 'radio' && tr?.src) {
        void loadPeaks(tr.src).then((p) => {
          if (peaksGen.current === gen) peaksRef.current = p
        })
      }
    }
    if (import.meta.env.DEV) (window as unknown as { __eng: AudioEngine }).__eng = engine

    const scene = new Scene(canvas)
    sceneRef.current = scene
    const tracker = new FingerprintTracker()
    const beatClock = new BeatClock()

    let w = 0
    let h = 0
    // The disc centers in whatever space the rail leaves it: standby and
    // phones center on the viewport; the live desktop centers in the area
    // right of the 272px rail. Camera and DOM crosshair share one value.
    const RAIL = 272
    const focus = () => {
      const live = startedRef.current && w > 720
      const frac = live ? (RAIL + (w - RAIL) / 2) / w : 0.5
      scene.setFocus(frac)
      appRef.current?.style.setProperty('--cx', `${(frac * 100).toFixed(2)}%`)
    }
    ;(window as unknown as { __focus: () => void }).__focus = focus
    const measure = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      scene.resize(w, h)
      focus()
    }
    measure()
    window.addEventListener('resize', measure)

    // The reticle cursor — an instrument aims, it doesn't point. Eased
    // follow via transforms inside the existing frame loop (no extra rAF,
    // no layout properties). Touch devices never see it.
    const finePointer = matchMedia('(pointer: fine)').matches
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cur = { x: -100, y: -100, tx: -100, ty: -100, down: 0, overUi: false, dragging: false, lx: 0, ly: 0 }
    const onCurMove = (e: PointerEvent) => {
      cur.tx = e.clientX
      cur.ty = e.clientY
      cur.overUi = !!(e.target as Element | null)?.closest?.('.rail, .spec, .ctl-row, button, a, input')
      if (!reducedMotion) {
        // Hover aims the instrument (fine pointers only — touch has no
        // hover); a held pointer grabs and spins it on EVERY device.
        // Deltas are computed manually: iOS reports movementX as 0.
        if (finePointer) scene.setPointer(e.clientX / Math.max(1, w) - 0.5, e.clientY / Math.max(1, h) - 0.5)
        if (cur.dragging) {
          scene.dragBy((e.clientX - cur.lx) * 0.006, (e.clientY - cur.ly) * 0.004)
        }
        if (mix.on) {
          const eng2 = engineRef.current
          const c = centerPx()
          const rNow = Math.hypot(e.clientX - c.x, e.clientY - c.y)
          // radial: -1 (through the core) .. +1 (one radius out)
          const radial = Math.max(-1, Math.min(1.8, (rNow - mix.r0) / mix.r0))
          const db = radial < 0 ? radial * 30 : Math.min(1, radial) * 9
          mixState.eq = db
          if (eng2?.kind === 'stems' && stemDeckRef.current) {
            // TRUE stem control: quadrant by grab angle — drums low, bass
            // left, vocals top, melody right. Push in = real mute.
            const ang = Math.atan2(-(mix.sy - c.y), mix.sx - c.x) // y up
            const role: StemRole =
              ang > Math.PI * 0.25 && ang < Math.PI * 0.75 ? 'vocals'
              : ang < -Math.PI * 0.25 && ang > -Math.PI * 0.75 ? 'drums'
              : Math.abs(ang) >= Math.PI * 0.75 ? 'bass' : 'other'
            mix.stemRole = role
            stemDeckRef.current.setStemGain(role, radial < 0 ? 1 + radial : 1 + Math.min(1, radial))
          } else {
            eng2?.eq(mix.band, db)
          }
          const vis = radial < 0 ? 1 + radial * 0.95 : 1 + Math.min(1, radial) * 0.5
          scene.setEqVis(
            mix.band === 'low' ? vis : 1,
            mix.band === 'mid' ? vis : 1,
            mix.band === 'high' ? vis : 1,
          )
          // horizontal: the colour filter, latching
          mixState.sweep = Math.max(-1, Math.min(1, mix.sweep0 + (e.clientX - mix.sx) / (w * 0.3)))
          eng2?.sweep(mixState.sweep)
          // far pull: echo builds
          mix.echo = Math.max(0, Math.min(1, radial - 0.8))
          eng2?.echo(mix.echo)
          // the tendril follows the HAND — depth-plane projection never
          // misses, so pulled matter stretches out of the body with you
          const hand = scene.grabPlane((e.clientX / w) * 2 - 1, -(e.clientY / h) * 2 + 1)
          const bandIdx = mix.band === 'low' ? 0 : mix.band === 'mid' ? 1 : 2
          scene.setGrab(hand, 0.65 + Math.min(1.2, Math.abs(radial)) * 0.55, bandIdx)
          // live parameter at the reticle — the number rides your hand
          if (retLabelRef.current) {
            retLabelRef.current.textContent =
              mix.echo > 0.02
                ? `echo ${Math.round(mix.echo * 100)}%`
                : Math.abs(mixState.sweep) > 0.05 && Math.abs(e.movementX ?? 1) > Math.abs(e.movementY ?? 0)
                  ? `${mixState.sweep < 0 ? 'hp' : 'lp'} ${Math.round(Math.abs(mixState.sweep) * 100)}`
                  : mix.stemRole
                    ? `${mix.stemRole} ${radial < 0 ? Math.round((1 + radial) * 100) + '%' : '+' + Math.round(Math.min(1, radial) * 100) + '%'}`
                    : `${mix.band} ${db > 0 ? '+' : ''}${Math.round(db)}db`
          }
        }
      }
      cur.lx = e.clientX
      cur.ly = e.clientY
    }
    // THE MIX GESTURE. Grabbing the body manipulates the audio; grabbing
    // empty space spins, as before. One continuous drag drives:
    //   vertical grab-start zone  -> which EQ band you're holding
    //   radial pull out / push in -> boost / kill (momentary)
    //   horizontal travel         -> the colour filter sweep (latches)
    //   pulling FAR out           -> echo builds while held, rings out after
    const mix = { on: false, band: 'mid' as 'low' | 'mid' | 'high', stemRole: null as StemRole | null, sx: 0, sy: 0, r0: 1, sweep0: 0, echo: 0 }
    const mixState = { sweep: 0, eq: 0 }
    const centerPx = () => {
      const fracX = startedRef.current && w > 720 ? (272 + (w - 272) / 2) / w : 0.5
      return { x: fracX * w, y: h / 2 }
    }
    const onCurDown = (e: PointerEvent) => {
      cur.down = 1
      cur.lx = e.clientX
      cur.ly = e.clientY
      const overUi = !!(e.target as Element | null)?.closest?.('.rail, .spec, .ctl-row, button, a, input')
      if (overUi || !startedRef.current) return
      const hit = scene.bodyHit((e.clientX / w) * 2 - 1, -(e.clientY / h) * 2 + 1)
      if (hit && pts.size < 2) {
        mix.on = true
        mix.sx = e.clientX
        mix.sy = e.clientY
        mix.sweep0 = mixState.sweep
        const c = centerPx()
        mix.r0 = Math.max(40, Math.hypot(e.clientX - c.x, e.clientY - c.y))
        // Mixer truth: highs at the top of the column, lows at the bottom.
        const bodyTopPx = c.y - mix.r0
        const rel = (e.clientY - bodyTopPx) / (2 * mix.r0)
        mix.band = rel < 0.34 ? 'high' : rel < 0.66 ? 'mid' : 'low'
        appRef.current?.classList.add('mixing')
        scene.setGrab(hit, 0.6, mix.band === 'low' ? 0 : mix.band === 'mid' ? 1 : 2)
      } else {
        cur.dragging = true
        appRef.current?.classList.add('grabbing')
      }
    }
    const onCurUp = () => {
      cur.dragging = false
      appRef.current?.classList.remove('grabbing')
      if (mix.on) {
        mix.on = false
        appRef.current?.classList.remove('mixing')
        const eng2 = engineRef.current
        // Momentary: the EQ springs back flat; the echo loop drains itself;
        // the sweep LATCHES like the knob it is. A held stem returns home.
        if (mix.stemRole && stemDeckRef.current) stemDeckRef.current.setStemGain(mix.stemRole, 1)
        mix.stemRole = null
        eng2?.eq(mix.band, 0)
        eng2?.echo(0)
        scene.setGrab(null, 0)
        scene.setEqVis(1, 1, 1)
        mixState.eq = 0
        if (retLabelRef.current) retLabelRef.current.textContent = ''
      }
    }
    window.addEventListener('pointermove', onCurMove)
    window.addEventListener('pointerdown', onCurDown)
    window.addEventListener('pointerup', onCurUp)
    window.addEventListener('pointercancel', onCurUp)

    // The grid sweeps ride the music: Web Animations playbackRate is the
    // one dial that changes a running CSS animation's speed without a jump.
    const perf = { ema: 0.016, cool: 3, q: 1 }
    let lineAnims: Animation[] = []
    const collectAnims = () => {
      lineAnims = []
      gridRef.current?.querySelectorAll('.gl-v, .gl-h').forEach((el) => {
        lineAnims.push(...el.getAnimations())
      })
    }
    setTimeout(collectAnims, 200)

    // rms history for the scrolling waveform strip.
    const wave = new Float32Array(220)
    let waveHead = 0

    let beatPulse = 0
    // The transient fast-path: instant attack on spectral-flux onsets,
    // ~150ms decay. Deliberately NOT a spring — snap must not be smoothed.
    let snapEnv = 0
    let drumPrev = 0
    let raf = 0
    let prev = performance.now()
    let chromeAcc = 0

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now

      const f = engine.analyser.update(dt)
      const t = engine.analyser.now
      const fp = tracker.update(f, engine.analyser.onsets, t, dt)
      const beat = beatClock.update(f, fp, t, dt)
      if (f.onset) {
        snapEnv = 1
        scene.onset()
      }
      snapEnv *= Math.exp(-dt * 9)
      scene.setBands(f.bands)
      if (fp.tempoConfidence > 0.2 && fp.tempo > 0) engine.setEchoTime(60 / fp.tempo * (fp.tempo > 140 ? 1 : 0.75))
      if (beat.trigger) {
        beatPulse = Math.max(beatPulse, 0.4 + beat.strength * 0.6)
        // The star erupts on real hits — the lifecycle layer.
        if (startedRef.current && beat.strength > 0.25) scene.burst(beat.strength)
      }
      beatPulse *= Math.exp(-dt * 5)

      // Stem voices: each part drives its own visual organ. The mix bus
      // already feeds the analyser (anatomy/spectrum/beats keep working);
      // these are the per-stem additions.
      const deckNow = stemDeckRef.current
      if (engine.kind === 'stems' && deckNow?.playing) {
        const infos = deckNow.info()
        let vocal = 0, drums = 0
        for (const s of infos) {
          if (s.role === 'vocals') vocal = Math.max(vocal, s.level)
          if (s.role === 'drums') drums = Math.max(drums, s.level)
        }
        scene.setVocal(Math.min(1.4, vocal * 4))
        // Drum-gated eruption: far tighter than full-mix onset detection.
        if (drums > 0.3 && drums > drumPrev * 1.6) {
          scene.burst(Math.min(1, drums * 1.6))
          snapEnv = 1
        }
        drumPrev = drums * 0.7 + drumPrev * 0.3
      } else if (engine.kind !== 'stems') {
        scene.setVocal(0)
      }

      // Anticipation: mean energy of the next 8 seconds, from the peaks.
      const elNow = engine.el
      const progress =
        engine.kind === 'stems' && stemDeckRef.current
          ? stemDeckRef.current.currentTime() / Math.max(1, stemDeckRef.current.duration)
          : elNow.duration > 0
            ? elNow.currentTime / elNow.duration
            : 0
      const ahead = peaksRef.current ? energyAhead(peaksRef.current, progress, 8) : 0

      // Idle (pre-start) the instrument still breathes, barely — a machine
      // on standby, not a screenshot.
      scene.render(dt, f.low, f.mid, f.high, beatPulse, ahead, snapEnv)

      wave[waveHead] = f.rms
      waveHead = (waveHead + 1) % wave.length

      // Reticle follow: eased transform, press pulse decays like the tube.
      if (finePointer && reticleRef.current) {
        cur.x += (cur.tx - cur.x) * Math.min(1, dt * 14)
        cur.y += (cur.ty - cur.y) * Math.min(1, dt * 14)
        cur.down *= Math.exp(-dt * 7)
        const sc = 1 + cur.down * 0.5
        reticleRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%) scale(${sc})`
        reticleRef.current.style.opacity = cur.overUi ? '0' : '1'
      }

      // Self-profiler: a slow EMA of real frame time. Two seconds of
      // sustained >24ms and the scene sheds half its particles and the
      // retina buffer; it climbs back only if the device proves fast.
      // Only measured while visible — hidden tabs report garbage timing.
      if (document.visibilityState === 'visible' && startedRef.current) {
        perf.ema += (dt - perf.ema) * 0.02
        perf.cool -= dt
        if (perf.cool <= 0) {
          if (perf.ema > 0.024 && perf.q > 0.55) {
            perf.q = 0.55
            scene.setQuality(perf.q)
            perf.cool = 5
          } else if (perf.ema < 0.014 && perf.q < 1) {
            perf.q = 1
            scene.setQuality(perf.q)
            perf.cool = 5
          }
        }
      }

      // Sweep rate follows the energy; beats flash the whole layer briefly.
      if (gridRef.current) {
        const rate = 0.8 + f.low * 2.6 + beatPulse * 2.2
        for (const a of lineAnims) a.playbackRate = rate
        gridRef.current.style.opacity = String(Math.min(1, 0.8 + beatPulse * 0.5))
      }

      chromeAcc += dt
      if (chromeAcc > 0.16) {
        chromeAcc = 0
        drawWave(waveRef.current, wave, waveHead, peaksRef.current, progress)
        drawSpectrum(specRef.current, f.bands, soloRef.current, mix.on ? mix.band : null, mixState.eq)
        const el = engine.el
        const pct = el.duration > 0 ? (el.currentTime / el.duration) * 100 : 0
        const pctText = `${pct.toFixed(1)}%`
        if (pctTopRef.current) pctTopRef.current.textContent = pctText
        if (pctLeftRef.current) pctLeftRef.current.textContent = pctText
        if (labelRef.current)
          labelRef.current.textContent = `tracking ${(94 + fp.tempoConfidence * 5.9).toFixed(2)}%`
        // signal block
        if (bpmRef.current)
          bpmRef.current.textContent = fp.tempoConfidence > 0.12 ? `${Math.round(fp.tempo)}` : '——'
        if (lockRef.current)
          lockRef.current.textContent = `${Math.round(Math.min(1, fp.tempoConfidence) * 100)}%`
        if (levelRef.current)
          levelRef.current.style.width = `${Math.min(100, Math.round(f.rms * 240))}%`
        if (peakRef.current) {
          let pk = 0
          for (let i = 1; i < 24; i++) if (f.bands[i] > f.bands[pk]) pk = i
          const hz = Math.round(60 * Math.pow(12000 / 60, pk / 23))
          peakRef.current.textContent = hz >= 1000 ? `${(hz / 1000).toFixed(1)}k` : `${hz}`
        }
        // machine block
        if (fpsRef.current) fpsRef.current.textContent = `${Math.min(120, Math.round(1 / Math.max(1e-3, perf.ema)))}`
        if (ptsRef.current)
          ptsRef.current.textContent = `${Math.round((108000 * (scene.densityNow) + 2600 + 3600) / 1000)}k`
        if (qRef.current) qRef.current.textContent = perf.q < 1 ? 'reduced' : 'full'
        setPaused(engine.kind === 'stems' ? !(stemDeckRef.current?.playing ?? false) : (engineRef.current?.el.paused ?? false))
        if (engine.kind === 'stems' && stemDeckRef.current) setStemInfo(stemDeckRef.current.info())
        if (zoomRef.current) zoomRef.current.textContent = `${scene.zoomLevel.toFixed(1)}×`
        if (fltRef.current && fltCellRef.current) {
          const sv = mixState.sweep
          fltRef.current.textContent = Math.abs(sv) < 0.04 ? '——' : `${sv < 0 ? 'hp' : 'lp'} ${Math.round(Math.abs(sv) * 100)}`
          fltCellRef.current.classList.toggle('armed', Math.abs(sv) >= 0.04)
        }
        if (echoRef.current && echoCellRef.current) {
          echoRef.current.textContent = `${Math.round(mix.echo * 100)}%`
          echoCellRef.current.classList.toggle('armed', mix.echo > 0.02)
        }
        if (bufRef.current) {
          const c = canvas as HTMLCanvasElement
          bufRef.current.textContent = `${c.width}×${c.height}`
        }
        // a..e — five live band levels; rows flicker in and out like the
        // reference (each row has its own visibility cycle).
        for (let i = 0; i < 5; i++) {
          const el2 = bandRefs.current[i]
          if (!el2) continue
          const v = Math.round(f.bands[Math.min(23, i * 5 + 2)] * 99)
          el2.textContent = `${'abcde'[i]} :: ${v}`
          el2.style.opacity = Math.sin(t * (0.7 + i * 0.31) + i * 2.1) > -0.35 ? '1' : '0'
        }
        if (startedRef.current && el.duration > 0) {
          if (cElapsedRef.current)
            cElapsedRef.current.textContent = `· ${Math.round(el.currentTime * 44100).toLocaleString('en-US').replace(/,/g, '')}`
          if (cTotalRef.current)
            cTotalRef.current.textContent = `· ${Math.round(el.duration * 44100).toLocaleString('en-US').replace(/,/g, '')}`
        }
        setPlaying(engine.playing)
      }
    }
    raf = requestAnimationFrame(frame)

    // Drop a track anywhere — the browser default would eat the session.
    const onDragOver = (e: DragEvent) => e.preventDefault()
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      const all = [...(e.dataTransfer?.files ?? [])].filter((f) => /^(audio|video)\//.test(f.type))
      // Several stems dropped together = the stem deck takes the stage.
      if (all.length >= 2 && looksLikeStems(all)) {
        startedRef.current = true
        setStarted(true)
        focus()
        scene.powerOn()
        engine.unlock()
        const deck = stemDeckRef.current ?? new StemDeck(engine.ctx, engine.busHead)
        stemDeckRef.current = deck
        setDecoding(true)
        void deck.load(all).then(() => {
          engine.enterStems(`stem deck · ${all.length} stems`)
          deck.play(0)
          const p = deck.peaks()
          peaksRef.current = { amp: p.amp, secondsPerPixel: p.secondsPerPixel }
          setDecoding(false)
          setStemInfo(deck.info())
        })
        return
      }
      const file = all[0]
      if (!file) return
      startedRef.current = true
      setStarted(true)
      focus()
      scene.powerOn()
      engine.unlock()
      void engine.playFile(file)
      const gen = ++peaksGen.current
      setDecoding(true)
      void peaksFromFile(file, engine.ctx).then((p) => {
        if (peaksGen.current === gen) {
          peaksRef.current = p
          setDecoding(false)
        }
      })
    }
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('drop', onDrop)

    // The console is playable: every control has a key. Never hijacks a
    // focused input (sliders keep their native arrow behavior).
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element)?.tagName === 'INPUT') return
      if (!startedRef.current) {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault()
          ;(document.querySelector('.power') as HTMLButtonElement | null)?.click()
        }
        return
      }
      const eng = engineRef.current
      if (!eng) return
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          if (eng.kind !== 'mic') (eng.el.paused ? void eng.el.play() : eng.el.pause())
          break
        case 'KeyN':
          if (eng.kind === 'radio') void eng.next()
          else if (eng.kind === 'file') void eng.playRadio()
          break
        case 'ArrowRight':
        case 'ArrowLeft': {
          e.preventDefault()
          const el = eng.el
          if (isFinite(el.duration) && el.duration > 0)
            el.currentTime = Math.max(0, Math.min(el.duration, el.currentTime + (e.code === 'ArrowRight' ? 5 : -5)))
          break
        }
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault()
          setVolume((v) => Math.max(0, Math.min(1, v + (e.code === 'ArrowUp' ? 0.05 : -0.05))))
          break
        case 'Digit1': setTuning({ turb: 0.6, expo: 0.8, spin: 0.5 }); break
        case 'Digit2': setTuning({ turb: 1, expo: 1, spin: 1 }); break
        case 'Digit3': setTuning({ turb: 1.6, expo: 1.3, spin: 1.8 }); break
        case 'KeyR': void eng.playRadio(); break
        case 'KeyF': fileRef.current?.click(); break
        case 'KeyM': void eng.useMic(); break
        case 'KeyH': setAmbient((a) => !a); break
        case 'Equal':
        case 'NumpadAdd': sceneRef.current?.zoomBy(1.25); break
        case 'Minus':
        case 'NumpadSubtract': sceneRef.current?.zoomBy(1 / 1.25); break
        case 'Digit0': sceneRef.current?.setZoom(1); break
      }
    }
    window.addEventListener('keydown', onKey)

    // --- zoom: wheel on desktop, pinch on touch -------------------------
    const onWheel = (e: WheelEvent) => {
      if ((e.target as Element)?.closest?.('.rail, .spec')) return
      e.preventDefault()
      scene.zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12)
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    // Two-finger pinch: track the live pointers and ride the distance ratio.
    const pts = new Map<number, { x: number; y: number }>()
    let pinchDist = 0
    const pinchDown = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.('.rail, .spec')) return
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pts.size === 2) {
        const [a, b] = [...pts.values()]
        pinchDist = Math.hypot(a.x - b.x, a.y - b.y)
      }
    }
    const pinchMove = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pts.size !== 2) return
      const [a, b] = [...pts.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (pinchDist > 0 && d > 0) scene.zoomBy(d / pinchDist)
      pinchDist = d
    }
    const pinchUp = (e: PointerEvent) => {
      pts.delete(e.pointerId)
      if (pts.size < 2) pinchDist = 0
    }
    window.addEventListener('pointerdown', pinchDown)
    window.addEventListener('pointermove', pinchMove)
    window.addEventListener('pointerup', pinchUp)
    window.addEventListener('pointercancel', pinchUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointerdown', pinchDown)
      window.removeEventListener('pointermove', pinchMove)
      window.removeEventListener('pointerup', pinchUp)
      window.removeEventListener('pointercancel', pinchUp)
      window.removeEventListener('pointermove', onCurMove)
      window.removeEventListener('pointerdown', onCurDown)
      window.removeEventListener('pointerup', onCurUp)
      window.removeEventListener('pointercancel', onCurUp)
    }
  }, [])

  const power = () => {
    if (startedRef.current) return
    startedRef.current = true
    setStarted(true)
    ;(window as unknown as { __focus: () => void }).__focus()
    sceneRef.current?.powerOn()
    void engineRef.current?.playRadio()
  }

  const name = decoding
    ? 'DECODING ///'
    : track
      ? `${track.title.toUpperCase().slice(0, 26)}${source === 'file' ? '.MP3' : ''}`
      : 'NO CARRIER'

  return (
    <div ref={appRef} className={`app${started ? ' live' : ''}${ambient ? ' ambient' : ''}`} onClick={started ? undefined : power}>
      <canvas ref={canvasRef} className="stage" />
      {/* The survey grid, alive: a pulse of light travels along each line
          (the GridLines component's technique — background-position on a
          long gradient, staggered per line, compositor-only). */}
      <div ref={gridRef} className="gridlayer" aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => (
          <i key={`v${i}`} className="gl-v" style={{ left: `${((i + 1) / 16) * 100}%`, '--i': i } as React.CSSProperties} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <i key={`h${i}`} className="gl-h" style={{ top: `${((i + 1) / 9) * 100}%`, '--i': i + 4 } as React.CSSProperties} />
        ))}
      </div>
      {/* measuring chrome: tick rulers on the stage edges, hazard strip at
          the frame's foot — the skill's technical assets, kept quiet. */}
      <div className="ruler-x" aria-hidden="true">
        <span>020</span><span>040</span><span>060</span><span>080</span>
      </div>
      <div className="ruler-y" aria-hidden="true" />
      <div className="hazard" aria-hidden="true" />

      <div ref={reticleRef} className="reticle" aria-hidden="true">
        <i className="ret-h" /><i className="ret-v" /><i className="ret-dot" />
        <span ref={retLabelRef} className="ret-label" />
      </div>

      {/* crosshair — full frame, playhead % in red at each axis head */}
      <div className="x-v" />
      <div className="x-h" />
      <span ref={pctTopRef} className="x-tag x-tag-top">0.0%</span>
      <span ref={pctLeftRef} className="x-tag x-tag-left">0.0%</span>

      {/* the instrument's bracket frame */}
      <div className="frame">
        <i className="tick tl" /><i className="tick tr" /><i className="tick bl" /><i className="tick br" />
        {!started && (
          <output className="readout">
            <span ref={labelRef} className="ro-label">tracking 94.00%</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} ref={(el) => { bandRefs.current[i] = el }} className="ro-band" />
            ))}
          </output>
        )}
        <span className="frame-dash" />
      </div>

      {/* top-right: the title block — an engineering drawing's data plate,
          1px grid-gap dividers, real values only. */}
      <dl className="titleblock">
        <div><dt>src</dt><dd>{SOURCE_ID[source]} <i className={`src-dot${playing ? ' live' : ''}`} /></dd></div>
        {/* Non-default state is never silent: a forgotten rate or an armed
            solo makes the audio sound wrong, so the plate says so in red. */}
        <div className={rate !== 1 ? 'armed' : ''}><dt>rate</dt><dd>{rate.toFixed(2)}×</dd></div>
        <div className={solo != null ? 'armed' : ''}>
          <dt>solo</dt>
          <dd>{solo == null ? 'off' : (() => { const hz = Math.round(60 * Math.pow(200, solo / 23)); return hz >= 1000 ? `${(hz / 1000).toFixed(1)}k` : `${hz}` })()}</dd>
        </div>
        <div><dt>cal</dt><dd>44.1K</dd></div>
        <div><dt>fft</dt><dd>2048</dd></div>
      </dl>

      {/* §3.1 macro-typography: the standby poster. A viewport-bleeding
          structural wordmark against calculated negative space — the skill's
          bimodal law: poster when idle, dense telemetry when live. */}
      {!started && (
        <header className="macro">
          <div className="macro-unit">
            <span className="barcode" aria-hidden="true" /> UNIT D-01 · REV 2.6 · CH 01
          </div>
          <h1 className="macro-name">
            scope<span className="macro-reg">®</span>
          </h1>
          <p className="macro-sub"><Decode text="polar audio instrument /// drop a track anywhere" duration={1100} /></p>
        </header>
      )}

      {/* THE CONSOLE RAIL — the live state's spine. One engineered column
          instead of four floating corners: brand plate, tracking readout,
          source switch, and the transport deck pinned at its foot. Children
          cascade in on boot via --i indexed delays. */}
      {started && (
        <aside className="rail">
          <div className="rail-brand" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="rail-word">scope<span className="rail-reg">®</span></span>
            <span className="barcode barcode-s" aria-hidden="true" />
          </div>

          <output className="readout rail-sec" style={{ '--i': 1 } as React.CSSProperties}>
            <span ref={labelRef} className="ro-label">tracking 94.00%</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} ref={(el) => { bandRefs.current[i] = el }} className="ro-band" />
            ))}
          </output>

          {/* SIGNAL / MACHINE — real values only, grid-gap hairlines. */}
          <dl className="statgrid rail-sec" style={{ '--i': 2 } as React.CSSProperties}>
            <div><dt>bpm</dt><dd ref={bpmRef}>——</dd></div>
            <div><dt>lock</dt><dd ref={lockRef}>0%</dd></div>
            <div><dt>peak</dt><dd ref={peakRef}>——</dd></div>
            <div><dt>fps</dt><dd ref={fpsRef}>60</dd></div>
            <div><dt>pts</dt><dd ref={ptsRef}>64k</dd></div>
            <div><dt>quality</dt><dd ref={qRef}>full</dd></div>
            <div><dt>zoom</dt><dd ref={zoomRef}>1.0×</dd></div>
            <div ref={fltCellRef}><dt>flt</dt><dd ref={fltRef}>——</dd></div>
            <div ref={echoCellRef}><dt>echo</dt><dd ref={echoRef}>0%</dd></div>
          </dl>
          <div className="level rail-sec" style={{ '--i': 2 } as React.CSSProperties}>
            <span className="level-tag">level</span>
            <div className="level-track"><div ref={levelRef} className="level-fill" /></div>
          </div>

          <nav className="rail-src rail-sec" style={{ '--i': 3 } as React.CSSProperties}>
            <button className={source === 'radio' ? 'on' : ''} onClick={() => void engineRef.current?.playRadio()}>
              <Decode text="radio" duration={380} replayOnHover />
            </button>
            <button className={source === 'file' ? 'on' : ''} onClick={() => fileRef.current?.click()}>
              <Decode text="file" duration={380} replayOnHover />
            </button>
            <button className={source === 'mic' ? 'on' : ''} onClick={() => void engineRef.current?.useMic()}>
              <Decode text="mic" duration={380} replayOnHover />
            </button>
          </nav>

          {/* transport + volume — never a dead control: mic has no element
              to pause or fade, so the row yields to the source switch; a
              file's 'skip' can only mean back to the radio, so it says so. */}
          {source !== 'mic' && (
            <div className="transport rail-sec" style={{ '--i': 4 } as React.CSSProperties}>
              <button
                onClick={() => {
                  const e = engineRef.current
                  if (!e) return
                  if (e.kind === 'stems') {
                    const d = stemDeckRef.current
                    if (d) d.playing ? d.pause() : d.play()
                    return
                  }
                  if (e.el.paused) void e.el.play()
                  else e.el.pause()
                }}
              >
                <Decode text={paused ? 'play' : 'pause'} duration={300} replayOnHover />
              </button>
              <button
                onClick={() => {
                  const e = engineRef.current
                  if (!e) return
                  if (e.kind === 'radio') void e.next()
                  else void e.playRadio()
                }}
              >
                <Decode text={source === 'file' ? 'radio' : 'skip'} duration={300} replayOnHover />
              </button>
              <div className="vol">
                <span>vol</span>
                <input
                  type="range" min={0} max={1} step={0.01} value={volume}
                  onChange={(ev) => setVolume(Number(ev.target.value))}
                  aria-label="volume"
                />
              </div>
            </div>
          )}

          {/* response tuning — the instrument's own dials */}
          <div className="tuning rail-sec" style={{ '--i': 5 } as React.CSSProperties}>
            <label className="dial">
              <span>rate</span>
              <input
                type="range" min={0.5} max={1.5} step={0.01} value={rate}
                onChange={(ev) => setRate(Number(ev.target.value))}
                onDoubleClick={() => setRate(1)}
                aria-label="playback rate"
              />
              <data>{Math.round(rate * 100)}</data>
            </label>
            {([['turb', 'turbulence'], ['expo', 'exposure'], ['spin', 'spin']] as const).map(([k, label]) => (
              <label key={k} className="dial">
                <span>{label}</span>
                <input
                  type="range" min={0.25} max={2} step={0.05} value={tuning[k]}
                  onChange={(ev) => setTuning((t) => ({ ...t, [k]: Number(ev.target.value) }))}
                  aria-label={label}
                />
                <data>{Math.round(tuning[k] * 100)}</data>
              </label>
            ))}
            <div className="presets">
              {([['calm', { turb: 0.6, expo: 0.8, spin: 0.5 }], ['std', { turb: 1, expo: 1, spin: 1 }], ['violent', { turb: 1.6, expo: 1.3, spin: 1.8 }]] as const).map(([name, t]) => (
                <button key={name} onClick={() => setTuning(t)}>
                  <Decode text={name} duration={300} replayOnHover />
                </button>
              ))}
            </div>
          </div>

          {/* the stem strips — each separated part, its live level, one-tap
              mute. Only exists while the deck holds stems. */}
          {source === 'stems' && stemInfo && (
            <div className="stemstrip rail-sec" style={{ '--i': 5 } as React.CSSProperties}>
              {stemInfo.map((s, i) => (
                <button
                  key={i}
                  className={`stem${s.muted ? ' stem-muted' : ''}`}
                  onClick={() => {
                    stemDeckRef.current?.toggleMute(i)
                    setStemInfo(stemDeckRef.current?.info() ?? null)
                  }}
                >
                  <span className="stem-role">{s.role}</span>
                  <span className="stem-bar"><i style={{ width: `${Math.min(100, s.level * 260)}%` }} /></span>
                  <span className="stem-ms">{s.muted ? 'muted' : 'live'}</span>
                </button>
              ))}
            </div>
          )}

          <div className="rail-foot rail-sec" style={{ '--i': 6 } as React.CSSProperties}>
            <samp className="deck-name"><Decode text={name} duration={700} /></samp>
            <canvas
              ref={waveRef}
              className="deck-wave"
              width={464}
              height={104}
              onPointerDown={(e) => {
                // The full-track strip is a scrubber, when there IS a track.
                const r = e.currentTarget.getBoundingClientRect()
                const frac = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
                const eng = engineRef.current
                if (eng?.kind === 'stems' && stemDeckRef.current) {
                  stemDeckRef.current.seek(frac * stemDeckRef.current.duration)
                  return
                }
                const el = eng?.el
                if (!el || !isFinite(el.duration) || el.duration <= 0) return
                el.currentTime = frac * el.duration
              }}
            />
            <div className="deck-counts">
              <data ref={cElapsedRef}>· 0</data>
              <data ref={cTotalRef}>· 0</data>
            </div>
            {source !== 'stems' && (
              <span className="stemhint">have stems? drop them together (vocals·drums·bass) — split any track locally with stemdeck</span>
            )}
            <kbd className="keyline">grab the orb: pull=eq · across=filter · far=echo · spc pause · n skip · ←→ seek · ↑↓ vol · 1-3 preset · r/f/m src · h hide · +/-/0 zoom</kbd>
          </div>
        </aside>
      )}

      {/* THE ANNOUNCEMENT — every track change earns one display-scale
          moment before the title settles into the rail. */}
      {started && announce && (
        <div key={announce.key} className="announce" aria-hidden="true">
          <span className="announce-title">
            {/* Filename-derived titles run long; the announcement is a
                headline, not a paragraph. */}
            <Decode text={announce.text.toUpperCase().slice(0, 28)} duration={900} />
          </span>
        </div>
      )}

      {/* bottom-right: spectrum */}
      {started && (
      <div className="spec">
        <div className="spec-label">
          <Decode text={solo == null ? 'spectrum · tap a band to solo' : `solo ${(() => { const hz = Math.round(60 * Math.pow(200, solo / 23)); return hz >= 1000 ? `${(hz / 1000).toFixed(1)}k` : hz })()} · tap to release`} duration={400} />
        </div>
        <canvas
          ref={specRef}
          width={400}
          height={144}
          className="spec-play"
          onPointerDown={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            const band = Math.max(0, Math.min(23, Math.floor(((e.clientX - r.left) / r.width) * 24)))
            setSolo((s) => (s === band ? null : band))
          }}
        />
        <div className="spec-hz">
          <span>60</span><span>250</span><span>1k</span><span>4k</span><span>12k</span>
        </div>
      </div>
      )}

      {/* standby: one action. Sources moved into the rail when live. */}
      {!started && (
        <div className="ctl-row">
          <button className="power" onClick={power}>
            [ <Decode text="click to power on" duration={520} replayOnHover /> ]
          </button>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            startedRef.current = true
            setStarted(true)
            ;(window as unknown as { __focus: () => void }).__focus()
            sceneRef.current?.powerOn()
            const eng = engineRef.current
            if (eng) {
              void eng.playFile(file)
              const gen = ++peaksGen.current
              setDecoding(true)
              void peaksFromFile(file, eng.ctx).then((p) => {
                if (peaksGen.current === gen) {
                  peaksRef.current = p
                  setDecoding(false)
                }
              })
            }
          }
          e.target.value = ''
        }}
      />

      <div className="scanlines" />
      <div className="grain" />
    </div>
  )
}

/**
 * The deck strip. With peaks: the WHOLE track's waveform, played portion at
 * full ink, the future dimmed, a red playhead sweeping through — you can see
 * the drop coming. Without peaks (mic): the live rms history scroll.
 */
function drawWave(
  cv: HTMLCanvasElement | null,
  wave: Float32Array,
  head: number,
  peaks: TrackPeaks | null,
  progress: number,
) {
  const g = cv?.getContext('2d')
  if (!cv || !g) return
  g.clearRect(0, 0, cv.width, cv.height)

  if (peaks && peaks.amp.length > 0) {
    const W = cv.width
    const H = cv.height
    const mid = H / 2
    const n = peaks.amp.length
    const px = Math.floor(progress * W)
    for (let x = 0; x < W; x++) {
      // Max over this column's slice of the overview.
      const i0 = Math.floor((x / W) * n)
      const i1 = Math.max(i0 + 1, Math.floor(((x + 1) / W) * n))
      let a = 0
      for (let i = i0; i < i1; i++) if (peaks.amp[i] > a) a = peaks.amp[i]
      const hh = Math.max(0.75, a * (H / 2 - 2))
      g.fillStyle = x <= px ? 'rgba(234,234,234,0.92)' : 'rgba(234,234,234,0.28)'
      g.fillRect(x, mid - hh, 1, hh * 2)
    }
    // The playhead — the same red as the crosshair tags; one instrument.
    // 2 buffer px = 1 CSS px on the retina buffer.
    g.fillStyle = '#ff2a2a'
    g.fillRect(px, 0, 2, H)
    return
  }

  g.strokeStyle = 'rgba(234,234,234,0.85)'
  g.lineWidth = 2
  g.beginPath()
  const n = wave.length
  for (let i = 0; i < n; i++) {
    const v = wave[(head + i) % n]
    const x = (i / (n - 1)) * cv.width
    const y = cv.height - 2 - v * (cv.height - 6)
    if (i === 0) g.moveTo(x, y)
    else g.lineTo(x, y)
  }
  g.stroke()
}

/** 24 log-band bars with hanging peak caps, like the reference analyzer.
 *  Bars display an EASED value — raw analyser bins strobe; the reference's
 *  gauges glide. */
const peaks = new Float32Array(24)
const shown = new Float32Array(24)
function drawSpectrum(
  cv: HTMLCanvasElement | null,
  bands: Float32Array,
  solo: number | null = null,
  mixBand: 'low' | 'mid' | 'high' | null = null,
  mixDb = 0,
) {
  const g = cv?.getContext('2d')
  if (!cv || !g) return
  g.clearRect(0, 0, cv.width, cv.height)
  const n = bands.length
  const bw = cv.width / n
  for (let i = 0; i < n; i++) {
    const raw = Math.min(1, bands[i] * 1.25)
    // Fast up, slow down — VU-meter ballistics.
    shown[i] += (raw - shown[i]) * (raw > shown[i] ? 0.55 : 0.18)
    const v = shown[i]
    peaks[i] = Math.max(v, peaks[i] - 0.012)
    const bh = v * (cv.height - 4)
    g.fillStyle = 'rgba(234,234,234,0.88)'
    // The armed band burns red; its neighbours dim to show the cut.
    if (solo != null) g.fillStyle = i === solo ? '#ff2a2a' : 'rgba(234,234,234,0.25)'
    // The HELD EQ range tints red while you bend it — the analytical view
    // agreeing with the sculptural one.
    if (mixBand != null) {
      const inBand = mixBand === 'low' ? i < 8 : mixBand === 'mid' ? i >= 8 && i < 16 : i >= 16
      if (inBand) g.fillStyle = `rgba(255,42,42,${0.45 + Math.min(0.55, Math.abs(mixDb) / 30)})`
    }
    g.fillRect(i * bw + 1, cv.height - bh, bw - 2, bh)
    // hanging peak cap — dimmer, falls slowly
    const py = cv.height - peaks[i] * (cv.height - 4)
    g.fillStyle = 'rgba(234,234,234,0.35)'
    g.fillRect(i * bw + 1, py - 2, bw - 2, 2)
  }
}
