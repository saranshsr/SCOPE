import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * First-contact calibration — a guided walk that POINTS.
 *
 * Each card anchors to the control it explains: a pulsing target sits on
 * the real element, a hairline runs from the card to it, and when a
 * feature lives inside the open stack the tour opens the stack itself.
 * Shows on power-on every visit until the visitor actually reaches the
 * end; the rail's [?] reopens it anytime.
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
  const cardRef = useRef<HTMLDivElement>(null)
  /** whatever had focus when the tour opened, so it can be handed back */
  const returnTo = useRef<HTMLElement | null>(null)

  const s = STEPS[step]
  const last = step === STEPS.length - 1

  /**
   * Close without marking it learned. Skip and Escape are "not now", not
   * "never again" — this tour is the only place the star gestures, the
   * dissection and the split are taught, and one stray Escape used to
   * retire it permanently.
   */
  const dismiss = () => {
    ops?.closeStack()
    onDone()
    // hand focus back where it came from, or the next Tab restarts at the
    // top of the document with no announcement
    returnTo.current?.focus?.()
  }

  /** Reaching the end is the only thing that counts as having learned it. */
  const complete = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* private mode: shows again, which is the safe direction */
    }
    dismiss()
  }

  // The tour is the only place the star gestures are taught, and it mounts
  // last in the DOM — without this, reaching NEXT took ~42 tabs through the
  // whole rail, and every control behind the card stayed focusable.
  useEffect(() => {
    returnTo.current = document.activeElement as HTMLElement | null
    cardRef.current?.focus()
    const onTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const card = cardRef.current
      if (!card) return
      const f = card.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')
      if (!f.length) return
      const first = f[0]
      const lastEl = f[f.length - 1]
      // wrap at both ends — the card is modal, so Tab must never leave it
      if (!card.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onTrap, true)
    return () => window.removeEventListener('keydown', onTrap, true)
  }, [])

  // each step swaps the card's content in place; move focus back to the
  // card so the new text is what a screen reader lands on
  useEffect(() => {
    cardRef.current?.focus()
  }, [step])

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
      if (e.code === 'Escape') dismiss()
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
    <div className="onboard" role="dialog" aria-modal="true" aria-label="how to play the instrument">
      {pos.ok && (
        <svg className="onboard-wire" aria-hidden="true">
          <line x1={pos.cx} y1={pos.cy} x2={left + (pos.cx > left + cardW / 2 ? cardW : 0)} y2={top + 34} />
          <circle className="onboard-ping" cx={pos.cx} cy={pos.cy} r="7" />
          <circle cx={pos.cx} cy={pos.cy} r="3" />
        </svg>
      )}
      <div
        ref={cardRef}
        className="onboard-card"
        style={{ left, top, width: cardW }}
        tabIndex={-1}
        aria-live="polite"
      >
        <span className="onboard-n">
          {String(step + 1).padStart(2, '0')}<i>/{String(STEPS.length).padStart(2, '0')}</i>
        </span>
        <h2>{s.title}</h2>
        <p>{s.body}</p>
        <div className="onboard-row">
          {/* "not now" rather than "skip": dismissing costs nothing, the
              tour returns next visit until it is actually finished */}
          <button className="onboard-skip" onClick={dismiss}>not now</button>
          <button className="onboard-next" onClick={() => (last ? complete() : setStep(step + 1))}>
            {last ? 'play' : 'next'}
          </button>
        </div>
      </div>
    </div>
  )
}
