#!/usr/bin/env node
// The console holds together at every size, not just the one I develop at.
//
// Every other browser check runs at 1440x900. The Browser pane runs at
// 560x863 — narrow and tall, below the 820px breakpoint — and at that size
// the panel sat INSIDE the rim: the panel's head ran through the
// now-playing line and the strip covered the noon credit. Ten checks passed
// through all of it, because none of them ever looked at that shape.
//
// The console is three bands in a plate -- .cn-hdr, the body holding the
// scrolling .rail-stack, and .cn-ftr -- whose heights are content
// dependent. That is a layout that WILL collide again the first time a
// track title wraps or a breakpoint moves. So: boot at each size, walk
// every source, and assert the bands clear each other and every control
// can actually be reached.
//
// The selectors used to name .strip/.floor/.panel.open, which were the old
// bottom-sheet console's and exist nowhere in the shipped app -- so this
// walked all seven viewports comparing nothing and reported green. The
// emptiness guard at the end is what eventually said so.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const VIEWPORTS = [
  { w: 1440, h: 900, name: 'desktop' },
  { w: 1024, h: 768, name: 'tablet' },
  { w: 820, h: 900, name: 'breakpoint' },   // exactly on the media-query edge
  { w: 560, h: 863, name: 'browser-pane' }, // the size the work is reviewed at
  { w: 390, h: 844, name: 'phone' },
  // SHORT viewports. Every entry above is >=768px tall, so nothing here
  // exercised a room with little vertical space -- and the floor's height is
  // content-driven and was height-blind, taking 62% of an 800x560 window.
  // The fix attempted for that (keeping the row layout on short windows by
  // gating the stack on `min-height`) pushed the `tube` source button and the
  // noon credit off the right edge at 800px, clipped rather than scrolled so
  // nothing announced it -- and it passed this check, because this check
  // could not see a short room. These two entries are why it cannot happen
  // again.
  { w: 900, h: 600, name: 'short-laptop' },
  { w: 800, h: 560, name: 'short-window' },
]

const b = await puppeteer.launch({ args: ['--enable-unsafe-swiftshader', '--no-sandbox'] })
const fail = []
const report = []
let tabsSeen = 0
let bandsSeen = 0

for (const vp of VIEWPORTS) {
  const p = await b.newPage()
  await p.setViewport({ width: vp.w, height: vp.h })
  await p.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode: the guard below catches it */ } })
  const errs = []
  p.on('pageerror', e => errs.push(e.message.slice(0, 110)))
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
  await new Promise(r => setTimeout(r, 2500))
  await p.keyboard.press('Enter')
  const by = Date.now() + 20000
  while (Date.now() < by) {
    if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
    await new Promise(r => setTimeout(r, 250))
  }
  if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
    fail.push(`${vp.name} (${vp.w}x${vp.h}): never reached the console.`)
    await p.close(); continue
  }
  // The tour is kept from ever opening, the way every other browser check
  // does it (see console-keys, readings, ui-guard). It used to be dismissed
  // by hunting a button reading "not now" -- the HAND-ROLLED tour's -- and
  // the staleness guard watched for `.onboard`, that tour's container.
  // driver.js has neither. So the skip loop spun for its full 6s finding
  // nothing, the guard saw no `.onboard` and stayed quiet, and the tour sat
  // open over the console for all seven viewports: driver's spotlight is an
  // SVG <path> across the whole screen, so EVERY control read as covered by
  // `path.?` and the check blamed the layout for the tour.
  if (await p.evaluate(() => !!document.querySelector('.driver-overlay, .driver-popover, .driver-active'))) {
    fail.push(`${vp.name}: the tour is open over the console, so every control reads as covered — this check is stale and is NOT passing.`)
  }

  // The mix panel only reaches its full height DISSECTED -- six tier rows
  // appear that do not exist otherwise. Checking it closed measures a panel
  // half its real size, which is why the clipping shipped.
  await p.evaluate(() => { document.activeElement?.blur?.(); document.body.focus() })
  // ASSERT IT OPENED. This press is the whole reason the mix panel reaches
  // its real height here -- and if it silently fails, this check measures a
  // panel at half size and reports OK. That is a false pass, which is worse
  // than a false failure, and it is how the clipped panel shipped in the
  // first place: the check was looking at the wrong room and saying so
  // confidently.
  {
    // Re-press only if the press was DROPPED. `d` toggles, so pressing again
    // while the damper is gliding reverses it -- a blind three-attempt retry
    // left uDissect at 0.28, caught heading back. A single press dropped on a
    // real run at 1024x768, so one retry is needed; distinguishing "dropped"
    // from "slow" is what makes it safe.
    const readD = () => p.evaluate(() => window.__sc?.uniforms?.uDissect?.value ?? 0)
    let opened = false
    for (let attempt = 0; attempt < 3 && !opened; attempt++) {
      const before = await readD()
      await p.keyboard.press('KeyD')
      const by2 = Date.now() + 9000
      let moved = false
      while (Date.now() < by2) {
        const d = await readD()
        if (d > 0.6) { opened = true; break }
        if (Math.abs(d - before) > 0.02) moved = true
        await new Promise(r => setTimeout(r, 200))
      }
      if (moved && !opened) break
    }
    if (!opened) {
      const d = await p.evaluate(() => +(window.__sc?.uniforms?.uDissect?.value ?? -1).toFixed(2))
      fail.push(`${vp.name} (${vp.w}x${vp.h}): pressing d did not open the stack (uDissect ${d}), so the mix panel was measured at a fraction of its real height. This check is stale and is NOT passing.`)
    }
  }

  const tabs = await p.evaluate(() => [...document.querySelectorAll('.rail-src button')].map(x => x.textContent.trim()))
  tabsSeen += tabs.length
  for (const tab of tabs.length ? tabs : [null]) {
    if (tab) {
      await p.evaluate(t => [...document.querySelectorAll('.rail-src button')].find(x => x.textContent.trim() === t)?.click(), tab)
      await new Promise(r => setTimeout(r, 700))
    }
    const r = await p.evaluate(() => {
      const box = s => { const e = document.querySelector(s); if (!e) return null
        const b = e.getBoundingClientRect(); return { t: b.top, b: b.bottom, l: b.left, r: b.right, w: b.width, h: b.height } }
      // CONTENT boxes, not padding boxes: a band's padding may legitimately
      // sit under the band below it, and only the content must clear.
      // WHICH element scrolls is a breakpoint decision, not a constant. On
      // the plate the rail is a fixed column and .rail-stack scrolls inside
      // it; under 720px the body restacks, .rail-stack goes `overflow:
      // visible` and .rail becomes the single scroller. Naming one of them
      // reported the phone as "clipped, bottom past the viewport by 626px
      // with no scroll" while the rail was scrolling perfectly well -- so
      // the scroller is found, not assumed.
      const scroller = (() => {
        for (const sel of ['.rail-stack', '.rail']) { const e = document.querySelector(sel)
          if (e && e.scrollHeight > e.clientHeight + 1) return e }
        return document.querySelector('.rail-stack') || document.querySelector('.rail') })()
      const content = s => { const e = typeof s === 'string' ? document.querySelector(s) : s; if (!e) return null
        // A SCROLLING container's children are not all laid out on screen --
        // the ones scrolled past extend far outside its box by design. Taking
        // the union of every child then reports a scrollable panel as
        // overlapping everything below it, which is how this check called a
        // correctly-clamped mix panel broken. Where the element scrolls, its
        // own box IS its extent.
        if (e.scrollHeight > e.clientHeight + 1) {
          const r = e.getBoundingClientRect()
          return { t: r.top, b: r.bottom, l: r.left, r: r.right }
        }
        const kids = [...e.children].map(c => c.getBoundingClientRect()).filter(k => k.width > 0 && k.height > 0)
        if (!kids.length) return null
        return { t: Math.min(...kids.map(k => k.top)), b: Math.max(...kids.map(k => k.bottom)),
                 l: Math.min(...kids.map(k => k.left)), r: Math.max(...kids.map(k => k.right)) } }
      // Same reasoning for reachability: a control scrolled out of its own
      // panel is reachable by scrolling, and asking what sits at its centre
      // returns whatever is painted there instead.
      const inView = e => { const sc = scroller && scroller.contains(e) ? scroller : null
        if (!sc || sc.scrollHeight <= sc.clientHeight + 1) return true
        const r = e.getBoundingClientRect(), s2 = sc.getBoundingClientRect()
        // The CENTRE, not any part of it: a control half-clipped at the
        // scroll edge is partly visible, but the point this check probes is
        // its centre -- and that centre lands outside the panel, where
        // elementFromPoint returns the star behind it. Testing "partly
        // visible" reported working controls as covered by the canvas.
        const cy = r.top + r.height / 2
        return cy > s2.top + 1 && cy < s2.bottom - 1 }
      // 1px of tolerance: the panel's bottom edge and the floor's top edge
      // are THE SAME EDGE, and sub-pixel layout puts them at 421.98 and
      // 421.99 -- which a strict comparison calls a collision. Bands that
      // touch are correct; bands that genuinely run through each other are
      // the fault this looks for.
      const ov = (a, c) => a && c && a.l < c.r - 1 && c.l < a.r - 1 && a.t < c.b - 1 && c.t < a.b - 1
      const rim = content('.cn-ftr'), strip = content('.cn-hdr'), panel = content(scroller)
      // reported out so the run can tell "no bands overlap" from "no bands"
      const bandsFound = [rim, strip, panel].filter(Boolean).length
      // is every visible control actually the topmost thing at its centre?
      const blocked = [...document.querySelectorAll('.cn-ftr button, .cn-hdr button, .rail-stack button, .rail-stack [role="slider"]')]
        .filter(e => { const bb = e.getBoundingClientRect()
          return bb.width > 4 && bb.height > 4 && getComputedStyle(e).visibility !== 'hidden' })
        .filter(inView)
        .filter(e => { const bb = e.getBoundingClientRect()
          const top = document.elementFromPoint(bb.left + bb.width / 2, bb.top + bb.height / 2)
          return !(top === e || e.contains(top) || top?.contains(e)) })
        .map(e => { const bb = e.getBoundingClientRect()
          const top = document.elementFromPoint(bb.left + bb.width / 2, bb.top + bb.height / 2)
          const who = top ? `${top.tagName.toLowerCase()}.${(typeof top.className === 'string' ? top.className : '').trim().split(/\s+/)[0] || '?'}` : 'nothing'
          return `${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 14)} <- ${who}` })
      const offscreen = [rim, strip, panel].filter(Boolean).filter(x => x.t < 0 || x.b > innerHeight + 1)
      // A PANEL MAY NOT CLIP ITS OWN TOP. The dissected mix panel grew to
      // 580px and was cut off ABOVE the viewport on every size under
      // 1280x800 -- controls off the top of the screen, unreachable, with
      // nothing to indicate they existed. Overflow that SCROLLS is fine; a
      // control table is allowed to be longer than the room. Overflow that
      // is silently cut is not, and the two look identical in a screenshot.
      const pEl = scroller
      const clipped = pEl ? (() => {
        const r = pEl.getBoundingClientRect()
        const scrolls = pEl.scrollHeight > pEl.clientHeight + 1
        if (r.top < -1 && !scrolls) return `top cut at ${Math.round(r.top)}px with no scroll`
        if (r.bottom > innerHeight + 1 && !scrolls) return `bottom past the viewport by ${Math.round(r.bottom - innerHeight)}px with no scroll`
        return null
      })() : null
      // ESCAPED CONTROLS. The `blocked` test above asks what sits at a
      // control's CENTRE, so a control hanging off the right edge passes it:
      // the tube button ran 752..819 in an 800px viewport and its centre,
      // 785, was still on screen. And `offscreen` above is vertical only.
      // Nothing here scrolls horizontally -- the overflow is clipped -- so a
      // control can leave the room in total silence.
      const escaped = [...document.querySelectorAll(
        '.floor button, .floor a, .floor input, .strip button, .panel.open button, .panel.open input, .panel.open [role="slider"]')]
        .filter(e => { const bb = e.getBoundingClientRect()
          return bb.width > 4 && bb.height > 4 && getComputedStyle(e).visibility !== 'hidden' })
        .filter(inView)
        .filter(e => { const bb = e.getBoundingClientRect(); return bb.right > innerWidth + 1 || bb.left < -1 })
        .map(e => { const bb = e.getBoundingClientRect()
          return `${(e.textContent || e.getAttribute('aria-label') || '?').trim().slice(0, 14)} at ${Math.round(bb.left)}..${Math.round(bb.right)}` })
      return {
        panelOverRim: ov(panel, rim), rimOverStrip: ov(rim, strip), panelOverStrip: ov(panel, strip),
        blocked, escaped, clipped, offscreen: offscreen.length, bandsFound,
        hScroll: document.documentElement.scrollWidth > innerWidth + 1,
        rimH: rim ? Math.round(rim.b - rim.t) : 0,
      }
    })
    const at = `${vp.name} (${vp.w}x${vp.h})${tab ? ` · ${tab}` : ''}`
    if (r.panelOverRim) fail.push(`${at}: the open panel overlaps the rim — its head runs through the now-playing line. The panel's offset is --floor-h; check it is being measured, not assumed.`)
    if (r.rimOverStrip) fail.push(`${at}: the rim's content overlaps the strip — the credit sits on the tab bar.`)
    if (r.panelOverStrip) fail.push(`${at}: the open panel overlaps the strip.`)
    if (r.blocked.length) fail.push(`${at}: ${r.blocked.length} control(s) are covered by something else and cannot be clicked — ${r.blocked.slice(0, 4).join(', ')}.`)
    if (r.escaped.length) fail.push(`${at}: ${r.escaped.length} control(s) run off the side of a ${vp.w}px viewport and are clipped, not scrollable — ${r.escaped.slice(0, 4).join(', ')}.`)
    if (r.clipped) fail.push(`${at}: the open panel is clipped — ${r.clipped}. Controls are off screen with nothing to say so; let it scroll instead.`)
    if (r.offscreen) fail.push(`${at}: ${r.offscreen} band(s) extend past the viewport.`)
    if (r.hScroll) fail.push(`${at}: the document scrolls horizontally.`)
    bandsSeen += r.bandsFound
    if (tab === tabs[0]) report.push(`${vp.name} rim ${r.rimH}px`)
  }
  // ── THE ROOM HOLDS STILL ────────────────────────────────────────────
  // The floor's height is content-driven and its readings are LIVE, so a
  // layout that depends on their width breathes in time with the music. It
  // did: `flex-wrap` on the six ring readings made the row wrap and unwrap
  // as a level crossed 9 -> 10 -> 100, and the whole band pumped 44px up and
  // down while intermittently shoving the open panel through the floor.
  // Nothing in a screenshot shows this; it is only visible over TIME.
  // ── THE PANEL'S GROUND MUST REACH ITS CONTENT ──────────────────────
  // The panel is "a place the light is brighter, not a box", so its ground is
  // a gradient that fades out at the edge. That is fine until content sits IN
  // the fade: the head ended up 88% up a gradient that ran 0.94 -> 0 over the
  // last 42%, leaving roughly 0.27 alpha behind it, and at a loud moment the
  // star came straight through the heading. Nothing failed; it was only
  // visible by looking at a bright frame. Giving the panel a min-height and
  // centred content is what moved the head into the fade -- so this measures
  // the alpha WHERE THE TEXT IS, rather than trusting the geometry.
  // Both surfaces, because the floor had the identical fault and the panel's
  // fix did not touch it: NOW PLAYING sat on 0.66 alpha and the spectrum on
  // 0.44, so the star washed out the one line that says what is playing.
  const grounds = await p.evaluate(() => {
    const out = []
    const check = (boxSel, textSel, anchoredAtBottom) => {
    const pa = document.querySelector(boxSel); if (!pa) return
    const head = pa.querySelector(textSel); if (!head) return
    const pr = pa.getBoundingClientRect(), hr = head.getBoundingClientRect()
    if (!pr.height) return
    const bg = getComputedStyle(pa).backgroundImage
    // stops look like `rgba(10, 10, 10, 0.95) 78%`
    const stops = [...bg.matchAll(/rgba?\(\s*[\d.]+,\s*[\d.]+,\s*[\d.]+(?:,\s*([\d.]+))?\s*\)\s+([\d.]+)%/g)]
      .map(m => ({ a: m[1] === undefined ? 1 : parseFloat(m[1]), p: parseFloat(m[2]) }))
    if (stops.length < 2) return
    // both gradients run from the box's BOTTOM upward
    const pct = anchoredAtBottom
      ? ((pr.bottom - hr.top) / pr.height) * 100
      : ((pr.bottom - hr.top) / pr.height) * 100
    let a = stops[stops.length - 1].a
    for (let i = 0; i < stops.length - 1; i++) {
      const s0 = stops[i], s1 = stops[i + 1]
      if (pct >= s0.p && pct <= s1.p) { a = s0.a + ((pct - s0.p) / (s1.p - s0.p)) * (s1.a - s0.a); break }
    }
    out.push({ what: `${boxSel} ${textSel}`, pct: Math.round(pct), alpha: +a.toFixed(2) })
    }
    check('.panel.open', '.head', true)
    check('.floor', '.nowline', true)
    return out
  })
  for (const g of grounds ?? []) {
    if (g.alpha < 0.85) {
      fail.push(`${vp.name} (${vp.w}x${vp.h}): \`${g.what}\` sits ${g.pct}% up its own ground, where the gradient has fallen to ${g.alpha} alpha — the star reads through the text at a loud moment. The plateau has to reach the content.`)
    }
  }

  // FORCE the condition rather than wait for it. Sampling the height for a
  // few seconds only catches the flap if a level happens to cross 9 -> 10 or
  // 99 -> 100 while you are watching, which is why a first version of this
  // arm passed against the very bug it was written for. Setting the readings
  // to their widest and narrowest values makes the test deterministic.
  const flap = await p.evaluate(() => {
    const fl = document.querySelector('.floor')
    const vs = [...document.querySelectorAll('.read-ring .v')]
    if (!fl || !vs.length) return null                    // not dissected here
    const at = () => Math.round(fl.getBoundingClientRect().height)
    const keep = vs.map(v => v.textContent)
    vs.forEach(v => { v.textContent = '0' });   const narrow = at()
    vs.forEach(v => { v.textContent = '100' }); const wide = at()
    vs.forEach((v, i) => { v.textContent = keep[i] })
    return { narrow, wide }
  })
  if (flap && flap.narrow !== flap.wide) {
    fail.push(`${vp.name} (${vp.w}x${vp.h}): the floor is ${flap.narrow}px when its readings say 0 and ${flap.wide}px when they say 100 — the band resizes with its own live values, so it breathes in time with the music and shoves whatever sits above it.`)
  }

  if (errs.length) fail.push(`${vp.name}: page errors — ${errs.join(' | ')}`)
  await p.close()
}
await b.close()

if (fail.length) { console.error(`layout FAILED\n` + [...new Set(fail)].map(f => '  · ' + f).join('\n')); process.exit(1) }
// "No bands overlap" is not a finding when there are no bands. Every band
// selector here (.floor, .strip, .panel.open) is a dome.html name matching
// zero elements in the shipped app, so ov() compared null to null at every
// viewport and the check printed ok with an empty report -- note the
// trailing separator it used to leave behind. It could not fail.
if (tabsSeen === 0 || bandsSeen === 0) {
  console.error(`layout: found ${tabsSeen} strip tabs and ${bandsSeen} bands across ` +
    `${VIEWPORTS.length} viewports, so nothing was compared and this run is NOT passing.`)
  console.error(`  .floor / .strip / .panel.open are dome.html selectors — re-point them at the shipped app.`)
  process.exit(1)
}
console.log(`layout ok — ${VIEWPORTS.length} viewports x panels, ${bandsSeen} bands compared, ` +
  `every control reachable · ${report.join(', ')}`)
