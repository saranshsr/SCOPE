#!/usr/bin/env node
// The descent's integrity. Three laws, all of which failed silently at least
// once while it was being built.
//
// 1 · NO DEAD SCROLL. The descent is exactly N viewport-heights. Its scrims
//     are absolutely positioned with negative insets so they bleed past their
//     movement — and the bottom one bled past the DOCUMENT, adding 18vh of
//     scroll after the gate. Nothing errors; the gate's content simply sits
//     162px above centre with the star below the words, and the approach
//     still reaches 1 so every other signal stays green.
// 2 · THE APPROACH SPANS 0..1. It drives the camera through the aperture's
//     height. If it never reaches 1, the star never arrives.
// 3 · CAPABILITY PARITY. PRODUCT.md: "Nothing that works may be lost." The
//     plate carries three tuning dials; a landing that replaces it and drops
//     them is a regression the type checker cannot see.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const MOVEMENTS = 4
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
const errs = []
p.on('pageerror', e => errs.push(e.message.slice(0, 140)))
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
await new Promise(r => setTimeout(r, 3000))

const top = await p.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  viewport: innerHeight,
  movements: document.querySelectorAll('.movement').length,
  approach: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--approach')) || 0,
  apertureH: Math.round(document.querySelector('.aperture')?.getBoundingClientRect().height ?? 0),
  dials: document.querySelectorAll('.gate-dials > *').length,
  // A dial and its caption are "icon + label" -- one unit, and the token for
  // that relationship is --gap-tight. They rendered butted together: the SVG
  // ended at 534px and `turb 100` began at 534px, so the label read as
  // touching the dial's border on the landing's only interactive row.
  dialGaps: [...document.querySelectorAll('.pl-dial')].map(d => {
    const svg = d.querySelector('svg'), cap = d.querySelector('.cap')
    if (!svg || !cap) return null
    return Math.round(cap.getBoundingClientRect().left - svg.getBoundingClientRect().right)
  }).filter(v => v !== null),
}))
await p.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 1600))
const gate = await p.evaluate(() => {
  const g = document.querySelector('.gate')?.getBoundingClientRect()
  return { approach: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--approach')) || 0,
           apertureH: Math.round(document.querySelector('.aperture')?.getBoundingClientRect().height ?? 0),
           gateOffCentre: g ? Math.round(Math.abs((g.top + g.height / 2) - innerHeight / 2)) : -1 }
})
// 4 · THE REDUCED PATH. DESIGN.md's table: "scroll approach, star dollies in
//     -> star already at its arrival scale". The reduced path removes travel
//     and nothing else, so the star must be where the descent WOULD have
//     delivered it, from the first frame. This is the one law here that a
//     sighted check cannot catch by looking, because both paths look correct
//     in a screenshot — only the trajectory differs.
const rp = await b.newPage()
await rp.setViewport({ width: 1440, height: 900 })
await rp.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await rp.goto(URL, { waitUntil: 'domcontentloaded' })
await new Promise(r => setTimeout(r, 3200))
const rTop = await rp.evaluate(() => ({
  approach: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--approach')) || 0,
  apertureH: Math.round(document.querySelector('.aperture').getBoundingClientRect().height),
}))
await rp.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 1500))
const rGate = await rp.evaluate(() => ({
  apertureH: Math.round(document.querySelector('.aperture').getBoundingClientRect().height),
}))
// 5 · THE KEYBOARD PATH. The descent is a scroll, so the scroll keys must
//     scroll it. This failed silently and completely: the landing claimed
//     Space (correct when it was a fixed poster with nothing to scroll), so
//     every press powered the instrument on instead of paging down and a
//     keyboard user could never reach the copy explaining what they were
//     about to turn on. Nothing errored; the page simply started.
const kb = {}
for (const key of ['Space', 'End', 'Enter']) {
  const kp = await b.newPage()
  await kp.setViewport({ width: 1440, height: 900 })
  await kp.goto(URL, { waitUntil: 'domcontentloaded' })
  // Settle before pressing: a keypress that lands before the listener is
  // attached reads as "the key does nothing" and the check lies.
  await new Promise(r => setTimeout(r, 2500))
  await kp.evaluate(() => window.focus())
  await kp.keyboard.press(key)
  // Enter starts a ~2s flight; Space and End settle in well under a second.
  // Poll for whichever outcome this key is meant to produce.
  const by = Date.now() + 12000
  while (Date.now() < by) {
    const done = await kp.evaluate(k => k === 'Enter' ? !!document.querySelector('.app.live') : scrollY > 0, key)
    if (done) break
    await new Promise(r => setTimeout(r, 200))
  }
  await new Promise(r => setTimeout(r, 400))
  kb[key] = await kp.evaluate(() => ({ y: Math.round(scrollY), live: !!document.querySelector('.app.live') }))
  await kp.close()
}
// The dials must be reachable and turnable without a pointer.
const dp = await b.newPage()
await dp.setViewport({ width: 1440, height: 900 })
await dp.goto(URL, { waitUntil: 'domcontentloaded' })
await new Promise(r => setTimeout(r, 3500))
await dp.keyboard.press('Tab'); await dp.keyboard.press('Tab')
const dialFocus = await dp.evaluate(() => ({ role: document.activeElement?.getAttribute('role'),
  now: document.activeElement?.getAttribute('aria-valuenow') }))
const turbBefore = await dp.evaluate(() => +window.__sc.uniforms.uTurb.value.toFixed(3))
for (let i = 0; i < 4; i++) { await dp.keyboard.press('ArrowUp'); await new Promise(r => setTimeout(r, 110)) }
await new Promise(r => setTimeout(r, 500))
const turbAfter = await dp.evaluate(() => +window.__sc.uniforms.uTurb.value.toFixed(3))
const ariaAfter = await dp.evaluate(() => document.activeElement?.getAttribute('aria-valuenow'))
await dp.close()

// ── the display line must READ as display, at every width ──────────────
// §2: a level needs >=1.5x to register as a level at all. The descent's
// opening line is fluid, so the ratio is only guaranteed at the width you
// happened to look at -- and tethering its floor to the nearest ramp step
// (--t-data, 20px) silently dropped it to 1.25x against the 16px prose
// beside it on a phone. It looked fine on the desktop it was checked at.
const ratios = []
for (const w of [1440, 820, 390]) {
  const rp2 = await b.newPage()
  await rp2.setViewport({ width: w, height: 900 })
  await rp2.goto(URL, { waitUntil: 'domcontentloaded' })
  await new Promise(r => setTimeout(r, 2200))
  const m = await rp2.evaluate(() => {
    const s = document.querySelector('.say'), a = document.querySelector('.aside')
    if (!s || !a) return null
    const S = parseFloat(getComputedStyle(s).fontSize), A = parseFloat(getComputedStyle(a).fontSize)
    return { S: Math.round(S), A: Math.round(A), r: S / A }
  })
  await rp2.close()
  if (!m) { ratios.push(`${w}px: no .say/.aside to measure — the descent's copy has moved and this check is stale.`); continue }
  if (m.r < 1.5) ratios.push(`at ${w}px wide the descent's display line is ${m.S}px against ${m.A}px prose — ${m.r.toFixed(2)}x, under the 1.5x a level needs to read as a level (§2).`)
}

// ── THE ROOM UNDER REDUCED MOTION ──────────────────────────────────────
// The reduced path was checked for the DESCENT only. Law 2 asks for more
// than that: the flight must still complete, the room must still arrive, and
// the star -- which is the product -- must still be alive. The banned
// shortcut (`* { animation-duration: 0.01ms !important }`) satisfies a
// naive check while deleting the thing people came for.
const rmp = await b.newPage()
await rmp.setViewport({ width: 1440, height: 900 })
await rmp.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await rmp.goto(URL, { waitUntil: 'domcontentloaded' })
await new Promise(r => setTimeout(r, 2600))
await rmp.keyboard.press('Enter')
const rmBy = Date.now() + 20000
while (Date.now() < rmBy) {
  if (await rmp.evaluate(() => !!document.querySelector('.app.live'))) break
  await new Promise(r => setTimeout(r, 250))
}
const room = await rmp.evaluate(() => ({
  live: !!document.querySelector('.app.live'),
  starRunning: (window.__sc?.uniforms?.uTime?.value ?? 0) > 0,
  // RUNNING IS NOT VISIBLE. The render loop keeps ticking with the canvas
  // `display: none`, so `uTime > 0` happily reported a healthy star while a
  // mutant hid the entire thing. Ask whether it is ON SCREEN.
  starVisible: (() => {
    const c = document.querySelector('canvas'); if (!c) return false
    const cs = getComputedStyle(c), r = c.getBoundingClientRect()
    return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.1 &&
           r.width > 100 && r.height > 100
  })(),
  floorVisible: (() => { const f = document.querySelector('.floor'); if (!f) return false
    const cs = getComputedStyle(f); return cs.visibility !== 'hidden' && +cs.opacity > 0.5 })(),
}))
await rmp.close()

await b.close()

const fail = [...ratios]
if (!room.live) fail.push('under prefers-reduced-motion the console never arrives — the flight must still complete and land, not be skipped into nothing.')
if (!room.starRunning) fail.push('under prefers-reduced-motion the star is not running. Reduced motion removes travel, not the instrument; a still star is the product deleted.')
if (!room.starVisible) fail.push('under prefers-reduced-motion the star is not on screen — the canvas is hidden, zero-sized or transparent. Reduced motion removes travel, not the subject.')
if (!room.floorVisible) fail.push('under prefers-reduced-motion the floor never fades up, so the console is unreachable.')
const want = top.viewport * MOVEMENTS
if (top.movements !== MOVEMENTS) fail.push(`expected ${MOVEMENTS} movements, found ${top.movements} — update this check with the descent, or a movement has gone missing.`)
if (Math.abs(top.scrollHeight - want) > 2) fail.push(`the document is ${top.scrollHeight}px where ${MOVEMENTS} movements are ${want}px — ${top.scrollHeight - want}px of dead scroll. A scrim's negative inset is the usual cause; give .descent \`overflow: clip\`.`)
if (top.approach > 0.01) fail.push(`--approach is ${top.approach} at the top of the descent; it must start at 0.`)
if (gate.approach < 0.99) fail.push(`--approach only reaches ${gate.approach} at the gate; it must reach 1 or the star never finishes arriving.`)
if (!(top.apertureH > 40)) fail.push(`the aperture measures ${top.apertureH}px — focus() derives the camera dolly from this, so a collapsed aperture pushes the star to a dot.`)
if (!(gate.apertureH > top.apertureH * 2)) fail.push(`the aperture grows only ${top.apertureH}px to ${gate.apertureH}px across the descent — the approach is not moving the camera.`)
if (gate.gateOffCentre > 8) fail.push(`the gate's content sits ${gate.gateOffCentre}px off the viewport centre at full scroll — the star and the words have come apart.`)
const tight = (top.dialGaps ?? []).filter(g => g < 4)
if (tight.length) fail.push(`${tight.length} of ${top.dialGaps.length} gate dials sit ${tight.join('/')}px from their own caption — a dial and its label are one unit and take --gap-tight (4px). At 0 the label reads as touching the dial's border.`)
if (top.dials !== 3) fail.push(`the gate carries ${top.dials} tuning dials, not 3. PRODUCT.md: nothing that works may be lost — the plate ships turb/expo/spin and this landing replaces it.`)
if (rTop.approach < 0.99) fail.push(`under prefers-reduced-motion the approach starts at ${rTop.approach}; it must start at 1 — the reduced path removes travel, so the star begins where the descent would have delivered it.`)
if (rTop.apertureH !== rGate.apertureH) fail.push(`under prefers-reduced-motion the aperture moves ${rTop.apertureH}px to ${rGate.apertureH}px across the scroll — the star is still dollying in, which is exactly the travel the reduced path exists to remove.`)
if (!(kb.Space.y > 100)) fail.push(`Space did not scroll the descent (scrollY ${kb.Space.y}) — it is the page's scroll key and the landing is a scroll now.`)
if (kb.Space.live) fail.push('Space powered the instrument on instead of scrolling — the keyboard path to the descent\'s copy is gone.')
if (!(kb.End.y > 1000)) fail.push(`End did not jump to the gate (scrollY ${kb.End.y}).`)
if (!kb.Enter.live) fail.push('Enter did not start the instrument — the landing needs one key that does.')
if (dialFocus.role !== 'slider') fail.push(`the second tab stop is not a slider (role ${dialFocus.role}) — the tuning dials must be reachable by keyboard.`)
if (turbAfter === turbBefore) fail.push(`ArrowUp on a focused dial did not move the scene (uTurb stayed ${turbBefore}) — the dials would be pointer-only, which is the same capability loss as dropping them.`)
if (ariaAfter === dialFocus.now) fail.push(`aria-valuenow stayed at ${ariaAfter} while the value changed — a screen reader would report the wrong setting.`)
if (errs.length) fail.push(`page errors: ${errs.join(' | ')}`)

if (fail.length) { console.error('descent FAILED\n' + fail.map(f => '  · ' + f).join('\n')); process.exit(1) }
console.log(`descent ok — ${top.movements} movements, ${top.scrollHeight}px exactly, approach ${top.approach}→${gate.approach}, aperture ${top.apertureH}→${gate.apertureH}px, gate centred, 3 dials`
  + `\n  reduced motion: pinned at arrival scale (${rTop.apertureH}px, no travel)`
  + `\n  keyboard: Space scrolls to ${kb.Space.y}, End to ${kb.End.y}, Enter starts, dials turn ${turbBefore}→${turbAfter} with aria tracking`)
