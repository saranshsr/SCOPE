import { useEffect, useRef, useState } from 'react'
import { AudioEngine, type SourceKind, type TrackInfo } from './audio/graph'
import { FingerprintTracker } from './audio/fingerprint'
import { BeatClock } from './audio/beat'
import { Scene } from './scope/scene'
import { playlist } from './data/tracks'
import { loadPeaks, peaksFromFile, energyAhead, type TrackPeaks } from './scope/peaks'
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

const SOURCE_ID: Record<SourceKind, string> = { radio: '[01]', file: '[02]', mic: '[03]' }

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
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new AudioEngine()
    engineRef.current = engine
    engine.setPlaylist(playlist)
    engine.onTrackChange = (tr) => {
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
    ;(window as unknown as { __eng: AudioEngine }).__eng = engine

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
    const cur = { x: -100, y: -100, tx: -100, ty: -100, down: 0, overUi: false, dragging: false }
    const onCurMove = (e: PointerEvent) => {
      cur.tx = e.clientX
      cur.ty = e.clientY
      cur.overUi = !!(e.target as Element | null)?.closest?.('.rail, .spec, .ctl-row, button, a, input')
      if (!reducedMotion) {
        // Hover aims the instrument; a held pointer grabs and spins it —
        // the reference cluster's interaction model, verbatim.
        scene.setPointer(e.clientX / Math.max(1, w) - 0.5, e.clientY / Math.max(1, h) - 0.5)
        if (cur.dragging) scene.dragBy(e.movementX * 0.006, e.movementY * 0.004)
      }
    }
    const onCurDown = (e: PointerEvent) => {
      cur.down = 1
      const overUi = !!(e.target as Element | null)?.closest?.('.rail, .spec, .ctl-row, button, a, input')
      if (!overUi && startedRef.current) {
        cur.dragging = true
        appRef.current?.classList.add('grabbing')
      }
    }
    const onCurUp = () => {
      cur.dragging = false
      appRef.current?.classList.remove('grabbing')
    }
    if (finePointer) {
      window.addEventListener('pointermove', onCurMove)
      window.addEventListener('pointerdown', onCurDown)
      window.addEventListener('pointerup', onCurUp)
      window.addEventListener('pointercancel', onCurUp)
    }

    // The grid sweeps ride the music: Web Animations playbackRate is the
    // one dial that changes a running CSS animation's speed without a jump.
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
      if (beat.trigger) {
        beatPulse = Math.max(beatPulse, 0.4 + beat.strength * 0.6)
        // The star erupts on real hits — the lifecycle layer.
        if (startedRef.current && beat.strength > 0.25) scene.burst(beat.strength)
      }
      beatPulse *= Math.exp(-dt * 5)

      // Anticipation: mean energy of the next 8 seconds, from the peaks.
      const elNow = engine.el
      const progress = elNow.duration > 0 ? elNow.currentTime / elNow.duration : 0
      const ahead = peaksRef.current ? energyAhead(peaksRef.current, progress, 8) : 0

      // Idle (pre-start) the instrument still breathes, barely — a machine
      // on standby, not a screenshot.
      scene.render(dt, f.low, f.mid, f.high, beatPulse, ahead)

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
        drawSpectrum(specRef.current, f.bands)
        const el = engine.el
        const pct = el.duration > 0 ? (el.currentTime / el.duration) * 100 : 0
        const pctText = `${pct.toFixed(1)}%`
        if (pctTopRef.current) pctTopRef.current.textContent = pctText
        if (pctLeftRef.current) pctLeftRef.current.textContent = pctText
        if (labelRef.current)
          labelRef.current.textContent = `tracking ${(94 + fp.tempoConfidence * 5.9).toFixed(2)}%`
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
      const file = e.dataTransfer?.files?.[0]
      if (!file || !/^(audio|video)\//.test(file.type)) return
      startedRef.current = true
      setStarted(true)
      focus()
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

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
      if (finePointer) {
        window.removeEventListener('pointermove', onCurMove)
        window.removeEventListener('pointerdown', onCurDown)
        window.removeEventListener('pointerup', onCurUp)
        window.removeEventListener('pointercancel', onCurUp)
      }
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
    <div ref={appRef} className={`app${started ? ' live' : ''}`} onClick={started ? undefined : power}>
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
        <div><dt>unit</dt><dd>D-01</dd></div>
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

          <nav className="rail-src rail-sec" style={{ '--i': 2 } as React.CSSProperties}>
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

          <div className="rail-foot rail-sec" style={{ '--i': 3 } as React.CSSProperties}>
            <samp className="deck-name"><Decode text={name} duration={700} /></samp>
            <canvas
              ref={waveRef}
              className="deck-wave"
              width={232}
              height={52}
              onPointerDown={(e) => {
                // The full-track strip is a scrubber, when there IS a track.
                const el = engineRef.current?.el
                if (!el || !isFinite(el.duration) || el.duration <= 0) return
                const r = e.currentTarget.getBoundingClientRect()
                el.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * el.duration
              }}
            />
            <div className="deck-counts">
              <data ref={cElapsedRef}>· 0</data>
              <data ref={cTotalRef}>· 0</data>
            </div>
          </div>
        </aside>
      )}

      {/* THE ANNOUNCEMENT — every track change earns one display-scale
          moment before the title settles into the rail. */}
      {started && announce && (
        <div key={announce.key} className="announce" aria-hidden="true">
          <span className="announce-title">
            <Decode text={announce.text.toUpperCase()} duration={900} />
          </span>
        </div>
      )}

      {/* bottom-right: spectrum */}
      {started && (
      <div className="spec">
        <div className="spec-label"><Decode text="spectrum" duration={600} /></div>
        <canvas ref={specRef} width={200} height={72} />
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
    g.fillStyle = '#ff2a2a'
    g.fillRect(px, 0, 1, H)
    return
  }

  g.strokeStyle = 'rgba(234,234,234,0.85)'
  g.lineWidth = 1
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
function drawSpectrum(cv: HTMLCanvasElement | null, bands: Float32Array) {
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
    g.fillRect(i * bw + 1, cv.height - bh, bw - 2, bh)
    // hanging peak cap — dimmer, falls slowly
    const py = cv.height - peaks[i] * (cv.height - 4)
    g.fillStyle = 'rgba(234,234,234,0.35)'
    g.fillRect(i * bw + 1, py - 2, bw - 2, 2)
  }
}
