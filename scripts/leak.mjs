#!/usr/bin/env node
// Nothing may accumulate.
//
// The reported fault: the instrument is smooth for the first minutes and
// degrades with use -- orb drags, ring drags, track changes -- reaching
// visible lag around five. That shape is not fill rate. Fill rate is
// constant from the first frame; scope's GPU cost was measured at 5.18 Mpx
// per pass and it does not grow, because nothing about it depends on how
// long you have been playing. A cost that ARRIVES is a cost that
// ACCUMULATES, and accumulation has a small number of hiding places:
//
//   · WebGL objects        geometries / textures / programs
//   · audio graph nodes    created per load, never disconnected
//   · AudioParam events    scheduled per frame onto a timeline
//   · DOM listeners        added per gesture, never removed
//   · DOM nodes            appended, never dropped
//   · JS heap              anything the above pins
//   · rAF callbacks        a second loop, running invisibly
//   · style and layout     work the browser does that no JS census sees
//
// So this censuses all eight, drives the product the way the report
// describes it, and asserts that what is true at cycle 1 is still true at
// cycle N. It reports the TREND: the absolute value of any of these is a
// design decision, and only its slope is a defect.
//
// -- three ways this check could lie, and what stops each --------------
//
// 1. VSYNC QUANTISATION. Frame time is otherwise 16.7 or 33.3 and nothing
//    between, so a cost growing 18ms -> 31ms is invisible. The first draft
//    of this file measured exactly that and called it flat.
//    Stopped by: --disable-gpu-vsync, and by timing Scene.render itself
//    rather than the gap between frames.
//
// 2. A CENSUS THAT COUNTS NOTHING. create* is defined on BaseAudioContext,
//    not AudioContext, so hooking own properties of AudioContext.prototype
//    finds almost nothing. The first draft reported ONE live audio node for
//    a page holding a six-filter desk, and would have reported one forever.
//    Stopped by: walking the prototype chain, plus a hard failure if the
//    live node count comes back implausibly low.
//
// 3. A BOOT STEP READ AS A SLOPE. Powering on the console adds ~90 DOM
//    nodes, once. Include the pre-boot sample in the regression and every
//    flat line acquires a slope. The first draft reported a DOM leak that
//    was the console being built.
//    Stopped by: regressing from cycle 1, never from base.
//
// Frame time is a real GPU under --gpu and a software rasteriser otherwise
// (CHECKS.md 6). Neither absolute number is asserted on. What is asserted
// is the ratio across the run, which is a property of the product and not
// of the machine it ran on.
//
// The object counts are valid under either renderer -- an orphaned node is
// an orphaned node. Only the TIMING assertions need real hardware, which is
// what --gpu is for.
//
//   node scripts/leak.mjs                    8 cycles, swiftshader, the gate
//   node scripts/leak.mjs --gpu --verbose    8 cycles on the real driver
//   node scripts/leak.mjs --gpu --soak       40 cycles, the deep run
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const SOAK = process.argv.includes('--soak')
const VERBOSE = process.argv.includes('--verbose') || SOAK
// swiftshader renders this scene at ~5fps, which buries every timing signal
// in noise. --gpu uses the machine's real driver: the numbers then mean
// something, at the cost of needing a display.
const GPU = process.argv.includes('--gpu')
const CYCLES = SOAK ? 40 : 8

const b = await puppeteer.launch({
  args: [
    ...(GPU ? ['--use-angle=metal', '--ignore-gpu-blocklist'] : ['--use-gl=angle', '--use-angle=swiftshader']),
    '--no-sandbox',
    // Unlock the frame rate ONLY on real hardware. Vsync quantises frame
    // time to 16.7 or 33.3ms and nothing between, which hides a cost
    // growing 18ms -> 31ms — but on the software rasteriser the same flags
    // make the renderer spin flat out, starve its own event loop, and hang
    // CDP's mouse dispatch outright. Timing is not asserted under
    // swiftshader anyway, so there is nothing to buy there and a wedged
    // run to lose.
    ...(GPU ? ['--disable-gpu-vsync', '--disable-frame-rate-limit'] : []),
    // Without this the heap is a rounded bucket, and a bucketed heap has no
    // slope. With --expose-gc a sample can collect first, which is what
    // separates "retained" from "not yet swept".
    '--enable-precise-memory-info',
    '--js-flags=--expose-gc',
    '--autoplay-policy=no-user-gesture-required',
  ],
  // Under the software rasteriser a frame takes ~300ms, and thirty pointer
  // events dispatched back to back back the renderer up until CDP gives up.
  // That is the room, not the product (2.2): raise the ceiling, and pace
  // the gestures below so a hand's worth of movement takes a hand's worth
  // of time.
  protocolTimeout: 300000,
})
const p = await b.newPage()
// The reported machine is a retina Chrome. Fill rate is quadratic in device
// pixel ratio, so testing at 1 measures a quarter of the real cost.
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
const cdp = await p.createCDPSession()
await cdp.send('Performance.enable')
const errs = []
p.on('pageerror', (e) => errs.push(e.message.slice(0, 140)))

// -- THE CENSUS --------------------------------------------------------
// Installed before any page script, so it sees the app's first call. Every
// object counter is a NET: created minus disconnected. A net that climbs
// with cycles is the leak; a net that sits still is a design.
await p.evaluateOnNewDocument(() => {
  const C = { audio: {}, audioTotal: 0, param: 0, paramBy: {}, listeners: {}, listenerTotal: 0, rafPerFrame: 0, frames: [], render: [] }
  window.__census = C

  // --- audio nodes -----------------------------------------------------
  const AC = window.AudioContext || window.webkitAudioContext
  for (let proto = AC && AC.prototype; proto && proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
    for (const k of Object.getOwnPropertyNames(proto)) {
      if (!k.startsWith('create') || C.audio[k] !== undefined) continue
      const desc = Object.getOwnPropertyDescriptor(proto, k)
      const orig = desc && desc.value
      if (typeof orig !== 'function') continue
      C.audio[k] = 0
      proto[k] = function (...a) {
        const n = orig.apply(this, a)
        // Only GRAPH NODES. createBuffer and createPeriodicWave return data
        // objects, not nodes: they are garbage-collected like any other
        // value, they have no disconnect() to decrement on, and counting
        // them made this check report a permanent leak for every buffer the
        // page ever decoded -- including the ones this harness allocates
        // itself. A counter that can only go up is not a census.
        if (!(n instanceof AudioNode)) return n
        C.audio[k]++
        C.audioTotal++
        // A disconnected node is out of the graph and costs the audio
        // thread nothing. Count the retraction, so only ORPHANS show.
        if (n && typeof n.disconnect === 'function') {
          const d = n.disconnect.bind(n)
          let gone = false
          n.disconnect = function (...z) {
            if (!gone) { gone = true; C.audio[k]--; C.audioTotal-- }
            return d(...z)
          }
        }
        return n
      }
    }
  }

  // --- AudioParam automation -------------------------------------------
  // Cumulative, with the caller. Chrome prunes its timeline behind
  // currentTime so this is not itself a leak -- but a param written every
  // frame is work nobody asked for, and the attribution names who.
  for (const k of ['setTargetAtTime', 'setValueAtTime', 'linearRampToValueAtTime', 'exponentialRampToValueAtTime']) {
    const orig = AudioParam.prototype[k]
    if (typeof orig !== 'function') continue
    AudioParam.prototype[k] = function (...a) {
      C.param++
      const who = ((new Error().stack || '').split('\n')[2] || '?').trim().replace(/^at\s+/, '').split(' ')[0]
      C.paramBy[who] = (C.paramBy[who] || 0) + 1
      return orig.apply(this, a)
    }
  }

  // --- DOM listeners ----------------------------------------------------
  const key = (t, type) =>
    (t === window ? 'window' : t === document ? 'document' : t && t.nodeName ? t.nodeName.toLowerCase() : 'other') + ':' + type
  const add = EventTarget.prototype.addEventListener
  const rem = EventTarget.prototype.removeEventListener
  EventTarget.prototype.addEventListener = function (type, fn, o) {
    const k = key(this, type)
    C.listeners[k] = (C.listeners[k] || 0) + 1
    C.listenerTotal++
    return add.call(this, type, fn, o)
  }
  EventTarget.prototype.removeEventListener = function (type, fn, o) {
    const k = key(this, type)
    if (C.listeners[k]) { C.listeners[k]--; C.listenerTotal-- }
    return rem.call(this, type, fn, o)
  }

  // --- the render call itself -------------------------------------------
  // Wall clock between frames includes whatever else the browser chose to
  // do. The cost that belongs to this product is the time inside its own
  // render, so time that. Armed after boot, once __scene exists.
  window.__armRender = () => {
    const sc = window.__scene
    if (!sc || sc.__timed) return false
    sc.__timed = true
    const orig = sc.render.bind(sc)
    sc.render = function (...a) {
      const t0 = performance.now()
      const r = orig(...a)
      C.render.push(performance.now() - t0)
      if (C.render.length > 2000) C.render.shift()
      return r
    }
    return true
  }

  // --- rAF loops and frame interval --------------------------------------
  // Two loops is the classic invisible doubling: counting registrations per
  // frame finds it, because one loop re-registers once and two twice.
  const raf = window.requestAnimationFrame.bind(window)
  let inFrame = false
  let regs = 0
  let last = 0
  window.requestAnimationFrame = function (cb) {
    if (inFrame) regs++
    return raf(function (t) {
      const top = !inFrame
      if (top) {
        inFrame = true
        regs = 0
        if (last) C.frames.push(t - last)
        if (C.frames.length > 2000) C.frames.shift()
        last = t
      }
      try { return cb(t) } finally { if (top) { inFrame = false; C.rafPerFrame = regs } }
    })
  }
})

await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise((r) => setTimeout(r, 2500))

if (!(await p.evaluate(() => !!window.__census && !!window.__sc && !!window.__eng))) {
  console.error('leak: the census or the dev hooks (__sc / __eng) are missing -- nothing was measured.')
  await b.close(); process.exit(1)
}
if (!(await p.evaluate(() => { const el = document.querySelector('.power'); if (!el) return false; el.click(); return true }))) {
  console.error('leak: no `.power` control -- the instrument never booted.')
  await b.close(); process.exit(1)
}
for (let i = 0; i < 80 && !(await p.$('.app.live')); i++) await new Promise((r) => setTimeout(r, 250))
if (!(await p.$('.app.live'))) { console.error('leak: never reached the live console.'); await b.close(); process.exit(1) }
if (!(await p.evaluate(() => window.__armRender()))) {
  console.error('leak: could not wrap Scene.render -- every timing claim below would be vacuous.')
  await b.close(); process.exit(1)
}
await new Promise((r) => setTimeout(r, 2500))

// -- SAMPLING ----------------------------------------------------------
const cdpMetrics = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]))

const sample = async (label) => {
  // Timing is collected fresh each sample so it describes THIS cycle rather
  // than the whole run averaged into uselessness.
  await p.evaluate(() => { window.__census.frames.length = 0; window.__census.render.length = 0 })
  const m0 = await cdpMetrics()
  const t0 = Date.now()
  await new Promise((r) => setTimeout(r, GPU ? 4000 : 6000))
  const m1 = await cdpMetrics()
  const secs = (Date.now() - t0) / 1000
  // Collect before reading the heap. Twice, because one pass leaves the
  // young generation's survivors behind and the second sweeps them.
  await p.evaluate(() => { window.gc?.(); window.gc?.() })
  const js = await p.evaluate(() => {
    const C = window.__census
    const info = window.__scene?.renderer?.info
    const f = C.frames.slice().sort((a, b) => a - b)
    const rr = C.render.slice().sort((a, b) => a - b)
    const q = (arr, x) => (arr.length ? arr[Math.min(arr.length - 1, Math.floor(arr.length * x))] : 0)
    return {
      heap: performance.memory ? performance.memory.usedJSHeapSize : 0,
      geometries: info?.memory?.geometries ?? -1,
      textures: info?.memory?.textures ?? -1,
      programs: info?.programs?.length ?? -1,
      audio: C.audioTotal,
      audioKinds: { ...C.audio },
      param: C.param,
      paramBy: { ...C.paramBy },
      listeners: C.listenerTotal,
      listenerKinds: { ...C.listeners },
      dom: document.getElementsByTagName('*').length,
      rafPerFrame: C.rafPerFrame,
      frames: f.length,
      p50: q(f, 0.5),
      renders: rr.length,
      r50: q(rr, 0.5),
      r99: q(rr, 0.99),
    }
  })
  // Chrome's own accounting, as a RATE. These counters only ever rise, so
  // the raw value says nothing and the per-second delta is the signal.
  return {
    label, ...js,
    layouts: (m1.LayoutCount - m0.LayoutCount) / secs,
    restyles: (m1.RecalcStyleCount - m0.RecalcStyleCount) / secs,
    layoutMs: ((m1.LayoutDuration - m0.LayoutDuration) / secs) * 1000,
    scriptMs: ((m1.ScriptDuration - m0.ScriptDuration) / secs) * 1000,
    cdpNodes: m1.Nodes,
    cdpListeners: m1.JSEventListeners,
  }
}

// -- THE EXERCISE ------------------------------------------------------
// One cycle is the report's own sentence: interact with the orb, work the
// sliders, change the song. Every move is counted, and a cycle that moved
// nothing fails as a broken harness rather than passing as a clean product
// (CHECKS.md 4).
const cycle = async (n) => {
  const moved = { orb: 0, ring: 0, dial: 0, track: 0, dissect: 0, stems: 0 }
  const cx = 900, cy = 450
  // One frame's worth of pause between pointer moves. Free on a real GPU,
  // essential on the software one, and closer to a real hand either way.
  const tick = () => new Promise((r) => setTimeout(r, GPU ? 1 : 40))

  // 1. drag the orb -- a long pointermove stream, the way a hand does it
  await p.mouse.move(cx, cy)
  await p.mouse.down()
  for (let i = 0; i < 30; i++) { await p.mouse.move(cx + Math.sin(i / 4) * 140, cy + Math.cos(i / 5) * 90); await tick(); moved.orb++ }
  await p.mouse.up()

  // 2. dissect, drag a ring, close -- the ring faders are the sliders the
  //    report names, and each pointermove runs setStemGain / tierEq
  await p.keyboard.press('KeyD'); moved.dissect++
  await new Promise((r) => setTimeout(r, 700))
  await p.mouse.move(cx + 150, cy)
  await p.mouse.down()
  for (let i = 0; i < 25; i++) { await p.mouse.move(cx + 150 + i * 4, cy + Math.sin(i / 3) * 6); await tick(); moved.ring++ }
  await p.mouse.up()
  await p.keyboard.press('KeyD'); moved.dissect++
  await new Promise((r) => setTimeout(r, 400))

  // 3. the dials and transport
  for (const d of (await p.$$('.pl-dial, .railbar, input[type="range"]')).slice(0, 3)) {
    const box = await d.boundingBox().catch(() => null)
    if (!box) continue
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await p.mouse.down()
    for (let i = 0; i < 12; i++) { await p.mouse.move(box.x + box.width / 2 + i * 3, box.y + box.height / 2); await tick(); moved.dial++ }
    await p.mouse.up()
  }

  // 4. change the song
  await p.evaluate(() => window.__eng?.next?.())
  moved.track++
  await new Promise((r) => setTimeout(r, 600))

  // 5. load a stem set. A REAL split is a model download and minutes of
  //    inference, so this drives the deck's load path directly -- which is
  //    where the node graph is rebuilt, and the only part of a split a leak
  //    can live in. Silent buffers: the graph is the subject, not the sound.
  moved.stems += await p.evaluate(async () => {
    const { StemDeck } = await import('/src/audio/stems.ts')
    const eng = window.__eng
    window.__leakDeck = window.__leakDeck || new StemDeck(eng.ctx, eng.busHead)
    const roles = ['vocals', 'drums', 'bass', 'other']
    window.__leakDeck.loadBuffers(roles.map((r) => ({ role: r, name: r, buffer: eng.ctx.createBuffer(1, 4410, 44100) })))
    return roles.length
  })

  // 6. zoom -- the wheel path calls resize(), which the profiler reads
  await p.mouse.move(cx, cy)
  for (let i = 0; i < 6; i++) await p.mouse.wheel({ deltaY: i % 2 ? 120 : -120 })

  const idle = Object.entries(moved).filter(([, v]) => v === 0).map(([k]) => k)
  if (idle.length) throw new Error(`cycle ${n} exercised nothing for: ${idle.join(', ')} -- the run proves nothing about them.`)
  return moved
}

const rows = [await sample('base')]
for (let n = 1; n <= CYCLES; n++) {
  await cycle(n)
  rows.push(await sample(`c${n}`))
  if (VERBOSE && n % 4 === 0) process.stderr.write(`  ... cycle ${n}/${CYCLES}\n`)
}

// -- THE VERDICT -------------------------------------------------------
// Least squares over the cycle index, so one noisy sample can neither
// declare a leak nor hide one. From cycle 1: see lie 3 in the header.
const slope = (key) => {
  const ys = rows.slice(1).map((r) => r[key])
  const n = ys.length
  if (n < 3) return 0
  const mx = (n - 1) / 2
  const my = ys.reduce((a, c) => a + c, 0) / n
  let num = 0, den = 0
  for (let i = 0; i < n; i++) { num += (i - mx) * (ys[i] - my); den += (i - mx) ** 2 }
  return den ? num / den : 0
}
const avg = (a) => (a.length ? a.reduce((x, c) => x + c, 0) / a.length : 0)
const first = rows[1] ?? rows[0]
const last = rows[rows.length - 1]
const fail = []
const note = []

// Counted objects must not trend AT ALL. Each is a designed integer, so
// +1 per cycle is an object created and never released, however small.
for (const [k, label] of [
  ['geometries', 'WebGL geometries'],
  ['textures', 'WebGL textures'],
  ['programs', 'shader programs'],
  ['audio', 'live audio nodes'],
  ['listeners', 'DOM listeners'],
  ['dom', 'DOM nodes'],
]) {
  const s = slope(k)
  const d = last[k] - first[k]
  if (s > 0.25 && d > 1)
    fail.push(`${label} grow ${s.toFixed(2)} per cycle (${first[k]} -> ${last[k]} over ${CYCLES}). Nothing here should trend.`)
  else if (d !== 0) note.push(`${label} ${first[k]}->${last[k]}`)
}

const maxRaf = Math.max(...rows.map((r) => r.rafPerFrame))
if (maxRaf > 1) fail.push(`${maxRaf} requestAnimationFrame registrations inside one frame -- the loop is duplicated, and every copy pays a full render.`)

const mb = (v) => v / 1048576
const heapSlope = slope('heap') / 1048576
if (heapSlope > 0.6 && last.heap > first.heap * 1.5)
  fail.push(`JS heap climbs ${heapSlope.toFixed(2)} MB per cycle (${mb(first.heap).toFixed(1)} -> ${mb(last.heap).toFixed(1)} MB) and survives a forced collection. Something is retained per cycle.`)

// The symptom itself, as a ratio. Absolutes depend on the machine; the
// ratio depends on the product.
// A RATIO NEEDS AN ABSOLUTE FLOOR BESIDE IT. The render call here measures
// 0.6ms one sample and 2.0ms the next, bimodally, because it is timing a
// submission that the driver may or may not have flushed. Three-sample
// averages of that turn 0.3ms of noise into "grew 37%", which this check
// duly reported against a run whose object counts were flat to the integer
// and whose p99 was 3.10ms in every single cycle. A percentage of a
// sub-millisecond quantity is not a finding.
//
// So both must hold: it grew proportionally AND it grew by an amount worth
// a person's attention. `minAbs` is that second bar, in the metric's own
// units, and a real regression clears it easily -- a render going 5ms to
// 12ms is +7ms, not +0.3ms.
// USE EVERY SAMPLE, NOT JUST THE ENDS. Comparing the first three cycles to
// the last three throws away the middle of the run, which is where the
// evidence of a TREND lives. A mutation that added a growing spin to
// Scene.render produced a textbook monotonic rise -- 0.70 0.90 1.00 1.10
// 1.20 1.40 1.50 1.70 -- and the endpoint comparison reduced that to
// "+0.50ms", under the floor, and passed. The slope had it the whole time.
//
// So all three must agree: it rose proportionally, it rose by an amount
// worth a person's attention, and it rose MONOTONICALLY enough for least
// squares to see it. Noise fails the third; a real regression passes all.
const grew = (key, label, tol, minAbs) => {
  const e = avg(rows.slice(1, 4).map((r) => r[key]))
  const l = avg(rows.slice(-3).map((r) => r[key]))
  const s = slope(key)
  const ratio = e ? l / e : 1
  if (ratio > tol && l - e >= minAbs && s > 0)
    fail.push(`${label} grew ${((ratio - 1) * 100).toFixed(0)}% across the run (${e.toFixed(2)} -> ${l.toFixed(2)}, +${(l - e).toFixed(2)}, slope ${s.toFixed(3)}/cycle).`)
  else note.push(`${label} ${e.toFixed(2)}->${l.toFixed(2)}`)
}
// TIMING IS ONLY ASSERTED ON REAL HARDWARE. Under swiftshader the render
// call swings between 0.2ms and 160ms sample to sample — the rasteriser is
// on the CPU and competes with everything else on the box — so a ratio
// across the run is noise, and asserting on it made this check fail inside
// the suite and pass on its own. A flaky check is worse than no check: it
// teaches people to re-run until green, which is how a real finding gets
// dismissed. The object counts above need no GPU and carry the load.
if (GPU) {
  // Floors in each metric's own units: 1ms of extra render per frame is
  // visible, 0.3ms is the driver shrugging; 2ms/s more layout is real, a
  // rounding difference is not; 150ms/s more script is a sixth of a core.
  grew('r50', 'render call (median)', 1.25, 1)
  grew('r99', 'render call (p99)', 1.25, 2)
  grew('layoutMs', 'layout ms/s', 1.6, 2)
  grew('scriptMs', 'script ms/s', 1.4, 150)
} else {
  note.push('timing not asserted (software rasteriser; run with --gpu)')
}

// Guards against measuring nothing.
if (rows.slice(1).some((r) => r.renders < 20)) fail.push('a sample caught fewer than 20 renders -- the scene was not drawing, so no timing here is evidence.')
if (last.audio < 8) fail.push(`only ${last.audio} live audio nodes were ever seen -- the census missed the engine and every audio finding is vacuous.`)
if (errs.length) fail.push(`page errors during the run: ${[...new Set(errs)].slice(0, 3).join(' | ')}`)

if (VERBOSE) {
  console.log('\n  cycle   heapMB  geo  tex  prog  audio  lstn   dom   rndr50 rndr99  lay/s  rsty/s  layms  scrms')
  for (const r of rows)
    console.log(
      `  ${r.label.padEnd(6)} ${mb(r.heap).toFixed(1).padStart(6)}  ${String(r.geometries).padStart(3)}  ${String(r.textures).padStart(3)}  ${String(r.programs).padStart(4)}  ${String(r.audio).padStart(5)}  ${String(r.listeners).padStart(4)}  ${String(r.dom).padStart(4)}  ${r.r50.toFixed(2).padStart(6)}  ${r.r99.toFixed(2).padStart(6)}  ${r.layouts.toFixed(1).padStart(5)}  ${r.restyles.toFixed(1).padStart(6)}  ${r.layoutMs.toFixed(1).padStart(5)}  ${r.scriptMs.toFixed(0).padStart(5)}`,
    )
  const ag = Object.keys(last.audioKinds).filter((k) => last.audioKinds[k] > first.audioKinds[k])
  if (ag.length) console.log('\n  audio nodes that grew: ' + ag.map((k) => `${k} ${first.audioKinds[k]}->${last.audioKinds[k]}`).join(', '))
  const lg = Object.keys(last.listenerKinds).filter((k) => last.listenerKinds[k] > (first.listenerKinds[k] || 0))
  if (lg.length) console.log('  listeners that grew:   ' + lg.map((k) => `${k} ${first.listenerKinds[k] || 0}->${last.listenerKinds[k]}`).join(', '))
  const top = Object.entries(last.paramBy).sort((a, c) => c[1] - a[1]).slice(0, 4)
  console.log('  AudioParam writes:     ' + top.map(([k, v]) => `${k} ${v}`).join(', '))
  console.log('')
}

if (fail.length) {
  console.error(`leak: ${fail.length} finding${fail.length > 1 ? 's' : ''}`)
  for (const f of fail) console.error('  · ' + f)
} else {
  console.log(`leak         ok  (${CYCLES} cycles, nothing accumulated${note.length ? '; ' + note.join('; ') : ''})`)
}
await b.close()
process.exit(fail.length ? 1 : 0)
