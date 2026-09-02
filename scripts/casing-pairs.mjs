#!/usr/bin/env node
// Casing is declared, never inherited — and it never travels alone.
//
// The old sheet put `text-transform: uppercase` and `letter-spacing: 0.09em`
// on `.app`, so EVERY string in the product inherited both. That is why prose
// shouted, and why the fix is not "add an override" but "stop broadcasting".
//
// The second half matters as much as the first. Tracking that suits uppercase
// (0.14–0.34em) is wrong for lowercase, and vice versa: caps need air between
// letterforms, lowercase already has it and comes apart. So the two properties
// are one decision. public/dome.html holds this with zero exceptions across
// every uppercase rule it declares; this check holds the app to the same bar.
import { readFileSync } from 'node:fs'
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')

// Strip comments first — a commented-out declaration is not a declaration,
// and a selector mentioned in prose is not a selector.
const bare = css.replace(/\/\*[\s\S]*?\*\//g, '')
const rules = [...bare.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => ({
  sel: m[1].trim().split('\n').map(s => s.trim()).filter(Boolean).join(' '),
  body: m[2],
}))

const fail = []
// Law 1 — nothing broadcasts casing to the whole tree.
// `.plate` and `.cn-plate` are screen-level containers, not primitives —
// broadcasting from either is the same fault as broadcasting from `.app`,
// one level down. That is exactly how the standby screen kept shouting for
// a while after the console had stopped, invisibly: a diff of the console
// looks clean while half the product is still on the old rule.
const GLOBAL = /^(\*|:root|html|body|\.app|\.plate|\.cn-plate)\s*(,|$|\s|\{)/
for (const r of rules) {
  if (!GLOBAL.test(r.sel)) continue
  const tt = r.body.match(/text-transform:\s*([\w-]+)/)
  if (tt && tt[1] !== 'none') fail.push(`\`${r.sel}\` broadcasts text-transform: ${tt[1]} to the whole tree — every string inherits it, including prose.`)
}
// Law 2 — an uppercase rule declares the tracking that suits uppercase.
const naked = rules.filter(r => /text-transform:\s*uppercase/.test(r.body) && !/letter-spacing/.test(r.body))
for (const r of naked) fail.push(`\`${r.sel}\` sets uppercase but no letter-spacing — caps need air that lowercase does not, so it is inheriting tracking chosen for some other case.`)

// Law 3 — one rule, one answer. A block that declares text-transform twice
// resolves to whichever came last, so an edit at the top of the block is
// silently discarded. Found the hard way on `.keyline`.
for (const r of rules) {
  const n = (r.body.match(/text-transform:/g) || []).length
  if (n > 1) fail.push(`\`${r.sel}\` declares text-transform ${n} times in one block — the last one wins and the others are silently dead.`)
}

const upper = rules.filter(r => /text-transform:\s*uppercase/.test(r.body)).length
if (fail.length) {
  console.error(`casing-pairs FAILED (${fail.length})\n` + fail.map(f => '  · ' + f).join('\n'))
  process.exit(1)
}
console.log(`casing-pairs ok — no inherited casing · ${upper} uppercase rules, each carrying its own tracking`)
