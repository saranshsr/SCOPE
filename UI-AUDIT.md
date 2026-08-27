# UI Audit — impeccable `audit`

Two code-level passes plus a rendered state pass at desktop and mobile.
Every headline number below was **re-verified independently** before being
reported; false positives are called out at the end.

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | **2**/4 | `Space` on any focused button toggles playback instead of activating it |
| 2 | Performance | **2**/4 | WebGL drawing buffer resized every frame during zoom and the whole boot dive |
| 3 | Theming | **2**/4 | 52 colour literals duplicate existing tokens; a second red and a third ink tier exist undeclared |
| 4 | Responsive | **3**/4 | Solid — but `ctrl`+wheel page zoom is cancelled across the stage |
| 5 | Implementation Integrity | **3**/4 | Detector clean, one coherent language across both surfaces; module numbering has a hole |
| **Total** | | **12/20** | **Acceptable — significant work needed** |

## Implementation Integrity verdict: **PASS**

The implementation expresses a coherent, product-specific system. The
detector is clean on source. Landing and console share literal CSS
(`.pl-hdr`, `.pl-row`, `.pl-ftr`, the `Dial` component), one line token
carries 79 uses, and law 3 holds everywhere — **no texture anywhere
pretends to be a value**. The failures below are defects inside a real
system, not evidence of an assembled one.

---

## P0 — blocking

**P0-1 · `Space` is stolen from every focused button.**
`App.tsx:1147-1149` guards `INPUT` and `[role="slider"]` but not `BUTTON`;
`case 'Space'` then calls `e.preventDefault()` (`:1164`), which suppresses
the button's own activation. Verified in the browser: with MUTE focused, a
real Space press did **not** activate it. Affects MUTE, SKIP, SPLIT,
RADIO/FILE/MIC, GO, layer s/m, presets, diag, `?`, and the tour's NEXT.
Enter still works, so it is not total. *WCAG 2.1.1 (A), 3.2.2 (A).*
Fix: widen the guard to `input, textarea, select, button, a[href], [role="slider"]`.

**P0-2 · The onboarding tour is unreachable by keyboard.**
Focus is never moved into it; it mounts last in the DOM so NEXT is ~42 tabs
away; Space on NEXT hits P0-1; 24 controls behind it stay focusable (no
trap, no `aria-modal`). Verified in the browser. `role="dialog"`, the
label, Escape and focus-restore are all correct — only entry is missing.
*WCAG 2.4.3 (A).* The tour is the only place the star gestures are taught.

**P0-3 · Filter and echo have no non-pointer path.**
Both exist only as star drags. Every other gesture has a visible twin —
EQ has the layer rows, dissect has `d`, zoom has `+/-/0`, solo/mute have
the s/m buttons. These two were never given one. Compounding: the whole
gesture body is gated behind `if (!reducedMotion)` (`App.tsx:500`), so a
reduced-motion user has no access to filter or echo **at all**.
*WCAG 2.1.1 (A), 2.5.1 (A).* **You chose: add keyboard equivalents.**

**P0-4 · The WebGL drawing buffer is resized every frame.**
`scene.ts:1011` (`setFocus` → `resize`) and `:1148` (zoom glide) call
`renderer.setSize()` unconditionally; three's `setSize` reassigns
`canvas.width/height`, which **resets and clears the drawing buffer**, and
`UnrealBloomPass.setSize` allocates 5 `Vector2`s. Both hot paths are the
moments the product shows off: the entire 1000ms boot dive, and every
wheel zoom. The self-profiler then reads the resulting stutter as slow
hardware and sheds half the particles.
Fix: guard `resize()` on actual dimension change; let the hot paths reach
`placeCamera()` only.

## P1 — major

**Contrast, verified by my own computation (composited on `#0a0a0a`):**

| Token | Ratio | Needs | Where |
|---|---|---|---|
| `--pl-line` | **2.37:1** | 3.0 | the border of *every* control in the app — 79 uses |
| `--red-dim` | **1.90:1** | 3.0 | `.chip`, `.pl-fig` |
| ink @ .30 | **2.35:1** | 4.5 | the whole key legend; the vibe field's placeholder |
| `--dim` @ .45 | **3.93:1** | 4.5 | inactive RADIO/FILE/MIC, presets, spectrum axis |

Raising the line to ~0.68 alpha reaches 3.05:1; flooring text alpha at
0.55 reaches 5.38:1. *WCAG 1.4.11, 1.4.3 (AA).*

**Structure.** No `<main>` anywhere — the console's primary interface is
`<aside>`, i.e. announced as tangential. The console has **zero headings**
once the plate unmounts (verified). `.cn-mod` module headers are `<div>`s.
`<nav>` wraps a source switch that is not navigation. *WCAG 1.3.1 (A).*

**Names and state.** `?`, `s`, `m` have single-character accessible names;
`s`/`m` repeat up to 12× with no ring identity. Only MUTE exposes
`aria-pressed` — sources, solo/mute, presets and chips expose state
visually only. *WCAG 4.1.2 (A).*

**Status messages.** Nothing is announced: track change, the vibe result,
split progress, decoding, mic-permission failure. Verified: the vibe
states read well as copy but no live region carries them.
*WCAG 4.1.3 (AA).* **You chose: announce the status messages.**

**Zoom blocked.** `onWheel` calls `preventDefault()` unconditionally
(`App.tsx:1213`), cancelling `ctrl`+wheel page zoom across the stage, and
`touch-action: none` on `.app` kills pinch. `index.html` is clean — this is
entirely JS/CSS. *WCAG 1.4.4 (AA).*

**Performance.** Standby forces a synchronous layout every frame, forever:
`idle-scan` animates `top` on an infinite loop while `drawMotionStrip`
reads `clientWidth` per rAF. `drawSurvey` allocates ~670 objects/frame
while dissected. `drawMotionStrip` does ~600 string allocations/frame.
The chrome tick calls `setLayerUi(rows)` with a fresh array every 160ms,
re-rendering the whole tree at 6.25Hz whenever dissected or in stems mode.
`estimateTempo` runs at 60Hz to feed a 6Hz consumer. A 27.8MB ONNX `.wasm`
ships in `dist/` that can never be fetched (the worker points at a CDN).

**Theming.** 52 literals duplicate tokens (`#eaeaea`×20, `#0a0a0a`×18,
`#e13b2a`×14). `#f04a37` is a **second red** on the POWER ON hover — the
one thing DESIGN.md §6 calls an instant reject. `--dim` is an undeclared
**third ink tier**, neutral grey where `--ink-dim` is blue-grey, so the
console's chrome is a different hue to the landing's. `color-scheme` is
undeclared, so the mobile standby scroller renders a light-mode scrollbar
on a black sheet.

## P2 / P3 — selected

- The signal-chain rows explain themselves on **hover only** — no focus,
  no touch; the empty copy is literally "hover a stage".
- `Decode` rewrites accessible names ~60×/sec with scramble characters.
- Ambient mode (`h`) hides the rail with `opacity: 0`, leaving ~42
  invisible focusable controls and no visible way back.
- Bare single-key shortcuts, always on: `m` requests the microphone, `f`
  opens a file picker, `h` blanks the UI. *WCAG 2.1.4 (A).*
- Range inputs announce raw numbers (`0.8`, `1.05`) with no `aria-valuetext`.
- Seek fires on pointer-**down** with no abort. *WCAG 2.5.2 (A).*
- `--faint` is declared and used **0 times**, while its exact value is
  written longhand elsewhere in three formatting variants.
- `--rail-w` is commented "one source of truth" and duplicated in 4 more
  places, two of which don't reference the constant defined above them.

## Mine, from this session

- **`.app.dragging` is never added.** I gated the crosshair on it during
  the console rebuild, so `.x-v`/`.x-h` are permanently invisible. The
  real classes are `grabbing` / `mixing`.
- **`rgba(234,234,239)`** in the motion strip — a blue-tinted white unique
  to that one canvas; every other canvas ink is `234,234,234`.
- **Module numbering reads 01, 02, 04, 05.** 03 · LAYERS only mounts when
  dissected. **You chose: always show 03, empty until dissected.**

## False positives — checked, not real

- A 1.0:1 contrast reading on the active RADIO button: my first probe
  measured against the panel ground instead of its own fill. Real:
  **16.46:1**.
- A recurring 56px rail seam: the 0.45s `.railfold` transition caught
  mid-flight. Settles to **0** at both breakpoints.
- "Pause doesn't pause" and "keyboard dissect is broken": both were the
  preview pane throttling `rAF` while not painting. Both work.

## Done well

`prefers-reduced-motion` is handled in 7 blocks and **state survives every
one** — no blanket `animation: none` stranding elements at `opacity: 0`.
The boot flight short-circuits correctly and is interruptible. All 14
`aria-hidden` uses are genuinely decorative. The `Dial` is a properly
built `role="slider"` widget reused across both surfaces. The touch floor
is disciplined work with a documented cascade-order reason and a coarse
tier. `Analyser.update` is completely allocation-free. The ejecta system
is a preallocated ring pool. Zero `backdrop-filter`, zero `blur`, zero
gradients on ink; the only two box-shadows are 0-blur hairline rings.
Exactly one `will-change`, on the one element that transforms every frame.
`tabular-nums` on every live numeral, no misses. Dark-only is honestly
implemented with no dead light-mode branches.

## Recommended actions, in order

1. **P0** `/impeccable harden` — the four P0s: key-handler guard, tour
   focus, filter/echo keyboard path, and the per-frame `resize()`.
2. **P1** `/impeccable colorize` — raise `--pl-line` to ~0.68 and floor
   text alpha at 0.55; retire the second red and the third ink tier.
3. **P1** `/impeccable harden` — landmarks, headings, names, `aria-pressed`,
   status messages, `ctrl`+wheel zoom.
4. **P1** `/impeccable optimize` — the standby layout thrash, `drawSurvey`
   and `drawMotionStrip` allocations, the 6.25Hz whole-tree re-render,
   `estimateTempo`, and the 27.8MB dead `.wasm`.
5. **P2** `/impeccable polish` — spacing scale, dead selectors and tokens,
   `color-scheme`, `--rail-w` deduplication.

## The spacing question, answered with numbers

Compliance with the declared 4/6/8/10/16/24 scale is **54%** overall —
landing 50%, console 57%. But the two surfaces are off-scale for different
reasons:

- The landing's misses are **one decision repeated**: 13 of its 23 are
  `12px`, and all 13 are the horizontal half of a cell's padding. The
  plate is built on a 12px gutter. That is an unwritten token, not drift.
- The console's are **genuine drift**: 39 values across 11 magnitudes,
  including 25 in the 2–22px range following no rule — five sibling
  micro-gaps using 2, 3, 5, 7 and 3px respectively.

**Recommendation: amend §1 to 2/4/6/8/10/12/14/16/24, then sweep only the
console's odd cluster.** Adding 12 and 14 ratifies decisions that are
already systematic and moves the landing to 83% / console to 73% with no
visual change; sweeping the console's odd values (3→4, 5→4/6, 7→6/8,
9→8/10, 15→16, 18→16, 22→24) takes it to ~95%, all sub-2px movement.
