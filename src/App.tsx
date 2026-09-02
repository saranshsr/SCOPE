import { useEffect, useRef, useState } from 'react'
import { AudioEngine, type SourceKind, type TrackInfo } from './audio/graph'
import { FingerprintTracker } from './audio/fingerprint'
import { BeatClock } from './audio/beat'
import { Scene } from './scope/scene'
import { playlist } from './data/tracks'
import { loadPeaks, peaksFromFile, energyAhead, type TrackPeaks } from './scope/peaks'
import { fetchAudiusRadio, fetchVibe } from './audio/audius'
import { StemDeck, looksLikeStems, type StemInfo, type StemRole } from './audio/stems'
import { Decode } from './scope/Decode'
import { Onboard, shouldOnboard, type TourOps } from './ui/Onboard'
import { Tube, HINDI, parseVideoId, type TubeState } from './audio/tube'
import { splitTrack, splitSelfTest, split7680Test, splitNeuralTest } from './audio/split'

/**
 * scope — a polar oscilloscope made of type.
 *
 * One canvas carries the instrument (field → glyph pass). Everything around
 * it is DOM chrome in the reference's telemetry language: crosshair with the
 * playhead %, flickering band readouts, filename + waveform + sample
 * counters, and a live 24-bar spectrum. Chrome values are written straight
 * to the DOM from the frame loop — React state only handles mode changes.
 */

const SOURCE_ID: Record<SourceKind, string> = { radio: '[01]', file: '[02]', mic: '[03]', stems: '[04]', tube: '[05]' }

/** Track time the way every player on earth writes it. */
const fmtTime = (s: number) => {
  if (!isFinite(s) || s < 0) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

/** A dissection tier — a stem (role) or an EQ band group, bottom-to-top. */
type Tier = { label: string; role?: StemRole; band?: 'low' | 'mid' | 'high' }

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waveRef = useRef<HTMLCanvasElement>(null)
  const specRef = useRef<HTMLCanvasElement>(null)
  const surveyRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Live-text chrome, written imperatively at ~6Hz from the loop.
  const labelRef = useRef<HTMLSpanElement>(null)
  const bandRefs = useRef<(HTMLDivElement | null)[]>([])
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
  const [muted, setMuted] = useState(false)
  const [diag, setDiag] = useState(false)
  const [tuning, setTuning] = useState({ turb: 1, expo: 1, spin: 1 })
  /** standby plate: the chain row being read, and its live motion strip */
  const [pathHover, setPathHover] = useState<string | null>(null)
  const posterWaveRef = useRef<HTMLCanvasElement | null>(null)
  /** jukebox: the YouTube player, and whether the star is listening */
  const tubeRef = useRef<Tube | null>(null)
  const tubeHostRef = useRef<HTMLDivElement>(null)
  const [tubeState, setTubeState] = useState<TubeState | null>(null)
  const [listening, setListening] = useState(false)
  /** What the captured stream is actually delivering — not what the browser
   *  said it granted. 'silent' is the common failure: chrome hands over a
   *  perfectly valid stream with no audio track content when the "also share
   *  tab audio" checkbox is missed, and nothing else on screen shows that. */
  const [signal, setSignal] = useState<'idle' | 'silent' | 'live'>('idle')
  const [tubePaste, setTubePaste] = useState('')
  /** read by the render loop, which must not close over tubeState */
  const tubePlayingRef = useRef(false)

  /** the power-on flight: 'rev' while the machine spins up, 'dive' going in */
  const [boot, setBoot] = useState<'rev' | 'dive' | null>(null)
  const bootRef = useRef<'rev' | 'dive' | null>(null)
  const bootRaf = useRef(0)
  const [rate, setRate] = useState(1)
  const [ambient, setAmbient] = useState(false)
  // THE VIBE: a prompt in, a playlist out — plus the instrument's honest
  // read of how it understood you.
  const [query, setQuery] = useState('')
  const [vibeRead, setVibeRead] = useState<string | null>(null)
  const [tuning2, setTuning2] = useState<'idle' | 'loading' | 'empty'>('idle')
  const [onboard, setOnboard] = useState(false)
  // SPLIT: the playing track being separated into stems, in-browser.
  const [splitState, setSplitState] = useState<string | null>(null)
  const splitGen = useRef(0)
  const stemDeckRef = useRef<StemDeck | null>(null)
  // THE LAYER ROWS — every ring's visible twin: name, live meter, level
  // slider, solo/mute. Nothing about the stack requires a hidden gesture.
  type LayerRow = { i: number; label: string; level: number; gain: number; muted: boolean; solo: boolean; hot: boolean }
  const [layerUi, setLayerUi] = useState<LayerRow[] | null>(null)
  const lastLayersRef = useRef<LayerRow[] | null>(null)
  // the effect owns tier state; split (component-level) arms it through here
  const stemsUiRef = useRef<{ arm: (infos: StemInfo[]) => void } | null>(null)
  // the tour drives the stack open/closed to point at features where they live
  const tourOpsRef = useRef<TourOps | null>(null)
  const tierCtlRef = useRef<{
    gain: (i: number, g: number) => void
    solo: (i: number) => void
    mute: (i: number) => void
    hover: (i: number) => void
  } | null>(null)
  const tuningRef = useRef(tuning)
  // signal/machine stats, written imperatively at chrome rate
  const bpmRef = useRef<HTMLElement>(null)
  /** the scrubber's announced position — written on the chrome tick */
  const [scrubPct, setScrubPct] = useState(0)
  const [scrubText, setScrubText] = useState('0:00')
  const levelRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLElement>(null)
  const fltRef = useRef<HTMLElement>(null)
  const echoRef = useRef<HTMLElement>(null)
  const sectRef = useRef<HTMLElement>(null)
  const diagRef = useRef<HTMLElement>(null)
  const retLabelRef = useRef<HTMLSpanElement>(null)
  const sceneRef = useRef<Scene | null>(null)
  // the frame loop closes over mount-time state, so the current track is
  // mirrored into a ref for the telemetry that needs it
  const trackRef = useRef<TrackInfo | null>(null)

  const engineRef = useRef<AudioEngine | null>(null)
  const startedRef = useRef(false)
  const appRef = useRef<HTMLDivElement>(null)
  const reticleRef = useRef<HTMLDivElement>(null)
  // Full-track peaks for whatever is playing; generation counter guards
  // against a slow fetch landing after the track has already changed.
  const peaksRef = useRef<TrackPeaks | null>(null)
  const peaksGen = useRef(0)

  useEffect(() => {
    tuningRef.current = tuning
    sceneRef.current?.setTuning(tuning.turb, tuning.expo, tuning.spin)
  }, [tuning])

  // The jukebox plate only exists while source === 'tube', so mounting is
  // driven by its presence rather than by the click that caused it —
  // otherwise the ref is still null when enterTube() runs.
  useEffect(() => {
    if (source !== 'tube' || !tubeHostRef.current || !tubeRef.current) return
    void tubeRef.current.mount(tubeHostRef.current)
  }, [source])

  // any input during the flight skips straight to the console: a cinematic
  // you cannot interrupt is a cinematic people learn to resent
  useEffect(() => {
    if (!boot) return
    const skip = () => endBoot()
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    return () => {
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boot])

  // the standby plate's texture strip, and the star's aim into its image
  // cell — both depend on the plate's measured layout, so they re-run on
  // resize and are torn down the moment the instrument powers on.
  useEffect(() => {
    if (started) return
    const hist = new Float32Array(240)
    let head = 0
    let raf = 0
    const tick = () => {
      const sc = sceneRef.current
      hist[head % hist.length] = sc ? sc.readMotion() : 0
      head++
      drawMotionStrip(posterWaveRef.current, hist, head)
      raf = requestAnimationFrame(tick)
    }
    const aim = () => {
      ;(window as unknown as { __focus?: (snap?: boolean) => void }).__focus?.(true)
    }
    aim()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', aim)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', aim)
    }
  }, [started])

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
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new AudioEngine()
    engineRef.current = engine
    if (import.meta.env.DEV) (window as unknown as { __scope?: unknown }).__scope = engine
    engine.setPlaylist(playlist)
    // Radio priority: the owner's local library (dev machine only), then
    // the Audius trending stream (real released club music, legal to
    // stream and analyse), then the shipped permissive set as the offline
    // floor. Whichever resolves best before power-on wins.
    let radioTier = 0 // 0 shipped, 1 audius, 2 local
    void fetchAudiusRadio(null).then((list) => {
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
        stemDeckRef.current.solo(null)
        scene.setVocal(0)
        applySpectralTiers()
      }
      setTrack(tr)
      trackRef.current = tr
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
    if (import.meta.env.DEV) {
      ;(window as unknown as { __eng: AudioEngine }).__eng = engine
      ;(window as unknown as { __splitTest: () => Promise<number> }).__splitTest = splitSelfTest
      ;(window as unknown as { __split7680: typeof split7680Test }).__split7680 = split7680Test
      ;(window as unknown as { __splitNeural: typeof splitNeuralTest }).__splitNeural = splitNeuralTest
    }

    const scene = new Scene(canvas)
    sceneRef.current = scene
    if (import.meta.env.DEV) (window as unknown as { __sc?: unknown }).__sc = scene
    const tracker = new FingerprintTracker()
    const beatClock = new BeatClock()

    let w = 0
    let h = 0
    // The disc centers in whatever space the rail leaves it: standby and
    // phones center on the viewport; the live desktop centers in the area
    // right of the rail. Camera and DOM crosshair share one value, and it
    // must stay in step with --rail-w in styles.css.
    const RAIL = 320
    /**
     * Standby aims the star into the poster's image cell (measured from the
     * DOM, so it stays right at every breakpoint); live returns it to the
     * space the rail leaves. Resizes snap, state changes glide.
     */
    const focus = (snap = false) => {
      const live = startedRef.current && w > 720
      let fx = live ? (RAIL + (w - RAIL) / 2) / w : 0.5
      let fy = 0.5
      let dolly = 1
      if (!startedRef.current) {
        const cell = document.querySelector('.pl-fig')
        if (cell && h > 0) {
          const r = cell.getBoundingClientRect()
          if (r.height > 40) {
            fx = (r.left + r.width / 2) / w
            fy = (r.top + r.height / 2) / h
            // fit the body inside the cell rather than cropping it
            dolly = Math.max(1, (h / r.height) * 0.92)
          }
        }
      }
      scene.setFocus(fx, fy, dolly, snap)
      appRef.current?.style.setProperty('--cx', `${(fx * 100).toFixed(2)}%`)
    }
    ;(window as unknown as { __focus: (snap?: boolean) => void }).__focus = focus
    const measure = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      scene.resize(w, h)
      if (surveyRef.current) {
        const dp = Math.min(2, window.devicePixelRatio || 1)
        surveyRef.current.width = w * dp
        surveyRef.current.height = h * dp
      }
      focus(true)
    }
    measure()
    window.addEventListener('resize', measure)

    // --- THE DISSECTION -----------------------------------------------------
    // Pull the orb apart along its axis and it shears into survey rings —
    // stems when the deck holds them, the spectral anatomy otherwise. Tiers
    // are bottom-to-top, frequency-honest.
    let tiers: Tier[] = [] // set by applySpectralTiers() below, before first use
    const tierLevels = new Float32Array(6)
    const sectMuted = new Set<number>() // latched tier kills
    let sectSolo = -1 // spectral tier solo (stem solo lives in the deck)
    // Latched row levels, 0..2 — the mixing desk the layer rows drive.
    // Gestures are momentary performance moves that return here.
    const rowGain = new Float32Array(6).fill(1)
    const dbOf = (g: number) => (g < 1 ? (g - 1) * 30 : (g - 1) * 9)
    // One resolver for the spectral tiers' whole mix state: each ring owns
    // a REAL peaking filter in the desk (altering the ring alters the
    // music), and mute/solo/level can never fight each other.
    const applySpectralMix = () => {
      const eng = engineRef.current
      if (!eng) return
      const killed = (i: number) => sectMuted.has(i) || (sectSolo >= 0 && sectSolo !== i)
      for (let i = 0; i < 6; i++) {
        const tr = tiers[i]
        eng.tierEq(i, tr && tr.band ? (killed(i) ? -30 : dbOf(rowGain[i])) : 0)
      }
      // closed-orb sector shading: a group collapses when all its tiers die
      const gVis = (b: 'low' | 'mid' | 'high') => {
        const idxs = tiers.map((t2, i) => (t2.band === b ? i : -1)).filter((i) => i >= 0)
        return idxs.length && idxs.every((i) => killed(i)) ? 0.08 : 1
      }
      scene.setEqVis(gVis('low'), gVis('mid'), gVis('high'))
    }
    const applySpectralTiers = () => {
      tiers = [
        { label: 'sub', band: 'low' },
        { label: 'bass', band: 'low' },
        { label: 'lowmid', band: 'mid' },
        { label: 'mid', band: 'mid' },
        { label: 'himid', band: 'high' },
        { label: 'air', band: 'high' },
      ]
      sectMuted.clear()
      sectSolo = -1
      rowGain.fill(1)
      applySpectralMix()
      scene.setTierMap(Array.from({ length: 24 }, (_, i) => Math.floor(i / 4)), 6)
      engineRef.current?.setTierBands(6)
    }
    const applyStemTiers = (infos: StemInfo[]) => {
      const order: StemRole[] = ['bass', 'drums', 'other', 'vocals']
      const present = order.filter((r) => infos.some((s) => s.role === r))
      if (present.length < 2) return applySpectralTiers()
      tiers = present.map((r) => ({ label: r, role: r }))
      sectMuted.clear()
      sectSolo = -1
      rowGain.fill(1)
      applySpectralMix()
      const per = 24 / present.length
      scene.setTierMap(
        Array.from({ length: 24 }, (_, i) => Math.min(present.length - 1, Math.floor(i / per))),
        present.length,
        present.indexOf('vocals'),
      )
    }
    // Grab state: pulling the axis shears the stack; grabbing a ring while
    // open drives that tier (drag=level, tap=solo, push to the axis=mute).
    const sect = {
      t: 0,
      latched: false,
      axis: false,
      sy0: 0,
      t0: 0,
      drag: null as null | { tier: number; dx0: number; sx: number; sy: number; downAt: number; moved: boolean; lvl: number; g0: number },
    }
    applySpectralTiers()
    tourOpsRef.current = {
      openStack() {
        sect.latched = true
        sect.t = 1
        scene.setDissect(1)
      },
      closeStack() {
        sect.latched = false
        sect.t = 0
        scene.setDissect(0)
      },
    }
    stemsUiRef.current = {
      arm(infos) {
        applyStemTiers(infos)
        // stems ARE layers: the stack presents itself opened
        sect.latched = true
        sect.t = 1
        scene.setDissect(1)
      },
    }
    // The rows and the rings drive the SAME state through one door each.
    tierCtlRef.current = {
      gain(i, g) {
        const tr = tiers[i]
        if (!tr) return
        if (tr.role) stemDeckRef.current?.setStemGain(tr.role, g)
        else {
          rowGain[i] = Math.max(0, Math.min(2, g))
          applySpectralMix()
        }
      },
      solo(i) {
        const tr = tiers[i]
        if (!tr) return
        if (tr.role) {
          const d = stemDeckRef.current
          d?.solo(d.soloRole === tr.role ? null : tr.role)
        } else {
          sectSolo = sectSolo === i ? -1 : i
          applySpectralMix()
        }
      },
      mute(i) {
        const tr = tiers[i]
        if (!tr) return
        if (tr.role) stemDeckRef.current?.toggleMuteRole(tr.role)
        else {
          sectMuted.has(i) ? sectMuted.delete(i) : sectMuted.add(i)
          applySpectralMix()
        }
      },
      hover(i) {
        scene.setHiTier(i)
      },
    }
    // DEV: gesture trace for headless verification — which mode each
    // pointer event resolved to. Costs nothing in prod builds.
    const trace = import.meta.env.DEV
      ? (ev: string, detail?: unknown) => {
          const w2 = window as unknown as { __gest: unknown[] }
          ;(w2.__gest ??= []).push([ev, detail])
          if (w2.__gest.length > 40) w2.__gest.shift()
        }
      : () => {}
    const pickTier = (px: number, py: number): number => {
      const n = tiers.length
      let best = -1
      let bestD = 1e9
      for (let i = 0; i < n; i++) {
        const cpt = scene.surveyPoint(i, 0, 0)
        const d = Math.abs(py - cpt.y)
        if (d < bestD) {
          bestD = d
          best = i
        }
      }
      const gapPx = Math.max(
        36,
        Math.abs(scene.surveyPoint(Math.min(1, n - 1), 0, 0).y - scene.surveyPoint(0, 0, 0).y),
      )
      const ctr = scene.surveyPoint(best, 0, 0)
      // the ring's projected radius must not depend on where the spin has
      // carried any single vertex — measure two orthogonal azimuths
      const e1 = scene.surveyPoint(best, 0, 1)
      const e2 = scene.surveyPoint(best, Math.PI / 2, 1)
      const ringPx = Math.max(
        70,
        Math.hypot(e1.x - ctr.x, e1.y - ctr.y),
        Math.hypot(e2.x - ctr.x, e2.y - ctr.y),
      )
      const ok = bestD < gapPx * 0.55 && Math.abs(px - ctr.x) < ringPx * 1.8
      if (!ok) trace('pick-dbg', { best, bestD: Math.round(bestD), gapPx: Math.round(gapPx), dxAxis: Math.round(Math.abs(px - ctr.x)), ringPx: Math.round(ringPx), cy: Math.round(ctr.y), py: Math.round(py) })
      return ok ? best : -1
    }

    // The reticle cursor — an instrument aims, it doesn't point. Eased
    // follow via transforms inside the existing frame loop (no extra rAF,
    // no layout properties). Touch devices never see it.
    const finePointer = matchMedia('(pointer: fine)').matches
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cur = { x: -100, y: -100, tx: -100, ty: -100, down: 0, overUi: false, dragging: false, lx: 0, ly: 0, axisHover: false }
    // what the idle reticle currently says — so hints never clobber a
    // live gesture readout, and gesture readouts never leave stale hints
    let hintShown = ''
    let hoverTierIdx = -1
    // Until the first pointer event we do not know where the cursor IS, so
    // the reticle sits parked off-screen. Hiding the native cursor before
    // that point leaves the page with NO cursor until the user happens to
    // move the mouse — which is exactly what "the cursor is not visible"
    // looks like on load, after a reload, or on re-entering the window.
    let armed = false
    const armCursor = (x: number, y: number) => {
      cur.tx = x
      cur.ty = y
      if (armed) return
      armed = true
      cur.x = x // snap on first sighting, or it slides in from off-screen
      cur.y = y
      appRef.current?.classList.add('cursor-armed')
    }
    const onCurEnter = (e: PointerEvent) => armCursor(e.clientX, e.clientY)
    const onCurLeave = (e: PointerEvent) => {
      // the pointer really left the window (not just crossed onto a child)
      if (e.relatedTarget) return
      armed = false
      appRef.current?.classList.remove('cursor-armed')
      if (reticleRef.current) reticleRef.current.style.opacity = '0'
    }

    const onCurMove = (e: PointerEvent) => {
      armCursor(e.clientX, e.clientY)
      cur.overUi = !!(e.target as Element | null)?.closest?.('.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]')
      if (!reducedMotion) {
        // Hover aims the instrument (fine pointers only — touch has no
        // hover); a held pointer grabs and spins it on EVERY device.
        // Deltas are computed manually: iOS reports movementX as 0.
        if (finePointer) scene.setPointer(e.clientX / Math.max(1, w) - 0.5, e.clientY / Math.max(1, h) - 0.5)
        if (cur.dragging) {
          scene.dragBy((e.clientX - cur.lx) * 0.006, (e.clientY - cur.ly) * 0.004)
        }
        if (sect.axis) {
          // The shear rides the hand, 1:1 — no easing here; the scene's
          // spring supplies the mechanism feel.
          sect.t = Math.max(0, Math.min(1, sect.t0 + (sect.sy0 - e.clientY) / 240))
          trace('axis-move', +sect.t.toFixed(2))
          scene.setDissect(sect.t)
          if (retLabelRef.current) retLabelRef.current.textContent = `dissect ${Math.round(sect.t * 100)}%`
        } else if (sect.drag) {
          const d = sect.drag
          if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 7) d.moved = true
          if (d.moved) {
            const c = centerPx()
            // Distance from the AXIS is the fader: out = boost, in = kill.
            const lvl = Math.max(0, Math.min(2, 1 + (Math.abs(e.clientX - c.x) - d.dx0) / 150))
            d.lvl = lvl
            const tr = tiers[d.tier]
            const eng2 = engineRef.current
            if (tr.role && stemDeckRef.current) {
              stemDeckRef.current.setStemGain(tr.role, lvl)
            } else if (tr.band) {
              // the ring IS the filter: this tier's own peaking band bends
              eng2?.tierEq(d.tier, dbOf(lvl))
            }
            if (retLabelRef.current) retLabelRef.current.textContent = `${tr.label} ${Math.round(lvl * 100)}%`
            trace('tier-move', { tier: d.tier, lvl: +lvl.toFixed(2) })
          }
        } else if (mix.on) {
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
          // horizontal: the colour filter — momentary, like every gesture
          mixState.sweep = Math.max(-1, Math.min(1, (e.clientX - mix.sx) / (w * 0.3)))
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
                ? `( echo ${Math.round(mix.echo * 100)}% )`
                : Math.abs(mixState.sweep) > 0.05 && Math.abs(e.movementX ?? 1) > Math.abs(e.movementY ?? 0)
                  ? `${mixState.sweep < 0 ? 'hp' : 'lp'} ${Math.round(Math.abs(mixState.sweep) * 100)}`
                  : mix.stemRole
                    ? `${mix.stemRole} ${radial < 0 ? Math.round((1 + radial) * 100) + '%' : '+' + Math.round(Math.min(1, radial) * 100) + '%'}`
                    : `${mix.band} ${db > 0 ? '+' : ''}${Math.round(db)}db`
          }
        }
      }
      // The seam affordance: an invisible gesture is a missing feature.
      // When the idle hand crosses the orb's axis, the machine shows its
      // split line and the reticle names the move.
      const idle = !mix.on && !sect.axis && !sect.drag && !cur.dragging
      if (idle && startedRef.current) {
        const c3 = centerPx()
        cur.axisHover =
          !cur.overUi &&
          scene.dissect < 0.5 &&
          Math.abs(e.clientX - c3.x) < 30 &&
          Math.abs(e.clientY - c3.y) < h * 0.38
        // The idle reticle names what the hand is over: the seam when the
        // star is whole, the tier when the stack is open.
        let cue = ''
        let hov = -1
        if (cur.axisHover) cue = 'dissect ↕'
        else if (scene.dissect > 0.5 && !cur.overUi) {
          const ti = pickTier(e.clientX, e.clientY)
          if (ti >= 0) {
            cue = `${tiers[ti].label} · grab`
            hov = ti
          }
        }
        if (hov !== hoverTierIdx) {
          hoverTierIdx = hov
          scene.setHiTier(hov)
        }
        if (retLabelRef.current && (cue || retLabelRef.current.textContent === hintShown))
          retLabelRef.current.textContent = cue
        hintShown = cue
      } else {
        cur.axisHover = false
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
    const mix = { on: false, band: 'mid' as 'low' | 'mid' | 'high', stemRole: null as StemRole | null, sx: 0, sy: 0, r0: 1, echo: 0 }
    const mixState = { sweep: 0, eq: 0 }
    // Filter and echo were reachable ONLY by dragging the star, so they had
    // no keyboard path and vanished entirely under reduced-motion. The
    // keyboard sets a LATCHED value instead of a momentary one — which the
    // house law permits precisely because the chips render it: "anything
    // worth keeping lives on a visible control that shows its state".
    // A gesture still springs back, but back to the latch, not to zero.
    const latch = { sweep: 0, echo: 0 }
    const centerPx = () => {
      const fracX = startedRef.current && w > 720 ? (320 + (w - 320) / 2) / w : 0.5
      return { x: fracX * w, y: h / 2 }
    }
    const onCurDown = (e: PointerEvent) => {
      cur.down = 1
      cur.lx = e.clientX
      cur.ly = e.clientY
      const overUi = !!(e.target as Element | null)?.closest?.('.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]')
      if (overUi || !startedRef.current) return
      const hit = scene.bodyHit((e.clientX / w) * 2 - 1, -(e.clientY / h) * 2 + 1)
      const dis = scene.dissect
      const c0 = centerPx()
      // The axis grab: down the spine of the orb (or SHIFT anywhere) —
      // pull up to dissect, down to close. Narrow on purpose: the centre
      // column is the machine's seam.
      trace('down', { x: Math.round(e.clientX), y: Math.round(e.clientY), dis: +dis.toFixed(2), pts: pts.size })
      if (pts.size < 2 && (e.shiftKey || (Math.abs(e.clientX - c0.x) < 30 && (dis > 0.3 || hit)))) {
        trace('axis-grab')
        sect.axis = true
        sect.sy0 = e.clientY
        sect.t0 = sect.t
        appRef.current?.classList.add('grabbing')
        return
      }
      // Open stack: grabs land on TIERS, not on the mix gesture.
      if (dis > 0.5 && pts.size < 2) {
        const tier = pickTier(e.clientX, e.clientY)
        trace('tier-pick', tier)
        if (tier >= 0) {
          const trD = tiers[tier]
          const g0 = trD?.role
            ? stemDeckRef.current?.info().find((s2) => s2.role === trD.role)?.gain ?? 1
            : rowGain[tier]
          sect.drag = {
            tier,
            dx0: Math.max(30, Math.abs(e.clientX - c0.x)),
            sx: e.clientX,
            sy: e.clientY,
            downAt: performance.now(),
            moved: false,
            lvl: 1,
            g0,
          }
          appRef.current?.classList.add('mixing')
          // grabbing a muted spectral tier revives it
          const tr = tiers[tier]
          if (tr.band && sectMuted.has(tier)) {
            sectMuted.delete(tier)
            applySpectralMix()
          }
          return
        }
        cur.dragging = true
        appRef.current?.classList.add('grabbing')
        return
      }
      // In jukebox mode the sound comes out of YouTube's own pipeline and
      // our copy is silent, so EQ/filter/echo would move nothing. Bending
      // the star anyway would draw a curve that isn't happening.
      if (hit && pts.size < 2 && engineRef.current?.kind !== 'tube') {
        mix.on = true
        mix.sx = e.clientX
        mix.sy = e.clientY
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
      if (sect.axis) {
        sect.axis = false
        // Past the threshold it latches open; short of it, the spring slams
        // the star back into one body.
        sect.latched = sect.t > 0.85
        sect.t = sect.latched ? 1 : 0
        scene.setDissect(sect.t)
        if (retLabelRef.current) retLabelRef.current.textContent = ''
      }
      if (sect.drag) {
        const d = sect.drag
        sect.drag = null
        appRef.current?.classList.remove('mixing')
        const tr = tiers[d.tier]
        const deck = stemDeckRef.current
        const quick = !d.moved && performance.now() - d.downAt < 350
        trace('tier-up', { tier: d.tier, quick, moved: d.moved, lvl: +d.lvl.toFixed(2) })
        if (quick) {
          // tap = solo toggle
          if (tr.role && deck) deck.solo(deck.soloRole === tr.role ? null : tr.role)
          else if (tr.band) {
            sectSolo = sectSolo === d.tier ? -1 : d.tier
            applySpectralMix()
          }
        } else if (d.lvl <= 0.07) {
          // pushed all the way to the axis = a latched mute
          if (tr.role && deck) {
            deck.toggleMuteRole(tr.role)
            deck.setStemGain(tr.role, d.g0)
          } else if (tr.band) {
            sectMuted.add(d.tier)
          }
        } else {
          // momentary: the fader springs home to the ROW's latched value
          if (tr.role && deck) deck.setStemGain(tr.role, d.g0)
        }
        applySpectralMix()
        if (retLabelRef.current) retLabelRef.current.textContent = ''
      }
      if (mix.on) {
        mix.on = false
        appRef.current?.classList.remove('mixing')
        const eng2 = engineRef.current
        // Momentary, all of it: EQ springs flat, the echo loop drains, the
        // filter sweeps home. Anything worth KEEPING lives on a visible
        // control that shows its state — nothing invisible ever sticks.
        if (mix.stemRole && stemDeckRef.current) stemDeckRef.current.setStemGain(mix.stemRole, 1)
        mix.stemRole = null
        eng2?.eq(mix.band, 0)
        eng2?.echo(latch.echo)
        mixState.sweep = latch.sweep
        eng2?.sweep(latch.sweep)
        mix.echo = latch.echo
        scene.setGrab(null, 0)
        applySpectralMix()
        mixState.eq = 0
        if (retLabelRef.current) retLabelRef.current.textContent = ''
      }
    }
    window.addEventListener('pointermove', onCurMove)
    // seed the position without waiting for a move: entering the window, or
    // pressing, is enough to know where the pointer is
    window.addEventListener('pointerover', onCurEnter)
    window.addEventListener('pointerdown', onCurEnter)
    document.addEventListener('pointerout', onCurLeave)
    window.addEventListener('pointerdown', onCurDown)
    window.addEventListener('pointerup', onCurUp)
    window.addEventListener('pointercancel', onCurUp)

    // The grid sweeps ride the music: Web Animations playbackRate is the
    // one dial that changes a running CSS animation's speed without a jump.
    const perf = { ema: 0.016, cool: 3, q: 1 }

    // rms history for the scrolling waveform strip.
    const wave = new Float32Array(220)
    let waveHead = 0

    let beatPulse = 0
    // The transient fast-path: instant attack on spectral-flux onsets,
    // ~150ms decay. Deliberately NOT a spring — snap must not be smoothed.
    let snapEnv = 0
    let drumPrev = 0
    let lastInfos: StemInfo[] | null = null
    let surveyDirty = false
    let seamFlashUntil = 0
    let wasStarted = false
    const tierVoice = new Float32Array(6).fill(1)
    let raf = 0
    let prev = performance.now()
    let chromeAcc = 0
    let silentFor = 0
    let sigNow: 'idle' | 'silent' | 'live' = 'idle'

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
        // The star erupts on real hits — the lifecycle layer. Dissected,
        // the eruption leaves the beat's own ring: drums if stems name
        // one, the low tier (the kick's home) otherwise.
        if (startedRef.current && beat.strength > 0.25) {
          const bt = tiers.findIndex((t2) => t2.role === 'drums')
          scene.burst(beat.strength, bt >= 0 ? bt : 0)
        }
      }
      beatPulse *= Math.exp(-dt * 5)

      // Stem voices: each part drives its own visual organ. The mix bus
      // already feeds the analyser (anatomy/spectrum/beats keep working);
      // these are the per-stem additions.
      const deckNow = stemDeckRef.current
      if (engine.kind === 'stems' && deckNow?.playing) {
        const infos = deckNow.info()
        lastInfos = infos
        let vocal = 0, drums = 0
        for (const s of infos) {
          if (s.role === 'vocals') vocal = Math.max(vocal, s.level)
          if (s.role === 'drums') drums = Math.max(drums, s.level)
        }
        scene.setVocal(Math.min(1.4, vocal * 4))
        // Drum-gated eruption: far tighter than full-mix onset detection.
        if (drums > 0.3 && drums > drumPrev * 1.6) {
          const bt = tiers.findIndex((t2) => t2.role === 'drums')
          scene.burst(Math.min(1, drums * 1.6), bt >= 0 ? bt : null)
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

      // Idle: the instrument breathes, barely — a machine on standby, not a
      // screenshot. Two detuned sines so the swell never lands on a count.
      // max() rather than a switch, so the moment real audio outgrows the
      // breath it simply takes over: a bit alive becomes fully alive.
      let lo = f.low
      let mi = f.mid
      let hi = f.high
      // The breath is not just a standby effect. Inside the console it keeps
      // the star present whenever nothing is arriving — and in jukebox mode
      // our own bus is silent BY DESIGN (youtube makes the sound, we capture
      // it), so without this the star vanished completely and the console
      // read as broken rather than waiting.
      //
      // Faded by how quiet it actually is rather than switched at a
      // threshold, so there is no pop as audio comes and goes; max() below
      // still does the handover once real signal outgrows it.
      const quiet = startedRef.current ? 1 - Math.min(1, f.rms / 0.05) : 1
      if (quiet > 0.002) {
        const b = performance.now() / 1000
        // the wake-up surge: the machine strains before it lets you in.
        // The console frames the star closer than standby does (dolly 1 vs
        // ~1.58), so an identical breath spreads over more screen and reads
        // dimmer — measured as a faint smudge where standby shows a defined
        // body. More amplitude inside, to land at the same apparent presence.
        const amt = (bootRef.current ? 2.6 : startedRef.current ? 1.8 : 1) * quiet
        // 1.1636 rad/s = a 5.4s cycle, the SAME period the sheet's chrome
        // breathes on (styles.css, idle life). Star and plate inhale
        // together, so the screen reads as one organism, not as parts.
        const swell = 0.5 + 0.5 * Math.sin(b * 1.1636)
        // a slow detune underneath, so the cycle never lands twice the same
        const sub = 0.5 + 0.5 * Math.sin(b * 0.31 + 1.7)
        lo = Math.max(lo, 0.2 * amt * swell * (0.7 + 0.3 * sub))
        mi = Math.max(mi, 0.07 * amt * swell * sub)
        hi = Math.max(hi, 0.03 * amt * (0.5 + 0.5 * Math.sin(b * 1.43)))
      }
      scene.render(dt, lo, mi, hi, beatPulse, ahead, snapEnv)

      // The survey drawing rides every frame while the stack is open —
      // markers, drop-lines and labels are projected from the SAME cluster
      // transform the particles just rendered with.
      // Touch has no hover: flash the seam for a few seconds after power-on
      // so every device gets shown the split line once.
      if (startedRef.current && !wasStarted) {
        wasStarted = true
        seamFlashUntil = now + 4500
        if (shouldOnboard()) setTimeout(() => setOnboard(true), 900)
      }
      const seamWant = cur.axisHover || sect.axis || now < seamFlashUntil
      if (scene.dissect > 0.004 || seamWant) {
        surveyDirty = true
        for (let i = 0; i < tiers.length; i++) {
          const tr = tiers[i]
          if (tr.role) {
            let lv = 0
            if (lastInfos) for (const s of lastInfos) if (s.role === tr.role) lv = Math.max(lv, s.level)
            tierLevels[i] = Math.min(1, lv * 3)
          } else {
            const per = 24 / tiers.length
            const a = Math.round(i * per)
            const b = Math.round((i + 1) * per)
            let m = 0
            for (let k = a; k < b; k++) m += f.bands[k]
            tierLevels[i] = Math.min(1, (m / Math.max(1, b - a)) * 1.6)
          }
        }
        // each ring's voice: stems ride their REAL post-gain rms (a muted
        // stem's tap reads silence, so its ring collapses dark); spectral
        // tiers ride their kill state. Smoothed here, read by the shader.
        for (let i = 0; i < 6; i++) {
          const tr = tiers[i]
          const target = !tr
            ? 1
            : tr.role
              ? Math.min(1.4, tierLevels[i] * 1.5)
              : sectMuted.has(i) || (sectSolo >= 0 && sectSolo !== i)
                ? 0.08
                : Math.min(1.4, rowGain[i])
          // VU ballistics: fast attack so hits register, slow release so a
          // playing stem never strobes to a ghost between beats — only a
          // true mute (or silence) lets the ring die.
          tierVoice[i] += (target - tierVoice[i]) * Math.min(1, dt * (target > tierVoice[i] ? 14 : 2.2))
        }
        scene.setTierLevels(tierVoice)
        const marks = { solo: -1, muted: [] as boolean[] }
        for (let i = 0; i < tiers.length; i++) {
          const tr = tiers[i]
          if (tr.role) {
            marks.muted[i] = !!lastInfos?.some((s) => s.role === tr.role && s.muted)
            if (deckNow?.soloRole === tr.role) marks.solo = i
          } else {
            marks.muted[i] = sectMuted.has(i)
            if (sectSolo === i) marks.solo = i
          }
        }
        drawSurvey(surveyRef.current, scene, tiers, tierLevels, marks, beatPulse, f.rms, seamWant)
      } else if (surveyDirty) {
        surveyDirty = false
        const g = surveyRef.current?.getContext('2d')
        if (g && surveyRef.current) g.clearRect(0, 0, surveyRef.current.width, surveyRef.current.height)
      }

      wave[waveHead] = f.rms
      waveHead = (waveHead + 1) % wave.length

      // Reticle follow: eased transform, press pulse decays like the tube.
      if (finePointer && reticleRef.current) {
        cur.x += (cur.tx - cur.x) * Math.min(1, dt * 14)
        cur.y += (cur.ty - cur.y) * Math.min(1, dt * 14)
        cur.down *= Math.exp(-dt * 7)
        const sc = 1 + cur.down * 0.5
        reticleRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%) scale(${sc})`
        // visible over the console as well as the stage: one pointer,
        // everywhere, or the hand gets lost the moment it leaves the star.
        // Only once we actually know where the pointer is.
        reticleRef.current.style.opacity = armed ? '1' : '0'
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

      // Is captured audio actually arriving? Ask the engine what is wired up,
      // and the analyser what is coming through it. A granted-but-silent
      // stream looks identical to a working one everywhere else.
      //
      // Only counted while the player says it is playing: a paused video is
      // also pure silence, and accusing someone of missing the checkbox
      // because they hit pause would be worse than saying nothing.
      //
      // The threshold is deliberately near zero rather than the star's own
      // liveness floor (instrument.ts). The fault being detected is a track
      // with NO audio content — exactly 0.0 — and real music never sustains
      // that, however quiet the passage.
      if (engine.capturing && tubePlayingRef.current)
        silentFor = f.rms > 0.0015 ? 0 : silentFor + dt
      else silentFor = 0

      chromeAcc += dt
      if (chromeAcc > 0.16) {
        chromeAcc = 0
        // 2s of silence, not one quiet frame — real music has rests
        const sig = !engine.capturing ? 'idle' : silentFor > 2 ? 'silent' : 'live'
        if (sig !== sigNow) {
          sigNow = sig
          setSignal(sig)
        }
        drawWave(waveRef.current, wave, waveHead, peaksRef.current, progress)
        drawSpectrum(specRef.current, f.bands, mix.on ? mix.band : null, mixState.eq)
        const el = engine.el
        if (labelRef.current)
          labelRef.current.textContent = `tracking ${(94 + fp.tempoConfidence * 5.9).toFixed(2)}%`
        // now-playing plate: measured beside the artist's declared datum,
        // dimmed until the beat-tracker actually locks
        if (bpmRef.current) {
          const locked = fp.tempoConfidence > 0.12
          const measured = locked ? `${Math.round(fp.tempo)}` : '--'
          const dec = trackRef.current?.bpm
          bpmRef.current.textContent = dec ? `${measured} / ${dec}` : measured
          bpmRef.current.classList.toggle('locked', locked)
        }
        if (levelRef.current) {
          // block meter: light discrete cells, never stretch a bar
          const lit = Math.round(Math.min(1, f.rms * 2.4) * 12)
          const cells = levelRef.current.children
          for (let i = 0; i < cells.length; i++) cells[i].className = i < lit ? 'on' : ''
        }
        // diagnostics: one dim line, only for those who ask
        if (diagRef.current)
          diagRef.current.textContent = `fps ${Math.min(120, Math.round(1 / Math.max(1e-3, perf.ema)))} · pts ${Math.round((108000 * scene.densityNow + 2600 + 3600) / 1000)}k · quality ${perf.q < 1 ? 'reduced' : 'full'}`
        setPaused(engine.kind === 'stems' ? !(stemDeckRef.current?.playing ?? false) : (engineRef.current?.el.paused ?? false))
        // the layer rows: visible whenever stems are loaded or the stack
        // is open — top ring first, mirroring the drawing
        if (engine.kind === 'stems' || scene.dissect > 0.25) {
          const infos = engine.kind === 'stems' ? stemDeckRef.current?.info() ?? null : null
          const rows: LayerRow[] = []
          for (let i = tiers.length - 1; i >= 0; i--) {
            const tr = tiers[i]
            if (tr.role && infos) {
              let lv = 0
              let gn = 1
              let mu = false
              for (const s2 of infos)
                if (s2.role === tr.role) {
                  lv = Math.max(lv, s2.level)
                  gn = s2.gain
                  mu = mu || s2.muted
                }
              rows.push({ i, label: tr.label, level: lv, gain: gn, muted: mu, solo: stemDeckRef.current?.soloRole === tr.role, hot: hoverTierIdx === i })
            } else {
              const per = 24 / tiers.length
              const a = Math.round(i * per)
              const b = Math.round((i + 1) * per)
              let m = 0
              for (let k = a; k < b; k++) m += f.bands[k]
              rows.push({
                i,
                label: tr.label,
                level: Math.min(1, (m / Math.max(1, b - a)) * 1.6),
                gain: rowGain[i],
                muted: sectMuted.has(i),
                solo: sectSolo === i,
                hot: hoverTierIdx === i,
              })
            }
          }
          lastLayersRef.current = rows
          setLayerUi(rows)
        } else {
          setLayerUi(null)
        }
        // contextual chips: a state renders ONLY while it is non-default —
        // silence is the default reading of a healthy instrument
        if (zoomRef.current) {
          const z = scene.zoomLevel
          zoomRef.current.textContent = `( zoom ${z.toFixed(1)}× )`
          zoomRef.current.classList.toggle('on', z > 1.04)
        }
        if (fltRef.current) {
          const sv = mixState.sweep
          fltRef.current.textContent = `( flt ${sv < 0 ? 'hp' : 'lp'} ${Math.round(Math.abs(sv) * 100)} )`
          fltRef.current.classList.toggle('on', Math.abs(sv) >= 0.04)
        }
        if (echoRef.current) {
          echoRef.current.textContent = `( echo ${Math.round(mix.echo * 100)}% )`
          echoRef.current.classList.toggle('on', mix.echo > 0.02)
        }
        if (sectRef.current) {
          const dv = scene.dissect
          sectRef.current.textContent = `( sect ${Math.round(dv * 100)}% )`
          sectRef.current.classList.toggle('on', dv > 0.02)
          // chrome that collides with the open stack ducks (mobile CSS)
          appRef.current?.classList.toggle('dissected', dv > 0.25)
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
        // the jukebox reports itself on the same 6Hz tick as everything else
        if (engine.kind === 'tube' && tubeRef.current) {
          const st = tubeRef.current.read()
          tubePlayingRef.current = st.playing
          setTubeState((p) =>
            p && p.title === st.title && p.channel === st.channel &&
            Math.round(p.elapsed) === Math.round(st.elapsed) &&
            p.playing === st.playing && p.error === st.error
              ? p
              : st,
          )
        }
        if (startedRef.current) {
          const deckT = engine.kind === 'stems' && stemDeckRef.current
            ? { t: stemDeckRef.current.currentTime(), d: stemDeckRef.current.duration }
            : { t: el.currentTime, d: el.duration }
          if (cElapsedRef.current) cElapsedRef.current.textContent = fmtTime(deckT.t)
          if (cTotalRef.current) cTotalRef.current.textContent = fmtTime(deckT.d)
          // the scrubber announces its own position. Rounded to whole
          // percent and whole seconds so this only re-renders when the
          // announced value would actually differ.
          if (isFinite(deckT.d) && deckT.d > 0) {
            const pct = Math.round((deckT.t / deckT.d) * 100)
            setScrubPct((p) => (p === pct ? p : pct))
            const txt = `${fmtTime(deckT.t)} of ${fmtTime(deckT.d)}`
            setScrubText((p) => (p === txt ? p : txt))
          }
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
        if (import.meta.env.DEV) (window as unknown as { __deck: StemDeck }).__deck = deck
        setDecoding(true)
        void deck.load(all).then(() => {
          engine.enterStems(`stem deck · ${all.length} stems`)
          deck.play(0)
          const p = deck.peaks()
          peaksRef.current = { amp: p.amp, secondsPerPixel: p.secondsPerPixel }
          setDecoding(false)
          // The dissection speaks stems now: one tier per separated part —
          // and stems ARE layers, so the stack presents itself opened.
          applyStemTiers(deck.info())
          sect.latched = true
          sect.t = 1
          scene.setDissect(1)
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
      // A focused control owns its own keys. This guard used to name only
      // INPUT and sliders, so Space on a focused BUTTON hit `case 'Space'`
      // below, whose preventDefault() suppressed the button's own
      // activation — MUTE, SKIP, SPLIT, the sources, GO, the layer s/m
      // pair and the tour's NEXT all toggled playback instead of firing.
      if ((e.target as Element)?.closest?.(
        'input, textarea, select, button, a[href], [role="slider"], [contenteditable]',
      )) return
      if (!startedRef.current) {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault()
          ;(document.querySelector('.power') as HTMLButtonElement | null)?.click()
        }
        return
      }
      const eng = engineRef.current
      if (!eng) return
      // The deck, not the dormant radio element, owns transport in stems
      // mode — Space on the old path would start the radio UNDER the stems.
      const deck = eng.kind === 'stems' ? stemDeckRef.current : null
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          if (deck) deck.playing ? deck.pause() : deck.play()
          else if (eng.kind !== 'mic') (eng.el.paused ? void eng.el.play() : eng.el.pause())
          break
        case 'KeyN':
          // without the tube case this left the jukebox for the radio
          if (eng.kind === 'tube') tubeRef.current?.next()
          else if (eng.kind === 'radio') void eng.next()
          else void eng.playRadio() // file AND stems: back to the radio
          break
        case 'ArrowRight':
        case 'ArrowLeft': {
          e.preventDefault()
          // our element is silent in jukebox mode; seeking it moves nothing
          if (eng.kind === 'tube') break
          const dt5 = e.code === 'ArrowRight' ? 5 : -5
          if (deck) {
            deck.seek(Math.max(0, Math.min(deck.duration, deck.currentTime() + dt5)))
            break
          }
          const el = eng.el
          if (isFinite(el.duration) && el.duration > 0)
            el.currentTime = Math.max(0, Math.min(el.duration, el.currentTime + dt5))
          break
        }
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault()
          setVolume((v) => {
            const nv = Math.max(0, Math.min(1, v + (e.code === 'ArrowUp' ? 0.05 : -0.05)))
            if (eng.kind === 'tube') tubeRef.current?.setVolume(nv)
            return nv
          })
          break
        case 'Digit1': setTuning({ turb: 0.6, expo: 0.8, spin: 0.5 }); break
        case 'Digit2': setTuning({ turb: 1, expo: 1, spin: 1 }); break
        case 'Digit3': setTuning({ turb: 1.6, expo: 1.3, spin: 1.8 }); break
        case 'KeyR': void eng.playRadio(); break
        // shift on the three that are disruptive from a stray keystroke:
        // f opens a file picker, m fires a browser permission prompt, and
        // h blanks the whole interface. Everything else stays bare.
        case 'KeyF': if (e.shiftKey) fileRef.current?.click(); break
        case 'KeyM': if (e.shiftKey) void eng.useMic(); break
        case 'KeyH': if (e.shiftKey) setAmbient((a) => !a); break
        case 'KeyD':
          // keyboard dissect: full open / full shut
          sect.latched = !sect.latched
          sect.t = sect.latched ? 1 : 0
          sceneRef.current?.setDissect(sect.t)
          break
        case 'Equal':
        case 'NumpadAdd': sceneRef.current?.zoomBy(1.25); break
        case 'Minus':
        case 'NumpadSubtract': sceneRef.current?.zoomBy(1 / 1.25); break
        case 'Digit0': sceneRef.current?.setZoom(1); break
        // the colour filter, latched: [ sweeps toward high-pass, ] toward
        // low-pass, \ returns it flat. The ( flt ) chip shows the value.
        case 'BracketLeft':
        case 'BracketRight': {
          e.preventDefault()
          if (eng.kind === 'tube') break
          const d = e.code === 'BracketRight' ? 0.12 : -0.12
          latch.sweep = Math.max(-1, Math.min(1, Number((latch.sweep + d).toFixed(2))))
          mixState.sweep = latch.sweep
          eng.sweep(latch.sweep)
          break
        }
        case 'Backslash':
          e.preventDefault()
          if (eng.kind === 'tube') break
          latch.sweep = 0
          latch.echo = 0
          mixState.sweep = 0
          mix.echo = 0
          eng.sweep(0)
          eng.echo(0)
          break
        // echo depth, latched: e adds, shift+E removes. ( echo ) shows it.
        case 'KeyE': {
          e.preventDefault()
          if (eng.kind === 'tube') break
          const d = e.shiftKey ? -0.2 : 0.2
          latch.echo = Math.max(0, Math.min(1, Number((latch.echo + d).toFixed(2))))
          mix.echo = latch.echo
          eng.echo(latch.echo)
          break
        }
      }
    }
    window.addEventListener('keydown', onKey)

    // --- zoom: wheel on desktop, pinch on touch -------------------------
    const onWheel = (e: WheelEvent) => {
      // ctrl+wheel is the browser's zoom gesture; swallowing it blocked
      // page zoom across the whole stage (1.4.4)
      if (e.ctrlKey) return
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
      window.removeEventListener('pointerover', onCurEnter)
      window.removeEventListener('pointerdown', onCurEnter)
      document.removeEventListener('pointerout', onCurLeave)
      window.removeEventListener('pointerdown', onCurDown)
      window.removeEventListener('pointerup', onCurUp)
      window.removeEventListener('pointercancel', onCurUp)
    }
  }, [])

  /** Set the vibe: the prompt becomes a read (moods, genres, tempo), the
   *  read becomes a playlist, and the instrument shows its interpretation.
   *  Boots from standby, so a vibe is a complete action. */
  /**
   * @param play  Whether to start a track from the new playlist straight
   *   away. True for an explicit vibe submit — you asked, you hear it now.
   *   FALSE for the boot-time restore of a saved vibe: the radio is already
   *   playing under the rev by then, and cutting it off to start a second
   *   track is exactly the "it revs, then a new track starts" jump. The
   *   playlist still swaps, so the NEXT track comes from the vibe.
   */
  /**
   * Enter the jukebox. Playing and listening are deliberately two steps:
   * the catalogue works immediately, and the star's reaction is a separate,
   * explained opt-in. Asking for a screen share the instant someone clicks
   * a source button would read as an ambush.
   */
  const enterTube = async () => {
    const eng = engineRef.current
    if (!eng) return
    if (!tubeRef.current) {
      tubeRef.current = new Tube()
      tubeRef.current.onError = (code) => {
        if (code === 101 || code === 150) {
          eng.announce('embedding blocked', 'the owner disabled it for this video')
          tubeRef.current?.next()
        }
      }
    }
    // Do NOT mount here: the host only exists once source === 'tube', and
    // that render has not happened yet. The effect below owns mounting.
    eng.enterTube()
  }

  /** The star listens to this tab. Separate ask, plainly explained. */
  const startListening = async () => {
    const ok = (await engineRef.current?.useTabAudio()) ?? false
    setListening(ok)
  }

  const stopListening = () => {
    engineRef.current?.stopTabAudio()
    setListening(false)
  }

  const setVibe = async (prompt: string, play = true) => {
    const eng = engineRef.current
    if (!eng || !prompt.trim()) return
    setTuning2('loading')
    const { tracks, read } = await fetchVibe(prompt.trim())
    setVibeRead(read)
    if (!tracks.length) {
      setTuning2('empty')
      return
    }
    setTuning2('idle')
    try {
      localStorage.setItem('scope-vibe', prompt.trim())
    } catch { /* private mode */ }
    eng.setPlaylist(tracks)
    if (!startedRef.current && !bootRef.current) {
      startedRef.current = true
      setStarted(true)
      ;(window as unknown as { __focus: () => void }).__focus()
      sceneRef.current?.powerOn()
    }
    // queue-only: whatever is already sounding plays on, uninterrupted
    if (!play) return
    await eng.playRadio()
  }

  /** SPLIT the playing track into vocals/drums/bass/other and hand the
   *  result to the stem deck — same rings, same rows, same gestures as a
   *  stem-file drop, but sourced from ANY track. All in-browser. */
  const doSplit = async () => {
    const eng = engineRef.current
    const scene2 = sceneRef.current
    if (!eng || !scene2 || !eng.el.src || splitState) return
    const gen = ++splitGen.current
    const fromTitle = track?.title ?? 'track'
    const resumeAt = eng.el.currentTime || 0
    try {
      const stems = await splitTrack(eng.el.src, eng.ctx, (p) => {
        if (splitGen.current === gen) setSplitState(`${p.stage} ${Math.round(p.pct)}%`)
      })
      if (splitGen.current !== gen) return
      const deck = stemDeckRef.current ?? new StemDeck(eng.ctx, eng.busHead)
      stemDeckRef.current = deck
      if (import.meta.env.DEV) (window as unknown as { __deck: StemDeck }).__deck = deck
      deck.loadBuffers(stems.map((s) => ({ role: s.role, name: `${s.role} · split`, buffer: s.buffer })))
      eng.enterStems(`${fromTitle.slice(0, 22)} · split`)
      deck.play(resumeAt)
      const p = deck.peaks()
      peaksRef.current = { amp: p.amp, secondsPerPixel: p.secondsPerPixel }
      stemsUiRef.current?.arm(deck.info())
      setSplitState(null)
    } catch {
      if (splitGen.current === gen) {
        setSplitState('split failed')
        setTimeout(() => splitGen.current === gen && setSplitState(null), 2500)
      }
    }
  }

  /**
   * POWER ON is a flight, not a switch. Three beats over ~2.2s: the machine
   * REVS (spin ramps, the data column scans, the sheet arms), then you DIVE
   * — the camera accelerates in and passes through the particle shell — and
   * you arrive inside, where the console fades up and the star eases back
   * out to full size. Any input skips it; reduced-motion never sees it.
   */
  const runBoot = () => {
    const scene = sceneRef.current
    const w = window.innerWidth
    const h = window.innerHeight
    const cell = document.querySelector('.pl-fig')?.getBoundingClientRect()
    if (!scene || !cell || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      endBoot()
      return
    }
    const REV = 1050
    const DIVE = 1000
    const from = {
      x: (cell.left + cell.width / 2) / w,
      y: (cell.top + cell.height / 2) / h,
      d: Math.max(1, (h / cell.height) * 0.92),
    }
    const toX = w > 720 ? (320 + (w - 320) / 2) / w : 0.5
    const t0 = performance.now()
    const step = () => {
      if (!bootRef.current) return
      const e = performance.now() - t0
      if (e < REV) {
        scene.setRev(Math.min(1, e / REV))
        bootRaf.current = requestAnimationFrame(step)
        return
      }
      if (bootRef.current !== 'dive') {
        bootRef.current = 'dive'
        setBoot('dive')
      }
      // cubic ease-in: the lunge accelerates the whole way in
      const p = Math.min(1, (e - REV) / DIVE)
      const k = p * p * p
      scene.setRev(1 + k * 2.5)
      scene.setFocus(
        from.x + (toX - from.x) * k,
        from.y + (0.5 - from.y) * k,
        from.d + (0.16 - from.d) * k,
        true,
      )
      // past the shell: hand the screen over while still travelling
      if (p > 0.8 && !startedRef.current) {
        startedRef.current = true
        setStarted(true)
      }
      if (p < 1) {
        bootRaf.current = requestAnimationFrame(step)
        return
      }
      endBoot()
    }
    bootRaf.current = requestAnimationFrame(step)
  }

  /** Land: console up, star eased back out to full size by the damper. */
  const endBoot = () => {
    if (bootRaf.current) cancelAnimationFrame(bootRaf.current)
    bootRaf.current = 0
    bootRef.current = null
    setBoot(null)
    sceneRef.current?.setRev(0)
    if (!startedRef.current) {
      startedRef.current = true
      setStarted(true)
    }
    ;(window as unknown as { __focus: (snap?: boolean) => void }).__focus(false)
  }

  const power = () => {
    if (startedRef.current || bootRef.current) return
    // sound first: the machine revs WITH audio, not after it
    bootRef.current = 'rev'
    setBoot('rev')
    runBoot()
    sceneRef.current?.powerOn()
    // a returning listener gets their last vibe back, not the generic sweep
    let saved: string | null = null
    try {
      saved = localStorage.getItem('scope-vibe')
    } catch { /* private mode */ }
    // Sound first: the radio starts instantly so the rev has something to
    // move to. The saved vibe then swaps the PLAYLIST underneath without
    // restarting playback, so the track you rev to is the track you land
    // on, and the vibe takes effect from the next one.
    void engineRef.current?.playRadio()
    if (saved) {
      setQuery(saved)
      void setVibe(saved, false)
    }
  }

  const name = splitState
    ? splitState.toUpperCase()
    : decoding
    ? 'DECODING ///'
    : track
      ? `${track.title.toUpperCase().slice(0, 26)}${source === 'file' ? '.MP3' : ''}`
      : 'NO CARRIER'

  return (
    <div ref={appRef} className={`app${started ? ' live' : ''}${ambient ? ' ambient' : ''}`}>
      <canvas ref={canvasRef} className="stage" aria-hidden="true" />
      {/* The survey drawing — numbered markers, dashed drop-lines, tier
          labels — projected over the dissected stack. Exists only while
          the orb is pulled apart. */}
      <canvas ref={surveyRef} className="survey" aria-hidden="true" />
      {/* The survey grid, alive: a pulse of light travels along each line
          (the GridLines component's technique — background-position on a
          long gradient, staggered per line, compositor-only). */}

      {/* THE POINTER. One shape for the whole page: it never becomes an
          arrow, a hand or an I-beam, so the eye never re-finds it. */}
      <div ref={reticleRef} className="reticle" aria-hidden="true">
        <i className="ret-h" /><i className="ret-v" /><i className="ret-dot" />
        <span ref={retLabelRef} className="ret-label" />
      </div>

      {/* crosshair — structural lines only; the scrubber owns the playhead */}
      <div className="x-v" />
      <div className="x-h" />

      {/* THE STANDBY PLATE — the whole viewport is one instrument sheet
          (DESIGN.md §5 phase 1, round 2). Every element is a bordered cell
          sharing edges with its neighbours; the image cell is a hole in the
          sheet, so the live star burns through it, framed and fitted. */}
      {!started && (
        <div className={`plate${boot ? ` ${boot}` : ''}`}>
          <header className="pl-hdr">
            <div><b>[scope-01]</b> polar audio instrument</div>
            <div className="k">//unit_ <span>d-01</span></div>
            <div className="k">//rev_ <span>2.6</span></div>
            <div className="k">//ch_ <span>01</span></div>
          </header>

          <div className="pl-body">
            <div className="pl-l">
              <div className="pl-morse">
                <span className="lbl">sig</span>
                <span className="pl-sig">
                <svg
                  width="100%"
                  height="7"
                  viewBox={`0 0 ${MORSE.total} 7`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <g fill="currentColor" opacity=".62">
                    {MORSE.rects.map((r) => (
                      <rect key={r.x} x={r.x} y="3" width={r.w} height="1.5" />
                    ))}
                  </g>
                </svg>
                <i className="pl-carrier" aria-hidden="true" />
                </span>
                <span className="lbl">tx</span>
              </div>

              {/* the image cell — deliberately empty: the star is behind it */}
              <div className="pl-figwrap">
                <div className="pl-fig">
                  <i className="brk tl" /><i className="brk tr" />
                  <i className="brk bl" /><i className="brk br" />
                  <Reg className="reg a" /><Reg className="reg b" />
                  <div className="pl-figcap">
                    <span>fig.01 · particle field</span>
                    <span>108,000 pts · fibonacci sphere</span>
                  </div>
                </div>
              </div>

              <div className="pl-wave">
                <canvas ref={posterWaveRef} aria-hidden="true" />
                <span className="wlbl">motion</span>
              </div>

              <ul className="pl-leads">
                {['set a vibe', 'split any track', 'pull it apart'].map((t, i) => (
                  <li key={t} style={{ '--i': i } as React.CSSProperties}>
                    <span className="no">{'abc'[i]}</span>
                    <span><Decode text={t} duration={700 + i * 150} /></span>
                    <i className="ln" aria-hidden="true" />
                    <b className="dot" aria-hidden="true" />
                  </li>
                ))}
              </ul>

              <div className="pl-band">
                <div className="pl-mark">
                  <h1>scope<span className="pl-reg">®</span></h1>
                  <div className="pl-echo" aria-hidden="true">scope</div>
                </div>
                <div className="pl-checks" aria-hidden="true" />
                <div className="pl-act">
                  <button className="power" onClick={power}>
                    <Decode text="power on" duration={520} replayOnHover />
                  </button>
                </div>
              </div>
            </div>

            <div className="pl-r">
              <div className="pl-row"><span className="k">//particles_</span><span className="v">108,000</span></div>
              <div className="pl-row"><span className="k">//engine_</span><span className="v">webgl 2</span></div>
              <div className="pl-row"><span className="k">//source_</span><span className="v">audius</span></div>
              <div className="pl-row"><span className="k">//split_</span><span className="v">mdx-net</span></div>
              <div className="pl-row opt"><span className="k">//stems_</span><span className="v">4 ch</span></div>
              <div className="pl-row"><span className="k">//density_</span><Meter /></div>

              <div className="pl-dials">
                <Dial v={tuning.turb} cap="turb" onChange={(f) => setTuning((t) => ({ ...t, turb: f(t.turb) }))} />
                <Dial v={tuning.expo} cap="expo" onChange={(f) => setTuning((t) => ({ ...t, expo: f(t.expo) }))} />
                <Dial v={tuning.spin} cap="spin" onChange={(f) => setTuning((t) => ({ ...t, spin: f(t.spin) }))} />
              </div>

              {/* the scale is drawn; the needle stays parked until there is
                  real audio to read (law 3: texture never fakes a value) */}
              <div className="pl-row pl-peak">
                <div className="pl-peak-hd"><span className="k">//peak_</span><span className="v">idle</span></div>
                <Scale />
              </div>

              {/* scope's real audio graph, said in the sheet's own rows */}
              <div className="pl-path">
                <div className="pl-row"><span className="k">//path_</span><span className="v">signal chain</span></div>
                {PATH.map((p) => (
                  <div
                    key={p.n}
                    className={`pl-prow${p.sub ? ' sub' : ''}`}
                    onMouseEnter={() => setPathHover(p.i)}
                    onMouseLeave={() => setPathHover(null)}
                  >
                    <span className="ix">{p.ix}</span>
                    <span className="nm">{p.n}</span>
                    <span className="dt">{p.d}</span>
                  </div>
                ))}
                <div className="pl-pathcap">{pathHover ?? 'hover a stage'}</div>
              </div>

              <div className="pl-pills">
                <span className="pill on">( idle )</span>
                <span className="pill">( ready )</span>
                <span className="pill">( 44.1k )</span>
              </div>
              <div className="pl-strip" aria-hidden="true" />
            </div>
          </div>

          <footer className="pl-ftr">
            <span>/ webgl · 108k particles</span>
            <span>/ drop a track anywhere</span>
            <span>/ audius · artist-owned radio</span>
          </footer>
        </div>
      )}

      {/* THE CONSOLE RAIL — the live state's spine. One engineered column
          instead of four floating corners: brand plate, tracking readout,
          source switch, and the transport deck pinned at its foot. Children
          cascade in on boot via --i indexed delays. */}
      {/* THE CONSOLE PLATE — the same sheet the landing is, so powering on
          does not change design language. Running header, one gapless rail
          column, the stage, running footer. The star canvas stays full-bleed
          BEHIND this frame; the plate is a frame over it, not a container. */}
      {started && (
        <div className="cn-plate">
          {/* the brand and the src/pitch plate stop being rail children:
              both are running-header cells now (mockup, header row) */}
          <header className="pl-hdr cn-hdr">
            <div><b>[scope-02]</b> console</div>
            <div className="k">
              //src_ <span>{SOURCE_ID[source]}</span>
              <i className={`src-dot${playing ? ' live' : ''}`} />
            </div>
            {source !== 'tube' && (
              <div className={`k${rate !== 1 ? ' armed' : ''}`}>//rate_ <span>{rate.toFixed(2)}×</span></div>
            )}
            <button
              className="rail-help"
              onClick={() => setOnboard(true)}
              aria-label="how to play"
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">?</span>
            </button>
          </header>

          <div className="cn-body">
        <main className="rail" aria-label="instrument console">
          <h1 className="sr-only">scope console</h1>
          {/* 1 · NOW PLAYING — what you hear, and every control that acts on
              it, in the order every music player taught the world: title,
              artist, scrubber + time, transport. The loudest block in the
              rail because it is the most-used. */}
          <h2 className="cn-mod"><span>01 · now playing</span><i>//deck_</i></h2>
          <div className="nowplaying rail-sec" style={{ '--i': 1 } as React.CSSProperties}>
            {source !== 'tube' && (
            <div className="pl-row cn-track">
              <span className="k">//track_</span>
              <samp className="deck-name" role="status" aria-live="polite"><Decode text={name} duration={700} /></samp>
            </div>
            )}
            {track && source !== 'tube' && (
              /* §5 phase 2: track meta as plate rows. As inline spans it
                 wrapped mid-value in a 272px rail ("BPM - /73"). */
              <dl className="deck-meta">
                <div><dt>//bpm_</dt><dd ref={bpmRef} className="deck-bpm">--</dd></div>
                {track.musicalKey && (
                  <div><dt>//key_</dt><dd>{track.musicalKey.toLowerCase()}</dd></div>
                )}
                {track.genre && <div><dt>//genre_</dt><dd>{track.genre.toLowerCase()}</dd></div>}
                {track.link && (
                  <div>
                    <dt>//artist_</dt>
                    <dd>
                      <a href={track.link} target="_blank" rel="noopener noreferrer">
                        {track.artist.replace(' · audius', '')}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            )}
            {source !== 'tube' && (
            <canvas
              ref={waveRef}
              className="deck-wave"
              width={464}
              height={104}
              role="slider"
              tabIndex={0}
              aria-label="seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(scrubPct)}
              aria-valuetext={scrubText}
              onKeyDown={(e) => {
                const eng = engineRef.current
                if (!eng) return
                const dur = eng.kind === 'stems' && stemDeckRef.current
                  ? stemDeckRef.current.duration
                  : eng.el.duration
                if (!isFinite(dur) || dur <= 0) return
                const seek = (t: number) => {
                  const to = Math.max(0, Math.min(dur, t))
                  if (eng.kind === 'stems' && stemDeckRef.current) stemDeckRef.current.seek(to)
                  else eng.el.currentTime = to
                }
                const now = eng.kind === 'stems' && stemDeckRef.current
                  ? stemDeckRef.current.currentTime()
                  : eng.el.currentTime
                if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); seek(now + 5) }
                else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); seek(now - 5) }
                else if (e.key === 'Home') { e.preventDefault(); e.stopPropagation(); seek(0) }
                else if (e.key === 'End') { e.preventDefault(); e.stopPropagation(); seek(dur) }
              }}
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
            )}
            {source !== 'tube' && (
            <div className="deck-time">
              <data ref={cElapsedRef}>0:00</data>
              <data ref={cTotalRef}>0:00</data>
            </div>
            )}
            <div className={`railfold${source !== 'mic' ? ' open' : ''}`}>
              {/* no-pitch: YouTube exposes no rate control, so the dial is not
                  rendered at all in jukebox mode. vol then has to span the
                  full row — an unfilled cell in a gap:1px grid is a hole
                  showing the line colour, not empty space. */}
              <div className={`transport${source === 'tube' ? ' no-pitch' : ''}`}>
                <button
                  className="t-btn"
                  onClick={() => {
                    const e = engineRef.current
                    if (!e) return
                    // in jukebox mode our element is silent by design; the
                    // transport must drive the player that actually sounds
                    if (e.kind === 'tube') {
                      if (tubeState?.playing) tubeRef.current?.pause()
                      else tubeRef.current?.play()
                      return
                    }
                    if (e.kind === 'stems') {
                      const d = stemDeckRef.current
                      if (d) d.playing ? d.pause() : d.play()
                      return
                    }
                    if (e.el.paused) void e.el.play()
                    else e.el.pause()
                  }}
                >
                  {source === 'tube' ? (tubeState?.playing ? 'pause' : 'play') : paused ? 'play' : 'pause'}
                </button>
                <button
                  className="t-btn"
                  onClick={() => {
                    const e = engineRef.current
                    if (!e) return
                    // without this, skip left the jukebox for the radio
                    if (e.kind === 'tube') { tubeRef.current?.next(); return }
                    if (e.kind === 'radio') void e.next()
                    else void e.playRadio()
                  }}
                >
                  {source === 'file' || source === 'stems' ? 'radio' : 'skip'}
                </button>
                <button
                  className={`t-btn t-mute${muted ? ' on' : ''}`}
                  aria-pressed={muted}
                  onClick={() => {
                    const next = !muted
                    setMuted(next)
                    // our own gain is already 0 in jukebox mode, so muting
                    // it would do nothing audible — mute the player that
                    // actually sounds. The star stops reacting too, which
                    // is correct: no sound, no reaction.
                    if (engineRef.current?.kind === 'tube') {
                      if (next) tubeRef.current?.mute()
                      else tubeRef.current?.unMute()
                      return
                    }
                    engineRef.current?.setMuted(next)
                  }}
                >
                  {muted ? 'muted' : 'mute'}
                </button>
                <div className="vol">
                  <span>vol</span>
                  <input
                    type="range" min={0} max={1} step={0.01} value={volume}
                    onChange={(ev) => {
                      const v = Number(ev.target.value)
                      setVolume(v)
                      // in jukebox mode our gain is 0, so drive the player
                      // that actually sounds
                      if (engineRef.current?.kind === 'tube') tubeRef.current?.setVolume(v)
                    }}
                    aria-label="volume"
                  />
                </div>
                {source !== 'tube' && (
                  <label className="dial dial-pitch">
                    <span>pitch</span>
                    <input
                      type="range" min={0.5} max={1.5} step={0.01} value={rate}
                      onChange={(ev) => setRate(Number(ev.target.value))}
                      onDoubleClick={() => setRate(1)}
                      aria-label="pitch (playback speed, bends like vinyl)"
                    />
                    <data className={rate !== 1 ? 'armed' : ''}>{Math.round(rate * 100)}</data>
                  </label>
                )}
              </div>
            </div>
            <div className={`railfold${(source === 'radio' || source === 'file') && track ? ' open' : ''}`}>
              <button
                className="deck-split"
                onClick={() => { if (!splitState) void doSplit() }}
                aria-disabled={!!splitState}
                aria-busy={!!splitState}
              >
                {splitState ?? 'split into stems'}
              </button>
              {/* disabled would drop focus and leave the a11y tree; a live
                  sibling announces progress without stealing the control */}
              <span className="sr-only" role="status">{splitState ?? ''}</span>
            </div>
          </div>

          {/* 06 · JUKEBOX — visible only in tube mode. The player is
              deliberately on screen: YouTube's embed policies require it,
              and a hidden player makes "what am I listening to" unanswerable. */}
          <div className={`railfold${source === 'tube' ? ' open' : ''}`}>
            <div className="tube rail-sec">
              <h2 className="cn-mod"><span>06 · jukebox</span><i>//youtube_</i></h2>

              {/* only what the API actually reports */}
              {tubeState?.title && (
                <div className="pl-row"><span className="k">//track_</span><span className="v">{tubeState.title}</span></div>
              )}
              {tubeState?.channel && (
                <div className="pl-row"><span className="k">//channel_</span><span className="v">{tubeState.channel}</span></div>
              )}
              {tubeState && tubeState.duration > 0 && (
                <div className="pl-row">
                  <span className="k">{fmtTime(tubeState.elapsed)}</span>
                  <span className="v">{fmtTime(tubeState.duration)}</span>
                </div>
              )}

              {/* the consent moment: said before the dialog, not after */}
              <div className="tube-listen">
                {!listening ? (
                  <>
                    <p className="cn-hint">
                      the star can react to this tab. nothing is recorded and
                      nothing leaves your machine. scope only reads the levels.
                    </p>
                    <div className="cells c1">
                      <button onClick={() => void startListening()}>let the star listen</button>
                    </div>
                    <p className="cn-hint tube-step">
                      chrome will ask what to share. pick <b>this tab</b>, then tick{' '}
                      <b>also share tab audio</b>. that checkbox is the one that matters.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="pl-row">
                      <span className="k">//listening_</span>
                      {signal === 'silent' ? (
                        <span className="v sig-silent">no audio</span>
                      ) : (
                        <span className="v listening-dot">this tab</span>
                      )}
                    </div>
                    {/* the share is live but carrying no sound — say what to
                        do about it here, where the person is looking */}
                    {signal === 'silent' && (
                      <p className="cn-hint tube-step" role="status">
                        this tab is shared but no sound is coming through. stop,
                        share again, and tick <b>also share tab audio</b> in the
                        chrome dialog. it is off by default.
                      </p>
                    )}
                    <div className="cells c1">
                      <button onClick={stopListening}>stop listening</button>
                    </div>
                  </>
                )}
              </div>

              {/* the mix gestures genuinely cannot reach youtube's output */}
              <p className="cn-hint">
                grabbing the star is off here. youtube owns the sound, so eq,
                filter and echo would move nothing. the visual dials still work.
              </p>

              <div className="vibe tube-paste">
                <input
                  value={tubePaste}
                  onChange={(e) => setTubePaste(e.target.value)}
                  placeholder="paste a youtube link or id"
                  aria-label="play a youtube link"
                  spellCheck={false}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return
                    const id = parseVideoId(tubePaste)
                    if (id) { tubeRef.current?.load(id); setTubePaste('') }
                    else engineRef.current?.announce('not a youtube link', 'paste a watch url or an 11-character id')
                  }}
                />
                <button
                  onClick={() => {
                    const id = parseVideoId(tubePaste)
                    if (id) { tubeRef.current?.load(id); setTubePaste('') }
                    else engineRef.current?.announce('not a youtube link', 'paste a watch url or an 11-character id')
                  }}
                >go</button>
              </div>

              <div className="tube-list">
                {HINDI.map((t) => (
                  <button
                    key={t.id}
                    className={tubeState?.videoId === t.id ? 'on' : ''}
                    onClick={() => tubeRef.current?.load(t.id)}
                  >
                    <span>{t.title}</span><i>{t.channel}</i>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <h2 className="cn-mod"><span>02 · feed</span><i>//source_</i></h2>
          <div className="rail-src rail-sec" role="radiogroup" aria-label="audio source" style={{ '--i': 2 } as React.CSSProperties}>
            <button role="radio" aria-checked={source === 'radio'} className={source === 'radio' ? 'on' : ''} onClick={() => void engineRef.current?.playRadio()}>
              <Decode text="radio" duration={380} replayOnHover />
            </button>
            <button role="radio" aria-checked={source === 'file'} className={source === 'file' ? 'on' : ''} onClick={() => fileRef.current?.click()}>
              <Decode text="file" duration={380} replayOnHover />
            </button>
            <button role="radio" aria-checked={source === 'mic'} className={source === 'mic' ? 'on' : ''} onClick={() => void engineRef.current?.useMic()}>
              <Decode text="mic" duration={380} replayOnHover />
            </button>
            <button
              role="radio"
              aria-checked={source === 'tube'}
              className={source === 'tube' ? 'on' : ''}
              onClick={() => void enterTube()}
            >
              <Decode text="tube" duration={380} replayOnHover />
            </button>
          </div>

          {/* SET YOUR VIBE — the radio takes a prompt, not a taxonomy. The
              state line shows the interpretation: the instrument never
              hides how it heard you. */}
          <div className={`railfold${source === 'radio' ? ' open' : ''}`}>
            <div className="tuner rail-sec" style={{ '--i': 3 } as React.CSSProperties}>
              <form
                className="vibe tuner-find"
                onSubmit={(e) => { e.preventDefault(); void setVibe(query) }}
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="set your vibe · or name an artist"
                  aria-label="set your vibe"
                  spellCheck={false}
                />
                <button type="submit" aria-label="set vibe">go</button>
              </form>
              <div className="tuner-chips">
                {['late night drive', 'gym rage', 'rainy study', 'rooftop sunset'].map((v) => (
                  <button key={v} onClick={() => { setQuery(v); void setVibe(v) }}>
                    {v}
                  </button>
                ))}
              </div>
              <span className="tuner-state" role="status">
                {tuning2 === 'loading'
                  ? 'reading the vibe …'
                  : tuning2 === 'empty'
                    ? 'nothing playable found · try other words'
                    : vibeRead ?? 'streaming from audius · artist-owned'}
              </span>
            </div>
          </div>

          {/* 3 · LAYERS — every ring's visible twin. */}
          <h2 className="cn-mod">
            <span>03 · layers</span>
            <i>{source === 'tube' ? '//meters only_' : '//each row is a ring_'}</i>
          </h2>
          {source === 'tube' && layerUi && (
            <p className="cn-hint">
              the meters are live. the faders are not: youtube owns the sound
              in jukebox mode, so moving them would change nothing.
            </p>
          )}
          {!layerUi && (
            <p className="cn-hint">pull the star apart (or press d) to mix its rings</p>
          )}
          <div className={`railfold${layerUi ? ' open' : ''}`}>
            <div className="layers rail-sec" style={{ '--i': 4 } as React.CSSProperties}>
              {(layerUi ?? lastLayersRef.current ?? []).map((L) => (
                <div
                  key={L.i}
                  className={`layer${L.muted ? ' layer-muted' : ''}${L.solo ? ' layer-solo' : ''}${L.hot ? ' layer-hot' : ''}`}
                  onMouseEnter={() => tierCtlRef.current?.hover(L.i)}
                  onMouseLeave={() => tierCtlRef.current?.hover(-1)}
                >
                  <span className="layer-name">
                    {String(L.i + 1).padStart(2, '0')} {L.label}
                    <i className="layer-meter">
                      {Array.from({ length: 8 }, (_, k) => (
                        <b key={k} className={k < Math.round(Math.min(1, L.level * 2.6) * 8) ? 'on' : ''} />
                      ))}
                    </i>
                  </span>
                  <input
                    type="range" min={0} max={2} step={0.01} value={L.gain}
                    onChange={(ev) => tierCtlRef.current?.gain(L.i, Number(ev.target.value))}
                    onDoubleClick={() => tierCtlRef.current?.gain(L.i, 1)}
                    aria-label={`${L.label} level`}
                    disabled={source === 'tube'}
                  />
                  <button
                    className={`layer-btn${L.solo ? ' on' : ''}`}
                    aria-label={`solo ${L.label}`}
                    aria-pressed={L.solo}
                    disabled={source === 'tube'}
                    onClick={() => tierCtlRef.current?.solo(L.i)}
                  >
                    <span aria-hidden="true">s</span>
                  </button>
                  <button
                    className={`layer-btn layer-btn-m${L.muted ? ' on' : ''}`}
                    aria-label={`mute ${L.label}`}
                    aria-pressed={L.muted}
                    disabled={source === 'tube'}
                    onClick={() => tierCtlRef.current?.mute(L.i)}
                  >
                    <span aria-hidden="true">m</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4 · VISUALS — how the star reacts. Audio controls live with
              the track; these dials only shape the matter. */}
          <h2 className="cn-mod"><span>04 · visuals</span><i>//how the star reacts_</i></h2>
          <div className="tuning rail-sec" style={{ '--i': 5 } as React.CSSProperties}>
            {/* The SAME dial the landing ships. These were UA-default range
                inputs rendering the same three parameters in a second
                vocabulary — one product cannot hold two. */}
            <div className="pl-dials console-dials">
              {([['turb', 'turb'], ['expo', 'expo'], ['spin', 'spin']] as const).map(([k, label]) => (
                <Dial
                  key={k}
                  v={tuning[k]}
                  cap={label}
                  onChange={(f) => setTuning((t) => ({ ...t, [k]: f(t[k]) }))}
                />
              ))}
            </div>
            <div className="presets">
              {([['calm', { turb: 0.6, expo: 0.8, spin: 0.5 }], ['std', { turb: 1, expo: 1, spin: 1 }], ['violent', { turb: 1.6, expo: 1.3, spin: 1.8 }]] as const).map(([name2, t]) => (
                <button key={name2} onClick={() => setTuning(t)}>
                  <Decode text={name2} duration={300} replayOnHover />
                </button>
              ))}
            </div>
          </div>

          {/* 4 · SPECTRUM — docked into the panel. It carried real content
              while hovering over the star, which is what made it a card. */}
          <h2 className="cn-mod"><span>05 · spectrum</span><i>//24 bands_</i></h2>
          <div className="spec rail-sec" style={{ '--i': 6 } as React.CSSProperties}>
            <canvas ref={specRef} width={400} height={144} aria-hidden="true" />
            <div className="spec-hz">
              <span>60</span><span>250</span><span>1k</span><span>4k</span><span>12k</span>
            </div>
          </div>

          {/* 5 · FOOT — the level meter, states that only speak when armed,
              the legend, and diagnostics for those who ask. */}
          <div className="rail-foot rail-sec" style={{ '--i': 7 } as React.CSSProperties}>
            <div className="level">
              <span className="level-tag">level</span>
              <div ref={levelRef} className="level-meter" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
              </div>
            </div>
            <div className="chips" aria-live="off">
              <span ref={zoomRef} className="chip" />
              <span ref={fltRef} className="chip" />
              <span ref={echoRef} className="chip" />
              <span ref={sectRef} className="chip" />
            </div>
            {source !== 'stems' && (
              <span className="stemhint">have stems? drop them together (vocals·drums·bass). split any track locally with stemdeck</span>
            )}
            <kbd className="keyline keyline-closed">grab the orb: pull=eq · across=filter · far=echo · axis (or d)=dissect · spc pause · n skip · ←→ seek · [ ] filter · e/E echo · \ flat · r/shift+f/shift+m src · +/-/0 zoom · shift+h hide</kbd>
            <kbd className="keyline keyline-open">stack open: drag a ring=level · tap=solo · push to the axis=mute · pull the axis down (or d)=close</kbd>
          </div>
        </main>

            {/* the stage: the star burns through this cell, framed by
                brackets and nothing else. All the measuring chrome that
                used to bleed across it now lives in the panel. */}
            <div className="cn-stage">
              <i className="cn-brk tl" /><i className="cn-brk tr" />
              <i className="cn-brk bl" /><i className="cn-brk br" />

              {/* The jukebox is the subject while it plays, so it takes the
                  stage as a framed plate — the same treatment the landing
                  gives its particle field. The star burns on around it.
                  Visible by policy: YouTube's embed terms require it. */}
              {source === 'tube' && (
                <figure className="tube-fig">
                  <div ref={tubeHostRef} className="tube-player" />
                  <i className="brk tl" /><i className="brk tr" />
                  <i className="brk bl" /><i className="brk br" />
                  <svg className="reg a" width="13" height="13" aria-hidden="true">
                    <g stroke="var(--red)" strokeWidth="1">
                      <line x1="6.5" y1="0" x2="6.5" y2="13" /><line x1="0" y1="6.5" x2="13" y2="6.5" />
                    </g>
                  </svg>
                  <svg className="reg b" width="13" height="13" aria-hidden="true">
                    <g stroke="var(--red)" strokeWidth="1">
                      <line x1="6.5" y1="0" x2="6.5" y2="13" /><line x1="0" y1="6.5" x2="13" y2="6.5" />
                    </g>
                  </svg>
                  <figcaption className="tube-figcap">
                    <span>fig.02 · jukebox</span>
                    <span className={signal === 'silent' ? 'sig-silent' : undefined}>
                    {signal === 'live'
                      ? 'star listening'
                      : signal === 'silent'
                        ? 'no audio shared'
                        : 'star idle'}
                  </span>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>

          <footer className="pl-ftr cn-ftr">
            <span>/ webgl · 108k particles</span>
            <span>/ grab the star to mix · [?] for the full legend</span>
            <span className="diag">
              <button className="diag-toggle" onClick={() => setDiag((d) => !d)} aria-expanded={diag}>
                diag {diag ? '[-]' : '[+]'}
              </button>
              {diag && <samp ref={diagRef} className="diag-line">fps -- · pts -- · quality --</samp>}
            </span>
          </footer>
        </div>
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

      {started && onboard && <Onboard ops={tourOpsRef.current} onDone={() => setOnboard(false)} />}

      <div className="scanlines" />
      <div className="grain" />
    </div>
  )
}

/* ══ standby plate furniture ═══════════════════════════════════════════
   Drawn, never typed: the craft floor forbids glyph characters standing in
   for icons, and DESIGN.md law 3 forbids texture that could read as data. */

/** Morse texture: dot 4 wide, dash 16, uniform 8 gap. Pattern only. */
const MORSE = (() => {
  const seq = '..-.-.--..-.--..-.-..--.-.-..--..-.-.'
  const rects: { x: number; w: number }[] = []
  let x = 0
  for (const c of seq) {
    const w = c === '-' ? 16 : 4
    rects.push({ x, w })
    x += w + 8
  }
  return { rects, total: x - 8 }
})()

/** scope's actual graph, in order (src/audio/graph.ts). */
const PATH: { ix: string; n: string; d: string; i: string; sub?: boolean }[] = [
  { ix: '01', n: 'src', d: 'radio · file · mic', i: 'the audio you feed it: radio, a file, or the mic' },
  { ix: '02', n: 'eq', d: '3 shelves', i: 'three shelves, the ones the orb bends when you grab it' },
  { ix: '03', n: 'tiers', d: '6 peaking', i: 'six peaking filters, one per dissection ring' },
  { ix: '04', n: 'filter', d: 'hp / lp', i: 'the colour sweep: high-pass left, low-pass right' },
  { ix: '05', n: 'echo', d: 'parallel loop', i: 'a tempo-locked delay with feedback, sent in parallel' },
  { ix: '06', n: 'analyser', d: '24 bands', i: '24 log bands: everything the star sees' },
  { ix: '', n: 'star', d: 'visuals tap here', sub: true, i: 'the visuals read the analyser, never the output: mute keeps the star dancing' },
  { ix: '07', n: 'out', d: 'master gain', i: 'master gain, and the node that mute silences' },
]

function Reg({ className }: { className: string }) {
  return (
    <svg className={className} width="13" height="13" aria-hidden="true">
      <g stroke="var(--red)" strokeWidth="1">
        <line x1="6.5" y1="0" x2="6.5" y2="13" />
        <line x1="0" y1="6.5" x2="13" y2="6.5" />
      </g>
    </svg>
  )
}

/** Block meter: how much of the shell renders at zoom 1. */
function Meter() {
  return (
    <svg width="86" height="9" aria-hidden="true">
      <g fill="var(--ink)">
        {[0, 10, 20, 30, 40].map((x) => <rect key={x} x={x} y="0" width="7" height="9" />)}
      </g>
      <g fill="none" stroke="currentColor">
        {[50.5, 60.5, 70.5, 79.5].map((x) => <rect key={x} x={x} y=".5" width="6" height="8" />)}
      </g>
    </svg>
  )
}

const DIAL_MIN = 0.25
const DIAL_MAX = 2

/**
 * A dial you can actually turn, on the landing page. Drag it vertically or
 * use the arrows: the star reshapes under the frame while the instrument is
 * still on standby, which is the whole point of showing it there.
 */
function Dial({
  v,
  cap,
  onChange,
}: {
  v: number
  cap: string
  /** takes an updater, so held arrow keys accumulate instead of racing renders */
  onChange: (next: (prev: number) => number) => void
}) {
  const drag = useRef<{ y: number; v: number } | null>(null)
  const clamp = (n: number) => Math.max(DIAL_MIN, Math.min(DIAL_MAX, n))
  const a = ((-135 + ((v - DIAL_MIN) / (DIAL_MAX - DIAL_MIN)) * 270) * Math.PI) / 180
  const nudge = (d: number) => onChange((p) => clamp(Number((p + d).toFixed(2))))
  return (
    <div
      className="pl-dial"
      role="slider"
      tabIndex={0}
      aria-label={cap}
      aria-valuemin={DIAL_MIN}
      aria-valuemax={DIAL_MAX}
      aria-valuenow={Number(v.toFixed(2))}
      aria-valuetext={`${cap} ${Math.round(v * 100)}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        drag.current = { y: e.clientY, v }
      }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d) return
        // ~200px for the full sweep: a slam of the wrist should not max it
        const next = clamp(d.v + ((d.y - e.clientY) / 200) * (DIAL_MAX - DIAL_MIN))
        onChange(() => next)
      }}
      onPointerUp={(e) => {
        drag.current = null
        e.currentTarget.releasePointerCapture(e.pointerId)
      }}
      onDoubleClick={() => onChange(() => 1)}
      onKeyDown={(e) => {
        const s = e.shiftKey ? 0.25 : 0.05
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); nudge(s) }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); nudge(-s) }
        else if (e.key === 'Home') { e.preventDefault(); onChange(() => 1) }
      }}
    >
      <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
        <rect x=".5" y=".5" width="41" height="41" fill="none" stroke="currentColor" opacity=".5" />
        <circle cx="21" cy="21" r="13" fill="none" stroke="currentColor" />
        <line
          x1="21" y1="21"
          x2={(21 + Math.sin(a) * 12).toFixed(1)}
          y2={(21 - Math.cos(a) * 12).toFixed(1)}
          stroke="var(--ink)" strokeWidth="1.5"
        />
        <circle cx="21" cy="21" r="1.6" fill="var(--red)" />
      </svg>
      <span className="cap">{cap} <b>{Math.round(v * 100)}</b></span>
    </div>
  )
}

/** The spectrum ruler. Drawn scale, no needle: standby has no signal. */
function Scale() {
  return (
    <svg width="100%" height="22" preserveAspectRatio="none" viewBox="0 0 280 22" aria-hidden="true">
      <g stroke="currentColor">
        <line x1="0" y1="11.5" x2="280" y2="11.5" opacity=".5" />
        {[1, 36, 71, 106, 141, 176, 211, 246, 279].map((x, i) => (
          <line key={x} x1={x} y1={i % 3 === 0 ? 3 : 7} x2={x} y2="11" />
        ))}
      </g>
      <text x="0" y="21" fill="currentColor" fontSize="6" fontFamily="monospace">20HZ</text>
      <text x="259" y="21" fill="currentColor" fontSize="6" fontFamily="monospace">20KHZ</text>
    </svg>
  )
}

/**
 * The standby strip: layered vertical hairlines with a dithered falloff
 * (DESIGN.md primitive 11), scrolling right to left over a rolling history
 * of the star's REAL motion. Sway the pointer over the body and the trace
 * spikes — it is an instrument readout before there is any audio to read,
 * which is why it is labelled MOTION and not SPECTRA.
 */
function drawMotionStrip(cv: HTMLCanvasElement | null, hist: Float32Array, head: number) {
  if (!cv) return
  const g = cv.getContext('2d')
  const w = cv.clientWidth
  const h = cv.clientHeight
  if (!g || w < 2 || h < 2) return
  const d = Math.min(2, window.devicePixelRatio || 1)
  if (cv.width !== w * d || cv.height !== h * d) {
    cv.width = w * d
    cv.height = h * d
  }
  g.setTransform(d, 0, 0, d, 0, 0)
  g.clearRect(0, 0, w, h)
  const mid = h / 2
  const n = hist.length
  for (let i = 0; i < w; i++) {
    // oldest sample at the left edge, newest at the right: the trace scrolls
    const v = hist[(head + Math.floor((i / w) * n)) % n]
    const jag = 0.62 + 0.38 * Math.sin(i * 0.7) * Math.cos(i * 0.13)
    const a = Math.max(0.5, v * jag * (h * 0.46))
    const lit = 0.28 + 0.72 * Math.pow(v, 0.6)
    g.fillStyle = `rgba(234,234,239,${(lit * (0.4 + Math.random() * 0.6)).toFixed(3)})`
    g.fillRect(i, mid - a, 1, a * 2)
    if (Math.random() < v * 0.5) {
      g.fillStyle = `rgba(234,234,239,${(lit * 0.5).toFixed(3)})`
      g.fillRect(i, mid - a * 1.5, 1, a * 0.4)
    }
  }
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
    g.fillStyle = '#e13b2a'
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

/**
 * The survey drawing. While the orb is dissected, each tier is annotated in
 * the language of an exploded engineering plot: the true projected ellipse
 * of the ring, numbered vertex markers riding the spin, dashed drop-lines
 * tying the tiers to each other, a label with the tier's live level, and a
 * master compass at the base of the stack. All alpha rides the shear, so
 * the drawing assembles as the star comes apart.
 */
function drawSurvey(
  cv: HTMLCanvasElement | null,
  scene: Scene,
  tiers: { label: string }[],
  levels: Float32Array,
  marks: { solo: number; muted: boolean[] },
  beat: number,
  rms: number,
  seam = false,
) {
  const g = cv?.getContext('2d')
  if (!cv || !g) return
  const dp = Math.min(2, window.devicePixelRatio || 1)
  const W = cv.width / dp
  const H = cv.height / dp
  g.setTransform(dp, 0, 0, dp, 0, 0)
  g.clearRect(0, 0, W, H)
  const dis = scene.dissect

  // The seam — the machine's split line, shown while the hand is on the
  // axis and the star is still whole. Rides the cluster's tilt, so it
  // reads as part of the object, not a cursor decoration.
  if (seam && dis < 0.5) {
    const sa = 0.55 * (1 - dis * 2)
    const t = scene.projectLocal(0, 0.78, 0)
    const b = scene.projectLocal(0, -0.78, 0)
    g.strokeStyle = `rgba(234,234,234,${sa})`
    g.lineWidth = 1
    g.setLineDash([3, 6])
    g.beginPath()
    g.moveTo(t.x, t.y)
    g.lineTo(b.x, b.y)
    g.stroke()
    g.setLineDash([])
    g.fillStyle = `rgba(225, 59, 42,${Math.min(1, sa + 0.25)})`
    g.beginPath()
    g.moveTo(t.x - 4, t.y - 6)
    g.lineTo(t.x + 4, t.y - 6)
    g.lineTo(t.x, t.y - 13)
    g.closePath()
    g.fill()
    g.beginPath()
    g.moveTo(b.x - 4, b.y + 6)
    g.lineTo(b.x + 4, b.y + 6)
    g.lineTo(b.x, b.y + 13)
    g.closePath()
    g.fill()
  }

  // the chrome arrives later than the matter — rings first, then the ink
  const a = Math.max(0, Math.min(1, (dis - 0.25) / 0.55))
  if (a <= 0.01) return
  const n = tiers.length
  const ink = (al: number) => `rgba(234,234,234,${al * a})`
  const red = (al: number) => `rgba(225, 59, 42,${al * a})`
  g.textBaseline = 'middle'
  g.lineWidth = 1

  // the spine
  const top = scene.surveyPoint(n - 1, 0, 0)
  const bot = scene.surveyPoint(0, 0, 0)
  g.strokeStyle = ink(0.5)
  g.beginPath()
  g.moveTo(bot.x, bot.y + 30)
  g.lineTo(top.x, top.y - 30)
  g.stroke()

  const M = 8
  // one clean plate column right of the widest ring, like the reference's
  // margin numbers — plates never sit on the matter
  let plateX = 0
  for (let i = 0; i < n; i++) {
    const c0 = scene.surveyPoint(i, 0, 0)
    const a1 = scene.surveyPoint(i, 0, 1)
    const a2 = scene.surveyPoint(i, Math.PI / 2, 1)
    plateX = Math.max(plateX, c0.x + Math.max(Math.hypot(a1.x - c0.x, a1.y - c0.y), Math.hypot(a2.x - c0.x, a2.y - c0.y)))
  }
  plateX = Math.min(W - 128, plateX + 16)
  for (let i = 0; i < n; i++) {
    const soloed = marks.solo === i
    const muted = !!marks.muted[i]
    const hot = scene.hiTier === i

    // the ring's true projected ellipse — heats with its row
    g.strokeStyle = soloed ? red(0.8) : ink(hot ? 0.85 : muted ? 0.14 : 0.38)
    g.beginPath()
    for (let k = 0; k <= 48; k++) {
      const p = scene.surveyPoint(i, (k / 48) * Math.PI * 2)
      if (k === 0) g.moveTo(p.x, p.y)
      else g.lineTo(p.x, p.y)
    }
    g.stroke()

    // the nested inner ring — the drawing's concentric vocabulary
    g.strokeStyle = soloed ? red(0.4) : ink(muted ? 0.08 : 0.2)
    g.beginPath()
    for (let k = 0; k <= 36; k++) {
      const p = scene.surveyPoint(i, (k / 36) * Math.PI * 2, 0.46)
      if (k === 0) g.moveTo(p.x, p.y)
      else g.lineTo(p.x, p.y)
    }
    g.stroke()

    // plumb lines — every other marker drops a TRUE vertical to the base
    // plane (constant x/z), the reference's survey logic; slanted
    // tier-to-tier connectors read as errors once radii differ
    if (i > 0) {
      const yB0 = scene.tierYNow(0) - (n > 1 ? (scene.tierYFull(1) - scene.tierYFull(0)) * 0.5 : 0.3)
      const rW = 0.88 * 0.56 * scene.ringProfile(i)
      g.strokeStyle = ink(0.22)
      g.setLineDash([2, 5])
      for (let k = 0; k < M; k += 2) {
        const th = (k / M) * Math.PI * 2
        const p0 = scene.surveyPoint(i, th)
        const pB = scene.projectLocal(Math.cos(th) * rW, yB0, Math.sin(th) * rW)
        g.beginPath()
        g.moveTo(p0.x, p0.y)
        g.lineTo(pB.x, pB.y)
        g.stroke()
      }
      g.setLineDash([])
    }

    // survey vertex markers, orbiting with the body — unlabeled: a number
    // that indexes nothing shouldn't be printed
    g.fillStyle = ink(muted ? 0.22 : 0.7)
    for (let k = 0; k < M; k++) {
      const p = scene.surveyPoint(i, (k / M) * Math.PI * 2)
      g.fillRect(p.x - 1.5, p.y - 1.5, 3, 3)
    }

    // the tier's data plate, in the aligned margin column
    const ctr = scene.surveyPoint(i, 0, 0)
    const lx = plateX
    g.font = 'bold 10px "JetBrains Mono", ui-monospace, monospace'
    g.fillStyle = soloed ? red(0.95) : muted ? red(0.75) : ink(hot ? 1 : 0.9)
    g.fillText(`0${i + 1} · ${tiers[i].label.toUpperCase()}`, lx, ctr.y - 7)
    g.font = '9px "JetBrains Mono", ui-monospace, monospace'
    g.fillStyle = muted ? red(0.6) : soloed ? red(0.7) : ink(0.55)
    g.fillText(
      muted ? 'MUTED' : soloed ? 'SOLO' : `LVL ${String(Math.round(levels[i] * 99)).padStart(2, '0')}`,
      lx,
      ctr.y + 6,
    )
    g.fillStyle = soloed ? red(0.8) : ink(0.8)
    g.fillRect(lx, ctr.y + 13, Math.max(1, levels[i] * 46), 2)
  }

  // the base compass — the master's small ellipse, like the reference's
  // bottom ring: a beat dot sweeps it, the sum level sits beside it.
  const gapL = n > 1 ? scene.tierYFull(1) - scene.tierYFull(0) : 0.7
  const yB = scene.tierYNow(0) - gapL * 0.75 * dis
  const rB = 0.88 * 0.56 * 0.34
  g.strokeStyle = ink(0.42)
  g.beginPath()
  for (let k = 0; k <= 32; k++) {
    const th = (k / 32) * Math.PI * 2
    const p = scene.projectLocal(Math.cos(th) * rB, yB, Math.sin(th) * rB)
    if (k === 0) g.moveTo(p.x, p.y)
    else g.lineTo(p.x, p.y)
  }
  g.stroke()
  const bth = performance.now() * 0.0011
  const bp = scene.projectLocal(Math.cos(bth) * rB, yB, Math.sin(bth) * rB)
  g.fillStyle = red(0.55 + Math.min(0.45, beat))
  g.fillRect(bp.x - 2, bp.y - 2, 4, 4)
  const cB = scene.projectLocal(0, yB, 0)
  g.font = '9px "JetBrains Mono", ui-monospace, monospace'
  g.fillStyle = ink(0.6)
  g.fillText(`SUM ${String(Math.round(Math.min(1, rms * 2.4) * 99)).padStart(2, '0')}`, cB.x + 12, cB.y)
}

/** 24 log-band bars with hanging peak caps, like the reference analyzer.
 *  Bars display an EASED value — raw analyser bins strobe; the reference's
 *  gauges glide. */
const peaks = new Float32Array(24)
const shown = new Float32Array(24)
function drawSpectrum(
  cv: HTMLCanvasElement | null,
  bands: Float32Array,
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
    // The HELD EQ range tints red while you bend it — the analytical view
    // agreeing with the sculptural one.
    if (mixBand != null) {
      const inBand = mixBand === 'low' ? i < 8 : mixBand === 'mid' ? i >= 8 && i < 16 : i >= 16
      if (inBand) g.fillStyle = `rgba(225, 59, 42,${0.45 + Math.min(0.55, Math.abs(mixDb) / 30)})`
    }
    g.fillRect(i * bw + 1, cv.height - bh, bw - 2, bh)
    // hanging peak cap — dimmer, falls slowly
    const py = cv.height - peaks[i] * (cv.height - 4)
    g.fillStyle = 'rgba(234,234,234,0.35)'
    g.fillRect(i * bw + 1, py - 2, bw - 2, 2)
  }
}
