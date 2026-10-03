import { useEffect } from 'react'
// TYPES ONLY. The library and its sheet are fetched the first time a tour
// actually opens (see `start` below), not with the app: most visits are
// returning ones that never see a card, and they were downloading and
// parsing driver.js on every power-on to show nothing.
import type { Driver, DriveStep, Side } from 'driver.js'

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
 * TWO LENGTHS. Power-on shows the HINT: one card, lit over the star,
 * teaching the one gesture the product is about. Six cards was a lesson
 * for a colleague sitting beside you; a stranger arriving from a shared
 * link skims one and leaves at three. The full walk -- rings, faders,
 * vibe, split, legend -- is what the header's [?] opens, and the footer
 * has always said so.
 *
 * The hint is learned by dismissing it OR by doing it: grabbing the star
 * while it is lit ends the card, because the visitor has just proven they
 * read it. That is safe where the old "only the end counts" rule was not,
 * since nothing is lost -- [?] still holds every card.
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
      ['r / shift+f / shift+t', 'radio / file / tab'],
      ['+ / - / 0', 'zoom'],
      ['shift+h', 'hide the chrome'],
      ['f', 'fullscreen'],
      ['s', 'stage (esc leaves)'],
      ['p', 'paper / ink'],
    ],
  },
]

/**
 * A phone has no keyboard, so a key named on it is a control that does not
 * exist. The KEYS group goes, and so does every "(or d)": the gesture it is
 * the alternative to is already the line.
 */
const noKeys = (t: string) => t.replace(/\s*\(or (?:press )?d\)/gi, '')

/** The legend is markup, not prose, so it is built rather than templated.
 *  The groups sit in their own `.tour-legs` box so the columns balance on
 *  their natural height and the description around them is what scrolls
 *  when a short window cannot hold the map: a multi-column box given a
 *  max-height grows more columns sideways instead of scrolling. */
function legendHtml(touch: boolean): string {
  const esc = (t: string) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string))
  const groups = touch ? LEGEND.filter((g) => g.head !== 'keys') : LEGEND
  return `<div class="tour-legs">${groups
    .map(
      (g) =>
        `<div class="tour-leg"><b>${esc(g.head)}</b>${g.keys
          .map(([k, v]) => `<span class="tour-key"><kbd>${esc(touch ? noKeys(k) : k)}</kbd><i>${esc(v)}</i></span>`)
          .join('')}</div>`,
    )
    .join('')}</div>`
}

interface Lesson {
  title: string
  body: string
  /** CSS selector, or undefined for a centred step with no subject */
  anchor?: string
  /** stack state this step needs */
  stack: 'open' | 'closed'
  html?: boolean
  /** Where the card goes. The rail's subjects are a column down the left,
   *  so their cards sit to the RIGHT of them, over the dimmed stage, never
   *  below where the next row is. The star's subject is the whole stage, so
   *  there is no outside to it: its card goes LEFT, over the dimmed rail,
   *  which is the one place the star never reaches. */
  side?: Side
  /** Which end of the subject the card lines up with on a left/right
   *  placement. 'start' (the default) tops it level with the subject;
   *  'end' sits its foot on the subject's foot. The star's subject fills
   *  the stage, so a card level with its top lands on the rail's first
   *  rows -- which are NOW PLAYING, the one thing a first track has just
   *  put on screen. Footed, it covers the dock's spectrum instead: a
   *  reading the card's own scrim has already dimmed. */
  align?: 'start' | 'end'
}

/** The power-on card. Same subject as the walk's first step, in fewer
 *  words, and it points at where the rest lives. */
const HINT: Lesson = {
  title: 'grab the star',
  body: 'the star is the mixer. pull outward to boost, push through the core to kill, drag across to filter. let go and it springs back. [?] has the rest.',
  anchor: '.cn-stage',
  stack: 'closed',
  side: 'left',
  align: 'end',
}

const STEPS: Lesson[] = [
  {
    title: 'grab the star',
    body: 'the star is the mixer. pull outward to boost, push through the core to kill. drag across for the filter. pull far out and hold for echo. let go: everything springs back.',
    anchor: '.cn-stage',
    stack: 'closed',
    side: 'left',
  },
  {
    title: 'pull it apart',
    body: 'drag the axis upward (or press D) and the star splits into rings, one per layer of the sound. drag a ring for level, tap to solo, push it to the axis to mute.',
    anchor: '.cn-stage',
    stack: 'open',
    side: 'left',
  },
  {
    title: 'every ring, a visible fader',
    body: 'the layers rows are the same rings: live meter, level slider, solo, mute. hover a row and its ring burns brighter.',
    anchor: '.layers',
    side: 'right',
    stack: 'open',
  },
  {
    title: 'set your vibe',
    body: 'type a feeling: late night drive, gym rage, rainy study. the instrument reads it into moods and tempo and plays real music from audius to match. artist names work too.',
    anchor: '.tuner',
    side: 'right',
    stack: 'closed',
  },
  {
    title: 'split any track',
    body: 'press split into stems and the playing track separates into vocals, drums, bass and other, in your browser. nothing uploaded. each part gets its own ring.',
    anchor: '.deck-split',
    side: 'right',
    stack: 'closed',
  },
  {
    title: 'the full legend',
    body: '', // built per device at start: legendHtml(touch)
    stack: 'closed',
    html: true,
  },
]

/**
 * Keep the card on the plate, and off its subject.
 *
 * driver.js places a popover against the WINDOW, and clamps one that will
 * not fit to `innerHeight - 10`. Both are the right instinct against the
 * wrong edges. The star steps highlight the whole stage, 1070x768 of a
 * 1440x900 viewport, so no side has room and every card bottomed out on the
 * running footer -- the cell reading "[?] for the full legend", the line
 * describing the thing covering it. The rail steps fell back to "below",
 * which in a column of rows is the next row: "every ring, a visible fader"
 * sat on 01 SUB, one of the six rows it was describing. On a phone the card
 * ran 5px past each side of the plate, and the legend, taller than the
 * window, put its title and its close button above the top of the screen.
 *
 * So the card is placed a second time, in the sheet's own terms:
 *
 *   · the box is the plate below the header: from `.cn-hdr`'s bottom to the
 *     footer's top (the plate's bottom when the card needs that room), and
 *     inside the plate's side hairlines, never nearer the window than 15px
 *   · the card goes on the step's side of its subject, then the opposite
 *     side, then the other two; the first that fits without touching the lit
 *     subject wins, and when none can (the stage fills the plate) the one
 *     covering the least of it does
 *   · a card taller than the box keeps its title, close and buttons, and its
 *     description scrolls. Never the other way round: a card that loses its
 *     head to save its tail cannot be read or dismissed.
 *
 * Runs after driver's own positioning, whenever driver moves the card.
 */
const GAP = 8
/** matches stagePadding: the cut-out is the subject plus this */
const PAD = 8

function place(prefer: Side | undefined, align: 'start' | 'end' = 'start') {
  const pop = document.querySelector<HTMLElement>('.driver-popover')
  const plate = document.querySelector('.cn-plate')
  if (!pop || !plate) return
  const vw = document.documentElement.clientWidth
  const vh = window.innerHeight
  const pr = plate.getBoundingClientRect()
  const hr = document.querySelector('.cn-hdr')?.getBoundingClientRect()
  const fr = document.querySelector('.cn-ftr')?.getBoundingClientRect()

  // the phone scrolls the document to reach the rail, so the plate can be
  // partly above the window: the box is what is on screen of it
  const L = Math.max(pr.left + 1, 15)
  const R = Math.min(pr.right - 1, vw - 15)
  const ceil = Math.max(hr && hr.height ? hr.bottom : pr.top, 0) + GAP
  const plateFloor = Math.min(pr.bottom, vh) - GAP
  const footFloor = fr && fr.height && fr.top > ceil ? Math.min(fr.top, vh) - GAP : plateFloor

  // measure the card at its natural height: clear any earlier squeeze first
  const desc = pop.querySelector<HTMLElement>('.driver-popover-description')
  if (desc) {
    desc.style.maxHeight = ''
    desc.style.overflowY = ''
  }
  const r0 = pop.getBoundingClientRect()
  const w = Math.min(r0.width, R - L)
  let h = r0.height
  const floor = h <= footFloor - ceil ? footFloor : plateFloor
  if (h > floor - ceil && desc) {
    const cut = h - (floor - ceil)
    desc.style.maxHeight = `${Math.max(48, Math.floor(desc.getBoundingClientRect().height - cut))}px`
    desc.style.overflowY = 'auto'
    h = pop.getBoundingClientRect().height
  }

  const cx = (x: number) => Math.max(L, Math.min(x, R - w))
  const cy = (y: number) => Math.max(ceil, Math.min(y, floor - h))

  const act = document.querySelector('.driver-active-element')?.getBoundingClientRect()
  let x = cx(r0.left)
  let y = cy(r0.top)
  if (act && act.width && act.height) {
    const s = { l: act.left - PAD, t: act.top - PAD, r: act.right + PAD, b: act.bottom + PAD }
    // the cross-axis line for a card beside its subject: level with its
    // top, or footed on its bottom (see Lesson.align)
    const sideY = align === 'end' ? cy(s.b - h) : cy(s.t)
    const at: Record<Side, [number, number]> = {
      right: [cx(s.r + GAP), sideY],
      left: [cx(s.l - GAP - w), sideY],
      bottom: [cx(s.l + (s.r - s.l - w) / 2), cy(s.b + GAP)],
      top: [cx(s.l + (s.r - s.l - w) / 2), cy(s.t - GAP - h)],
    }
    const opposite: Record<Side, Side> = { right: 'left', left: 'right', top: 'bottom', bottom: 'top' }
    const order: Side[] = prefer ? [prefer, opposite[prefer]] : []
    for (const k of ['right', 'left', 'bottom', 'top'] as Side[]) if (!order.includes(k)) order.push(k)
    const cover = ([px, py]: [number, number]) =>
      Math.max(0, Math.min(px + w, s.r) - Math.max(px, s.l)) * Math.max(0, Math.min(py + h, s.b) - Math.max(py, s.t))
    let best = at[order[0]]
    let bestCover = cover(best)
    for (const k of order.slice(1)) {
      if (bestCover === 0) break
      const c = cover(at[k])
      if (c < bestCover) {
        best = at[k]
        bestCover = c
      }
    }
    ;[x, y] = best
  }

  const moved = Math.abs(x - r0.left) > 0.5 || Math.abs(y - r0.top) > 0.5
  if (moved) {
    // driver writes `inset: <top> auto auto <left>`, but on its own clamp
    // path it pins a bottom or a right instead -- and an element with both
    // edges pinned is stretched between them, not moved. Writing only top
    // once turned a 235px popover into an 858px one.
    pop.style.right = 'auto'
    pop.style.bottom = 'auto'
    pop.style.left = `${Math.round(x)}px`
    pop.style.top = `${Math.round(y)}px`
  }
  // driver aimed its arrow from where IT put the card; once the card has
  // been moved that arrow points at nothing, so it goes. The cut-out is
  // what says which thing is meant.
  const arrow = pop.querySelector<HTMLElement>('.driver-popover-arrow')
  if (arrow && moved) arrow.style.visibility = 'hidden'
}

/**
 * Watch, do not fire once. driver repositions the popover after
 * onHighlighted -- on its own animation frames, and again on scroll and
 * on refresh -- so a single placement after two rAFs was simply
 * overwritten. The observer re-places whenever driver moves it, in the
 * observer's own microtask, so the corrected position is what paints and
 * driver's is never seen for a frame. It cannot loop: place() writes
 * style, which fires the observer again, and the second pass finds the
 * card already where it belongs and writes nothing.
 */
function watchPopover(side: () => Side | undefined, align: () => 'start' | 'end' | undefined = () => undefined): () => void {
  const run = () => place(side(), align())

  // WATCH THE POPOVER, NOT THE PAGE.
  //
  // This observed document.body with { subtree: true, attributes: true },
  // which is every style and class mutation anywhere in the app -- and the
  // reticle rewrites its own transform on every pointer move. So moving the
  // mouse during the tour fired this on every frame, and each firing runs
  // place(), which reads several bounding rects. Measured at 1440x900,
  // over a second of continuous pointer movement:
  //
  //     tour open    73 mutations   99 getBoundingClientRect
  //     tour closed   6 mutations    0 getBoundingClientRect
  //
  // A forced synchronous layout every frame, stacked on a 108k-particle
  // GPGPU render and a full-viewport SVG overlay. Headless swiftshader still
  // reported 60fps, which is exactly why CHECKS.md §6 says that number is for
  // measuring and a real browser is for judging -- on Chrome it read as lag.
  //
  // Only one element's position is in question, so only that element is
  // watched. The body observer is childList ONLY, to notice driver creating
  // or replacing the popover between steps.
  let watched: Element | null = null
  let popMo: MutationObserver | null = null
  const attach = () => {
    const pop = document.querySelector('.driver-popover')
    if (!pop || pop === watched) return
    watched = pop
    popMo?.disconnect()
    popMo = new MutationObserver(run)
    popMo.observe(pop, { attributes: true, attributeFilter: ['style', 'class'] })
    run()
  }
  const bodyMo = new MutationObserver(attach)
  bodyMo.observe(document.body, { childList: true })
  attach()

  let queued = false
  const onResize = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      run()
    })
  }
  window.addEventListener('resize', onResize)
  return () => {
    bodyMo.disconnect()
    popMo?.disconnect()
    window.removeEventListener('resize', onResize)
  }
}

/**
 * The hint waits for the announce. Power-on cuts the track title in as
 * the view's one display moment, and the hint used to land 900ms later,
 * on top of it -- its scrim dimmed the headline mid-read, so the first
 * thing a visitor was shown was cut off by the second. Checked every 250ms:
 *
 *   · a title on screen: wait for it to run its cycle to transparent
 *   · no title yet: the first track is often still arriving (measured
 *     ~2.5s after power-on under a software renderer), so give it 2s to
 *     turn up before deciding there is nothing to wait for
 *   · never longer than 8s in all, which is one whole cycle (4.8s) plus
 *     the wait for it; a card that never comes is worse than one that
 *     overlaps a fade
 *
 * Under reduced motion the title is never drawn, so there is nothing to
 * wait for and it resolves at once.
 */
function afterAnnounce(go: () => void, calm: boolean): () => void {
  const t0 = performance.now()
  let id = 0
  const ready = (age: number) => {
    const t = document.querySelector('.announce-title')
    if (!t) return calm || age >= 2000
    return parseFloat(getComputedStyle(t).opacity) < 0.05
  }
  const tick = () => {
    const age = performance.now() - t0
    if (ready(age) || age >= 8000) go()
    else id = window.setTimeout(tick, 250)
  }
  tick()
  return () => window.clearTimeout(id)
}

export function Onboard({
  ops,
  onDone,
  mode = 'full',
}: {
  ops: TourOps | null
  onDone: () => void
  /** 'hint' is the single power-on card; 'full' is the [?] walk */
  mode?: 'hint' | 'full'
}) {
  useEffect(() => {
    const hint = mode === 'hint'
    const touch = window.matchMedia('(pointer: coarse)').matches
    // A STEP WHOSE SUBJECT IS NOT ON THE CONSOLE IS NOT A STEP. The vibe
    // tuner is the radio's, and split is a playing radio/file track's: in
    // stems, tab, jukebox or AJ their rows sit in a closed .railfold, so
    // the anchor EXISTS (it is only folded to 0px) and driver lit a hairline
    // and described a control nobody could see. Absent steps are dropped
    // before driver numbers them, so the counter reads 1/4, not a 6 with
    // two holes in it. Only the CLOSED-stack steps are tested: the layers
    // rows are folded until the step itself opens the stack.
    const present = (s: Lesson) => {
      if (!s.anchor || s.stack === 'open') return true
      const el = document.querySelector(s.anchor)
      if (!el) return false
      const fold = el.closest('.railfold')
      return !fold || fold.classList.contains('open')
    }
    const lessons = (hint ? [HINT] : STEPS).filter(present).map((s) =>
      s.html ? { ...s, body: legendHtml(touch) } : touch ? { ...s, body: noKeys(s.body) } : s,
    )
    // whatever had focus when the tour opened, so it can be handed back
    const returnTo = document.activeElement as HTMLElement | null
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // reaching the end is the only thing that counts as having learned it
    let learned = false

    // WHERE THE RAIL WAS. Four steps live inside the rail, and driver
    // scrolls each one into view -- so closing the walk used to leave the
    // console wherever the last rail step had dragged it (281px down the
    // stack at 1440x900, the whole sheet down on a phone), and the reader
    // came back to a different instrument from the one they left.
    const rail = document.querySelector<HTMLElement>('.rail')
    const stack = document.querySelector<HTMLElement>('.rail-stack')
    const was = { rail: rail?.scrollTop ?? 0, stack: stack?.scrollTop ?? 0, page: window.scrollY }
    const restore = () => {
      // two frames: closeStack re-renders the rail first, and a scrollTop
      // written into the taller open stack would be clamped by the fold
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (rail) rail.scrollTop = was.rail
          if (stack) stack.scrollTop = was.stack
          window.scrollTo(window.scrollX, was.page)
        }),
      )
    }

    let d: Driver | null = null
    let dead = false
    let current: Lesson | undefined
    const undo: (() => void)[] = []

    const start = async () => {
      let driver: typeof import('driver.js').driver
      try {
        ;[{ driver }] = await Promise.all([import('driver.js'), import('driver.js/dist/driver.css')])
      } catch {
        // the chunk did not arrive (offline, a stale deploy): no card is the
        // honest outcome, and App has to hear that the tour is over
        if (!dead) onDone()
        return
      }
      if (dead) return

      const steps: DriveStep[] = lessons.map((s) => ({
        element: s.anchor,
        // an element-less step is a deliberate centred one, but a MISSING
        // element is a broken step -- give the rail's folds a moment to open
        // before falling back, rather than pointing at nothing
        waitForElement: s.anchor ? 1200 : 0,
        onHighlightStarted: () => {
          current = s
          if (!ops) return
          if (s.stack === 'open') ops.openStack()
          else ops.closeStack()
        },
        // THE HOLE IS CUT ONCE, AND THE RAIL MOVES AFTERWARDS.
        //
        // driver re-renders its overlay on WINDOW scroll. Four of these six
        // steps anchor inside .rail-stack, which is an inner scroll container,
        // and driver's own smoothScroll is what moves it -- so the element
        // arrives in view and the hole stays where the element used to be.
        // Measured at 1280x800 on "every ring, a visible fader": the anchor
        // sat at 25,184 and the cut-out at 17,221.5. x, width and height were
        // all exactly right (17 = 25 less the 8px stagePadding); only y was
        // wrong, by 45.5px, which is the shape of a stale scroll and nothing
        // else. On screen that lights the rows above the ones being described.
        //
        // refresh() re-measures and repaints. It runs after the scroll has
        // settled rather than immediately, because immediately is the moment
        // that produced the wrong number in the first place.
        onHighlighted: () => {
          setTimeout(() => d?.refresh(), calm ? 0 : 320)
          // FOCUS THE WAY FORWARD, NOT THE WAY OUT. driver.js focuses its close
          // button when a step opens, and this sheet gives :focus-visible an
          // accent outline -- so the first thing a visitor met was a yellow ring
          // around the X, pointing at "leave" while the card explained the
          // instrument. Moving it to NEXT keeps the keyboard path intact (tab
          // and enter still work, and the ring is still there for whoever is
          // driving by keyboard) and points it at the action the card is asking
          // for. The close button is still one shift-tab away.
          requestAnimationFrame(() => {
            const pop = document.querySelector('.driver-popover.plate-tour')
            const next = pop?.querySelector<HTMLElement>('.driver-popover-next-btn')
            const active = document.activeElement
            if (next && (!active || active === document.body || (active as HTMLElement).classList?.contains('driver-popover-close-btn'))) {
              next.focus()
            }
          })
        },

        popover: {
          title: s.title,
          description: s.body,
          popoverClass: s.html ? 'plate-tour plate-tour-legend' : hint ? 'plate-tour plate-tour-hint' : 'plate-tour',
        },
      }))

      // The scrim is the ground laid back over the plate, read from the token
      // so it is exactly the ground's bytes in either theme. On paper that makes
      // it a WASH of the stock, not a dark veil: a black overlay at 0.78 turned
      // the cream plate around the cut-out to #3b3b3a mud on the first screen a
      // visitor meets. A sheet of the same paper over it fades the rest of the
      // instrument back and lets the lit subject stand.
      const paper = document.documentElement.dataset.theme === 'paper'
      const ground = getComputedStyle(document.documentElement).getPropertyValue('--ground').trim()
      const tour: Driver = driver({
        steps,
        // the plate has no radius, and the cut-out is part of the plate
        stageRadius: 0,
        stagePadding: PAD,
        overlayColor: ground || (paper ? '#f0ebe0' : '#0a0a0a'),
        overlayOpacity: paper ? 0.8 : 0.78,
        animate: !calm,
        duration: calm ? 0 : 240,
        smoothScroll: !calm,
        allowClose: true,
        showProgress: !hint,
        progressText: '{{current}}/{{total}}',
        nextBtnText: 'next',
        prevBtnText: 'back',
        // The last button closes the card and does nothing else, so it says
        // so. It read PLAY, which promised a transport action it never took:
        // the music was already playing under the card, and pressing it only
        // ever dismissed the walk.
        doneBtnText: hint ? 'got it' : 'done',
        showButtons: hint ? ['next', 'close'] : ['next', 'previous', 'close'],
        popoverClass: 'plate-tour',
        // The star is the one step whose subject you are meant to TOUCH while
        // it is lit. Everything else is being pointed at, not operated.
        disableActiveInteraction: false,
        onDestroyStarted: () => {
          // "not now" rather than "skip": dismissing costs nothing, and the
          // tour returns next visit until it is actually finished
          if (hint || !tour.hasNextStep()) learned = true
          tour.destroy()
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
          restore()
          // hand focus back where it came from, or the next Tab restarts at
          // the top of the document with no announcement
          returnTo?.focus?.({ preventScroll: true })
        },
      })
      d = tour

      tour.drive()
      undo.push(watchPopover(() => current?.side, () => current?.align))

      // doing it counts as reading it: a hand on the star ends the hint
      const onGrab = (e: PointerEvent) => {
        if (!hint || !tour.isActive()) return
        const t = e.target as Element | null
        if (t?.closest?.('.driver-popover, .cn-hdr, .cn-mini, .rail, .cn-ftr')) return
        learned = true
        tour.destroy()
      }
      window.addEventListener('pointerdown', onGrab, { capture: true })
      undo.push(() => window.removeEventListener('pointerdown', onGrab, { capture: true }))

      // Scroll does not bubble, so a listener on window never hears .rail-stack.
      // Capture phase hears every scroll in the document, including the rail's
      // -- whether driver moved it or the reader did. rAF-coalesced, because
      // refresh() measures and this fires at scroll rate.
      let queuedRefresh = false
      const onAnyScroll = () => {
        if (queuedRefresh) return
        queuedRefresh = true
        requestAnimationFrame(() => {
          queuedRefresh = false
          if (tour.isActive()) tour.refresh()
        })
      }
      document.addEventListener('scroll', onAnyScroll, { capture: true, passive: true })
      undo.push(() => document.removeEventListener('scroll', onAnyScroll, { capture: true }))
    }

    // The [?] walk opens at once: someone asked for it. The power-on hint
    // waits for the track title to finish its cut (afterAnnounce).
    if (hint) undo.push(afterAnnounce(() => void start(), calm))
    else void start()

    return () => {
      dead = true
      undo.forEach((f) => f())
      if (d?.isActive()) d.destroy()
    }
    // one tour per mount: App remounts this component to reopen it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
