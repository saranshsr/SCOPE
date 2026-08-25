# SCOPE®

![SCOPE](public/og.png)

A star made of 58,000 particles that listens.

The shell is a fibonacci sphere displaced by three octaves of drifting 3D
simplex noise: bass swells the photosphere, mids drive the boil, highs add
grain, and every real beat erupts matter off the surface (a pooled ejecta
system, simulated entirely in the vertex shader as closed-form drag arcs).
It reads the whole track's peaks up front, so the surface tension rises a
few seconds *before* a drop lands. Grab it and spin it; it drifts on its
own the rest of the time.

**Stem control.** Drop separated stems together (files named
vocals/drums/bass/whatever — [StemDeck](https://github.com/stemdeckapp/stemdeck)
splits any track locally, free, Apache-2.0) and scope becomes a stem
deck: sample-locked multitrack playback, per-stem strips with live
meters and one-tap mute, and the orb's quadrants become TRUE stem
controls — grab the drums' territory and push in for a real drum mute,
pull the vocals out to hear only the voice. Each stem owns a visual
organ: drums gate the eruptions, bass drives the photosphere, vocals
light a corona ring that dies when the voice does. Everything stays in
your browser — stems are never uploaded.

**The orb is the mixer.** Grab its body and pull: outward boosts the EQ
band you're holding, pushing through the core kills it (momentary, like
holding a kill through a phrase). Drag across for the colour filter
(high-pass left, low-pass right — latches like the knob it is). Pull far
out and hold to build an echo that rings out when you let go. Where you
grab is what you grab: highs at the top, lows at the bottom, and the
killed band's sectors visibly collapse dark. Grabbing empty space still
spins it.

Tools: click any spectrum bar to **solo that band** (a real bandpass —
you hear the slice, the star dances to it alone), a **rate dial**
(0.5–1.5×, vinyl-style pitch bend), **ambient mode** (H hides every
instrument for a TV or second monitor), and full keyboard control
(space/N/arrows/1-3/R/F/M — legend on the console).

Around it: a tactical-telemetry console. Full-track waveform scrubber with
a red playhead, live 24-band spectrum, a survey grid whose sweep speed
rides the bass (Web Animations `playbackRate`), a title block with real
values, tick rulers, a reticle cursor, and display-type track
announcements that decode character by character.

Built with Vite + React + TypeScript + Three.js. No backend.

## Run

```bash
npm install
npm run dev
```

## Audio

The house radio ships with 12 public-domain (CC0) tracks from
[FreePD](https://freepd.com) — no rights reserved, redistribution
permitted. And it's still yours to feed:

- **Drop any audio file anywhere** — peaks decode in-browser, the strip
  becomes a scrubber, the star gets its future-sight.
- **Mic** visualizes the room live.

To change the radio: swap mp3s in `public/tracks/`, list them in
`src/data/tracks.ts`, and pre-compute overview peaks (audiowaveform-
compatible JSON, needs ffmpeg):

```bash
python3 scripts/generate-peaks.py
```

## Deploy

Any static host. For rich social cards, set the deploy origin at build
time (see `.env.example`):

```bash
VITE_SITE_URL=https://your-domain npm run build
```

## Design

Industrial-brutalist telemetry: `#0a0a0a` substrate, white phosphor ink,
one hazard red, Archivo Black + JetBrains Mono (self-hosted), zero rounded
corners, real values only. Every animation honors
`prefers-reduced-motion`.
