# SCOPE®

A polar audio instrument. One disc of ~26,000 GPU particles that listens:
rings ripple with the mids, the core boils with the bass, the outer rings
arm themselves seconds before a drop lands (the machine reads the whole
track's peaks up front, so it knows the future). Tactical-telemetry chrome:
console rail, crosshair playhead, live spectrum, full-track scrubber, and a
display-scale title announcement on every track change.

Built with Vite + React + TypeScript + Three.js. No backend.

## Run

```bash
npm install
npm run dev
```

## Audio

The house-radio audio files are **not included** in this repo (licensing).
`public/tracks` is a local symlink on the original machine. Everything works
without it:

- **Drop any audio file anywhere on the page** and the instrument plays it,
  decoding full-track waveform peaks in the browser.
- **Mic** input visualizes the room live.

To wire your own radio: put mp3s in `public/tracks/`, list them in
`src/data/tracks.ts`, and pre-compute overview peaks:

```bash
python3 scripts/generate-peaks.py   # needs ffmpeg; writes public/peaks/*.json
```

Peaks are audiowaveform-compatible JSON (version 2, min/max int8 pairs), so
they interop with wavesurfer.js / peaks.js tooling.

## Design

Industrial-brutalist telemetry: `#0a0a0a` substrate, white phosphor ink, one
hazard red, Archivo Black + JetBrains Mono (self-hosted), zero rounded
corners. All motion honors `prefers-reduced-motion`.
