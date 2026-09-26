#!/usr/bin/env node
// The second-screen laws, proven rather than assumed.
//
// Four features share one shape: they only exist for the moment you are
// NOT looking directly at the console -- half-watching while it plays,
// glancing away to another window, cramming it onto a phone, or arriving
// cold with no idea what the star does. Every one of them has a failure
// mode that a screenshot of the console at rest cannot show, because the
// bug only appears once you stop touching it, hide the tab, shrink the
// viewport, or wipe localStorage:
//
//   WATCH   arms on a setTimeout no click ever fires, so a check that
//           only ever clicks and reads never runs the code path at all.
//   MINI STAR (PiP)  the render loop's clock hands off from this window's
//           rAF to the picture-in-picture window's -- get the handoff
//           wrong and the mini star freezes solid, or (a real bug, once)
//           the PiP window's frame timestamps, which run on that
//           document's own clock, fed the sim a negative dt and the whole
//           stage -- and so the copy -- blew out to solid white. A static screenshot of an
//           open PiP window cannot tell "frozen" from "playing" apart;
//           only watching the clock advance while the tab is hidden can.
//   PHONE   the star's aim function measures `.cn-stage`'s live rect, not
//           a constant -- so it can only be wrong at a size nobody develops
//           at, and every check that only runs at 1440x900 will miss it.
//   HINT TOUR  driver.js replaces the hand-rolled "not now" tour, and its
//           two lengths (a single power-on card vs. the six-card [?] walk)
//           are easy to cross wire -- ship the six-card walk on power-on
//           and a stranger from a shared link is shown a lesson meant for
//           someone sitting beside you.
//
// Each section below drives the actual gesture (idle timeout, tab
// visibility, viewport resize, a wiped localStorage key) and reads the
// scene's own state through window.__sc / window.__eng, the same way
// flight.mjs reads window.__sc rather than trusting a screenshot.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const b = await puppeteer.launch({
  args: ['--enable-unsafe-swiftshader', '--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
})
const fail = []
const report = []

// waitUntil is domcontentloaded, NOT networkidle2. The console streams
// radio, and a media element holds its connection open for as long as it
// plays -- so "no more than two connections for 500ms" is a condition
// this page can never reach. Every section below polls for the state it
// actually needs (`.app.live`, a class, a window global) rather than
// trusting the network to go quiet. 60s, not puppeteer's default 30: these
// run under a software rasteriser, and the app is three.js plus six shader
// programs plus a 108k-particle field before it paints.
async function openPage(w, h, { onboarded = true } = {}) {
  const p = await b.newPage()
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await p.evaluateOnNewDocument((onb) => {
    try {
      if (onb) localStorage.setItem('scope-onboard-v1', '1')
      else localStorage.removeItem('scope-onboard-v1')
    } catch {
      /* private mode: the app's own onboard guard treats this the same as unset */
    }
  }, onboarded)
  const errs = []
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 160)))
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  return { p, errs }
}

async function powerOn(p, settleMs = 3500) {
  await sleep(1500)
  const clicked = await p.evaluate(() => {
    const el = document.querySelector('.power')
    if (!el) return false
    el.click()
    return true
  })
  if (!clicked) return false
  await sleep(settleMs)
  return true
}

async function waitFor(p, fn, { timeout = 8000, interval = 200, args = [] } = {}) {
  const by = Date.now() + timeout
  while (Date.now() < by) {
    const v = await p.evaluate(fn, ...args)
    if (v) return v
    await sleep(interval)
  }
  return false
}

// ── 1. WATCH MODE ───────────────────────────────────────────────────────
// The chrome recedes on its own after WATCH_IDLE_MS (6000ms) with no
// input, only while the engine is actually playing -- so the guard below
// is not decoration, it is the one thing that tells "watch never armed"
// apart from "watch armed and this check never noticed, because audio
// never started in the first place."
{
  const { p, errs } = await openPage(1440, 900)
  const on = await powerOn(p)
  if (!on) {
    fail.push('watch: no `.power` control found -- nothing could start the console.')
  } else {
    const playing = await p.evaluate(() => !!window.__eng?.playing)
    if (!playing) {
      fail.push(
        'watch: window.__eng.playing is false after power-on. Watch only arms while playing, so audio ' +
          'never starting here means this law was never actually exercised -- this is a real gap, not a pass.',
      )
    } else {
      // no input for ~6s (the idle timeout) plus the 900ms fade plus margin
      await sleep(6000)
      await sleep(1200)
      const armed = await p.evaluate(() => ({
        cls: document.querySelector('.app')?.className ?? '',
        opacity: +getComputedStyle(document.querySelector('.cn-plate')).opacity,
        fx: window.__sc?.focusNow?.x,
      }))
      const armedWatching = /(^|\s)watching(\s|$)/.test(armed.cls)
      if (!armedWatching) fail.push(`watch: after 6s idle .app did not gain "watching" (class="${armed.cls}").`)
      if (!(armed.opacity <= 0.02))
        fail.push(`watch: .cn-plate opacity is ${armed.opacity} after the 900ms fade, expected ~0.`)
      if (armed.fx === undefined || Math.abs(armed.fx - 0.5) > 0.02)
        fail.push(`watch: focusNow.x is ${armed.fx} while watching, expected ~0.5 (±0.02).`)

      // wake: two mouse moves further apart than the 6px wake threshold
      await p.mouse.move(700, 400)
      await p.mouse.move(760, 460)
      await sleep(1200)
      const woke = await p.evaluate(() => ({
        cls: document.querySelector('.app')?.className ?? '',
        opacity: +getComputedStyle(document.querySelector('.cn-plate')).opacity,
        fx: window.__sc?.focusNow?.x,
      }))
      const wokeWatching = /(^|\s)watching(\s|$)/.test(woke.cls)
      if (wokeWatching) fail.push(`watch: "watching" did not clear after moving the mouse (class="${woke.cls}").`)
      if (!(woke.opacity >= 0.98))
        fail.push(`watch: .cn-plate opacity is ${woke.opacity} after waking, expected ~1.`)
      if (woke.fx === undefined || Math.abs(woke.fx - 0.61) > 0.02)
        fail.push(`watch: focusNow.x is ${woke.fx} after waking, expected ~0.61 (the stage cell).`)

      report.push(
        `watch: armed cls-has-watching=${armedWatching} plate-opacity=${armed.opacity} focus.x=${armed.fx?.toFixed?.(3)} ` +
          `→ woke cls-has-watching=${wokeWatching} plate-opacity=${woke.opacity} focus.x=${woke.fx?.toFixed?.(3)}`,
      )
    }
  }
  if (errs.length) fail.push(`watch: page errors -- ${errs.join(' | ')}`)
  await p.close()
}

// ── 2. MINI STAR (Document Picture-in-Picture) ─────────────────────────
// The render loop's clock hands off to the PiP window's rAF while this
// tab is hidden (see App.tsx `schedule()`), and a past bug fed the crop a
// frame from the wrong window's clock and painted the mini star solid
// white. So this does not just check the PiP window opened -- it samples
// actual pixels, and it runs the SAME hidden-tab probe with and without
// PiP as its own control: if the clock advances while hidden even without
// PiP, the "control" is broken and the later "advances" assertion means
// nothing.
{
  const { p, errs } = await openPage(1440, 900)
  const on = await powerOn(p)
  if (!on) {
    fail.push('pip: no `.power` control found -- nothing could start the console.')
  } else {
    const probe = () =>
      p.evaluate(() => ({ vis: document.visibilityState, t: window.__eng?.analyser?.now ?? -1 }))

    // CONTROL: hide the tab with no PiP open. If the clock advances here
    // too, the assertion below ("advances only with PiP") is vacuous.
    {
      await p.bringToFront()
      const other = await b.newPage()
      await other.goto('about:blank')
      await other.bringToFront()
      const t0 = await probe()
      await sleep(1500)
      const t1 = await probe()
      await other.close()
      const delta = t1.t - t0.t
      if (!(delta < 0.03))
        fail.push(
          `pip control: window.__eng.analyser.now advanced by ${delta.toFixed(3)}s while the tab was hidden ` +
            `and NO PiP window was open (${t0.t.toFixed(2)} -> ${t1.t.toFixed(2)}). A hidden tab gets no rAF, ` +
            `so this should be frozen -- the control itself is broken, which means the "advances with PiP" ` +
            `check below cannot be trusted either.`,
        )
      report.push(`pip: control (no PiP, hidden) clock delta ${delta.toFixed(3)}s`)
    }

    await p.bringToFront()
    const opened = await p.evaluate(() => {
      const el = document.querySelector('.cn-pip')
      if (!el) return false
      el.click()
      return true
    })
    if (!opened) {
      fail.push('pip: no `.cn-pip` control found -- the mini star cannot be opened.')
    } else {
      await sleep(2000)
      const r = await p.evaluate(() => {
        const w = window.documentPictureInPicture?.window
        const btn = document.querySelector('.cn-pip')
        if (!w) return { open: false, btnOn: btn?.className.includes('on') ?? false }
        const cv = w.document.querySelector('.pip-star')
        const cap = w.document.querySelector('.pip-cap')
        let meanRed = -1
        if (cv && cv.width > 0 && cv.height > 0) {
          const ctx = cv.getContext('2d')
          const data = ctx.getImageData(0, 0, cv.width, cv.height).data
          let sum = 0
          let n = 0
          for (let i = 0; i < data.length; i += 4) {
            sum += data[i]
            n++
          }
          meanRed = sum / n
        }
        return { open: true, btnOn: btn?.className.includes('on') ?? false, meanRed, cap: cap?.textContent ?? '' }
      })
      if (!r.open) fail.push('pip: `.cn-pip` was clicked but window.documentPictureInPicture.window does not exist.')
      if (!r.btnOn) fail.push('pip: `.cn-pip` did not gain class "on" after opening.')
      if (r.open) {
        if (!(r.meanRed >= 3 && r.meanRed <= 200))
          fail.push(
            `pip: .pip-star's mean red channel is ${r.meanRed.toFixed(1)}, expected 3..200 -- a value outside ` +
              `that band is a uniform canvas (solid white ~255 or solid black ~0), the exact shape of the past ` +
              `bug where the mini star copied a frame from the wrong clock.`,
          )
        if (!r.cap || !r.cap.trim()) fail.push('pip: `.pip-cap` caption is empty.')
        report.push(`pip: open meanRed=${r.meanRed.toFixed(1)} cap="${r.cap}"`)
      }

      if (r.open) {
        // WITH PiP open, hide the main tab -- the loop should have handed
        // off to the PiP window's rAF, so the clock keeps moving.
        const other = await b.newPage()
        await other.goto('about:blank')
        await other.bringToFront()
        const t0 = await probe()
        await sleep(1500)
        const t1 = await probe()
        await other.close()
        const delta = t1.t - t0.t
        if (!(delta > 0.03))
          fail.push(
            `pip: window.__eng.analyser.now only advanced by ${delta.toFixed(3)}s over 1.5s with the tab hidden ` +
              `and PiP open (${t0.t.toFixed(2)} -> ${t1.t.toFixed(2)}) -- the loop did not hand off to the PiP ` +
              `window, so the mini star is frozen exactly when it exists to keep running.`,
          )
        report.push(`pip: with PiP open, hidden-tab clock delta ${delta.toFixed(3)}s`)

        // Close the PiP window; the loop must return to the main window.
        await p.bringToFront()
        await p.evaluate(() => window.documentPictureInPicture?.window?.close())
        await sleep(1000)
        const after = await p.evaluate(() => ({
          pipGone: !window.documentPictureInPicture?.window,
          btnOn: document.querySelector('.cn-pip')?.className.includes('on') ?? false,
        }))
        if (!after.pipGone) fail.push('pip: documentPictureInPicture.window still exists after close().')
        if (after.btnOn) fail.push('pip: `.cn-pip` still has class "on" after the PiP window was closed.')
        const t2 = await probe()
        await sleep(1200)
        const t3 = await probe()
        const resumeDelta = t3.t - t2.t
        if (!(resumeDelta > 0.03))
          fail.push(
            `pip: after closing the PiP window, window.__eng.analyser.now only advanced by ` +
              `${resumeDelta.toFixed(3)}s over 1.2s on the (visible) main tab -- the loop did not return to ` +
              `the main window.`,
          )
        report.push(`pip: after close, main-window clock delta ${resumeDelta.toFixed(3)}s`)
      }
    }
  }
  if (errs.length) fail.push(`pip: page errors -- ${errs.join(' | ')}`)
  await p.close()
}

// ── 3. PHONE (star first) ───────────────────────────────────────────────
// `.cn-stage`'s aim is a measured rect, not a constant, which is exactly
// why a suite that only ever runs at 1440x900 cannot see this: the rail
// hides, the mini deck takes over, and the star has to re-aim into
// whichever row is actually on screen.
{
  const { p, errs } = await openPage(390, 844)
  const on = await powerOn(p)
  if (!on) {
    fail.push('phone: no `.power` control found -- nothing could start the console.')
  } else {
    const closed = await p.evaluate(() => {
      const mini = document.querySelector('.cn-mini')
      const rail = document.querySelector('.rail')
      const stage = document.querySelector('.cn-stage')
      return {
        miniVisible: !!mini && getComputedStyle(mini).display !== 'none' && mini.getBoundingClientRect().height > 0,
        railDisplay: rail ? getComputedStyle(rail).display : '(missing)',
        scrollWidth: document.documentElement.scrollWidth,
        stageH: stage ? stage.getBoundingClientRect().height : 0,
        fx: window.__sc?.focusNow?.x,
      }
    })
    if (!closed.miniVisible) fail.push('phone: `.cn-mini` is not visible with the sheet closed.')
    if (closed.railDisplay !== 'none')
      fail.push(`phone: \`.rail\` display is "${closed.railDisplay}" with the sheet closed, expected "none".`)
    if (!(closed.scrollWidth <= 390))
      fail.push(`phone: document.scrollWidth is ${closed.scrollWidth}, expected <= 390 (no horizontal scroll).`)
    if (!(closed.stageH > 600)) fail.push(`phone: .cn-stage height is ${closed.stageH}px, expected > 600px.`)
    if (closed.fx === undefined || Math.abs(closed.fx - 0.5) > 0.02)
      fail.push(`phone: focusNow.x is ${closed.fx}, expected ~0.5 with the sheet closed.`)
    report.push(
      `phone: closed mini=${closed.miniVisible} rail=${closed.railDisplay} scrollW=${closed.scrollWidth} ` +
        `stageH=${Math.round(closed.stageH)} focus.x=${closed.fx?.toFixed?.(3)}`,
    )

    const clickedSheet = await p.evaluate(() => {
      const el = document.querySelector('.cn-mini-sheet')
      if (!el) return false
      el.click()
      return true
    })
    if (!clickedSheet) {
      fail.push('phone: no `.cn-mini-sheet` control found -- the sheet cannot be opened.')
    } else {
      await sleep(1500)
      const open = await p.evaluate(() => {
        const plate = document.querySelector('.cn-plate')
        const rail = document.querySelector('.rail')
        const stage = document.querySelector('.cn-stage')
        return {
          plateSheet: !!plate && /(^|\s)sheet(\s|$)/.test(plate.className),
          railVisible: !!rail && getComputedStyle(rail).display !== 'none' && rail.getBoundingClientRect().height > 0,
          stageH: stage ? stage.getBoundingClientRect().height : 0,
          fy: window.__sc?.focusNow?.y,
        }
      })
      if (!open.plateSheet) fail.push('phone: `.cn-plate` did not gain class "sheet" after clicking `.cn-mini-sheet`.')
      if (!open.railVisible) fail.push('phone: `.rail` is not visible after opening the sheet.')
      if (!(open.stageH < 400)) fail.push(`phone: .cn-stage height is ${open.stageH}px with the sheet open, expected < 400px.`)
      if (open.fy === undefined || !(open.fy < 0.35))
        fail.push(`phone: focusNow.y is ${open.fy} with the sheet open, expected < 0.35 (re-aimed into the smaller stage row).`)
      report.push(
        `phone: sheet-open plateSheet=${open.plateSheet} rail=${open.railVisible} stageH=${Math.round(open.stageH)} ` +
          `focus.y=${open.fy?.toFixed?.(3)}`,
      )
    }
  }
  if (errs.length) fail.push(`phone: page errors -- ${errs.join(' | ')}`)
  await p.close()
}

// ── 4. HINT TOUR ─────────────────────────────────────────────────────────
// Two lengths, easy to cross wire: the power-on card ("hint") has to stay
// the ONE card with no progress text, and the header's [?] has to still
// open the full six-card walk with its progress showing -- ship the full
// walk on power-on instead and a stranger from a shared link is handed a
// lesson meant for someone sitting beside them (see Onboard.tsx's own
// header comment on why the swap to driver.js has two lengths at all).
{
  const { p, errs } = await openPage(1440, 900, { onboarded: false })
  const on = await powerOn(p, 0)
  if (!on) {
    fail.push('hint: no `.power` control found -- nothing could start the console.')
  } else {
    await sleep(1500)
    const pop = await waitFor(p, () => !!document.querySelector('.driver-popover'), { timeout: 4000 })
    if (!pop) {
      fail.push('hint: no `.driver-popover` appeared ~1.5s after power-on with the onboard key removed.')
    } else {
      // driver.js settles its own entrance transition over `duration` (240ms)
      // before it marks the step "active" internally -- destroying the tour
      // before that settles skips onDestroyed entirely (the DOM popover is
      // torn down either way, so that alone is invisible). A brief pause
      // here is the difference between testing the real interaction and
      // racing driver's own animation.
      await sleep(500)
      const hint = await p.evaluate(() => {
        const pop = document.querySelector('.driver-popover')
        const progress = pop?.querySelector('.driver-popover-progress-text')
        const title = pop?.querySelector('.driver-popover-title')
        return {
          progressText: (progress?.textContent ?? '').trim(),
          progressShown: progress ? getComputedStyle(progress).display !== 'none' : false,
          title: (title?.textContent ?? '').toLowerCase(),
        }
      })
      // showProgress is false for the hint (Onboard.tsx: `showProgress: !hint`),
      // which hides the counter via display:none -- driver.js still fills in
      // the text ("1/1", current/total of the single-lesson array) whether or
      // not it is shown, so the real assertion is visibility, not the text.
      if (hint.progressShown)
        fail.push(`hint: the power-on card's progress counter ("${hint.progressText}") is visible -- it should show none.`)
      if (!hint.title.includes('grab the star'))
        fail.push(`hint: the power-on card's title is "${hint.title}", expected it to contain "grab the star".`)
      report.push(`hint: card progressShown=${hint.progressShown} (text="${hint.progressText}") title="${hint.title}"`)

      const clicked = await p.evaluate(() => {
        const btn = document.querySelector('.driver-popover .driver-popover-next-btn')
        if (!btn) return false
        btn.click()
        return true
      })
      if (!clicked) fail.push('hint: no next/done button found on the popover.')
      else {
        await sleep(400)
        const after = await p.evaluate(() => ({
          gone: !document.querySelector('.driver-popover'),
          key: (() => {
            try {
              return localStorage.getItem('scope-onboard-v1')
            } catch {
              return null
            }
          })(),
        }))
        if (!after.gone) fail.push('hint: `.driver-popover` is still present after clicking next/done.')
        if (after.key !== '1')
          fail.push(`hint: localStorage 'scope-onboard-v1' is ${JSON.stringify(after.key)} after dismissing the card, expected "1".`)
        report.push(`hint: dismissed gone=${after.gone} localStorage=${JSON.stringify(after.key)}`)
      }

      // The header's [?] must still open the FULL walk, progress showing.
      const openedFull = await p.evaluate(() => {
        const el = document.querySelector('.rail-help')
        if (!el) return false
        el.click()
        return true
      })
      if (!openedFull) {
        fail.push('hint: no `.rail-help` control found -- the full walk cannot be opened.')
      } else {
        const fullPop = await waitFor(p, () => !!document.querySelector('.driver-popover'), { timeout: 4000 })
        if (!fullPop) {
          fail.push('hint: clicking `.rail-help` did not open a `.driver-popover`.')
        } else {
          await sleep(500)
          const full = await p.evaluate(() => {
            const pop = document.querySelector('.driver-popover')
            const progress = pop?.querySelector('.driver-popover-progress-text')
            return (progress?.textContent ?? '').trim()
          })
          if (full !== '1/6')
            fail.push(`hint: the full walk's first card shows progress "${full}", expected "1/6".`)
          report.push(`hint: full walk progressText="${full}"`)
        }
      }
    }
  }
  if (errs.length) fail.push(`hint: page errors -- ${errs.join(' | ')}`)
  await p.close()
}

await b.close()

if (fail.length) {
  console.error(`second-screen FAILED\n` + [...new Set(fail)].map((f) => '  · ' + f).join('\n'))
  process.exit(1)
}
console.log(`second-screen ok\n` + report.map((r) => '  · ' + r).join('\n'))
