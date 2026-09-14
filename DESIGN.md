# SCOPE — Design Language: **BLACK PLATE**

A design language distilled from a six-piece moodboard (post-punk techno
posters, blueprint-on-black instrument sheets, data-art plates, glitch
waveform studies). This document is the constitution: tokens, primitives,
rules, and the rollout plan. Anything visual shipped in scope conforms to
this file or changes this file first.

---

## 1 · Tokens

### Ink (two tiers + one accent)

| token | value | job |
|---|---|---|
| `--ink` | `#989fb3` (7.49:1) | primary content: values, titles, controls. Field DS `muted` |
| `--ink-dim` | `#7d8499` (5.31:1) | chrome tier: module labels, decorative data, diagrams, borders. Interpolated between Field DS `muted` and `tertiary` — tertiary itself is 3.86:1, and this tier carries every `//LABEL_`, which is functional text |
| `--accent` | `#feee00` (16.45:1) | THE accent — noon's brand yellow. Armed states, the power moment, keylines, grab point |
| `--accent-rgb` | `254, 238, 0` | the same value as a triple, for alpha variants and the survey canvas, which draws with `fillStyle` and cannot say `var()` |
| `--accent-dim` | `rgba(var(--accent-rgb), 0.78)` | accent keylines / frames |
| `--accent-hot` | `#fff44d` | the one brightening, on POWER ON's hover and the rev |
| ground | `#0a0a0a` | never flat: always textured (see §4) |

**Why the inks are dim.** An accent recedes because the text is brighter
than it. Vermillion measured 4.58:1 against an `--ink` of 16.46 — the text
was 3.6× louder, so red read as a mark *on* the sheet. Yellow is 16.45:1,
which is that old `--ink` to two decimal places: at equal weight nothing
receded and the accent argued with the prose. Yellow cannot go up, it is
already near this ground's ceiling, so the inks came down. The accent is now
**2.2× the primary ink** where it was 1.0×.

Both ink values are Field DS tokens, and the sheet was most of the way there
already — the old `--ink-dim` `#9a9db4` sat three values from Field DS
`muted`. The name `--red` went with the colour: it was the last thing still
asserting a palette the product had left.

Rules: functional text never below **4.5:1 against the ground**, measured,
not estimated from alpha. The old wording said "never below 0.6 alpha of
`--ink`", which was a safe proxy only while `--ink` was 16.46:1 — at the
current ink, 0.6 alpha blends to 3.4:1 and fails. State the floor in the
unit the floor is actually in.
decorative chrome may go as dim as it likes. Red is never tinted, never
gradiented, and appears at full strength in at most one zone per view.

### Type

| role | face | treatment |
|---|---|---|
| display | Archivo Black | ONE moment per view. clamp-scaled, `--track-display` |
| everything else | Departure Mono | `--t-micro` 11px, uppercase, tracking by role |

No third face. No italics. Numbers always mono. **No bold** — Departure Mono
ships Regular only, and the browser answers `font-weight: 700` by smearing
the glyph sideways, which is the one thing a face drawn on a pixel grid
cannot survive. Emphasis is the two inks and tracking.

#### The ramp has two steps because the face has two

Departure Mono (Helena Zhang, SIL OFL, in `src/fonts/` with its licence) is
drawn on an **eleven-cell-per-em grid**: `unitsPerEm` is 550 and every
outline coordinate is a multiple of 50. It is therefore pixel-exact only
where `font-size × devicePixelRatio` is a whole multiple of 11 — which on
any display means **11px and 22px**.

| token | value | job |
|---|---|---|
| `--t-micro` | 11px | the entire chrome |
| `--t-read` | 22px | the one larger mono moment |
| — | `clamp()` | the display tier, Archivo, deliberately off this grid |

The sheet previously ran eight sizes from 8 to 20px; **all but three of them
were off this face's grid.** Inventing a `--t-label` at 9px to preserve a
six-step ramp would be a token that lies about what it renders, so the ramp
says two because two is true.

**The consequence is the point, not a cost.** With one size doing the whole
chrome, hierarchy has to come from the two inks and from tracking — which is
what §2 asked for all along, and what a real instrument does: one legend
size, read by colour and position. Six tracking roles now carry what
thirteen ad-hoc values used to:

`--track-caps-body` 1px · `--track-caps-label` 2px ·
`--track-caps-micro` 3px · `--track-cta` 4px (POWER ON alone) ·
`--track-none` 0 · `--track-display` −0.04em (Archivo only)

**Tracking is in whole pixels, and that is not fussiness.** A glyph lands on
the pixel grid only if its ORIGIN does, and the origin is the sum of the
advances before it — so fractional tracking walks every glyph after the first
off the grid even when the size is perfect. Measured on black at DPR 1,
counting antialiased pixels as a fraction of inked ones:

| tracking at 11px | fuzzy |
|---|---|
| 0, 1px, 2px — whole pixels | **0.0%** |
| 0.18em = 1.98px | 59.1% |
| 0.14em = 1.54px | 68.9% |
| 0.10em = 1.10px | 70.2% |
| *(10px, off-grid size, any tracking)* | *95.2%* |

Confirmed on the shipped plate by A/B — same region, same metric, counting
distinct colours, because no absolute threshold can work on a surface that
carries several deliberate ink levels: the header renders **102** distinct
colours as shipped, **165** with `em` tracking, **297** at 10px. Getting the
size right and leaving tracking in `em` recovered barely a third of what the
grid was worth.

`--track-display` stays proportional because Archivo is an outline face that
scales with its clamp and owes this grid nothing.

**One knock-on, and it is the kind that only the eye finds.** §1 names
`--gap-tight` 4px for "icon + label", which separated cleanly while the
footer tracked 0.18em of 8px = 1.44px between letters. In whole pixels that
row now tracks 3px — so a 4px gap and a 4px letter gap are the same gap, and
the noon stamp stopped reading as a mark and started reading as the first
glyph of MADE. It uses `--gap-related` 8px. When tracking changes, every
icon-to-label pair has to be re-looked-at, because proximity is relative.

Leading likewise: `--leading-prose` 1.5 · `--leading-display` 0.95 ·
`--leading-hero` 0.82 · `--leading-none` 1.

`scripts/type-scale.mjs` enforces all three and had been red at ~118 values
since it was written, against a ramp that was specified here and never
built. Re-basing on 11px is what finally built it.

**One thing the ramp broke, and how it was caught.** The noon stamp in the
footer is sized `0.72em`, not `1em`. noon's ring is 15.55% of its box, so
the ring's painted weight *is* the mark's size × 0.1555 — at the old 8px
footer that landed on 1.24px, the plate's hairline, which is the whole
reason the real artwork could be used at chrome scale at all. Moving the
footer to 11px took the ring to 1.71px and quietly broke "hairlines only".
0.72em puts it back at 1.23px and keeps the mark a consequence of the type
tier rather than a free parameter, so Law 2 still holds by geometry.

### Motion

Four durations, and they are derived from what the sheet already did rather
than picked. `scripts/motion.mjs` had cited "§6" for this table since it was
written; §6 is Anti-patterns, and grepping this document for the values
returned nothing. It is here now, so the check enforces the constitution
instead of one nobody agreed to.

| token | value | job |
|---|---|---|
| `--star` | 0 | no transition; the star answers the hand directly |
| `--light` | 140ms | a touch acknowledged — hover, press, a colour moving |
| `--block` | 420ms | a block of the plate changing state — dissect, fades |
| `--room` | 900ms | the room itself |

**140, not 180.** The product hand-authored its hover-and-press motion ten
times across the sheet — 90, 120, 140×5, 150, 180×2 — which is one tier with
drift, median 140, and only two of the ten ever sat on the value the check
used to name. Ten authoring decisions outrank one table entry.

**Nothing eases in.** Every transition uses `--ease`
(`cubic-bezier(0.16, 1, 0.3, 1)`) — full speed out of rest, settling in. The
bare `ease` keyword is `cubic-bezier(0.25, 0.1, 0.25, 1)`, which accelerates
from rest, and it had crept into six declarations.

**Two things this table does not govern, and must not.**

*Idle texture.* Only finite motion answers a user. Infinite animations are
the room breathing and belong to §7's shared period, which
`scripts/room-period.mjs` enforces — it says so itself: "Only INFINITE
animations are idle motion. A one-shot transition is a response to the user
and is governed by the motion table, not by this law." Both laws used to
claim them and then disagree: room-period records `.grain @ 0.45s` as a
material exception while motion demanded 420ms, and it read the 6.2s carrier
and the 11s idle scan as UI transitions 5.8× and 11× too slow.

*The flight.* POWER ON is the one earned exception. Its rev runs the carrier,
leads, pills, figure and wordmark at 460 / 420 / 380 / 400 / 300ms, and those
five are not values that drifted — they are **deliberately out of step**, so
the machine reads as several systems straining rather than one animation
playing. Snapping them to a single `--block` would delete the effect, and the
check would have called it a fix.

### Space & line

- Hairlines only: 1px. Borders share edges (gapless cell grids), never
  double up.
- Corner radius: 0 everywhere, forever.
- Spacing steps: **4 / 6 / 8 / 10 / 12 / 16 / 24**. 12 was added after a
  measured audit found it was already the product's most-repeated value —
  17 components on both surfaces share a 12px horizontal cell gutter. The
  spec was describing an intention the code had outgrown.
- **One row height.** Every full-width row cell is `8px 12px`: 8 vertical
  so the rail scans on a single rhythm, 12 horizontal so every cell in a
  column shares one gutter. Row primitives previously used 6/7/8/9/10 for
  the same role, and the console ran two gutters — cells authored under
  `.cn-` used 12px while cells inherited from the pre-plate rail were
  never migrated and sat 4px inboard.
- **Three gap steps, named for the relationship, not the size:**
  `--gap-tight: 4px` (parts of one unit — meter cells, icon + label),
  `--gap-related: 8px` (siblings in a group), `--gap-sep: 12px` (distinct
  groups). Sibling spacing previously took 12 different values for what
  was visually the same relationship.
- Deliberate exceptions, documented rather than swept: the figure inset
  (16), the wordmark cell (12 vertical), the dial cells (10/6 — square
  cells, not rows), and POWER ON's 34px horizontal, which is optical
  compensation for its letter-spacing.

---

## 2 · Laws

1. **Cells, not floats.** Information lives inside stroked boxes that
   share borders. A view is one continuous instrument panel, not stacked
   cards. (TRENDS poster.)
2. **One display moment.** Exactly one huge type event per view; all
   other type whispers. Contrast between shout and whisper IS the look.
3. **Texture never lies.** Dot matrices, morse rows, tick scales,
   barcodes are pattern — they never render a number, a percentage, or
   anything that could be mistaken for a live reading. Real values get
   real labels; fiction lives only on the standby poster.
4. **Two inks.** Content bright, chrome dim. Hierarchy of ink before
   hierarchy of size.
5. **Instrument furniture, not widgets.** States are pill tags `(IDLE)`,
   quantities are block meters `■■■■□□` or dial faces, connections are
   leader lines with dot terminals. Default-looking HTML controls are a
   defect.
6. **The ground is matter.** Poster-grade grain + scanline residue.
   Images and waveform strips get dither/glitch treatment (moodboard
   piece 6), never smooth gradients.
7. **Accessibility floors are law.** ≥44px touch targets, `:focus-visible`
   outlines, `aria-pressed` on toggles, reduced-motion strips animation
   and restores native cursors, contrast floors per §1. Filled accent cells
   carry GROUND type `#0a0a0a`, never ink: ground on `--accent` measures
   16.04:1, while `--ink` on it is 1.00:1 and invisible. (The rule this
   replaces said ink on vermillion measured 4.6:1 and passed. Measured, it
   is 3.59:1 and fails AA at body size — the build had always used ground,
   so the button was right and the sentence describing it was wrong.)
8. **A plate is FULL or it is not a plate.** Density ≥60% of the canvas
   carrying composed content. The references measure 31% lit *pixels*;
   round 1 shipped ~4% and read as decoration around emptiness. Sparse
   is not minimal here, it is unfinished.
9. **One vocabulary per sheet.** Everything is the same primitive: a
   bordered cell sharing edges with its neighbours. A floating diagram, a
   centered figure, boxes-and-arrows, or vertical type inside a page of
   horizontal rows reads as foreign even when its content is correct.
   Say new things in the vocabulary already on the page — a sequence is
   expressed as indexed rows whose shared gutter border IS the spine, not
   as a flowchart. Standby hides the console's rulers, survey grid and
   crosshair for the same reason.

---

## 3 · Primitives (the component vocabulary)

1. **Module header** — `[SCOPE-01] · LABEL` : bracket ID in dim ink +
   name. Every major section carries one. Codes are identity, never data.
2. **Plate row** — `//LABEL_` left, value right, hairline-boxed, rows
   share borders. The TRENDS table. For key/value data everywhere.
3. **Pill tag** — `(LIVE)` `(IDLE)` `(MUTED)`: 1px stroke, full-round
   ends are the ONLY curvature exception… **no** — corners stay square;
   pills are rendered as `( TEXT )` with literal parens, keeping law 0-radius.
4. **Block meter** — `■■■■□□□□` filled/hollow squares for levels.
5. **Dial face** — circle + needle line at the value's angle, value
   printed beside. For the visuals knobs (rollout phase 2).
6. **Leader line** — `label ●————` hairline with dot terminal connecting
   a label to its subject. (OUTER's consciousness list.)
7. **Morse divider** — a row of dots/dashes of varying width as section
   separator. Pattern only.
8. **Echo type** — RETIRED. The display moment used to repeat once beneath
   itself as an outlined ghost, clipped to its lower half. It read as a
   shadow while the accent was a dim vermillion; against `--accent` it
   stopped being a shadow and became a second word, argued with the first,
   and made the one display moment look like two. Law 2 is about how many
   things shout, and an outline at 16:1 shouts. Removed rather than
   re-tinted: the wordmark does not need help.
9. **Corner meta** — `/ label — value` slash-prefixed annotations pinned
   to view corners. Honest values only (particle count, source, unit).
10. **Keyline frame** — a dim red inset rectangle framing a hero zone
    (OUTER's photo frame). At most one per view.
11. **Glitch strip** — waveforms drawn as layered vertical-hairline
    texture with dither falloff (piece 6), replacing clean amplitude bars.

---

## 4 · Texture stack

Fixed, pointer-events-none, in order: grain (SVG fractal noise, opacity
~0.09, stepped animation) → scanlines (2px repeating, ~0.1) → vignette
(subtle radial darkening at edges). Never on scrolling containers.

---

## 5 · Rollout plan

**Phase 1 — the landing page. SHIPPED (round 2).** The whole viewport is
one instrument sheet: running header, image cell, texture strip, leader
rows, wordmark band with the filled power cell, a dense data column
(plate rows, dial faces at real knob values, drawn peak scale, the audio
graph as indexed rows), running footer. The image cell is a HOLE — the
live star is dollied into it by `scene.setFocus(x, y, dolly)` measured
from the cell's own rect, so it frames the real instrument rather than a
picture of one, and glides back out to full size on power-on.

**Law 11 — primitives are not composition.** The console's first port
swapped every token, cell, dial and meter onto the language and still read
as a different product, because the *arrangement* was untouched: sections
floated with 44px seams, there were no module headers, no running header
or footer, and no plate. Getting the vocabulary right while leaving the
composition alone is the same failure as decorating a sparse layout — it
just hides better. A sheet is judged by its seams: **every section shares
an edge with its neighbour, or it is not a sheet.** Measure the gaps; they
should total zero.

**Idle life (law 10 in practice).** A machine on standby is not a
screenshot, but it is also not a screensaver. Only chrome that represents
SIGNAL breathes — the morse carrier, leader terminals, armed pills, the
image-cell keyline, a slow self-check scan — all on ONE shared 5.4s
period, staggered so the sheet reads as a single organism. Type and data
hold still: animating a value implies it changed. The star breathes on
that same 5.4s period, fed in under a `max()` so real audio takes over
without a switch. Powering on collapses every period to ~0.4s and
multiplies the star's breath 2.6x: that contrast IS the wake-up.

**Controls beat diagrams.** The turb/expo/spin dials on the landing page
are turnable (drag, arrows, Home/double-click to reset) and drive the
real tuning state. A drawn control that cannot be operated is decoration
wearing a control's clothes — the same failure as the floating diagram.

**The power-on flight.** POWER ON is the sheet's only control and the only
way in — a stray click anywhere else must never start the instrument. It
runs three beats over ~2.2s: REV (spin ramps, a scan line runs the data
column, every pill arms), DIVE (the camera accelerates through the
particle shell while the sheet rushes past), then arrival, where the
console fades up and the star eases back to full size. Any input skips
it; reduced-motion never sees it. The standby strip reads the star's real
motion, which is why it is labelled MOTION and not SPECTRA: before the
click there is no audio, and a strip that implied otherwise would be
texture pretending to be a reading (law 3).

Round 1 failed and is worth remembering: it decorated the existing sparse
layout instead of recomposing it (laws 8 and 9 were written from that
failure). A later pass added a real signal-flow diagram that was correct
but drawn as a floating flowchart — right content, foreign vocabulary —
and had to be re-said as rows.

**Phase 2 — the console (on the user's go).** Mapping already decided:

| console block | primitive |
|---|---|
| rail sections | one gapless cell grid with module headers (01·DECK, 02·FEED, 03·LAYERS, 04·VISUALS) |
| now-playing meta | plate rows (`//BPM_`, `//KEY_`, `//GENRE_`, `//ARTIST_`) |
| transport states | pill tags `(PLAYING)` `(MUTED)` on the buttons |
| layer meters | block meters replacing thin bars |
| visuals knobs | dial faces with needle + slider input beneath |
| spectrum panel | Dataism plate: dotted vertical grid, dot terminals, corner meta |
| scrubber + waveform | glitch strip treatment |
| contextual chips | pill tags in red |
| tour cards | plate-row layout with leader line to anchor (already close) |

**Phase 3 — motion pass.** Decode scrambles stay; add stepped (non-eased)
reveals for cell grids: cells stroke-in row by row, 40ms steps.

---

## 6 · Anti-patterns (instant reject)

Rounded corners · gradients on ink or red · a second accent color ·
smooth drop shadows · fake live values in texture · more than one display
moment · default browser control styling · em-dashes in user-visible copy
(house rule) · neon `#ff2a2a` (retired in favor of vermillion).
