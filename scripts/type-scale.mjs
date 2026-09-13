#!/usr/bin/env node
// Tracking, ink level and type size are all properties of the RAMP STEP,
// never of the element. Nothing was counting them, and all three had drifted
// far enough that the product read as inconsistent from screen to screen --
// which is exactly the complaint that prompted this check:
//
//   · letter-spacing: THIRTEEN values across 64 declarations. On one step
//     alone (13px uppercase) the same role appeared at 0.08, 0.1, 0.12,
//     0.14, 0.18 and 0.2em depending on which block you were looking at.
//   · text colour: TWELVE values, including EIGHT undeclared alphas of the
//     same ink (0.44 … 0.8) when law 6 says there are two inks. One of them,
//     the search placeholder at 0.44, measured 3.80:1 -- under the floor.
//   · type size: sizes off the six-step ramp entirely.
//
// None of that is visible in a diff and none of it fails a build. It is only
// ever felt, as "why does this look like several products".
import { readFileSync } from 'node:fs'

const SRC = 'src/styles.css'
const css = readFileSync(SRC, 'utf8')
const flat = css.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
const lines = css.split('\n')
const at = i => flat.slice(0, i).split('\n').length

const fail = []
const line = n => lines[n - 1].trim().slice(0, 74)

// 1 · tracking must name a token
// The gate's POWER ON is the one authored exception: its tracking OPENS from
// 0.34em to 0.42em as the machine revs, which is a motion, not a style.
const POWER = /\.gate \.power|\.app\.rev \.gate \.power/
for (const m of flat.matchAll(/letter-spacing:\s*([^;]+);/g)) {
  const v = m.group?.(1) ?? m[1]
  if (v.trim().startsWith('var(--track-')) continue
  const n = at(m.index)
  // find the selector this declaration belongs to
  const open = flat.lastIndexOf('{', m.index)
  const sel = flat.slice(Math.max(flat.lastIndexOf('}', open), flat.lastIndexOf('{', open - 1)) + 1, open)
  if (POWER.test(sel)) continue
  fail.push(`${SRC}:${n}  letter-spacing: ${v.trim()} — tracking must name a step token (--track-caps-micro/label/body, --track-cta, --track-none, --track-display).\n      ${line(n)}`)
}

// 2 · text colour must name a token, never a raw alpha of the ink
for (const m of flat.matchAll(/(?<!-)color:\s*(rgba?\(var\(--ink-rgb\)[^;]*)\;/g)) {
  const n = at(m.index)
  fail.push(`${SRC}:${n}  ${m[1].trim()} — an undeclared ink level. Use --ink, --ink-prose, --dim or --ink-dim.\n      ${line(n)}`)
}

// 3 · leading must name its role. Six values were in use for four jobs:
// prose at 1.5, 1.55 and 1.6 across four blocks while §2 names 1.62, and the
// display tier spread across 0.95, 1 and 1.12. Leading is a property of the
// role exactly as tracking is, and it drifts the same way -- by nobody
// deciding, one block at a time.
for (const m of flat.matchAll(/line-height:\s*([^;}]+);/g)) {
  const v = m[1].trim()
  if (v.startsWith('var(--leading-')) continue
  if (v === 'inherit' || v === 'normal') continue
  const n = at(m.index)
  fail.push(`${SRC}:${n}  line-height: ${v} — leading names its role (--leading-prose/display/hero/none).\n      ${line(n)}`)
}

// 4 · font-size must name a ramp token. A unit glyph scaled to its own
// numeral (`em`) is not a ramp step and is allowed: `%` after a value belongs
// to the value, and pinning it to the ramp would be false precision.
//
// max() and min() join clamp() here. `.pl-reg` is the ® on the wordmark and
// reads `max(var(--t-micro), 0.15em)` — 0.15em of a clamped h1 is not a size
// anyone controls, so the ramp travels with it as a floor. That names the
// ramp; refusing it taught nothing.
//
// KNOWN HOLE, recorded rather than quietly fixed: these three functions are
// trusted WHOLESALE, so `clamp(9px, 1vw, 13px)` would pass. It is how the
// display tier is written today (`clamp(52px, 8.4vw, 124px)`, Archivo, which
// is an outline face and deliberately off the mono grid), so closing it means
// first deciding what a display ramp IS. Separate job, named here so the next
// person finds it before it finds them.
const EXPR = /^(clamp|max|min)\(/
for (const m of flat.matchAll(/font-size:\s*([^;]+);/g)) {
  const v = m[1].trim()
  if (v.startsWith('var(--t-') || EXPR.test(v) || v.endsWith('em') || v === 'inherit') continue
  const n = at(m.index)
  fail.push(`${SRC}:${n}  font-size: ${v} — sizes come from the ramp (--t-micro 11px, --t-read 22px), or a clamp for the display tier.\n      ${line(n)}`)
}

if (fail.length) {
  console.error(`type-scale FAILED — ${fail.length} value${fail.length > 1 ? 's' : ''} off the scale:`)
  for (const f of fail) console.error('  · ' + f)
  process.exit(1)
}
console.log('type-scale ok — every tracking, ink level, leading and size names its step')
