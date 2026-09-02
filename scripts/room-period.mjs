#!/usr/bin/env node
// DESIGN.md §7: "Nothing repeats faster than the room period" (5.4s), and
// "one shared period, staggered, so the room reads as a single organism
// breathing rather than as several things twitching."
//
// This is the law that separates a calm room from a dashboard. It fails
// silently in the worst way — each individual animation looks defensible on
// its own, and only the accumulation reads as twitchy. You cannot catch it
// by looking at one rule, which is exactly why it is checked and not eyeballed.
import { readFileSync } from 'node:fs'
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
const bare = css.replace(/\/\*[\s\S]*?\*\//g, '')

const PERIOD = 5.4
const secs = v => v.endsWith('ms') ? parseFloat(v) / 1000 : parseFloat(v)

// Only INFINITE animations are idle motion. A one-shot transition is a
// response to the user and is governed by the motion table, not by this law.
const idle = []
for (const m of bare.matchAll(/animation:\s*([^;}]+)[;}]/g)) {
  const decl = m[1].trim()
  if (!/\binfinite\b/.test(decl)) continue
  const dur = decl.match(/(\d*\.?\d+m?s)/)
  if (!dur) continue
  const ctx = bare.slice(0, m.index).match(/([^{}]+)\{[^{}]*$/)
  idle.push({ sel: ctx ? ctx[1].trim().split('\n').pop().trim() : '?', name: decl.split(/\s+/)[0], d: secs(dur[1]) })
}

// `animation-duration` overrides are the same law in different syntax, and a
// check that only reads the shorthand goes quiet exactly where the shorthand
// is not used. Collected separately so the flight can be permitted BY NAME
// rather than by the check failing to notice it.
for (const m of bare.matchAll(/animation-duration:\s*([\d.]+m?s)/g)) {
  const ctx = bare.slice(0, m.index).match(/([^{}]+)\{[^{}]*$/)
  const sel = ctx ? ctx[1].trim().split('\n').pop().trim() : '?'
  idle.push({ sel, name: 'animation-duration', d: secs(m[1]), override: true })
}

// THE EARNED EXCEPTIONS, and only these two.
//
// The power-on flight: DESIGN.md's motion table grants it ~2.2s, and the
// flight's whole job is that the room spins up — the idles quickening
// under load IS the tell.
//
// The grain: §5 scopes the shared period to idle CHROME THAT REPRESENTS
// SIGNAL — "only chrome that represents SIGNAL breathes" — and the grain
// represents nothing. It is the ground's material, described separately in
// §4 as a stepped animation with no period stated, and it is film grain:
// at 5.4s it stops being grain and becomes a slow pulse behind the whole
// sheet. It was the last finding standing here and it was never in scope.
const FLIGHT = /\.(rev|dive)\b|^\.grain$/
const fast = idle.filter(a => a.d < PERIOD - 1e-9 && !FLIGHT.test(a.sel))
const excepted = idle.filter(a => a.d < PERIOD - 1e-9 && FLIGHT.test(a.sel))
if (fast.length) {
  console.error(`room-period FAILED — ${fast.length} idle animation(s) repeat faster than the ${PERIOD}s room period:`)
  for (const a of fast) console.error(`  · \`${a.sel}\` runs \`${a.name}\` every ${a.d}s — ${(PERIOD / a.d).toFixed(1)}× the room's rate. On its own it looks fine; together with the others it is what makes a room read as a dashboard.`)
  process.exit(1)
}
// Off-period multiples are not a breach, but they drift against everything
// else and never re-align, so they are worth naming.
// Drift only matters for things that idle ALONGSIDE each other. The flight's
// quickened states last two seconds and then stop, so they have nothing to
// stay in phase with.
const off = idle.filter(a => !FLIGHT.test(a.sel) && Math.abs(a.d / PERIOD - Math.round(a.d / PERIOD)) > 0.02)
console.log(`room-period ok — ${idle.length} idle animations, none faster than ${PERIOD}s`
  + (() => {
      // two different exceptions, so two different sentences: lumping the
      // grain in with "the room spinning up" would state something false
      const grain = excepted.filter(a => /^\.grain$/.test(a.sel))
      const flight = excepted.filter(a => !/^\.grain$/.test(a.sel))
      return (flight.length ? `\n  flight exception (${flight.length}): ${flight.map(a => `${a.sel} @ ${a.d}s`).join(', ')} — the room spinning up, granted by the motion table.` : '')
        + (grain.length ? `\n  material exception: ${grain.map(a => `${a.sel} @ ${a.d}s`).join(', ')} — the ground's grain represents no signal, so the period does not scope it.` : '')
    })()
  + (off.length ? `\n  note: ${off.map(a => `${a.sel} @ ${a.d}s`).join(', ')} — not multiples of the period, so they drift against the rest and never re-align.` : ''))
