/**
 * The quality governor.
 *
 * One job: watch real frame time and decide whether the scene can afford
 * its full particle count and its retina buffer. It lives in its own file
 * for one reason — a control loop that cannot be run without a browser, a
 * GPU and five minutes of patience is a control loop nobody will ever
 * test, and this one shipped broken twice for exactly that reason.
 *
 * ── fault 1: a threshold below the floor ──────────────────────────────
 * The bars were absolute: drop above 24ms, restore below 14ms. But rAF is
 * vsync-bound, so on a 60Hz panel `dt` cannot fall below 16.7ms however
 * fast the render is. 14ms was BELOW THE FLOOR OF THE COMMONEST DISPLAY IN
 * THE WORLD, which made the restore branch dead code there: one transient
 * dip halved the particles and the resolution for the rest of the session
 * and nothing brought them back.
 *
 * The rule: a threshold written in milliseconds is a different threshold on
 * every display. Learn the panel's own period and express both bars against
 * it. The old absolute values stay as FLOORS, so nothing moves on hardware
 * where they already worked.
 *
 * ── fault 2: a controller that strobes ────────────────────────────────
 * Reachable bars are not enough. The two settings STRADDLE the band —
 * reduced quality is roughly a quarter of the fill — so on a machine that
 * genuinely cannot hold full quality, the loop drops, sees a fast frame,
 * restores, sees a slow frame, drops again, every five seconds, forever.
 * Each flip reallocates the composer's render targets. That is not a
 * governor, it is a strobe, and it is what "it hangs every few seconds"
 * feels like from the outside.
 *
 * The fix is asymmetry. Dropping is cheap to get wrong and is allowed
 * quickly. RESTORING is what costs, so each failed attempt doubles the wait
 * before the next one. A machine that was briefly busy recovers in seconds;
 * a machine that simply cannot do it settles down and stops asking.
 *
 * scripts/governor.mjs runs this closed-loop against 60, 120 and 144Hz
 * panels and against fast, marginal and slow machines. It is a few
 * milliseconds and needs no browser.
 */

/** Below full quality the scene sheds particles AND drops to a non-retina
 *  buffer, which is roughly a quarter of the fill. */
export const LOW = 0.55

/** First wait before retrying full quality, and the ceiling the doubling
 *  climbs to. Five minutes is long enough that a machine which simply
 *  cannot do it stops being interrupted, and short enough that closing a
 *  heavy tab is still rewarded within one listen. */
const BACKOFF_MIN = 12
const BACKOFF_MAX = 300
/** A restore that survives less than this was a mistake, and the next
 *  attempt has to earn a longer wait. */
const REGRET_S = 30

export class Governor {
  /** Slow mean of real frame time. Seeded at 60Hz so a cold start does not
   *  read as a fast machine. */
  ema = 0.016
  /** The display's own frame interval, learned rather than assumed. */
  period = 0.0167
  /** Seconds before another decision is allowed. */
  cool = 3
  /** Current quality: 1 or LOW. */
  q = 1
  /** Seconds to wait before the next attempt at full quality. */
  backoff = BACKOFF_MIN

  private t = 0
  private lastRestore = -1e4

  /**
   * Feed one frame. Returns the new quality when it changed, else null —
   * so the caller reallocates the composer's render targets only on a real
   * transition.
   */
  update(dt: number): number | null {
    this.t += dt

    // Track the fastest sustained frame: snap down, creep up. One freak-fast
    // frame (a skipped vsync) must not convince us the panel is quicker than
    // it is, and a slow patch must not convince us it is slower forever.
    if (dt > 0.004) this.period += (dt - this.period) * (dt < this.period ? 0.25 : 0.0006)
    this.period = Math.max(0.006, Math.min(0.021, this.period))

    this.ema += (dt - this.ema) * 0.02
    this.cool -= dt
    if (this.cool > 0) return null

    if (this.ema > this.dropAt && this.q > LOW) {
      // Did we only just restore? Then full quality is not sustainable on
      // this machine, and retrying on the same short timer is the strobe.
      this.backoff =
        this.t - this.lastRestore < REGRET_S ? Math.min(this.backoff * 2, BACKOFF_MAX) : BACKOFF_MIN
      this.q = LOW
      this.cool = this.backoff
      return this.q
    }
    if (this.ema < this.restoreAt && this.q < 1) {
      this.lastRestore = this.t
      this.q = 1
      // Short, deliberately: a restore that was wrong should be undone fast.
      this.cool = 5
      return this.q
    }
    return null
  }

  /** Missing roughly every other frame. Never below the old absolute bar. */
  get dropAt() {
    return Math.max(0.024, this.period * 1.7)
  }

  /** Comfortably hitting the panel's rate. Never below what the panel can
   *  deliver, which is the bug this whole file exists to prevent. */
  get restoreAt() {
    return Math.max(0.014, this.period * 1.12)
  }
}
