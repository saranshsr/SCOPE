import { useEffect } from 'react'
import { driver, type Driver, type DriveStep } from 'driver.js'
import 'driver.js/dist/driver.css'

/**
 * First-contact calibration — a guided walk that POINTS.
 *
 * Driven by driver.js, wearing the plate's language (see `.plate-tour` in
 * styles.css: square corners, hairlines, two inks, one red).
 *
 * The reason for the swap is the spotlight. The hand-rolled tour placed a
 * card at a computed offset from its anchor, and for the two steps whose
 * anchor IS the star it had no element to measure -- so it aimed at the
 * middle of the stage and dropped the card there. "GRAB THE STAR" landed
 * on top of the star, at the exact moment the power-on flight had
 * finished delivering you to it. A cut-out cannot make that mistake: the
 * subject is lit, and the popover is placed in what is left.
 *
 * What had to survive the swap, and does:
 *   · the tour drives the instrument (steps that live inside the open
 *     stack open the stack, via onHighlightStarted)
 *   · "not now" is not "never again" -- only reaching the end marks it
 *     learned, so one stray Escape no longer retires the only place the
 *     star gestures are taught
 *   · focus is handed back to whatever had it
 *   · reduced motion gets no animation
 *
 * Shows on power-on every visit until the visitor actually reaches the
 * end; the header's [?] reopens it anytime.
 */

const KEY = 'scope-onboard-v1'

export interface TourOps {
  openStack: () => void
  closeStack: () => void
}

export function shouldOnboard(): boolean {
  try {
    return !localStorage.getItem(KEY)
  } catch {
    return false
  }
}

/**
 * The keyboard map. It used to sit in the rail's foot, two `<kbd>` rows
 * deep in a column that was already 188px taller than any laptop window,
 * so the one thing you go looking for on purpose was the hardest thing to
 * reach. It belongs behind [?] with the rest of the lesson: the footer
 * has always said so — "[?] for the full legend".
 *
 * Both halves show here, labelled. The rail only ever showed the half
 * matching the current stack state, which is right for a status line and
 * wrong for a reference: you consult a legend to find the key you do NOT
 * already know.
 */
const LEGEND: { head: string; keys: [string, string][] }[] = [
  {
    head: 'the star',
    keys: [
      ['pull outward', 'boost that band'],
      ['push through the core', 'kill it'],
      ['drag across', 'filter sweep'],
      ['pull far out, hold', 'echo'],
      ['drag the axis (or d)', 'dissect'],
    ],
  },
  {
    head: 'the stack, open',
    keys: [
      ['drag a ring', 'level'],
      ['tap a ring', 'solo'],
      ['push to the axis', 'mute'],
      ['pull the axis down (or d)', 'close'],
    ],
  },
  {
    head: 'keys',
    keys: [
      ['space', 'pause'],
      ['n', 'skip'],
      ['left / right', 'seek'],
      ['up / down', 'volume'],
      ['[ ]', 'filter'],
      // e and shift+e are two different keys, which is exactly the
      // distinction the old rail legend lost: it was set in caps, so
      // `e/E echo` rendered as `E/E ECHO`
      ['e', 'echo up'],
      ['shift+e', 'echo down'],
      ['\\', 'flat'],
      ['1 / 2 / 3', 'visual preset'],
      ['r / shift+f / shift+m', 'source'],
      ['+ / - / 0', 'zoom'],
      ['shift+h', 'hide the chrome'],
    ],
  },
]

/** The legend is markup, not prose, so it is built rather than templated. */
function legendHtml(): string {
  const esc = (t: string) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string))
  return LEGEND.map(
    (g) =>
      `<div class="tour-leg"><b>${esc(g.head)}</b>${g.keys
        .map(([k, v]) => `<span class="tour-key"><kbd>${esc(k)}</kbd><i>${esc(v)}</i></span>`)
        .join('')}</div>`,
  ).join('')
}

interface Lesson {
  title: string
  body: string
  /** CSS selector, or undefined for a centred step with no subject */
  anchor?: string
  /** stack state this step needs */
  stack: 'open' | 'closed'
  html?: boolean
}

const STEPS: Lesson[] = [
  {
    title: 'grab the star',
    body: 'the star is the mixer. pull outward to boost, push through the core to kill. drag across for the filter. pull far out and hold for echo. let go: everything springs back.',
    anchor: '.cn-stage',
    stack: 'closed',
  },
  {
    title: 'pull it apart',
    body: 'drag the seam upward (or press D) and the star splits into rings, one per layer of the sound. drag a ring for level, tap to solo, push it to the axis to mute.',
    anchor: '.cn-stage',
    stack: 'open',
  },
  {
    title: 'every ring, a visible fader',
    body: 'the layers rows are the same rings: live meter, level slider, solo, mute. hover a row and its ring burns brighter.',
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
    body: 'press split into stems and the playing track separates into vocals, drums, bass and other, in your browser. nothing uploaded. each part gets its own ring.',
    anchor: '.deck-split',
    stack: 'closed',
  },
  {
    title: 'the full legend',
    body: legendHtml(),
    stack: 'closed',
    html: true,
  },
]

export function Onboard({ ops, onDone }: { ops: TourOps | null; onDone: () => void }) {
  useEffect(() => {
    // whatever had focus when the tour opened, so it can be handed back
    const returnTo = document.activeElement as HTMLElement | null
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // reaching the end is the only thing that counts as having learned it
    let learned = false

    const steps: DriveStep[] = STEPS.map((s) => ({
      element: s.anchor,
      // an element-less step is a deliberate centred one, but a MISSING
      // element is a broken step -- give the rail's folds a moment to open
      // before falling back, rather than pointing at nothing
      waitForElement: s.anchor ? 1200 : 0,
      onHighlightStarted: () => {
        if (!ops) return
        if (s.stack === 'open') ops.openStack()
        else ops.closeStack()
      },
      popover: {
        title: s.title,
        description: s.body,
        popoverClass: s.html ? 'plate-tour plate-tour-legend' : 'plate-tour',
      },
    }))

    const d: Driver = driver({
      steps,
      // the plate has no radius, and the cut-out is part of the plate
      stageRadius: 0,
      stagePadding: 8,
      overlayColor: '#0a0a0a',
      overlayOpacity: 0.78,
      animate: !calm,
      duration: calm ? 0 : 240,
      smoothScroll: !calm,
      allowClose: true,
      showProgress: true,
      progressText: '{{current}}/{{total}}',
      nextBtnText: 'next',
      prevBtnText: 'back',
      doneBtnText: 'play',
      showButtons: ['next', 'previous', 'close'],
      popoverClass: 'plate-tour',
      // The star is the one step whose subject you are meant to TOUCH while
      // it is lit. Everything else is being pointed at, not operated.
      disableActiveInteraction: false,
      onDestroyStarted: () => {
        // "not now" rather than "skip": dismissing costs nothing, and the
        // tour returns next visit until it is actually finished
        if (!d.hasNextStep()) learned = true
        d.destroy()
      },
      onDestroyed: () => {
        if (learned) {
          try {
            localStorage.setItem(KEY, '1')
          } catch {
            /* private mode: shows again, which is the safe direction */
          }
        }
        ops?.closeStack()
        onDone()
        // hand focus back where it came from, or the next Tab restarts at
        // the top of the document with no announcement
        returnTo?.focus?.()
      },
    })

    d.drive()
    return () => {
      if (d.isActive()) d.destroy()
    }
    // one tour per mount: App remounts this component to reopen it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
