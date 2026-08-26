# SCOPE®

![SCOPE](public/og.png)

A star of 108,000 particles that listens — about 63k burn at rest, and
zooming in spends the reserve.

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

**The tuner.** The radio is a dial: genre chips retune the trending
sweep (house, techno, dnb, dubstep, trap, hip-hop, lo-fi and more) and
a search box finds any artist or track on Audius, ranked by real play
counts. Every track carries the artist's own declared bpm and key
(printed beside scope's measured values) and a link back to its page.

**Split any track.** Press SPLIT INTO STEMS and the playing track
separates into vocals / drums / bass / other in about fifteen seconds,
entirely in your browser: STFT, harmonic/percussive separation, bass
crossover and center-channel vocal extraction in a Web Worker. Nothing
is uploaded. The stems land in the same deck as a stem-file drop:
named rings, rows, real per-stem gains.

**First contact.** A guided tour points at each control where it
lives (it opens the stack itself to show you the rings), fires once on
first power-on, and reopens anytime from the [?] in the rail.

**Dissection.** Pull the orb apart along its axis (or press D) and the
star shears into an exploded survey drawing: six stacked rings on a
spine (sub / bass / lowmid / mid / himid / air, or one ring per stem
when stems are loaded), each with a nested inner ring and scattered
dust, numbered vertex markers, plumb lines dropping to an illuminated
ground, aligned level plates, and a master compass at the base. The
rings shear with real ring-system physics: inner rings rotate faster,
dust streams counter-rotate, and beats spin the mechanism up.

**Every ring is a fader you can see.** Each ring owns a real peaking
filter in the audio desk, and the LAYERS panel gives every ring a
visible row: name, live meter, level slider, solo and mute. Hover a
row and its ring burns brighter; hover a ring and its row heats up.
Gestures remain as shortcuts: drag a ring from the axis for level,
tap to solo, push it into the axis to mute. Ring size and glow track
each layer's true post-gain level with VU ballistics, so the drawing
never lies about what you're hearing. Dropping stems opens the stack
by itself: stems ARE layers.

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

## Controls

| where | gesture | result |
| --- | --- | --- |
| body | pull out / push in | EQ boost / kill (momentary) |
| body | drag across | colour filter sweep (latches) |
| body | pull far + hold | echo builds, rings out on release |
| axis | pull up / `D` | dissect into the survey stack |
| ring (open) | drag from axis | ring level — its own filter, or real stem gain |
| ring (open) | tap | ring solo |
| ring (open) | push to the axis | ring mute (latches) |
| layer row | slider / S / M | the same ring, as a visible fader |
| empty space | drag | spin |
| anywhere | wheel / pinch | zoom 1–5× (spends the particle reserve) |
| spectrum | tap a bar | bandpass solo |

`space` pause · `n` skip · `←→` seek · `↑↓` volume · `1–3` presets ·
`r/f/m` source · `h` ambient · `+/−/0` zoom — the console shows the
legend for whichever state you're in.

## Run

```bash
npm install
npm run dev
```

## Audio

The radio tunes itself to the best source it can reach:

1. **Audius trending** — real released club music (house, tech house,
   dubstep, DnB) streamed legally from the artist-run
   [Audius](https://audius.co) network's public API. CORS-open, so the
   analyser hears every bar.
2. **Shipped set** — 12 public-domain (CC0) tracks from
   [FreePD](https://freepd.com) as the offline floor.

And it's still yours to feed:

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
