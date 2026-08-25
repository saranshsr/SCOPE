#!/usr/bin/env python3
"""
Build the LOCAL radio: manifest + peaks for public/tracks-local/.

This directory is gitignored and vercelignored by design — it holds the
owner's personal library (ripped sets, commercial tracks) which must never
reach the public repo or the deployment. The app prefers this manifest when
it exists and falls back to the shipped CC0 set when it doesn't.
"""
import json, os, re, struct, subprocess, sys

RATE = 22050
PPS = 20
SPP = RATE // PPS

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Outside public/ by design: Vite copies public/ wholesale into dist, which
# once put 583MB of unlicensed audio into every build. See vite.config.ts.
tracks = os.path.join(root, 'local-media', 'tracks')
peaks = os.path.join(root, 'local-media', 'peaks')
os.makedirs(peaks, exist_ok=True)

NOISE = re.compile(r'\b(soundloadmate|com|free|dl|download|premiere|official|audio|edit(ion)?|snippet|out|now|on|bandcamp|ep|records?|music)\b')

def title_of(name):
    s = re.sub(r'\.mp3$', '', name)
    s = s.replace('-', ' ')
    s = NOISE.sub('', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s[:42] or name[:42]

entries = []
done = 0
for name in sorted(os.listdir(tracks)):
    if not name.lower().endswith('.mp3'):
        continue
    base = os.path.splitext(name)[0]
    dst = os.path.join(peaks, base + '.json')
    if not os.path.exists(dst):
        p = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(tracks, name),
                            '-ac', '1', '-ar', str(RATE), '-f', 's16le', '-'], capture_output=True)
        if p.returncode != 0:
            print(f'!! {name}', file=sys.stderr)
            continue
        raw = p.stdout
        n = len(raw) // 2
        samples = struct.unpack(f'<{n}h', raw[: n * 2])
        data = []
        for i in range(0, n, SPP):
            c = samples[i : i + SPP]
            if not c: break
            data.append(max(-128, min(127, min(c) >> 8)))
            data.append(max(-128, min(127, max(c) >> 8)))
        json.dump({'version': 2, 'channels': 1, 'sample_rate': RATE,
                   'samples_per_pixel': SPP, 'bits': 8,
                   'length': len(data) // 2, 'data': data},
                  open(dst, 'w'), separators=(',', ':'))
        done += 1
    entries.append({'title': title_of(name), 'artist': 'local deck',
                    'src': f'/tracks-local/{name}'})

json.dump(entries, open(os.path.join(tracks, 'manifest.json'), 'w'), indent=0)
print(f'{len(entries)} tracks in manifest, {done} peaks generated')
