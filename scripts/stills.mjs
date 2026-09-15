#!/usr/bin/env node
// Stills. Not a check -- a camera.
//
// Every other script in here asserts. This one only looks: it boots the app
// at each viewport, walks it into each state, and writes a PNG. Nothing
// passes and nothing fails, because the judgement is the eye's.
//
// It runs under swiftshader like the rest of the suite, which is the one
// thing to keep in mind when reading the output: the STAR in these frames is
// not what a real GPU draws (CHECKS.md 6). Layout, spacing, type, contrast
// and every band edge ARE real -- those are the compositor's, not the
// rasteriser's -- and that is what these are for.
//
//   node scripts/stills.mjs                 all viewports, all states
//   node scripts/stills.mjs --out DIR       write somewhere else
//   node scripts/stills.mjs --only desktop  one viewport
import puppeteer from 'puppeteer'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const argv = process.argv.slice(2)
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = arg('--out', 'stills')
const ONLY = arg('--only', null)

// deviceScaleFactor 2, because the whole product is 1px hairlines and an
// 11px face on an 11-cell grid. At 1x a hairline lands on a pixel boundary
// and vanishes into the ground in the PNG, and a frame that cannot show the
// rule cannot show the rule being broken.
const DPR = 2

const VIEWPORTS = [
  { w: 1440, h: 900, name: 'desktop' },
  { w: 1280, h: 800, name: 'laptop' },
  { w: 1024, h: 768, name: 'tablet' },
  { w: 900, h: 600, name: 'short-laptop' },
  { w: 560, h: 863, name: 'browser-pane' },
  { w: 390, h: 844, name: 'phone' },
]

mkdirSync(OUT, { recursive: true })
const b = await puppeteer.launch({ args: ['--enable-unsafe-swiftshader', '--no-sandbox'] })
const wrote = []

const shoot = async (p, name) => {
  const buf = await p.screenshot({ type: 'png' })
  const file = join(OUT, `${name}.png`)
  writeFileSync(file, buf)
  wrote.push(`${file}  ${(buf.length / 1024).toFixed(0)}kb`)
}

for (const vp of VIEWPORTS) {
  if (ONLY && vp.name !== ONLY) continue
  const p = await b.newPage()
  await p.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: DPR })
  await p.evaluateOnNewDocument(() => { try { localStorage.setItem('scope-onboard-v1', '1') } catch { /* private mode */ } })
  const errs = []
  p.on('pageerror', e => errs.push(e.message.slice(0, 110)))
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })

  // The landing's own motion has to finish before the shutter, or the frame
  // catches the scramble mid-flight and every caps row reads as garbage.
  await new Promise(r => setTimeout(r, 4000))
  await shoot(p, `${vp.name}-1-standby`)

  await p.keyboard.press('Enter')
  const by = Date.now() + 25000
  while (Date.now() < by) {
    if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
    await new Promise(r => setTimeout(r, 250))
  }
  if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
    console.log(`  ${vp.name}: never reached the console -- standby frame only.`)
    await p.close(); continue
  }
  await new Promise(r => setTimeout(r, 2500))
  await shoot(p, `${vp.name}-2-console`)

  // Dissected. Six tier rows the closed panel does not have, which is the
  // state the mix panel is actually tallest in and the one worth looking at.
  const readD = () => p.evaluate(() => window.__sc?.uniforms?.uDissect?.value ?? 0)
  const before = await readD()
  await p.keyboard.press('KeyD')
  const by2 = Date.now() + 12000
  while (Date.now() < by2) {
    const d = await readD()
    if (d > 0.9) break
    await new Promise(r => setTimeout(r, 200))
  }
  const after = await readD()
  if (after > 0.9) { await new Promise(r => setTimeout(r, 900)); await shoot(p, `${vp.name}-3-dissected`) }
  else console.log(`  ${vp.name}: the stack never opened (${before.toFixed(2)} -> ${after.toFixed(2)}) -- no dissected frame.`)

  if (errs.length) console.log(`  ${vp.name}: page errors -- ${errs.join(' | ')}`)
  await p.close()
}

// The tour, once, at the size it is designed for. It is the first thing a
// visitor sees and the last thing anyone looks at.
if (!ONLY || ONLY === 'desktop') {
  // A FRESH CONTEXT, or there is no tour to photograph. Every page above
  // sets `scope-onboard-v1` to keep the tour out of its frame, and pages in
  // one browser share an origin's localStorage -- so this page opened, read
  // the flag the others had written, and skipped the tour it exists to
  // capture. It reported "tour: never opened" rather than a wrong frame,
  // which is the only reason it was noticed.
  const ctx = await b.createBrowserContext()
  const p = await ctx.newPage()
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: DPR })
  await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise(r => setTimeout(r, 4000))
  await p.keyboard.press('Enter')
  const by = Date.now() + 25000
  while (Date.now() < by) {
    if (await p.evaluate(() => !!document.querySelector('.driver-popover'))) break
    await new Promise(r => setTimeout(r, 250))
  }
  if (await p.evaluate(() => !!document.querySelector('.driver-popover'))) {
    await new Promise(r => setTimeout(r, 1200))
    await shoot(p, 'desktop-4-tour')
  } else console.log('  tour: never opened -- no tour frame.')
  await p.close()
  await ctx.close()
}

await b.close()
console.log(wrote.join('\n'))
console.log(`\n${wrote.length} stills in ${OUT}/`)
