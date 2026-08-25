import type { TrackInfo } from '../audio/graph'

// Deploys can live under a subpath (GitHub Pages serves /SCOPE/) — every
// runtime URL rides Vite's base.
const B = import.meta.env.BASE_URL

/**
 * The house radio — public domain (CC0), shipped with the build.
 *
 * Source: FreePD (freepd.com), via the github.com/0lhi/FreePD mirror,
 * Electronic collection. CC0 means no rights reserved: redistribution in
 * this repo and on the deployment is explicitly permitted, no attribution
 * required (credited anyway — it's honorable).
 */
export const playlist: TrackInfo[] = [
  { title: '3 am west end', artist: 'freepd · cc0', src: `${B}tracks/3-am-west-end.mp3` },
  { title: 'arpent', artist: 'freepd · cc0', src: `${B}tracks/arpent.mp3` },
  { title: 'backbeat', artist: 'freepd · cc0', src: `${B}tracks/backbeat.mp3` },
  { title: 'beat one', artist: 'freepd · cc0', src: `${B}tracks/beat-one.mp3` },
  { title: 'beat thee', artist: 'freepd · cc0', src: `${B}tracks/beat-thee.mp3` },
  { title: 'bit bit loop', artist: 'freepd · cc0', src: `${B}tracks/bit-bit-loop.mp3` },
  { title: 'chronos', artist: 'freepd · cc0', src: `${B}tracks/chronos.mp3` },
  { title: 'favorite', artist: 'freepd · cc0', src: `${B}tracks/favorite.mp3` },
  { title: 'fireworks', artist: 'freepd · cc0', src: `${B}tracks/fireworks.mp3` },
  { title: 'goodnightmare', artist: 'freepd · cc0', src: `${B}tracks/goodnightmare.mp3` },
  { title: 'hear what they say', artist: 'freepd · cc0', src: `${B}tracks/hear-what-they-say.mp3` },
  { title: 'meditating beat', artist: 'freepd · cc0', src: `${B}tracks/meditating-beat.mp3` },
]
