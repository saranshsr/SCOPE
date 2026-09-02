#!/usr/bin/env node
// The far wall's curvature, derived rather than trusted.
//
// `.curve` is an oversized ellipse clipped by the viewport, so its arc is
// three numbers away from anything you can read off the rule: the sagitta
// depends on the width, the height AND the bottom offset together. Change
// any one and the horizon moves, with nothing to warn you — a wall that has
// gone flat still looks like a wall until you put it beside the rim.
//
// DESIGN.md: far wall sagitta ~9% of viewport width, apex at ~52% of height,
// and it must stay clearly deeper than the rim arc's 3% or the two curves
// read as one radius and the room loses its depth.
import { readFileSync } from 'node:fs'
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
const bare = css.replace(/\/\*[\s\S]*?\*\//g, '')
const rule = bare.match(/(?:^|\n)\.curve\s*\{([^}]*)\}/)
if (!rule) { console.error('room-geometry: no `.curve` rule — the far wall is gone.'); process.exit(1) }
const num = (prop, unit) => {
  const m = rule[1].match(new RegExp(prop + ':\\s*(-?[\\d.]+)' + unit))
  if (!m) { console.error(`room-geometry: \`.curve\` has no ${prop} in ${unit} — geometry cannot be derived, so this check is stale and is NOT passing.`); process.exit(1) }
  return parseFloat(m[1])
}
const W = num('width', 'vw'), H = num('height', 'vh'), B = num('bottom', 'vh')

// Reference viewport; the ratios below are what actually matter.
const VW = 1440, VH = 900
const a = (W / 2) * VW / 100          // horizontal semi-axis, px
const b = H * VH / 100                // vertical radius (border-radius … / 100%)
const boxTop = VH - (B * VH / 100) - (H * VH / 100)   // y of the ellipse apex
// Drop of the arc at the viewport's left/right edge, relative to the apex.
const dx = VW / 2
const sagitta = dx >= a ? b : b * (1 - Math.sqrt(1 - (dx / a) ** 2))

const pctW = (sagitta / VW) * 100
const apexPct = (boxTop / VH) * 100
const RIM = 3
const fail = []
if (!(pctW >= 6 && pctW <= 12)) fail.push(`sagitta is ${pctW.toFixed(1)}% of viewport width; the far wall is specified at ~9% (6–12%). Past 12% it bulges into a circle; under 6% the horizon reads flat.`)
if (!(apexPct >= 45 && apexPct <= 60)) fail.push(`the arc's apex sits at ${apexPct.toFixed(0)}% of viewport height; specified ~52% (45–60%). Above that the wall crowds the star, below it the room has no ceiling.`)
if (pctW < RIM * 2) fail.push(`the far wall (${pctW.toFixed(1)}%) is not clearly deeper than the rim arc (${RIM}%) — two curves at one radius read as a single surface and the room loses its depth.`)

if (fail.length) { console.error('room-geometry FAILED\n' + fail.map(f => '  · ' + f).join('\n')); process.exit(1) }
console.log(`room-geometry ok — far wall sagitta ${pctW.toFixed(1)}% of width (${sagitta.toFixed(0)}px @ ${VW}), apex at ${apexPct.toFixed(0)}% of height, ${(pctW / RIM).toFixed(1)}× the rim arc`)
