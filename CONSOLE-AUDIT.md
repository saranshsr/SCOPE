# Console UI Audit

Two passes: a **rendered** pass (computed styles read off the live DOM) and a
**source** pass (every console rule in `styles.css` / `App.tsx`). Where they
disagree, both numbers are given — the rendered pass sees one moment, the
source pass sees every state.

---

## The one-line finding

**Powering on changes design language.** The landing speaks BLACK PLATE: one
hairline token, gapless bordered cells, drawn instrument furniture. The
console is not a drifted version of that — it is the **pre-language build**,
with the plate's tokens declared above it and never applied. `var(--pl-line)`
appears 24 times in the stylesheet and **zero times in the console**.

---

## BLOCKERS

### B1 · A second accent colour: green — FIXED
`.frame-dash` painted `rgba(120, 220, 120, 0.5)`. §6 lists a second accent as
an instant reject. The comment above it claimed it was "the reference's one
off-white touch" — the comment had drifted from the code. Retinted to the
chrome token.

### B2 · The console never received the line token
13 distinct hairline values in source (10 co-visible when rendered), all on
base `rgba(234,234,234,α)` with α ∈ {.1 .12 .14 .16 .18 .2 .25 .3 .35 .4 .5
.55} plus solid `#eaeaea`. The plate's token is `rgba(141,144,168,.5)` — a
*different hue family*. Hairlines are ~90% of the visible structure here, so
the plate reads blueprint and the console reads wireframe. The declared
`--faint` token is used zero times while 13 ad-hoc greys are inlined.

### B3 · Sixteen floating layers instead of one panel
`stage survey gridlayer ruler-x ruler-y hazard reticle x-v x-h frame
titleblock rail announce spec scanlines grain` — all absolutely positioned
directly on `.app`. Law 1: *"Cells, not floats… not stacked cards."*
`.titleblock` and `.spec` are worst: they carry real content while hovering
over the star. `.announce` is pure magic numbers
(`left: calc(272px + 40px)`). `.frame` is a centered 78vmin figure — the
exact law-9 anti-pattern the landing's diagram was rejected for.

### B4 · The same three knobs have two different UIs
`turbulence / exposure / spin` are **drawn dial faces** on the landing and
**`<input type=range>`** in the console. One product, one parameter set, two
vocabularies. Five ranges still render at the browser default **13.3333px** —
their font size was never brought into the type system. The correct
component already ships and is drag/arrow/double-click operable.

### B5 · Borders double up instead of sharing edges
`.layers` (gap 5px), `.stemstrip` (6px), `.transport` (6px), `.tuner-chips`
(4px) all pair a gap with a full 1px box, so adjacent cells show **two**
hairlines with a gutter between. §1 forbids exactly this. The right pattern
is already in-repo: `.rail-src` and `.presets` use `gap: 1px` over a
background — a genuine shared-edge grid.

### B6 · The 44px touch floor is met by 1 of ~10 controls
Passing: `.t-btn` (44px). Failing: range tracks (12px), range thumbs
(**8×8px**), `.layer-btn` (~18px), `.diag-toggle` (~11px), `.tuner-chips`
(~18px), `.rail-help` (22px), `.deck-split` (~24px), `.presets` (~26px),
`.tuner-find button` (~26px). The `pointer: coarse` block grows only
`.rail-src` and `.power`. Law 7 states this as law.

---

## MAJOR

- **White type on filled red, ×3 — FIXED.** `.layer-btn-m.on`,
  `.t-mute.on`, `.onboard-next:hover`. Law 7 is explicit: white on `--red`
  is 4.3:1 and fails AA; ink is 4.6:1. Changed to `#0a0a0a`, matching the
  landing's POWER ON which documents the same maths.
- **Four display-face items, ≥3 co-visible.** `.rail-word` 22px,
  `.rail-foot .deck-name` 15px, `.announce-title` up to 83px,
  `.onboard-card h2` 20px. Law 2 allows one. The mono tier (8/9/10/11px,
  35 declarations) is fully compliant — only the display items need cutting.
- **Red is not a token and is not held to one zone.** `#e13b2a` hardcoded on
  15 lines, `rgba(225,59,42,…)` on 7 more. Up to **9 red zones can be lit at
  once** against §1's "at most one zone per view". `.hazard` is red at 0.38
  opacity carrying no signal at all.
- **Gradients on ink.** `.gl-v` / `.gl-h` animate a 3-stop gradient over
  `background-size: 100% 320%`. §6 forbids gradients on ink. The
  reduced-motion fallback already proves the flat version works.
- **Thin bars where the language specifies block meters.** `.layer-meter`
  (2px), `.level-track` (6px), `.stem-bar` (5px). DESIGN.md §5 named this
  conversion explicitly and it was never done.
- **Animations that represent no signal, on four disagreeing periods.**
  `gl-flow-v` 5.5s, `gl-flow-h` 6.5s, `announce-cycle` 4.8s (it animates
  *display type*), `onb-ping` 1.5s. The console has **zero** animations on
  the landing's shared 5.4s breath — and 5.5/6.5/4.8 read as drift, not
  intent.
- **Pills are not pills.** `.chip` renders bare text in a red box; §3.3
  requires literal `( TEXT )` parens. Transport states are plain labels, not
  `( PLAYING )` / `( MUTED )`.

---

## MINOR

- **Cascade stagger stuttered — FIXED.** `.rail-src` and `.tuner` both
  carried `--i: 2`, so two sections animated on the same beat. Renumbered.
- `border-radius: 50%` on `.src-dot` — §1 says radius 0 everywhere, forever.
- **~150 lines of dead console CSS**, several modelling the *old* vocabulary:
  `.macro*`, `.ctl-row*`, `.readout*`, `.stemstrip*`, `.statgrid`, `.x-tag*`.
  This is partly *why* the console looks contradictory — some of those 13
  hairline values belong to elements that no longer render.
- `▾ / ▸` disclosure glyphs are a fifth glyph system; the vocabulary is
  brackets, slashes, parens and morse.
- **Spacing is loose language-wide, not just here.** The console uses
  2/3/5/7/9/14/15/18/22px off the 4/6/8/10/16/24 step — but so does the
  landing (12/14/20/34px). Either the step tightens or §1 is amended to the
  de-facto scale. Flagging so the call is explicit rather than silent.

---

## The makeover — `public/console-mockup.html`

| | console now | mockup |
|---|---|---|
| structural hairline colours | 13 | **1 token** |
| type sizes | 7 (incl. UA 13.33px) | **4, no UA defaults** |
| display moments | 4 | **1** |
| border radii | 1 | **0** |
| content islands | 4 floating | **0** |

- **The rail becomes one continuous plate** — module headers `01 NOW PLAYING
  / 02 FEED / 03 VISUALS / 04 SPECTRUM`, every row sharing edges.
- **Track meta becomes plate rows** — `//TRACK_ //BPM_ //KEY_ //ARTIST_`,
  exactly as §5 phase 2 already specified.
- **Transport becomes gapless cells.**
- **The dials become the landing's dial faces** — highest-value consistency
  win, and the component is already built, tested and shipping.
- **Level becomes a block meter** `■■■■■□□□`, matching `//DENSITY_`.
- **Spectrum docks into the grid**; `SRC / RATE` moves into the running
  header. Four floating islands become zero.
- **The display moment moves to the stage** — the title sits over the star,
  so the rail whispers and there is only ever one shout.

## Keep — already correct

`.rail-src` / `.presets` gap-1px grids (right geometry, wrong tint) ·
`.t-btn`'s 44px floor · the entire 8–11px mono tier · `.chip`'s
show-only-when-armed behaviour · **law 3 discipline throughout — every
console number is a real reading with a real label; no texture anywhere
pretends to be a value** · the reticle's zero-blur keylines and
single-cursor policy · the grain/scanline stack · `.app:not(.live)` chrome
suppression · full reduced-motion coverage · no vertical type anywhere.
