#!/usr/bin/env node
// "Block spacing sits on this scale." (DESIGN.md §1)
//
// This law has now been broken twice. The token block's own comment records
// the first: the console "drifted to 18 distinct values with 10 off any
// grid". It was cleaned, and it drifted straight back -- 11 sites across
// 7 values (2, 6, 10, 14, 20, 26px) by the time this check was written.
//
// It drifts because every individual instance is defensible. Nobody sets
// `gap: 26px` to break a law; they nudge one stack until it looks right in
// the state they are looking at. The scale is only worth anything if
// something counts, so this counts.
//
// Static and fast (no browser): a stylesheet is the whole truth for gaps,
// and blanking comments in place makes the scan exact -- the failure mode
// that made CLASS scanning unreliable (template literals, apostrophes) does
// not exist for a numeric property.
import { readFileSync } from 'node:fs'

const SRC = 'src/styles.css'
const css = readFileSync(SRC, 'utf8')
// blank comments IN PLACE so prose numbers cannot be read as declarations
// and line numbers stay true to the file
const flat = css.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))

// The scale, plus two exemptions that are structure rather than rhythm:
//   0   -- no gap at all
//   1px -- the hairline-rule technique: a grid gap that lets the container's
//          background through as a divider (.presets, .mix-rows and friends).
//          That 1px is a BORDER drawn with a gap, not spacing.
/* THE SCALE IS THE CONSTITUTION'S, not this file's.
 *
 * This read `4 / 8 / 12 · 32 / 56 / 96` and rejected 6, 10, 16 and 24 --
 * every one of which DESIGN.md §1 explicitly grants -- while permitting
 * 32/56/96 under --space-breath/room/void, three tokens that appear in
 * neither DESIGN.md nor styles.css. Ten of its seventeen findings were
 * legal per the document it claims to enforce. A check that disagrees with
 * the constitution is not a stricter check, it is a second constitution.
 *
 * Only 4 / 8 / 12 are named tokens; the rest are steps on the scale with no
 * token, so they are legal but reported by name rather than by token. */
const SCALE = new Map([[4, '--gap-tight'], [6, null], [8, '--gap-related'], [10, null],
                       [12, '--gap-sep'], [16, null], [24, null]])
const EXEMPT = new Set([0, 1])

const bad = []
// margin-top and margin-bottom pay for the SAME intervals gap does, and were
// not counted -- so three off-scale values (10, 14, 10px) sat in the sheet
// untouched while every gap was on the grid. One of them was worse than
// off-scale: `.keyline` carried a 10px margin ON TOP of its panel's 12px
// grid gap, so help's heading sat 22px from its body while every other panel
// sat at 12. One interval, paid for twice, by a margin and a gap that could
// not see each other.
const re = /\b(?:gap|margin-top|margin-bottom):\s*([^;}]+)[;}]/g
let m
while ((m = re.exec(flat))) {
  const line = flat.slice(0, m.index).split('\n').length
  for (const tok of m[1].trim().split(/\s+/)) {
    const px = /^(\d+(?:\.\d+)?)px$/.exec(tok)
    if (!px) continue                       // var(), %, ch, calc() -- not a literal
    const v = parseFloat(px[1])
    if (EXEMPT.has(v) || SCALE.has(v)) continue
    const near = [...SCALE.keys()].reduce((a, b) => Math.abs(b - v) < Math.abs(a - v) ? b : a)
    bad.push({ line, v, near, token: SCALE.get(near) || `${near}px`, text: css.split('\n')[line - 1].trim().slice(0, 78) })
  }
}
// An on-scale literal is not wrong, but the token says WHY. Report separately.
const literal = []
const re2 = /\b(?:gap|margin-top|margin-bottom):\s*([^;}]+)[;}]/g
while ((m = re2.exec(flat))) {
  const line = flat.slice(0, m.index).split('\n').length
  for (const tok of m[1].trim().split(/\s+/)) {
    const px = /^(\d+(?:\.\d+)?)px$/.exec(tok)
    if (px && SCALE.has(parseFloat(px[1]))) literal.push({ line, v: parseFloat(px[1]), token: SCALE.get(parseFloat(px[1])) || `${parseFloat(px[1])}px` })
  }
}

// ── VERTICAL PADDING ON CONTAINERS ────────────────────────────────────
// §1 exempts a control's own padding as optical fit for a label, and that is
// right for a button whose height is set by the 44px touch floor: its
// vertical padding centres a label inside a target, it does not space blocks.
// A CONTAINER's vertical padding is rhythm, and nothing counted it -- the
// panel shipped 26px top / 22px bottom, neither on the scale nor a stated
// ratio, and that top value IS the space above every panel heading.
const CONTROLish = /button|input|\[role="slider"\]|\.power\b|-btn\b|\.chip\b/
const vpad = []
{
  const rules = flat.split('}')
  let at = 0
  for (const chunk of rules) {
    const brace = chunk.indexOf('{')
    const start = at
    at += chunk.length + 1
    if (brace < 0) continue
    const sel = chunk.slice(0, brace).trim().split('\n').pop().trim()
    const body = chunk.slice(brace + 1)
    if (!sel || sel.startsWith('@') || CONTROLish.test(sel)) continue
    // min-height reads as "this is a touch target", which exempts controls
    // whose selector does not say `button` -- `.sound-act` is one. It also
    // exempts `.floor`, which is a room and not a target, so that one is
    // named in DESIGN.md instead. The signal for "control vs container" is
    // not in the CSS, and pretending otherwise trades one false report for
    // another.
    if (/min-height\s*:/.test(body)) continue
    const m = /\bpadding(-top|-bottom)?\s*:\s*([^;]+);/.exec(body)
    if (!m) continue
    const parts = m[2].trim().split(/\s+/)
    const verts = m[1] ? [parts[0]] : (parts.length >= 3 ? [parts[0], parts[2]] : [parts[0]])
    for (const v of verts) {
      const px = /^(\d+(?:\.\d+)?)px$/.exec(v)
      if (!px) continue
      const n = parseFloat(px[1])
      if (EXEMPT.has(n) || SCALE.has(n)) continue
      const line = flat.slice(0, start + brace).split('\n').length
      const near = [...SCALE.keys()].reduce((a, c) => Math.abs(c - n) < Math.abs(a - n) ? c : a)
      vpad.push({ line, v: n, near, token: SCALE.get(near) || `${near}px`, sel: sel.slice(0, 40) })
    }
  }
}
for (const v of vpad) bad.push({ line: v.line, v: v.v, near: v.near, token: v.token,
  text: `${v.sel} — vertical padding on a container is rhythm` })

if (bad.length) {
  console.error(`spacing FAILED — ${bad.length} interval${bad.length > 1 ? 's' : ''} off the scale (DESIGN.md §1):`)
  for (const b of bad) console.error(`  · ${SRC}:${b.line}  ${b.v}px — nearest is ${b.token === `${b.near}px` ? `${b.near}px` : `${b.near}px (${b.token})`}\n      ${b.text}`)
  console.error(`\n  The scale is 4 / 6 / 8 / 10 / 12 / 16 / 24 (DESIGN.md §1). 0 and 1px are`)
  console.error(`  exempt (1px is the hairline-rule technique: a border drawn with a grid
  gap, not spacing).`)
  process.exit(1)
}
const extra = literal.length ? `, ${literal.length} on-scale literal${literal.length > 1 ? 's' : ''} that could name their token` : ''
console.log(`spacing ok — every gap and vertical margin is a scale token, 0, or a 1px hairline${extra}`)
