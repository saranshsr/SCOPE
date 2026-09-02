#!/usr/bin/env node
// "The console is playable: every control has a key."
//
// The key map is the least visible surface in the product. Nothing on screen
// says these keys exist, so a broken one is found by a person pressing it and
// concluding the feature does not work — not by a test, a type error or a
// glance. The guard at the top of onKey() has already been wrong once (it
// named only INPUT and sliders, so Space on a focused BUTTON toggled playback
// instead of pressing the button), and the landing claimed Space for
// power-on, which made the whole descent unreadable by keyboard.
//
// So each key is pressed for real and judged by what it MOVED — never by
// whether a handler exists.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
const errs = []
p.on('pageerror', e => errs.push(e.message.slice(0, 130)))
// Mark the tour learned BEFORE the first script runs. It is modal by
// design and driver.js binds its own keydown handler, so with the tour up
// every key in the map below goes to the tour instead of the console --
// which is correct behaviour and made this check read as eleven broken
// keys. The old hand-rolled card did not trap keys, so nothing here ever
// had to think about it. The key map is a property of the console, so the
// console is what gets tested.
await p.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode: the guard below catches it */ } })
await p.goto(URL, { waitUntil: 'networkidle2' })
await new Promise(r => setTimeout(r, 3000))
await p.keyboard.press('Enter')
// Poll for the console rather than sleeping through the flight: a fixed wait
// has to be set for the slowest machine, and then every run pays it.
const bootBy = Date.now() + 20000
while (Date.now() < bootBy) {
  if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
  await new Promise(r => setTimeout(r, 250))
}
if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
  console.error('console-keys: Enter did not start the instrument, so the console was never reached.')
  await b.close(); process.exit(1)
}
// The state readouts are the .chips in the rail's foot, which lives in the
// always-rendered .rail-stack -- no panel to open. This used to click a
// `.strip button` labelled 'mix', a dome.html tab that does not exist in
// the shipped console; the call was a silent no-op and the check only kept
// working by accident.

// onKey defers to a focused control by design; the map is for the page.
await p.evaluate(() => { document.activeElement?.blur?.(); document.body.focus() })
// and if the tour opened anyway, say so rather than reporting its modal as
// eleven dead keys
if (await p.evaluate(() => !!document.querySelector('.driver-popover'))) {
  console.error('console-keys: the tour is open, so every key below would go to it. ' +
    'The localStorage guard did not take, and this run proves nothing about the key map.')
  await b.close(); process.exit(1)
}

const state = () => p.evaluate(() => { const u = window.__sc.uniforms
  return { turb: +u.uTurb.value.toFixed(3), dissect: +u.uDissect.value.toFixed(3),
           zoom: +(window.__sc.zoom ?? 0).toFixed(3),
           // The zoom's DESTINATION, known the instant the key is pressed.
           // "Stopped moving" cannot tell a finished glide from a starved
           // one -- under GPU contention the render loop stalls and three
           // consecutive samples all read still while the value is still
           // travelling. A known target removes the ambiguity: converged is
           // converged regardless of how many frames it took.
           zoomTarget: +(window.__sc.zoomTarget ?? 0).toFixed(3),
           ambient: document.querySelector('.app')?.classList.contains('ambient') ?? false,
           chips: [...document.querySelectorAll('.chips *')].map(e => e.textContent.trim()).join('|') } })

// Wait for the dampers to stop moving rather than guessing a duration.
// Zoom and dissect glide toward their target every frame, and under software
// rendering that takes far longer than it does on real hardware — a fixed
// wait reports a perfectly good key as broken because the value was still
// on its way.
//
// These glides are ASYMPTOTIC: each frame closes a fraction of the remaining
// distance, so the value approaches its target without ever stepping onto it.
// Demanding two byte-identical samples therefore waits for the tail to
// quantise at 3 decimals, which under software rendering is far longer than
// the wait allowed -- settleDown hit its deadline and returned a value still
// visibly in motion, and the case read a working key as broken. (0 - zoom
// reset reported 1.134 on its way to 1.) Earlier runs passed only because a
// faster machine happened to cross the tolerance before the deadline.
//
// So: settled means STOPPED MOVING, not IDENTICAL. Numeric readings settle
// when the step between samples falls under eps; the discrete ones (chips,
// ambient) still have to match exactly, since those do land on a value.
const NUMERIC = ['turb', 'dissect', 'zoom']
const still = (a, b, eps = 0.002) =>
  NUMERIC.every(k => Math.abs(a[k] - b[k]) < eps) &&
  a.ambient === b.ambient && a.chips === b.chips &&
  // and where a destination is known, actually be there
  Math.abs(b.zoom - b.zoomTarget) < 0.02

// One still pair is not enough either. Under software rendering the render
// loop stalls for a beat now and then, and a STALLED glide reads exactly like
// a FINISHED one -- that is how this settled at 1.394 while still travelling
// to 1. Three consecutive still samples (900ms) outlast those stalls; the
// measured reset converges in ~4s, so a true settle is never this slow.
const settleDown = async (limit = 12000) => {
  let prev = await state()
  let quiet = 0
  const deadline = Date.now() + limit
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 300))
    const now = await state()
    quiet = still(prev, now) ? quiet + 1 : 0
    prev = now
    if (quiet >= 3) return
  }
}

const press = async (keys, settle = 350) => {
  for (const k of [].concat(keys)) {
    if (k.startsWith('Shift+')) { await p.keyboard.down('Shift'); await p.keyboard.press(k.slice(6)); await p.keyboard.up('Shift') }
    else await p.keyboard.press(k)
    await new Promise(r => setTimeout(r, 180))
  }
  await new Promise(r => setTimeout(r, settle))
  await settleDown()
  return state()
}

const fail = []
// Each case names the field it OWNS. Dampers make neighbouring values drift a
// little every frame, so asserting "only this changed" would be flaky —
// assert instead that the owned field moved the way the key promises.
const cases = [
  { label: '1 · calm preset', keys: 'Digit1', check: (a, b) => b.turb < a.turb, want: 'turb down' },
  { label: '3 · wild preset', keys: 'Digit3', check: (a, b) => b.turb > a.turb, want: 'turb up' },
  { label: '2 · reset', keys: 'Digit2', check: (a, b) => Math.abs(b.turb - 1) < 0.01, want: 'turb back to 1' },
  { label: 'd · dissect', keys: 'KeyD', settle: 1800, check: (a, b) => b.dissect > 0.5, want: 'the stack opens' },
  { label: 'd · re-join', keys: 'KeyD', settle: 1800, check: (a, b) => b.dissect < a.dissect, want: 'the stack closes' },
  { label: '= · zoom in', keys: ['Equal', 'Equal'], check: (a, b) => b.zoom > a.zoom + 0.2, want: 'zoom up' },
  { label: '0 · zoom reset', keys: 'Digit0', check: (a, b) => Math.abs(b.zoom - 1) < 0.05, want: 'zoom back to 1' },
  { label: 'H · ambient on', keys: 'Shift+KeyH', check: (a, b) => b.ambient && !a.ambient, want: 'chrome hides' },
  { label: 'H · ambient off', keys: 'Shift+KeyH', check: (a, b) => !b.ambient && a.ambient, want: 'chrome returns' },
  { label: '] · filter', keys: ['BracketRight', 'BracketRight'], check: (a, b) => a.chips !== b.chips, want: 'the filter reading moves' },
  { label: '\\ · flat', keys: 'Backslash', check: (a, b) => /flt lp 0/.test(b.chips), want: 'the filter returns to flat' },
  { label: 'e · echo', keys: 'KeyE', check: (a, b) => a.chips !== b.chips, want: 'the echo reading moves' },
]
const moved = []
for (const c of cases) {
  const before = await state()
  const after = await press(c.keys, c.settle)
  if (!c.check(before, after)) fail.push(`\`${c.label}\` did nothing — expected ${c.want}. Before ${JSON.stringify(before)} after ${JSON.stringify(after)}`)
  else moved.push(c.label)
}
// THE FOCUS GUARD. onKey() must stand down when a control owns the keys.
// This has been wrong before — the guard named only INPUT and sliders, so
// Space on a focused BUTTON hit `case 'Space'`, whose preventDefault()
// suppressed the button's own activation and MUTE, SKIP, SPLIT, the sources
// and the tour's NEXT all toggled playback instead of firing.
// The dials are 04 · VISUALS in the rail, always rendered -- .console-dials
// holds the three Dial components, each role="slider" with aria-label={cap}.
// This used to open a `.strip` tab and focus `.panel.open [role=slider]`,
// both dome.html names, so the focus() found nothing and the arrow keys
// went to the page instead of the control. That was the whole of this
// check's one failure: the other eleven key cases were passing.
const focused = await p.evaluate(() => {
  const d = document.querySelector('.console-dials [role="slider"][aria-label="turb"]')
  if (!(d instanceof HTMLElement)) return false
  d.scrollIntoView({ block: 'nearest' })
  d.focus()
  return document.activeElement === d
})
if (!focused) {
  console.error('console-keys: the turb dial could not be focused at ' +
    '`.console-dials [role="slider"][aria-label="turb"]`, so the focused-control ' +
    'case was never exercised and this run proves nothing about it.')
  await b.close(); process.exit(1)
}
const gT0 = await p.evaluate(() => +window.__sc.uniforms.uTurb.value.toFixed(3))
for (let i = 0; i < 3; i++) { await p.keyboard.press('ArrowUp'); await new Promise(r => setTimeout(r, 130)) }
await new Promise(r => setTimeout(r, 500))
const gT1 = await p.evaluate(() => +window.__sc.uniforms.uTurb.value.toFixed(3))
if (!(gT1 > gT0)) fail.push(`ArrowUp on the focused turb dial did not move it (${gT0} -> ${gT1}) — a focused control must own its own keys.`)

// Typing must never trigger the map. "dead ease" contains d and e, which
// dissect the star and raise the echo — in a text field they are letters.
const typed = await p.evaluate(() => {
  const inp = [...document.querySelectorAll('input')].find(e => /vibe/i.test(e.placeholder || ''))
  if (!inp) return null
  inp.focus(); return document.activeElement === inp })
if (typed) {
  const dBefore = await p.evaluate(() => +window.__sc.uniforms.uDissect.value.toFixed(3))
  await p.keyboard.type('dead ease')
  await new Promise(r => setTimeout(r, 1400))
  const after = await p.evaluate(d => ({ dissect: +window.__sc.uniforms.uDissect.value.toFixed(3),
    value: ([...document.querySelectorAll('input')].find(e => /vibe/i.test(e.placeholder || '')) || {}).value }), dBefore)
  if (after.dissect > dBefore + 0.05) fail.push(`typing in the vibe field dissected the star (uDissect ${dBefore} -> ${after.dissect}) — the map is firing inside a text input.`)
  if (after.value !== 'dead ease') fail.push(`the vibe field received "${after.value}" instead of "dead ease" — keystrokes are being swallowed before the input sees them.`)
}

if (errs.length) fail.push(`page errors while driving the map: ${errs.join(' | ')}`)
await b.close()

if (fail.length) { console.error(`console-keys FAILED (${fail.length}/${cases.length})\n` + fail.map(f => '  · ' + f).join('\n')); process.exit(1) }
console.log(`console-keys ok — ${moved.length}/${cases.length} keys drove the instrument: ${moved.map(m => m.split(' ')[0]).join(' ')}`
  + `\n  focus guard: a focused dial owns its arrows, and typing "dead ease" stays text`)
