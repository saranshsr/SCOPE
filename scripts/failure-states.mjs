#!/usr/bin/env node
// What the room says when something goes WRONG.
//
// Every other check drives the happy path: a track plays, a key moves a
// value, a fold opens. The failure states -- a file that will not decode,
// a split that dies -- were the last unaudited surface in the build, and
// they are the ones where "safe space" (law 2) is actually tested. A room
// that goes silent and says nothing is not calm, it is broken.
//
// The bar is three things, and they are the bar because each has its own
// way of going wrong quietly:
//   1. it SAYS something legible -- not blank, not a stack trace
//   2. it does not get STUCK -- a spinner with no end is worse than an error
//   3. it RECOVERS -- sound comes back without the user reloading
//
// Written after reading the code suggested a bug that was not there: the
// decode path's `.then()` has no `.catch`, which looks like a hang waiting
// to happen, but `peaksFromFile` catches internally and resolves to null.
// The code review was wrong and driving the actual failure was right, which
// is the reason this check drives a real corrupt file rather than mocking.
//
// It was then wrong for a second, quieter reason for a whole build: it read
// the room through `.nowline` / `.nowline-sub` / `.read-level .v i`, which
// are public/dome.html's names -- a mockup of a redesign that was never
// built. All three matched zero elements, so `say()` returned three empty
// strings on every poll and the check failed reporting that a corrupt file
// "produced no legible message". The product had been saying the right thing
// the whole time. That is the exact failure mode CHECKS.md §2 is about, and
// the reason every assertion below is now fronted by a count.
import puppeteer from 'puppeteer'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const dir = mkdtempSync(join(tmpdir(), 'scope-fail-'))
const bad = join(dir, 'not-really-audio.mp3')
// 60KB of noise with an .mp3 name: passes the `accept` filter, fails decode
writeFileSync(bad, Buffer.from(Array.from({ length: 60000 }, (_, i) => (i * 2654435761) & 0xff)))

const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
const sleep = ms => new Promise(r => setTimeout(r, ms))
// The NETWORK going away is not a failure of the failure path. These are
// Chrome's own transport errors, and blaming the product for them turns a
// dropped wifi connection into a red suite -- which is exactly what it did.
const ENVIRONMENT = /ERR_INTERNET_DISCONNECTED|ERR_NETWORK_CHANGED|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_(RESET|REFUSED|TIMED_OUT)|ERR_ADDRESS_UNREACHABLE/
const errs = []
const envErrs = []
const note = (s) => (ENVIRONMENT.test(s) ? envErrs : errs).push(s)
p.on('pageerror', e => note(`pageerror: ${e.message.slice(0, 120)}`))
p.on('console', m => { if (m.type() === 'error') note(`console: ${m.text().slice(0, 120)}`) })

await p.goto(URL, { waitUntil: 'networkidle2' })
await sleep(3000)
await p.keyboard.press('Enter')
const by = Date.now() + 20000
while (Date.now() < by) {
  if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
  await sleep(250)
}
if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
  console.error('failure-states: never reached the console.'); await b.close(); process.exit(1)
}
await sleep(2000)

// Dismiss the calibration tour. It used to be dismissed by hunting a button
// reading "not now" -- that was the hand-rolled tour, which is gone; driver.js
// labels its dismissal `×` on `.driver-popover-close-btn`, so the old hunt
// found nothing and the whole failure path was driven under a modal overlay.
// It did not break the run, which is precisely why nobody noticed.
await p.evaluate(() => document.querySelector('.driver-popover-close-btn')?.click())
{
  const goneBy = Date.now() + 6000
  while (Date.now() < goneBy && (await p.evaluate(() => !!document.querySelector('.driver-popover')))) await sleep(250)
  if (await p.evaluate(() => !!document.querySelector('.driver-popover'))) {
    console.error('failure-states: the tour would not close, so the room was measured through an overlay.')
    await b.close(); process.exit(1)
  }
}
await sleep(800)

// `.deck-name` is the console's now-playing line and `.deck-meta` the plate
// rows beneath it. Worth being exact about what the second one is: it is NOT
// a subtitle. The engine announces the corrupt upload as
// { title: 'file not playable', artist: 'back to the radio' }, and the title
// is what `.deck-name` paints; the artist half only renders as a `//artist_`
// row when the track carries a link, which a synthesised failure announce
// does not. So in the shipped console the reason is carried by the title
// alone. Both are read anyway, because the law is "it says something
// legible", not "it says it in two lines", and reading only one of them
// would make this check brittle against a layout that moves the sentence.
//
// The level is a COUNT of lit cells, 0..12, not a percentage: the shipped
// meter is `.level-meter > i`, twelve discrete blocks lit by
// `round(min(1, rms * 2.4) * 12)`, with no numeral anywhere. The old
// threshold `level > 3` was read off a readout that printed percent.
const say = () => p.evaluate(() => ({
  now: document.querySelector('.deck-name')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
  sub: document.querySelector('.deck-meta')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
  lit: document.querySelectorAll('.level-meter i.on').length,
  cells: document.querySelectorAll('.level-meter i').length,
}))

// Emptiness guards, before anything is asserted. A `say()` whose selectors
// have rotted returns '' / '' / 0 forever, which reads as a mute, dead room
// and sends the next person to fix a working product.
{
  const s0 = await say()
  if (!s0.cells) {
    console.error('failure-states: no `.level-meter i` cells, so "sound came back" cannot be observed. This is the check, NOT the product.')
    await b.close(); process.exit(1)
  }
  if (!(await p.evaluate(() => !!document.querySelector('.deck-name')))) {
    console.error('failure-states: no `.deck-name`, so what the room SAYS cannot be read. This is the check, NOT the product.')
    await b.close(); process.exit(1)
  }
}

// Two lit cells out of twelve is the line between silence and signal. One
// cell is the rounding of a near-zero rms; two needs rms above ~0.05, which
// silence cannot produce. Measured radio sits at 7..12.
const HEARD = 2
const hear = async (windowMs) => {
  let run = 0
  const until = Date.now() + windowMs
  let last = 0
  while (Date.now() < until && run < 4) {
    await sleep(400)
    const s = await say()
    last = s.lit
    run = s.lit >= HEARD ? run + 1 : 0
  }
  return { ok: run >= 4, last }
}

// Establish that there WAS sound before breaking it. Otherwise step 3 cannot
// tell "the recovery path is dead" from "this machine never had a radio to
// recover to" -- the radio library only ships where licensed audio exists,
// and everywhere else the honest state is "radio unavailable". Same line as
// CHECKS.md §2.2: do not blame the product for the room it runs in.
const before = await hear(25000)
if (!before.ok) {
  const s = await say()
  console.error(`failure-states: the room was already silent before the bad file (${s.lit}/${s.cells} cells lit, reading "${s.now}"), so recovery cannot be judged.`)
  console.error('  This is the harness or the audio library, NOT the failure path. Re-run where the radio actually plays.')
  await b.close(); process.exit(1)
}

const input = await p.$('input[type=file]')
if (!input) { console.error('failure-states: no file input, so the decode path was never driven.'); await b.close(); process.exit(1) }
await input.uploadFile(bad)

// 1 · it says something, and says it soon.
// Polled at 120ms, not 250: the message is legible for about 1.3s. It appears
// once the peaks decode resolves (~0.5s) and the announce is deliberately
// held only 1800ms before the radio's own announce replaces it, and the
// `<Decode>` scramble eats the first ~0.7s of that as `FILE NOT PLAYAB#/`.
// A slow sampler walks straight past the only window it exists in.
let spoke = null
let sawDecoding = false
const spokeBy = Date.now() + 12000
while (Date.now() < spokeBy) {
  await sleep(120)
  const s = await say()
  const line = `${s.now} ${s.sub}`
  if (/decoding/i.test(line)) sawDecoding = true
  if (/not playable|cannot|could not|failed|unsupported/i.test(line)) { spoke = s; break }
}
const fail = []
if (!spoke) {
  const s = await say()
  // Separate the two ways this goes wrong: a room that said nothing, and a
  // room whose reason was swallowed by its own decode spinner.
  fail.push(sawDecoding
    ? `a file that cannot decode never gave a reason within 12s -- the room only ever said "DECODING ///" and then moved on. The spinner outlived the message it was hiding.`
    : `a file that cannot decode produced no legible message within 12s -- the room read "${s.now}" / "${s.sub}". Silence is not a failure state.`)
}
// 2 · it does not get stuck
await sleep(6000)
const after = await say()
if (/decoding|reading|loading/i.test(`${after.now} ${after.sub}`)) {
  fail.push(`the room is still saying "${after.now}" 18s after a file that will never decode -- it is stuck, and a spinner with no end is worse than an error.`)
}
// 3 · sound comes back on its own. graph.ts schedules playRadio() ~1800ms
// after the announce, so this is generous by an order of magnitude on
// purpose: the failure it is looking for is a room left dead, not a slow one.
const back = await hear(20000)
if (!back.ok) {
  fail.push(`sound never came back after the bad file (level stayed at ${back.last}/12 cells, and ${HEARD} is the floor for audible) -- the room was left dead and only a reload would fix it.`)
}
if (errs.length) fail.push(`the failure path logged errors: ${[...new Set(errs)].slice(0, 3).join(' | ')}`)
if (envErrs.length && !fail.length) {
  console.error(`failure-states: the network dropped during the run (${[...new Set(envErrs)][0]}), so the recovery path could not be judged.`)
  console.error('  This is the environment, NOT the product. Re-run on a connection.')
  await b.close(); process.exit(1)
}

const heardNow = await say()
await b.close()
if (fail.length) { console.error('failure-states FAILED\n' + fail.map(f => '  · ' + f).join('\n')); process.exit(1) }
console.log(`failure-states ok -- a corrupt file reads "${spoke.now}", does not stick, and the room finds sound again (${heardNow.lit}/${heardNow.cells} cells)`)
