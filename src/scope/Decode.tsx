/**
 * The machine's voice for text — characters lock in left to right out of a
 * scramble, the way a tuner locks onto a carrier. One primitive drives every
 * decode on the page: the announce title, the rail's track name, hover
 * scrambles on controls. Same pool, same lock curve, one language.
 */

import { useEffect, useState } from 'react'

const POOL = ':=+xX#@/<>'

const reduced = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function Decode({
  text,
  duration = 650,
  className,
  replayOnHover = false,
  live = false,
}: {
  text: string
  duration?: number
  className?: string
  /** Controls re-run their decode on pointer enter — the hover interaction. */
  replayOnHover?: boolean
  /** Inside a live region: the scramble is for eyes only, the words are
   *  what a screen reader hears. */
  live?: boolean
}) {
  const [shown, setShown] = useState(text)
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    if (reduced()) {
      setShown(text)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const tick = () => {
      const k = Math.min(1, (performance.now() - t0) / duration)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ' || ch === '·') {
          out += ch
          continue
        }
        // Left-to-right lock: early characters resolve first, the tail
        // scrambles longest — phosphor's lower-third law.
        const lockAt = 0.15 + (i / Math.max(1, text.length)) * 0.7
        out += k >= lockAt ? ch : POOL[(Math.random() * POOL.length) | 0]
      }
      setShown(out)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, duration, nonce])

  // Two faces when live. Inside a live region (the deck name, the stage
  // title) every rAF frame was a text mutation, so a screen reader heard
  // 35-39 strings of `:=+xX#` per track change. The scramble is hidden from
  // it; the words sit beside it, visually hidden, changing once per text.
  // Everywhere else one face AT REST: a control's name is read on focus, not
  // streamed, and its textContent stays the plain word. But not WHILE it
  // scrambles: a control's accessible name is computed from its text, so
  // for the 380-520ms of a hover replay POWER ON was named "=X<:= +/" and
  // a source button something similar -- exactly when a pointer user with
  // a screen reader is landing on it. While the two differ, the scramble is
  // the eyes' face only and the word is the name.
  const scrambling = shown !== text
  return (
    <span
      className={className}
      onPointerEnter={replayOnHover ? () => setNonce((n) => n + 1) : undefined}
    >
      {live || scrambling ? (
        <>
          <span aria-hidden="true">{shown}</span>
          <span className="sr-only">{text}</span>
        </>
      ) : shown}
    </span>
  )
}
