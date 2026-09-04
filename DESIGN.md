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
| display | Archivo Black | ONE moment per view. clamp-scaled, tracking −0.04em, may carry an echo ghost (see §3.8) |
| everything else | JetBrains Mono | 8–11px, uppercase, letter-spacing 0.08–0.18em |

No third face. No italics. Numbers always mono.

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
8. **Echo type** — the display moment may repeat once beneath itself as
   a red outlined ghost (033/933). Standby wordmark only.
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
