/* Shortening a name for display.
 *
 * Five places were doing `s.slice(0, n)`, which cuts mid-word and says
 * nothing about it: the room's most-read line rendered
 * "mike millrain lift me up soulr0090 mike mi" — a title that looks
 * corrupted rather than shortened, on the one string a person actually
 * reads while listening.
 *
 * A cut is honest only if it is visible as a cut. So: break on a word
 * boundary where there is one near the limit, and always mark it. The
 * ellipsis is the character, not three dots, because it is one glyph in
 * the tabular runs these names sit beside.
 */
export function clip(s: string, max: number): string {
  const t = s.trim()
  if (t.length <= max) return t
  // -1 leaves room for the ellipsis itself
  const cut = t.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  // Only honour the space if it is not so far back that the cut loses the
  // name entirely; below 60% of the budget a mid-word cut reads better than
  // one surviving word.
  const body = sp > (max - 1) * 0.6 ? cut.slice(0, sp) : cut
  return body.replace(/[\s,.;:·/-]+$/, '') + '…'
}
