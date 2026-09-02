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
await p.goto(URL, { waitUntil: 'networkidle2' })
await new Promise(r => setTimeout(r, 2500))

const armed = await p.evaluate(() => {
  const s = window.__sc
  if (!s) return false
  window.__flight = { rev: [], focus: [], t0: 0 }
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
  el.click(); return true
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
  return { rev: rev.map(([t, v]) => [Math.round(t - t0), v]),
           focus: focus.map(([t, x, y, d]) => [Math.round(t - t0), x, y, d]),
           started: !!document.querySelector('.app.live') }
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

if (fail.length) {
  console.error('flight FAILED\n' + fail.map(x => '  · ' + x).join('\n'))
  console.error(`  (rev samples ${f.rev.length}, focus samples ${f.focus.length}, span ${span}ms)`)
  if (process.env.FLIGHT_DUMP) console.error(JSON.stringify(f, null, 1))
  await b.close(); process.exit(1)
}
if (process.env.FLIGHT_DUMP) console.log(JSON.stringify(f, null, 1))
console.log(`flight ok — REV ran, DIVE peaked at ${peak.toFixed(2)}, camera travelled (x ${dx.toFixed(3)}, dolly ${dd.toFixed(2)}), landed live, ${span}ms end to end`)
await b.close()
