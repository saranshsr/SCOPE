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
}: {
  text: string
  duration?: number
  className?: string
  /** Controls re-run their decode on pointer enter — the hover interaction. */
  replayOnHover?: boolean
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

  return (
    <span
      className={className}
      onPointerEnter={replayOnHover ? () => setNonce((n) => n + 1) : undefined}
    >
      {shown}
    </span>
  )
}
