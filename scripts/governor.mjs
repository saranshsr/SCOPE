#!/usr/bin/env node
// The quality governor must be able to go both ways, on every panel.
//
// This is the check that would have caught the shipped bug in under a
// second. The old governor dropped above 24ms and restored below 14ms —
// absolute numbers — while rAF is vsync-bound, so on a 60Hz panel dt cannot
// fall below 16.7ms however fast the render is. The restore branch was dead
// code on the commonest display in the world, and one transient dip halved
// the particles and the resolution for the rest of the session.
//
// Nothing about that needs a browser to find. It needs the control loop to
// be reachable from a test, which is why src/scope/governor.ts exists.
//
// CLOSED LOOP, not open. Feeding a fixed dt stream would prove nothing:
// the whole failure is that the governor's own action changes the frame
// time it then measures. So the model below plays the machine — quality
// changes the cost, the panel clamps the result — and the governor sees
// only what it would really see.
//
//   node scripts/governor.mjs
import { Governor, LOW } from '../src/scope/governor.ts'

const HZ = { '60Hz': 1 / 60, '120Hz': 1 / 120, '144Hz': 1 / 144 }

// A machine, as the governor experiences it: full quality costs `fullMs`,
// reduced quality costs about a quarter of that (half the particles and a
// quarter of the fill), and the panel can never present faster than its
// own period.
const machine = (fullMs, period) => (q) => Math.max(period, (q < 1 ? fullMs / 4 : fullMs) / 1000)

const run = (gov, plant, seconds) => {
  const flips = []
  let t = 0
  while (t < seconds) {
    const dt = plant(gov.q)
    t += dt
    const nq = gov.update(dt)
    if (nq !== null) flips.push([+t.toFixed(1), nq])
  }
  return flips
}

const fail = []
const line = []

for (const [name, period] of Object.entries(HZ)) {
  // --- 1. a machine that is comfortably fast must never drop -----------
  {
    const g = new Governor()
    const flips = run(g, machine(period * 1000 * 0.7, period), 300)
    if (flips.length) fail.push(`${name}: a machine that hits the panel's rate dropped quality anyway (${flips.length} flips). Nothing was wrong and the governor acted.`)
    else line.push(`${name} fast: steady at full`)
  }

  // --- 2. a machine that is genuinely slow must drop, and must come back
  //        when the load lifts. This is the reachability test. ----------
  {
    const g = new Governor()
    const slow = machine(45, period)   // 45ms at full: badly over budget
    const fast = machine(period * 1000 * 0.6, period)
    const dropped = run(g, slow, 60)
    if (!dropped.some(([, q]) => q === LOW)) {
      fail.push(`${name}: a machine rendering at 45ms never shed quality — the drop threshold (${(g.dropAt * 1000).toFixed(1)}ms) is unreachable.`)
      continue
    }
    // The load lifts: another tab closed, the thermal throttle released.
    // Assert the END STATE, not that a flip was observed — a governor that
    // happened to be at full when the run began would satisfy a flip test
    // by accident, and the requirement is "it is at full quality", not "it
    // moved at some point".
    run(g, fast, 400)
    if (g.q !== 1)
      fail.push(`${name}: quality never came back after the machine got fast again — it is still at ${g.q} after 400s of easy frames. The restore bar is ${(g.restoreAt * 1000).toFixed(2)}ms and the panel's floor is ${(period * 1000).toFixed(2)}ms; a bar below the floor can never be crossed, which is exactly the shipped bug.`)
    else line.push(`${name} recovers: drop then restore`)
  }

  // --- 3. a MARGINAL machine must not strobe ---------------------------
  //  The one that produces "it hangs every few seconds". Full quality is
  //  over budget, reduced quality is comfortably under, so both bars are
  //  crossed forever unless the governor learns.
  {
    const g = new Governor()
    const flips = run(g, machine(38, period), 600)
    // THE SPEC IS THE SHAPE, NOT A COUNT. A marginal machine cannot be
    // given full quality, and the governor has no way to learn that the
    // load has lifted except by trying — so some attempts are unavoidable
    // and a bare flip count is an arbitrary line. What distinguishes a
    // governor from a strobe is that the attempts THIN OUT. The old loop
    // retried every five seconds forever and would fail the growth test on
    // its first two gaps; a backoff passes it by construction.
    const restores = flips.filter(([, q]) => q === 1).map(([t]) => t)
    const gaps = restores.slice(1).map((t, i) => t - restores[i])
    if (restores.length > 7)
      fail.push(`${name}: ${restores.length} attempts at full quality in 10 minutes. Each one shows the reduced scene snapping back and dropping again five seconds later, which is the strobe.`)
    const flat = gaps.findIndex((g2, i) => i > 0 && g2 < gaps[i - 1] * 1.7)
    if (gaps.length > 1 && flat > 0 && restores[flat + 1] < 240)
      fail.push(`${name}: the gap between attempts stopped growing after ${gaps.slice(0, flat + 1).map((x) => x.toFixed(0)).join('s, ')}s. The backoff is not compounding, so it never settles.`)
    if (!fail.length || !fail[fail.length - 1].startsWith(name))
      line.push(`${name} marginal: ${restores.length} attempts, gaps ${gaps.map((x) => x.toFixed(0)).join('/')}s`)
  }

  // --- 4. the structural invariant, stated directly --------------------
  {
    const g = new Governor()
    // let it learn the panel
    for (let i = 0; i < 2000; i++) g.update(period)
    if (g.restoreAt <= period)
      fail.push(`${name}: the restore bar (${(g.restoreAt * 1000).toFixed(2)}ms) is at or below the panel's own frame period (${(period * 1000).toFixed(2)}ms). rAF cannot deliver a frame faster than the panel, so this bar can never be crossed.`)
    if (g.dropAt <= g.restoreAt)
      fail.push(`${name}: drop bar ${(g.dropAt * 1000).toFixed(2)}ms is not above restore bar ${(g.restoreAt * 1000).toFixed(2)}ms — no hysteresis, so it will chatter on noise alone.`)
  }
}

// --- 5. the governor must not act before it has seen anything ----------
{
  const g = new Governor()
  if (g.update(1 / 60) !== null) fail.push('the governor acted on its very first frame, before it had measured anything.')
}

if (fail.length) {
  console.error(`governor: ${fail.length} finding${fail.length > 1 ? 's' : ''}`)
  for (const f of fail) console.error('  · ' + f)
  process.exit(1)
}
console.log(`governor     ok  (${line.length} cases: ${line.join('; ')})`)
