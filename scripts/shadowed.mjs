#!/usr/bin/env node
// "A rule that never applied is not a rule."
//
// Three separate defects this build, all the same mechanism: on EQUAL
// specificity the later rule wins, silently, and the earlier one renders
// nothing while still sitting in the sheet describing what it intends.
//
//   · a duplicated `text-transform` in one block
//   · `[hidden]` (0,1,0) beaten by `.reads { display: flex }` -- both sets of
//     floor readings rendered, the floor grew a fourth column, and the source
//     picker was pushed off the right edge
//   · `.reads-rings .v { font-size: var(--t-data) }` beaten by the later
//     `.read .v { var(--t-value) }` -- six ring readings at display size,
//     the one display moment spent six times over
//
// Each survived because the COMMENT above it described the intent so
// plainly that nobody checked the rendered result. A stylesheet cannot tell
// you this; only a live DOM can say whether two selectors ever meet.
//
// WHAT THIS CATCHES, precisely: a rule that matches elements and is never
// observed applying to ANY of them, in either the whole or the dissected
// room. That is deliberately narrower than "shadowed" -- a base rule beaten
// by a modifier (`.chip` by `.chip.on`) is the cascade working, and flagging
// it would bury the real ones.
//
// The cost of that narrowness: a rule matching MANY elements, correct on
// some and defeated on others, reads as applied. `[hidden] { display: none }`
// is exactly that case -- defeated on `.reads` by `.reads { display: flex }`,
// but correct on every other hidden element, so it does not report here. The
// consequence of that particular bug (the source picker pushed off the right
// edge at 900px) is caught by `layout` instead. Two checks, one fault: that
// is the design, not an oversight.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
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
const by = Date.now() + 20000
while (Date.now() < by) {
  if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
  await new Promise(r => setTimeout(r, 250))
}
await new Promise(r => setTimeout(r, 2200))
await p.evaluate(() => { const x = [...document.querySelectorAll('button')].find(e => /not now/i.test(e.textContent)); x?.click() })
await new Promise(r => setTimeout(r, 600))
await p.evaluate(() => { document.activeElement?.blur?.(); document.body.focus() })
// ASSERT THE STATE, do not assume it. This scans two rooms and reports a
// rule inert only if it never applied in EITHER -- so if a transition
// silently fails, both scans see the same room and every rule that is
// correct only in the other one reports as dead. That is exactly how this
// check produced two false findings: `.reads { display: flex }` and
// `.keyline-open { display: none }` are both right in the whole room, and
// the whole room was never reached.
const dissectTo = async (want, label) => {
  await p.evaluate(() => { document.activeElement?.blur?.(); document.body.focus() })
  // `d` TOGGLES, so a blind retry is wrong: pressing again while the damper
  // is still gliding reverses it, and a first attempt at this left uDissect
  // at 0.28 -- caught mid-flight, heading back. Re-press only when the press
  // was DROPPED (the value has not moved at all), never when it is merely
  // slow.
  const read = () => p.evaluate(() => window.__sc?.uniforms?.uDissect?.value ?? -1)
  const arrived = (d) => want ? d > 0.6 : d < 0.05
  for (let attempt = 0; attempt < 3; attempt++) {
    const before = await read()
    await p.keyboard.press('KeyD')
    const by2 = Date.now() + 9000
    let moved = false
    while (Date.now() < by2) {
      const d = await read()
      if (arrived(d)) return
      if (Math.abs(d - before) > 0.02) moved = true
      await new Promise(r => setTimeout(r, 200))
    }
    if (moved) break        // it is travelling, just not there — do not re-press
  }
  {
  const d = await p.evaluate(() => +(window.__sc?.uniforms?.uDissect?.value ?? -1).toFixed(2))
  console.error(`shadowed: could not reach the ${label} room after 3 presses (uDissect ${d}), so the two scans would be the same room and every rule correct only in the other would report as dead. This is the harness, NOT the product.`)
  await b.close(); process.exit(1)
  }
}
await dissectTo(true, 'dissected')

// Properties where "the later one silently won" is a real defect rather than
// an ordinary cascade. Layered shorthands and paint properties are excluded:
// stacking two backgrounds or overriding a colour per state is the cascade
// being used correctly, not a rule that never applied.
// Properties where the computed value is comparable to the declared one.
// letter-spacing is excluded because it is authored in `em` and computes to
// px; `type-scale` already holds that axis to its tokens.
const WATCH = ['display', 'text-transform', 'font-weight', 'font-size', 'gap']

// INERT, not merely shadowed. A base rule that a modifier overrides is the
// cascade working -- `.chip { display: none }` beaten by `.chip.on` is
// correct, and so is `.keyline` beaten by `.keyline-open`. The defect is
// narrower: a rule that matches elements and yet NONE of them ever render
// its value. That is a rule saying something the product never does.
const scan = (WATCH) => {
  const rules = []
  // A rule inside a media query that does not currently match has not failed
  // to apply -- it is simply not for this room. `.reticle { display: none }`
  // lives under `pointer: coarse` and reported on every desktop run.
  const walk = (list, live = true) => { for (const r of list) {
    if (r.selectorText && r.style) { if (live) rules.push(r) }
    else if (r.cssRules) {
      const cond = r.conditionText || r.media?.mediaText
      let on = live
      if (cond) { try { on = live && matchMedia(cond).matches } catch { on = live } }
      walk(r.cssRules, on)
    }
  } }
  for (const sh of document.styleSheets) { try { walk(sh.cssRules) } catch {} }

  const resolve = (val, el) => {
    let v = val.trim()
    for (let i = 0; i < 4 && v.includes('var('); i++) {
      v = v.replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g,
        (_, name) => getComputedStyle(el).getPropertyValue(name).trim() || '')
    }
    return v.trim()
  }
  const out = []
  for (const r of rules) {
    for (const prop of WATCH) {
      const declared = r.style.getPropertyValue(prop)
      if (!declared) continue
      // CSS-wide keywords resolve to whatever they inherited from, so the
      // literal never matches the computed value and every one would report.
      if (/^(inherit|initial|unset|revert|revert-layer)$/i.test(declared.trim())) continue
      // Relative units resolve against the element's own context, so the
      // literal never equals the computed px. `0.42em` of a 40px value IS
      // the 16.8px it renders -- the rule applied perfectly.
      if (/\d\s*(em|rem|%|ch|ex|vw|vh|vmin|vmax)\b/.test(declared)) continue
      let els = []
      try {
        const base = r.selectorText.split(',')
          .map(x => x.replace(/::?[a-z-]+(\([^)]*\))?/g, '').trim()).filter(Boolean).join(',')
        if (!base) continue
        els = [...document.querySelectorAll(base)]
      } catch { continue }
      if (!els.length) continue                    // never rendered here; dead-css reports those
      let applied = false
      for (const el of els) {
        const want = resolve(declared, el)
        if (!want) { applied = true; break }        // unresolvable var: do not guess
        const got = getComputedStyle(el).getPropertyValue(prop).trim()
        // A flex or grid ITEM has its display blockified: `inline-flex`
        // computes to `flex`, `inline-block` to `block`. The rule applied;
        // the engine normalised it.
        // `gap` is a shorthand: a single declared value sets BOTH axes, and a
        // later `column-gap` legitimately overrides one of them, so the
        // computed value reads `4px 32px` while the rule did apply on the row
        // axis. Compare component-wise rather than as a string.
        const gapSame = prop === 'gap' && (() => {
          const w = want.split(/\s+/), g = got.split(/\s+/)
          return w.length === 1 ? g[0] === w[0] : w.every((v, i) => g[i] === v)
        })()
        const same = got === want || gapSame ||
          (prop === 'display' && got === want.replace(/^inline-/, '').replace(/^inline$/, 'block'))
        if (same) { applied = true; break }
      }
      const el = els[0]
      const rec = { prop, sel: r.selectorText.slice(0, 60), declared,
        want: resolve(declared, el), got: getComputedStyle(el).getPropertyValue(prop).trim(),
        n: els.length, who: (el.className || el.tagName).toString().split(' ').slice(0, 2).join('.').slice(0, 24) }
      if (applied) out.push({ ok: true, key: prop + '|' + r.selectorText })
      else out.push({ ok: false, key: prop + '|' + r.selectorText, ...rec })
    }
  }
  return out
}

// TWO STATES, because a rule can be correct in one and dormant in the other:
// `.reads { display: flex }` is exactly right until the star is pulled apart,
// when the ring grid replaces it -- and sampling only the dissected room
// reported the whole-instrument readings as a rule that never applies.
const dissected = await p.evaluate(scan, WATCH)
await dissectTo(false, 'whole')
const whole = await p.evaluate(scan, WATCH)

// A rule is inert if it MATCHED elements somewhere and was never observed
// applying ANYWHERE. Intersecting the two states was wrong: a rule whose
// elements only exist while dissected cannot be judged in the whole state,
// and requiring inertness in both discarded exactly the real cases.
const seenApplied = new Set([...dissected, ...whole].filter(r => r.ok).map(r => r.key))
const cand = new Map()
for (const r of [...dissected, ...whole]) if (!r.ok && !cand.has(r.key)) cand.set(r.key, r)
const inert = [...cand.values()].filter(r => !seenApplied.has(r.key))

await b.close()

if (inert.length) {
  console.error(`shadowed FAILED — ${inert.length} rule${inert.length > 1 ? 's that never apply' : ' that never applies'}:`)
  for (const r of inert) {
    console.error(`  · \`${r.sel} { ${r.prop}: ${r.declared} }\` -> wants ${r.want}, but all ${r.n} matching element(s) render ${r.got}`)
    console.error(`      e.g. ${r.who}. Something later at equal specificity is winning on order alone.`)
  }
  console.error('\n  Raise its specificity or delete it. A rule that never applies still reads')
  console.error('  as the intended behaviour to whoever comes next -- which is how three of')
  console.error('  these shipped, each with a comment describing what it meant to do.')
  process.exit(1)
}
console.log(`shadowed ok — every rule setting ${WATCH.join('/')} is observed on something`)
