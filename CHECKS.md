# SCOPE — Verification

DESIGN.md is the constitution: what the room must be. This is the other half:
**how any of it is known to be true.** It is a separate file because a
constitution that is one fifth testing lore stops being read as a
constitution — and because most of what follows is not design at all, it is
the record of checks that were wrong.

The suite is `node scripts/check.mjs` (`--fast` for the static ones). Every
check here has been **mutation-tested**: broken on purpose, and shown to
fail. That is the entry fee, and §4 is what happens without it.

---

## 1 · The laws, and what enforces them

This table was wrong for a while and the errors are worth naming, because
they are the same class of error the suite exists to catch. It listed a
check whose file is not on disk (`one-fill`), omitted two that run
(`type-scale`, `offscreen`), and the running text below claimed "all 17
laws hold" against a suite of eighteen. A verification document that
cannot be verified against its own runner is decoration.

| check | holds | kind | state |
|---|---|---|---|
| `room-period` | one shared idle period; grain and the flight are exempt | static | holds |
| `casing-pairs` | uppercase is for labels, never prose | static | holds |
| `hover-field` | the hand parts the field, unsprung, with compact support | static | holds |
| `spacing` | every gap is a step on §1's scale, 0, or a 1px hairline | static | holds |
| `motion` | every duration is on the table, and nothing eases in | static | **see §9** |
| `type-scale` | every size, tracking and leading names a token | static | **see §9** |
| `flight` | the power-on flight: rev, dive, arrival | browser | holds |
| `console-keys` | every control has a key, and the key moves something | browser | holds |
| `ui-guard` | the star does not answer to the console | browser | — |
| `readings` | only real readings, and the meters report | browser | — |
| `layout` | bands clear each other; every control is reachable | browser | — |
| `offscreen` | every child sits inside its surface and on screen | browser | — |
| `voice` | no em dash in user-visible copy | browser | — |
| `failure-states` | what the console says when it breaks | browser | — |
| `shadowed` | no rule declares something the product never does | browser | holds |

**Parked, on disk, in neither run list:** `room-geometry` derives a far
wall from `.curve`, which exists once in `public/dome.html` and zero times
in `src/`. `descent` asserts a four-movement scroll approach when the
shipped landing does not scroll at all, and two of its selectors are in
neither file. Both describe the unbuilt room. A check pointed at a design
that does not exist yet is early rather than wrong, and deleting it would
lose the specification — but leaving it in the run list, red, against a
product it was never about, is how eight of eighteen came to be ignored.
`descent`'s dial arm is a real law about a real control and belongs in
`flight.mjs`.

**Deleted from the list:** `one-fill`, whose file is gone. Do not restore
it from history without reading it: it matches `--accent` / `--accent-hot`,
which §1 retired for `--red` and which appear zero times in the stylesheet.
Restoring it trades a loud MODULE_NOT_FOUND for a silent vacuous pass.

---


## 1.1 · Run it with nothing else on the GPU

The browser checks drive a live WebGL scene under a software rasteriser, and
they are timing-sensitive by nature. **A second live page competing for the
GPU makes them fail on working code.** Leaving the app open in a preview pane
while the suite ran produced two failures — `= · zoom in` reached 1.169 of a
1.563 target, and `readings` found no mix rows after pressing `d` — and both
passed immediately once that page was closed. Nothing in the product had
changed.

Contention should not be able to *falsify* a check, though, and that is the
real lesson: **"stopped moving" cannot tell a finished animation from a
starved one.** Three consecutive still samples were not enough, because under
sustained starvation all three are still. Where a damper has a knowable
destination, settle on the destination instead — `console-keys` now requires
`|zoom - zoomTarget| < 0.02` before calling zoom settled, which is true
regardless of how many frames it took to get there. A failure also prints the
target now, so `zoom 1.562 / zoomTarget 1.563` reads as *the key never fired*
rather than *the value looks wrong*.

Dampers without a published target (dissect) still rely on stillness, so run
the suite on a quiet machine.

---

## 2 · What a check must never confuse

Three checks in this build have failed the same way, and it is worth naming
because the failures all looked like product bugs at first:

| check | it reported | the truth |
|---|---|---|
| `console-keys` | `0 · zoom reset` did nothing | the reset was working; the sampler gave up mid-glide |
| `readings` | "tier meters are not reporting" | the meters were fine; no sound had arrived yet |
| `voice` | clean, twice | it had never rendered the copy it was judging |
| `layout` | "every control reachable" | it tested reachability at each control's *centre*, and off-screen *vertically* only |
| `ui-guard` | ok, for the whole build | geometry held the star still, its targets no longer existed, the tour covered them, and it measured after the gesture had released |
| `one-fill` | "all accounted for" | two of the three fills it accounted for had been deleted |

The shape is the same each time: **the check asserted on a condition it had
not established** — or, in `layout`'s case, quietly narrowed the claim its
own success message made. A blind `setTimeout` stood in for "the animation has
finished" and for "the radio is playing"; a selector that matched nothing
stood in for "I swept every source".

Three rules follow, and they are cheap:

1. **Wait for the state, not for a duration.** Poll for the thing itself —
   a value that has stopped moving, a level above silence — with a deadline
   that fails loudly rather than a timeout that passes quietly.
2. **A sweep must assert that it swept.** If a selector matches nothing,
   that is an error, not an empty success. `srcs.length < 2` is a hard fail
   in `voice.mjs` for exactly this reason.
3. **Separate "broken" from "absent" in the failure message.** `readings`
   now exits with *"no audio arrived — this is the harness or the network,
   NOT the meters"* before it can ever blame the display. A check that
   cannot tell those apart sends you to fix working code.

The corollary for reading a red suite: **the first hypothesis for a failing
check is the check.** Every one of the three above was the harness, and the
product was correct each time.

---

## 2.1 · Force the condition, do not wait for it

The floor's height flapped only when a reading crossed 9 → 10 or 99 → 100.
The first check written for it sampled the height every 350ms for 3.5s and
**passed against the exact bug it was written for**, because no level
happened to cross a digit boundary while it was watching.

Sampling tests whether the symptom *showed up*; it does not test the
property. The arm now sets every ring reading to `0`, measures, sets them all
to `100`, measures again, and restores them. If those two heights differ, the
band resizes with its own values — deterministically, in one frame, at every
viewport, whatever the music is doing.

Where a fault depends on data you do not control, **supply the data**.

---

## 2.2 · Do not blame the product for the room it runs in

Two checks failed in one run and neither was the product:

- `failure-states` reported *"the failure path logged errors:
  net::ERR_INTERNET_DISCONNECTED"*. The wifi had dropped mid-run. The check
  asserts the recovery path logs nothing, which is right — but a transport
  error from Chrome is the **environment**, and treating it as a defect turns
  a flaky connection into a red suite. Those error codes are now separated,
  and the run exits saying *"the network dropped … this is the environment,
  NOT the product"*.
- `readings` reported two tier meters "stuck" at 0.2/8 and 0.4/8. Rings 4 and
  5 are air and hi-mid, and they genuinely sit near zero through a bass-heavy
  passage — the meter telling the truth. The rule now needs a **majority** of
  rings flat before it calls the readout dead: six meters at the bottom is a
  broken display, two are a bassline. That mirrors the rule already on the
  other end, where six meters at the top are "not a mix, they are a light".

The shared mistake is a check asserting on something the product does not
control, or on one sample of a signal that is allowed to vary. Both now say
which side of the line they are on, in the failure text, so the next person
does not go looking in the wrong file.

---

## 2.3a · Exit code 0 is not a pass

A stray invocation ran the suite through `node -e "import('./scripts/check.mjs').catch(...)"`
— intended as a syntax check, which it is not: importing a module *runs* it.
It stopped after 2 of 17 checks and **exited 0**, because the `.catch()`
swallowed whatever threw and turned a crash into a silent success.

The suite's real signal is its last line — `all N laws hold · 400s`. Its
*absence* is the tell, and an exit code alone cannot carry it. Anything
reading this suite should look for that line, not for a zero.

Two smaller notes from the same detour: `node --check <file>` is the
parse-only tool (it does not execute), and piped output from a long run
buffers, so a file that looks stalled at two lines may simply not have
flushed.

---

## 2.3b · A check needs a ceiling

`voice` once held the suite for **2872 seconds — 48 minutes**. Chrome had
failed to launch (*"timed out waiting for the WS endpoint URL"*) on a machine
already struggling with the network down, and the failure surfaced slowly
enough that the run stopped being a measurement and became a hostage.

`check.mjs` now kills any check at **240 seconds** — the slowest honest one is
~110s — and reports it as its own kind of failure:

```
FAIL voice           240.0s
     timed out after 240s and was killed. The slowest honest check is ~110s,
     so this is a hang — the harness or the machine, NOT the product.
```

Same principle as §2.2 and §2.3: a run that cannot finish has not found
anything, and saying so in one line is worth more than a stack trace an hour
later. **Every check in this file can fail; until now, one could also simply
never return.**

---

## 2.3 · Check the harness before you check the product

The dev server stopped mid-run and **seven browser laws each crashed with an
unhandled `ERR_CONNECTION_REFUSED` and a fifty-line puppeteer stack trace**,
reporting as seven failed laws. The actual meaning was *start the server*.

`check.mjs` now makes one request before running anything and, if nothing
answers, says so in a line:

```
check: nothing is serving http://localhost:5260/, so the 8 browser laws cannot run.
  This is the harness, NOT the product. Start the dev server and try again.
  (`--fast` runs the static laws, which need no server.)
```

This is the same rule as §2.2 one level up: **a precondition that fails is
not a law that fails.** A suite that reports a missing server as seven broken
laws trains you to skim red output, which is the one habit that makes every
other check in this file worthless.

---

## 2.4 · A rule that never applied is not a rule

Three defects this build shared one mechanism: **on equal specificity the
later rule wins, silently**, and the earlier one sits in the sheet describing
behaviour the product never has.

| the inert rule | what it cost |
|---|---|
| a duplicated `text-transform` in one block | the later declaration won unnoticed |
| `[hidden] { display: none }` beaten by `.reads { display: flex }` | both reading sets rendered; the floor grew a fourth column and **the source picker was pushed off the right edge at 900px** |
| `.reads-rings .v { font-size: var(--t-data) }` beaten by the later `.read .v { var(--t-value) }` | six ring readings at display size — the one display moment spent six times over |

Every one had a comment above it describing the intent so plainly that the
rendered result was never questioned. **A comment is not a constraint**, and
neither is a declaration.

`scripts/shadowed.mjs` asks the live DOM instead: does any element this rule
matches ever render its value? Getting the definition right took three
attempts, and the wrong ones are the instructive part:

1. **"Shadowed" was too broad.** Flagging any rule beaten by a later one at
   equal-or-higher specificity reported `.chip` beaten by `.chip.on` — the
   cascade working exactly as intended.
2. **Comparing declared to computed needs care.** `inline-flex` computes to
   `flex` on a flex item (blockification), `0.42em` of 40px computes to
   16.8px, `inherit` resolves to whatever it inherited, and a rule inside a
   `pointer: coarse` block is not failing to apply on a desktop — it is not
   for this room. Four false-positive classes, all legitimate CSS.
3. **It assumed the states it compared.** Scanning two rooms and reporting a
   rule inert only if it applied in neither is correct — but if a transition
   silently fails, both scans see the *same* room, and every rule that is
   right only in the other one reports as dead. That is exactly what happened
   on a later run: `.reads { display: flex }` and `.keyline-open { display:
   none }` are both correct in the whole room, and the whole room was never
   reached. It now polls `uDissect` until the room actually changes and exits
   saying *"could not reach the dissected room… this is the harness, NOT the
   product"*. Same rule as §2.3, one level in: a precondition that fails is
   not a law that fails.
4. **Intersecting two states was backwards.** Requiring a rule to be inert in
   both the whole and the dissected room discarded precisely the real cases,
   because `.reads-rings` only exists in one of them. The correct combination
   is *matched somewhere, never observed applying anywhere* — and the mutation
   test is what exposed it: after "fixing" the check, the historical bug
   passed clean.

**Extended to `gap`, which immediately found a fifth.** The watch list began
as display / text-transform / font-weight / font-size, and the two most
recent source-order defeats in this build were `background` and `gap` —
invisible to it. Adding `gap` reported `.mix-chips { gap: var(--gap-related) }`
rendering at 4px: the generic `.chips` rule sets `--gap-tight` **1080 lines
below it** at equal specificity, so the mix panel's intended 8px had never
once rendered.

The fix was not specificity. There is exactly **one** chips element in the
product — `<div className="chips mix-chips">` — so two rules a thousand lines
apart were describing the same single element with conflicting gaps, each
reading as though it were in charge. They are one rule now. *When two
selectors only ever match the same element, they are not a base and a
variant; they are a duplicate with extra steps.*

Adding `gap` also needed one comparison fix: it is a **shorthand**, so a
single declared value sets both axes and a later `column-gap` legitimately
overrides one — the computed value reads `4px 32px` while the rule did apply
on the row axis. Compared component-wise now.

**Its stated limit:** a rule matching many elements, correct on some and
defeated on others, reads as applied — which is why `[hidden]` does not
report here. The consequence of that one is caught by `layout` instead. Two
checks, one fault, on purpose.

---

## 2.5 · I walked into the trap I had already documented

§6 says plainly: puppeteer measures, a real browser judges — written after
swiftshader's black squares looked like a NaN propagating through the bloom.

Then a phone screenshot showed the star blazing through the whole sound
panel, and I chased it. Measured the ground (0.90-0.96 alpha under every
piece of content — already strong), reasoned about *why* a strong ground
might still fail there, and found a genuinely sound argument: on a phone the
star's core sits at y=321 and the panel spans 199-485, so the panel lies over
the brightest part of the star, whereas on a desktop it sits below the core
over the dim outer field. Ten percent of a core is not ten percent of a halo.

The argument was correct. The premise was not. Opening the same viewport in a
real browser at LEVEL 77% showed a **completely clean panel**. The wash was
swiftshader's artifact — the black squares, now rendering as horizontal
streaks.

The change was reverted. It had no demonstrated benefit and pushed the panel
toward the box the design language spends §1 avoiding. **A good argument
built on unverified evidence is still unverified**, and being able to explain
a symptom is not the same as having seen one.

The order that would have saved the detour: confirm the symptom on hardware
*first*, then reason about the cause. I had it written down and did it
backwards anyway.

---

## 2.7 · A retry is only safe if the action is idempotent

Having made both checks assert the dissect, the obvious next step was to
retry the press when it did not land — it had genuinely dropped on a real run
at 1024x768, and a check that reddens at random gets re-run rather than read.

Three blind attempts made it *worse*. **`d` is a toggle.** Pressing again
while the damper is still gliding reverses it, so the retry fought the thing
it was trying to help and left `uDissect` at **0.28** — caught mid-flight,
heading back the way it came. The first version of the guard was more
reliable than the "fix".

The distinction that makes a retry safe here is between **dropped** and
**slow**: re-press only when the value has not moved at all, and never when
it is merely travelling. That is one extra reading and it is the whole
difference between a retry and a fight.

Worth stating generally, because the instinct to retry a flaky step is
usually right: **retrying a toggle is not retrying, it is undoing.** Before
adding a retry, ask whether doing the thing twice means the same as doing it
once.

---

## 2.6 · A false pass is worse than a false failure

`shadowed` failing on two rules it had no business flagging led to a worse
find one file over.

Three checks press `d` to open the stack, because several things only exist
in that room. `readings` guards it — *"no mix rows appeared after pressing d…
this check is stale"*. `shadowed` now guards it. **`layout` did not.**

That matters more than the others. Layout presses `d` precisely because *the
mix panel only reaches its real height dissected* — that is written in its
own comment. If the press silently failed, it measured a panel at a fraction
of its size and printed **ok**. Not a spurious red: a confident green over
the exact state it was added to inspect. It is how the clipped panel shipped
the first time — the check was looking at the wrong room and saying so
confidently.

Both now poll `uDissect` until the room actually changes, and say which side
of the line a failure is on. The general form, and the fourth instance of it
in this file: **assert the state you are about to measure.** A check that
assumes its setup worked is only testing the runs where it did.

---

## 2.8 · Assert what you mean, not what correlates with it

The reduced-motion path was only checked for the descent. Law 2 asks for
more: the flight completes, the room arrives, and the star — which *is* the
product — survives. The banned shortcut
(`* { animation-duration: 0.01ms !important }`) satisfies a naive check while
deleting the thing people came for.

So the new arm asserted `live`, `floorVisible`, and `starRunning`. The
mutation test — a global animation kill plus `canvas { display: none }` —
**passed clean**.

`starRunning` reads `uTime > 0`. The render loop keeps ticking with the
canvas hidden, so the uniform reported a perfectly healthy star that was not
on screen at all. I had asserted the star was *running* when what I meant was
that it was *there*, and those two only correlate while nothing is wrong —
which is exactly when a check is worthless.

It now asks whether the canvas is displayed, visible, non-transparent and
larger than 100x100. The same mutant then reports *"the star is not on screen
— reduced motion removes travel, not the subject."*

**The tell was the mutation test, not the reasoning.** Both assertions read
correctly to me when I wrote them.

---

## 2.8b · One sweep is not exhaustive

`dead-css` was run once, its `.rail*` and `.cn-*` findings acted on, and the
rest left. Two later waves surfaced anyway — the deck and plate leftovers
(52 rules, 7.7KB) and then a third (34 rules, 4.9KB): `.tube-list`,
`.presets`, `.level-meter`, `.nowplaying`, `.vol` and friends. The stylesheet
went from 102KB to **97KB** after the first cleanup had already taken it from
111KB.

Each wave was invisible to the last because I filtered the report by *prefix*
— chasing the names I already suspected — rather than working the whole list.
The sweep had reported all of them the first time.

The rule that made each wave safe is the same one, and it now has a third
qualifier:

1. never matched across the driven states, **and**
2. absent from the source — searched across **all** of `src/**/*.ts(x)`, not
   the one file you have open. Checking `App.tsx` alone flagged `.mod`, which
   lives elsewhere.
3. and where the name suggests a *feature*, confirm the feature still works.
   `.tube-list` looked dead and the jukebox is protected by PRODUCT.md — the
   UI had simply been rehomed to `.sound-list`, exactly as the vibe tuner was
   rehomed to `.sound-find`. A dead class name is not a dead feature.

**And I nearly deleted the scrubber.** Having verified six class names, I
wrote a pattern covering eighteen. `.deck-wave` is the seek control and was
in it. Verify the pattern you are about to run, not the hypothesis that
produced it — `.pl-dials` is dead and `.pl-dial` is live, one character
apart.

---

## 2.9 · A build passing is not a stylesheet being valid

Removing a second wave of dead CSS (7.7KB, the deck and plate leftovers)
needed surgery on three rules that mixed live selectors with dead ones. One
substitution ate the last selector in a list and left this:

```css
.pl-dial .cap b,
.chip,
.diag-line,
.spec-hz,
{ font-variant-numeric: tabular-nums; }
```

A trailing comma and no final selector. **`vite build` reported success.**
The rule is invalid and the browser drops it, so every tabular numeral in the
product would have silently reverted to proportional digits — the exact
jitter that rule exists to prevent — and nothing in the toolchain would have
said a word.

It was caught by grepping for `^\s*,|,\s*\{|^\s*\{` after the edit, which is
now the thing to do after any programmatic CSS surgery. The earlier lesson
from this build was *use exact-string edits, not brace-matching*; this is the
follow-up: **when you must do surgery anyway, verify the shape of what you
produced, because the build will not.**

---

## 3 · What the room says when it breaks

The failure states were the last unaudited surface. Every other check drives
a happy path; these are where **law 2 (safe space)** is actually tested,
because a room that goes silent and says nothing is not calm, it is broken.

The bar is three things, each with its own way of failing quietly:

1. **It says something legible** — not blank, not a stack trace.
2. **It does not stick** — a spinner with no end is worse than an error.
3. **It recovers** — sound returns without a reload.

A corrupt file currently reads *"now playing file not playable"* /
*"back to the radio"*, then falls back to the radio on its own. That is the
right answer, and `scripts/failure-states.mjs` now holds it there by feeding
the room 60KB of noise named `.mp3` and asserting all three.

**Reading the code found a bug that was not there.** The decode path's
`.then()` carries no `.catch`, which looks exactly like a hang waiting to
happen — but `peaksFromFile` catches internally and resolves to `null`, so
the rejection never escapes. Driving the real failure was what settled it.
The mutation test then proved the point in the other direction: making that
`.then()` skip `setDecoding(false)` on a null result produces precisely the
hang the code review imagined, and the check catches it — *"the room is
still saying 'decoding' 14s after a file that will never decode"*.

---

## 4 · The check that could not fail

`ui-guard` guards the rule that **the star does not answer to the console**:
mix gestures are bound at the window, so every pointerdown on a control is
also a pointerdown on the field behind it. It reported `ok` for the whole
build and, on three separate attempts, could not be made to fail by breaking
the very guard it tests. A check that cannot fail is not a law, it is a
decoration — and it was being counted in "all N laws hold".

Four faults, each hiding the next:

1. **Geometry, not the guard, was holding the star still.** The star used to
   be offset right to clear the console rail, so no console surface overlapped
   its body and no gesture could start anywhere the check pressed. Deleting
   the rail re-centred the star at `focusFrac 0.5`, directly under the panels
   — which is what finally put the guard on the critical path.
2. **Two thirds of its targets no longer existed.** The selector list still
   named `.rail`, `.cn-hdr`, `.cn-ftr`. Those matched nothing, so the check
   quietly shrank to a handful of surfaces while still reporting success. *A
   selector list is a claim about what was tested, and it rots silently.*
3. **It never dismissed the tour.** `elementFromPoint` at a panel heading
   returned `div.onboard-card`: every "console surface" it pressed was the
   onboarding card, and the guard was never involved at all.
4. **It measured the wrong things, at the wrong moment.** It read the star
   200ms *after* `mouse.up`, by which time a hijacked grab has released and
   `uGrabStr` has decayed to zero. And `uGrabStr` and the aim only move for
   the *mix* gesture — the **axis grab** (the dissect seam down the star's
   centre column) sets neither. A drag on a control at the centre of the
   viewport hijacked the star completely while all three numeric assertions
   read clean.

The fix for (4) is the general lesson: **assert on the state the application
itself sets.** `.app.grabbing` / `.app.mixing` means a gesture started, full
stop — no threshold to tune, no decay to race, and it covers every gesture
including ones added later. Breaking the guard now yields *"dragging
`p.head` started a star gesture"*.

---

## 5 · An allow-list outlives what it allows

`one-fill.mjs` enforces the accent's second form: dark-on-yellow means *this
is the subject*, and there is one subject per group. Its `ALLOWED` map is the
record of which standing fills exist and why — a design decision written down
where it can be enforced.

It listed three. Two of them — `.tuner-chips button.on` ("the chosen vibe")
and `.transport .t-mute.on` ("muted") — named rules that had been deleted
with the console rail. The check went on **passing**, because a fill that
does not exist cannot violate a one-per-group rule. The list read as a
description of the product while being a description of the past.

So `ALLOWED` is now checked against the fills actually found in the
stylesheet, and a stale entry fails the run. The reasoning generalises past
this one file: **a list of exceptions is a claim about the present, and
nothing was checking it.** The same rot had already hollowed out
`ui-guard`'s target list (§4) and `voice`'s source sweep.

**Nothing was lost with those two fills.** The vibe tuner is intact — it was
rehomed from the rail into the sound panel as `.sound-find` (the prompt) plus
`.sound-chips` (suggestions), and those chips are one-shot searches rather
than a persistent selection, so there is no longer a "chosen" state for a
fill to mark. Mute still reads as accent *type* with its label changing
`mute` → `muted`. That was worth confirming rather than assuming, because
PRODUCT.md makes losing a feature a binding failure, and "its CSS is dead"
looks identical to "the feature went with it" until you check.

---

## 6 · Reading a screenshot

The checks render through puppeteer with `--use-angle=swiftshader`, a
software rasteriser. It is right for the checks — deterministic, no GPU
required, runs anywhere — but **it is not what a person sees**, and one of
its artifacts is alarming: large dark squares scattered across the star and
the frame, sometimes twenty at once, appearing after a while and looking
exactly like a NaN propagating through the bloom mip chain.

It is not. The same build in a real GPU browser is clean. Before spending
anything on a rendering defect seen only in a check screenshot, reproduce it
on hardware. The uniforms were probed for non-finite values first (there
were none, and that probe is worth repeating for any *genuine* NaN hunt) —
but the decisive test was simply opening the room in a real browser.

The corollary is the useful half: puppeteer is for *measuring* — geometry,
contrast, computed styles, whether a key moved a value — and a real GPU
browser is for *judging* how it looks.

---

## 7 · A vacuous pass that wasn't

Hunting for a fourth instance of the empty-set failure, I thought I had one.
`readings` checks that tube mode's disabled faders LOOK disabled. Driving the
app by hand, I selected the `tube` source, swept for disabled controls, found
none, and concluded the law had never run -- an assertion over an empty set,
green forever. It was a tidy story and it fit two known precedents.

It was wrong. My probe never pressed `d`, so there were no `.mix-row`
elements on screen at all. I read "no disabled controls" as "tube did not
engage" when the real cause was that I had not opened the tiers. The check
does press `d`. Proven by mutation, both ways: with the original setup and
the disabled styling broken, `readings` fails and names all 18 controls.

Worth recording because of how it felt from the inside. The reasoning was
sound, the precedents were real, and the conclusion followed cleanly from a
measurement -- of my own harness rather than the product. Identical in shape
to the washed-out phone panel that turned out to be a swiftshader artifact
and got a change reverted. **A confident argument built on one unexamined
measurement is the failure mode here, and it does not announce itself** --
it arrives feeling like insight, and the tidier it fits what you already
believe, the less it gets checked.

What survived: the `if (!off.length) return null` guard is now
`{ unreachable }` and reports instead of passing. The law was never dormant,
but nothing would have told us if the setup had drifted -- and that silence
is the thing worth closing, separate from whether it had happened yet.

## 8 · The question that cannot fail

`offscreen` is law 18, and it exists because `layout` was asking a question
with only one possible answer.

The console's surfaces are `position: fixed; left: 0; right: 0`. Such an
element is exactly viewport-wide at every size. Measuring it against the
viewport for overflow is not a weak test -- it is not a test. It returns the
same answer on a correct build and a broken one, and it returned that answer
across every viewport in the suite while three of the four source buttons sat
off the right edge of the screen at 740px wide.

The fix reverses the direction of the measurement: every descendant against
its container's padding box, and against the viewport. Nine rooms, two states
each, controls named when they escape.

Mutation, restoring the breakpoint as it shipped this morning:

```
· stack-high (900x900) · button "tube" sits 54px past the VIEWPORT
  — it cannot be seen or reached. It is a control.
```

The general form is worth keeping in mind when writing any check here:
**ask what the assertion would say about a build that is broken.** If the
answer is "the same thing", the check is decoration no matter how carefully
its logic is reasoned. A fixed full-width parent cannot overflow. A `null`
returned from an empty sweep is not a pass. A viewport that never rendered
the branch under test cannot report on it. All three shipped here, all three
looked green, and the green is what stopped anyone asking.


---

## 9 · A check the constitution does not back

Two checks cannot pass as written, and not because the product is wrong.

`motion` requires every duration to be 0, 180, 420 or 900ms and cites
"DESIGN.md §6". §6 is Anti-patterns. Grepping the constitution for `180`,
`420`, `900`, `--star`, `--light`, `--block` or `--room` returns nothing:
**there is no motion table.** Its prescribed remedy, `var(--ease)`, names a
token that is not defined in the stylesheet either. Its other arm — nothing
eases in — IS grounded, in §5's stepped reveals, and stands on its own.

`type-scale` requires every size, tracking and leading to name one of
`--t-micro`…`--t-hero`, `--track-caps-micro/label/body`, `--track-prose`,
`--track-display`, `--leading-prose/display/hero/none`, `--ink-prose`,
`--ink-rgb`. Every one of those returns zero hits in `src/styles.css`. The
whole of §1's type section is two rows: Archivo Black for the one display
moment, JetBrains Mono at 8–11px, tracking 0.08–0.18em. There is no ramp.
The count went 94 → 116 when casing was fixed, because every tracking
declaration correctly added is another finding on a check that can never
go green.

This is the same fault as `spacing`, which enforced a scale that rejected
four values §1 explicitly grants — and that one was fixable, because the
constitution had an answer and the check had drifted from it. Here the
constitution has no answer. So this is not a stylesheet question and it
must not be fixed by loosening the check until it passes, which would be
the third constitution in this repository.

Two honest paths, and it is the owner's call which:

1. **Author the ramp.** Define the tokens, write the motion table into
   DESIGN.md, migrate 116 declarations and ~20 durations. Roughly a day,
   and afterwards both checks mean something.
2. **Reduce each check to what the document says.** `motion` keeps the
   no-ease arm and loses the table. `type-scale` becomes: two faces, the
   mono tier within 8–11px, tracking within 0.08–0.18em, exactly one
   display moment per view. Roughly half a day, and afterwards both checks
   enforce the constitution as written rather than one nobody agreed to.

Until then they are listed here as unbacked rather than left to read as
product faults. A red that nobody can act on trains people to ignore red,
which is §2.6's whole argument.
