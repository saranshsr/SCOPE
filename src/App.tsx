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
  const sectRef = useRef<HTMLElement>(null)
  const sectCellRef = useRef<HTMLDivElement>(null)
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
        stemDeckRef.current.solo(null)
        setStemInfo(null)
        scene.setVocal(0)
        applySpectralTiers()
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
      if (surveyRef.current) {
        const dp = Math.min(2, window.devicePixelRatio || 1)
        surveyRef.current.width = w * dp
        surveyRef.current.height = h * dp
      }
      focus()
    }
    measure()
    window.addEventListener('resize', measure)

    // --- THE DISSECTION -----------------------------------------------------
    // Pull the orb apart along its axis and it shears into survey rings —
    // stems when the deck holds them, the spectral anatomy otherwise. Tiers
    // are bottom-to-top, frequency-honest.
    let tiers: Tier[] = [
      { label: 'low', band: 'low' },
      { label: 'mid', band: 'mid' },
      { label: 'high', band: 'high' },
    ]
    const tierLevels = new Float32Array(6)
    const sectMuted = new Set<number>() // latched spectral-tier kills
    let sectSolo = -1 // spectral tier solo (stem solo lives in the deck)
    // One resolver for the spectral tiers' mute/solo state — a TRUE group
    // solo through the EQ desk (the other groups die), never the old
    // narrow bandpass pretending to be a tier.
    const applySpectralMix = () => {
      const eng = engineRef.current
      const killed = (i: number) => sectMuted.has(i) || (sectSolo >= 0 && sectSolo !== i)
      ;(['low', 'mid', 'high'] as const).forEach((b, i) => eng?.eq(b, killed(i) ? -30 : 0))
      scene.setEqVis(killed(0) ? 0.08 : 1, killed(1) ? 0.08 : 1, killed(2) ? 0.08 : 1)
    }
    const applySpectralTiers = () => {
      tiers = [
        { label: 'low', band: 'low' },
        { label: 'mid', band: 'mid' },
        { label: 'high', band: 'high' },
      ]
      sectMuted.clear()
      sectSolo = -1
      applySpectralMix()
      scene.setTierMap(Array.from({ length: 24 }, (_, i) => Math.floor(i / 8)), 3)
    }
    const applyStemTiers = (infos: StemInfo[]) => {
      const order: StemRole[] = ['bass', 'drums', 'other', 'vocals']
      const present = order.filter((r) => infos.some((s) => s.role === r))
      if (present.length < 2) return applySpectralTiers()
      tiers = present.map((r) => ({ label: r, role: r }))
      sectMuted.clear()
      sectSolo = -1
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
      drag: null as null | { tier: number; dx0: number; sx: number; sy: number; downAt: number; moved: boolean; lvl: number },
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
        44,
        Math.abs(scene.surveyPoint(Math.min(1, n - 1), 0, 0).y - scene.surveyPoint(0, 0, 0).y),
      )
      const ctr = scene.surveyPoint(best, 0, 0)
      const edge = scene.surveyPoint(best, 0, 1)
      const ringPx = Math.max(60, Math.hypot(edge.x - ctr.x, edge.y - ctr.y))
      return bestD < gapPx * 0.55 && Math.abs(px - ctr.x) < ringPx * 1.7 ? best : -1
    }

    // The reticle cursor — an instrument aims, it doesn't point. Eased
    // follow via transforms inside the existing frame loop (no extra rAF,
    // no layout properties). Touch devices never see it.
    const finePointer = matchMedia('(pointer: fine)').matches
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cur = { x: -100, y: -100, tx: -100, ty: -100, down: 0, overUi: false, dragging: false, lx: 0, ly: 0, axisHover: false }
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
              eng2?.eq(tr.band, lvl < 1 ? (lvl - 1) * 30 : (lvl - 1) * 9)
              const vis = lvl < 1 ? Math.max(0.05, lvl) : 1 + (lvl - 1) * 0.5
              scene.setEqVis(tr.band === 'low' ? vis : 1, tr.band === 'mid' ? vis : 1, tr.band === 'high' ? vis : 1)
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
        if (retLabelRef.current) {
          const cue = cur.axisHover ? 'dissect ↕' : ''
          // never clobber a live gesture readout — only own the hint
          if (cur.axisHover || retLabelRef.current.textContent === 'dissect ↕')
            retLabelRef.current.textContent = cue
        }
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
          sect.drag = {
            tier,
            dx0: Math.max(30, Math.abs(e.clientX - c0.x)),
            sx: e.clientX,
            sy: e.clientY,
            downAt: performance.now(),
            moved: false,
            lvl: 1,
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
        const eng2 = engineRef.current
        const deck = stemDeckRef.current
        const quick = !d.moved && performance.now() - d.downAt < 350
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
            deck.setStemGain(tr.role, 1)
          } else if (tr.band) {
            sectMuted.add(d.tier)
            eng2?.eq(tr.band, -30)
          }
        } else {
          // momentary: the fader springs home
          if (tr.role && deck) deck.setStemGain(tr.role, 1)
          else if (tr.band) eng2?.eq(tr.band, 0)
        }
        applySpectralMix()
        if (retLabelRef.current) retLabelRef.current.textContent = ''
      }
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
        applySpectralMix()
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
    let lastInfos: StemInfo[] | null = null
    let surveyDirty = false
    let seamFlashUntil = 0
    let wasStarted = false
    const tierVoice = new Float32Array(6).fill(1)
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
        lastInfos = infos
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

      // The survey drawing rides every frame while the stack is open —
      // markers, drop-lines and labels are projected from the SAME cluster
      // transform the particles just rendered with.
      // Touch has no hover: flash the seam for a few seconds after power-on
      // so every device gets shown the split line once.
      if (startedRef.current && !wasStarted) {
        wasStarted = true
        seamFlashUntil = now + 4500
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
            const [a, b] = tr.band === 'low' ? [0, 8] : tr.band === 'mid' ? [8, 16] : [16, 24]
            let m = 0
            for (let k = a; k < b; k++) m += f.bands[k]
            tierLevels[i] = Math.min(1, (m / (b - a)) * 1.6)
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
                : 1
          tierVoice[i] += (target - tierVoice[i]) * Math.min(1, dt * 9)
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
            else {
              const sb = soloRef.current
              if (sb != null && (sb < 8 ? 0 : sb < 16 ? 1 : 2) === i) marks.solo = i
            }
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
        if (sectRef.current && sectCellRef.current) {
          const dv = scene.dissect
          sectRef.current.textContent = dv > 0.02 ? `${Math.round(dv * 100)}%` : '——'
          sectCellRef.current.classList.toggle('armed', dv > 0.02)
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
          const infos = deck.info()
          setStemInfo(infos)
          // The dissection speaks stems now: one tier per separated part.
          applyStemTiers(infos)
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
      {/* The survey drawing — numbered markers, dashed drop-lines, tier
          labels — projected over the dissected stack. Exists only while
          the orb is pulled apart. */}
      <canvas ref={surveyRef} className="survey" aria-hidden="true" />
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
            <div ref={sectCellRef}><dt>sect</dt><dd ref={sectRef}>——</dd></div>
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
            <kbd className="keyline">grab the orb: pull=eq · across=filter · far=echo · pull the axis (or d) = dissect · open: drag ring=level · tap=solo · push in=mute · spc pause · n skip · 1-3 preset · r/f/m src · h hide · +/-/0 zoom</kbd>
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
    g.fillStyle = `rgba(255,42,42,${Math.min(1, sa + 0.25)})`
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
  const red = (al: number) => `rgba(255,42,42,${al * a})`
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
  let num = 0
  for (let i = 0; i < n; i++) {
    const soloed = marks.solo === i
    const muted = !!marks.muted[i]

    // the ring's true projected ellipse
    g.strokeStyle = soloed ? red(0.8) : ink(muted ? 0.14 : 0.38)
    g.beginPath()
    for (let k = 0; k <= 48; k++) {
      const p = scene.surveyPoint(i, (k / 48) * Math.PI * 2)
      if (k === 0) g.moveTo(p.x, p.y)
      else g.lineTo(p.x, p.y)
    }
    g.stroke()

    // dashed drops to the tier below — the drawing's vertical logic
    if (i > 0) {
      g.strokeStyle = ink(0.16)
      g.setLineDash([2, 5])
      for (let k = 0; k < M; k += 2) {
        const th = (k / M) * Math.PI * 2
        const p0 = scene.surveyPoint(i - 1, th)
        const p1 = scene.surveyPoint(i, th)
        g.beginPath()
        g.moveTo(p0.x, p0.y)
        g.lineTo(p1.x, p1.y)
        g.stroke()
      }
      g.setLineDash([])
    }

    // numbered survey markers, orbiting with the body
    g.font = '9px "JetBrains Mono", ui-monospace, monospace'
    g.fillStyle = ink(muted ? 0.22 : 0.7)
    for (let k = 0; k < M; k++) {
      const p = scene.surveyPoint(i, (k / M) * Math.PI * 2)
      num++
      g.fillRect(p.x - 1.5, p.y - 1.5, 3, 3)
      g.fillText(String(num), p.x + 5, p.y - 5)
    }

    // the tier's data plate, right of the ring
    const ctr = scene.surveyPoint(i, 0, 0)
    const edge = scene.surveyPoint(i, 0, 1)
    const rPx = Math.hypot(edge.x - ctr.x, edge.y - ctr.y)
    const lx = Math.min(W - 130, ctr.x + rPx + 18)
    g.font = 'bold 10px "JetBrains Mono", ui-monospace, monospace'
    g.fillStyle = soloed ? red(0.95) : muted ? red(0.75) : ink(0.9)
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
