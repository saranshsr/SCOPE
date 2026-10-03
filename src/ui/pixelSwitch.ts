/**
 * THE GROUND CHANGE, in the instrument's own cells. Switching ink <-> paper
 * is not a cut: the new ground is set down over the old one cell at a time,
 * then lifted off again with the new instrument underneath.
 *
 * The cells are the UI's, measured at the moment of the click, not a
 * generic mosaic. The data column (the console's rail, or the standby
 * plate's column) flips row by row, each block exactly one of its rows,
 * full width. Everything else is a grid of squares the size of a row,
 * with its lines on the column's own edges, so the field's blocks continue
 * the plate's rules instead of crossing them.
 *
 *   cover   blocks of the NEW ground fade in, rippling out from the control
 *           that asked (the toggle, or the screen centre for the key), each
 *           a little early or late so the front is ragged, not a circle.
 *           The front's leading blocks pass through the accent once.
 *   swap    fully covered, the caller swaps the theme underneath (every
 *           token, the scene's print pass, the PiP) in a frame nobody sees.
 *   reveal  the same blocks fade out in the same order, uncovering the new
 *           ground with the star still running.
 *
 * Unhurried on purpose: a change of ground is the biggest change the
 * instrument makes, and the eye should be able to follow it. One fixed
 * canvas, no DOM per block, no snapshot: the star is never frozen, only
 * covered for one held beat. Deterministic per block (the jitter is a
 * hash), so the same click ripples the same way. Reduced motion skips
 * straight to the swap.
 */

const COVER = 1000 // ms
const HOLD = 90
const REVEAL = 1100
const JITTER = 0.26 // share of the sweep a block may land early or late
const FADE = 0.16 // share of the sweep each block takes to fade fully in or out
const ACCENT_BAND = 0.07 // the accent rides this far ahead of the front

const GROUND = { ink: [10, 10, 10], paper: [240, 235, 224] } as const
const ACCENT = [254, 238, 0] as const

type Block = { x: number; y: number; w: number; h: number; at: number; front: boolean; row: boolean }

let running = false

const hash = (n: number, s = 0) => {
  const v = Math.sin(n * 127.1 + s * 311.7 + 1.3) * 43758.5453
  return v - Math.floor(v)
}

/** The visible data column: the console's rail, or the standby plate's. */
function column(): DOMRect | null {
  for (const sel of ['main.rail', '.pl-r']) {
    const el = document.querySelector(sel)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.width > 120 && r.height > 120 && r.right > 0 && r.left < innerWidth) return r
  }
  return null
}

/** The column's row lines, as PAINTED: hit-test down the column's left
 *  edge and cut wherever the full-width row under the pointer changes.
 *  Measuring rects instead counted rows scrolled out of the stack and rows
 *  hidden under the pinned dock, and cut visible rows in half. */
function rowLines(col: DOMRect): number[] {
  const x = col.left + Math.min(12, col.width / 4)
  const top = Math.max(0, Math.ceil(col.top))
  const bot = Math.min(innerHeight, Math.floor(col.bottom))
  const rowOf = (el: Element | null) => {
    while (el && el.getBoundingClientRect().width < col.width * 0.9) el = el.parentElement
    return el
  }
  const out = [top]
  let prev: Element | null | undefined
  for (let y = top; y < bot; y++) {
    const row = rowOf(document.elementFromPoint(x, y))
    if (prev !== undefined && row !== prev && y - out[out.length - 1] >= 12) out.push(y)
    prev = row
  }
  if (bot - out[out.length - 1] < 12) out.pop()
  out.push(bot)
  return out
}

/** Grid lines through [0, end] that pass through `anchor`, every `step`. */
function lines(anchor: number, end: number, step: number): number[] {
  const out: number[] = []
  let v = anchor - Math.ceil(anchor / step) * step
  for (; v < end; v += step) out.push(Math.max(0, v))
  out.push(end)
  return [...new Set(out.map(Math.round))].sort((a, b) => a - b)
}

/** The parts of `b` outside rect `c` (up to four slabs). */
function outside(b: Omit<Block, 'at' | 'front'>, c: DOMRect): Omit<Block, 'at' | 'front'>[] {
  const L = Math.max(b.x, Math.round(c.left)), R = Math.min(b.x + b.w, Math.round(c.right))
  const T = Math.max(b.y, Math.round(c.top)), B = Math.min(b.y + b.h, Math.round(c.bottom))
  if (L >= R || T >= B) return [b]
  const out = [
    { x: b.x, y: b.y, w: b.w, h: T - b.y, row: false },
    { x: b.x, y: B, w: b.w, h: b.y + b.h - B, row: false },
    { x: b.x, y: T, w: L - b.x, h: B - T, row: false },
    { x: R, y: T, w: b.x + b.w - R, h: B - T, row: false },
  ]
  return out.filter((o) => o.w >= 1 && o.h >= 1)
}

function measure(): Omit<Block, 'at' | 'front'>[] {
  const W = innerWidth
  const H = innerHeight
  const col = column()
  const blocks: Omit<Block, 'at' | 'front'>[] = []
  let step = 40
  let ax = 0
  let ay = 0
  let skip: DOMRect | null = null
  if (col) {
    const ys = rowLines(col)
    const hs = ys.slice(1).map((y, i) => y - ys[i]).sort((a, b) => a - b)
    // the field's square is the column's typical row, so the two read as one grid
    step = Math.min(48, Math.max(34, hs[Math.floor(hs.length / 2)] || 40))
    const x0 = Math.max(0, Math.round(col.left))
    const x1 = Math.min(W, Math.round(col.right))
    for (let i = 0; i + 1 < ys.length; i++) blocks.push({ x: x0, y: ys[i], w: x1 - x0, h: ys[i + 1] - ys[i], row: true })
    ax = col.right
    ay = col.top
    skip = col
  }
  const xs = lines(ax, W, step)
  const ys = lines(ay, H, step)
  for (let j = 0; j + 1 < ys.length; j++) {
    for (let i = 0; i + 1 < xs.length; i++) {
      const b = { x: xs[i], y: ys[j], w: xs[i + 1] - xs[i], h: ys[j + 1] - ys[j], row: false }
      if (b.w < 1 || b.h < 1) continue
      // the column is already its own blocks: a square that overlaps it
      // keeps only the parts outside it, so nothing is covered twice and no
      // sliver beside the column waits for the final fill
      blocks.push(...(skip ? outside(b, skip) : [b]))
    }
  }
  return blocks
}

export function pixelSwitch(
  to: 'ink' | 'paper',
  swap: () => void,
  origin?: { x: number; y: number },
) {
  if (running) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    swap()
    return
  }
  running = true
  // measured before the overlay exists, so hit-tests read the page
  const measured = measure()
  const W = innerWidth
  const H = innerHeight
  const dpr = Math.min(2, devicePixelRatio || 1)
  const cv = document.createElement('canvas')
  cv.width = Math.round(W * dpr)
  cv.height = Math.round(H * dpr)
  cv.setAttribute('aria-hidden', 'true')
  Object.assign(cv.style, {
    position: 'fixed', inset: '0', width: '100vw', height: '100vh',
    zIndex: '2147483000', pointerEvents: 'none',
  })
  document.body.appendChild(cv)
  const g = cv.getContext('2d')!
  g.scale(dpr, dpr)

  const ox = origin?.x ?? W / 2
  const oy = origin?.y ?? H / 2
  const far = Math.max(Math.hypot(ox, oy), Math.hypot(W - ox, oy), Math.hypot(ox, H - oy), Math.hypot(W - ox, H - oy))
  // each block's moment in 0..1: its centre's distance from the origin,
  // normalised to the farthest corner, pushed early or late by its hash
  const blocks: Block[] = measured.map((b, k) => {
    const d = Math.hypot(b.x + b.w / 2 - ox, b.y + b.h / 2 - oy) / far
    return { ...b, at: Math.min(1, Math.max(0, d * (1 - JITTER) + hash(k) * JITTER)) * (1 - FADE), front: !b.row && hash(k, 7) > 0.62 }
  })
  const [gr, gg, gb] = GROUND[to]
  const [ar, ag, ab] = ACCENT
  // An ease-OUT on both passes: the blocks at the toggle answer on the very
  // first frame and the front slows only as it reaches the far corners. The
  // sine in-out this replaced idled ~270 ms before anything moved and held
  // the screen blank for ~0.7 s around the swap -- on a phone the whole
  // instrument vanished, which read as a crash. Unhurried is the far
  // corners settling, not the screen sitting empty.
  const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 2.2)
  const smooth = (t: number) => t * t * (3 - 2 * t)

  let t0 = performance.now()
  let phase: 'cover' | 'reveal' = 'cover'
  let swapped = false
  const finish = () => {
    if (!swapped) { swapped = true; swap() }
    cv.remove()
    running = false
  }

  const frame = (now: number) => {
    if (!running) return
    const el = now - t0
    g.clearRect(0, 0, W, H)
    if (phase === 'cover') {
      const p = ease(el / COVER)
      for (const b of blocks) {
        const a = smooth(Math.min(1, Math.max(0, (p - b.at) / FADE)))
        if (b.front && p < b.at && p > b.at - ACCENT_BAND) {
          // the accent passes through the block just before it lands
          const k = 1 - (b.at - p) / ACCENT_BAND
          g.fillStyle = `rgba(${ar},${ag},${ab},${(Math.sin(k * Math.PI) * 0.6).toFixed(3)})`
          g.fillRect(b.x, b.y, b.w, b.h)
        }
        if (a <= 0) continue
        g.fillStyle = `rgba(${gr},${gg},${gb},${a.toFixed(3)})`
        g.fillRect(b.x, b.y, b.w, b.h)
      }
      if (el >= COVER) {
        g.fillStyle = `rgb(${gr},${gg},${gb})`
        g.fillRect(0, 0, W, H)
        if (!swapped) { swapped = true; swap() }
        if (el >= COVER + HOLD) { phase = 'reveal'; t0 = now }
      }
    } else {
      const p = ease(el / REVEAL)
      for (const b of blocks) {
        const a = 1 - smooth(Math.min(1, Math.max(0, (p - b.at) / FADE)))
        if (a <= 0) continue
        g.fillStyle = `rgba(${gr},${gg},${gb},${a.toFixed(3)})`
        g.fillRect(b.x, b.y, b.w, b.h)
      }
      if (el >= REVEAL) { finish(); return }
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
  // a hidden tab never runs rAF: never strand the ground half-changed
  setTimeout(() => { if (running) finish() }, COVER + HOLD + REVEAL + 2000)
}
