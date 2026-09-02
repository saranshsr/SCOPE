/** The instrument face, for canvas.
 *
 *  Canvas `ctx.font` takes a CSS font shorthand but does NOT resolve custom
 *  properties, so every canvas overlay has to name the family literally. That
 *  is how the readings drifted onto JetBrains Mono and a bare `ui-monospace`
 *  while the stylesheet had already moved to Chivo Mono: nothing errors, the
 *  numbers just quietly stop being in the product's typeface.
 *
 *  Reading the token instead of restating it means the canvas cannot drift
 *  from the sheet again. Resolved lazily — at module scope the stylesheet may
 *  not have applied yet — and cached, since it is hit on every chrome tick. */
let cached = ''

export function instrumentFace(): string {
  if (cached) return cached
  const v = typeof document === 'undefined' ? ''
    : getComputedStyle(document.documentElement).getPropertyValue('--font-instrument').trim()
  // Only cache a real answer: an empty read means the sheet has not landed,
  // and caching that would pin the canvas to the fallback for the session.
  if (v) cached = v
  return v || 'ui-monospace, Menlo, "SF Mono", monospace'
}

/** `weight px` in the instrument face — the shorthand every overlay wants. */
export const face = (px: number, weight = ''): string =>
  `${weight ? weight + ' ' : ''}${px}px ${instrumentFace()}`
