#!/usr/bin/env node
// THE DOME, signature interaction: "matter parts and swells around your hand."
//
// The displacement map is d -> d + A·s(d). Three numeric laws govern it, and
// all three fail SILENTLY — a folded field looks like a bright knot you might
// read as a highlight, and a leaky kernel looks like the whole star trembling.
// So the constants are parsed out of the shader rather than restated here:
// a check that keeps its own copy of the numbers stops checking anything.
import { readFileSync } from 'node:fs'
const src = readFileSync(new URL('../src/scope/scene.ts', import.meta.url), 'utf8')

const grab = (re, what) => {
  const m = src.match(re)
  if (!m) { console.error(`hover-field: cannot find ${what} in scene.ts — the shader moved, so this check is stale and is NOT passing.`); process.exit(1) }
  return parseFloat(m[1])
}
const R = grab(/1\.0 - hdist \/ ([\d.]+)/, 'the kernel radius')
const c = grab(/p \+= hdir \* pushW \* uR \* ([\d.]+)/, 'the push coefficient')
// uR is 1 at construction and 0.88 once the scene settles, and the shader
// renders under BOTH — so each law is checked against each value. Taking one
// on faith is how a check passes on a number the star never actually uses.
const uRs = [grab(/uR: \{ value: ([\d.]+)/, 'the initial uR'),
             grab(/uniforms\.uR\.value = ([\d.]+)/, 'the settled uR')]

const fail = [], report = []
for (const uR of uRs) {
  const A = uR * c
  const push = d => { const x = Math.max(0, Math.min(1, 1 - d / R)); return A * x * x * (3 - 2 * x) }
  const N = 20000, body = uR * 0.62
  const d2 = [...Array(N)].map((_, i) => { const d = (i / N) * 1.4; return d + push(d) })
  const folds = d2.filter((v, i) => i && v <= d2[i - 1]).length
  const cavity = Math.min(...d2) / body

  // Law 1 — no fold. smoothstep's steepest slope is 1.5/R, so A·1.5/R < 1.
  if (folds) fail.push(`at uR=${uR} the field folds through itself at ${folds}/${N} samples (A·1.5/R = ${(A * 1.5 / R).toFixed(3)}, must stay under 1). On an additive layer the fold is the brightest thing on screen.`)
  // Law 2 — compact support. The far side of the body must not move at all.
  if (push(body) > 0) fail.push(`at uR=${uR} the far side of the body still moves by ${push(body).toFixed(4)} — the star flinches instead of being touched.`)
  // Law 3 — hand-sized. A cavity past half the body radius is a hole, not a parting.
  if (cavity > 0.5) fail.push(`at uR=${uR} the cavity is ${(cavity * 100) | 0}% of the body radius — past half it reads as a hole punched in the star.`)

  report.push(`uR=${uR} A=${A.toFixed(3)} cavity ${(cavity * 100) | 0}%`)
}

if (fail.length) { console.error('hover-field FAILED\n' + fail.map(f => '  · ' + f).join('\n')); process.exit(1) }
console.log(`hover-field ok — R=${R} c=${c} · no fold · zero past R · ${report.join(' | ')}`)
