# Phase 0 · Readiness findings

Answered before building anything. Two results change the plan.

## 1 · Do mainstream Hindi videos embed?  **YES — gate passes**

Tested via YouTube's oEmbed endpoint, which returns 401 when a rights
holder has disabled embedding:

| video | result | who |
|---|---|---|
| `sivn5BX3Lic` | embeddable | **T-Series** (2024 release) |
| `xZDDOwGqLFY` | embeddable | **T-Series** mixtape |
| `ND4V-wgtGZ8` | embeddable | **Saregama** |
| `WQz4A0kLUS8` | embeddable | Bollywood compilation |
| `N0jnLZxYwYc` | embeddable | Shemaroo — what saloon.wtf plays |
| `GqAZGWcRI6I` | **embedding disabled** | small independent single |

5 of 6, including India's largest label. The single failure is an
independent upload, not a major. **The catalogue is viable.**

Caveat: oEmbed does not reflect *regional* blocks, and per-video settings
can change. The curated list needs an embeddability check at build time,
not a one-off — a video can be pulled at any point.

## 2 · Can capture be verified from my tooling?  **NO**

`getDisplayMedia` is blocked in the Browser pane:
`NotAllowedError — Permission denied`, despite
`hasGetDisplayMedia: true` and a secure context. The pane refuses device
and display capture outright.

**Consequence: I can build the capture path but cannot prove it works.**
The proof needs a human in a real Chrome window. Test protocol below.

## 3 · CSP / frame-src  **nothing to do**

No CSP, no `X-Frame-Options`, no `Permissions-Policy` on the deployed
site or in `index.html`. YouTube frames and `getDisplayMedia` both work
unblocked today. If a CSP is ever added it will need
`frame-src https://www.youtube.com` and `script-src` for `iframe_api`,
plus `display-capture=(self)` in Permissions-Policy.

## 4 · Autoplay policy  **works from one click**

A single user click on PLAY started playback with sound: state `1`
(PLAYING), clock advancing, no second tap required. The source-button
click is a sufficient gesture.

## 5 · Latency  **deferred** — needs capture, see item 2

---

## Also learned, and it affects the UI

`player.getVideoData().author` is an **empty string until playback
starts**; it only populates once state reaches PLAYING. `title`,
`video_id` and `duration` are all available while merely cued.

So the channel row must be absent until known — not rendered blank. That
matches the existing convention (`{track.musicalKey && …}`) rather than
needing anything new.

Confirmed available and therefore showable: title, author (once playing),
videoId, currentTime, duration, player state.
Confirmed **not** available and therefore never shown: musical key,
genre, declared BPM, waveform peaks.

---

## Test protocol — the part that needs your hands

Open `/jukebox-lab.html` in a normal Chrome or Edge window (not the
in-app pane). Then:

1. Press **play** on the video. Confirm you hear it.
2. Press **① capture this tab's audio**.
3. In the picker choose **This tab**, and — the step everything depends
   on — **tick "Also share tab audio"**.
4. Watch the two panels:
   - **analyser bins** should show bars moving with the music
   - **rms / peak** should read `SIGNAL PRESENT`
5. Confirm you do **not** hear an echo or doubling. The analyser is
   deliberately not connected to output; if you hear doubling, my
   feedback assumption is wrong and I need to know.
6. Press **Stop sharing** in Chrome's bar. The log should record
   `AUDIO TRACK ENDED` and the canvas should clear.

What I need back: whether the bars move, whether there is any echo, and
roughly how far behind the beat the bars feel. That last one decides
whether the star needs a compensating delay.

If step 3's checkbox is easy to miss, say so — that is the single
drop-off point the real UI has to design around.
