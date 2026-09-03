#!/usr/bin/env node
// A REDUCED-MOTION VISITOR STILL GETS A CURSOR.
//
// This exists because that was untrue for the whole life of the feature and
// nothing noticed. §8's reduced-motion path does two things: it hides the
// drawn reticle, and it hands the OS pointer back. The second half never
// fired. `.app.cursor-armed *` is (0,2,0) and carries !important; the
// restoration was written `.app, .app *`, which is (0,1,0), and a media query
// grants no extra weight. The stronger selector won at every breakpoint, so
// the reticle was hidden AND the native cursor stayed suppressed underneath
// it. A visitor who asks for less motion, on a mouse, had no cursor at all.
//
// motion.mjs could not have caught it. That check reads styles.css as TEXT --
// durations and easing keywords -- and this was never wrong in the source.
// Both rules said exactly what their authors meant; the cascade decided which
// one was true. Only a browser can answer that, which is the whole reason
// this file is a browser check and not another grep.
//
// It also covers the second half of the same fault: `button, a, input` names
// none of this product's sliders. The seek strip is a canvas and the dials
// are divs, both role="slider", so both sat under a plain arrow while being
// draggable.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const fail = []

const b = await puppeteer.launch({ args: ['--enable-unsafe-swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await p.evaluateOnNewDocument(() => {
  try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode: the guard below catches it */ }
})
await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise((r) => setTimeout(r, 6000))

// The bug only appears once the reticle has armed, because .cursor-armed is
// the class that outranked the restoration. Arming it is the test.
await p.mouse.move(700, 400)
await new Promise((r) => setTimeout(r, 400))

const probe = () => p.evaluate(() => {
  const app = document.querySelector('.app')
  const cur = (sel) => {
    const el = document.querySelector(sel)
    return el ? getComputedStyle(el).cursor : null
  }
  const reticle = document.querySelector('.reticle')
  return {
    armed: !!app?.classList.contains('cursor-armed'),
    reticleShown: !!reticle && getComputedStyle(reticle).display !== 'none',
    app: app ? getComputedStyle(app).cursor : null,
    controls: {
      'POWER ON': cur('.pl-act .power'),
      'a dial': cur('.pl-dial'),
      'the seek strip': cur('.deck-wave'),
      'the help button': cur('.rail-help'),
    },
  }
})

// BOTH SHEETS. The seek strip lives in the console and the dials live on the
// standby plate, so a single sample can only ever see half the product -- and
// the half it misses reports as "not on the page", which the guard below
// correctly refuses to call a pass.
const seen = await probe()
await p.evaluate(() => document.querySelector('.pl-act .power')?.click())
await new Promise((r) => setTimeout(r, 9000))
await p.mouse.move(720, 420)
await new Promise((r) => setTimeout(r, 400))
const console_ = await probe()
for (const [k, v] of Object.entries(console_.controls)) {
  if (seen.controls[k] === null) seen.controls[k] = v
}
if (console_.reticleShown) seen.reticleShown = true
if (console_.app === 'none') seen.app = 'none'

// ── emptiness guards: a sweep that found nothing is not a pass ──────────
if (!seen.app) {
  fail.push('no .app on the page, so nothing about cursors was measured. This check is stale and is NOT passing.')
} else if (!seen.armed) {
  // Without this the whole check passes trivially: unarmed, the native
  // cursor is showing anyway and the bug is invisible.
  fail.push(
    'the reticle never armed, so the one state this check exists for was never entered. ' +
      '.cursor-armed is the class that outranked the reduced-motion restoration; measured with it absent, this run proves nothing.',
  )
}

const named = Object.entries(seen.controls).filter(([, v]) => v !== null)
if (named.length < 4) {
  fail.push(
    `only ${named.length} of 4 named controls were reached across both sheets, so the ones that were missing went unchecked. ` +
      'Re-point the selectors at the shipped app.',
  )
}

// ── the laws ────────────────────────────────────────────────────────────
if (seen.reticleShown) {
  fail.push('the drawn reticle is still displayed under prefers-reduced-motion. §8 says it goes.')
}

if (seen.app === 'none') {
  fail.push(
    'the app suppresses the native cursor under prefers-reduced-motion while the reticle that replaces it is hidden, ' +
      'so there is no pointer on screen at all. Whatever restores it has to out-specify `.app.cursor-armed *`, which is (0,2,0) and !important.',
  )
}

for (const [label, value] of named) {
  if (value === 'none') {
    fail.push(`${label} reports cursor: none with no reticle to stand in for it, so it cannot be pointed at.`)
  }
}
// A control you drag should not read as ordinary text or an arrow.
const drag = { 'the seek strip': 'crosshair', 'a dial': 'ns-resize' }
for (const [label, want] of Object.entries(drag)) {
  const got = seen.controls[label]
  if (got && got !== 'none' && got !== want) {
    fail.push(`${label} is draggable but reports cursor: ${got} rather than ${want}, so its affordance is not stated.`)
  }
}

await b.close()

if (fail.length) {
  console.error('reduced-motion FAILED')
  for (const f of fail) console.error(`  · ${f}`)
  process.exit(1)
}
console.log(
  `reduced-motion ok — reticle hidden, native pointer restored (app: ${seen.app}), ` +
    `${named.length} controls each naming themselves: ` +
    named.map(([k, v]) => `${k} ${v}`).join(' · '),
)
