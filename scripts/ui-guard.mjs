#!/usr/bin/env node
// The star does not answer to the console.
//
// The star's gestures are bound at the window, so every pointerdown on a
// control is also a pointerdown on the field behind it. One selector in
// App.tsx decides which surfaces stand the star down:
//
//   '.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]'
//
// and it fails in two very different ways:
//   · on pointerdown, LOUDLY -- dragging a transport control flings the star
//     across the room and changes the mix while you meant to press a button;
//   · on pointermove, QUIETLY -- the field twitches under your hand whenever
//     you reach for anything, and nobody can say why.
// Neither shows up in a build, a type check, or a screenshot.
//
// So this presses and drags on every visible NON-interactive console surface
// and asserts the star held still.
//
// It used to name `.floor`, `.strip button` and `.panel.open ...`, which are
// the mockup in public/dome.html and not the shipped console. Every one of
// them matched zero elements, so the sweep was empty and the check reported
// ok for the whole build. A selector list is a claim about what was tested,
// and it rots silently (CHECKS.md §4). The targets below are the shipped
// rail, header and footer.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
const errs = []
p.on('pageerror', e => errs.push(e.message.slice(0, 130)))

// THE TOUR MUST NOT BE IN THE ROOM. It covers the whole middle of the plate,
// and `elementFromPoint` at a rail heading then returns the tour card: every
// "console surface" this check pressed was the tour, and the guard it exists
// to test was never involved (CHECKS.md §4, fault 3).
//
// The old defence clicked a button reading "not now". The tour is driver.js
// now and has no such button, so that poll matched nothing and dismissed
// nothing while still reporting success -- the same rot as the selectors.
// Seeding the "already learned" key is deterministic and needs no polling:
// it is the returning-visitor state, which is a real state of the product,
// and the tour is not this law's subject. It is still asserted absent below,
// because a suppression that silently stopped working is exactly how this
// check went blind the first time.
await p.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode: the assert below catches it */ } })

await p.goto(URL, { waitUntil: 'networkidle2' })
await new Promise(r => setTimeout(r, 2500))
await p.keyboard.press('Enter')
const liveBy = Date.now() + 25000
while (Date.now() < liveBy) {
  if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
  await new Promise(r => setTimeout(r, 250))
}
if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
  console.error('ui-guard: the app never reached the live console, so there were no console surfaces to press.')
  console.error('  This is the harness, NOT the product guard. Nothing about the star was tested.')
  await b.close(); process.exit(1)
}
await new Promise(r => setTimeout(r, 2000))
if (await p.evaluate(() => !!document.querySelector('.driver-popover, .driver-active, .onboard'))) {
  console.error('ui-guard: the tour is still on screen, so every surface pressed would be the tour and not the console. This check is stale and is NOT passing.')
  await b.close(); process.exit(1)
}

// PULL THE STAR APART FIRST, and this is not decoration.
//
// Whole, the only place a gesture can start is the star's own body, and at
// 1440x900 the body sits at roughly x 700..940 / y 340..580 -- the bare
// stage. No rail, header or footer pixel overlaps it, so every press below
// would be held still by GEOMETRY and the guard would never be asked
// anything. That is fault 1 of §4, and it is what made this check
// undeletable-but-useless for a whole build.
//
// Dissected, App.tsx opens two much wider doors: the axis grab takes any
// pointerdown within 30px of the star's centre column, and a tier drag takes
// a broad band around each ring. The footer line runs straight through that
// column. So this state is where the guard is load-bearing, and it is a
// perfectly ordinary state of the product.
const readD = () => p.evaluate(() => window.__sc?.uniforms?.uDissect?.value ?? 0)
{
  // Re-press only if the press was DROPPED. `d` is a toggle, so pressing
  // again while the damper is still gliding reverses it and leaves the room
  // half open (CHECKS.md §2.7). One extra reading is the whole difference
  // between a retry and a fight.
  await p.evaluate(() => { document.activeElement?.blur?.(); document.body.focus() })
  let opened = false
  for (let attempt = 0; attempt < 3 && !opened; attempt++) {
    const from = await readD()
    await p.keyboard.press('KeyD')
    const by = Date.now() + 9000
    let moved = false
    while (Date.now() < by) {
      const d = await readD()
      if (d > 0.6) { opened = true; break }
      if (Math.abs(d - from) > 0.02) moved = true
      await new Promise(r => setTimeout(r, 200))
    }
    if (moved && !opened) break
  }
  if (!opened) {
    console.error(`ui-guard: pressing d did not open the stack (uDissect ${(await readD()).toFixed(2)}), so the star's centre column was never live and no press could have hijacked it.`)
    console.error('  This is the harness failing to reach the state it measures, NOT the product guard. It is reported rather than passed, because a sweep over a room where nothing can go wrong passes in green.')
    await b.close(); process.exit(1)
  }
}
// SETTLE ON THE DESTINATION, not on a sleep. The seam is damped and `d`
// drives it to 1, so a baseline taken mid-glide from 0.7 drifts 0.3 on its
// own and the "a press moved the seam" rule fires on nothing at all. Poll to
// the destination, and fall back to "it stopped moving" for the case where
// a starved rasteriser never quite arrives (CHECKS.md §1.1).
{
  const by = Date.now() + 8000
  let last = -1
  while (Date.now() < by) {
    const d = await readD()
    if (d >= 0.97 || Math.abs(d - last) < 0.002) break
    last = d
    await new Promise(r => setTimeout(r, 250))
  }
}

// What the star looks like when nothing is touching it. `mix` is the gesture
// state the drag would change; focus/dolly are where a fling would show.
const star = () => p.evaluate(() => { const s = window.__sc
  const cls = document.querySelector('.app')?.classList
  return { fx: +s.focusFrac.toFixed(4), fy: +s.focusFracY.toFixed(4),
           dolly: +s.dolly.toFixed(3), dissect: +s.uniforms.uDissect.value.toFixed(3),
           grab: +(s.uniforms.uGrabStr?.value ?? 0).toFixed(3),
           // THE APP SAYS SO ITSELF. uGrabStr and the aim only move for the
           // MIX gesture; the AXIS grab (the dissect seam down the star's
           // centre) sets neither -- it just flags `grabbing` and returns.
           // So a drag on a control at the centre column hijacked the star
           // completely while all three numeric assertions read clean. The
           // class is the honest signal: it means a gesture started.
           gesture: !!(cls?.contains('grabbing') || cls?.contains('mixing')) } })

// THE NON-INTERACTIVE CONSOLE SURFACES: module headings, layer names, the
// deck's meta rows, the dock's labels, the header's readouts, the footer's
// three cells, the state chips. Interactive elements are covered by the
// guard's own `button, input, a, [role="slider"]` terms, so a sweep of those
// passes even with every CONTAINER term deleted -- the check would be
// vacuous for precisely the terms it exists to protect. Only `.rail`,
// `.cn-hdr` or `.cn-ftr` can stand the star down over these.
const SURFACES = '.rail .cn-mod, .rail .layer-name, .rail .deck-meta, .rail .level-tag, '
  + '.rail .spec-hz, .rail .cn-hint, .rail .tuner-state, .cn-hdr > div, .cn-ftr span, .chips .chip'

// The star's centre column, mirroring `centerPx()` in App.tsx. If that
// formula ever drifts the POSITIVE CONTROL at the end catches it: it presses
// exactly here and demands a gesture.
const centreX = await p.evaluate(() => (innerWidth > 720 ? 320 + (innerWidth - 320) / 2 : innerWidth / 2))
const dissectNow = await readD()

const targets = await p.evaluate(({ sel, cx, dis }) => {
  const INTERACTIVE = 'button, a, input, select, textarea, [role="slider"], [contenteditable]'
  const out = []
  for (const e of document.querySelectorAll(sel)) {
    const r = e.getBoundingClientRect()
    const cs = getComputedStyle(e)
    if (!(r.width > 6 && r.height > 6)) continue
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue
    // the rail scrolls; a surface below the fold cannot be pressed
    if (r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) continue
    const y = Math.round(r.top + r.height / 2)
    // AIM THE PRESS, do not take the centre and hope. `layout` was faulted
    // for testing every control at its centre only, and the same narrowing
    // is fatal here: the footer's middle cell spans x 183..1334, its centre
    // is 121px clear of the star's column, and its 880 is right down the
    // seam. Pressing the centre proves nothing; pressing the seam is the
    // whole law. So try the column first, then across the box.
    const xs = []
    if (cx > r.left + 4 && cx < r.right - 4) xs.push(Math.round(cx))
    for (const f of [0.5, 0.15, 0.3, 0.7, 0.85]) xs.push(Math.round(r.left + r.width * f))
    let pick = null
    for (const x of xs) {
      const top = document.elementFromPoint(x, y)
      // something else is painted over this pixel: pressing it would test
      // that thing instead, quietly, which is how the tour ate this check
      if (!top || !e.contains(top)) continue
      // an interactive descendant (the footer's diag button, the deck's
      // artist link). The guard's own `button`/`a` terms cover those, so
      // pressing one lets a deleted container term pass.
      if (top.closest(INTERACTIVE)) continue
      // "hot" = a press here would start a gesture if the guard were gone,
      // asked of the app's own primitives. A deliberate UNDER-estimate: the
      // tier-pick band is wider still, and undercounting only ever makes the
      // falsifiability guard below stricter.
      const hot = !!window.__sc.bodyHit((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1)
        || (dis > 0.3 && Math.abs(x - cx) < 30)
      if (!pick || (hot && !pick.hot)) pick = { x, y, hot }
      if (hot) break
    }
    if (!pick) continue
    // Name it so a failure can be found by hand. Several of these surfaces
    // carry no class of their own (the footer's cells, the header's brand),
    // and `span` alone in a failure line is not an address.
    const name = el => {
      const c = (typeof el.className === 'string' ? el.className : '').split(' ').filter(Boolean)[0]
      return el.tagName.toLowerCase() + (c ? '.' + c : '')
    }
    out.push({ label: e.parentElement ? `${name(e.parentElement)} > ${name(e)}` : name(e),
               x: pick.x, y: pick.y, hot: pick.hot })
  }
  return out.slice(0, 40)
}, { sel: SURFACES, cx: centreX, dis: dissectNow })

const fail = []
const hot = targets.filter(t => t.hot)
// `UI_GUARD_DUMP=1` prints what was actually pressed and where. The list of
// surfaces this check swept is the claim it makes, and the one way that
// claim rots is nobody ever looking at it.
if (process.env.UI_GUARD_DUMP) console.log(targets.map(t => `  ${t.hot ? 'HOT ' : '    '}${t.label} @ ${t.x},${t.y}`).join('\n'))

const before = await star()
for (const t of targets) {
  await p.mouse.move(t.x, t.y)
  await new Promise(r => setTimeout(r, 90))
  await p.mouse.down()
  // A real drag, not a click: 60px is well past any gesture threshold.
  for (let i = 1; i <= 5; i++) { await p.mouse.move(t.x + i * 12, t.y + i * 8); await new Promise(r => setTimeout(r, 35)) }
  // SAMPLE WHILE THE POINTER IS STILL DOWN. This used to read the star 200ms
  // AFTER mouse.up -- by which time a hijacked grab has released and
  // uGrabStr has decayed back to 0, and the aim has sprung back. The check
  // was looking at the scene of the crime after everything had been tidied
  // up, which is why removing a container term from the pointer guard did
  // not make it fail: the fling happened and then undid itself before it was
  // measured. This is the whole reason the check was unfalsifiable.
  const during = await star()
  await p.mouse.up()
  await new Promise(r => setTimeout(r, 200))
  const settled = await star()
  // Take the worst of the two: a grab shows while held, and a fling that
  // moves the aim can persist after release.
  const now = { fx: Math.abs(during.fx - before.fx) > Math.abs(settled.fx - before.fx) ? during.fx : settled.fx,
                fy: Math.abs(during.fy - before.fy) > Math.abs(settled.fy - before.fy) ? during.fy : settled.fy,
                dolly: settled.dolly,
                dissect: Math.abs(during.dissect - before.dissect) > Math.abs(settled.dissect - before.dissect) ? during.dissect : settled.dissect,
                grab: Math.max(during.grab, settled.grab),
                gesture: during.gesture || settled.gesture }
  const where = t.hot ? ' (pressed on the star\'s centre column, where the guard is the only thing in the way)' : ''
  // Dolly and dissect are damped and drift a hair every frame; the aim
  // (fx/fy) and the grab strength are what a hijacked gesture moves.
  if (Math.abs(now.fx - before.fx) > 0.02 || Math.abs(now.fy - before.fy) > 0.02)
    fail.push(`dragging \`${t.label}\` moved the star's aim (${before.fx},${before.fy} -> ${now.fx},${now.fy})${where}. The pointerdown guard is not standing the star down over that surface.`)
  if (now.grab > 0.05)
    fail.push(`dragging \`${t.label}\` started a grab on the star (uGrabStr ${now.grab})${where}. Pressing a label is mixing the audio.`)
  if (Math.abs(now.dissect - before.dissect) > 0.2)
    fail.push(`dragging \`${t.label}\` moved the dissect seam (${before.dissect} -> ${now.dissect})${where}.`)
  if (now.gesture)
    fail.push(`dragging \`${t.label}\` started a star gesture${where}. The app entered grabbing/mixing, so a press on a console surface is driving the instrument.`)
}

// ── THE POSITIVE CONTROL ────────────────────────────────────────────────
// Everything above is a sweep of NEGATIVES, and a sweep of negatives passes
// beautifully against a dead instrument: if the gesture machinery never
// arms, if the star never rendered, if `centerPx()` moved, then "no gesture
// started" is true everywhere and means nothing. §8 asks what the assertion
// would say about a broken build; without this arm the answer is "the same
// thing".
//
// So, last (a drag on the seam pulls the stack shut, which would poison the
// sweep if it ran first): press the SAME column on the bare stage, which no
// term of the guard covers, and demand a gesture. If none starts, the sweep
// above proved nothing and this says so instead of passing.
const control = await (async () => {
  const x = Math.round(centreX), y = Math.round(await p.evaluate(() => innerHeight / 2))
  const overUi = await p.evaluate(({ x, y }) => {
    const el = document.elementFromPoint(x, y)
    return el ? !!el.closest('.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]') : true
  }, { x, y })
  if (overUi) return { ok: false, why: `the stage centre (${x},${y}) is itself covered by a guarded surface, so there is nowhere unguarded left to prove the gesture arms` }
  await p.mouse.move(x, y)
  await new Promise(r => setTimeout(r, 90))
  await p.mouse.down()
  for (let i = 1; i <= 5; i++) { await p.mouse.move(x, y - i * 10); await new Promise(r => setTimeout(r, 35)) }
  const s = await star()
  await p.mouse.up()
  await new Promise(r => setTimeout(r, 200))
  return { ok: s.gesture, why: `dragging the bare stage at (${x},${y}) started no gesture (grab ${s.grab}, dissect ${s.dissect})` }
})()

if (!targets.length)
  fail.push('no console surfaces were found to press. The selector list names surfaces that do not exist, so this check swept nothing and is NOT passing.')
else if (!hot.length)
  fail.push(`none of the ${targets.length} surfaces pressed sits anywhere a gesture could have started, so GEOMETRY held the star still and the guard was never asked a question. That is a check that cannot fail (CHECKS.md §4), and it is reported rather than passed.`)
if (!control.ok)
  fail.push(`the positive control failed: ${control.why}. The star's gestures never armed, so "no console surface moved the star" is true of a dead instrument too and this sweep proved nothing.`)
if (errs.length) fail.push(`page errors: ${errs.join(' | ')}`)
await b.close()

if (fail.length) { console.error('ui-guard FAILED\n' + [...new Set(fail)].map(f => '  · ' + f).join('\n')); process.exit(1) }
console.log(`ui-guard ok — pressed and dragged ${targets.length} non-interactive console surfaces with the stack open, the star held still`
  + `\n  ${hot.length} of them were pressed where a gesture WOULD have started unguarded: ${hot.map(t => t.label).join(', ')}`
  + `\n  and the bare stage at the same column did start one, so the instrument was armed throughout`)
