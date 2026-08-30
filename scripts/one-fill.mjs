/**
 * The accent-fill law, made checkable.
 *
 * Light-on-dark yellow means "this is a live reading". Dark-on-yellow means
 * "this is the subject" — and there is exactly ONE subject at a time. Red
 * used to do four jobs at nine alphas, which is how the accent zone kept
 * failing audit; rarity is the only thing that gives an accent force.
 *
 * Counts rules that paint an accent BACKGROUND (a fill), since that is the
 * inverted form. Yellow type is unlimited and not counted.
 *
 * Usage: node scripts/one-fill.mjs
 */
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')

const fills = []
for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const sel = m[1].trim().replace(/\s+/g, ' ')
  const body = m[2]
  if (sel.startsWith('@')) continue
  // a fill is an accent painted as background
  const bg = body.match(/background(?:-color)?:\s*([^;]+)/g)
  if (!bg) continue
  if (!bg.some((d) => /--accent\b|--accent-hot\b/.test(d))) continue
  // A FILL is the inverted form: accent ground carrying DARK text. A small
  // element painted accent with no dark foreground is a mark, not a fill —
  // dots, ticks and carets belong to the unlimited accent-mark tier.
  const fg = body.match(/(?<!-)color:\s*([^;]+)/g) || []
  const inverted = fg.some((d) => /--bg\b|#0a0a0a|#000/.test(d))
  if (inverted) fills.push(sel)
}

// Transient states are exempt: they exist only while the pointer or the
// caret is on the element, so they cannot accumulate.
const EXEMPT = /:hover|:active|:focus|::selection|\.power\b/

/**
 * The two standing fills that are allowed, and why. Each marks a SINGLE
 * active selection inside its own group, so neither can ever be lit twice.
 * Anything not on this list is a new fill and has to justify itself here
 * before it ships — that is the whole point of the check.
 */
const ALLOWED = new Map([
  ['.tuner-chips button.on', 'the chosen vibe — one per tuner'],
  ['.transport .t-mute.on', 'muted — one per transport'],
])

const standing = fills.filter((s) => !EXEMPT.test(s))

console.log(`inverted accent fills (dark type on accent ground): ${fills.length}`)
for (const s of fills) {
  console.log(`  ${EXEMPT.test(s) ? 'transient' : 'STANDING '}  ${s.slice(0, 72)}`)
}
const unlisted = standing.filter((s) => !ALLOWED.has(s))
if (unlisted.length) {
  console.error(`\nFAIL: ${unlisted.length} unlisted standing accent fill(s):`)
  for (const s of unlisted) console.error(`  ${s}`)
  console.error('\nA fill is the inverted form — it claims to be THE subject.')
  console.error('If several can be lit at once, use accent TYPE on dark instead.')
  console.error('If it really is a single selection, add it to ALLOWED with a reason.')
  process.exit(1)
}
console.log(`\nPASS: ${standing.length} standing fill(s), all accounted for:`)
for (const s of standing) console.log(`  ${s} — ${ALLOWED.get(s)}`)
