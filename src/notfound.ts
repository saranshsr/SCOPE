/**
 * The 404 plate. The same instrument, honest about an empty address: the
 * field is quiet because nothing is playing, and the only reading on the
 * page is the visitor's own hand -- the pointer sways the field and writes
 * the MOTION drum, the way it does on the standby plate. No audio, no
 * WebGL: a 2D canvas is enough for an empty room, and this page must load
 * instantly for someone who followed a dead link.
 */
import '@fontsource/archivo-black'
import './notfound.css'

const path = decodeURIComponent(location.pathname) || '/'
for (const id of ['nf-path', 'nf-req']) {
  const el = document.getElementById(id)
  if (el) el.textContent = path.length > 42 ? path.slice(0, 41) + '…' : path
}

const css = getComputedStyle(document.documentElement)
const INK = css.getPropertyValue('--ink-rgb').trim() || '192, 198, 214'
const LINE = css.getPropertyValue('--pl-line').trim() || 'rgba(141,144,168,.68)'
const ACCENT = css.getPropertyValue('--accent-rgb').trim() || '254, 238, 0'
const MARK = css.getPropertyValue('--mark').trim()
const meta = document.querySelector('meta[name="theme-color"]')
meta?.setAttribute('content', css.getPropertyValue('--ground').trim() || '#0a0a0a')
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

// ── the pointer, the page's one reading ─────────────────────────────────
let px = 0.5
let py = 0.5
let sway = 0
addEventListener('pointermove', (e) => {
  const nx = e.clientX / innerWidth
  const ny = e.clientY / innerHeight
  sway += Math.hypot(nx - px, ny - py) * 9
  px = nx
  py = ny
})

function fit(cv: HTMLCanvasElement) {
  const d = Math.min(2, devicePixelRatio || 1)
  const w = cv.clientWidth
  const h = cv.clientHeight
  if (cv.width !== Math.round(w * d) || cv.height !== Math.round(h * d)) {
    cv.width = Math.round(w * d)
    cv.height = Math.round(h * d)
  }
  const g = cv.getContext('2d')!
  g.setTransform(d, 0, 0, d, 0, 0)
  return { g, w, h }
}

// ── the empty field: a Fibonacci sphere, sparse and slow ────────────────
const N = 1400
const pts = new Float32Array(N * 3)
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const th = i * Math.PI * (3 - Math.sqrt(5))
  pts[i * 3] = Math.cos(th) * r
  pts[i * 3 + 1] = y
  pts[i * 3 + 2] = Math.sin(th) * r
}
const star = document.getElementById('nf-star') as HTMLCanvasElement

// ── the drum ────────────────────────────────────────────────────────────
const HZ = 40
const hist = new Float32Array(HZ * 10)
let head = 0
let slotEnd = performance.now()
let peak = 0
const wave = document.getElementById('nf-wave') as HTMLCanvasElement

let t = 0
let last = performance.now()
let level = 0
function frame(now: number) {
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  t += reduce ? 0 : dt
  // the hand's reading decays like a meter, so a flick shows and fades
  level = Math.max(level * Math.exp(-dt * 3.2), Math.min(1, sway))
  sway = 0
  peak = Math.max(peak, level)
  while (now >= slotEnd) {
    hist[head % hist.length] = peak
    head++
    peak = level
    slotEnd += 1000 / HZ
    if (now - slotEnd > 1000) slotEnd = now
  }
  drawStar()
  drawDrum()
  requestAnimationFrame(frame)
}

function drawStar() {
  const { g, w, h } = fit(star)
  g.clearRect(0, 0, w, h)
  const R = Math.min(w, h) * 0.34
  const cx = w / 2 + (px - 0.5) * R * 0.18
  const cy = h / 2 + (py - 0.5) * R * 0.18
  const a = t * 0.12
  const tilt = 0.38
  const ca = Math.cos(a), sa = Math.sin(a)
  const ct = Math.cos(tilt), st = Math.sin(tilt)
  const swell = 1 + level * 0.12
  for (let i = 0; i < N; i++) {
    const x0 = pts[i * 3], y0 = pts[i * 3 + 1], z0 = pts[i * 3 + 2]
    const x1 = x0 * ca + z0 * sa
    const z1 = -x0 * sa + z0 * ca
    const y2 = y0 * ct - z1 * st
    const z2 = y0 * st + z1 * ct
    const depth = (z2 + 1) / 2 // 0 back .. 1 front
    const alpha = 0.12 + 0.6 * depth * depth
    const s = depth > 0.6 ? 1.4 : 1
    g.fillStyle = `rgba(${INK},${alpha.toFixed(3)})`
    g.fillRect(cx + x1 * R * swell - s / 2, cy + y2 * R * swell - s / 2, s, s)
  }
  // the axis the instrument would pull apart on, dashed: nothing to pull
  g.strokeStyle = LINE
  g.setLineDash([2, 4])
  g.beginPath()
  g.moveTo(cx, cy - R * 1.32)
  g.lineTo(cx, cy + R * 1.32)
  g.stroke()
  g.setLineDash([])
}

function drawDrum() {
  const { g, w, h } = fit(wave)
  g.clearRect(0, 0, w, h)
  const n = hist.length
  const have = Math.min(n, head)
  const HEAD = 16
  const hx = w - HEAD
  const mid = Math.round(h / 2) + 0.5
  const amp = mid - 6
  const step = hx / (n - 1)
  const at = (k: number) => {
    const back = n - 1 - k
    return back >= have ? 0 : hist[(head - 1 - back + n * 4) % n]
  }
  const y = (v: number) => Math.max(0.5, Math.pow(Math.min(1, v), 0.7) * amp)
  g.lineWidth = 1
  g.strokeStyle = `rgba(${INK},0.3)`
  g.beginPath()
  for (let k = 0; k < n; k++) {
    const x = Math.round(k * step) + 0.5
    const a = y(at(k))
    g.moveTo(x, mid - a)
    g.lineTo(x, mid + a)
  }
  g.stroke()
  g.strokeStyle = `rgba(${INK},0.9)`
  for (const sgn of [1, -1]) {
    g.beginPath()
    for (let k = 0; k < n; k++) {
      const yy = mid - sgn * y(at(k))
      if (k) g.lineTo(k * step, yy)
      else g.moveTo(0, yy)
    }
    g.stroke()
  }
  g.strokeStyle = LINE
  g.beginPath()
  g.moveTo(0, mid)
  g.lineTo(w, mid)
  g.stroke()
  g.save()
  g.globalCompositeOperation = 'destination-out'
  const fade = g.createLinearGradient(0, 0, w * 0.5, 0)
  fade.addColorStop(0, 'rgba(0,0,0,0.85)')
  fade.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = fade
  g.fillRect(0, 0, w * 0.5, h)
  g.restore()
  const v = at(n - 1)
  const pyy = Math.round(mid - y(v)) + 0.5
  g.strokeStyle = MARK ? `rgba(${INK},0.9)` : `rgba(${ACCENT},0.9)`
  g.beginPath()
  g.moveTo(hx, pyy)
  g.lineTo(w, pyy)
  g.stroke()
  g.fillStyle = MARK || `rgb(${ACCENT})`
  g.fillRect(hx - 2, pyy - 2.5, 5, 5)
  if (MARK) {
    g.strokeStyle = `rgba(${INK},1)`
    g.strokeRect(hx - 2, pyy - 2.5, 5, 5)
  }
}

requestAnimationFrame(frame)
