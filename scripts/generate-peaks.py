#!/usr/bin/env python3
"""
Pre-compute full-track waveform peaks for the radio library.

Output is audiowaveform-compatible JSON (version 2 schema: interleaved
min/max int8 pairs per pixel) so the data interops with BBC tooling
(wavesurfer.js / peaks.js) — produced here with ffmpeg since this machine
has no package manager for the audiowaveform binary itself.

Usage: python3 scripts/generate-peaks.py
Reads  public/tracks/*.mp3 → writes public/peaks/<name>.json
"""
import json, os, struct, subprocess, sys

RATE = 22050
PPS = 20                      # pixels per second — overview resolution
SPP = RATE // PPS             # samples per pixel

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tracks = os.path.join(root, 'public', 'tracks')
out = os.path.join(root, 'public', 'peaks')
os.makedirs(out, exist_ok=True)

done = skipped = 0
for name in sorted(os.listdir(tracks)):
    if not name.lower().endswith(('.mp3', '.wav', '.m4a')):
        continue
    dst = os.path.join(out, os.path.splitext(name)[0] + '.json')
    if os.path.exists(dst):
        skipped += 1
        continue
    src = os.path.join(tracks, name)
    p = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', str(RATE), '-f', 's16le', '-'],
        capture_output=True)
    if p.returncode != 0:
        print(f'!! {name}: {p.stderr.decode()[:120]}', file=sys.stderr)
        continue
    raw = p.stdout
    n = len(raw) // 2
    samples = struct.unpack(f'<{n}h', raw[: n * 2])
    data = []
    for i in range(0, n, SPP):
        chunk = samples[i : i + SPP]
        if not chunk:
            break
        # 16-bit → 8-bit, audiowaveform's min/max pair convention.
        data.append(max(-128, min(127, min(chunk) >> 8)))
        data.append(max(-128, min(127, max(chunk) >> 8)))
    payload = {
        'version': 2,
        'channels': 1,
        'sample_rate': RATE,
        'samples_per_pixel': SPP,
        'bits': 8,
        'length': len(data) // 2,
        'data': data,
    }
    with open(dst, 'w') as f:
        json.dump(payload, f, separators=(',', ':'))
    done += 1
    print(f'ok {name} → {len(data)//2}px')

print(f'\n{done} generated, {skipped} already present')
