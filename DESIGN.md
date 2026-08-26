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
| `--ink` | `#eaeaea` | primary content: values, titles, controls |
| `--ink-dim` | `#9a9db4` (used at 0.35–0.8 alpha) | chrome tier: module labels, decorative data, diagrams, borders — the blueprint-grey of the CHANNEL sheet |
| `--red` | `#e13b2a` | THE accent — the OUTER poster's warm vermillion, not neon. Armed states, the power moment, keylines, grab point |
| `--red-dim` | `rgba(225, 59, 42, 0.5)` | red keylines / frames |
| ground | `#0a0a0a` | never flat: always textured (see §4) |

Rules: functional text never below 0.6 alpha of `--ink` (WCAG floor);
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
- Spacing steps: 4 / 6 / 8 / 10 / 16 / 24.

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
   and restores native cursors, contrast floors per §1.

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

**Phase 1 — the landing page (this pass).** The standby poster is rebuilt
as the language's showcase: module header, unit plate rows, echo
wordmark, leader-line capability list, corner meta, keyline frame, cell
power button, poster-grade texture, vermillion red site-wide (token
swap touches every red in one move).

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
