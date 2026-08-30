/**
 * The one place the runtime reads the theme.
 *
 * CSS gets tokens for free; canvas does not. The star's survey, the
 * waveform, the meters and the instrument all build `rgba()` strings while
 * drawing, so they need the palette as CHANNELS — numbers — rather than as
 * a resolved colour. Without this they are the one part of scope a theme
 * cannot reach, however well the stylesheet is tokenised.
 *
 * Resolved lazily and cached: one getComputedStyle for the life of the
 * page, never before the sheet has been applied, and never in a draw loop.
 * Fallbacks are the literals these replaced, so a missing token degrades to
 * today's colours rather than to black.
 */
let cache: { ink: string; accent: string; grain: string } | null = null

function channels() {
  if (cache) return cache
  const cs = getComputedStyle(document.documentElement)
  const pick = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim() || fallback
  cache = {
    ink: pick('--ink-rgb', '234, 234, 234'),
    accent: pick('--accent-rgb', '254, 238, 0'),
    grain: pick('--grain-rgb', '234, 234, 239'),
  }
  return cache
}

/** Functional ink — follows the theme. */
export const INK = (al: number | string) => `rgba(${channels().ink},${al})`
/** The accent — follows the theme. */
export const ACCENT = (al: number | string) => `rgba(${channels().accent},${al})`
/** Grain and scanlines: a hair bluer than ink, declared separately. */
export const GRAIN = (al: number | string) => `rgba(${channels().grain},${al})`

/**
 * Blown-out highlight, deliberately NOT ink. The instrument's core and boil
 * read as overexposure rather than as palette, the same way the shader's
 * additive luminance does. Named so a future theme can see that leaving
 * them white is a decision, not an overlooked literal.
 */
export const HOT = (al: number | string) => `rgba(255,255,255,${al})`
export const EMBER = (al: number | string) => `rgba(240,240,240,${al})`
