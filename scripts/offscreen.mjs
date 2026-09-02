// ── NOTHING LEAVES THE ROOM ───────────────────────────────────────────────
// The console's surfaces are `position: fixed; left: 0; right: 0`. That makes
// them exactly viewport-wide at every size, which makes them incapable of
// reporting overflow -- measure a fixed full-width element against the
// viewport and it passes by construction, every time, forever.
//
// Their CHILDREN spill past them in silence. For as long as this console has
// existed, the source picker has hung off the right edge below 1060px wide:
// three of four sources unreachable at 740, two at 820, one at 900. You could
// not change source. `layout` passed the whole band because it asked the one
// question that cannot fail.
//
// So this measures the other way round: every descendant against its
// container's PADDING BOX, and against the viewport. See DESIGN.md §7.5.
import puppeteer from 'puppeteer'

const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
const ROOMS = [
  ['phone', 390, 844], ['stack-low', 740, 900], ['stack-mid', 820, 900],
  ['stack-high', 900, 900], ['stack-top', 1059, 900], ['row-low', 1060, 900],
  ['row-mid', 1280, 800], ['desk', 1440, 900], ['wide', 1920, 1080],
]
// the surfaces that are fixed and full-width, and so cannot self-report
const SURFACES = ['.floor', '.strip', '.panel.open']

const fail = []
const b = await puppeteer.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--no-sandbox'] })

// Measure every descendant against its container's padding box. Absolutely
// positioned decoration is exempt -- it is placed deliberately and often
// bleeds by design (the star, the vignette). Zero-size and `hidden` nodes are
// not on screen to begin with.
let hostsSeen = 0
let kidsSeen = 0
const sweep = async (p, room) => {
  const out = await p.evaluate((surfaces) => {
    const bad = []
    let hosts = 0
    let kids = 0
    for (const sel of surfaces) {
      const host = document.querySelector(sel)
      if (!host) continue
      hosts++
      const cs = getComputedStyle(host)
      const hb = host.getBoundingClientRect()
      const box = {
        l: hb.left + parseFloat(cs.paddingLeft), r: hb.right - parseFloat(cs.paddingRight),
        t: hb.top + parseFloat(cs.paddingTop), b: hb.bottom - parseFloat(cs.paddingBottom),
      }
      for (const e of host.querySelectorAll('*')) {
        const s = getComputedStyle(e)
        if (s.position === 'absolute' || s.position === 'fixed') continue
        if (s.visibility === 'hidden' || s.display === 'none') continue
        const r = e.getBoundingClientRect()
        if (!r.width || !r.height) continue
        kids++
        // the spectrum is placed in the column it heads and bleeds into row
        // 1's empty side tracks ON PURPOSE (DESIGN.md §7.5) -- it is checked
        // against the viewport below like everything else, just not against
        // its column
        const bleeds = !!e.closest('.floor-spec')
        const outside = bleeds ? 0 : Math.max(r.right - box.r, box.l - r.left)
        const off = Math.max(r.right - innerWidth, -r.left, r.bottom - innerHeight, -r.top)
        if (outside > 1 || off > 1) {
          bad.push({
            sel,
            c: (typeof e.className === 'string' && e.className.split(' ')[0]) || e.tagName.toLowerCase(),
            t: (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 22),
            outside: Math.round(outside), off: Math.round(off),
            tap: !!e.closest('button, a, input, label, [role="button"]'),
          })
        }
      }
    }
    // one report per class per surface -- a wrapper and its children all
    // overflow together and listing every node buries the cause
    const seen = new Set(), keep = []
    for (const x of bad.sort((a, c) => Math.max(c.outside, c.off) - Math.max(a.outside, a.off))) {
      const k = x.sel + x.c
      if (seen.has(k)) continue
      seen.add(k); keep.push(x)
    }
    return { keep, hosts, kids }
  }, SURFACES)

  hostsSeen += out.hosts
  kidsSeen += out.kids
  for (const x of out.keep.slice(0, 4)) {
    const how = x.off > 1
      ? `${x.off}px past the VIEWPORT — it cannot be seen or reached`
      : `${x.outside}px outside ${x.sel}'s padding box`
    fail.push(`${room} · ${x.c}${x.t ? ` "${x.t}"` : ''} sits ${how}.${x.tap ? ' It is a control.' : ''}`)
  }
  return out.keep.length
}

for (const [room, w, h] of ROOMS) {
  const p = await b.newPage()
  await p.setViewport({ width: w, height: h })
  // 60s, not puppeteer's default 30. These run under a software
// rasteriser, and the app is three.js plus six shader programs plus a
// 108k-particle field plus a GPGPU sim before it paints -- measured at
// 22s to DOMContentLoaded on the ANGLE backend these launch with, which
// passes the default until the machine is a little busier and then does
// not. A nav timeout that depends on how loaded the box is reports as a
// product failure and is not one (CHECKS.md 2.2).
await p.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise(r => setTimeout(r, 2600))
  await p.keyboard.press('Enter')
  const by = Date.now() + 20000
  while (Date.now() < by) {
    if (await p.evaluate(() => !!document.querySelector('.app.live'))) break
    await new Promise(r => setTimeout(r, 250))
  }
  if (!(await p.evaluate(() => !!document.querySelector('.app.live')))) {
    console.error(`offscreen: the room never came up at ${w}x${h}, so nothing could be measured.`)
    console.error('  This is the harness, NOT the product.')
    await b.close(); process.exit(1)
  }
  await new Promise(r => setTimeout(r, 2000))
  await p.evaluate(() => { [...document.querySelectorAll('button')].find(e => /not now/i.test(e.textContent))?.click() })
  await new Promise(r => setTimeout(r, 500))

  await sweep(p, `${room} (${w}x${h})`)

  // dissected, the floor carries six ring readings instead of two -- that is
  // the state the band was widest in
  await p.keyboard.press('d')
  await new Promise(r => setTimeout(r, 2200))
  await sweep(p, `${room} (${w}x${h}) dissected`)
  await p.close()
}

await b.close()
if (fail.length) {
  console.error('offscreen FAILED\n' + [...new Set(fail)].map(f => '  · ' + f).join('\n'))
  process.exit(1)
}
// A sweep that inspected nothing is not a pass. Every SURFACES selector is
// a dome.html name and matches zero elements in the shipped app, so this
// check spent nine viewports finding no hosts, no children and therefore no
// faults, and printed "ok". Two of the eighteen checks could not fail; this
// was one. The emptiness guard the other checks carry belongs here too.
if (hostsSeen === 0 || kidsSeen === 0) {
  console.error(`offscreen: matched ${hostsSeen} surfaces and inspected ${kidsSeen} children across ` +
    `${ROOMS.length} rooms, so this run proves nothing and is NOT passing.`)
  console.error(`  SURFACES = ${JSON.stringify(SURFACES)} — re-point these at the shipped app.`)
  process.exit(1)
}
console.log(`offscreen ok — ${ROOMS.length} rooms x 2 states, ${hostsSeen} surfaces, ` +
  `${kidsSeen} children, every one inside its surface and on screen`)
