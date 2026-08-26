import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * First-contact calibration — a guided walk that POINTS.
 *
 * Each card anchors to the control it explains: a pulsing target sits on
 * the real element, a hairline runs from the card to it, and when a
 * feature lives inside the open stack the tour opens the stack itself.
 * Shows once on first power-on; the rail's [?] reopens it anytime.
 */

const KEY = 'scope-onboard-v1'

export interface TourOps {
  openStack: () => void
  closeStack: () => void
}

interface Step {
  title: string
  body: string
  /** CSS selector for the anchor, or 'stage' for the star itself. */
  anchor: string
  /** stack state this step needs */
  stack: 'open' | 'closed'
}

const STEPS: Step[] = [
  {
    title: 'grab the star',
    body: 'the star is the mixer. pull outward to boost, push through the core to kill. drag across for the filter. pull far out and hold for echo. let go: everything springs back.',
    anchor: 'stage',
    stack: 'closed',
  },
  {
    title: 'pull it apart',
    body: 'drag the seam upward (or press D) and the star splits into rings, one per layer of the sound. drag a ring for level, tap to solo, push it to the axis to mute.',
    anchor: 'stage',
    stack: 'open',
  },
  {
    title: 'every ring, a visible fader',
    body: 'the LAYERS rows are the same rings: live meter, level slider, solo, mute. hover a row and its ring burns brighter.',
    anchor: '.layers',
    stack: 'open',
  },
  {
    title: 'set your vibe',
    body: 'type a feeling: late night drive, gym rage, rainy study. the instrument reads it into moods and tempo and plays real music from audius to match. artist names work too.',
    anchor: '.tuner',
    stack: 'closed',
  },
  {
    title: 'split any track',
    body: 'press SPLIT INTO STEMS and the playing track separates into vocals, drums, bass and other, in your browser. nothing uploaded. each part gets its own ring.',
    anchor: '.deck-split',
    stack: 'closed',
  },
]

export function shouldOnboard(): boolean {
  try {
    return !localStorage.getItem(KEY)
  } catch {
    return false
  }
}

export function Onboard({ ops, onDone }: { ops: TourOps | null; onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [pos, setPos] = useState<{ cx: number; cy: number; ok: boolean }>({ cx: 0, cy: 0, ok: false })

  const s = STEPS[step]
  const last = step === STEPS.length - 1

  const finish = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* private mode: shows again, fine */
    }
    ops?.closeStack()
    onDone()
  }

  // drive the instrument to wherever this step's feature lives
  useEffect(() => {
    if (!ops) return
    if (s.stack === 'open') ops.openStack()
    else ops.closeStack()
  }, [step, ops, s.stack])

  // locate the anchor (rows/sections mount async — retry briefly)
  useLayoutEffect(() => {
    let raf = 0
    let tries = 0
    const locate = () => {
      if (s.anchor === 'stage') {
        const rail = document.querySelector('.rail')
        const railW = rail && innerWidth > 720 ? rail.getBoundingClientRect().width : 0
        setPos({ cx: railW + (innerWidth - railW) / 2, cy: innerHeight * (innerWidth > 720 ? 0.5 : 0.3), ok: true })
        return
      }
      const el = document.querySelector(s.anchor)
      if (el) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.height > 0) {
          el.scrollIntoView({ block: 'nearest' })
          const r2 = el.getBoundingClientRect()
          setPos({ cx: r2.right - 10, cy: r2.top + Math.min(r2.height / 2, 60), ok: true })
          return
        }
      }
      if (tries++ < 80) raf = requestAnimationFrame(locate)
      else setPos((p) => ({ ...p, ok: false }))
    }
    locate()
    window.addEventListener('resize', locate)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', locate)
    }
  }, [step, s.anchor])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // the card sits clear of its anchor: beside it when there's room,
  // below the star for stage steps; always clamped to the viewport
  const cardW = Math.min(400, innerWidth - 28)
  let left = pos.cx + 46
  let top = pos.cy - 40
  if (left + cardW > innerWidth - 14) left = Math.max(14, pos.cx - cardW - 46)
  if (s.anchor === 'stage') {
    left = Math.max(14, Math.min(innerWidth - cardW - 14, pos.cx - cardW / 2))
    top = pos.cy + 90
  }
  top = Math.max(14, Math.min(innerHeight - 230, top))

  return (
    <div className="onboard" role="dialog" aria-label="how to play the instrument">
      {pos.ok && (
        <svg className="onboard-wire" aria-hidden="true">
          <line x1={pos.cx} y1={pos.cy} x2={left + (pos.cx > left + cardW / 2 ? cardW : 0)} y2={top + 34} />
          <circle className="onboard-ping" cx={pos.cx} cy={pos.cy} r="7" />
          <circle cx={pos.cx} cy={pos.cy} r="3" />
        </svg>
      )}
      <div className="onboard-card" style={{ left, top, width: cardW }}>
        <span className="onboard-n">
          {String(step + 1).padStart(2, '0')}<i>/{String(STEPS.length).padStart(2, '0')}</i>
        </span>
        <h2>{s.title}</h2>
        <p>{s.body}</p>
        <div className="onboard-row">
          <button className="onboard-skip" onClick={finish}>skip</button>
          <button className="onboard-next" onClick={() => (last ? finish() : setStep(step + 1))}>
            {last ? 'play' : 'next'}
          </button>
        </div>
      </div>
    </div>
  )
}
