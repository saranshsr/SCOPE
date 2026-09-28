#!/usr/bin/env node
// The power-on flight, proven rather than assumed.
//
// PRODUCT.md marks the flight sacred, and its failure mode is the worst kind:
// `runBoot()` measures an aperture element, and when that query returns null
// it calls `endBoot()` and returns. No error, no warning — the app simply
// cuts to the console. Every automated signal stays green: it builds, it
// type-checks, it renders, the console works. The only tell is that the two
// seconds you were supposed to fly through did not happen.
//
// So this hooks the scene's own levers and records what the flight actually
// drove, beat by beat. Run it after every step that touches the plate, the
// aperture, or the boot machine.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
const errs = []
p.on('pageerror', e => errs.push(e.message.slice(0, 160)))
// waitUntil is domcontentloaded, NOT networkidle2. The console streams
// radio, and a media element holds its connection open for as long as it
// plays -- so "no more than two connections for 500ms" is a condition
// this page can never reach. Measured under the ANGLE/swiftshader flags
// these checks launch with: networkidle2 does not fire in 60 seconds,
// while the same page is interactive in under one. It passed before only
// when the stream happened not to have started yet, which is the kind of
// pass that turns into a mystery failure later. Every one of these
// scripts already polls for `.app.live`, which is the state that actually
// matters, so nothing is lost by not waiting for the network.
// 60s, not puppeteer's default 30. These run under a software
// rasteriser, and the app is three.js plus six shader programs plus a
// 108k-particle field plus a GPGPU sim before it paints -- measured at
// 22s to DOMContentLoaded on the ANGLE backend these launch with, which
// passes the default until the machine is a little busier and then does
// not. A nav timeout that depends on how loaded the box is reports as a
// product failure and is not one (CHECKS.md 2.2).
await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise(r => setTimeout(r, 2500))

const armed = await p.evaluate(() => {
  const s = window.__sc
  if (!s) return false
  window.__flight = { rev: [], focus: [], t0: 0, labels: new Set(), widths: new Set(), lastPlate: null }
  // The button and the sheet, every frame. The label must stay POWER ON for
  // the whole flight (it used to decode to RESUME mid-rev, on the button
  // just pressed), its width must not move, and the plate's last frame
  // before it unmounts must be the END of its blow-out, not the middle.
  const watch = () => {
    const F = window.__flight
    const pw = document.querySelector('.power')
    if (pw) {
      // only the settled label: the decode scrambles through glyphs, and a
      // hover replays it, so an intermediate string is not a label
      if (/^[a-z ]+$/.test(pw.textContent || '')) F.labels.add(pw.textContent)
      F.widths.add(pw.offsetWidth)
    }
    const pl = document.querySelector('.plate')
    if (pl) F.lastPlate = +getComputedStyle(pl).opacity
    if (!document.querySelector('.app.live') || pl) requestAnimationFrame(watch)
  }
  window.__flight.watch = watch
  const rev = s.setRev.bind(s), foc = s.setFocus.bind(s)
  s.setRev = v => { window.__flight.rev.push([performance.now(), v]); return rev(v) }
  s.setFocus = (...a) => { window.__flight.focus.push([performance.now(), a[0], a[1], a[2]]); return foc(...a) }
  return true
})
if (!armed) { console.error('flight: window.__sc is not exposed — cannot observe the scene.'); await b.close(); process.exit(1) }

const clicked = await p.evaluate(() => {
  const el = document.querySelector('.power')
  if (!el) return false
  window.__flight.t0 = performance.now()
  el.click(); requestAnimationFrame(window.__flight.watch); return true
})
if (!clicked) { console.error('flight: no `.power` control found — nothing can start the flight.'); await b.close(); process.exit(1) }
// Wait for the flight to END, not for a fixed sleep. Under load the whole
// thing runs slower and a fixed wait samples mid-dive, which then reports a
// perfectly healthy flight as "the dive stopped at 1.53". A check that fails
// on machine speed teaches you to ignore it.
const deadline = Date.now() + 20000
while (Date.now() < deadline) {
  const done = await p.evaluate(() => {
    const r = window.__flight.rev
    // endBoot() is the last thing the flight does, and it sets rev back to 0
    // after the dive has peaked above 1.
    return !!document.querySelector('.app.live') && r.length > 1
      && r[r.length - 1][1] === 0 && r.some(x => x[1] > 1)
  })
  if (done) break
  await new Promise(r => setTimeout(r, 250))
}

const f = await p.evaluate(() => {
  const { rev, focus, t0 } = window.__flight
  const F = window.__flight
  return { rev: rev.map(([t, v]) => [Math.round(t - t0), v]),
           focus: focus.map(([t, x, y, d]) => [Math.round(t - t0), x, y, d]),
           started: !!document.querySelector('.app.live'),
           labels: [...F.labels], widths: [...F.widths], lastPlate: F.lastPlate,
           plateGone: !document.querySelector('.plate') }
})

const fail = []
// Assert on the VALUE TRAJECTORY, never on sample counts. Under software
// rendering rAF yields only a handful of ticks across the whole flight, so a
// count threshold reports a healthy flight as broken. The trajectory does not
// care how often it was sampled — and it is what the flight actually IS.
//
// A skipped flight is unmistakable here: runBoot() bails to endBoot(), which
// calls setRev(0) once and refocuses once. No value above 1, nothing strictly
// between 0 and 1, and no elapsed span.
const revs = f.rev.map(r => r[1])
const inRev = revs.some(v => v > 0.05 && v <= 1)
const inDive = revs.some(v => v > 1)
const peak = revs.length ? Math.max(...revs) : 0

if (!inRev) fail.push('REV never ran: no setRev value in (0, 1]. The flight was skipped and the app cut straight to the console — check that the aperture element exists and that runBoot() can measure it.')
if (!inDive) fail.push('DIVE never ran: no setRev value above 1.')
if (peak < 3) fail.push(`the dive stopped at ${peak.toFixed(2)}; it is authored to reach 3.5.`)

const xs = f.focus.map(r => r[1]), ds = f.focus.map(r => r[3])
const dx = xs.length ? Math.max(...xs) - Math.min(...xs) : 0
const dd = ds.length ? Math.max(...ds) - Math.min(...ds) : 0
if (!(dx > 0.05 || dd > 0.5)) fail.push(`the camera never travelled: setFocus x moved ${dx.toFixed(3)} and dolly moved ${dd.toFixed(2)}. A dive that does not move is a cut.`)
// An UPPER bound on dolly too. `dolly = (viewportHeight / apertureHeight)`,
// so a collapsed aperture does not fail the flight — it inflates it. The
// flight still "runs", from a 2px hole, starting so far out that the star is
// a dot. This caught exactly that when the document model was loosened and
// a percentage height resolved against an auto parent.
const maxD = ds.length ? Math.max(...ds) : 0
if (maxD > 12) fail.push(`the dive started at dolly ${maxD.toFixed(1)}, which means the aperture measured a few pixels tall: viewport/aperture is the dolly, so a collapsed hole inflates it instead of failing. Check that .aperture has real height.`)

if (!f.started) fail.push('the app never reached the live console.')
// Span is measured to the dive's PEAK, not to the last sample — endBoot's
// trailing setRev(0) can land arbitrarily late when rAF is starved. And only
// a lower bound is asserted: a slow renderer inflates the upper end, so a
// ceiling here would fail on machine speed rather than on anything real.
// The failure this guards is a flight that takes no time at all, i.e. a cut.
const revStart = f.rev.find(r => r[1] > 0.05)
const revPeak = f.rev.reduce((a, r) => (r[1] > a[1] ? r : a), [0, -1])
const span = revStart ? revPeak[0] - revStart[0] : 0
if (span < 1200) fail.push(`the flight spanned ${span}ms; it is authored at ~2050ms (1050 rev + 1000 dive). Under 1200ms it is a cut, not a flight.`)
if (errs.length) fail.push(`page errors during the flight: ${errs.join(' | ')}`)
if (f.labels.includes('resume')) fail.push(`the button said ${f.labels.map(l => `"${l}"`).join(', ')} during the flight; it is POWER ON until the sheet has gone. RESUME is for a live standby, not for the flight you just started.`)
if (f.widths.length > 1) fail.push(`the button's width moved during the flight (${f.widths.join(', ')}px): the band's seams move with it.`)
if (!f.plateGone) fail.push('the standby plate was still mounted after the flight ended.')
else if (f.lastPlate != null && f.lastPlate > 0.1) fail.push(`the plate unmounted at opacity ${f.lastPlate.toFixed(2)}: its 1000ms blow-out was cut short, which reads as a cut. It must stay mounted until plate-dive finishes.`)

if (fail.length) {
  console.error('flight FAILED\n' + fail.map(x => '  · ' + x).join('\n'))
  console.error(`  (rev samples ${f.rev.length}, focus samples ${f.focus.length}, span ${span}ms)`)
  if (process.env.FLIGHT_DUMP) console.error(JSON.stringify(f, null, 1))
  await b.close(); process.exit(1)
}
// ── THE DATA COLUMN AGAINST THE ROOM IT HAS ────────────────────────────
// The standby sheet does not scroll, so when the window is shorter than
// the column, styles.css sheds cells on a five-step ladder. Every
// threshold in it is a MEASURED number, and all five were derived when
// the sheet was set in JetBrains Mono. Re-basing the type ramp on
// Departure Mono changed the height of every row in the column; each step
// then fired about 30px too late, and 175px of the 560..900 range clipped
// -- including 768, which is 1366x768 and 1024x768. `.pl-r` is
// `overflow: hidden`, so the pills row simply lost its bottom 5px and the
// dither strip was cut off whole, silently.
//
// Nothing measured it. layout.mjs's seven viewports walk the CONSOLE's
// bands; offscreen walks children against their own surfaces and the
// pills were still inside theirs. So it is measured here, where the
// landing lives.
//
// SIX HEIGHTS, AND THEY ARE NOT A SAMPLE. Within one rung of the ladder
// the column's need is constant and the room grows with the window, so
// the worst case in each band is its SHORTEST height -- one pixel above
// where the next rung fires. Testing those is not spot-checking, it is
// complete. If the ramp moves again these are the numbers that go red,
// and styles.css carries the arithmetic for re-deriving them.
// ── A DOUBLE-CLICK IS NOT A SKIP ──────────────────────────────────────
// Any input skips the flight, and the second half of a double-click on
// POWER ON is input: it landed ~150ms into the REV and cut straight to the
// console. The skip now ignores the first 400ms, so this must still DIVE.
{
  const q = await b.newPage()
  await q.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode */ } })
  await q.setViewport({ width: 1440, height: 900 })
  await q.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await q.waitForSelector('.power', { timeout: 60000 })
  await new Promise(r => setTimeout(r, 2000))
  const ok = await q.evaluate(() => {
    const s = window.__sc
    if (!s) return false
    window.__dbl = []
    const rev = s.setRev.bind(s)
    s.setRev = v => { window.__dbl.push([performance.now(), v]); return rev(v) }
    return true
  })
  const box = await q.$eval('.power', e => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2] })
  await q.mouse.click(box[0], box[1])
  await new Promise(r => setTimeout(r, 150))
  await q.mouse.click(box[0], box[1])
  const until = Date.now() + 20000
  let d = []
  while (Date.now() < until) {
    d = await q.evaluate(() => window.__dbl || [])
    if (d.length > 1 && d[d.length - 1][1] === 0 && d.some(x => x[1] > 1)) break
    await new Promise(r => setTimeout(r, 250))
  }
  await q.close()
  const peakD = d.length ? Math.max(...d.map(x => x[1])) : 0
  const s0 = d.find(x => x[1] > 0.05), pk = d.reduce((a, x) => (x[1] > a[1] ? x : a), [0, -1])
  const spanD = s0 ? Math.round(pk[0] - s0[0]) : 0
  if (!ok || peakD < 3 || spanD < 1500) {
    console.error(`flight FAILED\n  · a double-click on POWER ON (150ms apart) ${peakD < 3 ? `stopped the flight at rev ${peakD.toFixed(2)}` : `ran only ${spanD}ms`}: the second click skipped it. The skip listener must ignore the first 400ms.`)
    await b.close(); process.exit(1)
  }
  console.log(`  double-click ok — still dived to ${peakD.toFixed(2)} over ${spanD}ms`)
}

{
  const q = await b.newPage()
  await q.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode */ } })
  await q.setViewport({ width: 1280, height: 900 })
  await q.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise(r => setTimeout(r, 2500))
  // One above each threshold (828 / 804 / 773 / 708 / 646), and 561: below
  // that the sheet scrolls and there is no ladder to test.
  const HEIGHTS = [900, 829, 805, 774, 709, 647, 561]
  const spill = []
  const seen = []
  for (const h of HEIGHTS) {
    await q.setViewport({ width: 1280, height: h })
    await new Promise(r => setTimeout(r, 260))
    const d = await q.evaluate(() => {
      const col = document.querySelector('.pl-r')
      if (!col) return null
      const cb = col.getBoundingClientRect()
      const kids = [...col.children].filter(c => getComputedStyle(c).display !== 'none')
      return {
        kids: kids.length,
        over: Math.round(Math.max(...kids.map(c => c.getBoundingClientRect().bottom)) - cb.bottom),
        worst: kids.map(c => [c.className.split(' ')[0], Math.round(c.getBoundingClientRect().bottom - cb.bottom)])
          .filter(x => x[1] > 0).map(x => `${x[0]}+${x[1]}px`),
      }
    })
    // A height that found no column, or a column with no cells, is this
    // check failing to reach its subject -- reported, never passed.
    if (!d) { spill.push(`at 1280x${h} there is no .pl-r at all, so nothing was measured`); continue }
    if (d.kids < 4) { spill.push(`at 1280x${h} the data column had only ${d.kids} visible cells, which is not the sheet -- this check is stale and is NOT passing`); continue }
    // Every stage of the chain, hovered: the readout under it is a fixed
    // cell, so neither the column nor its last row may move. A three-line
    // stage used to push the pills 5px past the clip at 1280x800.
    const hov = []
    for (const row of await q.$$('.pl-prow')) {
      if (!(await row.evaluate(e => e.offsetParent !== null))) continue
      await row.hover()
      await new Promise(r => setTimeout(r, 60))
      hov.push(await q.evaluate(() => {
        const cb = document.querySelector('.pl-r').getBoundingClientRect()
        const kids = [...document.querySelector('.pl-r').children].filter(c => getComputedStyle(c).display !== 'none')
        return [Math.round(Math.max(...kids.map(c => c.getBoundingClientRect().bottom)) - cb.bottom), Math.round(document.querySelector('.pl-pills').getBoundingClientRect().bottom)]
      }))
    }
    await q.mouse.move(1, 1)
    const hOver = Math.max(0, ...hov.map(x => x[0]))
    const pillYs = new Set(hov.map(x => x[1]))
    if (hOver > 0) spill.push(`at 1280x${h} hovering a signal-chain stage pushes the column ${hOver}px past its clip: the stage readout (.pl-pathcap) grew, so a PATH line runs past two lines of the column.`)
    if (pillYs.size > 1) spill.push(`at 1280x${h} the pills row jumps between ${[...pillYs].join(', ')}px as the chain is hovered: the stage readout must be a fixed height.`)
    seen.push(`${h}:${d.kids}cells${d.over > 0 ? ` OVER ${d.over}` : ''}`)
    if (d.over > 0) spill.push(`at 1280x${h} the data column overflows its own cell by ${d.over}px (${d.worst.join(', ')}). .pl-r is overflow:hidden, so that content is CUT, not scrolled. The shedding ladder in styles.css fires too late for this band -- re-derive its five thresholds against the column's current need.`)
  }
  // 900x600: the last rung. Shedding the chain frees 270px, so the rows
  // shed above it come back, and the figure keeps a real frame. Measured
  // before: dither 58% of the column, the image cell 186px.
  await q.setViewport({ width: 900, height: 600 })
  await new Promise(r => setTimeout(r, 260))
  const sm = await q.evaluate(() => {
    const col = document.querySelector('.pl-r')?.getBoundingClientRect()
    const strip = document.querySelector('.pl-strip')?.getBoundingClientRect()
    const fig = document.querySelector('.pl-fig')?.getBoundingClientRect()
    return col && strip && fig ? { pct: Math.round((strip.height / col.height) * 100), fig: Math.round(fig.height) } : null
  })
  if (!sm) spill.push('at 900x600 the column, strip or figure was missing, so nothing was measured')
  else {
    if (sm.pct >= 35) spill.push(`at 900x600 the dither strip is ${sm.pct}% of the data column: the sheet shed rows it had room for. The last rung restores the echoes, //stems_ and the scale.`)
    if (sm.fig < 220) spill.push(`at 900x600 the image cell is ${sm.fig}px tall (floor 220): the motion strip and figure inset are meant to give it the room.`)
    seen.push(`900x600:strip${sm.pct}%/fig${sm.fig}`)
  }

  // THE PHONES, and a phone held sideways. POWER ON is the only way in, so
  // it has to be on the first screen without scrolling: it sticks to the
  // foot of the scrolling plate. At 844x390 the two-column sheet collapsed
  // the figure to 2px and its caption slid over the morse row.
  for (const [w, h] of [[375, 548], [390, 664], [375, 667], [430, 740], [844, 390]]) {
    await q.setViewport({ width: w, height: h })
    await new Promise(r => setTimeout(r, 260))
    const m = await q.evaluate(() => {
      const plate = document.querySelector('.plate')
      if (!plate) return null
      plate.scrollTop = 0
      const pr = plate.getBoundingClientRect()
      const b = document.querySelector('.power').getBoundingClientRect()
      const cap = document.querySelector('.pl-figcap').getBoundingClientRect()
      const morse = document.querySelector('.pl-morse').getBoundingClientRect()
      const top = Math.max(pr.top, 0), bot = Math.min(pr.bottom, innerHeight)
      return { inside: b.top >= top - 0.5 && b.bottom <= bot + 0.5, pb: Math.round(b.bottom), vb: Math.round(bot),
        fig: Math.round(document.querySelector('.pl-fig').getBoundingClientRect().height),
        overlap: Math.max(0, Math.min(cap.bottom, morse.bottom) - Math.max(cap.top, morse.top)) }
    })
    if (!m) { spill.push(`at ${w}x${h} there is no standby plate, so nothing was measured`); continue }
    if (!m.inside) spill.push(`at ${w}x${h} POWER ON sits outside the visible plate (its bottom ${m.pb}px, the plate's visible bottom ${m.vb}px): the only way in is below the fold.`)
    if (m.fig < 180) spill.push(`at ${w}x${h} the image cell is ${m.fig}px tall (floor 180).`)
    if (m.overlap > 0) spill.push(`at ${w}x${h} the figure caption overlaps the morse row by ${Math.round(m.overlap)}px: the image cell has collapsed.`)
    seen.push(`${w}x${h}:fig${m.fig}`)
  }
  await q.close()
  if (spill.length) {
    console.error('flight FAILED\n' + spill.map(x => '  · ' + x).join('\n'))
    await b.close(); process.exit(1)
  }
  console.log(`  column ok — no clipping or hover jump at the shortest height of each rung, POWER ON on the first screen of every phone: ${seen.join(' ')}`)
}

if (process.env.FLIGHT_DUMP) console.log(JSON.stringify(f, null, 1))
console.log(`flight ok — REV ran, DIVE peaked at ${peak.toFixed(2)}, camera travelled (x ${dx.toFixed(3)}, dolly ${dd.toFixed(2)}), landed live, ${span}ms end to end`)
await b.close()
