#!/usr/bin/env node
// A REPORT, not a law -- deliberately not in check.mjs, because "unused right
// now" is not the same as "wrong", and a suite that fails on every new rule
// trains you to ignore it.
//
// The earlier attempt at this scanned source with regexes and produced 74
// candidates riddled with false positives: `ambient` (built by a template
// literal, so stripping `${...}` erased it), `layer-hot` / `layer-muted`
// (an apostrophe missing from the split charset). Acting on that list would
// have deleted the mix panel's styling.
//
// So this asks the BROWSER. It walks the real CSSOM, and for each selector
// asks document.querySelector -- the same matcher the renderer uses -- in
// every state the sweep can reach. No parsing, no guessing.
//
// HONESTY: a selector reported here is "never matched in the states below",
// which is evidence, not proof. Transient states (mid-flight `.rev`/`.dive`)
// and error branches that need a real failure are hard to hold still. The
// states swept are printed with the result so the claim can be judged.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox',
  '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })
await p.goto(URL, { waitUntil: 'networkidle2' })
await new Promise(r => setTimeout(r, 3000))

// Collect every selector the stylesheet defines, once.
const ALL = await p.evaluate(() => {
  const out = new Set()
  const walk = rules => {
    for (const r of rules) {
      if (r.selectorText) r.selectorText.split(',').forEach(s => out.add(s.trim()))
      else if (r.cssRules) walk(r.cssRules)   // @media, @supports
    }
  }
  for (const sh of document.styleSheets) { try { walk(sh.cssRules) } catch {} }
  return [...out]
})

const alive = new Set()
const states = []
const sample = async label => {
  states.push(label)
  const hits = await p.evaluate(sels => sels.filter(s => {
    // pseudo-classes and elements cannot be queried; match the base element
    const base = s.replace(/::?[a-z-]+(\([^)]*\))?/g, '').trim()
    if (!base) return false
    try { return !!document.querySelector(base) } catch { return false }
  }), ALL)
  hits.forEach(h => alive.add(h))
}

for (const [f, n] of [[0, 'descent:top'], [0.5, 'descent:mid'], [1, 'descent:end']]) {
  await p.evaluate(x => scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * x, behavior: 'instant' }), f)
  await new Promise(r => setTimeout(r, 700)); await sample(n)
}
await p.keyboard.press('Enter')
await sample('flight:early')                       // catch .rev / .dive while they exist
await new Promise(r => setTimeout(r, 900)); await sample('flight:mid')
const by = Date.now() + 20000
while (Date.now() < by) { if (await p.evaluate(() => !!document.querySelector('.app.live'))) break; await new Promise(r => setTimeout(r, 250)) }
await new Promise(r => setTimeout(r, 2500)); await sample('room')

const srcs = await p.evaluate(() => [...document.querySelectorAll('.srcs button')].map(b => b.textContent.trim()))
const panels = await p.evaluate(() => [...document.querySelectorAll('.strip button')].map(b => b.textContent.trim()))
for (const name of panels) {
  await p.evaluate(n => [...document.querySelectorAll('.strip button')].find(b => b.textContent.trim() === n)?.click(), name)
  await new Promise(r => setTimeout(r, 600)); await sample(`panel:${name}`)
  for (const s of srcs) {
    await p.evaluate(n => [...document.querySelectorAll('.srcs button')].find(b => b.textContent.trim() === n)?.click(), s)
    await new Promise(r => setTimeout(r, 900)); await sample(`panel:${name}+${s}`)
  }
}
// hover and ambient are states too
await p.evaluate(() => document.querySelector('.app')?.classList.add('ambient'))
await new Promise(r => setTimeout(r, 400)); await sample('ambient')
await p.evaluate(() => document.querySelector('.app')?.classList.remove('ambient'))
await p.setViewport({ width: 390, height: 844 })
await new Promise(r => setTimeout(r, 1200)); await sample('phone')

const dead = ALL.filter(s => !alive.has(s)).sort()
console.log(`${ALL.length} selectors defined · ${alive.size} matched · ${dead.length} never matched`)
console.log(`states swept (${states.length}): ${states.join(', ')}\n`)
const rail = dead.filter(s => /\brail/.test(s))
console.log(`── .rail* never matched (${rail.length}) ──`)
rail.forEach(s => console.log(`  ${s}`))
console.log(`\n── everything else never matched (${dead.length - rail.length}) ──`)
dead.filter(s => !/\brail/.test(s)).forEach(s => console.log(`  ${s}`))
await b.close()
