/**
 * The Audius tuner — real released music, streamed legally, and tunable.
 *
 * Audius is an artist-owned streaming platform whose public API exists
 * exactly for third-party players: non-DRM streams with CORS open (verified:
 * access-control-allow-origin * on the stream redirect), so the analyser can
 * hear what plays. No files hosted, no redistribution — every play streams
 * from their nodes, and every track carries a link back to the artist.
 *
 * Tracks arrive with the artist's OWN declared bpm and musical key. scope
 * shows those next to its measured values: source of truth beside the
 * instrument's reading, the way a survey drawing cites its datum.
 */

import type { TrackInfo } from './graph'

const APP = 'scope'

/** THE VIBE LEXICON — how a prompt becomes a musical read. Each entry
 *  maps feel-words to Audius's own metadata: moods (their taxonomy),
 *  genres (their names, every one checked live against /tracks/trending),
 *  and a bpm range.
 *
 *  Matching is by WHOLE WORD (a prefix may take a suffix: "danc" matches
 *  dance, dancing). The old patterns matched inside words, so "trap" and
 *  "therapy" read as hip-hop, "brunch" as running, "made" as angry and
 *  "update" as a date.
 *
 *  Hits are WEIGHTED, not unioned: a named style (techno, lofi) outweighs
 *  a mood word, which outweighs a scene (rooftop, commute). Genres and
 *  moods are ranked by weight, and the tempo is the weighted centre of the
 *  hits rather than the widest span they cover -- "chill gym" used to read
 *  as 60-180 bpm, which is no read at all. */
interface VibeSense {
  moods?: string[]
  genres?: string[]
  bpm?: [number, number]
  /** weight per genre / mood, for ranking tracks against the read */
  genreW?: Record<string, number>
  moodW?: Record<string, number>
  /** genres the prompt asked NOT to hear ("no rap", "without techno") */
  avoid?: string[]
  /** words to search for by TEXT: styles Audius has no genre for */
  terms?: string[]
}

type Kind = 'style' | 'mood' | 'scene'
interface Entry { re: RegExp; kind: Kind; moods?: string[]; genres?: string[]; bpm?: [number, number]; search?: boolean }
const KIND_W: Record<Kind, number> = { style: 3, mood: 2, scene: 1.5 }

/** whole-word alternation; a trailing * lets a stem take any suffix */
const W = (...alts: string[]) =>
  new RegExp(`(?:^|[^a-z0-9])(?:${alts.map((a) => (a.endsWith('*') ? a.slice(0, -1) + '[a-z]*' : a)).join('|')})(?=$|[^a-z0-9])`, 'i')
const E = (kind: Kind, re: RegExp, v: Omit<Entry, 're' | 'kind'>): Entry => ({ re, kind, ...v })

const LEXICON: Entry[] = [
  // -- energy / activity
  E('scene', W('gym*', 'workout*', 'lift*', 'rage', 'hype*', 'beast mode', 'pump*', 'pr day', 'leg day'), { moods: ['Aggressive', 'Energizing', 'Fiery', 'Rowdy'], genres: ['Trap', 'Dubstep', 'Drum & Bass', 'Hip-Hop/Rap'], bpm: [130, 175] }),
  E('scene', W('run', 'runs', 'running', 'jog*', 'cardio', 'sprint*', 'marathon'), { moods: ['Energizing', 'Upbeat'], genres: ['Drum & Bass', 'House', 'Electronic'], bpm: [150, 178] }),
  E('scene', W('party', 'parties', 'club*', 'danc*', 'banger*', 'festival*', 'pregame', 'pre game'), { moods: ['Excited', 'Rowdy', 'Upbeat'], genres: ['House', 'Tech House', 'Electronic', 'Dancehall'], bpm: [120, 132] }),
  E('scene', W('rave*', 'warehouse', 'underground', 'berlin'), { moods: ['Gritty', 'Fiery'], genres: ['Techno', 'Tech House', 'Jungle'], bpm: [128, 145] }),
  E('scene', W('gaming', 'game*', 'boss fight', 'speedrun*', 'ranked'), { moods: ['Energizing', 'Excited', 'Fiery'], genres: ['Electronic', 'Dubstep', 'Drum & Bass', 'Hyperpop'], bpm: [128, 175] }),
  E('scene', W('clean*', 'chores', 'tidy*', 'cook*', 'kitchen'), { moods: ['Upbeat', 'Easygoing'], genres: ['Funk', 'Disco', 'Pop', 'House'], bpm: [105, 125] }),
  E('scene', W('walk*', 'stroll*', 'wander*'), { moods: ['Easygoing', 'Upbeat'], genres: ['Lo-Fi', 'Alternative', 'Folk', 'Pop'], bpm: [90, 120] }),
  E('scene', W('commut*', 'metro', 'subway', 'train', 'bus'), { moods: ['Cool', 'Easygoing'], genres: ['Lo-Fi', 'Hip-Hop/Rap', 'Electronic'], bpm: [85, 120] }),
  E('scene', W('road ?trip*', 'travel*', 'airport', 'flight', 'plane'), { moods: ['Upbeat', 'Stirring', 'Easygoing'], genres: ['Pop', 'Alternative', 'Electronic', 'Folk'], bpm: [95, 128] }),
  // -- time / place
  E('scene', W('late night', 'night drive', 'midnight', '3am', '2am', '4am', 'after ?hours', 'nocturnal', 'night'), { moods: ['Brooding', 'Cool', 'Sophisticated'], genres: ['Electronic', 'Deep House', 'Downtempo', 'R&B/Soul'], bpm: [95, 122] }),
  E('scene', W('driv*', 'highway', 'cruis*', 'freeway'), { moods: ['Cool', 'Defiant'], genres: ['Hip-Hop/Rap', 'Electronic', 'House', 'Electro'], bpm: [90, 125] }),
  E('scene', W('sunset', 'rooftop', 'golden hour', 'beach', 'pool ?party', 'pool', 'summer*', 'vacation', 'holiday', 'ibiza', 'tropical'), { moods: ['Easygoing', 'Romantic', 'Upbeat'], genres: ['Deep House', 'Tropical House', 'Disco', 'House'], bpm: [108, 124] }),
  E('scene', W('morning', 'sunrise', 'coffee', 'breakfast', 'wake up', 'spring'), { moods: ['Peaceful', 'Easygoing', 'Tender'], genres: ['Lo-Fi', 'Acoustic', 'Downtempo', 'Jazz'], bpm: [70, 105] }),
  E('scene', W('rain*', 'grey', 'gray', 'winter', 'cozy', 'cosy', 'fireplace', 'campfire', 'bonfire', 'by the fire', 'autumn', 'fall', 'snow*', 'storm*'), { moods: ['Melancholy', 'Sentimental', 'Peaceful'], genres: ['Lo-Fi', 'Downtempo', 'Ambient', 'Acoustic'], bpm: [60, 100] }),
  E('scene', W('city', 'urban', 'street*', 'neon', 'tokyo', 'cyberpunk'), { moods: ['Cool', 'Gritty', 'Sophisticated'], genres: ['Electronic', 'Hip-Hop/Rap', 'Electro', 'Vaporwave'], bpm: [90, 128] }),
  E('scene', W('nature', 'forest', 'ocean', 'sea', 'waves', 'mountain*', 'desert', 'garden'), { moods: ['Peaceful', 'Stirring'], genres: ['Ambient', 'Acoustic', 'Downtempo', 'World'], bpm: [55, 100] }),
  E('scene', W('dinner', 'wine', 'cocktail*', 'lounge', 'bar', 'fancy', 'classy'), { moods: ['Sophisticated', 'Sensual', 'Cool'], genres: ['Jazz', 'R&B/Soul', 'Deep House', 'Downtempo'], bpm: [80, 118] }),
  // -- state of mind
  // "design time" is the canonical bug this lexicon exists to fix: it must
  // resolve here (a vibe read) and never as a literal search for a track
  // titled "Design Time" — see classifyIntent below.
  E('scene', W('study*', 'focus*', 'deep work', 'cod*', 'programming', 'concentrat*', 'design ?time', 'design*', 'creative flow', 'working late', 'work', 'working', 'reading', 'writing', 'homework', 'exam*', 'productiv*', 'flow state'), { moods: ['Peaceful', 'Easygoing', 'Sophisticated'], genres: ['Lo-Fi', 'Ambient', 'Downtempo', 'Electronic'], bpm: [65, 110] }),
  E('scene', W('sleep*', 'bedtime', 'nap*', 'insomnia', 'lullab*'), { moods: ['Peaceful', 'Tender'], genres: ['Ambient', 'Classical', 'Lo-Fi'], bpm: [50, 80] }),
  E('scene', W('meditat*', 'yoga', 'breath*', 'mindful*', 'spa', 'zen', 'healing', 'prayer', 'pray*'), { moods: ['Peaceful', 'Tender'], genres: ['Ambient', 'World', 'Devotional', 'Classical'], bpm: [50, 85] }),
  E('mood', W('chill*', 'relax*', 'calm*', 'unwind*', 'laid ?back', 'mellow', 'easy', 'vibes?', 'vibing'), { moods: ['Easygoing', 'Peaceful', 'Cool'], genres: ['Lo-Fi', 'Deep House', 'Downtempo'], bpm: [80, 115] }),
  E('mood', W('sad*', 'heartbr*', 'cry', 'crying', 'miss you', 'missing', 'lonel*', 'alone', 'breakup', 'broken', 'hurt*', 'grief', 'blue'), { moods: ['Melancholy', 'Yearning', 'Sentimental'], genres: ['R&B/Soul', 'Lo-Fi', 'Downtempo', 'Acoustic'], bpm: [60, 100] }),
  E('mood', W('angry', 'anger', 'mad', 'fury', 'furious', 'vent*', 'pissed', 'rage'), { moods: ['Aggressive', 'Defiant', 'Fiery'], genres: ['Metal', 'Trap', 'Dubstep', 'Punk'], bpm: [130, 175] }),
  E('mood', W('happy', 'joy*', 'good mood', 'feel ?good', 'smil*', 'sunny', 'bright', 'cheer*', 'celebrat*', 'fun'), { moods: ['Upbeat', 'Excited', 'Empowering'], genres: ['Disco', 'House', 'Pop', 'Funk'], bpm: [110, 128] }),
  E('mood', W('love', 'romantic', 'romance', 'date night', 'first date', 'slow dance', 'crush', 'wedding'), { moods: ['Romantic', 'Tender', 'Sentimental', 'Sensual'], genres: ['R&B/Soul', 'Jazz', 'Downtempo', 'Pop'], bpm: [65, 105] }),
  E('mood', W('sexy', 'sensual', 'seduct*', 'slow jam*'), { moods: ['Sensual', 'Romantic', 'Cool'], genres: ['R&B/Soul', 'Downtempo'], bpm: [65, 100] }),
  E('mood', W('dark', 'sinister', 'villain*', 'menac*', 'evil', 'creepy', 'horror', 'haunt*'), { moods: ['Brooding', 'Serious', 'Gritty'], genres: ['Techno', 'Trap', 'Electronic', 'Experimental'], bpm: [100, 140] }),
  E('mood', W('space', 'cosmic', 'float*', 'dream*', 'ethereal', 'galaxy', 'stars', 'astral'), { moods: ['Peaceful', 'Stirring'], genres: ['Ambient', 'Electronic', 'Downtempo'], bpm: [60, 110] }),
  E('mood', W('epic', 'cinematic', 'movie', 'film', 'trailer', 'soundtrack', 'heroic', 'triumph*', 'anthem*'), { moods: ['Stirring', 'Empowering', 'Serious'], genres: ['Soundtrack', 'Classical', 'Electronic'], bpm: [80, 140] }),
  E('mood', W('confiden*', 'boss', 'main character', 'motivat*', 'grind*', 'hustl*', 'win', 'winning'), { moods: ['Empowering', 'Defiant', 'Energizing'], genres: ['Hip-Hop/Rap', 'Trap', 'Pop'], bpm: [85, 150] }),
  E('mood', W('nostalg*', 'throwback*', 'old school', 'memories', 'childhood'), { moods: ['Sentimental', 'Yearning'], genres: ['Funk', 'Disco', 'R&B/Soul', 'Vaporwave'], bpm: [85, 122] }),
  E('mood', W('weird', 'strange', 'experimental', 'abstract', 'glitchy'), { moods: ['Stirring', 'Serious'], genres: ['Experimental', 'Glitch Hop', 'Electronic'], bpm: [80, 150] }),
  // -- direct style words pass straight through
  E('style', W('house'), { genres: ['House', 'Deep House', 'Tech House'], bpm: [118, 128] }),
  E('style', W('deep house'), { genres: ['Deep House'], bpm: [115, 124] }),
  E('style', W('tech house'), { genres: ['Tech House'], bpm: [122, 128] }),
  E('style', W('techno'), { genres: ['Techno'], bpm: [125, 140] }),
  E('style', W('dnb', 'd&b', 'drum and bass', 'drum & bass', 'drum n bass', 'jungle', 'liquid'), { genres: ['Drum & Bass', 'Jungle'], bpm: [160, 178] }),
  E('style', W('dubstep', 'bass music', 'wobble', 'riddim', 'brostep'), { genres: ['Dubstep'], bpm: [135, 150] }),
  E('style', W('trap', '808s?'), { genres: ['Trap'], bpm: [130, 160] }),
  E('style', W('hip ?hop', 'rap', 'rapper*', 'boom ?bap', 'drill'), { genres: ['Hip-Hop/Rap'], bpm: [80, 150] }),
  E('style', W('lo ?-?fi', 'lofi', 'chillhop'), { genres: ['Lo-Fi'], bpm: [60, 95] }),
  E('style', W('disco', 'funk*', 'groov*', 'nu disco'), { genres: ['Disco', 'Funk'], bpm: [105, 125] }),
  E('style', W('ambient', 'drone', 'soundscape*'), { genres: ['Ambient'], bpm: [50, 90] }),
  E('style', W('jazz*', 'bebop', 'swing', 'saxophone', 'sax'), { genres: ['Jazz'], bpm: [80, 140] }),
  E('style', W('soul', 'rnb', 'r&b', 'r and b', 'neo soul'), { genres: ['R&B/Soul'], bpm: [70, 110] }),
  E('style', W('reggae', 'dub', 'ska'), { genres: ['Reggae'], bpm: [70, 100] }),
  E('style', W('dancehall'), { genres: ['Dancehall'], bpm: [90, 110] }),
  E('style', W('latin', 'reggaeton', 'salsa', 'bachata', 'cumbia', 'moombahton'), { genres: ['Latin', 'Moombahton'], bpm: [90, 110] }),
  E('style', W('phonk', 'drift phonk'), { moods: ['Gritty', 'Brooding'], genres: ['Trap', 'Electro', 'Hip-Hop/Rap'], bpm: [125, 165] }),
  E('style', W('hyperpop', 'glitch*', 'pc music'), { moods: ['Excited', 'Rowdy'], genres: ['Hyperpop', 'Glitch Hop', 'Electronic'], bpm: [130, 170] }),
  E('style', W('trance', 'uplifting', 'euphoric', 'psytrance'), { moods: ['Stirring', 'Empowering'], genres: ['Trance', 'Progressive House'], bpm: [132, 145] }),
  E('style', W('hardstyle', 'hardcore', 'gabber', 'hard dance'), { moods: ['Aggressive', 'Rowdy'], genres: ['Hardstyle'], bpm: [145, 180] }),
  E('style', W('vaporwave', 'synthwave', 'retrowave', 'outrun', 'retro', '80s', 'eighties'), { moods: ['Cool', 'Sentimental'], genres: ['Vaporwave', 'Electro', 'Electronic'], bpm: [80, 118] }),
  // Audius has no Afrobeat genre (probed: zero tracks); World + Dancehall
  // + House carry it, and the mood does the rest
  E('style', W('afro*', 'amapiano', 'afrohouse', 'afro house', 'naija'), { moods: ['Upbeat', 'Easygoing'], genres: ['Afro House', 'World', 'Dancehall', 'House'], bpm: [100, 122], search: true }),
  E('style', W('future bass', 'melodic bass', 'chill trap', 'future house'), { moods: ['Stirring', 'Yearning'], genres: ['Future Bass', 'Future House', 'Electronic'], bpm: [125, 160] }),
  E('style', W('jersey club', 'baltimore club'), { moods: ['Excited', 'Rowdy'], genres: ['Jersey Club'], bpm: [130, 145] }),
  E('style', W('sad ?boy', 'down bad', 'in my feels', 'feels', 'emo'), { moods: ['Melancholy', 'Yearning'], genres: ['Lo-Fi', 'R&B/Soul', 'Hip-Hop/Rap', 'Alternative'], bpm: [60, 105] }),
  E('style', W('rock', 'guitar*', 'band', 'indie', 'grunge', 'shoegaze', 'alt'), { genres: ['Rock', 'Alternative'], bpm: [95, 160] }),
  E('style', W('punk', 'pop punk'), { moods: ['Defiant', 'Rowdy'], genres: ['Punk', 'Rock'], bpm: [150, 190] }),
  E('style', W('metal', 'heavy', 'metalcore', 'djent'), { moods: ['Aggressive', 'Fiery'], genres: ['Metal'], bpm: [120, 190] }),
  E('style', W('pop', 'catchy', 'radio', 'top 40'), { moods: ['Upbeat'], genres: ['Pop'], bpm: [100, 130] }),
  E('style', W('classical', 'orchestra*', 'piano', 'strings', 'symphon*', 'cello', 'violin'), { moods: ['Peaceful', 'Stirring', 'Sophisticated'], genres: ['Classical', 'Soundtrack'], bpm: [55, 120] }),
  E('style', W('acoustic', 'unplugged', 'singer songwriter'), { moods: ['Tender', 'Sentimental'], genres: ['Acoustic', 'Folk'], bpm: [70, 115] }),
  E('style', W('folk', 'country', 'bluegrass', 'americana'), { genres: ['Folk', 'Country'], bpm: [80, 130] }),
  E('style', W('blues'), { genres: ['Blues'], bpm: [60, 110] }),
  E('style', W('electronic', 'edm', 'synth*', 'electro'), { genres: ['Electronic', 'Electro'], bpm: [110, 140] }),
  E('style', W('downtempo', 'trip ?hop', 'chillout'), { genres: ['Downtempo'], bpm: [80, 105] }),
  E('style', W('instrumental', 'no vocals', 'beats'), { genres: ['Lo-Fi', 'Ambient', 'Electronic', 'Soundtrack'] }),
  // noon's own rooms: South Asia and the Gulf
  // Audius has no genre for these, so the words are searched as text too
  // (search: true) and a text hit outranks a generic "World" genre match
  E('style', W('bollywood', 'desi', 'hindi', 'punjabi', 'bhangra', 'indian', 'tamil', 'telugu', 'urdu'), { moods: ['Upbeat', 'Romantic'], genres: ['World', 'Pop'], bpm: [85, 130], search: true }),
  E('style', W('sufi', 'qawwali'), { moods: ['Stirring', 'Sentimental'], genres: ['World', 'Devotional'], bpm: [70, 120], search: true }),
  E('style', W('arabic', 'khaleeji', 'arab', 'middle eastern', 'oud', 'egyptian', 'lebanese'), { moods: ['Stirring', 'Sentimental'], genres: ['World', 'Pop'], bpm: [75, 125], search: true }),
  E('style', W('eid', 'ramadan', 'nasheed'), { moods: ['Peaceful', 'Stirring'], genres: ['Devotional', 'World'], bpm: [60, 110], search: true }),
  E('style', W('kpop', 'k-pop', 'jpop', 'j-pop', 'anime'), { moods: ['Upbeat', 'Excited'], genres: ['Pop', 'Electronic'], bpm: [100, 140], search: true }),
  E('style', W('world', 'global', 'ethnic', 'tribal'), { genres: ['World'], bpm: [80, 125] }),
]

/** INTENSITY: words that move the tempo and the energy without naming a
 *  style. They shift the read's centre rather than adding genres. */
const SLOWER = W('slow*', 'soft*', 'gentle', 'quiet*', 'sleepy', 'lazy', 'low ?key', 'mellow', 'downbeat')
const FASTER = W('fast*', 'hard*', 'loud*', 'intense', 'energ*', 'upbeat', 'turnt', 'heavy', 'aggressive', 'crazy', 'wild')
const STRONG = W('super', 'very', 'really', 'extra', 'max', 'ultra', 'so')

/** NEGATION: "no rap", "not too sad", "without techno", "anything but pop".
 *  The phrase after the negator is read as its own prompt and whatever it
 *  names is struck from the read and kept out of the results. */
const NEGATE = /(?:^|[^a-z])(?:no|not|without|minus|except|anything but|nothing|zero|skip|avoid|hate)\s+(?:too\s+|any\s+|more\s+)?([a-z0-9&'\- ]+?)(?=$|[,.;]|\s+(?:and|but|or|with|please|pls)\b)/gi

/** Read a prompt: weigh every lexicon hit into one sense + a human line. */
export function readVibe(prompt: string): { sense: VibeSense; read: string } {
  // strike negated phrases first, so "no rap" never reads as rap
  const avoidG = new Set<string>()
  const avoidM = new Set<string>()
  const struck: string[] = []
  let text = ` ${prompt.toLowerCase()} `
  for (const m of prompt.toLowerCase().matchAll(NEGATE)) {
    const phrase = m[1].trim()
    const hit = LEXICON.filter((e) => e.re.test(` ${phrase} `))
    // "not too slow" / "nothing hard": a negated intensity word is struck
    // from the text so it cannot push the tempo the way it says not to
    const pace = SLOWER.test(` ${phrase} `) || FASTER.test(` ${phrase} `)
    if (!hit.length && !pace) continue
    if (pace) { text = text.replace(m[0].toLowerCase(), ' '); if (!hit.length) continue }
    struck.push(phrase)
    for (const e of hit) {
      // a negated STYLE removes its genres; a negated mood removes its moods
      if (e.kind === 'style') e.genres?.forEach((g) => avoidG.add(g))
      else e.moods?.forEach((mo) => avoidM.add(mo))
    }
    text = text.replace(m[0].toLowerCase(), ' ')
  }

  const gW = new Map<string, number>()
  const mW = new Map<string, number>()
  let bpmSum = 0
  let spanSum = 0
  let bpmW = 0
  const terms: string[] = []
  for (const e of LEXICON) {
    if (!e.re.test(text)) continue
    if (e.search) {
      const hit = text.match(e.re)?.[0].replace(/[^a-z0-9&\- ]/gi, ' ').trim()
      if (hit && !terms.includes(hit)) terms.push(hit)
    }
    const w = KIND_W[e.kind]
    // earlier genres in an entry are its truer read: rank decays within it
    e.genres?.forEach((g, i) => { if (!avoidG.has(g)) gW.set(g, (gW.get(g) ?? 0) + w / (1 + i * 0.35)) })
    e.moods?.forEach((mo, i) => { if (!avoidM.has(mo)) mW.set(mo, (mW.get(mo) ?? 0) + w / (1 + i * 0.35)) })
    if (e.bpm) {
      bpmSum += ((e.bpm[0] + e.bpm[1]) / 2) * w
      spanSum += ((e.bpm[1] - e.bpm[0]) / 2) * w
      bpmW += w
    }
  }

  // intensity words move the centre; "super" doubles the push
  const push = (STRONG.test(text) ? 2 : 1) * 14
  let shift = 0
  if (SLOWER.test(text)) shift -= push
  if (FASTER.test(text)) shift += push
  let bpm: [number, number] | undefined
  if (bpmW) {
    const c = bpmSum / bpmW + shift
    const half = Math.max(8, Math.min(24, spanSum / bpmW))
    bpm = [Math.round(Math.max(50, c - half)), Math.round(Math.min(190, c + half))]
  } else if (shift) {
    bpm = shift < 0 ? [60, 100] : [125, 165]
  }
  if (shift < 0) mW.set('Peaceful', (mW.get('Peaceful') ?? 0) + 1)
  if (shift > 0) mW.set('Energizing', (mW.get('Energizing') ?? 0) + 1)

  const rank = (m: Map<string, number>, n: number) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
  const g = rank(gW, 5)
  const mo = rank(mW, 4)
  const sense: VibeSense = {
    moods: mo.length ? mo.map((x) => x[0]) : undefined,
    genres: g.length ? g.map((x) => x[0]) : undefined,
    bpm,
    genreW: g.length ? Object.fromEntries(g) : undefined,
    moodW: mo.length ? Object.fromEntries(mo) : undefined,
    avoid: avoidG.size ? [...avoidG] : undefined,
    terms: terms.length ? terms.slice(0, 2) : undefined,
  }
  const bits: string[] = []
  if (sense.moods) bits.push(sense.moods.slice(0, 2).join('/').toLowerCase())
  if (sense.genres) bits.push(sense.genres.slice(0, 2).join('/').toLowerCase())
  if (sense.bpm) bits.push(`${sense.bpm[0]}-${sense.bpm[1]}bpm`)
  if (struck.length) bits.push(`no ${struck.join(', no ')}`)
  return { sense, read: bits.length ? `read as ${bits.join(' · ')}` : 'no read · searching the words themselves' }
}

/** THE INTENT CLASSIFIER — vibe vs named-thing, no LLM, no new deps.
 *
 *  The bug this exists to fix: typing "design time" played a track literally
 *  TITLED "Design Time" — a text-search hit beat the vibe read just because
 *  the words happened to appear in a title. A title that merely CONTAINS the
 *  words a person typed is not evidence they typed a name; people describing
 *  a mood also produce word salads that occasionally collide with a title.
 *
 *  So the decision is cheap and text-only, made BEFORE any network call:
 *   - quotes around the whole phrase, or an explicit "X by Y" -> name, full
 *     stop. Someone who quotes or writes "by" is naming a thing on purpose.
 *   - otherwise, if the phrase lands in the vibe lexicon at all -> vibe.
 *     Lexicon coverage is deliberately broad (see LEXICON above) so real
 *     activity/mood phrasing almost always lands here first.
 *   - otherwise (no lexicon hit) -> name. A phrase with no mood/genre/tempo
 *     reading has nothing else useful to search FOR except itself, and this
 *     is also where bare artist names like "Skrillex" or "Drake" fall.
 *
 *  fetchVibe adds exactly one live override on top of this: a search hit
 *  whose ARTIST name is a near-exact match for what was typed, and who has
 *  real popularity (not a stray upload sharing a word), flips a tentative
 *  vibe read into a name search. That's the one case a popular exact match
 *  is allowed to win — artist search is an existing feature and must keep
 *  working even when an artist's name overlaps a mood word (e.g. "House").
 *  The same exception is deliberately NOT extended to track titles: a title
 *  match, however popular, never overrides a vibe read on its own — only
 *  quotes or "by" get a title-flavoured name search. */
interface Intent {
  mode: 'vibe' | 'name'
  query: string // text to hand the search endpoint (quotes stripped)
  quoted: boolean
  byArtist?: string // the "Y" in "X by Y", for the honest-read text
  titlePart?: string // the "X" in "X by Y"
}

function classifyIntent(prompt: string, sense: VibeSense): Intent {
  const trimmed = prompt.trim()

  const quoteMatch = trimmed.match(/^["“'](.+?)["”']$/)
  if (quoteMatch) return { mode: 'name', query: quoteMatch[1], quoted: true }

  // an exclusion alone ("anything but techno") is still a vibe request:
  // it asks for the radio minus something, not for a track by that name
  const hasVibeSense = !!(sense.moods || sense.genres || sense.bpm || sense.avoid)

  // word-boundary "by" only -- must not fire on "somebody" etc. And only when
  // the phrase has no vibe reading: "music by the fire" and "songs to drive
  // by" are scenes, and a scene that happens to contain "by" is still one.
  const byMatch = hasVibeSense ? null : trimmed.match(/^(.+?)\s+by\s+(.+)$/i)
  if (byMatch) return { mode: 'name', query: trimmed, quoted: false, titlePart: byMatch[1].trim(), byArtist: byMatch[2].trim() }

  return { mode: hasVibeSense ? 'vibe' : 'name', query: trimmed, quoted: false }
}

/** Normalize for name comparison: case/punctuation-insensitive. */
const normName = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Genres the 'club' preset sweeps. */
const CLUB = ['House', 'Deep House', 'Tech House', 'Techno', 'Electronic', 'Dubstep', 'Drum & Bass']

interface AudiusTrack {
  id: string
  title: string
  duration: number
  play_count?: number
  favorite_count?: number
  genre?: string
  mood?: string
  bpm?: number
  musical_key?: string
  permalink?: string
  release_date?: string
  is_streamable?: boolean
  is_stream_gated?: boolean
  is_delete?: boolean
  is_available?: boolean
  user: { name: string; handle?: string }
}

let hostCache: string | null = null

/** Resolve a healthy discovery host once per session. */
async function resolveHost(): Promise<string> {
  if (hostCache) return hostCache
  try {
    const r = await fetch('https://api.audius.co', { signal: AbortSignal.timeout(4000) })
    const hosts = (await r.json()) as { data?: string[] }
    // the directory lists the api gateway itself first these days — it
    // serves JSON fine but its stream redirects are unreliable, so only
    // real discovery nodes qualify
    const nodes = (hosts.data ?? []).filter((h) => !h.includes('api.audius.co'))
    if (nodes.length) hostCache = nodes[Math.floor(Math.random() * Math.min(3, nodes.length))]
  } catch {
    /* canonical fallback below */
  }
  return (hostCache ??= 'https://discoveryprovider.audius.co')
}

/** A track is playable only if it is streamable, ungated and alive. Gated
 *  tracks return 402 to an unauthenticated player — silence with no error. */
function playable(t: AudiusTrack): boolean {
  if (t.is_streamable === false || t.is_stream_gated || t.is_delete) return false
  if (t.is_available === false) return false
  return t.duration >= 90 && t.duration <= 600
}

function toTrack(t: AudiusTrack, host: string): TrackInfo {
  return {
    title: t.title.slice(0, 42),
    artist: `${t.user.name.slice(0, 24)} · audius`,
    src: `${host}/v1/tracks/${t.id}/stream?app_name=${APP}`,
    // The artist's own declared values — scope prints them beside its own.
    bpm: t.bpm && t.bpm > 40 && t.bpm < 220 ? Math.round(t.bpm) : undefined,
    musicalKey: t.musical_key || undefined,
    genre: t.genre || undefined,
    plays: t.play_count,
    // Attribution: every track links back to its page on Audius.
    link: t.permalink ? `https://audius.co${t.permalink}` : undefined,
  }
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Trending for one genre, or the curated club sweep when genre is null. */
export async function fetchAudiusRadio(genre: string | null = null, limit = 40): Promise<TrackInfo[]> {
  try {
    const host = await resolveHost()
    const list = genre ? [genre] : CLUB
    const seen = new Map<string, AudiusTrack>()
    await Promise.allSettled(
      list.map(async (g) => {
        const r = await fetch(
          `${host}/v1/tracks/trending?genre=${encodeURIComponent(g)}&app_name=${APP}&limit=${genre ? 40 : 24}`,
          { signal: AbortSignal.timeout(6000) },
        )
        if (!r.ok) return
        const d = (await r.json()) as { data?: AudiusTrack[] }
        for (const t of d.data ?? []) if (playable(t)) seen.set(t.id, t)
      }),
    )
    const ranked = [...seen.values()].sort((a, b) => (b.play_count ?? 0) - (a.play_count ?? 0)).slice(0, limit)
    return shuffle(ranked).map((t) => toTrack(t, host))
  } catch {
    return []
  }
}

/** How popular a search hit must be before it counts as a real name match
 *  rather than a stray upload that happens to share a word. Audius is a
 *  niche platform; these are already well above what a random title-word
 *  collision tends to score. */
const NAME_MATCH_PLAYS = 500
const NAME_MATCH_FAVORITES = 100

/** THE VIBE: prompt in, playlist out. classifyIntent (above) decides, from
 *  the text alone, whether this reads as a vibe or a name; candidates come
 *  from trending in the read's genres (skipped for a confidently-named
 *  query) plus a full-text search, and every candidate is scored against
 *  whichever read won — mood/genre/bpm for a vibe, popularity + exact-name
 *  match for a name. The one live override: a search hit whose artist is a
 *  near-exact, popular match for what was typed flips a tentative vibe read
 *  into a name search (see the big comment on classifyIntent for why). */
export async function fetchVibe(prompt: string): Promise<{ tracks: TrackInfo[]; read: string }> {
  const { sense, read: vibeRead } = readVibe(prompt)
  const intent = classifyIntent(prompt, sense)
  try {
    const host = await resolveHost()
    const genres = sense.genres ?? CLUB
    const pool = new Map<string, { t: AudiusTrack; fromSearch: boolean; fromTerm?: boolean }>()
    // a quoted phrase or an explicit "X by Y" is confidently a name — don't
    // bother sweeping mood trending for it, the search alone should answer.
    const skipTrending = intent.mode === 'name' && (intent.quoted || !!intent.byArtist)
    const jobs: Promise<void>[] = skipTrending
      ? []
      : genres.slice(0, 5).map(async (g) => {
          const r = await fetch(
            `${host}/v1/tracks/trending?genre=${encodeURIComponent(g)}&app_name=${APP}&limit=30`,
            { signal: AbortSignal.timeout(6000) },
          )
          if (!r.ok) return
          const d = (await r.json()) as { data?: AudiusTrack[] }
          for (const t of d.data ?? []) if (playable(t) && !pool.has(t.id)) pool.set(t.id, { t, fromSearch: false })
        })
    jobs.push(
      (async () => {
        const r = await fetch(
          `${host}/v1/tracks/search?query=${encodeURIComponent(intent.query)}&app_name=${APP}&limit=40`,
          { signal: AbortSignal.timeout(7000) },
        )
        if (!r.ok) return
        const d = (await r.json()) as { data?: AudiusTrack[] }
        for (const t of d.data ?? []) {
          if (!playable(t)) continue
          const prev = pool.get(t.id)
          if (prev) prev.fromSearch = true
          else pool.set(t.id, { t, fromSearch: true })
        }
      })(),
    )
    // a style Audius has no genre for is found by its name: search the
    // term itself, and let those hits carry the read
    for (const term of intent.mode === 'vibe' ? sense.terms ?? [] : []) {
      jobs.push(
        (async () => {
          const r = await fetch(
            `${host}/v1/tracks/search?query=${encodeURIComponent(term)}&app_name=${APP}&limit=40`,
            { signal: AbortSignal.timeout(7000) },
          )
          if (!r.ok) return
          const d = (await r.json()) as { data?: AudiusTrack[] }
          for (const t of d.data ?? []) {
            if (!playable(t)) continue
            const prev = pool.get(t.id)
            if (prev) prev.fromTerm = true
            else pool.set(t.id, { t, fromSearch: false, fromTerm: true })
          }
        })(),
      )
    }
    await Promise.allSettled(jobs)

    // live override check: does a search hit's ARTIST match what was typed,
    // for real (popular, near-exact) rather than in passing? Only artist
    // identity gets to flip vibe->name here — see classifyIntent's comment
    // for why a title match never does this on its own.
    const promptNorm = normName(intent.byArtist ?? intent.query)
    let matchedArtist: string | undefined
    for (const { t, fromSearch } of pool.values()) {
      if (!fromSearch) continue
      const popular = (t.play_count ?? 0) >= NAME_MATCH_PLAYS || (t.favorite_count ?? 0) >= NAME_MATCH_FAVORITES
      if (popular && normName(t.user.name) === promptNorm) { matchedArtist = t.user.name; break }
    }
    const mode: 'vibe' | 'name' = matchedArtist ? 'name' : intent.mode

    // the radio plays music: recitations, talk and audiobooks that share a
    // word with the prompt stay out unless the prompt asked for them
    const talk = /\b(quran|qur'an|surah|ayat|ayah|recitation|tilawat|sermon|podcast|audiobook|chapter \d+|episode \d+)\b/i
    const TALK_GENRES = ['Spoken Word', 'Podcasts', 'Audiobooks', 'Comedy', 'Kids']
    const wantsTalk = talk.test(prompt)
    const scored = [...pool.values()].filter(({ t }) =>
      intent.mode === 'name' || wantsTalk || !(talk.test(t.title) || (t.genre && TALK_GENRES.includes(t.genre))),
    ).map(({ t, fromSearch, fromTerm }) => {
      let score = Math.log10(1 + (t.play_count ?? 0)) * 0.5
      if (mode === 'name') {
        // a name search IS the search hit — weight it hard, and pin the
        // matched artist's own tracks to the top.
        if (fromSearch) score += 4
        if (matchedArtist && normName(t.user.name) === promptNorm) score += 6
      } else {
        // a vibe search only nudges on text match — this is the fix for the
        // literal-title bug: a stray title hit alone can't outscore a real
        // mood/genre/bpm match against the read.
        if (fromSearch) score += 0.3
        if (fromTerm) score += 3.2
        // weighted against the read: the lead genre and mood count most
        const gTop = sense.genreW ? Math.max(...Object.values(sense.genreW)) : 1
        const mTop = sense.moodW ? Math.max(...Object.values(sense.moodW)) : 1
        if (t.mood && sense.moodW?.[t.mood]) score += 2 * (sense.moodW[t.mood] / mTop)
        if (t.genre && sense.genreW?.[t.genre]) score += 1.8 * (sense.genreW[t.genre] / gTop)
        if (sense.bpm && t.bpm) {
          const c = (sense.bpm[0] + sense.bpm[1]) / 2
          const half = (sense.bpm[1] - sense.bpm[0]) / 2
          // in range scores fully, and it falls off outside rather than at a cliff
          score += Math.max(0, 1.2 - Math.max(0, Math.abs(t.bpm - c) - half) / 12)
        }
        // what the prompt ruled out stays out
        if (t.genre && sense.avoid?.includes(t.genre)) score -= 100
      }
      return { t, score }
    })
    scored.sort((a, b) => b.score - a.score)
    const top = scored.filter((x) => x.score > -50).slice(0, 30).map((x) => x.t)
    // light shuffle inside the top tier so replays differ -- except over
    // the matched artist's own tracks. The read says "the artist X", so the
    // first thing that plays has to BE X, not a remix that outscored them
    // and got shuffled forward.
    const pinned = matchedArtist ? top.filter((t) => normName(t.user.name) === promptNorm).length : 0
    for (let i = Math.min(top.length, pinned || 12) - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[top[i], top[j]] = [top[j], top[i]]
    }

    // the honest read: say what the search actually did, not a fabricated
    // vibe when it wasn't one (and vice versa).
    const read =
      mode === 'vibe'
        ? vibeRead
        : matchedArtist
          ? `read as the artist ${matchedArtist}`
          : intent.quoted
            ? `read as a track title · "${intent.query}"`
            : intent.byArtist
              ? `read as "${intent.titlePart}" by ${intent.byArtist}`
              : top.length
                ? 'read as a name · searching for it directly'
                : 'no read · searching the words themselves'

    return { tracks: top.map((t) => toTrack(t, host)), read }
  } catch {
    return { tracks: [], read: vibeRead }
  }
}

/** Search the whole platform. Ranked by plays so the top result is the one
 *  people actually listen to, not the first fuzzy match. */
export async function searchAudius(query: string, limit = 30): Promise<TrackInfo[]> {
  const q = query.trim()
  if (!q) return []
  try {
    const host = await resolveHost()
    const r = await fetch(
      `${host}/v1/tracks/search?query=${encodeURIComponent(q)}&app_name=${APP}&limit=50`,
      { signal: AbortSignal.timeout(7000) },
    )
    if (!r.ok) return []
    const d = (await r.json()) as { data?: AudiusTrack[] }
    const hits = (d.data ?? []).filter(playable)
    hits.sort((a, b) => (b.play_count ?? 0) - (a.play_count ?? 0))
    return hits.slice(0, limit).map((t) => toTrack(t, host))
  } catch {
    return []
  }
}
