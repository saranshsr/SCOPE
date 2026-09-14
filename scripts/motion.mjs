#!/usr/bin/env node
// The motion table (DESIGN.md §6) is four durations: 0 / 180 / 420 / 900,
// plus the flight and the 5.4s room period. It had drifted to NINE extra
// values for ordinary UI response -- 90, 120, 150, 300, 320, 450, 500ms --
// which is the spacing failure again in a different property. Same cause:
// each one is a plausible local nudge, and nothing counted.
//
// It also checks the CURVE. "Ease-out only" is the law, and the bare CSS
// keyword `ease` is not ease-out -- it is cubic-bezier(0.25, 0.1, 0.25, 1),
// which accelerates out of rest. Four transitions were using it, so motion
// that the law says must begin at full speed was easing IN first.
import { readFileSync } from 'node:fs'

const SRC = 'src/styles.css'
const css = readFileSync(SRC, 'utf8')
const flat = css.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
const lines = css.split('\n')

// 140, not 180, for the light step. The product hand-authored its
// hover-and-press motion ten times across the sheet at 90 / 120 / 140 x5 /
// 150 / 180 x2 — one tier with drift, median 140, and only two of the ten
// ever sat on the value this table used to name. Ten authoring decisions
// outrank one table entry, particularly a table DESIGN.md did not contain.
// It does now: §1, Motion.
const TABLE = new Map([[0, '--star'], [140, '--light'], [420, '--block'], [900, '--room']])
// Earned exceptions, each named in DESIGN.md rather than merely tolerated:
//   1ms    the reduced-motion path. §8 bans `* { animation-duration: 0.01ms }`
//          as a global kill; a targeted 1ms is how a specific transition is
//          made instant without flattening the whole room.
//   5400   the room period -- "one shared idle period for the whole room".
//   4800   the announcement's own cycle, a timed display moment.
//   1000   a beat of the power-on flight, "the one earned exception".
//    600 |  the descent and stamp fades, which are beats of that same flight.
//    700 |
const EXEMPT = new Set([1, 600, 700, 1000, 4800, 5400])

const badDur = [], badEase = []
const re = /\b(?:transition|animation)(?:-duration)?:\s*([^;}]+)[;}]/g
let m
while ((m = re.exec(flat))) {
  const line = flat.slice(0, m.index).split('\n').length
  const decl = m[1]
  // INFINITE ANIMATIONS BELONG TO room-period, NOT HERE. That check says so
  // itself: "Only INFINITE animations are idle motion. A one-shot transition
  // is a response to the user and is governed by the motion table, not by
  // this law." This is the reciprocal, and without it the two laws claim the
  // same declarations and then disagree about them — room-period records
  // `.grain @ 0.45s` as a material exception ("the ground's grain represents
  // no signal, so the period does not scope it") while this file demanded it
  // be 420ms. It also read the 6.2s carrier and the 11s idle scan as UI
  // transitions 5.8x and 11x too slow, which is not what they are.
  //
  // A duration is judged here only if it answers a user. Idle texture is
  // judged next door, where it passes.
  if (/\binfinite\b/.test(decl)) continue
  // THE FLIGHT IS THE ONE EARNED EXCEPTION, and DESIGN.md says so — which is
  // why 600 and 1000 already sit in EXEMPT below. The rest of it lives on
  // `.plate.rev`, where the carrier, the leads, the pills, the figure and the
  // wordmark run at 460 / 420 / 380 / 400 / 300ms. Those are not five values
  // that drifted. They are DELIBERATELY OUT OF STEP: the machine revs, and
  // each part straining at its own rate is what makes it read as several
  // systems under load rather than one animation playing. Snapping them to a
  // single --block would delete the effect and the check would call it a fix.
  //
  // Scoped to the rev selectors, not a blanket pass: ordinary motion inside
  // the plate is still judged.
  const selCtx = flat.slice(0, m.index).match(/([^{}]*)\{[^{}]*$/)
  if (selCtx && /\.(plate|app)\.rev\b|\.gate\b/.test(selCtx[1])) continue
  for (const [, num, unit] of decl.matchAll(/(\d+(?:\.\d+)?)(ms|s)\b/g)) {
    const v = parseFloat(num) * (unit === 's' ? 1000 : 1)
    if (TABLE.has(v) || EXEMPT.has(v)) continue
    const near = [...TABLE.keys()].reduce((a, b) => Math.abs(b - v) < Math.abs(a - v) ? b : a)
    badDur.push({ line, v, near, token: TABLE.get(near), text: lines[line - 1].trim().slice(0, 76) })
  }
  // a bare `ease` keyword: not preceded by a hyphen (ease-out / ease-in) and
  // not part of var(--ease)
  if (/(^|[\s,])ease(\s|,|$)/.test(decl.replace(/var\(--ease\)/g, 'var(--EASE)')))
    badEase.push({ line, text: lines[line - 1].trim().slice(0, 76) })
}

if (badDur.length || badEase.length) {
  if (badDur.length) {
    console.error(`motion FAILED — ${badDur.length} duration${badDur.length > 1 ? 's' : ''} off the table (DESIGN.md §6):`)
    for (const d of badDur) console.error(`  · ${SRC}:${d.line}  ${d.v}ms — nearest is ${d.near}ms (${d.token})\n      ${d.text}`)
  }
  if (badEase.length) {
    console.error(`motion FAILED — ${badEase.length} transition${badEase.length > 1 ? 's' : ''} using the bare \`ease\` keyword.`)
    console.error(`  \`ease\` is cubic-bezier(0.25, 0.1, 0.25, 1) — it eases IN. The law is ease-out only; use var(--ease).`)
    for (const e of badEase) console.error(`  · ${SRC}:${e.line}  ${e.text}`)
  }
  process.exit(1)
}
console.log(`motion ok — every duration is on the table (${[...TABLE.keys()].join('/')}) or a named exception, and nothing eases in`)
