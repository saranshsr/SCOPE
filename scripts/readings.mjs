#!/usr/bin/env node
// A reading has to read.
//
// PRODUCT.md law 3 says no value on screen may be decorative or estimated.
// It is possible to satisfy that and still show nothing: the level readout
// is a real measurement of the real signal, and it can sit at full for most
// of a session because the value is scaled twice -- once in features.ts,
// which already returns a compressed 0..1 rms, and again at the meter with a
// further multiply. Both clamps then hide the overflow.
//
// Nothing about that is visible in code review; each multiplier looks
// reasonable alone. It shows up only by watching the display over real audio
// and noticing it never moves. So that is what this does.
//
// ── WHAT THIS CHECK USED TO BE ─────────────────────────────────────────
// Every selector here named `public/dome.html`, a redesign that was never
// built: `.read-level .v i` for the level, `.mix-row` / `.mix-meter b.on`
// for the tiers, `.strip button` for a tabbed panel the console does not
// have. All of them matched zero elements.
//
// The damage was not the red. It was the SENTENCE the red carried: the
// sound gate read an empty selector as an empty analyser and printed "no
// audio arrived within 30s ... this is the harness or the network, NOT the
// meters". Every word of that was false, and it pointed the reader away
// from the one file that was broken. A check that misattributes is worse
// than one that stays quiet, because it teaches you to skim red.
//
// So the gate now asks the ANALYSER, not the display. `window.__eng
// .analyser.features.rms` is the same number the meter is drawn from, read
// before the meter touches it, and it separates the three cases the old
// wording ran together:
//   · the selector matches nothing            -> this check is stale
//   · the analyser is silent                  -> the harness or the network
//   · the analyser is loud and no cell lights -> the meters really are dead
//
// ── EVERY THRESHOLD BELOW IS A COUNT OF LIT CELLS ──────────────────────
// The shipped level readout is `.level-meter`, twelve `<i>` blocks that
// take the class `on`. It has NO numerals: DESIGN.md primitive 4 is a block
// meter, and the console shows quantity as filled squares. So there is no
// percentage on screen to assert on, and every threshold here is a COUNT,
// 0..12. One cell is the finest distinction the display can make; a rule
// written in percentages under that is a rule about a number nobody can
// see. The old percentages map straight across: 100% -> 12 cells,
// 92% -> 11, 25% of range -> 3 cells, 4% -> 1.
// The six tier meters are the same primitive at eight cells: `.layer` rows,
// `.layer-meter b.on`, 0..8.
import puppeteer from 'puppeteer'

// No `?rim=1`. Nothing in src reads a query parameter, so that suffix was
// asking for a room that has not existed for some time and getting the
// ordinary one.
const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const SECONDS = 20
const CELLS = 12                 // the level meter's block count
const TIER_CELLS = 8             // each layer meter's block count
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
// The tour sits over the console on a first visit and swallows the clicks
// this check makes on the source picker. Seed the "already learned" key so
// it never arrives, and assert that it did not.
await p.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode: the assert below catches it */ } })
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
await p.keyboard.press('Enter')
const bootBy = Date.now() + 25000
while (Date.now() < bootBy) {
  if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
  await new Promise(r => setTimeout(r, 250))
}
if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
  console.error('readings: the app never reached the live console, so there was nothing to read.')
  console.error('  This is the harness, NOT the meters.')
  await b.close(); process.exit(1)
}
await new Promise(r => setTimeout(r, 1200))
if (await p.evaluate(() => !!document.querySelector('.driver-popover, .driver-active, .onboard'))) {
  console.error('readings: the tour is still on screen, so the source clicks below would land on it. This check is stale and is NOT passing.')
  await b.close(); process.exit(1)
}

// ── DOES THE SUBJECT EXIST? ────────────────────────────────────────────
// Asked first and separately, because this is the failure that dressed
// itself up as a network fault for a whole build. An absent readout is a
// stale check; it is not silence, and it is not a dead meter.
const cells = await p.evaluate(() => document.querySelectorAll('.level-meter i').length)
if (cells !== CELLS) {
  console.error(`readings: \`.level-meter i\` matched ${cells} elements, not ${CELLS}.`)
  console.error('  The level readout this check was written against is not on screen. That is THIS FILE being stale,')
  console.error('  not the network and not the meters -- do not go looking at the audio path for it.')
  await b.close(); process.exit(1)
}

// The two readings, taken together every sample: what the display shows,
// and what the analyser handed it. The pair is the whole argument -- a
// display that does not move while the signal does is the fault, and
// neither number alone can say that.
const readPair = () => p.evaluate(() => ({
  lit: document.querySelectorAll('.level-meter i.on').length,
  rms: window.__eng?.analyser?.features?.rms ?? null,
}))

const first = await readPair()
if (first.rms == null) {
  console.error('readings: `window.__eng.analyser.features.rms` is not reachable, so there is no witness for the signal')
  console.error('  and a still meter could not be told from a silent track. The DEV globals are missing.')
  console.error('  This is the harness, NOT the meters.')
  await b.close(); process.exit(1)
}

// Wait for SOUND, not for a duration -- and wait on the ANALYSER, not on
// the meter. Waiting on the meter is circular: the display is the thing
// under test, so a dead display would look exactly like a slow network and
// the check would blame the network, which is precisely what it used to do.
let heard = 0
const SOUND_LIMIT_MS = 30000
const soundBy = Date.now() + SOUND_LIMIT_MS
let peakRms = 0
while (Date.now() < soundBy && heard < 5) {
  await new Promise(r => setTimeout(r, 300))
  const { rms } = await readPair()
  peakRms = Math.max(peakRms, rms ?? 0)
  heard = rms > 0.02 ? heard + 1 : 0
}
if (heard < 5) {
  console.error(`readings: the analyser reported no signal within ${SOUND_LIMIT_MS / 1000}s (peak rms ${peakRms.toFixed(4)}), so nothing could be read.`)
  console.error('  The radio never arrived. This is the harness or the network, NOT the meters -- the display was never asked to show anything.')
  await b.close(); process.exit(1)
}
// envelope settle, now that there is genuinely something to settle
await new Promise(r => setTimeout(r, 1500))
await p.evaluate(() => {
  window.__s = []
  window.__t = setInterval(() => {
    const m = document.querySelector('.level-meter')
    if (!m) return
    window.__s.push([m.querySelectorAll('i.on').length, window.__eng?.analyser?.features?.rms ?? -1])
  }, 100)
})
await new Promise(r => setTimeout(r, SECONDS * 1000))
const pairs = (await p.evaluate(() => { clearInterval(window.__t); return window.__s }))
  .filter(x => Number.isFinite(x[0]) && x[1] >= 0)

// ── THE TIER METERS ────────────────────────────────────────────────────
// Same fault, six sites deep: `level` is produced already clamped to 0..1
// and each meter applies a further multiply, so every ring can read full.
// Six meters that all sit at the top are not a mix, they are a light.
// Checked separately because they are a DIFFERENT signal from the
// broadband level: the point of a per-ring display is that the rings
// disagree with each other.
//
// The rows only exist pulled apart, and `d` is the only key that does it.
// The old code clicked `.strip button` first -- a tabbed strip from the
// mockup. The shipped console is one scrolling rail with no tabs, so there
// is nothing to click and the step is gone rather than faked.
await p.evaluate(() => { document.activeElement?.blur?.(); document.body.focus() })
const readD = () => p.evaluate(() => window.__sc?.uniforms?.uDissect?.value ?? 0)
{
  // Re-press only if the press was DROPPED. `d` is a toggle: pressing again
  // mid-glide reverses it and leaves the room half open (CHECKS.md §2.7).
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
    console.error(`readings: pressing d did not open the stack (uDissect ${(await readD()).toFixed(2)}), so the six tier meters were never on screen.`)
    console.error('  This is the harness failing to reach its subject, NOT the meters. It is reported rather than passed, because an assertion over an empty set passes in green.')
    await b.close(); process.exit(1)
  }
}
await new Promise(r => setTimeout(r, 1200))
// The witness rides along with every tier sample, so a tier failure can say
// whether sound was still arriving when the rings were read -- the
// difference between a dead meter and a dark passage, which is the whole
// point of the gate above. Taken from the analyser, not from the level
// meter, so one broken display cannot vouch for another. A MEDIAN, not one
// instant: a single reading taken in a gap between phrases would excuse a
// genuinely dead row.
const tiers = []
const tierRms = []
// THE BANDS RIDE ALONG TOO, and they are the witness that matters. The
// global rms says whether there was sound; it says nothing about whether
// THIS ring's band did anything. Judging a still ring against the whole
// mix fails an honest meter on a track whose sub is a flat limited kick,
// and it passes a dead one on a track whose sub happens to move. Each
// ring is judged against its own input.
const tierBands = []
for (let i = 0; i < 60; i++) {
  const snap = await p.evaluate(() => ({
    rows: [...document.querySelectorAll('.layer')].map(r => r.querySelectorAll('.layer-meter b.on').length),
    rms: window.__eng?.analyser?.features?.rms ?? -1,
    bands: Array.from(window.__eng?.analyser?.features?.bands ?? []),
  }))
  tiers.push(snap.rows)
  tierRms.push(snap.rms)
  tierBands.push(snap.bands)
  await new Promise(r => setTimeout(r, 120))
}
const rmsAtTiers = tierRms.slice().sort((a, c) => a - c)[Math.floor(tierRms.length / 2)]

// ── DEAD CONTROLS MUST LOOK DEAD (DESIGN.md) ───────────────────────────
// In jukebox mode YouTube owns the sound, so the tier faders and their
// solo/mute buttons are `disabled`. They must SAY so. The styling rule is
// `.layer input:disabled`, which needs a `.layer` ancestor -- when the rows
// were `.mix-row` six faders sat at full opacity with a default cursor
// while the buttons beside them faded. Controls that claim to work and do
// nothing, next to controls that admit it.
await p.evaluate(() => [...document.querySelectorAll('.rail-src button')].find(b => b.textContent.trim() === 'jukebox')?.click())
await new Promise(r => setTimeout(r, 2500))
const dead = await p.evaluate(() => {
  const ctrls = [...document.querySelectorAll('.layer input, .layer-btn')]
  const off = ctrls.filter(e => e.disabled)
  // Not `return null`. An empty set here means the check never reached its
  // subject, and a correct assertion over an empty set passes in green --
  // which is how `voice` passed twice over copy it never rendered and how
  // `layout` measured a half-size panel and printed ok. This branch exists
  // so that if the setup ever stops reaching jukebox mode, the suite says so
  // instead of quietly reporting a pass.
  if (!off.length) return { unreachable: ctrls.length }
  const alive = off.filter(e => { const cs = getComputedStyle(e)
    return parseFloat(cs.opacity) > 0.9 && cs.cursor !== 'not-allowed' })
    .map(e => (e.className || e.type || e.tagName).toString().split(' ')[0])
  return { total: off.length, alive }
})
await b.close()

const fail = []
// Notes that are not failures. A check that only ever prints "ok" hides the
// runs where it could not judge -- and a run it could not judge is not the
// same as a run that passed.
const report = []
let tierTravel = null
let tierMeans = null
// the disabled sweep ran before the browser closed; report it here, where
// the failure list exists
if (dead && dead.unreachable != null) {
  fail.push(`no layer control reported \`disabled\` after switching to jukebox, so the dead-controls law had nothing to check (${dead.unreachable} controls were on screen). This is the check failing to reach its subject, not the product failing -- but it is reported rather than passed, because an assertion over an empty set passes in green.`)
} else if (dead && dead.alive.length) {
  fail.push(`${dead.alive.length} of ${dead.total} disabled controls render as if they still work (${[...new Set(dead.alive)].join(', ')}) -- full opacity, ordinary cursor. A control that cannot act must not look like it can.`)
}

// NOTE: the display-tier arm that used to live here compared `.read-ring .v`
// against `.read-level .v` and is gone, not re-pointed. Those were numeric
// ring readings in the mockup; the shipped console has none, so the rule had
// no subject at all. An assertion needs something to be about, and inventing
// a subject to keep a check green is the failure this file is a record of.

const rows = tiers[0]?.length ?? 0
if (rows === 0) fail.push('no `.layer` rows appeared with the stack open, so the tier meters could not be checked and this check is stale.')
else if (rmsAtTiers <= 0.02) {
  // Same discipline as the level arm: silence is not evidence about a
  // display. Say which side of the line this is on rather than reporting
  // six flat rings as a broken readout.
  fail.push(`the analyser read rms ${rmsAtTiers.toFixed(3)} through the tier sampling, so the six ring meters had nothing to show. This is the track or the network, NOT the meters.`)
} else {
  const allPinned = []
  const lowRings = []
  for (let i = 0; i < rows; i++) {
    const col = tiers.map(t => t[i]).filter(v => v != null)
    const pinned = col.filter(v => v >= TIER_CELLS).length / col.length
    const spread = Math.max(...col) - Math.min(...col)
    const mean = col.reduce((a, c) => a + c, 0) / col.length
    // Pinned at the top is the fault. A ring that holds STEADY mid-range is
    // not -- a constant bassline genuinely does not move much across a few
    // seconds, and failing that would be punishing the music. So the spread
    // rule only applies where the reading is already at an extreme.
    if (pinned > 0.6) allPinned.push(`ring ${i} sits at ${TIER_CELLS}/${TIER_CELLS} for ${(pinned * 100).toFixed(0)}% of samples`)
    // Stuck HIGH is always a fault. Stuck LOW is only a fault if sound was
    // actually arriving -- a ring reading near zero through a bass-light
    // passage is the meter telling the truth, and failing it punishes the
    // music. This branch fired once on a quiet track and reported the
    // meters as broken; the analyser's rms is what tells the two apart.
    else if (spread < 2 && mean >= TIER_CELLS - 1) allPinned.push(`ring ${i} is stuck full at ${mean.toFixed(1)}/${TIER_CELLS} and moved only ${spread} cells`)
    // Stuck LOW is only evidence when MOST of the rings are stuck low. One or
    // two quiet bands is the meter telling the truth -- air and hi-mid sit
    // near zero through a bass-heavy passage, and flagging that reports a
    // working display as broken every time the music is dark. Six meters flat
    // at the bottom is a dead readout; two are a bassline.
    else if (spread < 2 && mean <= 1 && rmsAtTiers > 0.1) lowRings.push(i)
  }
  if (lowRings.length > rows / 2)
    allPinned.push(`${lowRings.length} of ${rows} rings sit at the bottom and do not move (rings ${lowRings.join(', ')}) while the analyser reads rms ${rmsAtTiers.toFixed(3)} -- that is a dead readout, not dark music`)
  if (allPinned.length) fail.push(`tier meters are not reporting: ${allPinned.join('; ')}. The analyser read rms ${rmsAtTiers.toFixed(3)} while they were sampled, so there was a signal to show. The reading is built in App.tsx as one shared \`tierLevels\` -- check that both readouts still take it from there rather than re-deriving a second scaling of the same band means.`)

  // ── STILLNESS IS THE FAULT, WHEREVER IT SITS ─────────────────────────
  // Everything above only fires at a RAIL: pinned at 8/8, or flat at 0.
  // A ring frozen at 5/8 for the whole window passed all of it, and that
  // is precisely how the real fault shipped. Measured on a real GPU, 120
  // samples over 12s of a playing track, the six meters read 7,6,6,5,5,4
  // and FOUR OF THEM MOVED ZERO CELLS -- they were drawing the spectrum's
  // fixed tilt, which is a property of recorded music and not of the
  // track. This file's own failure line called it "stuck full at 7.0/8",
  // and only because that track happened to push one ring high enough to
  // reach a rail. The same dead readout on a brighter track said nothing
  // at all, so the check was flaky on a fault that was always present.
  //
  // So: a ring is allowed to be steady, and one or two steady rings are
  // music. MOST of them steady, while the signal behind them is moving,
  // is a readout that is not reporting. The rms series is the witness on
  // both counts -- loud enough to show something, and varying, so a drone
  // is not failed for being a drone.
  // EACH RING AGAINST ITS OWN BAND. Two earlier versions of this law were
  // written and both were wrong, in opposite directions, which is why it
  // is worth spelling out.
  //
  // The first said "more than half the rings are still". Mutated against
  // the old absolute law it travelled 2/3/3/1/1/0 cells -- three rings of
  // six -- and `> rows / 2` is `3 > 3`, false. It passed the exact fault
  // it had been written for, by one ring.
  //
  // The second tightened that to `>=` and added "any ring that never
  // moves at all is dead". That one FAILED THE FIXED PRODUCT, on a
  // brickwalled master whose sub ring sat still for seven seconds -- and
  // looking at the band behind it, so did the sub. A limited four-to-the-
  // floor kick genuinely does not vary. The check was right that the ring
  // was still and wrong about what that meant, because it was asking the
  // whole mix's rms about one band.
  //
  // So the witness is the ring's OWN input. A ring must move when its
  // band moves; a ring that holds still while its band holds still is
  // telling the truth. `bandsFor` derives the grouping from what is on
  // screen rather than restating it: rows render top-first, so row r is
  // tier rows-1-r, and the tiers divide the analyser's bands evenly.
  const STILL = 2   // cells of travel across the window, below which a ring is not moving
  const MOVED = 2   // a band that DOUBLES has unarguably moved; no meter may sit through it
  const per = tierBands[0].length / rows
  const bandsFor = r => {
    const t = rows - 1 - r
    const a = Math.round(t * per), b2 = Math.round((t + 1) * per)
    return tierBands.map(f => { let m = 0; for (let k = a; k < b2; k++) m += f[k]; return m / Math.max(1, b2 - a) })
  }
  const travel = []
  const deaf = []          // still, while its own band moved
  const honest = []        // still, and so was its band
  for (let i = 0; i < rows; i++) {
    const col = tiers.map(t => t[i]).filter(v => v != null)
    travel.push(Math.max(...col) - Math.min(...col))
    if (travel[i] >= STILL) continue
    const band = bandsFor(i)
    const lo = Math.max(1e-4, Math.min(...band))
    const hi = Math.max(...band)
    ;(hi / lo >= MOVED ? deaf : honest).push(`${i} (band x${(hi / lo).toFixed(1)})`)
  }
  const rmsLo = Math.min(...tierRms)
  const rmsHi = Math.max(...tierRms)

  // ── THE TILT, WHICH IS THE FAULT ITSELF ──────────────────────────────
  // Travel alone cannot tell the two laws apart, and it was tried. The
  // broken absolute law measured 3/2/2/1/1/1 cells on one track and the
  // fixed law measured 0/1/1/1/1/1 on another: how far a ring moves in
  // seven seconds is dominated by the track, not by the maths. Band
  // doubling as a gate was tried too, and is vacuous -- features.ts
  // envelope-follows the bands, so over a seven-second window they move
  // about 1.2x to 1.5x and almost never double, so the clause never fired
  // and the mutation walked straight through it.
  //
  // What actually distinguishes them is not any single ring, it is the
  // SHAPE ACROSS the six. Reading absolute band energy, the rings come out
  // ordered by frequency and stay there, because music's long-term
  // spectrum falls with frequency: 7,6,6,5,5,4, a staircase. Read against
  // each ring's own running mean, every ring centres on mid-scale and the
  // order is whatever the music is doing this second: 4.0/4.3/4.2/4.0/
  // 4.1/4.3, measured.
  //
  // So the law is the staircase. Monotone in frequency AND spread across
  // the scale is the tilt and nothing else looks like it -- one loud band
  // is not monotone, and a monotone accident is not spread. Either alone
  // would be too eager; together they are the signature.
  const means = travel.map((_, i) => {
    const col = tiers.map(t => t[i]).filter(v => v != null)
    return col.reduce((a, c) => a + c, 0) / col.length
  })
  // RANK CORRELATION, not strict monotonicity, and that distinction was
  // measured too. Strict monotonicity was the first form of this and the
  // `pow(x, 0.6)` mutation walked through it on means of
  // 1.8/2.5/4.1/5.3/5.4/5.3 -- a 3.6-cell staircase whose last three
  // steps wobble by 0.1, which is not monotone and is obviously a tilt.
  // A rank correlation does not care about the wobble: that set scores
  // 0.90 against frequency order, the shipped `* 1.6` scores 0.99, the
  // original 7/6/6/5/5/4 scores 0.97, and the fixed law scores 0.26.
  const rank = a => {
    const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0])
    const r = new Array(a.length)
    for (let i = 0; i < idx.length;) {
      let j = i
      while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++
      const avg = (i + j) / 2 + 1              // 1-based, ties share the mean rank
      for (let k = i; k <= j; k++) r[idx[k][1]] = avg
      i = j + 1
    }
    return r
  }
  const rm = rank(means)
  const rx = means.map((_, i) => i + 1)
  const d2 = rm.reduce((a, v, i) => a + (v - rx[i]) ** 2, 0)
  const n = means.length
  const rho = 1 - (6 * d2) / (n * (n * n - 1))
  const span = Math.max(...means) - Math.min(...means)
  if (Math.abs(rho) >= 0.85 && span >= 2)
    fail.push(`the ring meters are drawing the spectrum, not the music. Their means across the sample were ${means.map(m => m.toFixed(1)).join('/')} of ${TIER_CELLS} -- ranked ${rho.toFixed(2)} against frequency order, ${span.toFixed(1)} cells apart, and they hold that order for as long as you watch. That is the long-term shape of recorded music, which every track has; it is not this track. Each tier is meant to be read against its OWN running mean (\`tierAvg\` in App.tsx) so that at its average it sits mid-scale and the six disagree moment to moment -- check that both readouts still take \`tierLevels\` from there rather than re-deriving an absolute scaling of the band means.`)
  else if (span >= 2)
    report.push(`ring means spread ${span.toFixed(1)} cells (${means.map(m => m.toFixed(1)).join('/')}) but rank only ${rho.toFixed(2)} against frequency order, so this is the music and not the tilt`)

  if (deaf.length) report.push(`${deaf.length} ring(s) held still while their own band moved: ${deaf.join(', ')}`)
  if (honest.length) report.push(`${honest.length} ring(s) held still and so did their band, which is the meter telling the truth: ${honest.join(', ')}`)
  if (rmsAtTiers <= 0.05 || rmsHi - rmsLo <= 0.05)
    report.push(`rms ${rmsLo.toFixed(3)}..${rmsHi.toFixed(3)} (median ${rmsAtTiers.toFixed(3)}) was quiet or steady through the ring sampling`)
  tierTravel = travel
  tierMeans = means
}

if (pairs.length < 50) fail.push(`only ${pairs.length} samples in ${SECONDS}s -- the meter is not updating, so this check is stale and is NOT passing.`)
else {
  const lit = pairs.map(x => x[0]).sort((a, c) => a - c)
  const rms = pairs.map(x => x[1]).sort((a, c) => a - c)
  const ceiling = lit.filter(v => v >= CELLS).length / lit.length
  const spread = lit[lit.length - 1] - lit[0]
  const median = lit[Math.floor(lit.length / 2)]
  // The witness, over the same samples. It is the only thing that can
  // separate "the display is stuck" from "the music is steady", and it is
  // what stops a reader going to fix the audio path for a display bug, or
  // the display for a track that stopped.
  const rmsSpread = rms[rms.length - 1] - rms[0]
  const rmsPinned = rms.filter(v => v >= 0.995).length / rms.length
  const rmsSilent = rms.filter(v => v <= 0.02).length / rms.length
  // EVERY "the display is dead" claim is paired per-sample with the signal
  // that fed it. Comparing the two ranges is not enough: a run where the
  // radio dropped out halfway shows a wide rms span AND a floored meter,
  // and reads as a dead display when the honest sentence is "the track
  // stopped". So the dead test counts only samples where there was
  // genuinely something to show at that instant.
  const darkWhileLoud = pairs.filter(x => x[0] === 0 && x[1] > 0.1).length / pairs.length
  // How often the TOP CELL would legitimately be lit. features.ts already
  // returns a compressed 0..1 level intended for display, so the honest
  // mapping is one to one -- `round(rms * 12)` -- and this is that mapping's
  // own ceiling rate over the very same samples.
  //
  // It is here because a flat threshold cannot survive a loud track. The
  // reverse mutation (drive the same twelve cells from rms with no second
  // multiply) still sat at 12/12 for 30% of a run, because the compressed
  // rms saturates on hot masters all by itself. A rule that reds a correct
  // display 30% of the time is a rule that gets ignored, so the fault is
  // stated as the pinning the DISPLAY adds on top of the signal's own.
  const expectedCeiling = pairs.filter(x => Math.round(Math.min(1, x[1]) * CELLS) >= CELLS).length / pairs.length
  const witness = `the analyser's own rms spanned ${rms[0].toFixed(3)}..${rms[rms.length - 1].toFixed(3)} over the same samples`
  // What the same signal would read on a single scale: the display holds
  // twelve cells, so `round(rms * 12)` is the honest span.
  const honest = `${Math.round(rms[0] * CELLS)}..${Math.round(rms[rms.length - 1] * CELLS)} of ${CELLS}`

  if (rmsSilent > 0.5) {
    // The sampling window caught silence. Nothing about the display can be
    // concluded from it, and saying so beats every rule below firing at
    // once and pointing at the meter (CHECKS.md §2.2).
    fail.push(`the analyser was silent for ${(rmsSilent * 100).toFixed(0)}% of the ${SECONDS}s sampling window (rms peaked at ${rms[rms.length - 1].toFixed(3)}), so the level meter had nothing to show for most of it. This is the track or the network, NOT the display -- rerun it rather than reading the meter rules below.`)
  } else if (rmsPinned > 0.5) {
    // The signal itself is at the top. That is the track, not the display,
    // and blaming the meter for it sends the reader to the wrong file.
    fail.push(`the analyser's own rms sat at its ceiling for ${(rmsPinned * 100).toFixed(0)}% of samples, so the level meter had nothing to vary. This is the SIGNAL, NOT the display -- the meter cannot be judged against a track this hot.`)
  } else {
    // Two ways to be pinned, and the second is the one a loud track cannot
    // excuse: at the top far more often than the signal itself is.
    if (ceiling > 0.6 || ceiling - expectedCeiling > 0.3)
      fail.push(`the level meter sits at ${CELLS}/${CELLS} for ${(ceiling * 100).toFixed(0)}% of samples while the signal behind it is only at full for ${(expectedCeiling * 100).toFixed(0)}% -- it is pinned and reporting nothing it was not given. ${witness} (a range of ${rmsSpread.toFixed(3)}). Check for a second scaling at the meter: features.ts already returns a compressed 0..1 rms, and App.tsx multiplies it again before filling the blocks. On one scale these samples would read ${honest}.`)
    if (darkWhileLoud > 0.3)
      fail.push(`the level meter showed 0 of ${CELLS} cells in ${(darkWhileLoud * 100).toFixed(0)}% of samples where the analyser was reading a real signal (rms above 0.1) -- it is dead, not quiet.`)
    // Same reasoning as the rings: a steadily-loud track genuinely holds a
    // narrow band, and failing that would be punishing the music rather
    // than catching a bug. So a still needle is only a fault when the
    // signal behind it moved.
    if (spread < 1 && rmsSpread > 0.1)
      fail.push(`the level meter never changed cell count across ${SECONDS}s (${median}/${CELLS} throughout) while ${witness} -- the needle is stuck, not steady.`)
    else if (spread < 3 && rmsSpread > 0.1 && (median >= CELLS - 1 || median <= 1))
      fail.push(`the level meter is parked at ${median}/${CELLS} and moved only ${spread} cells across ${SECONDS}s, while ${witness}.`)
  }
  if (fail.length === 0) {
    // The travel per ring is printed, not summarised as "all moving". That
    // phrase was in this line while four of the six were moving nothing:
    // a pass has to show its numbers or it is just a word.
    const travel = tierTravel ? ` · ring travel ${tierTravel.join('/')} cells of ${TIER_CELLS}` : ''
    const spread = tierMeans ? ` · means ${tierMeans.map(m => m.toFixed(1)).join('/')} (spread ${(Math.max(...tierMeans) - Math.min(...tierMeans)).toFixed(1)})` : ''
    console.log(`readings ok — ${rows} tier meters${travel}${spread} · level spans ${lit[0]}..${lit[lit.length - 1]} of ${CELLS} cells (median ${median}), ${(ceiling * 100).toFixed(0)}% at ceiling across ${lit.length} samples · analyser rms ${rms[0].toFixed(3)}..${rms[rms.length - 1].toFixed(3)}`)
    for (const r of report) console.log(`  note: ${r}`)
  }
}

if (fail.length) { console.error('readings FAILED\n' + fail.map(f => '  · ' + f).join('\n')); process.exit(1) }
