/**
 * fig.02 · session — the shareable still.
 *
 * Everything scope draws is instrument furniture (DESIGN.md); this is the
 * one artifact meant to leave the instrument. It has to read as the same
 * plate at 1/10th the size, in a feed, with no chrome around it explaining
 * what it is. So it stays inside the constitution rather than inventing a
 * "poster mode": one bordered sheet, cells sharing edges, one display
 * moment, two inks plus the one accent, real readings only (law 3) — a
 * row whose value was never measured is omitted, never left blank or
 * guessed at.
 *
 * The canvas is offscreen and answers only to its own coordinate system —
 * nothing here reads layout from the live DOM. `theme` and `accent` arrive
 * as data because a static export cannot ask `getComputedStyle` on
 * whatever ground it happens to render against.
 */

export interface PosterInput {
  /** a crop of the star, already captured by the caller */
  star: HTMLCanvasElement | ImageBitmap
  /** track title, null if unknown */
  title: string | null
  artist: string | null
  /** e.g. '[01] radio' */
  source: string
  /** measured tempo, null if not locked */
  bpm: number | null
  /** measured bpm samples over the session (may be empty) */
  tempoCurve: number[]
  /** 0..1 measured level samples (may be empty) */
  levelCurve: number[]
  /** 0..1 */
  peakLevel: number | null
  when: Date
  /** paper = ink on off-white #ecebe6 with #0c0c0c ink; ink = the dark sheet */
  theme: 'ink' | 'paper'
  /** css colour, the one accent */
  accent: string
}

const W = 1080
const H = 1350

const FONT_DISPLAY = `'Archivo Black', ui-sans-serif, system-ui, sans-serif`
const FONT_MONO = `'Departure Mono', ui-monospace, Menlo, monospace`

// Tracking tiers, doubled from DESIGN.md's 11px-grid tokens (1/2/3/4px) to
// this sheet's larger mono size — the same proportion, not the same pixels.
const TRACK_BODY = 2
const TRACK_LABEL = 3
const TRACK_MICRO = 4

const EDGE = 30 // outer margin — the plate's own --edge, at poster scale
const PAD = 26 // cell inner padding (product's 8px 12px, scaled up)

const HDR_H = 60
const FTR_H = 60
const ROW_H = 48
const STRIP_H = 118
const TITLE_H = 224

type Ctx2D = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D

interface Palette {
  ground: string
  ink: string
  inkRGB: string
  inkDim: string
  line: string
  captionBg: string
  accent: string
}

function palette(theme: PosterInput['theme'], accent: string): Palette {
  if (theme === 'paper') {
    return {
      ground: '#ecebe6',
      ink: '#0c0c0c',
      inkRGB: '12, 12, 12',
      inkDim: 'rgba(12, 12, 12, 0.58)',
      line: 'rgba(12, 12, 12, 0.32)',
      captionBg: 'rgba(236, 235, 230, 0.82)',
      accent,
    }
  }
  return {
    ground: '#0a0a0a',
    ink: '#c0c6d6',
    inkRGB: '192, 198, 214',
    inkDim: '#8a90a3',
    line: 'rgba(141, 144, 168, 0.68)',
    captionBg: 'rgba(8, 8, 13, 0.72)',
    accent,
  }
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/** Best-effort tracked font: canvases that don't support `letterSpacing`
 *  (older engines) just draw un-tracked, which is a cosmetic step down, not
 *  a failure. */
function setFont(ctx: Ctx2D, family: string, size: number, tracking = 0, weight = '400') {
  ctx.font = `${weight} ${size}px ${family}`
  const anyCtx = ctx as Ctx2D & { letterSpacing?: string }
  try {
    anyCtx.letterSpacing = `${tracking}px`
  } catch {
    /* unsupported — un-tracked is the acceptable fallback */
  }
}

/** Pixel-fit truncation for a single line (the plate-row `.v` ellipsis,
 *  which CSS gives for free and canvas does not). */
function fitEllipsis(ctx: Ctx2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text
  let lo = 0
  let hi = text.length
  // binary search the longest prefix that fits with an ellipsis appended
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    const candidate = text.slice(0, mid).trimEnd() + '…'
    if (ctx.measureText(candidate).width <= maxWidth) lo = mid
    else hi = mid - 1
  }
  return text.slice(0, lo).trimEnd() + '…'
}

function wrapWords(ctx: Ctx2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w
    if (!cur || ctx.measureText(test).width <= maxWidth) cur = test
    else {
      lines.push(cur)
      cur = w
    }
  }
  if (cur) lines.push(cur)
  return lines
}

/** The one display moment: uppercase Archivo Black, fitted to width,
 *  ellipsis at two lines (law 2 — everything else in this file whispers). */
function fitTitle(
  ctx: Ctx2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
): { size: number; lines: string[]; leading: number } {
  const MIN = 40
  const LEADING = 0.86 // between --leading-hero (0.82) and --leading-display (0.95)
  for (let size = 132; size >= MIN; size -= 2) {
    setFont(ctx, FONT_DISPLAY, size, size * -0.04) // --track-display: -0.04em
    const lines = wrapWords(ctx, text, maxWidth).slice(0, 3)
    const fits = lines.length <= 2 && lines.every((l) => ctx.measureText(l).width <= maxWidth)
    if (fits && lines.length * size * LEADING <= maxHeight) {
      return { size, lines, leading: LEADING }
    }
  }
  setFont(ctx, FONT_DISPLAY, MIN, MIN * -0.04)
  const raw = wrapWords(ctx, text, maxWidth)
  const lines = raw.length <= 2 ? raw : [raw[0], fitEllipsis(ctx, raw.slice(1).join(' '), maxWidth)]
  return { size: MIN, lines, leading: LEADING }
}

function hline(ctx: Ctx2D, x0: number, x1: number, y: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x0, y, x1 - x0, 1)
}

function vline(ctx: Ctx2D, x: number, y0: number, y1: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x, y0, 1, y1 - y0)
}

/** Module-header / running-header bracket code — `[SCOPE-02]` in the one
 *  accent, the rest of the line in dim chrome ink (law 4). */
function drawBracketLine(
  ctx: Ctx2D,
  x: number,
  y: number,
  code: string,
  rest: string,
  pal: Palette,
  size: number,
) {
  setFont(ctx, FONT_MONO, size, TRACK_LABEL)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = pal.accent
  ctx.fillText(code, x, y)
  const codeW = ctx.measureText(code).width
  ctx.fillStyle = pal.inkDim
  ctx.fillText(rest, x + codeW + 12, y)
}

function drawHeader(ctx: Ctx2D, x0: number, x1: number, y0: number, pal: Palette, when: Date) {
  const yMid = y0 + HDR_H / 2
  drawBracketLine(ctx, x0 + PAD, yMid, '[SCOPE-02]', '· FIG.02 · SESSION', pal, 20)

  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const day = String(when.getDate()).padStart(2, '0')
  const hh = String(when.getHours()).padStart(2, '0')
  const mm = String(when.getMinutes()).padStart(2, '0')
  const date = `${day} ${MONTHS[when.getMonth()]} ${when.getFullYear()} · ${hh}:${mm}`
  setFont(ctx, FONT_MONO, 18, TRACK_LABEL)
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = pal.inkDim
  ctx.fillText(date, x1 - PAD, yMid)

  hline(ctx, x0, x1, y0 + HDR_H, pal.line)
}

/** cover-fit an arbitrary source into `rect`, centred, clipped. */
function drawCover(
  ctx: Ctx2D,
  src: CanvasImageSource,
  sw: number,
  sh: number,
  rect: { x: number; y: number; w: number; h: number },
) {
  const scale = Math.max(rect.w / sw, rect.h / sh)
  const dw = sw * scale
  const dh = sh * scale
  const dx = rect.x + (rect.w - dw) / 2
  const dy = rect.y + (rect.h - dh) / 2
  ctx.save()
  ctx.beginPath()
  ctx.rect(rect.x, rect.y, rect.w, rect.h)
  ctx.clip()
  ctx.drawImage(src, dx, dy, dw, dh)
  ctx.restore()
}

function drawImageCell(
  ctx: Ctx2D,
  rect: { x: number; y: number; w: number; h: number },
  o: PosterInput,
  pal: Palette,
) {
  const inset = 16
  const inner = { x: rect.x + inset, y: rect.y + inset, w: rect.w - inset * 2, h: rect.h - inset * 2 }

  const sw = o.star.width
  const sh = o.star.height
  if (sw > 0 && sh > 0) drawCover(ctx, o.star, sw, sh, inner)

  // keyline frame (primitive 10) — the accent dimmed, at most one per view
  ctx.save()
  ctx.globalAlpha = 0.78
  ctx.strokeStyle = pal.accent
  ctx.lineWidth = 1
  ctx.strokeRect(inner.x + 0.5, inner.y + 0.5, inner.w - 1, inner.h - 1)
  ctx.restore()

  // corner brackets (.pl-fig .brk)
  const bs = 22
  ctx.strokeStyle = pal.ink
  ctx.globalAlpha = 0.85
  ctx.lineWidth = 1
  const corners: [number, number, number, number][] = [
    [inner.x, inner.y, 1, 1], // tl: draw right+down strokes
    [inner.x + inner.w, inner.y, -1, 1], // tr
    [inner.x, inner.y + inner.h, 1, -1], // bl
    [inner.x + inner.w, inner.y + inner.h, -1, -1], // br
  ]
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath()
    ctx.moveTo(cx + bs * dx, cy)
    ctx.lineTo(cx, cy)
    ctx.lineTo(cx, cy + bs * dy)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  // caption bar (.pl-figcap): fig.02 · star  ⟷  the real source reading
  const capH = 40
  ctx.fillStyle = pal.captionBg
  ctx.fillRect(inner.x, inner.y + inner.h - capH, inner.w, capH)
  setFont(ctx, FONT_MONO, 16, TRACK_LABEL)
  ctx.textBaseline = 'middle'
  const capY = inner.y + inner.h - capH / 2
  ctx.fillStyle = pal.inkDim
  ctx.textAlign = 'left'
  ctx.fillText('FIG.02 · STAR', inner.x + 14, capY)
  ctx.textAlign = 'right'
  ctx.fillText(fitEllipsis(ctx, o.source.toUpperCase(), inner.w * 0.5), inner.x + inner.w - 14, capY)

  hline(ctx, rect.x, rect.x + rect.w, rect.y + rect.h, pal.line)
}

interface PlateRow {
  k: string
  v: string
}

function buildRows(o: PosterInput): PlateRow[] {
  const rows: PlateRow[] = []
  if (o.title) rows.push({ k: '//track_', v: o.title })
  if (o.artist) rows.push({ k: '//artist_', v: o.artist })
  rows.push({ k: '//src_', v: o.source })
  if (o.bpm != null) rows.push({ k: '//bpm_', v: String(Math.round(o.bpm)) })
  if (o.peakLevel != null) {
    const filled = Math.round(clamp01(o.peakLevel) * 10)
    const meter = '■'.repeat(filled) + '□'.repeat(10 - filled)
    rows.push({ k: '//peak_', v: `${meter} ${Math.round(clamp01(o.peakLevel) * 100)}%` })
  }
  return rows
}

function drawRows(ctx: Ctx2D, x0: number, x1: number, y0: number, rows: PlateRow[], pal: Palette) {
  rows.forEach((row, i) => {
    const rowY0 = y0 + i * ROW_H
    const mid = rowY0 + ROW_H / 2
    setFont(ctx, FONT_MONO, 20, TRACK_BODY)
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'left'
    ctx.fillStyle = pal.inkDim
    ctx.fillText(row.k.toUpperCase(), x0 + PAD, mid)
    const kW = ctx.measureText(row.k.toUpperCase()).width
    ctx.textAlign = 'right'
    ctx.fillStyle = pal.ink
    const maxV = x1 - PAD - (x0 + PAD + kW + 24)
    ctx.fillText(fitEllipsis(ctx, row.v.toUpperCase(), maxV), x1 - PAD, mid)
    hline(ctx, x0, x1, rowY0 + ROW_H, pal.line)
  })
}

/** Diagonal hatch — texture, not a reading, for when a curve is empty.
 *  Law 3: an absent measurement stays absent, it is never smoothed over
 *  into something that looks like one. */
function drawHatch(ctx: Ctx2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.save()
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.clip()
  ctx.strokeStyle = color
  ctx.globalAlpha = 0.22
  ctx.lineWidth = 1
  const step = 10
  for (let sx = -h; sx < w; sx += step) {
    ctx.beginPath()
    ctx.moveTo(x + sx, y + h)
    ctx.lineTo(x + sx + h, y)
    ctx.stroke()
  }
  ctx.restore()
}

/** The glitch strip (primitive 11): the measured level curve as layered
 *  vertical hairlines with a dithered falloff, the measured tempo curve (if
 *  any) laid over it as a thin accent trace — two real readings sharing one
 *  cell rather than one texture pretending to be both. */
function drawStrip(
  ctx: Ctx2D,
  rect: { x: number; y: number; w: number; h: number },
  o: PosterInput,
  pal: Palette,
) {
  const { x, y, w, h } = rect
  if (o.levelCurve.length === 0) {
    drawHatch(ctx, x, y, w, h, pal.inkDim)
  } else {
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.clip()
    const n = o.levelCurve.length
    const mid = y + h / 2
    const iw = Math.ceil(w)
    for (let i = 0; i < iw; i++) {
      const v = clamp01(o.levelCurve[Math.min(n - 1, Math.floor((i / w) * n))])
      const jag = 0.6 + 0.4 * Math.sin(i * 0.7) * Math.cos(i * 0.13)
      const amp = Math.max(1, v * jag * (h * 0.42))
      const lit = 0.22 + 0.72 * Math.pow(v, 0.6)
      const alpha = lit * (0.45 + Math.random() * 0.55)
      ctx.fillStyle = `rgba(${pal.inkRGB}, ${alpha.toFixed(3)})`
      ctx.fillRect(x + i, mid - amp, 1, amp * 2)
    }
    ctx.restore()
  }

  if (o.tempoCurve.length > 0) {
    let lo = Infinity
    let hi = -Infinity
    for (const t of o.tempoCurve) {
      if (t < lo) lo = t
      if (t > hi) hi = t
    }
    const span = Math.max(1, hi - lo)
    const n = o.tempoCurve.length
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.clip()
    ctx.beginPath()
    for (let i = 0; i < w; i++) {
      const v = (o.tempoCurve[Math.min(n - 1, Math.floor((i / w) * n))] - lo) / span
      const py = y + h - 8 - v * (h - 16)
      if (i === 0) ctx.moveTo(x + i, py)
      else ctx.lineTo(x + i, py)
    }
    ctx.strokeStyle = pal.accent
    ctx.globalAlpha = 0.82
    ctx.lineWidth = 1.4
    ctx.stroke()
    ctx.restore()
  }

  // label chips, top corners of the strip — .pl-wave .wlbl treatment
  setFont(ctx, FONT_MONO, 15, TRACK_MICRO)
  ctx.textBaseline = 'top'
  const chipH = 30
  ctx.fillStyle = pal.captionBg
  ctx.fillRect(x, y, 190, chipH)
  ctx.fillStyle = pal.inkDim
  ctx.textAlign = 'left'
  ctx.fillText(o.levelCurve.length ? '// LEVEL · MEASURED' : '// LEVEL · NO READING', x + 12, y + 8)
  if (o.tempoCurve.length > 0) {
    const label = '// TEMPO'
    setFont(ctx, FONT_MONO, 15, TRACK_MICRO)
    const lw = ctx.measureText(label).width + 24
    ctx.fillStyle = pal.captionBg
    ctx.fillRect(x + w - lw, y, lw, chipH)
    ctx.fillStyle = pal.accent
    ctx.textAlign = 'right'
    ctx.fillText(label, x + w - 12, y + 8)
  }

  hline(ctx, x, x + w, y + h, pal.line)
}

function drawTitleBand(
  ctx: Ctx2D,
  rect: { x: number; y: number; w: number; h: number },
  o: PosterInput,
  pal: Palette,
) {
  const raw = (o.title ?? 'SCOPE').toUpperCase()
  const maxWidth = rect.w - PAD * 2
  const { size, lines, leading } = fitTitle(ctx, raw, maxWidth, rect.h - PAD * 2)
  setFont(ctx, FONT_DISPLAY, size, size * -0.04)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = pal.ink
  const lineH = size * leading
  const blockH = lines.length * lineH
  let ty = rect.y + (rect.h - blockH) / 2 + size * 0.78
  for (const line of lines) {
    ctx.fillText(line, rect.x + PAD, ty)
    ty += lineH
  }
  // the registered mark, only when standing in for a track (product parity)
  if (!o.title) {
    const lastLine = lines[lines.length - 1] ?? raw
    const lw = ctx.measureText(lastLine).width
    setFont(ctx, FONT_DISPLAY, size * 0.32, 0)
    ctx.fillStyle = pal.accent
    ctx.fillText('®', rect.x + PAD + lw + size * 0.08, ty - lineH - size * 0.55)
  }
}

function drawFooter(ctx: Ctx2D, x0: number, x1: number, y0: number, y1: number, pal: Palette) {
  hline(ctx, x0, x1, y0, pal.line)
  const mid = (y0 + y1) / 2
  const split = x0 + (x1 - x0) * 0.62
  setFont(ctx, FONT_MONO, 16, TRACK_MICRO)
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillStyle = pal.inkDim
  ctx.fillText('/ MADE BY NOON', x0 + PAD, mid)
  vline(ctx, split, y0, y1, pal.line)
  ctx.textAlign = 'right'
  ctx.fillText('SCOPE-NOON13.VERCEL.APP', x1 - PAD, mid)
}

/** Deterministic film grain (moodboard piece 6 / DESIGN.md §4): the same
 *  seed every render, so the plate's ground is textured rather than flat
 *  without the artifact looking different from itself twice. */
function applyGrain(ctx: Ctx2D, w: number, h: number) {
  let seed = 0x9e3779b9
  const rand = () => {
    seed = (seed ^ (seed << 13)) >>> 0
    seed = (seed ^ (seed >>> 17)) >>> 0
    seed = (seed ^ (seed << 5)) >>> 0
    return (seed >>> 0) / 4294967296
  }
  const noise = new Uint8ClampedArray(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    const n = Math.floor(rand() * 255)
    noise[i * 4] = n
    noise[i * 4 + 1] = n
    noise[i * 4 + 2] = n
    noise[i * 4 + 3] = 255
  }
  const img = new ImageData(noise, w, h)
  const noiseCanvas = makeRasterCanvas(w, h)
  const nctx = noiseCanvas.ctx
  nctx.putImageData(img, 0, 0)
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  ctx.globalAlpha = 0.055
  ctx.drawImage(noiseCanvas.canvas as CanvasImageSource, 0, 0)
  ctx.restore()
}

type RasterCanvas = { canvas: OffscreenCanvas | HTMLCanvasElement; ctx: Ctx2D }

function makeRasterCanvas(w: number, h: number): RasterCanvas {
  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(w, h)
    const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D | null
    if (ctx) return { canvas, ctx }
  }
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('poster: 2d context unavailable')
  return { canvas, ctx }
}

async function canvasToBlob(canvas: OffscreenCanvas | HTMLCanvasElement): Promise<Blob> {
  if ('convertToBlob' in canvas) return canvas.convertToBlob({ type: 'image/png' })
  return new Promise((resolve, reject) => {
    ;(canvas as HTMLCanvasElement).toBlob((b) => {
      if (b) resolve(b)
      else reject(new Error('poster: toBlob failed'))
    }, 'image/png')
  })
}

/** Draw fig.02 · session onto an offscreen 2D canvas and return a PNG blob. */
export async function renderPoster(o: PosterInput): Promise<Blob> {
  if (typeof document !== 'undefined' && document.fonts) {
    await Promise.all([
      document.fonts.load(`400 32px "Archivo Black"`),
      document.fonts.load(`400 16px "Departure Mono"`),
    ]).catch(() => {
      /* fonts still resolve to their fallback stack — draw regardless */
    })
  }

  const pal = palette(o.theme, o.accent)
  const { canvas, ctx } = makeRasterCanvas(W, H)

  // ground
  ctx.fillStyle = pal.ground
  ctx.fillRect(0, 0, W, H)

  const x0 = EDGE
  const x1 = W - EDGE
  const y0 = EDGE
  const y1 = H - EDGE

  // the sheet border (law 1: cells share edges inside ONE frame)
  ctx.strokeStyle = pal.line
  ctx.lineWidth = 1
  ctx.strokeRect(x0 + 0.5, y0 + 0.5, x1 - x0 - 1, y1 - y0 - 1)

  drawHeader(ctx, x0, x1, y0, pal, o.when)

  const rows = buildRows(o)
  const bodyTop = y0 + HDR_H
  const bodyBottom = y1 - FTR_H
  const bodyH = bodyBottom - bodyTop
  const rowsH = rows.length * ROW_H
  const imgH = Math.max(320, bodyH - rowsH - STRIP_H - TITLE_H)

  drawImageCell(ctx, { x: x0, y: bodyTop, w: x1 - x0, h: imgH }, o, pal)

  const rowsY = bodyTop + imgH
  drawRows(ctx, x0, x1, rowsY, rows, pal)

  const stripY = rowsY + rowsH
  drawStrip(ctx, { x: x0, y: stripY, w: x1 - x0, h: STRIP_H }, o, pal)

  const titleY = stripY + STRIP_H
  drawTitleBand(ctx, { x: x0, y: titleY, w: x1 - x0, h: bodyBottom - titleY }, o, pal)

  drawFooter(ctx, x0, x1, bodyBottom, y1, pal)

  applyGrain(ctx, W, H)

  return canvasToBlob(canvas)
}
