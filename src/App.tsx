import { useEffect, useRef, useState } from 'react'
import { AudioEngine, type SourceKind, type TrackInfo } from './audio/graph'
import { FingerprintTracker } from './audio/fingerprint'
import { BeatClock } from './audio/beat'
import { PAPER_RGB, Scene } from './scope/scene'
import { Governor } from './scope/governor'
import { playlist } from './data/tracks'
import { loadPeaks, peaksFromFile, energyAhead, findDrops, nextDrop, type Drop, type TrackPeaks } from './scope/peaks'
import { fetchAudiusRadio, fetchVibe } from './audio/audius'
import { StemDeck, looksLikeStems, type StemInfo, type StemRole } from './audio/stems'
import { Decode } from './scope/Decode'
import { Onboard, shouldOnboard, type TourOps } from './ui/Onboard'
import { renderPoster } from './ui/poster'
import { clip } from './text'
import { Tube, HINDI, parseVideoId, searchTube, type TubeState, type TubeHit } from './audio/tube'
import { splitTrack, splitSelfTest, split7680Test, splitNeuralTest } from './audio/split'
import { EnergyTracker } from './audio/energy'
import type { AJState } from './audio/aj'

/**
 * scope — a polar oscilloscope made of type.
 *
 * One canvas carries the instrument (field → glyph pass). Everything around
 * it is DOM chrome in the reference's telemetry language: crosshair with the
 * playhead %, flickering band readouts, filename + waveform + sample
 * counters, and a live 24-bar spectrum. Chrome values are written straight
 * to the DOM from the frame loop — React state only handles mode changes.
 */

const SOURCE_ID: Record<SourceKind, string> = { radio: '[01]', file: '[02]', tab: '[03]', stems: '[04]', tube: '[05]', aj: '[AJ]' }

/** Track time the way every player on earth writes it. Zero or unknown
 *  prints as a blank reading, not a measured one: between a skip and the
 *  next track the element reports 0 and NaN, and '0:00 / 0:00' under the
 *  old title read as a track that had been measured at no length. */
const fmtTime = (s: number) => {
  if (!isFinite(s) || s <= 0) return '-:--'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

/** A dissection tier — a stem (role) or an EQ band group, bottom-to-top. */
type Tier = { label: string; role?: StemRole; band?: 'low' | 'mid' | 'high' }

/** How long the hand has to be gone before the chrome recedes. A taste
 *  constant: long enough that reading a row never trips it, short enough
 *  that a second screen settles before you have looked away twice. */
const WATCH_IDLE_MS = 6000
/** Set once the star has listened to the jukebox. After that, entering the
 *  jukebox starts listening in the same click: the consent was given, the
 *  checkbox was learned, and asking twice every visit was the drop-off. */
const LISTENED_KEY = 'scope-listened-v1'

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
  /** Has the instrument ever been powered on. Once it has, returning to
   *  the sheet is a standby that is still PLAYING rather than a cold
   *  splash, so the plate's readings become real and POWER ON becomes a
   *  way back in rather than a way in. */
  const [everStarted, setEverStarted] = useState(false)
  /** the climb out of the console, mirroring the dive in */
  const [arrive, setArrive] = useState(false)
  const climbRaf = useRef(0)
  /** true while the climb owns the camera, so the plate's mount effect
   *  does not snap it to the cell out from under the animation */
  const climbRef = useRef(false)
  const [track, setTrack] = useState<TrackInfo | null>(null)
  const [source, setSource] = useState<SourceKind>('radio')
  const [playing, setPlaying] = useState(false)
  // The announcement moment: each track change gets one big display-type
  // entrance before the title settles into the rail. Keyed so React restarts
  // the CSS animation per track.
  const [announce, setAnnounce] = useState<{ text: string; key: number } | null>(null)
  const [decoding, setDecoding] = useState(false)
  const [paused, setPaused] = useState(false)
  const [aj, setAj] = useState<AJState | null>(null)
  const ajBeatRef = useRef<HTMLElement>(null)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [diag, setDiag] = useState(false)
  const [tuning, setTuning] = useState({ turb: 1, expo: 1, spin: 1 })
  /** standby plate: the chain row being read, and its live motion strip */
  const [pathHover, setPathHover] = useState<string | null>(null)
  const posterWaveRef = useRef<HTMLCanvasElement | null>(null)
  /** the standby strip's reading: how much the star's core scanline changed
   *  on the last rendered frame (written by the frame loop, read by the strip) */
  const motionProbeRef = useRef(0)
  /** the plate's peak readout, written imperatively at chrome rate */
  const peakRef = useRef<HTMLSpanElement>(null)
  /** the rail's scrolling half — watched so the dock seam can say "more" */
  const railStackRef = useRef<HTMLDivElement>(null)
  /** whichever element actually scrolls the rail: .rail-stack on the plate,
   *  .rail itself on the phone sheet, where the stack goes overflow:visible.
   *  Also marked [data-rail-scroller] in the DOM, for code outside App. */
  const railScrollerRef = useRef<HTMLElement | null>(null)
  const railBarRef = useRef<HTMLElement>(null)
  /** jukebox: the YouTube player, and whether the star is listening */
  const tubeRef = useRef<Tube | null>(null)
  const tubeHostRef = useRef<HTMLDivElement>(null)
  /** The source before the jukebox, so leaving it is a BACK rather than a
   *  jump to a default. Null on a fresh load, where there is no previous
   *  mode and radio is the honest answer. State, not a ref: the exit is
   *  labelled with its destination. */
  const [prevSource, setPrevSource] = useState<SourceKind | null>(null)
  const [tubeState, setTubeState] = useState<TubeState | null>(null)
  const [listening, setListening] = useState(false)
  /** Has the star EVER listened to a tab. The consent copy and the setup
   *  steps only teach something the first time; after that they are 250px
   *  of the rail explaining a thing you have already done. */
  const [hasListened, setHasListened] = useState(() => {
    try { return localStorage.getItem(LISTENED_KEY) === '1' } catch { return false }
  })
  /** Why the last listen attempt failed. Persistent, unlike the announce. */
  const [listenErr, setListenErr] = useState<string | null>(null)
  /** What the captured stream is actually delivering — not what the browser
   *  said it granted. 'silent' is the common failure: chrome hands over a
   *  perfectly valid stream with no audio track content when the "also share
   *  tab audio" checkbox is missed, and nothing else on screen shows that. */
  const [signal, setSignal] = useState<'idle' | 'silent' | 'live'>('idle')
  const [tubePaste, setTubePaste] = useState('')
  /** Search results, or null when the starting points are showing. An empty
   *  array is a real state and not the same as null: it means "we looked and
   *  there was nothing", which the rail has to be able to say. */
  const [tubeHits, setTubeHits] = useState<TubeHit[] | null>(null)
  const [tubeSeeking, setTubeSeeking] = useState(false)
  /** bumped by the Tube's onChange so queue/recents re-render */
  const [, setTubeTick] = useState(0)
  /** Generation counter: a slow search must not overwrite a later fast one. */
  const tubeSearchGen = useRef(0)
  /** read by the render loop, which must not close over tubeState */
  const tubePlayingRef = useRef(false)

  /** the power-on flight: 'rev' while the machine spins up, 'dive' going in */
  const [boot, setBoot] = useState<'rev' | 'dive' | null>(null)
  const bootRef = useRef<'rev' | 'dive' | null>(null)
  const bootRaf = useRef(0)
  /** when the flight began: the skip listener ignores input for 400ms after
   *  it, so the second half of a double-click cannot cut the flight short */
  const bootAt = useRef(0)
  /** this flight is RESUME's (a dive from a live standby), so the button
   *  keeps saying what was pressed until the sheet has gone */
  const [resuming, setResuming] = useState(false)
  /** the engine's real sample rate, for the standby's //rate pill (law 3):
   *  null until the AudioContext exists, and the pill is absent until then */
  const [sampleRate, setSampleRate] = useState<number | null>(null)
  const [rate, setRate] = useState(1)
  const [ambient, setAmbient] = useState(false)
  /** WATCH: the chrome recedes on its own after WATCH_IDLE_MS without a
   *  hand, and the star takes the whole glass. Ambient (shift+H) is the
   *  latched version of the same room; watching is the automatic one, and
   *  any input ends it. The focus function reads the ref, not the state. */
  const [watching, setWatching] = useState(false)
  const watchRef = useRef(false)
  const [isFull, setIsFull] = useState(false)
  /** the floating mini star: a Document Picture-in-Picture window holding a
   *  2D canvas the frame loop copies the star into. */
  const pipRef = useRef<{ win: Window; cv: HTMLCanvasElement; cap: HTMLElement } | null>(null)
  const [pipOpen, setPipOpen] = useState(false)
  /** restarts the frame loop on the main window when the PiP window, which
   *  was driving it, goes away */
  const kickLoopRef = useRef<(() => void) | null>(null)
  /** phone only: the console sheet is closed by default, so the star owns
   *  the screen and the rail is one tap away rather than always underneath */
  const [sheet, setSheet] = useState(false)
  /** STAGE: for showing it to a room. The console goes, the track is set
   *  at display size, the star owns the rest. Latched like ambient: a hand
   *  moving does not end it, only s / esc / the exit cell. */
  const [stage, setStage] = useState(false)
  const [stageExit, setStageExit] = useState(false)
  /** the announce title and the stage title breathe on the measured beat;
   *  the loop writes their custom properties directly, never via React */
  const beatTypeRef = useRef<HTMLElement[]>([])
  /** the ground: ink (the dark sheet) or paper. main.tsx applies the saved
   *  one before first paint; this mirrors it. */
  const [theme, setThemeState] = useState<'ink' | 'paper'>(() =>
    document.documentElement.dataset.theme === 'paper' ? 'paper' : 'ink')
  /** what the session has measured, for the poster: sampled on the chrome
   *  tick, only while there is something to measure */
  const sessionRef = useRef({ tempo: [] as number[], level: [] as number[], peak: 0, bpm: null as number | null })
  /** set by the poster button; the frame loop fulfils it right after a
   *  render, the only moment the star's drawing buffer can be read */
  const grabRef = useRef<((c: HTMLCanvasElement) => void) | null>(null)
  /** the key handler lives in a mount-once effect; it flips the ground
   *  through this so it always sees the current one */
  const themeKeyRef = useRef<(() => void) | null>(null)
  const [posterBusy, setPosterBusy] = useState(false)
  // THE VIBE: a prompt in, a playlist out — plus the instrument's honest
  // read of how it understood you.
  const [query, setQuery] = useState('')
  const [vibeRead, setVibeRead] = useState<string | null>(null)
  // the vibe whose playlist actually loaded: what a chip's .on reports
  const [vibeOn, setVibeOn] = useState<string | null>(null)
  const [tuning2, setTuning2] = useState<'idle' | 'loading' | 'empty'>('idle')
  const [onboard, setOnboard] = useState(false)
  /** which tour: the one-card hint on power-on, the full walk from [?] */
  const [tourMode, setTourMode] = useState<'hint' | 'full'>('hint')
  // SPLIT: the playing track being separated into stems, in-browser.
  const [splitState, setSplitState] = useState<string | null>(null)
  const splitGen = useRef(0)
  const stemDeckRef = useRef<StemDeck | null>(null)
  // The stem deck is not a fifth feed: it is the file or the radio track,
  // taken apart. FEED keeps that cell checked while the stems play, and 03
  // names how many parts there really are.
  const [stemsFrom, setStemsFrom] = useState<SourceKind>('file')
  const [stemN, setStemN] = useState(0)
  // FAULTS: what went wrong, on a status row under the sources. Never the
  // now-playing line and never the announce: an error is not a track. It
  // clears on the next real track, except the track that IS the recovery
  // ("back to the radio"), which must not erase the reason it happened.
  const [fault, setFault] = useState<string | null>(null)
  const faultHold = useRef(false)
  const faultTimer = useRef(0)
  const raiseFault = (text: string, recovering = false) => {
    faultHold.current = recovering
    setFault(text)
    window.clearTimeout(faultTimer.current)
    faultTimer.current = window.setTimeout(() => setFault(null), 12000)
  }
  // SKIP asks for a track that has not arrived yet; until it does the deck
  // says so instead of holding the old title over readings of nothing.
  const [tuningNext, setTuningNext] = useState(false)
  // THE LAYER ROWS — every ring's visible twin: name, live meter, level
  // slider, solo/mute. Nothing about the stack requires a hidden gesture.
  type LayerRow = { i: number; label: string; level: number; gain: number; muted: boolean; solo: boolean; hot: boolean }
  const [layerUi, setLayerUi] = useState<LayerRow[] | null>(null)
  const layersFoldRef = useRef<HTMLDivElement>(null)
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
  /** the drop forecast row, written on the chrome tick */
  const dropRowRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLElement>(null)
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
    // pick up where the visitor left off: same video, same second. A
    // reload used to reset the jukebox to the first curated row.
    const r = tubeRef.current.resume()
    tubeRef.current.onChange = () => setTubeTick((n) => n + 1)
    void tubeRef.current.mount(tubeHostRef.current, r?.id, r?.t)
  }, [source])

  // The phone sheet is a single scroller, so its running footer is the last
  // row of that scroll instead of a band that takes 45px off a 667px phone
  // for the whole time the sheet is open. Same breakpoint as styles.css.
  const [narrow, setNarrow] = useState(() => window.matchMedia?.('(max-width: 720px)').matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.('(max-width: 720px)')
    if (!mq) return
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // The one thing a scroll region owes you is to admit it is one. macOS
  // ships overlay scrollbars, so the styled bar in styles.css is invisible
  // at rest and no CSS can force it back — which is how two whole modules
  // went missing without anyone noticing. The dock's top edge takes the
  // red keyline while there is still rail above it, and drops back to a
  // plain hairline once you have reached the end. It is a reading like any
  // other: it reports a real quantity, and it is absent when there is
  // nothing to report.
  useEffect(() => {
    const stack = railStackRef.current
    if (!started || !stack) return
    const rail = stack.parentElement
    if (!rail) return
    // WHICH element scrolls is a breakpoint decision, not a constant. On the
    // plate the stack scrolls inside a fixed rail; on the phone sheet the
    // stack goes `overflow: visible` and the rail is the one scroller. Bound
    // to the stack there, the thumb was sized off a box that never scrolls
    // -- 1133px tall on a 341px sheet -- and never moved. Resolved again on
    // every resize, since crossing 720px swaps the two.
    const resolve = (): HTMLElement =>
      getComputedStyle(stack).overflowY === 'visible' ? rail : stack
    let el: HTMLElement = resolve()
    let hide = 0
    const sync = () => {
      const more = el.scrollHeight - el.scrollTop - el.clientHeight > 1
      rail.classList.toggle('more', more)

      // the indicator's geometry, as fractions of the track
      const bar = railBarRef.current
      if (!bar) return
      // the bar is a child of .rail, so when .rail is the scroller it scrolls
      // with the content; pinning it to the scroll offset keeps it on glass
      bar.style.top = el === rail ? `${rail.scrollTop}px` : ''
      const span = el.scrollHeight - el.clientHeight
      if (span <= 1) { bar.classList.remove('on'); return }
      const h = Math.max(24, el.clientHeight * (el.clientHeight / el.scrollHeight))
      const y = (el.scrollTop / span) * (el.clientHeight - h)
      // The TRACK is the scroller, not the rail. The bar is a child of
      // .rail so it can sit outside the scrolling box, but .rail also
      // holds the pinned dock -- so left at 100% the thumb travelled a
      // 621px range inside a 768px groove and stopped 147px short of the
      // bottom at full scroll.
      bar.style.setProperty('--bar-track', `${el.clientHeight}px`)
      bar.style.setProperty('--bar-h', `${h.toFixed(1)}px`)
      bar.style.setProperty('--bar-y', `${y.toFixed(1)}px`)
    }
    // Shown only while the column is moving, then faded. A scrollbar that
    // is always there is permanent furniture for an occasional need, and
    // on a 320px column it is 3% of the width spent saying nothing.
    const flash = () => {
      const bar = railBarRef.current
      if (!bar || el.scrollHeight - el.clientHeight <= 1) return
      bar.classList.add('on')
      clearTimeout(hide)
      // a bar you are holding does not get to fade out from under you
      if (drag) return
      hide = window.setTimeout(() => bar.classList.remove('on'), 850)
    }

    // DRAGGABLE, but only once it is showing. This is how an overlay
    // scrollbar behaves and it is the only way to have both things the
    // brief asked for: invisible at rest, and a real handle when wanted.
    // The thumb is inert while hidden, or an invisible 14px strip down
    // the rail's edge would be swallowing clicks on the rows underneath
    // it for the 99% of the time nobody wants a scrollbar.
    //
    // Reaching for the edge reveals it, the same way the native one
    // does, so the handle is findable without scrolling first.
    let drag: { y: number; top: number } | null = null
    const thumb = railBarRef.current?.firstElementChild as HTMLElement | null
    const thumbH = () => Math.max(24, el.clientHeight * (el.clientHeight / el.scrollHeight))
    const nearEdge = (e: PointerEvent) => {
      if (drag) return
      const r = rail.getBoundingClientRect()
      if (e.clientX >= r.right - 18 && e.clientY >= r.top && e.clientY <= r.bottom) flash()
    }
    const onGrab = (e: PointerEvent) => {
      if (el.scrollHeight - el.clientHeight <= 1) return
      e.preventDefault()
      e.stopPropagation()
      thumb?.setPointerCapture(e.pointerId)
      drag = { y: e.clientY, top: el.scrollTop }
      railBarRef.current?.classList.add('on', 'drag')
      clearTimeout(hide)
    }
    const onDragMove = (e: PointerEvent) => {
      if (!drag) return
      e.preventDefault()
      const span = el.scrollHeight - el.clientHeight
      // the thumb travels (track - its own height), so that is what the
      // pointer's delta scales against, not the track
      const travel = Math.max(1, el.clientHeight - thumbH())
      el.scrollTop = drag.top + ((e.clientY - drag.y) / travel) * span
    }
    const onDrop = (e: PointerEvent) => {
      if (!drag) return
      drag = null
      thumb?.releasePointerCapture?.(e.pointerId)
      railBarRef.current?.classList.remove('drag')
      flash()
    }
    thumb?.addEventListener('pointerdown', onGrab)
    thumb?.addEventListener('pointermove', onDragMove)
    thumb?.addEventListener('pointerup', onDrop)
    thumb?.addEventListener('pointercancel', onDrop)
    rail.addEventListener('pointermove', nearEdge)

    const bind = () => {
      el.addEventListener('scroll', sync, { passive: true })
      el.addEventListener('scroll', flash, { passive: true })
      el.setAttribute('data-rail-scroller', '')
      railScrollerRef.current = el
    }
    const unbind = () => {
      el.removeEventListener('scroll', sync)
      el.removeEventListener('scroll', flash)
      el.removeAttribute('data-rail-scroller')
    }
    bind()
    sync()
    const ro = new ResizeObserver(() => {
      const next = resolve()
      if (next !== el) { unbind(); el = next; bind() }
      sync()
    })
    ro.observe(stack)
    ro.observe(rail)
    // folds open and close as the source changes, which changes the height
    // without resizing the container
    const mo = new MutationObserver(sync)
    mo.observe(stack, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] })
    return () => {
      unbind()
      railScrollerRef.current = null
      if (railBarRef.current) railBarRef.current.style.top = ''
      thumb?.removeEventListener('pointerdown', onGrab)
      thumb?.removeEventListener('pointermove', onDragMove)
      thumb?.removeEventListener('pointerup', onDrop)
      thumb?.removeEventListener('pointercancel', onDrop)
      rail.removeEventListener('pointermove', nearEdge)
      clearTimeout(hide)
      ro.disconnect()
      mo.disconnect()
      rail.classList.remove('more')
    }
  }, [started])

  // any input during the flight skips straight to the console: a cinematic
  // you cannot interrupt is a cinematic people learn to resent
  useEffect(() => {
    if (!boot) return
    // ...but not input that is still the click that started it. A
    // double-click on POWER ON lands its second pointerdown ~150ms into the
    // REV, and that used to skip straight to the console: the one moment
    // the product is built around, lost to a normal double-click. 400ms is
    // past any double-click interval and well before the DIVE.
    const skip = () => {
      if (performance.now() < bootAt.current + 400) return
      endBoot()
    }
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
    // A FIXED CLOCK, so the strip's time ticks are true: MOTION_HZ slots a
    // second, MOTION_SECONDS of them. readMotion() runs every frame (it
    // differentiates the pointer), and a slot keeps the PEAK of the frames
    // that fell in it, so a flick shorter than a slot still lands.
    const hist = new Float32Array(MOTION_HZ * MOTION_SECONDS)
    let head = 0
    let raf = 0
    let slotEnd = performance.now() + 1000 / MOTION_HZ
    let peak = 0
    const tick = () => {
      const sc = sceneRef.current
      // readMotion still runs: it differentiates the pointer for the //peak_
      // row's neighbours, and the pointer is part of what the star does
      const hand = sc ? sc.readMotion() : 0
      peak = Math.max(peak, motionProbeRef.current, (hand - 0.2) * 0.6)
      const now = performance.now()
      // a stalled tab can owe many slots; write them all (the gap is real
      // time) but cap the catch-up at one full strip
      for (let k = 0; now >= slotEnd && k < hist.length; k++) {
        hist[head % hist.length] = peak
        head++
        slotEnd += 1000 / MOTION_HZ
        peak = 0
      }
      if (now >= slotEnd) slotEnd = now + 1000 / MOTION_HZ
      drawMotionStrip(posterWaveRef.current, hist, head)
      // //peak_ said IDLE unconditionally, which was true on a cold load
      // and a lie the moment the sheet could be returned to with the music
      // still playing -- a parked needle beside a star visibly being
      // driven. It reads the analyser's own spectral centroid now, mapped
      // back to hertz, and only says idle when there is genuinely nothing.
      const el = peakRef.current
      if (el) {
        const f = engineRef.current?.analyser?.features
        const live = f && f.rms > 0.014 // 0.02 pre-rescale, see features.ts
        el.textContent = live ? `${fmtHz(20 * Math.pow(1000, f.centroid))}` : 'idle'
      }
      raf = requestAnimationFrame(tick)
    }
    const aim = () => {
      // the climb is already flying the camera to this exact cell; snapping
      // here would land it before it set off
      if (climbRef.current) return
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
    setSampleRate(engine.ctx.sampleRate)
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
    // DEV ONLY, and the guard is not caution -- it is the truth about where
    // this file can exist. The owner's library is served by a vite plugin
    // that runs in dev and nowhere else, so in production this fetch is
    // GUARANTEED to 404. It was handled and harmless, and it still put a red
    // 404 in the network log of every visitor who opened devtools on the
    // deployed site. A request that cannot succeed should not be made.
    if (import.meta.env.DEV) {
      void fetch(`${import.meta.env.BASE_URL}tracks-local/manifest.json`)
        .then((r) => (r.ok ? r.json() : null))
        .then((local: TrackInfo[] | null) => {
          if (local?.length && engine.kind === 'radio' && !startedRef.current) {
            radioTier = 2
            engine.setPlaylist(local)
          }
        })
        .catch(() => {})
    }
    // the shared tab stopped sharing (Chrome's own bar, or it closed): back
    // to the radio, and say why, rather than a star gone quiet for no reason
    engine.onExtEnded = () => {
      raiseFault('the shared tab stopped · back to the radio', true)
      void engine.playRadio()
    }
    engine.onFault = (text, recovering) => {
      // a file that failed has nothing left to decode
      setDecoding(false)
      raiseFault(text, recovering)
    }
    engine.onAJChange = (st) => setAj(st)
    engine.onTrackChange = (tr) => {
      energy.reset()
      // The tempo belongs to the track. Without a fresh tracker a 120 BPM
      // track after a 124 one read 124 until the old estimate decayed:
      // a reading of the last song printed under the new one's title.
      tracker = new FingerprintTracker()
      // ...and the estimate is read off the analyser's onset history, not
      // the tracker, so the last track's onsets have to go with it
      engine.analyser.onsets.length = 0
      setTuningNext(false)
      if (tr) {
        if (faultHold.current) faultHold.current = false
        else setFault(null)
      }
      setAj(engine.kind === 'aj' ? engine.ajState : null)
      // Leaving the stems reverts the rings whenever they still name stems,
      // not only while the deck happened to be playing: a paused deck left
      // the radio labelled BASS / DRUMS / VOCALS.
      if (engine.kind !== 'stems' && (stemDeckRef.current?.playing || tiers.some((t) => t.role))) {
        stemDeckRef.current?.pause()
        stemDeckRef.current?.solo(null)
        scene.setVocal(0)
        applySpectralTiers()
      }
      if (engine.kind === 'stems') setStemN(new Set(stemDeckRef.current?.info().map((x) => x.role)).size)
      setTrack(tr)
      trackRef.current = tr
      setSource(engine.kind)
      if (startedRef.current && tr) {
        setAnnounce({ text: tr.title, key: Date.now() })
      }
      // Radio tracks ship with build-time peaks; files are decoded at drop
      // time by their own handlers; a captured tab has no future to read. The file
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
    // Declared up here because onTrackChange below needs it: a new track's
    // loudness has nothing to do with the last one's, and without the
    // reset the discontinuity at the seam reads as a step up and fires a
    // drop. The tracker's own harness measures exactly that -- one
    // spurious DROP across an unreset track change, none across a reset.
    const energy = new EnergyTracker()
    // the chrome's ground reads --drop off the app root
    scene.dropCssEl = appRef.current
    if (import.meta.env.DEV) (window as unknown as { __sc?: unknown }).__sc = scene
    // let, not const: onTrackChange replaces it per track (above). The frame
    // body reads it through this binding, so it always sees the current one.
    let tracker = new FingerprintTracker()
    const beatClock = new BeatClock()
    let lastTier = 0

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
    // Dolly that fits the body inside a cell of cw x ch. The body's diameter
    // is ~0.88 of the viewport HEIGHT at dolly 1, so a portrait phone at
    // dolly 1 draws a star wider than the glass; the width term catches it.
    // On a desktop console both terms are under 1 and nothing changes.
    // The width term is looser (0.85): on a portrait phone the star is
    // allowed to touch the cell's sides, so it still crowds its frame the
    // way it does on the desktop instead of floating small in a tall room.
    const fit = (cw: number, ch: number) =>
      Math.max(1, (h / ch) * 0.92, (h / cw) * 0.85)
    const focus = (snap = false) => {
      const live = startedRef.current && w > 720
      let fx = live ? (RAIL + (w - RAIL) / 2) / w : 0.5
      let fy = 0.5
      let dolly = 1
      if (startedRef.current && watchRef.current) {
        // watching: the chrome is gone, so the star centres on the glass
        fx = 0.5
        dolly = fit(w, h)
      } else if (startedRef.current) {
        // live: aim into the stage cell as measured, which is right on the
        // desktop (right of the rail) AND on a phone, where the stage is a
        // row above the sheet and the viewport centre sits behind the rail
        const cell = document.querySelector('.cn-stage')
        if (cell && h > 0) {
          const r = cell.getBoundingClientRect()
          if (r.height > 40 && r.width > 40) {
            fx = (r.left + r.width / 2) / w
            fy = (r.top + r.height / 2) / h
            // the desktop console is tuned to dolly 1 -- the star is MEANT
            // to crowd its cell (DESIGN.md: the subject dominates); only
            // the phone's cells are small enough to need fitting
            dolly = w > 720 ? 1 : fit(r.width, r.height)
          }
        }
      } else {
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
    /**
     * One slow mean per tier, and the reason the ring meters say anything.
     *
     * They used to show a tier's ABSOLUTE band energy, and music's
     * long-term spectrum falls with frequency, so the six readings came out
     * in the same order every time and stayed there. Measured on a real
     * GPU, 120 samples over 12 seconds of a playing track: the eight-cell
     * meters read 7,6,6,5,5,4 and FOUR OF THE SIX MOVED ZERO CELLS. The
     * survey labels beside the star, on the same numbers through a
     * different scaling, sat at LVL 98 and LVL 99. Six readouts drawing
     * the pink-noise tilt, which is a property of recorded music in
     * general and not of the track you are listening to.
     *
     * So each tier is now read against its OWN recent level: at its
     * average it sits mid-scale, and it moves when that band does. The
     * absolute spectrum is not lost -- `05 · SPECTRUM`'s 24 bars are
     * exactly that, unnormalised, and they already read well. The rings
     * were duplicating them badly; now they say the thing the bars cannot.
     *
     * TAU is 6s, longer than a couple of bars at any tempo, so the
     * reference is stable under a beat rather than chasing it. FLOOR is
     * the absolute mean below which a band is treated as silent: the mean
     * stops integrating there and freezes, so a quiet passage reads quiet
     * instead of renormalising its own silence up to mid-scale, and the
     * reference is never seeded from the hush before the music starts.
     *
     * OCTAVE is the law of the scale, and it is a ratio law rather than a
     * linear one because that is what a meter is. A band at twice its own
     * average moves 0.35 of the scale, a band at half moves 0.35 down, so
     * the eight cells span about +-1.4 octaves of deviation either side of
     * normal -- roughly 17dB, a VU's worth. Linear normalisation was tried
     * first and measured: it put four of the six rings inside a ONE cell
     * range, because a +-20% swing in band energy is only +-0.1 of a
     * linear scale. Ratios are how loudness moves; the scale has to agree.
     */
    const tierAvg = new Float32Array(6)
    const TIER_TAU = 6
    const TIER_FLOOR = 0.03
    const TIER_OCTAVE = 0.35 // scale travelled per doubling against its own mean
    const sectMuted = new Set<number>() // latched tier kills
    let sectSolo = -1 // spectral tier solo (stem solo lives in the deck)
    // Latched row levels, 0..2 — the mixing desk the layer rows drive.
    // Gestures are momentary performance moves that return here.
    const rowGain = new Float32Array(6).fill(1)
    // The ring's radius saturates at 1.4 -- the shader clamps it -- so the
    // fader stops there too. It used to run to 2.0, which meant the last
    // 30% of the travel changed the sound and moved nothing: you kept
    // pulling and the ring you were pulling had already stopped. The boost
    // slope steepens to match (0.4 * 22.5 = the same +9dB the old top of
    // the range gave), so nothing is lost but the dead zone.
    const RING_MAX = 1.4
    const dbOf = (g: number) => (g < 1 ? (g - 1) * 30 : (g - 1) * 22.5)
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
    // THE DRAWN LINE IS THE HANDLE.
    //
    // This used to pick by a horizontal SLAB: nearest ring centre by y,
    // accepted if the pointer was within half a tier gap vertically and
    // 1.8 ring-radii horizontally. That target is a wide rectangle through
    // the middle of each ring -- it contains the ellipse but it also
    // contains the empty axis, the particle haze, and a lot of black. So
    // the place you press and the place you SEE were different shapes, and
    // the visible one was not the one that worked.
    //
    // Now the ellipse itself is the target. surveyPoint(i, th, 1) is the
    // same call the survey canvas strokes, so the hit path and the drawn
    // path cannot drift apart -- change the ring profile and both move.
    // Sampled as a closed polyline and measured segment-wise, which stays
    // exact under the spin and the perspective tilt (the projection of a
    // tilted circle is not a centred ellipse, so an analytic test would be
    // wrong at exactly the near and far edges).
    const RING_SEGS = 28
    const coarsePointer = matchMedia('(pointer: coarse)').matches
    // Law 7: 44px of reach on touch. On a fine pointer 18px either side of
    // a 1px line is a 37px-wide band -- generous without swallowing the
    // neighbouring ring, which never comes closer than ~70px.
    const RING_TOL = coarsePointer ? 44 : 18
    const segDist = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
      const dx = bx - ax, dy = by - ay
      const L = dx * dx + dy * dy
      const t = L > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L)) : 0
      return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
    }
    const ringDist = (tier: number, px: number, py: number): number => {
      let best = 1e9
      const first = scene.surveyPoint(tier, 0, 1)
      let prev = first
      for (let k = 1; k <= RING_SEGS; k++) {
        const p = k === RING_SEGS ? first : scene.surveyPoint(tier, (k / RING_SEGS) * Math.PI * 2, 1)
        const d = segDist(px, py, prev.x, prev.y, p.x, p.y)
        if (d < best) best = d
        prev = p
      }
      return best
    }
    const nearestRing = (px: number, py: number): { tier: number; d: number } => {
      let tier = -1
      let d = 1e9
      for (let i = 0; i < tiers.length; i++) {
        const di = ringDist(i, px, py)
        if (di < d) { d = di; tier = i }
      }
      return { tier, d }
    }
    const pickTier = (px: number, py: number): number => {
      const { tier, d } = nearestRing(px, py)
      if (d > RING_TOL) {
        trace('pick-dbg', { tier, d: Math.round(d), tol: RING_TOL })
        return -1
      }
      return tier
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
      // the field closes over about 140ms rather than snapping shut
      scene.setHover(0)
    }

    const onCurMove = (e: PointerEvent) => {
      armCursor(e.clientX, e.clientY)
      cur.overUi = !!(e.target as Element | null)?.closest?.('.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]')
      if (!reducedMotion) {
        // Hover aims the instrument (fine pointers only — touch has no
        // hover); a held pointer grabs and spins it on EVERY device.
        // Deltas are computed manually: iOS reports movementX as 0.
        if (finePointer) {
          scene.setPointer(e.clientX / Math.max(1, w) - 0.5, e.clientY / Math.max(1, h) - 0.5)
          // The hand parts the field, but only when it is on the field and
          // owns nothing else: over chrome, mid-grab or mid-dissect the
          // parting would fight the gesture that is already running.
          scene.setHover(cur.overUi || mix.on || sect.axis || sect.drag || cur.dragging ? 0 : 1)
        }
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
            // 200px per unit, not 150: with the travel now ending at 1.4 a
            // tighter scale put the whole boost range inside 60px, which
            // reads as twitchy rather than fine.
            //
            // And SIGNED against the side you grabbed from. The absolute
            // distance made the fader a V: pull inward to cut, cross the
            // axis, and the distance starts growing again so the level
            // climbs back up. Measured on one continuous inward drag --
            // 1.4 down to 0.86 and back to 1.4, the cut turning into a
            // boost mid-gesture with nothing to announce it. Signed, going
            // past the axis simply keeps cutting until it bottoms out,
            // which is the only monotonic reading of "in = kill".
            const side = d.sx >= c.x ? 1 : -1
            const lvl = Math.max(0, Math.min(RING_MAX, 1 + ((e.clientX - c.x) * side - d.dx0) / 200))
            d.lvl = lvl
            const tr = tiers[d.tier]
            const eng2 = engineRef.current
            if (tr.role && stemDeckRef.current) {
              stemDeckRef.current.setStemGain(tr.role, lvl)
            } else if (tr.band) {
              // The ring IS the filter: this tier's own peaking band bends.
              //
              // And rowGain has to move WITH it. This branch only ever
              // called tierEq, which is the audio path -- so dragging a
              // spectral ring changed what you heard and left the ring
              // itself exactly where it was. The visual level is
              // Math.min(1.4, rowGain[i]), and nothing here was writing
              // rowGain, so the gesture reported lvl 1.04 while
              // uTierLvl stayed [1,1,1,1,1,1] for all six. The stem
              // branch above never had the bug because setStemGain feeds
              // tierLevels, which the visual does read.
              rowGain[d.tier] = Math.max(0, Math.min(RING_MAX, lvl))
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
    // WHERE THE OBJECT IS, asked rather than guessed.
    //
    // This used to compute the middle of the area right of the 320px rail
    // and call that the axis. That is a layout arithmetic guess about a
    // thing the renderer already knows exactly, and the two disagree:
    // measured at 1100px wide and dissected, the guess landed 63px right
    // of the spine the survey actually draws. Everything keyed to it was
    // off by that much -- the seam's 30px grab column sat beside the seam,
    // wide enough to swallow ring lines 88px away, and the ring fader
    // measured its level from a column that was not the axis.
    //
    // projectLocal(0,0,0) is the body's own origin through the same camera
    // the survey chrome projects with, so the handle and the drawn line
    // cannot drift apart again.
    const centerPx = () => {
      if (!startedRef.current) return { x: w / 2, y: h / 2 }
      const c = scene.projectLocal(0, 0, 0)
      return Number.isFinite(c.x) && Number.isFinite(c.y) ? c : { x: w / 2, y: h / 2 }
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
      // Where the spine and a ring CROSS, the nearer line wins. Six rings
      // cross the axis at twelve points, and a fixed priority meant the
      // seam quietly ate the ring wherever they met -- the same ring that
      // is grabbable everywhere else on its circumference. Nearest-wins is
      // the rule you can see: whichever line you are actually on is the one
      // that answers. Shift still forces the axis, and the spine keeps the
      // rest of its length to itself.
      const axisDx = Math.abs(e.clientX - c0.x)
      const nr = dis > 0.5 ? nearestRing(e.clientX, e.clientY) : { tier: -1, d: 1e9 }
      const ringWins = nr.tier >= 0 && nr.d <= RING_TOL && nr.d < axisDx
      if (pts.size < 2 && (e.shiftKey || (axisDx < 30 && (dis > 0.3 || hit) && !ringWins))) {
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
    // The quality governor. Its thresholds are relative to the display's own
    // frame period, and src/scope/governor.ts explains at length why an
    // absolute one is not a threshold at all. Tested by scripts/governor.mjs.
    const perf = new Governor()

    // Worst frame in the last second, for the diag line. The governor's EMA
    // has a time constant near a second, so a 200ms stall barely moves it —
    // which is exactly why "it hangs sometimes" was invisible to every
    // number the product reported about itself. A peak is not an average
    // and the two answer different questions.
    let hitchMax = 0
    let hitchAcc = 0
    let hitchShown = 0

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
    // drops are derived from the peaks, once per track, the first tick the
    // loop sees a new peaks object -- wherever it was set from
    let dropsSrc: TrackPeaks | null = null
    let drops: Drop[] = []
    let silentFor = 0
    let sigNow: 'idle' | 'silent' | 'live' = 'idle'

    // THE LOOP'S CLOCK. Normally this window's rAF. While the mini star is
    // floating, the PiP window's: a hidden tab gets no animation frames at
    // all, and "hidden" is exactly the state the mini star exists for --
    // you are in Figma, and scope is behind it. The PiP window is on
    // screen whenever it exists, so its frames keep the analyser, the
    // simulation and the copy into the mini star running. The token stops
    // a callback queued on a window that has since closed from starting a
    // second chain if it fires anyway.
    let rafWin: Window = window
    let rafToken = 0
    const schedule = () => {
      const my = ++rafToken
      rafWin = pipRef.current?.win ?? window
      // Each window's frame timestamp is on its own document's clock, which
      // starts at that document's birth -- so a raw PiP timestamp arrives
      // minutes "earlier" than the last main frame, and fed that negative
      // dt the sim integrated backwards and blew the stage out to white.
      // The shift puts it on this window's clock. It stays a FRAME
      // timestamp, not performance.now() read inside the callback: that
      // measured when this callback happened to run, after the other frame
      // callbacks, and the jitter cut the power-on flight short (flight.mjs,
      // 3 of 3 runs, against 0 of 3 on the frame timestamp).
      const win = rafWin
      const shift = win === window ? 0 : win.performance.timeOrigin - performance.timeOrigin
      raf = win.requestAnimationFrame((n) => {
        if (my === rafToken) frame(n + shift)
      })
    }
    kickLoopRef.current = schedule

    const frame = (now: number) => {
      schedule()
      // The raw gap, before the clamp. Simulation reads `dt`, which is
      // capped at 50ms so one long frame cannot fling the physics across the
      // room — but a readout fed the capped value says "50ms" for a 50ms
      // stutter and for a 900ms freeze alike, which is the one case it
      // exists to tell apart.
      const rawDt = (now - prev) / 1000
      const dt = Math.min(0.05, rawDt)
      prev = now

      const f = engine.analyser.update(dt)
      const t = engine.analyser.now
      const fp = tracker.update(f, engine.analyser.onsets, t, dt)
      const beat = beatClock.update(f, fp, t, dt)

      // THE FOUR TIERS. Everything below reads this rather than deciding
      // for itself what counts as loud, which is the only way a small beat
      // can produce a small reaction and a genuine drop a large one.
      // Verified by the tracker's own harness: 30s of four-to-the-floor at
      // constant loudness produces ZERO drops, while a build-and-drop
      // produces exactly one, 0.47s after the step.
      const en = energy.update(f, t, dt)
      // The shockwave is an EDGE, not a level: fired on the frame tier 3
      // is entered and never again until the next drop, or the ring
      // restarts every frame and stands still.
      const dropEdge = en.tier === 3 && lastTier !== 3
      lastTier = en.tier
      scene.setEnergy(en.drop, en.strong, dropEdge, en.calm)
      if (f.onset) {
        snapEnv = 1
        scene.onset()
      }
      snapEnv *= Math.exp(-dt * 9)
      // The star reads each band against ITS OWN running mean, not the
      // absolute level: measured across the radio the absolute bands sat
      // pinned (std 0.01..0.05), so the anatomy drew the spectrum's tilt and
      // barely moved. f.bands stays absolute for everything that must be
      // (05 SPECTRUM, the ring meters' own reference below).
      scene.setBands(f.bandsRel)
      // the typed reflexes (kick / snare / hat), sustain, the tone for AJ,
      // and the build's tension -- all measured, see features.ts / energy.ts
      scene.setVoices(f, en.tension)
      if (fp.tempoConfidence > 0.2 && fp.tempo > 0) engine.setEchoTime(60 / fp.tempo * (fp.tempo > 140 ? 1 : 0.75))
      if (beat.trigger) {
        beatPulse = Math.max(beatPulse, 0.4 + beat.strength * 0.6)
        // The star erupts on real hits — the lifecycle layer. Dissected,
        // the eruption leaves the beat's own ring: drums if stems name
        // one, the low tier (the kick's home) otherwise.
        if (startedRef.current && beat.strength > 0.25) {
          const bt = tiers.findIndex((t2) => t2.role === 'drums')
          // emission rides the tier: a normal beat sheds its usual few, a
          // drop throws everything the pool has
          scene.burst(Math.min(1, beat.strength * (1 + en.drop * 2.2 + en.strong * 0.5)), bt >= 0 ? bt : 0)
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
      // THE TYPE HEARS IT TOO. The display type swells and thickens on the
      // measured beat and opens its tracking with the level -- the same
      // two readings the star is driven by, so type and matter move as one.
      // Written straight onto the one or two elements that carry it: a
      // property on .app would restyle the whole tree every frame.
      for (const el2 of beatTypeRef.current) {
        el2.style.setProperty('--beat', beatPulse.toFixed(3))
        el2.style.setProperty('--lvl', Math.min(1, f.rms * 2.2).toFixed(3))
      }
      // Same task as the render, or the drawing buffer is already cleared.
      if (pipRef.current) drawPip(pipRef.current, canvas, scene, w, h)
      // standby only: scan the star's core for the MOTION strip
      if (!startedRef.current && posterWaveRef.current) motionProbeRef.current = probeStar(canvas, scene, w, h)
      if (grabRef.current) {
        const done = grabRef.current
        grabRef.current = null
        const cv = document.createElement('canvas')
        cv.width = 1080
        cv.height = 1080
        // the poster frames the star by MEASURING it, not by the camera
        // estimate the mini star uses -- that guess drifted with zoom,
        // dissect and focus, so no two posters sat the same way
        if (!cropStar(cv, canvas, scene)) drawPip({ win: window, cv }, canvas, scene, w, h, 1080, 1080)
        done(cv)
      }

      // The survey drawing rides every frame while the stack is open —
      // markers, drop-lines and labels are projected from the SAME cluster
      // transform the particles just rendered with.
      // Touch has no hover: flash the seam for a few seconds after power-on
      // so every device gets shown the split line once.
      if (startedRef.current && !wasStarted) {
        wasStarted = true
        seamFlashUntil = now + 4500
        if (shouldOnboard()) setTimeout(() => { setTourMode('hint'); setOnboard(true) }, 900)
      }
      // THE SIX TIER READINGS. Computed here, every frame, and read by
      // BOTH readouts -- the survey labels beside the star and the eight-
      // cell meters in the rail. They used to be computed twice, in two
      // places, from the same band means through two different scalings
      // (`* 1.6` there, `pow(x, 0.6)` here), so the same tier could read
      // LVL 98 on the drawing and 7/8 in the list and neither was wrong
      // about the other. One quantity, one place.
      //
      // Every frame, NOT inside the dissect guard below: the running mean
      // is the reference the reading is against, and a reference that only
      // accumulates while you are looking would start from nothing each
      // time the stack opens and slam all six meters to full for the first
      // few seconds.
      {
        const per = 24 / tiers.length
        for (let i = 0; i < tiers.length; i++) {
          const tr = tiers[i]
          if (tr.role) {
            // A stem carries its own dynamics -- a vocal is silent between
            // lines -- so it is already the thing a meter wants to show and
            // is not normalised.
            let lv = 0
            if (lastInfos) for (const s of lastInfos) if (s.role === tr.role) lv = Math.max(lv, s.level)
            tierLevels[i] = Math.min(1, lv * 3)
            continue
          }
          const a = Math.round(i * per)
          const b = Math.round((i + 1) * per)
          let m = 0
          for (let k = a; k < b; k++) m += f.bands[k]
          m /= Math.max(1, b - a)
          // Seeded on the first frame with real signal in the band, not
          // on the first frame there is: power-on happens in silence, and
          // an average seeded from that reads every band as enormous for
          // the six seconds it takes to catch up -- which is exactly what
          // the first version of this did, and it pinned the sub ring at
          // the ceiling for 67% of a twelve-second sample.
          if (m >= TIER_FLOOR)
            tierAvg[i] = tierAvg[i] > 0 ? tierAvg[i] + (m - tierAvg[i]) * Math.min(1, dt / TIER_TAU) : m
          const dev = Math.log2(Math.max(1e-4, m) / Math.max(TIER_FLOOR, tierAvg[i]))
          tierLevels[i] = Math.max(0, Math.min(1, 0.5 + dev * TIER_OCTAVE))
        }
      }

      const seamWant = cur.axisHover || sect.axis || now < seamFlashUntil
      if (scene.dissect > 0.004 || seamWant) {
        surveyDirty = true
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
          //
          // EXCEPT under the hand. Those ballistics describe a meter
          // watching audio, and the moment you grab a ring it stops being
          // a meter and becomes a fader. Measured: dragging one down and
          // stopping, the ring took 1101ms to arrive -- release runs at
          // 2.2/s, a 455ms time constant, so the readout crawled after the
          // hand for over a second and the gesture felt like pulling
          // something through syrup. A dragged tier tracks at 26/s, and
          // symmetrically: a fader that fell slower than it rose would
          // still be a meter's asymmetry showing through.
          const held = sect.drag?.moved && sect.drag.tier === i
          const rate = held ? 26 : target > tierVoice[i] ? 14 : 2.2
          tierVoice[i] += (target - tierVoice[i]) * Math.min(1, dt * rate)
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

      hitchMax = Math.max(hitchMax, rawDt)
      hitchAcc += dt
      if (hitchAcc >= 1) {
        hitchShown = hitchMax
        hitchMax = 0
        hitchAcc = 0
      }

      // The quality governor. Sustained slowness and the scene sheds half
      // its particles and the retina buffer; it climbs back once the device
      // proves fast again. Only measured while visible — a hidden tab
      // reports garbage timing.
      //
      // The decision lives in src/scope/governor.ts, not here, because a
      // control loop that needs a browser and five minutes to exercise is a
      // control loop nobody tests — and this one shipped with a restore
      // threshold below the 60Hz frame period, so on most displays a drop
      // was permanent. scripts/governor.mjs now proves both directions are
      // reachable at 60, 120 and 144Hz.
      if (document.visibilityState === 'visible' && startedRef.current) {
        const nq = perf.update(dt)
        if (nq !== null) scene.setQuality(nq)
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
      if (engine.capturing && (tubePlayingRef.current || engine.kind === 'tab'))
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
        if (peaksRef.current !== dropsSrc) {
          dropsSrc = peaksRef.current
          drops = dropsSrc ? findDrops(dropsSrc) : []
        }
        drawWave(waveRef.current, wave, waveHead, peaksRef.current, progress, drops)
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
        // the session's own record, for the poster: tempo only once locked,
        // level only while live. Halved when full, so a long session keeps
        // its whole shape at half the resolution rather than its last bit.
        if (startedRef.current && engine.playing) {
          const ss = sessionRef.current
          if (fp.tempoConfidence > 0.12) { ss.tempo.push(fp.tempo); ss.bpm = Math.round(fp.tempo) }
          ss.level.push(Math.min(1, f.rms * 2.2))
          ss.peak = Math.max(ss.peak, Math.min(1, f.rms * 2.2))
          for (const arr of [ss.tempo, ss.level]) if (arr.length > 900) {
            for (let k = 0; k < arr.length / 2; k++) arr[k] = arr[k * 2]
            arr.length = Math.floor(arr.length / 2)
          }
        }
        if (levelRef.current) {
          // Block meter: light discrete cells, never stretch a bar.
          //
          // ONE SCALE. features.ts:162 already returns rms compressed and
          // enveloped into 0..1 -- `env(min(1, pow(rawRms * 3.2, 0.62)))`
          // -- and this multiplied it by 2.4 again, so everything above
          // rms 0.417 filled all twelve cells. Measured against the live
          // analyser: rms spanned 0.275..0.996 while the meter sat at
          // 12/12 for 90% of samples. A reading that is always full is not
          // a reading, which is law 3, and it is the only thing on the
          // console that says how hard the star is being driven.
          const lit = Math.round(Math.min(1, f.rms) * 12)
          const cells = levelRef.current.children
          for (let i = 0; i < cells.length; i++) cells[i].className = i < lit ? 'on' : ''
        }
        // diagnostics: one dim line, only for those who ask
        if (diagRef.current)
          diagRef.current.textContent = `fps ${Math.min(120, Math.round(1 / Math.max(1e-3, perf.ema)))} · worst ${Math.round(hitchShown * 1000)}ms · pts ${Math.round((108000 * scene.densityNow + 2600 + 3600) / 1000)}k · quality ${perf.q < 1 ? 'reduced' : 'full'}`
        setPaused(engine.kind === 'stems' ? !(stemDeckRef.current?.playing ?? false) : engine.kind === 'aj' ? false : (engineRef.current?.el.paused ?? false))
        // AJ's binaural beat drifts inside a movement; it is read live, not
        // from the change events, which only fire on a new root or section
        if (engine.kind === 'aj' && ajBeatRef.current) {
          const st = engine.ajState
          ajBeatRef.current.textContent = st?.beat ? `${st.beat.toFixed(1)} hz` : '--'
        }
        // the layer rows: visible whenever stems are loaded or the stack
        // is open — top ring first, mirroring the drawing
        if (engine.kind === 'stems' || scene.dissect > 0.25) {
          const infos = engine.kind === 'stems' ? stemDeckRef.current?.info() ?? null : null
          const rows: LayerRow[] = []
          for (let i = tiers.length - 1; i >= 0; i--) {
            const tr = tiers[i]
            if (tr.role && infos) {
              // The deck still owns this row's FADER and its mute -- those
              // are the stem's own state and live nowhere else. Its level
              // does not: that is the shared reading, computed once above,
              // so the drawing and the list cannot disagree. The `lv` local
              // that used to be gathered here went with the third copy.
              let gn = 1
              let mu = false
              for (const s2 of infos)
                if (s2.role === tr.role) {
                  gn = s2.gain
                  mu = mu || s2.muted
                }
              rows.push({ i, label: tr.label, level: tierLevels[i], gain: gn, muted: mu, solo: stemDeckRef.current?.soloRole === tr.role, hot: hoverTierIdx === i })
            } else {
              rows.push({
                i,
                label: tr.label,
                // The one reading, computed once per frame above. This used
                // to be its own `pow(mean, 0.6)` of the same band means the
                // survey scaled by 1.6 -- two curves on one quantity, and
                // both of them drawing the spectrum's fixed tilt rather
                // than the music. Display only; the star's tier voices come
                // from setTierLevels on a separate path.
                level: tierLevels[i],
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
          // THE DROP FORECAST. Read off the whole track's peaks before the
          // moment arrives -- which is the one thing this instrument knows
          // that a listener does not. Absent when there is nothing coming,
          // never a dash: a row that says "no drop" is a guess about music.
          const nd = drops.length && isFinite(deckT.t) ? nextDrop(drops, deckT.t) : null
          if (dropRowRef.current && dropRef.current) {
            const dtS = nd ? nd.t - deckT.t : Infinity
            // mounted for the whole track once it has drops: after the last
            // one it says when that landed, so nothing below it jumps 31px
            dropRowRef.current.hidden = !drops.length
            if (nd) {
              dropRef.current.textContent = dtS < 10 ? `in ${dtS.toFixed(1)}s` : `in ${fmtTime(dtS)}`
              dropRef.current.classList.toggle('armed', dtS < 4)
            } else if (drops.length && isFinite(deckT.t)) {
              dropRef.current.textContent = `landed ${fmtTime(drops[drops.length - 1].t)}`
              dropRef.current.classList.remove('armed')
            }
          }
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
    schedule()

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
        setStemsFrom('file')
        void deck.load(all).then((skipped) => {
          engine.enterStems(`stem deck · ${all.length - skipped} stems`)
          if (skipped) raiseFault(`${skipped} of ${all.length} stems will not decode · playing the rest`, true)
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
        }).catch(() => {
          // Fewer than two stems decoded. The deck has already emptied
          // itself; if it was the thing playing, the room would be left on
          // rows for stems that no longer exist, so go back to the radio.
          setDecoding(false)
          if (engine.kind === 'stems') void engine.playRadio()
          raiseFault('those stems will not decode · try mp3, wav, m4a or flac', engine.kind === 'stems')
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
          // AJ has no pause: the tones are generated, not played back, and
          // Space on the element path would start the radio under them
          else if (eng.kind !== 'tab' && eng.kind !== 'aj') (eng.el.paused ? void eng.el.play() : eng.el.pause())
          break
        case 'KeyN':
          // without the tube case this left the jukebox for the radio
          if (eng.kind === 'tube') tubeRef.current?.next()
          else if (eng.kind === 'aj') eng.ajNext()
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
        // f opens a file picker, t opens the browser's share picker, and
        // h blanks the whole interface. Everything else stays bare.
        case 'KeyS': if (!e.shiftKey) setStage((v) => !v); break
        case 'KeyP': if (!e.shiftKey) themeKeyRef.current?.(); break
        // bare f is fullscreen, the key every video player taught
        case 'KeyF':
          if (e.shiftKey) fileRef.current?.click()
          else if (document.fullscreenEnabled) {
            if (document.fullscreenElement) void document.exitFullscreen()
            else void document.documentElement.requestFullscreen?.().catch(() => {})
          }
          break
        case 'KeyT': if (e.shiftKey) void eng.useTab(); break
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
      rafToken++
      try { rafWin.cancelAnimationFrame(raf) } catch { /* window gone */ }
      kickLoopRef.current = null
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
   * One field, two jobs: a link plays, words search.
   *
   * The link path is checked FIRST and unchanged, so nothing anyone already
   * does stops working — and it costs no request, because `parseVideoId`
   * settles it locally. Anything that is not a link is treated as a query,
   * which is the whole point: you should not have to leave scope to find
   * something to play.
   */
  const tubeSubmit = async () => {
    const q = tubePaste.trim()
    if (!q) return
    const id = parseVideoId(q)
    if (id) {
      tubeRef.current?.load(id)
      setTubePaste('')
      setTubeHits(null)
      return
    }
    // A slow search must never overwrite a later fast one, and the spinner
    // must belong to the search that is still running.
    const gen = ++tubeSearchGen.current
    setTubeSeeking(true)
    try {
      const hits = await searchTube(q)
      if (tubeSearchGen.current !== gen) return
      setTubeHits(hits)
      // Nothing found is a real answer and the list says so. An error is a
      // different thing and goes to the announce line, where faults live.
    } catch (e) {
      if (tubeSearchGen.current !== gen) return
      setTubeHits(null)
      engineRef.current?.fault((e as Error).message)
    } finally {
      if (tubeSearchGen.current === gen) setTubeSeeking(false)
    }
  }

  /**
   * Enter the jukebox. Playing and listening are deliberately two steps:
   * the catalogue works immediately, and the star's reaction is a separate,
   * explained opt-in. Asking for a screen share the instant someone clicks
   * a source button would read as an ambush.
   */
  const enterTube = async () => {
    const eng = engineRef.current
    if (!eng) return
    // remember the mode we are leaving, so LEAVE is a back and not a jump
    if (eng.kind !== 'tube') setPrevSource(eng.kind as SourceKind)
    if (!tubeRef.current) {
      tubeRef.current = new Tube()
      // Tube advances past a refused video on its own (autoAdvance); this
      // only says why. It used to call next() as well, which skipped two
      // rows per blocked video and reset the guard that stops a list where
      // nothing will play.
      tubeRef.current.onError = (code) => {
        if (code === 101 || code === 150) eng.fault('that video will not play here · skipping to the next')
      }
      tubeRef.current.onExhausted = () => eng.fault('none of these will play here · try another search')
    }
    // Do NOT mount here: the host only exists once source === 'tube', and
    // that render has not happened yet. The effect below owns mounting.
    eng.enterTube()
    // returning visitor: listen inside this same click, while the browser
    // still counts it as the gesture the share picker requires
    if (canTab && hasListened && !eng.capturing) void startListening()
  }

  /**
   * Leave the jukebox for whatever was playing before it.
   *
   * The way out already existed -- the source switch is four buttons and
   * one of them is RADIO -- but in jukebox mode the module is 60% of the
   * rail, so 02 · FEED was pushed below the fold and the exit was
   * unreachable without discovering that the rail scrolls. A way out you
   * cannot see is not a way out.
   *
   * Radio is the fallback rather than a stored default: on a fresh load
   * that opens straight into the jukebox there IS no previous mode, and
   * inventing one would be a lie about where you had been.
   */
  const leaveTube = () => {
    const eng = engineRef.current
    if (!eng) return
    tubeRef.current?.pause()
    stopListening()
    const back = prevSource
    setPrevSource(null)
    // a captured tab is not resumed: that would open the share picker as a
    // side effect of leaving, which is not what "back" means
    if (back === 'file') fileRef.current?.click()
    else void eng.playRadio()
  }

  /** The star listens to this tab. Separate ask, plainly explained. */
  /**
   * Pull the star apart and six ring faders unfold in the rail — beneath NOW
   * PLAYING and FEED, which puts the module at y=710. Measured at 1440x900:
   * FOUR of the six fit the fold and two hang below it, on the one screen
   * whose whole subject is those six rings. The tour's third step calls them
   * "every ring, a visible fader" and two of them were not.
   *
   * `block: 'end'` rather than 'nearest', because nearest stops as soon as
   * the top edge is in view and the last fader stays hidden — the exact
   * failure being fixed.
   */
  useEffect(() => {
    if (!layerUi) return
    const el = layersFoldRef.current
    if (!el) return
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // D is a toggle, so the rail should come back to where it was: pressing
    // D twice used to leave 01 · NOW PLAYING scrolled off the top for good.
    const sc = railScrollerRef.current
    const saved = sc ? sc.scrollTop : null
    let moved = false
    const t = window.setTimeout(
      () => {
        // a room being watched has no rail on glass to scroll
        if (appRef.current?.classList.contains('watching')) return
        moved = true
        el.scrollIntoView({ block: 'end', behavior: calm ? 'auto' : 'smooth' })
      },
      // after the fold's own 420ms grid-template-rows transition, or it
      // scrolls to a height the module has not reached yet.
      calm ? 0 : 460,
    )
    return () => {
      window.clearTimeout(t)
      if (moved && sc && saved !== null && sc.isConnected) {
        sc.scrollTo({ top: saved, behavior: calm ? 'auto' : 'smooth' })
      }
    }
    // the ROWS change every chrome tick; only the open/shut edge matters here
  }, [!!layerUi])

  const startListening = async () => {
    const eng = engineRef.current
    const ok = (await eng?.useTabAudio()) ?? false
    setListening(ok)
    setListenErr(ok ? null : eng?.lastListenError ?? 'could not listen')
    if (ok) {
      setHasListened(true)
      try { localStorage.setItem(LISTENED_KEY, '1') } catch { /* private mode: asks again */ }
    }
  }

  const stopListening = () => {
    engineRef.current?.stopTabAudio()
    setListening(false)
    setListenErr(null)
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
    setVibeOn(prompt.trim())
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
        if (splitGen.current === gen) setSplitState(`${p.stage} ${p.pct}%`)
      })
      if (splitGen.current !== gen) return
      const deck = stemDeckRef.current ?? new StemDeck(eng.ctx, eng.busHead)
      stemDeckRef.current = deck
      if (import.meta.env.DEV) (window as unknown as { __deck: StemDeck }).__deck = deck
      deck.loadBuffers(stems.map((s) => ({ role: s.role, name: `${s.role} · split`, buffer: s.buffer })))
      setStemsFrom(eng.kind === 'file' ? 'file' : 'radio')
      eng.enterStems(`${clip(fromTitle, 22)} · split`)
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
   *
   * `from: 'dive'` is RESUME from a live standby: the machine is already
   * running, so there is nothing to rev, but going back in is still the
   * same gesture as the first time, not a cut.
   */
  const runBoot = ({ from: beat = 'rev' }: { from?: 'rev' | 'dive' } = {}) => {
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
    // The sheet rushes past from the APERTURE, not from the middle of the
    // screen. plate-dive scales the plate to 1.5 about its transform-origin,
    // and at 50% 50% the image cell (which sits left of centre, above the
    // band) slid off towards the corner while the camera was diving into
    // it -- the hole and the thing seen through it parted company.
    const plate = document.querySelector<HTMLElement>('.plate')
    if (plate) {
      const pr = plate.getBoundingClientRect()
      plate.style.transformOrigin =
        `${(cell.left + cell.width / 2 - pr.left).toFixed(1)}px ${(cell.top + cell.height / 2 - pr.top).toFixed(1)}px`
    }
    const toX = w > 720 ? (320 + (w - 320) / 2) / w : 0.5
    const t0 = performance.now() - (beat === 'dive' ? REV : 0)
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
      // The aim stays ON the aperture for the first 60% of the dive and only
      // then swings to the console's stage. Lerping x/y on the same k as the
      // dolly slid the star out of its frame while you were still flying at
      // it; the dive reads as going IN only if the target holds still.
      const kxy = Math.max(0, (p - 0.6) / 0.4) ** 2
      // RESUME has no rev to hand over from: the machine is already running
      // at rest, so the dive ramps from 0 rather than jumping to 1.
      scene.setRev(beat === 'dive' ? k * 3.5 : 1 + k * 2.5)
      scene.setFocus(
        from.x + (toX - from.x) * kxy,
        from.y + (0.5 - from.y) * kxy,
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
      // Land when the SHEET has finished leaving, not when the camera has.
      // The plate's 1000ms exit starts a frame after the dive does and the
      // console's mount costs the main thread a frame or two on the way, so
      // ending on the camera's clock unmounted the plate at ~0.4 opacity --
      // a cut, at the one moment the flight is a blow-out. The 300ms cap is
      // for a tab whose animations are not being ticked.
      const exit = document.querySelector<HTMLElement>('.plate.dive')
        ?.getAnimations().find((a) => (a as CSSAnimation).animationName === 'plate-dive')
      if (exit && exit.playState === 'running') {
        void Promise.race([exit.finished, new Promise((r) => setTimeout(r, 300))])
          .catch(() => {})
          .then(() => { if (bootRef.current) endBoot() })
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

  /**
   * Back to the sheet, with the music still on.
   *
   * Not a power off: the engine, the track and the analyser all keep
   * running, so the plate comes back as a LIVE instrument rather than the
   * cold splash it is on a first load. The star dollies back into the
   * image cell, which is the one thing that cell exists to frame, and the
   * readings on the right column stop being decorative because there is
   * finally a signal behind them.
   */
  const standby = () => {
    if (!startedRef.current || bootRef.current) return
    const scene = sceneRef.current
    // Read the camera BEFORE unmounting the console. The plate's own mount
    // effect aims at the image cell with snap the instant it appears, so a
    // `from` sampled one frame later is already the destination and the
    // climb animates from the target to the target -- measured, it sat at
    // dolly 1.26 for the whole second and then eased in afterwards on the
    // damper, which is the cut this was written to replace.
    const from = scene ? { ...scene.focusNow } : null
    climbRef.current = true
    startedRef.current = false
    setStarted(false)
    scene?.setDissect(0)
    if (!scene || !from || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      climbRef.current = false
      requestAnimationFrame(() => {
        ;(window as unknown as { __focus: (snap?: boolean) => void }).__focus(true)
      })
      return
    }
    // THE CLIMB: the dive, run backwards.
    //
    // Going in, the camera accelerates through the shell on a cubic
    // ease-IN over 1000ms while the sheet rushes past and blows out. So
    // coming back it decelerates on a cubic ease-OUT over the same 1000ms
    // and the sheet arrives to meet it -- you are not cut back to the
    // landing, you climb out to it. The two motions are the same distance
    // in opposite directions, which is the only reason the return reads as
    // the same gesture rather than a different screen.
    //
    // The plate has to be MOUNTED before its image cell can be measured,
    // and setStarted above only queues that. One frame of latency buys the
    // real rect, and aiming at a rect that does not exist yet is what
    // would put the star anywhere but the frame.
    setArrive(true)
    requestAnimationFrame(() => {
      const fig = document.querySelector<HTMLElement>('.pl-fig')
      const w = window.innerWidth
      const h = window.innerHeight
      if (!fig) { climbRef.current = false; setArrive(false); return }
      // OFFSET geometry, not getBoundingClientRect. The arrival animation
      // is scaling the plate from 1.5 down to 1 while this runs, so a
      // client rect measures the cell mid-flight and the climb lands on
      // the wrong framing -- measured, it settled at dolly 1.26 and then
      // drifted to 1.89 on the damper afterwards, a second move the eye
      // reads as the first one having missed. offsetWidth and the
      // offsetLeft chain are layout, and layout does not see transforms.
      let ox = 0
      let oy = 0
      for (let el: HTMLElement | null = fig; el; el = el.offsetParent as HTMLElement | null) {
        ox += el.offsetLeft
        oy += el.offsetTop
      }
      const cw = fig.offsetWidth
      const ch = fig.offsetHeight
      const to = {
        x: (ox + cw / 2) / w,
        y: (oy + ch / 2) / h,
        d: Math.max(1, (h / ch) * 0.92),
      }
      const CLIMB = 1000
      const t0 = performance.now()
      const step = () => {
        const e = performance.now() - t0
        const p = Math.min(1, e / CLIMB)
        // the mirror of the dive's p*p*p
        const k = 1 - Math.pow(1 - p, 3)
        scene.setRev((1 - k) * 1.4)
        scene.setFocus(
          from.x + (to.x - from.x) * k,
          from.y + (to.y - from.y) * k,
          from.d + (to.d - from.d) * k,
          true,
        )
        if (p < 1) { climbRaf.current = requestAnimationFrame(step); return }
        scene.setRev(0)
        climbRef.current = false
        setArrive(false)
        ;(window as unknown as { __focus: (snap?: boolean) => void }).__focus(false)
      }
      climbRaf.current = requestAnimationFrame(step)
    })
  }

  const power = () => {
    if (startedRef.current || bootRef.current) return
    setEverStarted(true)
    // sound first: the machine revs WITH audio, not after it
    bootRef.current = 'rev'
    bootAt.current = performance.now()
    setResuming(false)
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

  /** RESUME: back in from a live standby. The music never stopped, so
   *  there is nothing to rev -- the flight starts at the DIVE. */
  const resume = () => {
    if (startedRef.current || bootRef.current) return
    bootRef.current = 'dive'
    bootAt.current = performance.now()
    setResuming(true)
    setBoot('dive')
    runBoot({ from: 'dive' })
  }

  // ── THE GROUND ────────────────────────────────────────────────────────
  const applyTheme = (t: 'ink' | 'paper') => {
    if (t === 'paper') document.documentElement.dataset.theme = 'paper'
    else delete document.documentElement.dataset.theme
    // the canvases cache the inks as strings; re-read them for the new ground
    readAccent()
    paintThemeColor()
    sceneRef.current?.setTheme(t)
    const pw = pipRef.current?.win.document.documentElement
    if (pw) {
      if (t === 'paper') pw.dataset.theme = 'paper'
      else delete pw.dataset.theme
      pw.style.setProperty('--accent', getComputedStyle(document.documentElement).getPropertyValue('--accent'))
    }
    try { localStorage.setItem('scope-theme-v1', t) } catch { /* private mode */ }
    setThemeState(t)
  }
  themeKeyRef.current = () => applyTheme(theme === 'paper' ? 'ink' : 'paper')
  // the scene is built after first render, so it learns the saved ground here
  useEffect(() => { sceneRef.current?.setTheme(theme) }, [started, theme])
  // AJ gets its own star: the cymatic plate, driven by the root it hears
  useEffect(() => {
    const sc = sceneRef.current as (Scene & { setVariant?: (v: 'star' | 'aj') => void }) | null
    sc?.setVariant?.(source === 'aj' ? 'aj' : 'star')
  }, [started, source])

  // ── THE POSTER ────────────────────────────────────────────────────────
  // fig.02 · session: the star as it is right now, and only what this
  // session actually measured beside it.
  const savePoster = async () => {
    if (posterBusy) return
    setPosterBusy(true)
    try {
      const star = await new Promise<HTMLCanvasElement>((res) => { grabRef.current = res })
      const ss = sessionRef.current
      const tube = source === 'tube' ? tubeState : null
      const blob = await renderPoster({
        star,
        title: tube ? tube.title : track?.title ?? null,
        artist: tube ? tube.channel : track?.artist?.replace(' · audius', '') ?? null,
        source: `${SOURCE_ID[source]} ${source === 'tube' ? 'jukebox' : source}`,
        bpm: ss.bpm,
        tempoCurve: ss.tempo.slice(),
        levelCurve: ss.level.slice(),
        peakLevel: ss.level.length ? ss.peak : null,
        when: new Date(),
        theme,
        accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const slug = (tube?.title ?? track?.title ?? 'session').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
      a.download = `scope-fig02-${slug || 'session'}.png`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 4000)
    } finally {
      setPosterBusy(false)
    }
  }

  /** ref callback: register/unregister an element the loop writes the beat
   *  onto. Elements come and go with the announce and the stage plate. */
  const bindBeatType = (el: HTMLElement | null) => {
    beatTypeRef.current = beatTypeRef.current.filter((x) => x.isConnected && x !== el)
    if (el) beatTypeRef.current.push(el)
  }

  // the jukebox's list: search results, else what you played last, else the
  // curated starting points. Recents are topped up with the curated rows so
  // the queue a recent row starts still has somewhere to go.
  const tubeRecents = source === 'tube' ? tubeRef.current?.recents() ?? [] : []
  const tubeRows: { id: string; title: string; channel: string }[] = tubeHits
    ?? (tubeRecents.length
      ? [...tubeRecents.slice(0, 3), ...HINDI.filter((h) => !tubeRecents.some((r) => r.id === h.id))]
      : HINDI)
  // ── transport, shared by the rail and the phone's mini deck ──────────
  const togglePlay = () => {
    const e = engineRef.current
    // another tab's player is theirs to drive; ours is paused on purpose
    if (!e || e.kind === 'tab' || e.kind === 'aj') return
    // in jukebox mode our element is silent by design; the transport must
    // drive the player that actually sounds
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
  }
  const skipTrack = () => {
    const e = engineRef.current
    if (!e) return
    // without this, skip left the jukebox for the radio
    if (e.kind === 'tube') { tubeRef.current?.next(); return }
    if (e.kind === 'aj') { e.ajNext(); return }
    setTuningNext(true)
    if (e.kind === 'radio') void e.next()
    else void e.playRadio()
  }
  const playLabel = source === 'tube' ? (tubeState?.playing ? 'pause' : 'play') : paused ? 'play' : 'pause'
  const skipLabel = source === 'file' || source === 'stems' || source === 'tab' ? 'radio' : source === 'aj' ? 'next' : 'skip'

  // ── WATCH ─────────────────────────────────────────────────────────────
  // Enters only while something is playing, nothing is held, nothing is
  // being typed and no tour is open -- the room goes quiet when the hand
  // has left, not while it is mid-gesture. Leaving is any real input. A
  // pointer that drifts under 6px is a desk being bumped, not a person.
  const playingRef = useRef(false)
  playingRef.current = playing || !!tubeState?.playing
  useEffect(() => {
    if (!started || onboard || boot) {
      setWatching(false)
      return
    }
    let t = 0
    let lx = -1
    let ly = -1
    const arm = () => {
      clearTimeout(t)
      t = window.setTimeout(enter, WATCH_IDLE_MS)
    }
    const enter = () => {
      const a = document.activeElement
      const typing = !!a?.closest?.('input[type="text"], input[type="search"], input:not([type]), textarea')
      const holding = appRef.current?.classList.contains('mixing')
      if (!playingRef.current || typing || holding) return arm()
      setWatching(true)
    }
    const wake = (e: Event) => {
      if (e.type === 'pointermove') {
        const p = e as PointerEvent
        if (lx >= 0 && Math.hypot(p.clientX - lx, p.clientY - ly) < 6) return
        lx = p.clientX
        ly = p.clientY
      }
      // THE PRESS THAT WAKES THE ROOM ONLY WAKES IT. While the plate is
      // hidden nothing shields the star, so a press where the header or the
      // rail will reappear landed on the body and started a mix or a
      // dissect -- the ui-guard sweep caught exactly that. A tap on a
      // sleeping screen is a request to see the controls, the way it is on
      // every video player; the class drops synchronously so the chrome is
      // back under the finger before the next event.
      if (e.type === 'pointerdown' && appRef.current?.classList.contains('watching')) {
        e.stopPropagation()
        appRef.current.classList.remove('watching')
      }
      setWatching(false)
      arm()
    }
    const evs = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'] as const
    for (const ev of evs) window.addEventListener(ev, wake, { capture: true, passive: true })
    arm()
    return () => {
      clearTimeout(t)
      for (const ev of evs) window.removeEventListener(ev, wake, { capture: true })
    }
  }, [started, onboard, boot])

  // the star glides between the stage cell and the centre of the glass
  useEffect(() => {
    watchRef.current = (watching || ambient || stage) && started
    ;(window as unknown as { __focus?: (snap?: boolean) => void }).__focus?.(false)
  }, [watching, ambient, stage, started])

  // the phone's sheet changes the stage's size; aim once layout has moved
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      (window as unknown as { __focus?: (snap?: boolean) => void }).__focus?.(false),
    )
    return () => cancelAnimationFrame(id)
  }, [sheet])

  // ── STAGE ─────────────────────────────────────────────────────────────
  // The exit is the only chrome, and only while a hand is moving: a room
  // watching the screen should not be looking at a button.
  useEffect(() => {
    if (!stage) { setStageExit(false); return }
    let t = 0
    const show = () => {
      setStageExit(true)
      clearTimeout(t)
      t = window.setTimeout(() => setStageExit(false), 2500)
    }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setStage(false) }
    window.addEventListener('pointermove', show, { passive: true })
    window.addEventListener('keydown', key)
    return () => {
      clearTimeout(t)
      window.removeEventListener('pointermove', show)
      window.removeEventListener('keydown', key)
    }
  }, [stage])
  useEffect(() => { if (!started) setStage(false) }, [started])
  // paper prints the stage star heavier, under the display type (scene.ts)
  useEffect(() => { sceneRef.current?.setStagePrint(stage) }, [stage])

  // ── FULLSCREEN + WAKE LOCK ────────────────────────────────────────────
  // A second screen that dims itself after five minutes is not one. The
  // lock is held while the room is quiet (watching, ambient) or the glass
  // is fullscreen -- the moments nobody is touching the machine, which are
  // exactly when the OS would put it to sleep. The browser drops the lock
  // whenever the tab is hidden, so it is re-taken on return.
  const canFull = typeof document !== 'undefined' && !!document.fullscreenEnabled
  // Tab capture, the same rule as mini and full: where the browser has no
  // getDisplayMedia (every phone, Safari on iOS) the TAB source and the
  // jukebox's listen step are absent rather than controls that only fail.
  const canTab = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getDisplayMedia
  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen?.().catch(() => {})
  }
  useEffect(() => {
    const on = () => setIsFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', on)
    return () => document.removeEventListener('fullscreenchange', on)
  }, [])
  useEffect(() => {
    const want = started && (watching || ambient || stage || isFull)
    const wl = (navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }).wakeLock
    if (!want || !wl) return
    let lock: { release: () => Promise<void> } | null = null
    let dead = false
    const take = () => {
      if (document.visibilityState !== 'visible') return
      wl.request('screen').then((l) => {
        if (dead) void l.release()
        else lock = l
      }).catch(() => { /* battery saver or policy: the screen may sleep */ })
    }
    take()
    document.addEventListener('visibilitychange', take)
    return () => {
      dead = true
      document.removeEventListener('visibilitychange', take)
      void lock?.release()
    }
  }, [started, watching, ambient, stage, isFull])

  // ── THE MINI STAR ─────────────────────────────────────────────────────
  // Document Picture-in-Picture, not a <video>: a video PiP is fed by the
  // page's frames, and the page gets none once it is hidden behind Figma,
  // so the star froze the moment you looked away from it. A document PiP
  // window has its own frames, and the loop moves onto them (see
  // schedule()). Chromium desktop only; elsewhere the control is absent,
  // not disabled -- a button that can never work is not a feature.
  const canPip = typeof window !== 'undefined' && 'documentPictureInPicture' in window
  const togglePip = async () => {
    if (pipRef.current) {
      pipRef.current.win.close()
      return
    }
    const dpip = (window as unknown as {
      documentPictureInPicture: { requestWindow: (o: { width: number; height: number }) => Promise<Window> }
    }).documentPictureInPicture
    let win: Window
    try {
      win = await dpip.requestWindow({ width: 300, height: 340 })
    } catch {
      return
    }
    const doc = win.document
    doc.title = 'scope'
    // the sheet's own stylesheet, so the mini star speaks in its tokens and
    // its typeface rather than a second, hand-copied style
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const st = doc.createElement('style')
        st.textContent = Array.from(sheet.cssRules).map((r) => r.cssText).join('\n')
        doc.head.append(st)
      } catch {
        if (sheet.href) {
          const ln = doc.createElement('link')
          ln.rel = 'stylesheet'
          ln.href = sheet.href
          doc.head.append(ln)
        }
      }
    }
    doc.documentElement.style.setProperty('--accent', getComputedStyle(document.documentElement).getPropertyValue('--accent'))
    if (document.documentElement.dataset.theme === 'paper') doc.documentElement.dataset.theme = 'paper'
    doc.body.className = 'pip'
    const cv = doc.createElement('canvas')
    cv.className = 'pip-star'
    cv.setAttribute('aria-hidden', 'true')
    const cap = doc.createElement('div')
    cap.className = 'pip-cap'
    doc.body.append(cv, cap)
    pipRef.current = { win, cv, cap }
    setPipOpen(true)
    win.addEventListener('pagehide', () => {
      pipRef.current = null
      setPipOpen(false)
      // the loop was running on that window's clock; bring it home
      kickLoopRef.current?.()
    })
  }
  useEffect(() => () => pipRef.current?.win.close(), [])

  // The title stays put during a split: the split's progress is on its own
  // button, and replacing the most-read line with a percentage for a minute
  // hid what was playing. No '.MP3' either: the file's container is not a
  // reading, and was printed on WAVs and FLACs alike.
  const name = decoding
    ? 'DECODING ///'
    : tuningNext
    ? 'TUNING ///'
    : track
      // clip() before toUpperCase(), and never slice(): a bare slice cuts
      // mid-word and marks nothing, so the console's most-read line rendered
      // "SEAN PAUL GET BUSY PAULY F" -- a title that looks corrupted rather
      // than shortened. text.ts was written for exactly this and was
      // imported nowhere.
      ? clip(track.title, 26).toUpperCase()
      : 'NO CARRIER'

  // One status row, rendered where the source it concerns is operated.
  // The live region stays mounted and only its content changes: a region
  // that arrives already holding its text is not reliably announced.
  const faultRow = (
    <div className="fault-live" role="status">
      {fault && <p className="cn-hint fault">{fault}</p>}
    </div>
  )

  // the mini star's caption: which source, and what it is hearing
  const pipName = source === 'tube' ? (tubeState?.title ? clip(tubeState.title, 26).toUpperCase() : 'JUKEBOX') : name
  useEffect(() => {
    const cap = pipRef.current?.cap
    if (!cap) return
    cap.innerHTML = ''
    const id = document.createElement('b')
    id.textContent = SOURCE_ID[source]
    const t = document.createElement('span')
    t.textContent = pipName
    cap.append(id, t)
  }, [pipOpen, pipName, source])

  // The running footer. One element, two homes: a band under the body on
  // the plate, and the last row of the scroll on the phone sheet (see
  // `narrow`). The meta names the field's size, not a live count -- diag's
  // `pts` is the live count, and it is lower whenever quality steps down.
  // No `webgl ·`: the first cell is exactly the rail's width now, and the
  // meta plus the stamp only fit it in 18 characters.
  const footerInRail = sheet && narrow
  const consoleFooter = (
    <footer className="pl-ftr cn-ftr">
      <span>
        <span className="pl-meta">/ 108k-point field</span>
        <span className="pl-by">
          <NoonMark /> made by noon
        </span>
      </span>
      <span>/ grab the star to mix · [?] for the full legend</span>
      <span className="diag">
        <button className="diag-toggle" onClick={() => setDiag((d) => !d)} aria-expanded={diag}>
          diag {diag ? '[-]' : '[+]'}
        </button>
        {diag && <samp ref={diagRef} className="diag-line">fps -- · worst -- · pts -- · quality --</samp>}
      </span>
    </footer>
  )

  return (
    <div ref={appRef} className={`app${started ? ' live' : ''}${ambient ? ' ambient' : ''}${watching ? ' watching' : ''}${stage ? ' stage' : ''}`}>
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
      {/* Mounted until the DIVE ends, not until the handover. The console
          takes the screen at 80% of the dive, and unmounting the plate
          there cut its 1000ms exit at 800ms: the sheet vanished at 55%
          opacity mid-rush instead of blowing out. It is pointer-events:none
          for those last 200ms, so nothing can be clicked through it. */}
      {(!started || boot === 'dive') && (
        <div className={`plate${boot ? ` ${boot}` : ''}${arrive ? ' arrive' : ''}`}>
          <header className="pl-hdr">
            <div><b>[scope-01]</b> <span className="hlbl">polar audio instrument</span></div>
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
                </div>
                <div className="pl-checks" aria-hidden="true" />
                <div className="pl-act">
                  {/* On a first load this is the only way in. Once the
                      instrument has run, the sheet is a live standby you
                      came back to, so the button is a way back rather
                      than a way in, and it says so. */}
                  {/* Not `everStarted` alone: that flips the moment POWER ON
                      is pressed, so the label used to decode to RESUME
                      halfway through the rev, on the button you had just
                      pressed. The label is whichever flight is running. */}
                  <button className="power" onClick={everStarted && !boot ? resume : power}>
                    <Decode text={everStarted && (!boot || resuming) ? 'resume' : 'power on'} duration={520} replayOnHover />
                  </button>
                </div>
              </div>
            </div>

            <div className="pl-r">
              <div className="pl-row"><span className="k">//particles_</span><span className="v">108,000</span></div>
              {/* `dup`: real readings, but the running footer says both too.
                  First cells shed on a short viewport, because an echo is
                  the cheapest thing on a plate to lose. */}
              <div className="pl-row dup"><span className="k">//engine_</span><span className="v">webgl 2</span></div>
              <div className="pl-row dup"><span className="k">//source_</span><span className="v">audius</span></div>
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
                <div className="pl-peak-hd"><span className="k">//peak_</span><span ref={peakRef} className="v">idle</span></div>
                <Scale />
                {/* The ruler's ends, in HTML rather than inside the SVG.
                    They were <text fontSize="6" fontFamily="monospace">, which
                    broke §1 three ways at once: 6px is under the 8-11px floor,
                    generic `monospace` resolves to a THIRD face in a two-face
                    product, and the ruler is preserveAspectRatio="none", so the
                    glyphs were being stretched 1.05x horizontally. Out here they
                    are the sheet's own mono at the sheet's own size, undistorted,
                    and .pl-peak-hd already is a space-between row -- no new CSS. */}
                <div className="pl-peak-hd"><span className="k">20hz</span><span className="k">20khz</span></div>
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

              {/* Law 3: these are readings, so on a live standby they
                  have to say the live thing. `idle` was hardcoded, which
                  was true on a cold load and a lie the moment the sheet
                  could be returned to with the music still playing. */}
              <div className="pl-pills">
                <span className="pill on">( {everStarted ? 'live' : 'idle'} )</span>
                <span className="pill">( ready )</span>
                {/* the context's real rate, never an assumed 44.1k: most
                    machines run 48k, and the pill said otherwise to all
                    of them (law 3) */}
                {sampleRate && <span className="pill">( {Math.round(sampleRate / 100) / 10}k )</span>}
              </div>
              <div className="pl-strip" aria-hidden="true" />
            </div>
          </div>

          <footer className="pl-ftr">
            <span>
              <span className="pl-meta">/ webgl · 108k-point field</span>
              <span className="pl-by">
                <NoonMark /> made by noon
              </span>
            </span>
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
        <div className={`cn-plate${sheet ? ' sheet' : ''}`}>
          {/* the brand and the src/pitch plate stop being rail children:
              both are running-header cells now (mockup, header row) */}
          <header className="pl-hdr cn-hdr">
            <div><b>[scope-02]</b> <span className="hlbl">console</span></div>
            <div className="k">
              //src_ <span>{SOURCE_ID[source]}</span>
              {/* the stem deck plays outside the element, so engine.playing
                  is false there; its transport state is `paused` */}
              <i className={`src-dot${playing || (source === 'stems' && !paused) ? ' live' : ''}`} />
            </div>
            {source !== 'tube' && source !== 'tab' && source !== 'aj' && (
              <div className={`k cn-rate${rate !== 1 ? ' armed' : ''}`}>//rate_ <span>{rate.toFixed(2)}×</span></div>
            )}
            {/* ONE EXIT PRIMITIVE, used at every level. This is the same
                shape as the jukebox module's `← radio`, so the way out of
                a mode and the way out of the console are learned once and
                recognised everywhere. It was the running title before,
                which worked but announced nothing: a control that only
                reveals itself under the pointer is not discoverable, and
                nothing about a heading says press me. */}
            <button className="cn-back" onClick={standby}>
              ← <span>standby</span>
            </button>
            {/* AJ: a source with its own door. It toggles rather than
                selects -- off goes back to the radio -- and it carries the
                accent while on, like every other held state up here. */}
            <button
              className={`cn-tool cn-aj${source === 'aj' ? ' on' : ''}`}
              onClick={() => {
                const e = engineRef.current
                if (!e) return
                if (e.kind === 'aj') void e.playRadio()
                else void e.useAJ()
              }}
              aria-pressed={source === 'aj'}
              title="aj: pure frequencies, generated live"
            >
              <span>aj</span>
            </button>
            {/* The second-screen pair. Each is absent where the browser
                cannot do it, rather than a control that silently fails. */}
            {canPip && (
              <button
                className={`cn-tool cn-pip${pipOpen ? ' on' : ''}`}
                onClick={() => void togglePip()}
                aria-pressed={pipOpen}
                title="float the star over other windows"
              >
                <span>mini</span>
              </button>
            )}
            {canFull && (
              <button
                className={`cn-tool cn-full${isFull ? ' on' : ''}`}
                onClick={toggleFull}
                aria-pressed={isFull}
                title="fullscreen (f)"
              >
                <span>full</span>
              </button>
            )}
            <button
              className={`cn-tool cn-stagebtn${stage ? ' on' : ''}`}
              onClick={() => setStage((v) => !v)}
              aria-pressed={stage}
              title="stage: for showing it to a room (s)"
            >
              <span>stage</span>
            </button>
            <button
              className="rail-help"
              onClick={() => {
                setTourMode('full')
                // on a phone the walk points into the rail, so open the sheet
                if (window.innerWidth <= 720) setSheet(true)
                setOnboard(true)
              }}
              aria-label="how to play"
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">?</span>
            </button>
          </header>

          <div className="cn-body">
        <main className="rail" aria-label="instrument console">
          <h1 className="sr-only">scope console</h1>
          {/* The rail is taller than any laptop window and always was: at
              1440x900 it wants 956px of a 768px column, 1200 in jukebox
              mode. It scrolled, silently — macOS ships overlay scrollbars,
              so the styled bar below never appeared at rest and the last
              two modules simply were not there. The spectrum was sliced to
              a sliver and the level meter was gone.

              So the column splits in two. Controls scroll; READINGS DOCK.
              Which side a thing lands on is decided by PRODUCT.md: the job
              is watching, not operating, so anything measured stays on
              screen and anything operated may recede until wanted. */}
          <div ref={railStackRef} className="rail-stack">
          {/* 1 · NOW PLAYING — what you hear, and every control that acts on
              it, in the order every music player taught the world: title,
              artist, scrubber + time, transport. The loudest block in the
              rail because it is the most-used. */}
          <h2 className="cn-mod"><span>01 · now playing</span><i>//deck_</i></h2>
          <div className="nowplaying rail-sec" style={{ '--i': 1 } as React.CSSProperties}>
            {/* not in tab mode either: the title there is 'another tab',
                which //listening_ below already says, with its live state */}
            {source !== 'tube' && source !== 'tab' && (
            <div className="pl-row cn-track">
              <span className="k">//track_</span>
              <samp className="deck-name" role="status" aria-live="polite"><Decode text={name} duration={700} /></samp>
            </div>
            )}
            {track && source !== 'tube' && (
              /* §5 phase 2: track meta as plate rows. As inline spans it
                 wrapped mid-value in a 272px rail ("BPM - /73"). */
              <dl className={`deck-meta${tuningNext ? ' tuning-next' : ''}`}>
                {source === 'aj' ? (
                  <>
                    <div><dt>//freq_</dt><dd className="deck-freq">{aj ? `${aj.freq} hz` : '--'}</dd></div>
                    <div><dt>//beat_</dt><dd ref={ajBeatRef}>--</dd></div>
                    <div><dt>//phase_</dt><dd>{aj?.section ?? '--'}</dd></div>
                  </>
                ) : (
                  <div><dt>//bpm_</dt><dd ref={bpmRef} className="deck-bpm">--</dd></div>
                )}
                <div ref={dropRowRef} className="deck-drop" hidden><dt>//drop_</dt><dd ref={dropRef} /></div>
                {track.musicalKey && (
                  <div><dt>//key_</dt><dd>{track.musicalKey.toLowerCase()}</dd></div>
                )}
                {track.genre && <div><dt>//genre_</dt><dd>{track.genre.toLowerCase()}</dd></div>}
                {/* The row is gated on the ARTIST, not on the link. Gating
                    it on the link meant every track without one had no
                    //artist_ row at all -- and the one that mattered was
                    the failure path: graph.ts answers an undecodable
                    upload with {title: 'file not playable', artist: 'back
                    to the radio'}, deliberately held 1800ms "so the
                    radio's own announce doesn't erase the reason". The
                    reason's second half was never painted anywhere. You
                    saw FILE NOT PLAYABLE, then unexplained music. */}
                {track.artist && (
                  <div>
                    <dt>//artist_</dt>
                    {/* a reading, not a link: the audius profile it pointed at
                        opened nothing useful, and a row that looks pressable
                        and goes nowhere is worse than one that just says */}
                    <dd>{track.artist.replace(' · audius', '')}</dd>
                  </div>
                )}
              </dl>
            )}
            {source !== 'tube' && source !== 'tab' && source !== 'aj' && (
            <canvas
              ref={waveRef}
              className="deck-wave"
              /* A first-paint size only: drawWave re-sizes the buffer to the
                 element every frame, because this strip is fluid. */
              width={640}
              height={48}
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
            {source !== 'tube' && source !== 'tab' && source !== 'aj' && (
            <div className="deck-time">
              <data ref={cElapsedRef}>-:--</data>
              <data ref={cTotalRef}>-:--</data>
            </div>
            )}
            {/* ANOTHER TAB: their player owns play, skip and volume, so the
                transport folds away and what is left is what we can
                actually say -- whether sound is arriving, and the way out. */}
            {source === 'tab' && (
              <div className="tab-src">
                <div className="pl-row">
                  <span className="k">//listening_</span>
                  {signal === 'silent' ? (
                    <span className="v sig-silent">no audio</span>
                  ) : (
                    <span className="v listening-dot">{track?.title ?? 'another tab'}</span>
                  )}
                </div>
                {signal === 'silent' ? (
                  <p className="cn-hint tube-step" role="status">
                    shared, but no sound is arriving. press play in that tab. if it is
                    playing, share again and keep <b>also share tab audio</b> on.
                  </p>
                ) : (
                  <p className="cn-hint">
                    play, skip and volume live in that tab. the star only listens.
                  </p>
                )}
                <div className="cells c1">
                  <button onClick={() => void engineRef.current?.useTab()}>share a different tab</button>
                </div>
              </div>
            )}
            <div className={`railfold${source !== 'tab' ? ' open' : ''}`}>
              {/* no-pitch: YouTube exposes no rate control, so the dial is not
                  rendered at all in jukebox mode. vol then has to span the
                  full row — an unfilled cell in a gap:1px grid is a hole
                  showing the line colour, not empty space. */}
              {/* AJ: generated, not played back, so there is no pause and no
                  pitch; the row closes up to two cells rather than leave one
                  showing the line colour */}
              <div className={`transport${source === 'tube' || source === 'aj' ? ' no-pitch' : ''}${source === 'aj' ? ' two' : ''}`}>
                {source !== 'aj' && <button className="t-btn" onClick={togglePlay}>{playLabel}</button>}
                <button className="t-btn" onClick={skipTrack}>{skipLabel}</button>
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
                {/* the same trim as 04 · visuals: one ruler vocabulary for
                    every continuous control on the plate */}
                <Trim
                  className="t-trim"
                  cap="vol"
                  label="volume"
                  v={volume}
                  min={0}
                  max={1}
                  step={0.01}
                  fmt={(n) => String(Math.round(n * 100))}
                  onChange={(f) => setVolume((prev) => {
                    const nv = f(prev)
                    // in jukebox mode our gain is 0, so drive the player
                    // that actually sounds
                    if (engineRef.current?.kind === 'tube') tubeRef.current?.setVolume(nv)
                    return nv
                  })}
                />
                {source !== 'tube' && source !== 'aj' && (
                  <Trim
                    className="t-trim"
                    cap="pitch"
                    label="pitch (playback speed, bends like vinyl)"
                    v={rate}
                    min={0.5}
                    max={1.5}
                    step={0.01}
                    home={1}
                    armed={rate !== 1}
                    fmt={(n) => String(Math.round(n * 100))}
                    onChange={(f) => setRate((prev) => f(prev))}
                  />
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

          {/* 01.1 · JUKEBOX — a sub-module of the deck, not a sixth section.
              Numbered 06 it rendered between 01 and 02, so tube mode opened
              on `01 -> 06 -> 02`, which reads as a mistake. Renumbering the
              others is worse (the four non-tube sources would count 01, 03,
              04, 05 around a hole) and codes are identity, never data. It
              sits under 01 because in tube mode these rows ARE now-playing.

              The player itself is not visible: it mounts into a 1px clip on
              the stage (.tube-host) and never renders. These rows are what
              answers "what am I listening to", read from that same player. */}
          <div className={`railfold${source === 'tube' ? ' open' : ''}`}>
            {/* --i 2, with .rail-src: the jukebox plate is the source
                tabs' own fold and reveals with them. Unindexed it fell
                back to the cascade's tail, which is safe but wrong. */}
            <div className="tube rail-sec" style={{ '--i': 2 } as React.CSSProperties}>
              {/* The exit lives in the header, labelled with where it
                  goes. The way out already existed -- RADIO is one of four
                  buttons in 02 · FEED -- but this module is 60% of the
                  rail, so FEED sat below the fold and the exit was
                  unreachable without discovering that the rail scrolls. */}
              <h2 className="cn-mod sub">
                <span>01.1 · jukebox</span>
                <button className="cn-mod-back" onClick={leaveTube}>
                  ← {prevSource ?? 'radio'}
                </button>
              </h2>

              {/* SEARCH FIRST. This is the thing a person came to the
                  jukebox to do, and it used to sit beneath the now-playing
                  rows, three paragraphs of prose and the listen control:
                  measured below the fold on a 900px viewport, and further
                  below on anything shorter. Nothing above it was an action. */}
              <div className="vibe tube-paste">
                <input
                  value={tubePaste}
                  onChange={(e) => {
                    setTubePaste(e.target.value)
                    // Emptying the field puts the starting points back, which
                    // is what the header above promises. Also retires any
                    // search still in flight, so it cannot land afterwards.
                    if (!e.target.value.trim()) { tubeSearchGen.current++; setTubeHits(null); setTubeSeeking(false) }
                  }}
                  placeholder="search youtube, or paste a link…"
                  aria-label="search youtube, or paste a link"
                  autoComplete="off"
                  spellCheck={false}
                  onKeyDown={(e) => { if (e.key === 'Enter') void tubeSubmit() }}
                />
                <button onClick={() => void tubeSubmit()}>go</button>
              </div>
              {/* in the jukebox the fault is about the search or a video,
                  so it is said here, under the field, where the eye is */}
              {source === 'tube' && faultRow}

              <div className="tube-listen">
                {!canTab ? (
                  <p className="cn-hint">this browser cannot share tab audio, so the star cannot hear the jukebox.</p>
                ) : !listening ? (
                  <>
                    {/* ONE line, not three paragraphs. This module is already
                        60% of the rail, and it used to open with a privacy
                        statement, a walkthrough of chrome's dialog and a note
                        about eq -- roughly six lines of prose before the
                        visitor had done anything at all. The privacy claim and
                        the one step people actually get wrong are worth
                        saying; the rest is answered better by the failure
                        message below, which appears exactly when it applies. */}
                    {!hasListened && (
                      <p className="cn-hint">
                        reads this tab's levels, nothing else. tick{' '}
                        <b>also share tab audio</b> in chrome's dialog.
                      </p>
                    )}
                    <div className="cells c1">
                      <button onClick={() => void startListening()}>let the star listen</button>
                    </div>
                    {/* The attempt failed and the button still says the same
                        thing, so without this the room reads as "nothing
                        happened". Said here, where the person is looking. */}
                    {listenErr && (
                      <p className="cn-hint tube-step sig-silent" role="status">{listenErr}</p>
                    )}
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

              {/* only what the API actually reports */}
              {tubeState?.title && (
                <div className="pl-row"><span className="k">//track_</span><span className="v">{tubeState.title}</span></div>
              )}
              {tubeState?.channel && (
                <div className="pl-row"><span className="k">//channel_</span><span className="v">{tubeState.channel}</span></div>
              )}
              {tubeState && tubeState.duration > 0 && (
                <>
                  {/* A SCRUBBER, where there used to be two numbers. The
                      player reports elapsed and duration and accepts a seek,
                      so the strip is as real as the radio's -- just without
                      peaks, which YouTube never gives us, so it draws the
                      position and nothing it would have to invent. */}
                  <div
                    className="tube-seek"
                    role="slider"
                    tabIndex={0}
                    aria-label="seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(tubeState.duration)}
                    aria-valuenow={Math.round(tubeState.elapsed)}
                    aria-valuetext={`${fmtTime(tubeState.elapsed)} of ${fmtTime(tubeState.duration)}`}
                    onPointerDown={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      // the track runs inside the 12px gutters, so the hand
                      // is measured against the line it can see
                      const f = Math.max(0, Math.min(1, (e.clientX - r.left - 12) / (r.width - 24)))
                      tubeRef.current?.seek(f * tubeState.duration)
                    }}
                    onKeyDown={(e) => {
                      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
                      e.preventDefault()
                      e.stopPropagation()
                      const to = tubeState.elapsed + (e.key === 'ArrowRight' ? 5 : -5)
                      tubeRef.current?.seek(Math.max(0, Math.min(tubeState.duration, to)))
                    }}
                  >
                    <i style={{ width: `calc((100% - 24px) * ${(tubeState.elapsed / tubeState.duration).toFixed(4)})` }} />
                  </div>
                  <div className="pl-row">
                    <span className="k">{fmtTime(tubeState.elapsed)}</span>
                    <span className="v">{fmtTime(tubeState.duration)}</span>
                  </div>
                </>
              )}

              {/* the consent moment: said before the dialog, not after */}

              {/* Three, not six. The paste field is the entry; these are
                  starting points, and six fixed rows of them was 264px of
                  permanent furniture in a module already taking 60% of the
                  rail. The jukebox is a portal to a wider library, so what
                  it ships with should read as a door, not a catalogue. */}
              {/* Results and starting points are the SAME list, because they
                  are the same thing: rows you can play. Reusing .tube-list
                  rather than inventing a results component is what keeps the
                  module one vocabulary (§2) and adds no new type or spacing. */}
              <div className="cn-hint tube-or">
                {tubeSeeking ? 'looking…'
                  : tubeHits === null ? (tubeRecents.length ? 'or pick up where you left' : 'or start here')
                  : tubeHits.length ? `${tubeHits.length} found · clear to go back`
                  : 'nothing found · clear to go back'}
              </div>
              <div className="tube-list">
                {/* A row is the start of a QUEUE, not a single play: skip and
                    the end of a video walk the rest of this same list, so
                    after a search, skip means the next result -- not a jump
                    back to the curated rows. */}
                {tubeRows.slice(0, tubeHits ? tubeRows.length : 3).map((t, i) => (
                  <button
                    key={t.id}
                    className={tubeState?.videoId === t.id ? 'on' : ''}
                    onClick={() => tubeRef.current?.setQueue(tubeRows, i)}
                  >
                    <span>{t.title}</span><i>{t.channel}</i>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <h2 className="cn-mod"><span>02 · feed</span><i>//source_</i></h2>
          {/* Buttons that act, reporting which one is live: aria-pressed in a
              group, not radios. A radiogroup promises arrow-key selection
              and one-always-checked, and in stems or AJ mode none of these
              was checked at all. The stem deck is its feed taken apart, so
              that feed's cell stays pressed while the stems play. */}
          <div
            className={`rail-src rail-sec${canTab ? '' : ' three'}`}
            role="group"
            aria-label="audio source"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            {(['radio', 'file', 'tab', 'tube'] as const).filter((k) => k !== 'tab' || canTab).map((k) => {
              const on = source === k || (source === 'stems' && stemsFrom === k)
              const act = () => {
                const eng = engineRef.current
                if (k === 'radio') void eng?.playRadio()
                else if (k === 'file') fileRef.current?.click()
                else if (k === 'tab') void eng?.useTab()
                else void enterTube()
              }
              return (
                <button key={k} aria-pressed={on} className={on ? 'on' : ''} onClick={act}>
                  <Decode text={k === 'tube' ? 'jukebox' : k} duration={380} replayOnHover />
                </button>
              )
            })}
          </div>
          {source !== 'tube' && faultRow}

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
                  placeholder="set your vibe · or name an artist…"
                  aria-label="set your vibe"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button type="submit" aria-label="set vibe">go</button>
              </form>
              <div className="tuner-chips">
                {['late night drive', 'gym rage', 'rainy study', 'rooftop sunset'].map((v) => (
                  <button
                    key={v}
                    className={vibeOn === v ? 'on' : undefined}
                    aria-pressed={vibeOn === v}
                    onClick={() => { setQuery(v); void setVibe(v) }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <span className="tuner-state" role="status">
                {tuning2 === 'loading'
                  ? 'reading the vibe …'
                  : tuning2 === 'empty'
                    ? 'nothing playable on audius for that'
                    : vibeRead ?? 'streaming from audius · artist-owned'}
              </span>
              {/* Audius is artist-owned and deliberately small, so an empty
                  result is a normal answer rather than a fault. The jukebox
                  is the wider library, so this is where it earns its place:
                  named at the moment the narrow one runs out. */}
              {tuning2 === 'empty' && (
                <div className="cells c1">
                  <button onClick={() => void enterTube()}>
                    try the jukebox instead
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 3 · LAYERS — every ring's visible twin. */}
          <h2 className="cn-mod">
            <span>03 · layers</span>
            <i>{source === 'tube' ? '//meters only_' : source === 'stems' && stemN >= 2 ? `//${stemN} stems_` : '//6 rings_'}</i>
          </h2>
          {source === 'tube' && layerUi && (
            <p className="cn-hint">
              the meters are live. the faders are not: youtube owns the sound
              in jukebox mode, so moving them would change nothing.
            </p>
          )}
          {!layerUi && (
            <p className="cn-hint">pull the star apart<span className="kbd-only"> (or press d)</span> to mix its rings</p>
          )}
          <div ref={layersFoldRef} className={`railfold${layerUi ? ' open' : ''}`}>
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
                    {/* one scale, as with the level meter: L.level is
                        already min(1, (m / width) * 1.6) where it is built,
                        and multiplying again pinned five of six rings at
                        8/8 for 100% of samples. The whole point of a
                        per-ring meter is that the rings DISAGREE. */}
                    <i className="layer-meter">
                      {Array.from({ length: 8 }, (_, k) => (
                        <b key={k} className={k < Math.round(Math.min(1, L.level) * 8) ? 'on' : ''} />
                      ))}
                    </i>
                  </span>
                  {/* the row's fader is a bare trim: the ring's name and meter
                      already sit to its left, so it needs no label of its own */}
                  <Trim
                    bare
                    cap={L.label}
                    label={`${L.label} level`}
                    v={L.gain}
                    min={0}
                    max={2}
                    step={0.01}
                    home={1}
                    disabled={source === 'tube'}
                    fmt={(n) => String(Math.round(n * 100))}
                    onChange={(f) => tierCtlRef.current?.gain(L.i, f(L.gain))}
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
          <h2 className="cn-mod"><span>04 · visuals</span><i>//3 trims_</i></h2>
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
            {/* the ground, and the one thing you take away from a session */}
            <div className="pl-row"><span className="k">//ground_</span><span className="v">{theme}</span></div>
            <div className="cells c2" role="radiogroup" aria-label="ground">
              <button role="radio" aria-checked={theme === 'ink'} className={theme === 'ink' ? 'on' : ''} onClick={() => applyTheme('ink')}>ink</button>
              <button role="radio" aria-checked={theme === 'paper'} className={theme === 'paper' ? 'on' : ''} onClick={() => applyTheme('paper')}>paper</button>
            </div>
            <div className="cells c1">
              <button onClick={() => void savePoster()} disabled={posterBusy}>
                {posterBusy ? 'printing…' : 'save a poster · fig.02'}
              </button>
            </div>
          </div>

          {/* 5 · FOOT — states that only speak when armed, and the legend.
              Last thing in the scrolling half: the quietest rows in the
              console, and the only ones nobody needs at a glance. */}
          <div className="rail-foot rail-sec" style={{ '--i': 7 } as React.CSSProperties}>
            <div className="chips" aria-live="off">
              <span ref={zoomRef} className="chip" />
              <span ref={fltRef} className="chip" />
              <span ref={echoRef} className="chip" />
              <span ref={sectRef} className="chip" />
            </div>
            {source !== 'stems' && (
              <span className="stemhint">have stems? drop them together (vocals·drums·bass). split any track locally with stemdeck</span>
            )}
          </div>
          </div>

          {/* THE DOCK — the measured half, pinned. Two live readings that
              were below the fold on every laptop: the analyser's own 24
              bands, and the level the star is being driven by. Both are
              glanceable by definition, which is the whole reason the
              instrument is on a second screen. */}
          <div className="rail-dock">
            <h2 className="cn-mod"><span>05 · spectrum</span><i>//24 bands_</i></h2>
            <div className="spec rail-sec" style={{ '--i': 6 } as React.CSSProperties}>
              <canvas ref={specRef} width={400} height={144} aria-hidden="true" />
              <div className="spec-hz">
                <span>60</span><span>250</span><span>1k</span><span>4k</span><span>12k</span>
              </div>
            </div>
            <div className="level">
              <span className="level-tag">level</span>
              <div ref={levelRef} className="level-meter" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
              </div>
            </div>
          </div>

          {/* the phone sheet's last row (see consoleFooter) */}
          {footerInRail && consoleFooter}

          {/* OUR OWN SCROLLBAR. The browser's is either always there,
              taking a permanent 10px of a 320px column for an occasional
              need, or it is an overlay we cannot square off. This one is
              an indicator: no reserved width, no layout shift, square,
              on the sheet's own ink, and only visible while the column is
              actually moving. */}
          <i ref={railBarRef} className="railbar" aria-hidden="true"><i /></i>
        </main>

            {/* the stage: the star burns through this cell, framed by
                brackets and nothing else. All the measuring chrome that
                used to bleed across it now lives in the panel. */}
            <div className="cn-stage">
              <i className="cn-brk tl" /><i className="cn-brk tr" />
              <i className="cn-brk bl" /><i className="cn-brk br" />

              {/* The player is mounted but never seen. It cannot be
                  display:none or visibility:hidden — chrome throttles a
                  player it believes is not being watched, and playback
                  stalls — so the host is a 1px box that clips a
                  full-size iframe at zero opacity. It stays composited,
                  keeps playing, and shows nothing. `inert` takes it out of
                  the tab order so the one control nobody can see is also
                  the one control nobody can reach.

                  The stage belongs to the star. What is playing is said in
                  the rail's 01.1 · JUKEBOX rows, which read from the same
                  player this host owns. */}
              {source === 'tube' && (
                <div ref={tubeHostRef} className="tube-host" aria-hidden="true" inert />
              )}
            </div>
          </div>

          {/* THE PHONE'S MINI DECK. On a phone the star is the page and the
              console is a sheet you open. What stays in reach without it is
              what a player owes you at a glance: the title, play and skip.
              Hidden above 720px, where the rail is always there. */}
          <div className="cn-mini">
            <div className="cn-mini-name" aria-hidden="true"><Decode text={source === 'tube' ? pipName : name} duration={700} /></div>
            {source !== 'tab' && source !== 'aj' && <button className="t-btn" onClick={togglePlay}>{playLabel}</button>}
            <button className="t-btn" onClick={skipTrack}>{skipLabel}</button>
            <button
              className={`t-btn cn-mini-sheet${sheet ? ' on' : ''}`}
              onClick={() => setSheet((v) => !v)}
              aria-expanded={sheet}
              aria-label={sheet ? 'close the console' : 'open the console'}
            >
              <span>{sheet ? 'star' : 'console'}</span>
            </button>
          </div>

          {!footerInRail && consoleFooter}
        </div>
      )}

      {/* THE ANNOUNCEMENT — every track change earns one display-scale
          moment before the title settles into the rail. */}
      {started && announce && (
        <div key={announce.key} className="announce" aria-hidden="true">
          <span className="announce-title beat-type" ref={bindBeatType}>
            {/* Filename-derived titles run long; the announcement is a
                headline, not a paragraph. */}
            <Decode text={clip(announce.text, 28).toUpperCase()} duration={900} />
          </span>
        </div>
      )}

      {/* THE STAGE PLATE — one display moment, set for a room. Only real
          readings under it: the artist the source reported, the tempo the
          machine locked. Absent rows are absent, not blank. */}
      {started && stage && (
        <div className="stage-plate" aria-live="polite">
          <span className="stage-code">[scope-02] · {SOURCE_ID[source]}</span>
          <h2 className="stage-title beat-type" ref={bindBeatType}>
            <Decode text={source === 'tube' ? pipName : name} duration={900} />
          </h2>
          {source !== 'tube' && track?.artist && (
            <span className="stage-meta">{track.artist.replace(' · audius', '')}</span>
          )}
          <button
            className={`stage-exit${stageExit ? ' on' : ''}`}
            onClick={() => setStage(false)}
            tabIndex={stageExit ? 0 : -1}
          >
            ← <span>console</span> · esc
          </button>
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

      {started && onboard && <Onboard key={tourMode} mode={tourMode} ops={tourOpsRef.current} onDone={() => setOnboard(false)} />}

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
  { ix: '01', n: 'src', d: 'radio · file · tab', i: 'what you feed it: radio, a file, or your own music playing in another tab' },
  { ix: '02', n: 'eq', d: '3 shelves', i: 'three shelves, the ones the orb bends when you grab it' },
  { ix: '03', n: 'tiers', d: '6 peaking', i: 'six peaking filters, one per dissection ring' },
  { ix: '04', n: 'filter', d: 'hp / lp', i: 'the colour sweep: high-pass left, low-pass right' },
  { ix: '05', n: 'echo', d: 'parallel loop', i: 'a tempo-locked delay with feedback, sent in parallel' },
  { ix: '06', n: 'analyser', d: '24 bands', i: '24 log bands: everything the star sees' },
  { ix: '', n: 'star', d: 'visuals tap here', sub: true, i: 'the visuals read the analyser, not the output: mute keeps the star dancing' },
  { ix: '07', n: 'out', d: 'master gain', i: 'master gain, and the node that mute silences' },
]

/**
 * noon's mark, at chrome scale.
 *
 * The real vector, never a redrawing. An approximation of someone else's mark
 * is wrong in the way a faked wordmark is wrong, so the path comes from the
 * artwork itself (Figma 1515:9212, 108x108) and lives in .env.local rather
 * than in git -- it is licensed, and this repo has a remote.
 *
 * Absent variable renders nothing, on purpose. A fresh clone and CI have no
 * .env.local, and the footer must not open a hole where the mark would be;
 * the words beside it carry the attribution on their own.
 *
 * Sized 1em by CSS, and that is the whole reason this works. The mark's ring
 * is 15.55% of its box, so at the footer's 8px it lands at 1.24px of ink --
 * the plate's own hairline, the same weight as --pl-line and .cn-brk. At 42px
 * it would be 6.5px and read as pasted-in artwork against a 1px sheet. The
 * mark self-sizes to this product's line language at chrome scale and stops
 * working above it, which is why it appears here and nowhere larger.
 */
function NoonMark() {
  const d = import.meta.env.VITE_NOON_MARK_D as string | undefined
  if (!d) return null
  return (
    <svg width="8" height="8" viewBox="0 0 108 108" aria-hidden="true">
      <path d={d} fill="currentColor" />
    </svg>
  )
}

/**
 * The accent, as numbers, for the surfaces that cannot say var(--accent).
 *
 * The survey is drawn on a 2D canvas and fillStyle takes a string, so the
 * accent has to arrive as digits. Read from the stylesheet rather than
 * respelled here, or ?accent=noon would repaint the chrome and leave the
 * survey vermillion.
 *
 * Cached deliberately. getComputedStyle in a draw loop is a forced style
 * read on every frame, which is the exact cost just removed from the tour --
 * the accent changes at most once per page load, so it is read then.
 */
let ACCENT_RGB = '225, 59, 42'
/* The two inks, for the same reason and read the same way. The seek strip
   used to paint `rgba(234,234,234, …)` — the neutral grey family the palette
   pass retired from the whole stylesheet. A canvas takes a string, so no CSS
   migration could reach it, and it kept drawing in a colour the product no
   longer has. Read the tokens instead, and it cannot drift again. */
/* The ink as a raw triple, because a canvas composes its own alphas. EVERY
   canvas in this file used to paint `rgba(234,234,234, …)` — the neutral grey
   family the palette pass retired from the whole stylesheet. A canvas takes a
   string, so no CSS migration could reach them, and the three biggest painted
   surfaces in the product went on drawing in a colour it no longer has: the
   dissected survey, the spectrum bars, and the seek strip. */
let INK_RGB = '192, 198, 214'
/* The unplayed run of the seek strip is the PLATE'S OWN HAIRLINE, read from
   --pl-line rather than invented as another alpha of the ink. At 0.28 it
   measured 1.9:1 and read as nothing at all. --pl-line is the line every cell
   in the plate is already drawn with, which is exactly what this is. */
let INK_LINE = 'rgba(141, 144, 168, 0.68)'
/* Paper only. On paper the accent is never a letter or a line -- yellow there
   is 1.01:1 -- so --accent-rgb reads as the ink and the canvases draw every
   accent stroke and label in ink, as the stylesheet does. --mark is the
   yellow as a FIELD, and exists only under :root[data-theme='paper'], so it
   reads empty on the dark sheet and every `if (MARK)` below is paper-only.
   GROUND_RGB is for the knockouts that lift canvas type off the star. */
let MARK = ''
let GROUND_RGB = '10, 10, 10'
export function readAccent() {
  const cs = getComputedStyle(document.documentElement)
  const v = cs.getPropertyValue('--accent-rgb').trim()
  if (v) ACCENT_RGB = v
  const ink = cs.getPropertyValue('--ink-rgb').trim()
  if (ink) INK_RGB = ink
  const line = cs.getPropertyValue('--pl-line').trim()
  if (line) INK_LINE = line
  MARK = cs.getPropertyValue('--mark').trim()
  const ground = cs.getPropertyValue('--ground-rgb').trim()
  if (ground) GROUND_RGB = ground
}

/** The browser's own chrome follows the ground: the phone's address bar was
 *  left black over a cream page. */
export function paintThemeColor() {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--ground').trim()
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta && bg) meta.setAttribute('content', bg)
}

function Reg({ className }: { className: string }) {
  return (
    <svg className={className} width="13" height="13" aria-hidden="true">
      <g stroke="var(--accent)" strokeWidth="1">
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
const DIAL_STEP = 0.05

/**
 * A TRIM, not a knob. The three visual controls were 42px dials whose ring
 * was the noon mark -- a logo asked to be a gauge, and a knob that small
 * has almost no travel to aim with. A trim is what the rest of the console
 * already speaks: a calibrated ruler like the //peak_ scale and the LEVEL
 * meter, read left to right, lit up to the value. The whole row is the
 * target, the drag is horizontal and absolute (press where you want it),
 * and the one accent tick is the detent at 100, where double-click, Home
 * and the "2" preset all return. Arrow keys still step 5, shift 25.
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
  return (
    <Trim
      className="pl-dial"
      cap={cap}
      v={v}
      min={DIAL_MIN}
      max={DIAL_MAX}
      step={DIAL_STEP}
      home={1}
      // a tick every 0.05 from 0.25; long ones on 50 / 100 / 150 / 200
      n={36}
      isMajor={(i) => (i + 5) % 10 === 0}
      fmt={(n) => String(Math.round(n * 100))}
      onChange={onChange}
    />
  )
}

/** a tick every 2.5% of travel, a long one every quarter: 0..1 reads
 *  0 / 25 / 50 / 75 / 100 and 0.5..1.5 reads 50 / 75 / 100 / 125 / 150 */
const TRIM_N = 41
const TRIM_MAJOR = (i: number) => i % 10 === 0

function Trim({
  v, cap, label, min, max, step, home, armed, fmt, onChange, className = '',
  n = TRIM_N, isMajor = TRIM_MAJOR, bare = false, disabled = false,
}: {
  /** ruler only: for a row that already names and reads the value */
  bare?: boolean
  /** dead, not hidden: the row still shows where the value sits */
  disabled?: boolean
  /** tick count and which are long, for a range whose round values fall
   *  elsewhere (the visual trims run 0.25..2) */
  n?: number
  isMajor?: (i: number) => boolean
  v: number
  cap: string
  label?: string
  min: number
  max: number
  step: number
  /** the detent: drawn in the accent, where double-click and Home return */
  home?: number
  /** off its detent: the reading carries the accent, as the pitch always did */
  armed?: boolean
  fmt: (n: number) => string
  onChange: (next: (prev: number) => number) => void
  className?: string
}) {
  const track = useRef<SVGSVGElement>(null)
  const held = useRef(false)
  const clamp = (n: number) => Math.max(min, Math.min(max, n))
  const snap = (n: number) => clamp(Number((Math.round(n / step) * step).toFixed(4)))
  const nudge = (d: number) => onChange((p) => snap(p + d))
  const setAt = (clientX: number) => {
    const r = track.current?.getBoundingClientRect()
    if (!r || r.width <= 0) return
    const f = Math.max(0, Math.min(1, (clientX - r.left) / r.width))
    const next = snap(min + f * (max - min))
    onChange(() => next)
  }
  const x = (n: number) => ((n - min) / (max - min)) * 200
  const span = max - min
  return (
    <div
      className={`trim${bare ? ' bare' : ''} ${className}`}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label={label ?? cap}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Number(v.toFixed(2))}
      aria-valuetext={`${cap} ${fmt(v)}`}
      onPointerDown={(e) => {
        if (disabled) return
        e.currentTarget.setPointerCapture(e.pointerId)
        held.current = true
        setAt(e.clientX)
      }}
      onPointerMove={(e) => { if (held.current) setAt(e.clientX) }}
      onPointerUp={(e) => {
        held.current = false
        e.currentTarget.releasePointerCapture(e.pointerId)
      }}
      onDoubleClick={() => { if (home !== undefined && !disabled) onChange(() => home) }}
      onKeyDown={(e) => {
        if (disabled) return
        // arrows step 5% of the range, shift 25%: the same feel on every trim
        const s = (e.shiftKey ? 0.25 : 0.05) * (span > 1 ? 1 : span)
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); nudge(s) }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); nudge(-s) }
        else if (e.key === 'Home' && home !== undefined) { e.preventDefault(); onChange(() => home) }
      }}
    >
      {!bare && <span className="cap">{cap}</span>}
      <svg ref={track} className="trim-track" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => {
          const t = min + (i / (n - 1)) * span
          const major = isMajor(i)
          return (
            <line
              key={i}
              className={t <= v + 1e-6 ? 'lit' : ''}
              x1={x(t)} x2={x(t)}
              y1={major ? 4 : 9} y2={16}
            />
          )
        })}
        {home !== undefined && <line className="trim-home" x1={x(home)} x2={x(home)} y1={0} y2={3} />}
        <line className="trim-needle" x1={x(v)} x2={x(v)} y1={0} y2={16} />
      </svg>
      {!bare && <b className={armed ? 'armed' : ''}>{fmt(v)}</b>}
    </div>
  )
}

/** The spectrum ruler. Drawn scale, no needle: standby has no signal. */
function Scale() {
  return (
    <svg width="100%" height="12" preserveAspectRatio="none" viewBox="0 0 280 12" aria-hidden="true">
      <g stroke="currentColor">
        <line x1="0" y1="11.5" x2="280" y2="11.5" opacity=".5" />
        {[1, 36, 71, 106, 141, 176, 211, 246, 279].map((x, i) => (
          <line key={x} x1={x} y1={i % 3 === 0 ? 3 : 7} x2={x} y2="11" />
        ))}
      </g>
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
/** 20Hz..20kHz in the axis's own vocabulary: 60 · 250 · 1K · 4K · 12K. */
function fmtHz(hz: number): string {
  return hz >= 1000 ? `${(hz / 1000).toFixed(hz < 10000 ? 1 : 0)}k` : `${Math.round(hz)}hz`
}

/**
 * THE STAR'S CORE, SCANNED. One thin line through the body is copied out of
 * the frame just rendered and compared with the last one: the mean change
 * in its ink is the reading. 108,000 particles churning through a scanline
 * is a genuinely jagged signal -- it spikes when the field is disturbed and
 * crackles at rest -- where the old source was a slow sine breath, which no
 * honest drawing could make sharp. The value is scaled against its own
 * recent maximum, so the drum uses its height whatever the scene.
 */
const SCAN_W = 96
let scanCv: HTMLCanvasElement | null = null
let scanPrev: Float32Array | null = null
let scanMax = 0.02
function probeStar(src: HTMLCanvasElement, scene: Scene, w: number, h: number): number {
  if (!scanCv) {
    scanCv = document.createElement('canvas')
    scanCv.width = SCAN_W
    scanCv.height = 2
  }
  const g = scanCv.getContext('2d', { willReadFrequently: true })
  if (!g || w <= 0 || h <= 0) return 0
  const f = scene.focusNow
  const r = 0.88 * (h / 2) * (scene.zoomLevel / f.d)
  const dpr = src.width / w
  const sx = (f.x * w - r * 0.8) * dpr
  const sy = f.y * h * dpr
  g.drawImage(src, sx, sy, r * 1.6 * dpr, 2 * dpr, 0, 0, SCAN_W, 2)
  const d = g.getImageData(0, 0, SCAN_W, 1).data
  const cur = new Float32Array(SCAN_W)
  let diff = 0
  for (let i = 0; i < SCAN_W; i++) {
    cur[i] = (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 765
    if (scanPrev) diff += Math.abs(cur[i] - scanPrev[i])
  }
  scanPrev = cur
  const v = diff / SCAN_W
  // the gain follows the signal's own recent ceiling, decaying over ~8 s
  scanMax = Math.max(v, scanMax * 0.998, 0.004)
  return Math.min(1, v / scanMax)
}

const MOTION_HZ = 60
const MOTION_SECONDS = 8

/**
 * THE MOTION STRIP, drawn as a drum recorder rather than a texture: crisp
 * spikes, one per sample of the star's scanned core (probeStar).
 *
 * It was 240 samples (four seconds) stretched over 1400px, each column
 * given a random alpha, a sin*cos "jag" and random speckle on top -- a grey
 * fuzz where most of what you saw was the drawing inventing detail. Texture
 * never lies (DESIGN.md), and that one did. Every mark here is a reading:
 *
 *   · each spike is one sample of the scan, mirrored on a hairline baseline;
 *     the jaggedness is the field's own churn, not a drawn texture
 *   · older time dims toward the left edge, the way ink dries on a drum
 *   · the ticks under it are seconds, and they travel with the paper; the
 *     long one is every fifth
 *   · the write head is the only accent: the pen at the value just written,
 *     and its hairline down the drum
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

  const n = hist.length
  const have = Math.min(n, head)
  const HEAD = 16 // the write head sits this far in from the right edge
  const hx = w - HEAD
  const TICKS = 9 // room under the drum for the second ticks
  const mid = Math.round((h - TICKS) / 2) + 0.5
  const amp = mid - 5
  const step = hx / (n - 1)
  // sample k of the visible window, 0 = oldest; unwritten history is empty
  const at = (k: number) => {
    const back = n - 1 - k
    if (back >= have) return 0
    return hist[(head - 1 - back + n * 4) % n]
  }
  const y = (v: number) => Math.max(0.5, Math.min(1, Math.max(0, v)) * amp)

  // SPIKES: one hairline per sample, mirrored on the baseline, and nothing
  // else -- no wash, no rounded outline. The jaggedness is the reading.
  g.lineWidth = 1
  g.strokeStyle = `rgba(${INK_RGB},0.88)`
  g.beginPath()
  for (let k = 0; k < n; k++) {
    const px = Math.round(k * step) + 0.5
    const a = y(at(k))
    g.moveTo(px, mid - a)
    g.lineTo(px, mid + a)
  }
  g.stroke()

  // the baseline, in the plate's own line
  g.strokeStyle = INK_LINE
  g.beginPath()
  g.moveTo(0, mid)
  g.lineTo(w, mid)
  g.stroke()

  // seconds, travelling with the paper
  const base = h - 0.5
  g.beginPath()
  for (let k = 0; k < n; k++) {
    const idx = head - (n - 1 - k)
    if (idx < 0 || idx % MOTION_HZ !== 0) continue
    const px = Math.round(k * step) + 0.5
    const long = (idx / MOTION_HZ) % 5 === 0
    g.moveTo(px, base)
    g.lineTo(px, base - (long ? 7 : 3))
  }
  g.stroke()

  // older time dries toward the left: a real fade of real marks
  g.save()
  g.globalCompositeOperation = 'destination-out'
  const fade = g.createLinearGradient(0, 0, w * 0.55, 0)
  fade.addColorStop(0, 'rgba(0,0,0,0.88)')
  fade.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = fade
  g.fillRect(0, 0, w * 0.55, h)
  g.restore()

  // the write head: its hairline, and the pen at the value just written
  const v = at(n - 1)
  const py = Math.round(mid - y(v)) + 0.5
  g.strokeStyle = `rgba(${INK_RGB},0.35)`
  g.setLineDash([2, 3])
  g.beginPath()
  g.moveTo(hx + 0.5, 0)
  g.lineTo(hx + 0.5, h - TICKS)
  g.stroke()
  g.setLineDash([])
  // the pen's leader: the value carried to the drum's edge
  g.strokeStyle = MARK ? `rgba(${INK_RGB},0.9)` : `rgba(${ACCENT_RGB},0.9)`
  g.beginPath()
  g.moveTo(hx, py)
  g.lineTo(w, py)
  g.stroke()
  // on paper the accent is a FIELD, never a line: a yellow pen with an ink
  // keyline. On ink it is the accent itself.
  g.fillStyle = MARK || `rgb(${ACCENT_RGB})`
  g.fillRect(hx - 2, py - 2.5, 5, 5)
  if (MARK) {
    g.strokeStyle = `rgba(${INK_RGB},1)`
    g.strokeRect(hx - 2, py - 2.5, 5, 5)
  }
}

/**
 * The deck strip. With peaks: the WHOLE track's waveform, played portion at
 * full ink, the future dimmed, a red playhead sweeping through — you can see
 * the drop coming. Without peaks (mic): the live rms history scroll.
 */
/**
 * The seek strip.
 *
 * It used to draw the track: a peaks overview when one had loaded, and a live
 * rms trace when none had. Both are gone. The overview was a picture of a
 * waveform nobody reads at 220px, the live trace was a squiggle that said
 * only "sound is happening" — which the star two feet to the right says far
 * better — and the readout underneath already gives the position in the one
 * form anybody acts on: 0:17 of 3:48.
 *
 * WHAT STAYS IS THE CONTROL. This canvas is `role="slider"`, aria-label
 * "seek", and carries the pointer and keyboard handlers; it is the only way
 * to scrub with a hand. So it keeps its element, its gestures and its label,
 * and simply stops drawing a picture: a hairline track, the played part in
 * ink, the playhead in the accent. One row of instrument furniture, in the
 * same vocabulary as the VOL and PITCH tracks three rows down.
 *
 * `wave` and `head` stay in the signature because the caller owns that ring
 * buffer for the standby MOTION strip; this simply no longer reads them.
 */
function drawWave(
  cv: HTMLCanvasElement | null,
  _wave: Float32Array,
  _head: number,
  _peaks: TrackPeaks | null,
  progress: number,
  drops: Drop[] = [],
) {
  const g = cv?.getContext('2d')
  if (!cv || !g) return

  // SIZE THE BUFFER TO THE BOX. The element carried a fixed 464x104 buffer
  // from when it drew a waveform in a 220x52 cell, and the strip is now
  // 24px tall and full-width: 464 into ~319 squashed every horizontal by
  // 1.45x, and 104 into 24 squashed the rule from 2 buffer px to under half
  // a CSS pixel. It rendered as a grey smudge rather than a hairline, and
  // only at a high deviceScaleFactor did it look right -- which is exactly
  // the kind of thing a screenshot at 4x hides and a real 1x screen shows.
  //
  // Measured from the element every frame, because the rail is fluid and
  // this is one comparison against a number the browser already has.
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const wantW = Math.max(1, Math.round(cv.clientWidth * dpr))
  const wantH = Math.max(1, Math.round(cv.clientHeight * dpr))
  if (cv.width !== wantW || cv.height !== wantH) {
    cv.width = wantW
    cv.height = wantH
  }
  g.clearRect(0, 0, cv.width, cv.height)

  // The buffer is retina, so a 1px rule is 2 buffer px. Hairlines only (§1).
  const W = cv.width
  const H = cv.height
  const rule = 2
  const mid = Math.round((H - rule) / 2)
  const px = Math.round(Math.max(0, Math.min(1, progress)) * W)

  // Paper: the elapsed run is a yellow field under the ink rule, 6px tall,
  // so where the track is at reads from across the room (on the dark sheet
  // the accent playhead does that alone; paper cannot draw yellow as a line)
  if (MARK) {
    const band = Math.round(6 * dpr)
    g.fillStyle = MARK
    g.fillRect(0, mid + rule / 2 - band / 2, px, band)
  }
  // Unplayed, then played over it: two inks, no third.
  g.fillStyle = INK_LINE
  g.fillRect(0, mid, W, rule)
  g.fillStyle = `rgba(${INK_RGB}, 0.92)`
  g.fillRect(0, mid, px, rule)

  // Drops, marked where they will land: a short tick above the rule, dim
  // once passed and full ink ahead, so the strip shows what is coming.
  // Ink, not accent -- the accent is the playhead's, and one accent per
  // strip is the rule.
  if (drops.length && _peaks) {
    const dur = _peaks.amp.length * _peaks.secondsPerPixel
    for (const d of drops) {
      const x = Math.round((d.t / dur) * W)
      const passed = x <= px
      g.fillStyle = passed ? INK_LINE : `rgba(${INK_RGB}, 0.92)`
      const tall = Math.round((mid - 2) * (0.45 + 0.55 * d.strength))
      g.fillRect(Math.min(x, W - rule), mid - tall, rule, tall)
    }
  }

  // The playhead is the full height of the strip, so the hit area reads as
  // a track rather than a line someone drew across a gap.
  // Paper: the playhead is a yellow slab with an ink edge -- the accent as a
  // FIELD, the only way it exists on paper -- 5px wide, full height.
  if (MARK) {
    const e = Math.round(dpr)
    const sw = Math.round(5 * dpr)
    const x0 = Math.max(e, Math.min(W - sw - e, px - Math.round(sw / 2)))
    g.fillStyle = `rgba(${INK_RGB},1)`
    g.fillRect(x0 - e, 0, sw + 2 * e, H)
    g.fillStyle = MARK
    g.fillRect(x0, e, sw, H - 2 * e)
    return
  }
  g.fillStyle = `rgba(${ACCENT_RGB},1)`
  g.fillRect(Math.min(px, W - rule), 0, rule, H)
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
    g.strokeStyle = `rgba(${INK_RGB},${sa})`
    g.lineWidth = 1
    g.setLineDash([3, 6])
    g.beginPath()
    g.moveTo(t.x, t.y)
    g.lineTo(b.x, b.y)
    g.stroke()
    g.setLineDash([])
    g.fillStyle = `rgba(${ACCENT_RGB},${Math.min(1, sa + 0.25)})`
    // paper: the two arrowheads are yellow fields with an ink edge, since a
    // yellow shape with no edge is not visible on the stock
    if (MARK) {
      g.fillStyle = MARK
      g.strokeStyle = `rgba(${INK_RGB},${Math.min(1, sa + 0.25)})`
      g.globalAlpha = Math.min(1, sa + 0.25)
    }
    g.beginPath()
    g.moveTo(t.x - 4, t.y - 6)
    g.lineTo(t.x + 4, t.y - 6)
    g.lineTo(t.x, t.y - 13)
    g.closePath()
    g.fill()
    if (MARK) g.stroke()
    g.beginPath()
    g.moveTo(b.x - 4, b.y + 6)
    g.lineTo(b.x + 4, b.y + 6)
    g.lineTo(b.x, b.y + 13)
    g.closePath()
    g.fill()
    if (MARK) {
      g.stroke()
      g.globalAlpha = 1
    }
  }

  // the chrome arrives later than the matter — rings first, then the ink
  const a = Math.max(0, Math.min(1, (dis - 0.25) / 0.55))
  if (a <= 0.01) return
  const n = tiers.length
  const ink = (al: number) => `rgba(${INK_RGB},${al * a})`
  const accent = (al: number) => `rgba(${ACCENT_RGB},${al * a})`
  g.textBaseline = 'middle'
  g.lineWidth = 1
  // Paper: an alpha of the ink over light stock is a grey, not a lighter
  // ink, and at the dark sheet's 0.38 the rings read as pencil. On paper
  // they are engraved: the same ranking, cut 1.7x deeper.
  const eng = (al: number) => (MARK ? Math.min(1, al * 1.7) : al)

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
    g.strokeStyle = soloed ? accent(0.8) : ink(eng(hot ? 0.85 : muted ? 0.14 : 0.38))
    g.beginPath()
    for (let k = 0; k <= 48; k++) {
      const p = scene.surveyPoint(i, (k / 48) * Math.PI * 2)
      if (k === 0) g.moveTo(p.x, p.y)
      else g.lineTo(p.x, p.y)
    }
    g.stroke()

    // the nested inner ring — the drawing's concentric vocabulary
    g.strokeStyle = soloed ? accent(0.4) : ink(eng(muted ? 0.08 : 0.2))
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
    if (MARK) {
      // PAPER. The plate is a slip of the stock: a knockout of the ground
      // under both lines, so the specks passing behind a label never run
      // through its letters, and the face is the sheet's own Departure Mono
      // at 11px -- the JetBrains Mono these were set in does not ship, so the
      // browser was faking both it and its bold. A soloed tier's name and a
      // muted tier's state carry the mark, the paper form of the accent.
      const l1 = `0${i + 1} · ${tiers[i].label.toUpperCase()}`
      const l2 = muted ? 'MUTED' : soloed ? 'SOLO' : `LVL ${String(Math.round(levels[i] * 99)).padStart(2, '0')}`
      g.font = '11px "Departure Mono", ui-monospace, monospace'
      const w1 = g.measureText(l1).width
      const w2 = g.measureText(l2).width
      g.fillStyle = `rgba(${GROUND_RGB},${0.92 * a})`
      g.fillRect(lx - 4, ctr.y - 15, Math.max(w1, w2, 46) + 8, 32)
      if (soloed) {
        g.globalAlpha = a
        g.fillStyle = MARK
        g.fillRect(lx - 3, ctr.y - 13, w1 + 6, 13)
        g.globalAlpha = 1
      }
      if (muted) {
        g.globalAlpha = a
        g.fillStyle = MARK
        g.fillRect(lx - 3, ctr.y, w2 + 6, 13)
        g.globalAlpha = 1
      }
      g.fillStyle = ink(soloed || hot ? 1 : muted ? 0.6 : 0.9)
      g.fillText(l1, lx, ctr.y - 6)
      g.fillStyle = ink(muted || soloed ? 1 : 0.62)
      g.fillText(l2, lx, ctr.y + 7)
      g.fillStyle = ink(0.85)
      g.fillRect(lx, ctr.y + 14, Math.max(1, levels[i] * 46), 1)
      continue
    }
    g.font = 'bold 10px "JetBrains Mono", ui-monospace, monospace'
    g.fillStyle = soloed ? accent(0.95) : muted ? accent(0.75) : ink(hot ? 1 : 0.9)
    g.fillText(`0${i + 1} · ${tiers[i].label.toUpperCase()}`, lx, ctr.y - 7)
    g.font = '9px "JetBrains Mono", ui-monospace, monospace'
    g.fillStyle = muted ? accent(0.6) : soloed ? accent(0.7) : ink(0.55)
    g.fillText(
      muted ? 'MUTED' : soloed ? 'SOLO' : `LVL ${String(Math.round(levels[i] * 99)).padStart(2, '0')}`,
      lx,
      ctr.y + 6,
    )
    g.fillStyle = soloed ? accent(0.8) : ink(0.8)
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
  g.fillStyle = accent(0.55 + Math.min(0.45, beat))
  g.fillRect(bp.x - 2, bp.y - 2, 4, 4)
  const cB = scene.projectLocal(0, yB, 0)
  if (MARK) {
    // paper: the beat dot is a yellow square with an ink edge, and SUM is
    // set on its own slip of the stock, in the sheet's face
    g.globalAlpha = a
    g.fillStyle = MARK
    g.fillRect(bp.x - 3, bp.y - 3, 6, 6)
    g.globalAlpha = 1
    g.strokeStyle = ink(0.9)
    g.strokeRect(bp.x - 2.5, bp.y - 2.5, 5, 5)
    const sum = `SUM ${String(Math.round(Math.min(1, rms) * 99)).padStart(2, '0')}`
    g.font = '11px "Departure Mono", ui-monospace, monospace'
    g.fillStyle = `rgba(${GROUND_RGB},${0.92 * a})`
    g.fillRect(cB.x + 8, cB.y - 8, g.measureText(sum).width + 8, 16)
    g.fillStyle = ink(0.75)
    g.fillText(sum, cB.x + 12, cB.y + 1)
    return
  }
  g.font = '9px "JetBrains Mono", ui-monospace, monospace'
  g.fillStyle = ink(0.6)
  // ONE SCALE, and this readout is the third to learn it. features.ts
  // already returns rms compressed and enveloped into 0..1; the level
  // meter's `* 2.4` was removed for pinning at 12/12 for 90% of samples,
  // and the comment recording that fix sits forty lines from here -- while
  // the SAME 2.4 stayed on the master compass, where it clips everything
  // above rms 0.417. Measured against the analyser on a loud track (rms
  // 0.320..0.998), that is SUM 99 for almost the whole track. A fix
  // applied to one readout is not applied to the quantity.
  g.fillText(`SUM ${String(Math.round(Math.min(1, rms) * 99)).padStart(2, '0')}`, cB.x + 12, cB.y)
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
  // PAPER: the held range is highlighted BEHIND its bars -- a yellow field
  // across the band's columns -- and the bars stay ink. A yellow bar on the
  // stock would be the one reading in the panel you could not see.
  const paperHold = !!MARK && mixBand != null
  if (paperHold) {
    const i0 = mixBand === 'low' ? 0 : mixBand === 'mid' ? 8 : 16
    g.globalAlpha = 0.35 + Math.min(0.65, Math.abs(mixDb) / 20)
    g.fillStyle = MARK
    g.fillRect(i0 * bw, 0, 8 * bw, cv.height)
    g.globalAlpha = 1
  }
  for (let i = 0; i < n; i++) {
    const raw = Math.min(1, bands[i] * 1.25)
    // Fast up, slow down — VU-meter ballistics.
    shown[i] += (raw - shown[i]) * (raw > shown[i] ? 0.55 : 0.18)
    const v = shown[i]
    peaks[i] = Math.max(v, peaks[i] - 0.012)
    const bh = v * (cv.height - 4)
    g.fillStyle = `rgba(${INK_RGB},0.88)`
    // The HELD EQ range tints red while you bend it — the analytical view
    // agreeing with the sculptural one.
    if (mixBand != null && !paperHold) {
      const inBand = mixBand === 'low' ? i < 8 : mixBand === 'mid' ? i >= 8 && i < 16 : i >= 16
      if (inBand) g.fillStyle = `rgba(${ACCENT_RGB},${0.45 + Math.min(0.55, Math.abs(mixDb) / 30)})`
    }
    g.fillRect(i * bw + 1, cv.height - bh, bw - 2, bh)
    // hanging peak cap — dimmer, falls slowly
    const py = cv.height - peaks[i] * (cv.height - 4)
    g.fillStyle = `rgba(${INK_RGB},0.35)`
    g.fillRect(i * bw + 1, py - 2, bw - 2, 2)
  }
}

/**
 * The mini star. Crops the star out of the full-bleed stage canvas and
 * copies it into the PiP window's canvas, every frame.
 *
 * The crop is derived from the camera, not guessed: the body's radius is
 * 0.88 of the half-height at dolly 1 (scene.ts R_BASE), divided by the
 * dolly, multiplied by the zoom, and pushed back by the dissection's own
 * dolly. The square is 1.3x the body so drops and ejecta have room, and it
 * follows the focus, so the copy is the same star wherever the stage has
 * put it -- the console's cell, the watching centre, or the standby plate.
 *
 * A copy of the star, not a second render: two cameras would be two stars,
 * and the one in the corner of your screen would not be the one you mixed.
 */
/**
 * THE POSTER'S CROP, found in the pixels.
 *
 * The frame just rendered is downsampled, every pixel that differs from the
 * ground is counted, and the star's box is taken between the 1st and 99th
 * percentile of that ink on each axis -- so a few ejected particles or a
 * trail cannot drag the frame off the body. A square around the box, with
 * a fixed margin, is copied out at full resolution. Wherever the star is
 * on screen, however zoomed or pulled apart, it lands centred and at the
 * same proportion of the poster's cell. Returns false when the frame holds
 * no star to find (the caller falls back to the camera estimate).
 */
function cropStar(out: HTMLCanvasElement, src: HTMLCanvasElement, scene: Scene): boolean {
  const SW = src.width
  const SH = src.height
  if (SW < 8 || SH < 8) return false
  const s = Math.min(1, 360 / Math.max(SW, SH))
  const tw = Math.max(1, Math.round(SW * s))
  const th = Math.max(1, Math.round(SH * s))
  const probe = document.createElement('canvas')
  probe.width = tw
  probe.height = th
  const pc = probe.getContext('2d', { willReadFrequently: true })
  if (!pc) return false
  pc.drawImage(src, 0, 0, tw, th)
  const px = pc.getImageData(0, 0, tw, th).data
  const ground = scene.theme === 'paper' ? PAPER_RGB : [10, 10, 10]
  const colN = new Float64Array(tw)
  const rowN = new Float64Array(th)
  let total = 0
  for (let y = 0; y < th; y++) {
    for (let x = 0; x < tw; x++) {
      const i = (y * tw + x) * 4
      const dv = Math.max(Math.abs(px[i] - ground[0]), Math.abs(px[i + 1] - ground[1]), Math.abs(px[i + 2] - ground[2]))
      if (dv < 24) continue
      colN[x]++
      rowN[y]++
      total++
    }
  }
  if (total < 40) return false
  const span = (arr: Float64Array) => {
    let acc = 0
    let lo = 0
    let hi = arr.length - 1
    for (let i = 0; i < arr.length; i++) { acc += arr[i]; if (acc >= total * 0.01) { lo = i; break } }
    acc = 0
    for (let i = arr.length - 1; i >= 0; i--) { acc += arr[i]; if (acc >= total * 0.01) { hi = i; break } }
    return [lo, hi + 1] as const
  }
  const [x0, x1] = span(colN)
  const [y0, y1] = span(rowN)
  // back to source pixels; the square holds the body with a 14% margin a side
  const cx = ((x0 + x1) / 2) / s
  const cy = ((y0 + y1) / 2) / s
  let side = Math.max(x1 - x0, y1 - y0) / s * 1.28
  let sx = cx - side / 2
  let sy = cy - side / 2
  // ZOOMED PAST THE SCREEN: the ink runs off an edge, so the "box" is only
  // the viewport and the poster got a small rectangle of it. Take the
  // largest square the frame holds, centred on the star as far as the
  // frame allows: a close-up that fills the cell, edge to edge.
  const edge = 2
  if (x0 <= edge || y0 <= edge || x1 >= tw - edge || y1 >= th - edge) {
    side = Math.min(SW, SH)
    sx = Math.max(0, Math.min(SW - side, cx - side / 2))
    sy = Math.max(0, Math.min(SH - side, cy - side / 2))
  }
  const g = out.getContext('2d')
  if (!g) return false
  g.fillStyle = `rgb(${ground.join(',')})`
  g.fillRect(0, 0, out.width, out.height)
  // copy only the part of the square that exists; the rest stays ground,
  // so a star near the screen's edge is placed true instead of stretched
  const ix0 = Math.max(0, sx)
  const iy0 = Math.max(0, sy)
  const ix1 = Math.min(SW, sx + side)
  const iy1 = Math.min(SH, sy + side)
  if (ix1 <= ix0 || iy1 <= iy0) return false
  const k = out.width / side
  g.drawImage(src, ix0, iy0, ix1 - ix0, iy1 - iy0, (ix0 - sx) * k, (iy0 - sy) * k, (ix1 - ix0) * k, (iy1 - iy0) * k)
  return true
}

function drawPip(
  pip: { win: Window; cv: HTMLCanvasElement },
  src: HTMLCanvasElement,
  scene: Scene,
  w: number,
  h: number,
  fixedW?: number,
  fixedH?: number,
) {
  const cv = pip.cv
  const pd = Math.min(2, pip.win.devicePixelRatio || 1)
  const cw = fixedW ?? Math.max(1, Math.round(cv.clientWidth * pd))
  const ch = fixedH ?? Math.max(1, Math.round(cv.clientHeight * pd))
  if (cv.width !== cw || cv.height !== ch) {
    cv.width = cw
    cv.height = ch
  }
  const ctx = cv.getContext('2d')
  if (!ctx || w <= 0 || h <= 0) return
  const f = scene.focusNow
  const k = scene.zoomLevel / (f.d * (1 + scene.dissect * 0.62))
  const r = 0.88 * (h / 2) * k
  // the crop takes the PiP window's aspect, so a resized window never
  // stretches the star; its short side is the one that holds the body
  const aspect = cw / ch
  const side = Math.min(2 * r * 1.3, h, w)
  const sh = aspect >= 1 ? side : side / aspect
  const sw = aspect >= 1 ? side * aspect : side
  const sx = f.x * w - sw / 2
  const sy = f.y * h - sh / 2
  const dpr = src.width / w
  // the ground the scene's final pass prints on, as the same bytes, so the
  // crop's margins match the crop
  ctx.fillStyle = scene.theme === 'paper' ? `rgb(${PAPER_RGB.join(',')})` : '#0a0a0a'
  ctx.fillRect(0, 0, cw, ch)
  ctx.drawImage(src, sx * dpr, sy * dpr, sw * dpr, sh * dpr, 0, 0, cw, ch)
}
