#!/usr/bin/env node
// Every law, in one command.
//
//   node scripts/check.mjs          all of them
//   node scripts/check.mjs --fast   only the ones that need no browser
//
// The split matters: the static checks parse files and finish in
// milliseconds, so they can run on every save. The browser checks drive a
// real page and cost ~30-60s each, which is fine before a commit and far too
// slow to run in a loop. Keeping them in one list with one flag means the
// fast ones actually get run instead of the whole suite getting skipped.
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
// `one-fill` is not in this list because scripts/one-fill.mjs is not on
// disk. Do not restore it from history without reading it first: the old
// copy matched --accent / --accent-hot, which DESIGN.md §1 retired in
// favour of --red and which now appear zero times in styles.css. Restoring
// it would turn a loud MODULE_NOT_FOUND into a silent vacuous pass, which
// is strictly worse. Write it against --red or leave it out.
const STATIC = ['room-period', 'casing-pairs', 'hover-field', 'spacing', 'motion', 'type-scale']
/* PARKED, not deleted, and not in either list:
 *
 *   room-geometry — asserts a far wall derived from `.curve`. That selector
 *     exists once, in public/dome.html, and zero times in src/. The shipped
 *     app has no curved far wall, so there is nothing to re-point it at and
 *     no DESIGN.md text to ground it in. It fails honestly and will keep
 *     failing until the room is built.
 *
 *   descent — asserts a four-movement scroll approach: `.movement`,
 *     `.aperture`, `.gate`, `.gate-dials`, `.say`, `.aside`. Two of those
 *     appear in NEITHER src/ nor dome.html, and the shipped landing does not
 *     scroll at all: it is `.plate`, one non-scrolling standby sheet. It
 *     crashes on an unguarded getBoundingClientRect.
 *     Worth salvaging when someone has an hour: its dial arm (the three
 *     standby dials are keyboard-turnable and track aria-valuenow) is a real
 *     law about a real control, and `.plate .pl-dial` is live. That belongs
 *     in flight.mjs, which already owns the landing.
 *
 * Both files stay on disk. A check pointed at an unbuilt design is not
 * wrong, it is early, and deleting it loses the specification. What is not
 * acceptable is leaving them in the run list reporting red against the
 * shipped product, which is how eight of eighteen came to be ignored. */
const BROWSER = ['flight', 'console-keys', 'ui-guard', 'readings', 'layout', 'offscreen', 'voice', 'failure-states', 'shadowed']

const fast = process.argv.includes('--fast')
const list = fast ? STATIC : [...STATIC, ...BROWSER]

// ── PREFLIGHT: is there anything to check? ─────────────────────────────
// The dev server died mid-run and seven browser checks each crashed with an
// unhandled ERR_CONNECTION_REFUSED and a Node stack trace -- fifty lines of
// puppeteer internals whose actual meaning was "start the server". Every one
// of them reported as a FAILED LAW, which is the same mistake the checks
// themselves keep making: blaming the product for the room it runs in.
//
// One request, before anything runs, and one line if it is not there.
if (!fast) {
  const URL = process.env.SCOPE_URL || 'http://localhost:5260/'
  let up = false
  try {
    const c = new AbortController()
    const t = setTimeout(() => c.abort(), 4000)
    const r = await fetch(URL, { signal: c.signal })
    clearTimeout(t)
    up = r.ok
  } catch { up = false }
  if (!up) {
    console.error(`check: nothing is serving ${URL}, so the ${BROWSER.length} browser laws cannot run.`)
    console.error('  This is the harness, NOT the product. Start the dev server and try again.')
    console.error('  (`--fast` runs the static laws, which need no server.)')
    process.exit(1)
  }
}
let failed = 0
const t0 = Date.now()

for (const name of list) {
  const started = Date.now()
  // A PER-CHECK CEILING. `voice` once held the suite for 2872 seconds -- 48
  // minutes -- because Chrome failed to launch and the failure surfaced
  // slowly under a machine that was already struggling. The slowest honest
  // check is ~110s, so four minutes is generous; past that the run has
  // stopped being a measurement and started being a hostage.
  const LIMIT_MS = 240_000
  const r = spawnSync(process.execPath, [join(here, `${name}.mjs`)], { encoding: 'utf8', timeout: LIMIT_MS })
  const secs = ((Date.now() - started) / 1000).toFixed(1)
  const timedOut = r.error && r.error.code === 'ETIMEDOUT'
  const ok = !timedOut && r.status === 0
  if (!ok) failed++
  process.stdout.write(`${ok ? '  ok  ' : '  FAIL'} ${name.padEnd(15)} ${secs}s\n`)
  // On failure the reason IS the output — print it, indented, never swallowed.
  if (timedOut) {
      process.stdout.write(`        timed out after ${LIMIT_MS / 1000}s and was killed. The slowest honest check is ~110s,\n`)
      process.stdout.write('        so this is a hang — the harness or the machine, NOT the product.\n')
  } else if (!ok) process.stdout.write((r.stderr || r.stdout || '(no output)').trimEnd().split('\n').map(l => '        ' + l).join('\n') + '\n')
}

const total = ((Date.now() - t0) / 1000).toFixed(1)
if (failed) { console.error(`\n${failed} of ${list.length} failed in ${total}s`); process.exit(1) }
console.log(`\nall ${list.length} laws hold${fast ? ' (static only — run without --fast for the browser checks)' : ''} · ${total}s`)
