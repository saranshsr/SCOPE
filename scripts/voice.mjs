#!/usr/bin/env node
// "em-dashes in user-visible copy" is a named anti-pattern (DESIGN.md §6,
// Anti-patterns), and it is the one anti-pattern with no natural failure
// signal: an em dash renders beautifully, breaks nothing, and reads fine to
// whoever wrote it. It is only ever caught by someone who knows the house
// rule looking at the exact string.
//
// (The citation used to read "§12". There is no §12 -- DESIGN.md ends at §6
// -- so anyone following the reference to check the rule found nothing and
// had to take the check's word for it. A rule nobody can look up is a rule
// nobody can argue with, which is the opposite of what a constitution is
// for.)
//
// It cannot be grepped. Source is ~85% comments by line in App.tsx, prose
// comments legitimately use em dashes, and a JSX text node and a block-comment
// continuation line are indistinguishable to a regex -- a grep for user-visible
// dashes returned 49 hits of which 2 were real. So this renders the product,
// walks the text nodes that are actually PAINTED, and judges those.
//
// Reaching the copy is the work: four of the six dashes this check was written
// for lived in source-specific branches (mic, stems, tube) that only exist once
// that source is chosen. A check that only read the landing would have called
// the build clean.
import puppeteer from 'puppeteer'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
// A synthetic capture device, so `mic` actually resolves and mounts its
// branch. Without these, useMic() rejects on a machine with no microphone,
// `source` never becomes 'mic', and the mic copy is never rendered -- the
// check then reports clean over text it never saw.
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox',
  '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
// mic would otherwise sit on a permission prompt and never render its branch
await b.defaultBrowserContext().overridePermissions(new URL_(URL).origin, ['microphone']).catch(() => {})
function URL_(u) { return new globalThis.URL(u) }
const sleep = ms => new Promise(r => setTimeout(r, ms))

// The `file` branch cannot be reached by clicking its own button: that button
// calls fileRef.click(), which opens the OS file chooser, and puppeteer has no
// answer for it -- `source` stays whatever it was and the .MP3 deck line, the
// stems fold and every other file-only string go unread. So the file arrives
// the way the app actually receives one, through the hidden input, and it has
// to be DECODABLE: an undecodable upload is the failure path (failure-states
// owns that one) and bounces straight back to the radio, which would leave
// this sweep reading radio copy under a `file` label.
const dir = mkdtempSync(join(tmpdir(), 'scope-voice-'))
const wav = join(dir, 'tone.wav')
{
  const sr = 44100, n = sr * 6, buf = Buffer.alloc(44 + n * 2)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8)
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22)
  buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34)
  buf.write('data', 36); buf.writeUInt32LE(n * 2, 40)
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(Math.sin((2 * Math.PI * 110 * i) / sr) * 22000), 44 + i * 2)
  writeFileSync(wav, buf)
}

const seen = new Map()
const harvest = async where => {
  const rows = await p.evaluate(() => {
    const out = []
    // document.body, not the app root, and that is deliberate: the tour is
    // driver.js now and its popover is appended to the body, OUTSIDE
    // <div class="app">. It is also the largest single block of prose the
    // product owns -- six lessons plus the whole keyboard legend. Walking
    // only the app subtree would leave the most em-dash-prone copy in the
    // build unjudged while the check printed ok.
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let n
    while ((n = w.nextNode())) {
      const t = n.textContent.replace(/\s+/g, ' ').trim()
      if (!t) continue
      const el = n.parentElement
      if (!el) continue
      const cs = getComputedStyle(el)
      // painted only: a collapsed .railfold is not copy anyone can read.
      // `.railfold:not(.open) > *` is visibility:hidden, so this filter is
      // what makes the fold sweep below mean anything.
      if (cs.visibility === 'hidden' || cs.opacity === '0' || cs.display === 'none') continue
      // the tour popover is position:fixed and has no offsetParent, hence
      // the second clause -- dropping it would silently skip the tour again
      if (!el.offsetParent && cs.position !== 'fixed') continue
      out.push({ t, cls: (el.className?.toString?.() || el.tagName).slice(0, 34) })
    }
    return out
  })
  rows.forEach(r => { if (!seen.has(r.t)) seen.set(r.t, `${where} · ${r.cls}`) })
  return rows.length
}

const die = async msg => { console.error(msg); await b.close(); process.exit(1) }

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
await sleep(3000)
for (const f of [0, 0.34, 0.67, 1]) {
  await p.evaluate(x => scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * x, behavior: 'instant' }), f)
  await sleep(800)
  await harvest('descent')
}
await p.keyboard.press('Enter')
const by = Date.now() + 20000
while (Date.now() < by) {
  if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
  await sleep(250)
}
if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
  await die('voice: never reached the console, so most copy was never rendered.')
}
await sleep(2500)
await harvest('room')

// ---- the tour -------------------------------------------------------------
// Powering on opens the calibration tour on any visit that has not finished
// it, and a fresh puppeteer profile has an empty localStorage, so it is up
// right now. Two reasons it is walked rather than dismissed:
//   1. it is copy, and this check judges copy. Six lesson bodies and the
//      legend live nowhere else in the DOM.
//   2. its overlay swallows clicks on everything it has not highlighted, so
//      the source sweep below cannot start until it is gone anyway.
// Each `next` is a separate step whose body only exists while it is the
// current step, so the walk has to be a walk.
let tourSteps = 0
{
  const tourBy = Date.now() + 12000
  while (Date.now() < tourBy && !(await p.evaluate(() => !!document.querySelector('.driver-popover')))) await sleep(250)
  if (!(await p.evaluate(() => !!document.querySelector('.driver-popover')))) {
    await die('voice: the tour never opened, so six lessons and the whole keyboard legend went unread. If the tour was retired, delete this block; if it did not open, this run proves nothing about the copy it holds.')
  }
  for (let i = 0; i < 12; i++) {
    await sleep(600) // driver repositions the popover after it mounts
    await harvest(`tour:${i + 1}`)
    tourSteps++
    const advanced = await p.evaluate(() => {
      const n = document.querySelector('.driver-popover-next-btn')
      if (!n) return false
      n.click()
      return true
    })
    if (!advanced) break
    await sleep(700)
    // the last step's button is the DONE button, which destroys the tour
    if (!(await p.evaluate(() => !!document.querySelector('.driver-popover')))) break
  }
  // whatever we stopped on, the room has to be clear before anything can be
  // clicked. Assert it, do not assume it (CHECKS.md §2.6).
  await p.evaluate(() => document.querySelector('.driver-popover-close-btn')?.click())
  const goneBy = Date.now() + 6000
  while (Date.now() < goneBy && (await p.evaluate(() => !!document.querySelector('.driver-popover')))) await sleep(250)
  if (await p.evaluate(() => !!document.querySelector('.driver-popover'))) {
    await die('voice: the tour would not close, so its overlay is still eating clicks and the source sweep below would sweep nothing.')
  }
}
if (tourSteps < 2) {
  await die(`voice: walked ${tourSteps} tour step(s). The tour is six lessons long; one step means the walk never advanced and five bodies were never painted.`)
}

// ---- the sweep ------------------------------------------------------------
// Every source paints its own branch copy, and the picker is the rail's
// radiogroup -- NOT anything inside a tabbed strip. The first draft of this
// check guessed `.src-pick button` and silently matched nothing, so a planted
// em dash in the mic branch passed clean; the second draft was re-pointed at
// `.srcs button`, which was dome.html's name for it and matched nothing
// either, for another whole build. Assert the picker is really there.
const SRC = '.rail-src button'
// Read the labels ONCE and address the buttons by index from here on. Each
// one is a <Decode replayOnHover>, so a real mouse click scrambles its own
// label on pointerenter and a name-matching click finds `x:>=@` instead of
// `radio`. Indices do not scramble.
const srcs = await p.evaluate(sel => [...document.querySelectorAll(sel)].map(b => b.textContent.trim()), SRC)
if (srcs.length < 4) {
  await die(`voice: found ${srcs.length} source buttons at \`${SRC}\`, and the console ships four (radio / file / mic / tube). The per-source copy was never rendered and this run proves nothing.`)
}

const selected = () => p.evaluate(sel => [...document.querySelectorAll(sel)].findIndex(b => b.getAttribute('aria-checked') === 'true'), SRC)
const stackOpen = () => p.evaluate(() => !!document.querySelector('.railfold.open .layers'))

// The old cross product was sources x `.strip button`, a tabbed panel strip
// that does not exist: the console is one scrolling `.rail`, and what used to
// be panels are `.railfold`s whose open state is DERIVED, not clicked. Four of
// the five folds are opened by the source itself (transport by anything but
// mic, stems by radio/file with a track, jukebox by tube, tuner by radio); the
// fifth is the layers stack, opened by `d`. So the honest cross product now is
// the four sources against that one gesture -- and it is still a cross product
// for the same reason it always was: `.cn-hint` says different things at
// tube+open than at tube+closed, and sweeping the two axes separately never
// intersects them.
const setStack = async want => {
  if ((await stackOpen()) === want) return true
  await p.keyboard.press('KeyD')
  // Poll for the state, never sleep for it: the dissect damper glides, and
  // closing measured slower than opening. And press ONCE -- `d` is a toggle,
  // so a retry is not a retry, it is an undo (CHECKS.md §2.7).
  const until = Date.now() + 9000
  while (Date.now() < until) {
    if ((await stackOpen()) === want) return true
    await sleep(250)
  }
  return false
}

const missed = []
let sawOpen = 0, sawClosed = 0
for (let i = 0; i < srcs.length; i++) {
  if (srcs[i] === 'file') {
    const input = await p.$('input[type=file]')
    if (!input) { missed.push('file: no file input to drive'); continue }
    await input.uploadFile(wav)
  } else {
    await p.evaluate((sel, k) => document.querySelectorAll(sel)[k]?.click(), SRC, i)
  }
  // A click is not a source change. mic can be refused, tube can fail to
  // mount, an upload can bounce back to the radio -- and each of those leaves
  // the previous source's copy on screen under the new source's label, which
  // is a sweep reading the same room four times and calling it four rooms.
  const armed = Date.now() + 12000
  let ok = false
  while (Date.now() < armed) {
    if ((await selected()) === i) { ok = true; break }
    await sleep(300)
  }
  if (!ok) { missed.push(`${srcs[i]}: never became the selected source`); continue }
  await sleep(1200) // let the folds finish their 450ms grid-template-rows glide

  for (const want of [false, true]) {
    if (!(await setStack(want))) { missed.push(`${srcs[i]}: the layers stack never went ${want ? 'open' : 'closed'}`); continue }
    await sleep(600)
    const n = await harvest(`${srcs[i]}+stack:${want ? 'open' : 'closed'}`)
    if (!n) { missed.push(`${srcs[i]}/${want ? 'open' : 'closed'}: harvested 0 painted strings`); continue }
    if (want) sawOpen++; else sawClosed++
  }
}

// The emptiness guard, restated for the new sweep. Its whole job is to make
// "found nothing" impossible to mistake for "found nothing wrong": this check
// reported clean twice while rendering none of the copy it was judging, and
// then reported clean for a whole build against selectors that had been
// renamed out from under it.
if (missed.length) {
  console.error('voice: the sweep did not sweep, so a clean result would prove nothing:')
  missed.forEach(m => console.error(`  · ${m}`))
  await b.close(); process.exit(1)
}
if (sawOpen < srcs.length || sawClosed < srcs.length) {
  await die(`voice: covered ${sawClosed} closed and ${sawOpen} open stack states across ${srcs.length} sources; both should equal ${srcs.length}.`)
}
if (seen.size < 60) {
  await die(`voice: only ${seen.size} distinct painted strings across the whole run. The console alone paints ~60; this is a harvest that lost the room, not a quiet product.`)
}

const bad = [...seen.entries()].filter(([t]) => /—/.test(t))
if (bad.length) {
  console.error(`voice FAILED -- ${bad.length} em-dash${bad.length > 1 ? 'es' : ''} in user-visible copy (DESIGN.md §6 anti-pattern):`)
  bad.forEach(([t, w]) => console.error(`  · [${w}] ${t.slice(0, 116)}`))
  await b.close(); process.exit(1)
}
console.log(`voice ok -- ${seen.size} rendered strings across descent, room, ${tourSteps} tour steps and ${srcs.length} sources x stack open/closed carry no em dash`)
await b.close()
