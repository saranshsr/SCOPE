/**
 * The instrument: a star made of particles.
 *
 * ~38k points on a fibonacci sphere, displaced by three octaves of true 3D
 * simplex noise — organic, non-repeating turbulence, nothing like a sum of
 * sines. Bass swells the whole photosphere, mids drive the surface boil,
 * highs add fine grain, and beats kick the turbulence outward. A dense
 * gaussian core burns in the middle. Every audio parameter arrives through
 * a critically-damped spring, so the surface flows instead of strobing.
 *
 * Interactive like the reference cluster: damped hover aim, grab-to-spin
 * (free — a star has no wrong side), slow drift. Crisp by construction:
 * small points, restrained bloom, per-particle twinkle.
 */

import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js'
import { ParticleSim } from './sim'
import type { Features } from '../audio/features'

// The shell carries a RESERVE: at zoom 1 only ~55% of it renders (same
// cost as before), and zooming in spends the rest, so magnification adds
// real detail instead of magnifying gaps.
const SHELL_N = 108000
const BASE_DENSITY = 0.55
const CORE_N = 2600
const EJECTA_N = 3600
const LINK_N = 2200 // constellation segments
/* The simulator addresses particles as texels. 512x512 = 262,144 slots for
 * SHELL_N = 108,000, and the surplus is inert. The UV is BAKED into an
 * attribute rather than derived in the shader from an index: recovering an
 * exact integer at 108,000 steps is an off-by-one waiting to happen, and an
 * off-by-one here means every particle reads its neighbour's offset. */
/* How far the simulator is allowed to throw a particle, as a fraction of
 * the shader's 0.40 clamp. The body's resting radius is ~0.53, so a full
 * 0.40 throw is 75% of it.
 *
 * Went 0.3 -> 0.15 -> 0.5, and the middle number was treating a symptom.
 * At 0.3 the throw read as blow-out, but that was three other faults
 * wearing its clothes: the audio boil outran the physics 3 to 1, the
 * spring snapped matter home in 1.08s, and every particle answered
 * identically so the whole surface moved as one sheet. With the boil
 * standing down under the hand, a 2.4s spring and a 3:1 spread of
 * per-particle mass, the same amplitude reads as travel rather than as
 * noise. 0.5 puts a slash's peak near 20% of the body radius: far enough
 * to watch matter move, close enough to keep the sphere.
 *
 * A taste constant, so it is one number, and turnable live via
 * `__sc.setSimDial()`. */
const SIM_AMT = 0.5
/** the body's resting radius scale, before any burst */
const R_BASE = 0.88
const SIM_TEX = 512
/** Seconds for the star <-> aj glide. */
const VARIANT_GLIDE = 1.2
/** A new cymatic mode must be heard this long before it re-deals the
 *  sphere, and then morphs over PATTERN_MORPH. */
const PATTERN_HOLD = 0.25
const PATTERN_MORPH = 1.6
/** The snare's ripple: seconds for its front to run pole to pole. */
const AJ_RIPPLE_T = 0.42
/** How much of the groove each section of an AJ piece lets through. A break
 *  drops the drums, so the figure settles; the drop brings them back harder.
 *  These scale the RESPONSE to hits that were measured -- they never make a
 *  hit that was not played. */
const AJ_SECTION_GAIN: Record<string, number> = { intro: 0.7, groove: 1, break: 0.35, drop: 1.2, outro: 0.6 }
const AJ_SECTION_SPIN: Record<string, number> = { intro: 0.85, groove: 1, break: 0.55, drop: 1.2, outro: 0.7 }
/** Bound until a real sim is attached. NearestFilter throughout: bilinear
 *  sampling here would silently blend one particle's offset with its
 *  neighbour's. */
const BLANK_SIM = (() => {
  const t = new THREE.DataTexture(new Float32Array([0, 0, 0, 0]), 1, 1, THREE.RGBAFormat, THREE.FloatType)
  t.minFilter = THREE.NearestFilter
  t.magFilter = THREE.NearestFilter
  t.generateMipmaps = false
  t.needsUpdate = true
  return t
})()
const simU = (i: number) => ((i % SIM_TEX) + 0.5) / SIM_TEX
const simV = (i: number) => (Math.floor(i / SIM_TEX) + 0.5) / SIM_TEX
const CORONA_N = 2600 // the vocal ring
const GROUND_N = 4200 // the illuminated ground under the dissected stack

/** Ashima 3D simplex noise — the standard GLSL implementation. */
const SNOISE = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`

/**
 * CYMATICS -- the AJ variant's pattern, a real spherical harmonic.
 *
 * Sand on a Chladni plate gathers where the plate does NOT move: the nodal
 * lines. On a sphere the standing waves are the spherical harmonics Y_l^m,
 * and their nodal set is l - m circles of latitude plus m meridians. So the
 * particles are moved onto the zero set of Y, which is exactly where sand
 * would settle, and nothing is invented: the mode comes from the measured
 * dominant frequency (Scene.setVoices), and how firmly the sand settles from
 * the measured level.
 *
 * shY: fully normalised associated Legendre recurrence (the geodesy form,
 * bounded, stable to high order) times cos(m phi), divided by sqrt(2l + 1)
 * so two modes of different order blend at comparable amplitude -- the
 * morph between patterns is a blend of the two FIELDS, whose nodal set
 * moves continuously from one pattern to the other.
 *
 * cymaProject: two Newton steps along the tangent-plane gradient onto Y = 0,
 * each clamped to a fraction of the node spacing so a particle settles on
 * its NEAREST line rather than leaping across a lobe. Stateless -- no sim
 * texture, no readback -- so it costs only vertex ALU and only while uAj is
 * above zero.
 */
const CYMA = /* glsl */ `
  float shY(vec3 d, vec2 lm) {
    float x = clamp(d.y, -1.0, 1.0);
    float s = sqrt(max(0.0, 1.0 - x * x));
    float phi = atan(d.z, d.x);
    int l = int(lm.x + 0.5);
    int m = int(lm.y + 0.5);
    float fm = float(m);
    float pmm = 1.0;
    for (int i = 1; i <= 16; i++) {
      if (i > m) break;
      float fi = float(i);
      pmm *= sqrt((2.0 * fi + 1.0) / (2.0 * fi)) * s;
    }
    float res = pmm;
    if (l > m) {
      float pa = pmm;
      float pb = sqrt(2.0 * fm + 3.0) * x * pmm;
      for (int j = 2; j <= 16; j++) {
        int ll = m + j;
        if (ll > l) break;
        float fl = float(ll);
        float a = sqrt((4.0 * fl * fl - 1.0) / (fl * fl - fm * fm));
        float b = sqrt(((fl - 1.0) * (fl - 1.0) - fm * fm) / (4.0 * (fl - 1.0) * (fl - 1.0) - 1.0));
        float pc = a * (x * pb - b * pa);
        pa = pb;
        pb = pc;
      }
      res = pb;
    }
    return res * cos(fm * phi) / sqrt(2.0 * float(l) + 1.0);
  }
  float cymaF(vec3 d) {
    return mix(shY(d, uYa), shY(d, uYb), uMorph);
  }
  vec3 cymaProject(vec3 d) {
    float maxStep = 1.1 / (max(uYa.x, uYb.x) + 1.0);
    for (int it = 0; it < 2; it++) {
      vec3 ref = abs(d.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 t1 = normalize(cross(d, ref));
      vec3 t2 = cross(d, t1);
      float f0 = cymaF(d);
      float g1 = (cymaF(normalize(d + t1 * 0.01)) - f0) * 100.0;
      float g2 = (cymaF(normalize(d + t2 * 0.01)) - f0) * 100.0;
      vec2 st = -f0 * vec2(g1, g2) / (g1 * g1 + g2 * g2 + 1e-6);
      float sl = length(st);
      if (sl > maxStep) st *= maxStep / sl;
      d = normalize(d + t1 * st.x + t2 * st.y);
    }
    return d;
  }
`

const SHELL_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uTurb;
  uniform float uCalm;
  uniform float uStems;
  uniform float uExpo;
  uniform float uSnap;
  uniform float uZoom;
  uniform vec3 uGrabPos;
  uniform float uGrabStr;
  uniform float uGrabBand;
  uniform vec3 uHover;
  uniform vec3 uHoverLag;
  uniform float uHoverStr;
  uniform vec3 uEqVis;
  uniform float uBands[24];
  uniform float uDissect;
  uniform float uTiers;
  uniform float uGap;
  uniform float uTierOf[24];
  uniform float uTierLvl[6];
  uniform float uHiTier;
  attribute vec2 aSimUV;
  uniform sampler2D uSim;
  uniform float uSimAmt;
  uniform float uDrop;
  uniform float uStrong;
  uniform float uWave;
  // the typed reflexes (features.ts voices), unsprung
  uniform float uKick;
  uniform float uSnare;
  uniform float uHat;
  uniform float uSnareSeed;
  uniform float uHatN;
  // slow reads, sprung on the CPU
  uniform float uSustain;
  uniform float uCentroid;
  uniform float uTension;
  // the AJ variant
  uniform float uAj;
  uniform vec2 uYa;
  uniform vec2 uYb;
  uniform float uMorph;
  uniform float uAjAmp;
  uniform float uAjPeak;
  uniform float uAjGroove;
  uniform float uAjRip;
  uniform float uAjRipA;
  uniform float uAjRipDir;
  // paper: 1 prints the star as a stipple (see PRINT below), 0 is the ink
  // sheet, and every paper line is inside a branch on it
  uniform float uPaper;
  uniform float uPrint;
  uniform float uPrintArea;
  uniform float uDot;
  uniform float uGrow;
  uniform float uBold;
  attribute vec3 aDir;
  attribute float aHash;
  varying float vGlow;
  varying float vHash;
  varying float vAccent;
  __SNOISE__
  __CYMA__

  void main() {
    // Three octaves of drifting 3D noise: swell, boil, grain. Non-repeating
    // by construction — the field itself advects through time.
    float n1 = snoise(aDir * 2.1 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float n2 = snoise(aDir * 5.3 + vec3(uTime * 0.26, 0.0, -uTime * 0.19));
    float n3 = snoise(aDir * 11.0 + vec3(-uTime * 0.53, uTime * 0.41, 0.0));

    // Spectral anatomy: each angular sector of the body belongs to one of
    // the analyser's 24 bands — the hi-hat shimmers HERE, the bass heaves
    // THERE. Sectors rotate with the body, so the anatomy is anatomical.
    float sector = (atan(aDir.z, aDir.x) / 6.28318 + 0.5) * 24.0;
    int si = int(mod(floor(sector), 24.0));
    float bandE = uBands[si];
    // The EQ made visible: killed bands' sectors collapse dark, boosted
    // bands bulge bright. 1.0 = flat.
    float eqV = si < 8 ? uEqVis.x : si < 16 ? uEqVis.y : uEqVis.z;
    bandE *= eqV;

    float disp = (
      n1 * (0.05 + uLow * 0.30) +
      // uPulse is gone from here: the beat is an IMPULSE in the sim now,
      // and leaving it in would move the body twice for one hit -- once
      // instantly and once with follow-through. Sustain stays; the
      // transient went to the physics.
      // THE CALM END. In a quiet passage uLow/uMid/uHigh all collapse and
      // this whole sum goes to n1 * 0.05 -- a body that has stopped
      // breathing. uCalm rises as the passage falls below the track's own
      // long-run loudness, and buys back the two FINE octaves only.
      //
      // Only the fine ones, on purpose. Adding swell here would make a
      // quiet section move as much as a loud one, which is the lie Law 3
      // forbids; the star has to read as alive but SMALL. n2 advects at
      // 0.26 and n3 at 0.53, so what comes back is exactly the brief --
      // mids deforming the shape, highs as fine detail.
      //
      // The amplitudes are bounded, not chosen for taste. 0.030 + 0.022 =
      // 0.052 at full calm, and the sim's entire displacement budget is
      // 0.06. Going past that re-drowns the physics three to one, which is
      // the drowning that made the particles feel massless in the first
      // place. The calm lift has to fit UNDER the mass, never over it.
      // Only n2, the SHAPE octave. The fine octave is deliberately not
      // here: measured, adding n3 to position made the body 6.8% SMOOTHER,
      // because this is a point cloud and not a surface -- displacing
      // points scatters the density clusters that read as detail, so the
      // one thing meant to add fine detail was sanding it off. n3 does its
      // half of the brief as scintillation further down instead.
      // SUSTAIN SHAPES, TRANSIENTS STRIKE. uMid is the absolute mid level
      // and measured pinned (std 0.01..0.05 across the radio), so on its own
      // it boiled a drum loop exactly as hard as a held chord. Its share of
      // the shape octave is now split by how much of the mids PERSISTS
      // between hits: 0.16 under dry drums (their energy has its own reflexes
      // now), 0.28 under a pad. 0.24 was the old fixed weight, inside that
      // span, so ordinary programme sits where it always did.
      n2 * (uMid * (0.16 + 0.12 * uSustain) + uCalm * 0.030) +
      n3 * (uHigh * 0.13) +
      n2 * bandE * 0.20) * uTurb;
    // THE BUILD TIGHTENS THE SURFACE. Tension (energy.ts) is measured:
    // loudness, brightness and onset density climbing with the sub held
    // back. The boil draws in under it, and lets go on the drop, which is
    // the half of a drop the star never had: a release needs something to
    // release.
    disp *= (1.0 - 0.35 * uTension) * (1.0 - 0.85 * uAj);

    // THE BOIL YIELDS TO THE HAND.
    //
    // Measured on a live track: the audio noise above peaks at 0.19 of
    // displacement on a body of radius 0.53, while the simulator's whole
    // budget is 0.06. The physics was never under-tuned -- it was being
    // drowned three to one by decoration, which is also why raising its
    // gain read as blow-out instead of as weight. You cannot feel mass in
    // a surface that is already boiling harder than the thing you are
    // trying to feel.
    //
    // So the noise stands down where you touch. The radius is wider than
    // the push kernel's 0.34 so the field goes quiet slightly BEFORE it
    // starts to move, which is what makes the movement legible. Measured
    // from the resting direction rather than from p, because p does not
    // exist yet here and an approximate weight is all this needs.
    float handHush = 0.0;
    if (uHoverStr > 0.001) {
      float hd = length(aDir * uR * 0.60 - uHover);
      float hx = clamp(1.0 - hd / 0.26, 0.0, 1.0);
      handHush = hx * hx * (3.0 - 2.0 * hx) * uHoverStr;
    }
    disp *= 1.0 - handHush * 0.75;

    float eqBody = 0.52 + 0.48 * min(eqV, 1.25); // kills CAVE, boosts flare
    // Volumetric body, not a hollow shell: each particle owns a depth
    // inside the ball (surface-biased), so the face-on view is a boiling
    // solid mass like the reference, and tilting reveals real volume.
    float h2 = fract(aHash * 57.719);
    float depth = mix(0.42, 1.0, pow(h2, 0.38));

    // THE KICK: a radial swell of the core. Measured before this existed, a
    // kick moved the radius under 1% (the sprung absolute bass is pinned and
    // lags 10 frames), so a kick was only ever a flash. uKick is the low
    // region's own onset, unsprung; the interior leads the surface (1.35x at
    // the centre, 0.8x at the skin), so the hit reads as pressure from the
    // middle rather than as the whole ball being scaled.
    float kickSwell = uKick * 0.07 * mix(1.35, 0.8, depth) * (1.0 - uAj);
    // THE SNARE: the shell cracks. A thin zero set of one noise field, re-
    // dealt on every snare, flashes and lifts for the length of the hit --
    // angular veins across the surface, where the kick was radial and whole.
    float vein = 0.0;
    if (uSnare > 0.004) {
      float nc = snoise(aDir * 3.3 + vec3(uSnareSeed * 17.0, uSnareSeed * 5.0, uSnareSeed * 11.0));
      vein = (1.0 - smoothstep(0.0, 0.075, abs(nc))) * uSnare * (1.0 - uAj);
    }
    // THE HAT: glints. 7% of the skin, re-dealt on every hat, flares for the
    // hat's 60ms. Only at the surface: a hat is air, it has no depth.
    float glint = step(0.93, fract(aHash * 91.7 + uHatN * 0.618)) * uHat * smoothstep(0.75, 1.0, depth) * (1.0 - uAj);

    // The photosphere: base radius breathes with the bass; anticipation
    // (the peaks feed) raises the surface tension before a drop lands.
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp) * depth * eqBody
      * (1.0 + kickSwell + vein * 0.04) * (1.0 - uTension * 0.05);
    vec3 p = aDir * r;

    // THE AJ VARIANT. The same particles, settled onto the nodal lines of
    // the measured tone's standing wave. SETTLE is the level: loud and the
    // sand lies on the lines, quiet and it lifts off and drifts. A third of
    // the grains settle less firmly than the rest, so the lines read as
    // lines of sand, with sand between them, not as wire.
    //
    // THE GROOVE PLAYS THE PLATE. Every term below is a measured voice times
    // uAjGroove (the section's share, 0 under reduced motion), and every one
    // decays back to the figure, so between hits it reads as the same
    // Chladni figure it always was:
    //   kick  -- the plate pumps: sand jumps off the lines radially (each
    //            grain its own height, so it reads as sand, not a scaled
    //            shell) and the bands loosen toward their grains' homes;
    //   snare -- a ripple runs pole to pole along the harmonic's own axis,
    //            lifting and shoving the sand it passes;
    //   hat   -- a re-dealt sparse set of settled grains glints.
    float ajLine = 0.0;
    float ajRing = 0.0;
    float ajGlint = 0.0;
    float ajKick = 0.0;
    if (uAj > 0.001) {
      float sh = fract(aHash * 23.17);
      ajKick = uKick * uAjGroove;
      float settle = min(1.0, uAjAmp * mix(0.45, 1.0, sh * sh)) * (1.0 - ajKick * 0.36);
      vec3 cd = cymaProject(aDir);
      vec3 ad = normalize(mix(aDir, cd, settle) + vec3(n2, n3, n1) * (1.0 - settle) * 0.035);
      float ra = uR * 0.60 * (0.96 + 0.04 * depth);
      ra *= 1.0 + ajKick * (0.026 + 0.060 * fract(aHash * 41.3));
      if (uAjRip >= 0.0) {
        // latitude measured from the pole the ripple left
        float lat = acos(clamp(ad.y * uAjRipDir, -1.0, 1.0));
        float fr = (lat - uAjRip) / 0.19;
        ajRing = exp(-fr * fr) * uAjRipA;
        // lift, and a shove toward the far pole: the tangent of -pole
        vec3 pole = vec3(0.0, uAjRipDir, 0.0);
        vec3 tg = -pole + ad * dot(ad, pole);
        ad = normalize(ad + tg * ajRing * 0.035);
        ra *= 1.0 + ajRing * 0.05;
      }
      p = mix(p, ad * ra, uAj);
      ajLine = settle;
      // the hat's glints: one settled grain in fourteen, re-dealt per hat
      ajGlint = step(0.93, fract(aHash * 91.7 + uHatN * 0.618)) * uHat * uAjGroove * smoothstep(0.35, 0.7, settle);
    }

    // THE DISSECTION. Pulled apart, the star shears into stacked survey
    // rings — one per tier, frequency-honest (this particle's band decides
    // its tier), each ring still breathing with its own bands' energy.
    // Lower tiers leave first: an exploded engineering drawing, not a fade.
    float dl = 0.0;
    float tl = 1.0;
    float dustG = 0.0;
    float hiB = 1.0;
    if (uDissect > 0.001) {
      float tier = uTierOf[si];
      // The tier's OWN voice — for stems this is the stem's real post-gain
      // level, so killing a stem collapses and darkens its ring directly,
      // not via the shared spectrum. The band mapping alone can't promise
      // that: a muted vocal's energy was smeared across every tier's bands.
      tl = uTierLvl[int(min(tier, 5.0))];
      dl = clamp(uDissect * 1.15 - tier * 0.05, 0.0, 1.0);
      dl = dl * dl * (3.0 - 2.0 * dl);
      float ty = (tier - (uTiers - 1.0) * 0.5) * uGap;
      // A tier owns only its slice of the sphere's azimuth — kept as-is the
      // ring would be a crescent. Respread the slice around the FULL circle:
      // each ring becomes its own complete spectrum wheel, its 8 bands laid
      // out as angular segments that breathe independently.
      float tierW = 24.0 / uTiers;
      float th2 = ((sector - tier * tierW) / tierW) * 6.28318;
      // Differential rotation — the ring-system physics: the nested inner
      // ring shears faster than the outer (Keplerian), and dust streams
      // counter-rotate around the rim. Beats spin the whole mechanism up.
      float h3 = fract(aHash * 7.777);
      float nest = step(h3, 0.24);
      float dustG0 = step(0.78, h3);
      float spinDir = fract(aHash * 5.51) > 0.5 ? 1.0 : -1.0;
      th2 += uTime * (1.0 + uPulse * 1.5) * (
        0.02 + nest * 0.03 + dustG0 * (0.05 + 0.1 * fract(aHash * 13.31)) * spinDir);
      vec2 az = vec2(cos(th2), sin(th2));
      // The reference's silhouette: small crown, wide middle tiers, small
      // base — a sine profile over the stack, not six equal donuts.
      // THE SILHOUETTE IS A FREQUENCY IDEA, so it only applies to frequencies.
      // 0.72 + 0.48*sin() is "small crown, wide middle, small base" -- it
      // says the extremes of the SPECTRUM are narrow, which is true of sub
      // and air and meaningless for four stems. Applied to a stem stack it
      // made tiers 0 and 3 narrow for no reason, and tier 3 is vocals.
      // Measured at 4 tiers: 0.904 against 1.163 for the middle pair, a 22%
      // smaller ring, and vocals also draws the weakest band slice -- so the
      // one ring you look at when you solo vocals was the worst-formed one
      // on screen. Stems are peers; a cylinder is the honest form for them.
      float prof = mix(0.72 + 0.48 * sin(3.14159 * (tier + 0.5) / uTiers), 1.0, uStems);
      // Reality vs the survey: the CHROME stays an ideal ellipse while the
      // MATTER warps — slow angular noise bends each ring out of round,
      // band energy spikes its own arc, and hits kick the whole rim.
      float rwarp = snoise(vec3(cos(th2) * 1.7, sin(th2) * 1.7, tier * 3.7 + uTime * 0.2));
      // A STEM HAS ONE LEVEL, NOT TWENTY-FOUR.
      //
      // bandE is this sector's slice of the 24-band ladder, which is the
      // right drive for a frequency tier and an arbitrary one for a stem:
      // the map is positional, so vocals drew bands 18-23 and measured 0.282
      // against bass's 0.574 over 606 frames. Half the drive, decided by
      // nothing but where the word "vocals" sorted. Under Law 3 that is a
      // decorative number wearing a reading's clothes, and the per-sector
      // variation it produced described a spectrum the stem does not have.
      //
      // Dissected into stems, the drive is the stem's OWN measured level.
      // All four then differ by the one thing that is true about them, and a
      // loud stem reads bigger than a quiet one. The angular life does not
      // go with it -- n2, rwarp and undul are still here and are honest,
      // because they are texture and never claimed to be readings.
      //
      // Gated on uStems * dl so it applies only where it is true: the whole
      // sphere is still spectral, and so is every frequency tier.
      // 0.45 puts a stem at tl 1.0 alongside the ~0.4 a healthy band reads,
      // so the two modes stay the same size on screen.
      float ringE = mix(bandE, min(tl, 1.4) * 0.45, uStems * dl);
      float ringR = uR * (0.50 + ringE * 0.26 + n2 * 0.05 * uTurb) * eqBody * mix(1.0, depth, 0.10)
        * prof * (0.45 + 0.55 * min(tl, 1.4))
        * (1.0 + rwarp * (0.05 + uPulse * 0.08) + uSnap * 0.06);
      // The drawing's vocabulary: a quarter of each tier forms a nested
      // inner ring; a fraction loosens into scattered survey dust.
      dustG = dustG0;
      // the ring plane itself undulates with its layer's voice
      float undul = sin(th2 * 2.0 + uTime * 0.5 + tier * 2.1) * 0.03 * min(tl, 1.2);
      ringR *= mix(1.0, 0.46, nest);
      ringR *= 1.0 + dustG * (0.15 + 0.55 * fract(aHash * 3.117));
      hiB = 1.0 + step(abs(tier - uHiTier), 0.5) * 0.6;
      vec3 tp = vec3(
        az.x * ringR,
        ty + undul + n3 * (0.022 + dustG * 0.09) + (h2 - 0.5) * (0.035 + dustG * 0.34),
        az.y * ringR);
      p = mix(p, tp, dl);
    }

    // Matter parts and swells around the hand. Hover was a whole-body
    // parallax tilt and nothing else: setPointer wrote two scalars, the
    // cluster rotated, and not one of the 28 uniforms changed. The field
    // was rigid. This is the kernel scripts/hover-field.mjs has been
    // asking for since it was written — hdist/hdir/pushW are its names.
    //
    // Radial, outward from the hand, with COMPACT SUPPORT: past R nothing
    // moves at all, so touching the near side cannot make the far limb
    // flinch. Smoothstep rather than the exponential the mockup used —
    // an exponential leaks, and a field that never quite reaches zero is
    // a field the whole star feels.
    float hoverHeat = 0.0;
    if (uHoverStr > 0.001) {
      vec3 hoff = p - uHover;
      float hdist = length(hoff);
      vec3 hdir = hoff / max(hdist, 1e-4);
      float hx = clamp(1.0 - hdist / 0.18, 0.0, 1.0);
      float pushW = hx * hx * (3.0 - 2.0 * hx) * uHoverStr;
      p += hdir * pushW * uR * 0.09;
      // The wake. uHover is unsprung and uHoverLag chases it, so their
      // difference IS pointer velocity: the parting leans into the
      // direction of travel and smears behind, for one lerp and no extra
      // bookkeeping. Stop moving and it collapses on its own.
      p += (uHover - uHoverLag) * pushW * 1.6;
      hoverHeat = pushW * 0.26; // parted matter thins, so its rim brightens
    }

    // The hand in the matter. Band-selective: you grab the BASS and the
    // bass sectors' particles stream to your hand — everything else barely
    // stirs. Wider falloff + stronger pull than v1: the tendril must READ.
    // Sits after the hover block on purpose: press down and the pull takes
    // the field over from the parting, which is the right physical grammar.
    float pullHeat = 0.0;
    if (uGrabStr > 0.001) {
      float grp = si < 8 ? 0.0 : si < 16 ? 1.0 : 2.0;
      float bandW = uGrabBand < -0.5 ? 1.0 : (abs(grp - uGrabBand) < 0.5 ? 1.0 : 0.12);
      float pullW = exp(-length(p - uGrabPos) * 1.6) * uGrabStr * bandW;
      p = mix(p, uGrabPos, min(0.92, pullW));
      pullHeat = pullW * 0.55; // pulled matter burns brighter — the tendril is hot
    }

    // THE SIMULATOR'S CONTRIBUTION. Added last, on purpose: the dissect
    // remap and the grab are both CONTRACTIONS of p -- mix() toward a tier
    // pose and toward the hand -- so an offset applied before either would
    // be scaled down by (1 - dl) or erased by up to 92%. Every stage above
    // therefore computes the target pose, and the sim rides on top of it.
    //
    // Clamped, and not for tidiness. gl_PointSize divides by
    // max(0.4, -mv.z); during the boot dive the camera sits at z 0.44,
    // inside a body of radius 0.55, so an unbounded offset pushes points
    // through the near plane and every one that hits that floor becomes a
    // 6.9px blob on an additive layer feeding a bloom pass at threshold
    // 0.55. Small relative to bodyHit's hard-coded 0.88 * 0.62.
    vec3 simOff = texture2D(uSim, aSimUV).rgb * uSimAmt;
    float simLen = length(simOff);
    p += simOff * (simLen > 0.40 ? 0.40 / simLen : 1.0);

    // THE SHOCKWAVE. A ring of displacement travelling outward from the
    // core, not a uniform inflation -- inflation is what every beat
    // already does through the radius, and doing more of it on a drop
    // just reads as louder rather than as an EVENT. A wave has a front,
    // so matter moves in sequence from the middle out and the body is
    // briefly out of round, which is the thing that reads as impact.
    //
    // uWave is seconds since the drop landed. The front travels at 1.9
    // units a second and the ring is 0.22 wide; past ~0.9s it is outside
    // any particle and the term is dead, so it costs nothing between
    // drops.
    float wavePush = 0.0;
    if (uWave >= 0.0 && uWave < 0.95) {
      float rNow = length(p);
      float front = uWave * 1.9;
      // gaussian-ish ring, and it fades as it travels so the wave spends
      // itself rather than stopping dead at the edge of the body
      float ring = exp(-pow((rNow - front) / 0.22, 2.0)) * (1.0 - uWave / 0.95);
      wavePush = ring * uDrop * (1.0 - uAj);
      p += normalize(p + vec3(1e-5)) * wavePush * 0.42;
    }

    // Hot where deformed — flares glow. A slow per-particle twinkle keeps
    // the surface grainy even in still passages.
    float k = clamp(abs(disp) * 3.2, 0.0, 1.0);
    float tw = 0.72 + 0.28 * sin(uTime * (2.0 + aHash * 6.0) + aHash * 40.0);
    // Interior burns slightly dimmer than the surface — the fabric reads
    // as one mass with depth, not two nested skins.
    // Snap is unsprung: the kick flashes the frame it lands.
    // Same substitution as ringE, recomputed because that one is scoped to
    // the dissect branch. Without this the radius stopped favouring bass and
    // the brightness carried on doing it.
    float glowE = mix(bandE, min(tl, 1.4) * 0.45, uStems * dl);
    // the fine-grain scintillation also answers the spectrum's brightness:
    // an airy mix reads finer-grained than a dark one. Zero-mean like the
    // calm term, so brightness redistributes light and never adds it.
    float scint = (uCalm + uCentroid * 0.35 * (1.0 - uAj)) * n3;
    // The generic onset flash (uSnap) is down from 0.22 to 0.10: it was the
    // ONLY thing that visibly answered a hit, identically for a kick, a snare
    // and a hat. The typed reflexes carry the hit now and the snap stays as
    // the floor under onsets none of them claim (a stab, a vocal entry).
    vGlow = (0.10 + 0.40 * k + uPulse * 0.13 + uSnap * 0.10 + uKick * 0.10 * (1.0 - uAj) + glowE * 0.18) * tw * (0.55 + 0.45 * depth) * uExpo * (0.55 + 0.45 * eqV) * (1.0 + dl * 0.35) * mix(1.0, (0.28 + 0.62 * min(tl, 1.15)) * (1.0 - dustG * 0.4) * hiB, dl) * (1.0 + scint * 0.22) * (1.0 + uTension * 0.2) + (vein * 0.55 + glint * 0.9) * uExpo + pullHeat + hoverHeat + wavePush * 1.1 + uDrop * 0.10 * (1.0 - uAj);
    // AJ: settled sand is lit, drifting sand is dim; the lines read by light.
    // The accent is sparse on purpose -- one grain in six on a settled line,
    // and only while the level swells above its own slow mean (uAjPeak): the
    // pattern glints noon yellow at its peaks and is ink the rest of the time.
    // The hits light what they move: the kick a touch of pressure over the
    // whole figure, the ripple its own front, the hat its glints.
    vGlow = mix(vGlow, ((0.10 + 0.55 * ajLine) * tw * (1.0 + ajKick * 0.35) + ajRing * 0.40 + ajGlint * 1.5) * uExpo + pullHeat + hoverHeat, uAj);
    vAccent = uAj * max(uAjPeak * step(0.83, fract(aHash * 13.7)) * ajLine, ajGlint);
    vHash = aHash;

    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    // PRINT. On paper a particle is inked or it is not, so its light becomes
    // the CHANCE that it prints: each particle holds its own fixed threshold
    // (a hash, so it never flickers on its own account) and prints while its
    // glow clears it. A quiet passage prints a lighter star and a loud one a
    // denser star, and every speck that does print is a real particle moving
    // with the body -- not a screen laid over it.
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // THE COLUMN. Additive light on ink builds the ball for free: a line of
    // sight through its middle crosses more matter than one grazing the
    // limb, and the overlap adds up. A print cannot add -- a speck is inked
    // or it is not -- so the same fact is stated directly: the chance a
    // particle prints scales with the chord a sight line cuts through a
    // ball of the body's rest radius at that particle's projected distance
    // from the centre (sqrt(1 - rho^2)), a little more on the near face than
    // the far. That is the ink sheet's own brightness rule, measured, not a
    // light source invented for paper. It stands down in the dissection
    // (a stack, not a ball) and in AJ (a figure).
    float column = 1.0;
    float chord = 1.0;
    if (uPaper > 0.5) {
      vec3 rv = mat3(modelViewMatrix) * p;
      float rho = length(rv.xy) / max(1e-4, uR * 0.70 * length(modelViewMatrix[0].xyz));
      chord = pow(max(0.0, 1.0 - min(1.0, rho * rho)), 0.6);
      float face = rv.z / max(1e-4, length(rv));
      column = mix((0.3 + 0.7 * chord) * (0.8 + 0.2 * face), 1.0, max(dl, uAj));
      chord = mix(chord, 1.0, max(dl, uAj));
    }
    float printed = on * step(fract(aHash * 523.71), (1.0 - exp(-vGlow * uPrint)) * column * uPrintArea);
    gl_Position = projectionMatrix * mv;
    // A point sized 0 is not a point that is not drawn: GL clamps
    // gl_PointSize up to its minimum of 1px, so every culled particle still
    // lands as one pixel. Additive light at zero glow hides that on ink. A
    // print is a flat impression and would ink every one of them, so on
    // paper an unprinted particle is moved outside the clip volume instead.
    if (uPaper > 0.5 && printed < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    // Perspective would balloon every point as the camera closes in; the
    // zoom divisor keeps them near-crisp so detail comes from COUNT, not
    // from fatter dots.
    // SCINTILLATION -- the other half of the calm brief. n3 is the fine
    // octave, advecting at 0.53, and here it modulates each point's SIZE
    // and LIGHT instead of its position. That is what "fine detail" means
    // on a point cloud: the grain lives in the spread between neighbours,
    // so raising the variance sharpens it where moving the points blurred
    // it.
    //
    // Zero-mean on purpose, both terms. A quiet passage must not read
    // brighter or bigger than a loud one -- only more finely textured --
    // and n3 in -1..1 leaves the average point exactly where it was while
    // pulling its neighbours apart. Law 3 survives: nothing here invents
    // energy, it only redistributes what the passage already has.
    float ps = (1.0 + k * 1.5 + uPulse * 0.35 + uSnap * 0.4 + uKick * 0.25 + vein * 0.6 + glint * 1.3 + dl * 0.7 + scint * 0.45) * (1.0 - uTension * 0.12);
    ps = mix(ps, 0.9 + 0.5 * ajLine + ajRing * 0.35 + ajGlint * 1.3, uAj);
    gl_PointSize = ps * on
      * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
    // paper: a speck is one pixel or two, never a fraction -- a print has no
    // grey edge to hide a half-covered pixel in. ENERGY GROWS THE SPECK: a
    // particle's glow is the chance it takes the 2px die, so the hot core
    // prints darker and larger than the limb without ever filling solid.
    // uDot is the buffer's own pixel ratio (a speck is a CSS pixel on every
    // screen) and uGrow the budget's share of big specks (see render()).
    // uBold is the budget's second lever (printBudget()): a star with more
    // screen than the console's, or the stage, where display type sits on
    // it, takes a size step on more of its specks, hot ones first, so it
    // holds its presence without adding a single particle.
    if (uPaper > 0.5) {
      float hot = smoothstep(0.16, 0.62, vGlow) * (0.2 + 0.8 * chord);
      float big = step(fract(aHash * 71.93), max(hot * uGrow, uBold * (0.3 + 0.7 * chord)));
      float bigger = step(fract(aHash * 37.17), hot * uBold);
      gl_PointSize = on * uDot * (1.0 + big + bigger);
    }
  }
`

const SHELL_FRAG = /* glsl */ `
  precision mediump float;
  // highp: a uniform shared with the vertex stage must match its precision
  // or the program fails to link and the layer silently draws nothing
  uniform highp float uPaper;
  varying float vGlow;
  varying float vHash;
  varying float vAccent;
  void main() {
    // A real luminous profile: tight gaussian core plus a faint halo. Flat
    // discs read as blobs the moment you zoom in; this holds up magnified.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;
    // paper: a printed speck is one flat impression with an edge, no halo.
    // Its light already spent itself deciding WHETHER it prints.
    // Red is the black plate (see paperShader).
    if (uPaper > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; }
    float core = exp(-d * d * 5.0);
    float halo = smoothstep(1.0, 0.2, d) * (0.22 + vHash * 0.1);
    // noon yellow (#feee00), the one accent; zero everywhere but AJ peaks
    gl_FragColor = vec4(mix(vec3(0.93), vec3(1.0, 0.933, 0.0), clamp(vAccent, 0.0, 1.0)) * vGlow * (core + halo), 1.0);
  }
`

/** Coronal ejecta — the lifecycle layer. Spawned on beats from a ring
 *  pool (no allocation, no GC), simulated entirely in the shader with an
 *  analytic exponential-drag flight, faded and shrunk over a short life.
 *  Dead slots cost one vertex transform and zero fill. */
const EJECTA_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform float uR;
  uniform float uDensity;
  uniform float uZoom;
  uniform float uDissect;
  uniform float uPaper;
  attribute vec3 aDir;
  attribute vec3 aOrg;     // launch point — the surface, or a tier's ring
  attribute float aBirth;  // scene-time of launch; large negative = dead slot
  attribute float aSpd;
  attribute float aHash;
  varying float vFade;

  void main() {
    float age = uTime - aBirth;
    float life = 1.3 + aHash * 0.9;
    float a01 = clamp(age / life, 0.0, 1.0);
    float alive = step(0.0, age) * (1.0 - step(1.0, a01)) * step(fract(aHash * 331.7), uDensity);

    // Exponential drag: fast leave, coasting arrival. Closed-form, so a
    // dead-or-alive particle costs the same and nothing runs on the CPU.
    float k = 2.1;
    float dist = aSpd * (1.0 - exp(-k * age)) / k;
    vec3 p = aOrg + aDir * dist;

    vFade = (1.0 - a01) * (1.0 - a01) * (0.55 + uPulse * 0.25) * (1.0 - uDissect * 0.6);
    // paper: ejecta fade by THINNING -- the spray prints dense at launch and
    // sheds specks as it coasts, the way a spatter dries out at its edge
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // (and a dead slot is a clamped 1px point at the origin: clip it too)
    if (uPaper > 0.5 && alive * step(fract(aHash * 523.71), vFade * 1.6) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = (2.1 - a01 * 1.5) * alive * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`

const EJECTA_FRAG = /* glsl */ `
  precision mediump float;
  // highp: a uniform shared with the vertex stage must match its precision
  // or the program fails to link and the layer silently draws nothing
  uniform highp float uPaper;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    if (uPaper > 0.5) { gl_FragColor = vec4(1.0 - smoothstep(0.36, 0.48, length(uv)), 0.0, 0.0, 1.0); return; }
    float m = smoothstep(0.5, 0.12, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vFade * m, 1.0);
  }
`

/** Constellation wireframe — the reference cluster's LineSegments, alive.
 *  Each segment's endpoints run the SAME noise displacement as the shell,
 *  so the lattice rides the boiling surface. Subsets flash on beats via a
 *  time-rotating gate; between beats the lattice is a whisper. */
const LINK_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uTurb;
  uniform float uSnap;
  uniform float uOnsetN;
  uniform float uDissect;
  uniform float uKick;
  uniform float uSnare;
  uniform float uTension;
  uniform float uAj;
  attribute vec2 aSimUV;
  uniform sampler2D uSim;
  uniform float uSimAmt;
  attribute vec3 aDir;
  attribute float aHash;  // shared per segment
  varying float vA;
  __SNOISE__

  void main() {
    float n1 = snoise(aDir * 2.1 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float n2 = snoise(aDir * 5.3 + vec3(uTime * 0.26, 0.0, -uTime * 0.19));
    float disp = (n1 * (0.05 + uLow * 0.30) + n2 * (uMid * 0.24 + uPulse * 0.10)) * uTurb;
    // the shell's kick swell at the skin (0.07 * 0.8) and its build squeeze,
    // or the lattice lets go of the matter it is drawn between on every kick
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp) * (1.0 + uKick * 0.056 * (1.0 - uAj)) * (1.0 - uTension * 0.05);
    vec3 p = aDir * r;

    // Onset-driven: every real transient (snare, hat, stab) re-deals which
    // fifth of the lattice is armed, and the unsprung snap lights it the
    // same frame the sound happens.
    float gate = step(0.8, fract(aHash * 17.31 + uOnsetN * 0.618));
    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    // A chord between two tiers is a lie once the tiers separate.
    // The snare owns the lattice now: a crack is a structural event, and the
    // chords are the star's structure. The generic snap still arms it, at
    // less than before. Tension lights the whole lattice a little as a build
    // gathers. Gone in AJ, where the structure is the standing wave.
    vA = (0.028 + uTension * 0.03 + gate * max(max(uPulse * 0.3, uSnap * 0.3), uSnare * 0.6)) * on * (1.0 - uDissect) * (1.0 - uAj);
    // the lattice borrows each endpoint's shell slot, or the wireframe
    // detaches from the matter it is drawn between
    vec3 simOff = texture2D(uSim, aSimUV).rgb * uSimAmt;
    float simLen = length(simOff);
    p += simOff * (simLen > 0.40 ? 0.40 / simLen : 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const LINK_FRAG = /* glsl */ `
  precision mediump float;
  varying float vA;
  void main() {
    gl_FragColor = vec4(vec3(0.9), vA);
  }
`

const CORE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uZoom;
  uniform float uDissect;
  uniform float uKick;
  uniform float uAj;
  uniform float uPaper;
  uniform float uPrint;
  uniform float uPrintArea;
  uniform float uSpot;
  uniform float uDot;
  uniform float uSpotPx;
  attribute float aHash;
  attribute vec3 aSeed;
  varying float vHeat;
  varying float vSpot;

  void main() {
    // the kick lands in the furnace first: it swells and flares
    float coreR = uR * (0.16 + uLow * 0.14 + uPulse * 0.03 + uKick * 0.05 * (1.0 - uAj));
    float t = uTime * (0.4 + aHash * 1.2);
    vec3 wob = vec3(
      sin(t * 3.1 + aHash * 40.0),
      cos(t * 2.7 + aHash * 71.0),
      sin(t * 2.2 + aHash * 23.0)
    ) * coreR * (0.10 + uHigh * 0.4);
    vec3 p = aSeed * coreR + wob;
    float dist = length(p) / max(coreR * 2.2, 1e-4);
    float clump = 0.45 + 0.55 * sin(aHash * 43.7 + uTime * 0.9);
    // Dissected, there is no centre for a furnace to live in.
    vHeat = min(0.55, (1.0 - clamp(dist, 0.0, 1.0)) * (0.22 + uLow * 0.55 + uMid * 0.18 + uKick * 0.35) * (0.5 + clump)) * (1.0 - uDissect * 0.9) * (1.0 - uAj * 0.7);
    float on = step(fract(aHash * 613.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    // paper: the furnace prints at half the shell's rate. It is 2,600 points
    // in a tenth of the body's width, and printed at full rate it is the
    // first thing on the sheet to become a slab.
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + vHeat * 2.4) * on * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
    vSpot = 0.0;
    if (uPaper > 0.5) {
      float inked = on * step(fract(aHash * 523.71), (1.0 - exp(-vHeat * uPrint * 0.5)) * uPrintArea);
      // THE SPOT PLATE. The furnace is the star's hottest matter by
      // construction -- it is what the ink sheet's bloom is mostly made of.
      // On a real drop (the classifier's own uDrop, gated in printBudget())
      // its hot particles stop printing black and lay a soft disc into the
      // green channel instead; the print pass sums them and cuts the sum at
      // one level, so the yellow lands as one flat plate with a clean edge
      // under the densest heat, and a quiet track never prints it at all.
      vSpot = on * step(0.02, uSpot) * step(fract(aHash * 191.3), uSpot * smoothstep(0.04, 0.3, vHeat));
      if (inked + vSpot < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      if (vSpot > 0.5) gl_PointSize = uDot * uSpotPx;
    }
  }
`

const CORE_FRAG = /* glsl */ `
  precision mediump float;
  // highp: a uniform shared with the vertex stage must match its precision
  // or the program fails to link and the layer silently draws nothing
  uniform highp float uPaper;
  uniform float uSpotW;
  varying float vHeat;
  varying float vSpot;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    if (uPaper > 0.5) {
      // the spot's disc is WEIGHT, not colour: it sums with its neighbours
      float w = max(0.0, 1.0 - 4.0 * dot(uv, uv));
      gl_FragColor = vSpot > 0.5 ? vec4(0.0, w * w * uSpotW, 0.0, 1.0) : vec4(1.0 - smoothstep(0.36, 0.48, length(uv)), 0.0, 0.0, 1.0);
      return;
    }
    float m = smoothstep(0.5, 0.06, length(uv));
    gl_FragColor = vec4(vec3(1.0) * vHeat * m, 1.0);
  }
`

/** The corona — the vocal stem's visible voice. A tilted ring of embers
 *  around the body that only exists while a voice sings: radius breathes
 *  with it, particles drift along the ring, noise keeps it organic. Kill
 *  the vocal stem and the corona dies with it — feedback that cannot be
 *  missed. */
const CORONA_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uVocal;
  uniform float uR;
  uniform float uZoom;
  uniform float uDissect;
  uniform float uCoronaY;
  uniform float uPaper;
  attribute float aTheta;
  attribute float aHash;
  varying float vA;
  __SNOISE__

  void main() {
    float th = aTheta + uTime * (0.08 + aHash * 0.05);
    float r = uR * (0.86 + uVocal * 0.16 + 0.03 * snoise(vec3(cos(th), sin(th), uTime * 0.3) * 2.0 + aHash * 7.0));
    // a ring tilted out of the body's plane so it reads as its own object
    vec3 p = vec3(cos(th) * r, sin(th) * r * 0.42, sin(th) * r * 0.5);
    // Dissected, the corona is no longer a halo — it settles flat onto the
    // vocals' own tier and becomes that ring's fire.
    vec3 pd = vec3(cos(th) * r * 0.70, uCoronaY + sin(th * 3.0 + uTime) * 0.02, sin(th) * r * 0.70);
    p = mix(p, pd, uDissect);
    vA = uVocal * (0.25 + 0.75 * fract(aHash * 91.7)) * smoothstep(0.02, 0.2, uVocal);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.2 + uVocal * 1.6) * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
    // paper: the voice prints the ring as densely as it sings, and a ring
    // with no voice is not printed at all (see the shell on clamped points)
    if (uPaper > 0.5 && step(fract(aHash * 523.71), vA * 1.3) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
  }
`

const CORONA_FRAG = /* glsl */ `
  precision mediump float;
  // highp: a uniform shared with the vertex stage must match its precision
  // or the program fails to link and the layer silently draws nothing
  uniform highp float uPaper;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    if (uPaper > 0.5) { gl_FragColor = vec4(1.0 - smoothstep(0.36, 0.48, length(uv)), 0.0, 0.0, 1.0); return; }
    float m = smoothstep(0.5, 0.1, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vA * m, 1.0);
  }
`

/** The ground — the reference's illuminated terrain under the stack. A
 *  flat dust annulus at the base plane that only exists while dissected,
 *  glowing with the low end: the drawing sits ON something. */
const GROUND_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uDissect;
  uniform float uR;
  uniform float uLow;
  uniform float uZoom;
  uniform float uGroundY;
  uniform float uPaper;
  uniform float uPrint;
  uniform float uPrintArea;
  attribute vec3 aSeed; // r01, theta, hash
  varying float vA;
  __SNOISE__

  void main() {
    float r = uR * (0.2 + 1.15 * pow(aSeed.x, 0.62));
    float th = aSeed.y + uTime * 0.015;
    float n = snoise(vec3(cos(th) * r * 2.0, sin(th) * r * 2.0, uTime * 0.1) + aSeed.z * 9.0);
    vec3 p = vec3(cos(th) * r, uGroundY * uDissect + n * 0.018, sin(th) * r);
    float tw = 0.6 + 0.4 * sin(uTime * (1.0 + aSeed.z * 3.0) + aSeed.z * 40.0);
    // brightest under the stack, thinning outward — terrain lit from above
    vA = uDissect * (0.05 + uLow * 0.4) * (1.0 - aSeed.x * 0.75) * tw;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + aSeed.z * 0.8) * step(0.02, uDissect) * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
    // paper: the terrain prints densest under the stack, thinning outward
    // and whole, it is not there: an undissected ground is 4,200 clamped
    // pixels lying edge-on through the body's equator
    if (uPaper > 0.5 && step(0.02, uDissect) * step(fract(aSeed.z * 523.71), (1.0 - exp(-vA * uPrint)) * uPrintArea) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
  }
`

const GROUND_FRAG = /* glsl */ `
  precision mediump float;
  // highp: a uniform shared with the vertex stage must match its precision
  // or the program fails to link and the layer silently draws nothing
  uniform highp float uPaper;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    if (uPaper > 0.5) { gl_FragColor = vec4(1.0 - smoothstep(0.36, 0.48, length(uv)), 0.0, 0.0, 1.0); return; }
    float m = smoothstep(0.5, 0.15, length(uv));
    gl_FragColor = vec4(vec3(0.85) * vA * m, 1.0);
  }
`

/** THE PAPER GROUND AND ITS INK, as the raw bytes the canvas will show.
 *  styles.css carries the same two values as --ground and --ink under
 *  :root[data-theme='paper']; the stage is a hole in that plate, so the GL
 *  paper and the DOM paper must be ONE value or the hole reads as a window
 *  onto a second sheet.
 *
 *  Vector3, not THREE.Color, and that is the whole fix for "two papers".
 *  The old pass built `new THREE.Color(0xecebe6)` at MODULE LOAD, before
 *  the constructor sets ColorManagement.enabled = false, so three converted
 *  the hex to linear light and the pass then wrote that linear value to a
 *  canvas declared LinearSRGB: #ecebe6 arrived as #d6d4ca, and the ink as
 *  #010101. Raw numbers cannot be colour-managed. Exported so the PiP crop
 *  can fill its margins with the same bytes. */
export const PAPER_RGB = [240, 235, 224] as const
/** The desktop console at 1440x900 spends the print budget in full: this is
 *  its body radius in CSS pixels. A smaller star prints fewer specks, a
 *  larger one grows more of them to 2px (see printBudget()). */
const PRINT_R = 396
export const PAPER_INK_RGB = [17, 16, 16] as const
/** --pl-line, the plate's rule, for the construction ring */
const PAPER_LINE_RGB = [135, 129, 117] as const

/** The 'paper' theme: letterpress, not an inverted photograph.
 *
 *  The old pass read the finished (bloomed, after-imaged) dark frame and
 *  repainted it with `smoothstep(0.04, 0.38, L)`. Only a third of the
 *  input range carried any tone, so everything above L 0.38 was one flat
 *  black: 51% of the star box on the stage, 91% on the phone sheet, a disc
 *  at a drop. The bloom halo that is invisible on black became grey pepper,
 *  and the afterimage trails that read as light on black read as pen
 *  scratches. On ink the hottest part of the star is the brightest; on
 *  that paper it was a hole.
 *
 *  So in paper the bloom and the afterimage do not run (see setTheme), and
 *  the particles themselves decide the print (SHELL_VERT, PRINT): each one
 *  is inked or it is not, its glow is the chance that it is, and its glow
 *  again is the chance it prints at 2px instead of 1. Density and speck
 *  size build the form; the budget in render() keeps any size of star from
 *  flooding. This pass only has to lay the plates down, in order:
 *
 *   paper -> the construction ring -> the yellow spot plate -> the black.
 *
 *  The frame arrives as PLATES, not as light: red is the black plate, green
 *  the yellow spot. The spot survives only where its discs have merged into
 *  a field (the neighbourhood test), which is what confines it to the
 *  hottest CLUSTER rather than dotting every hot particle.
 *
 *  THE CONSTRUCTION RING is a reading, not an ornament: the body's live
 *  radius (uR at the bass-driven photosphere, R_BASE's 0.60 term) projected
 *  to the buffer, drawn as a chain line with a centre cross -- how a
 *  draughtsman would state "this is a sphere, this big". It gives the flat
 *  stipple back its limb. It sits under every speck, in the plate's rule
 *  colour at a fraction, and stands down as the body is dissected (the
 *  survey draws its own rings) or dives.
 *
 *  The ink is one flat value, the plate's own --ink, and the yellow the
 *  plate's own --mark. The paper's tooth is the DOM's (.grain), laid over
 *  the stage and the plate alike so the two stay one sheet. */
function paperShader() {
  return {
    uniforms: {
      tDiffuse: { value: null },
      uPaper: { value: new THREE.Vector3(PAPER_RGB[0] / 255, PAPER_RGB[1] / 255, PAPER_RGB[2] / 255) },
      uInk: { value: new THREE.Vector3(PAPER_INK_RGB[0] / 255, PAPER_INK_RGB[1] / 255, PAPER_INK_RGB[2] / 255) },
      uMark: { value: new THREE.Vector3(254 / 255, 238 / 255, 0) },
      uLine: { value: new THREE.Vector3(PAPER_LINE_RGB[0] / 255, PAPER_LINE_RGB[1] / 255, PAPER_LINE_RGB[2] / 255) },
      // one buffer pixel, in uv: the neighbourhood is measured in PIXELS so
      // a speck is a speck at any resolution
      uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
      // the ring: centre x, y and radius in buffer pixels; its strength;
      // and the buffer's pixel ratio, so the line is one CSS pixel
      uRing: { value: new THREE.Vector3(0, 0, 0) },
      uRingA: { value: 0 },
      uDot: { value: 1 },
      // the spot plate's cut: the summed weight of hot discs a pixel needs
      uSpotT: { value: 0.35 },
      // REGISTER: the yellow plate's offset from the black, in uv; how far
      // its tint impression has come in (0..1); and the black density at
      // which that tint's dots reach full size (see printBudget). Zero
      // offset and zero tint is a press in perfect register.
      uReg: { value: new THREE.Vector2(0, 0) },
      uRegA: { value: 0 },
      uRegCut: { value: 0.2 },
      // the black's tone for the tint, measured at quarter area by
      // TintDensityPass (bound in the Scene constructor)
      tDensity: { value: null as THREE.Texture | null },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform vec3 uPaper;
      uniform vec3 uInk;
      uniform vec3 uMark;
      uniform vec3 uLine;
      uniform vec2 uTexel;
      uniform vec3 uRing;
      uniform float uRingA;
      uniform float uDot;
      uniform float uSpotT;
      uniform vec2 uReg;
      uniform float uRegA;
      uniform float uRegCut;
      uniform sampler2D tDensity;
      varying vec2 vUv;
      void main() {
        vec2 c = texture2D(tDiffuse, vUv).rg;
        vec3 col = uPaper;
        // the construction ring and its centre cross, in CSS pixels
        if (uRingA > 0.001) {
          vec2 px = (vUv / uTexel - uRing.xy) / uDot;
          float r = uRing.z / uDot;
          float d = length(px);
          // a chain line: long dash, gap, short dash, gap -- 18px a period,
          // walked in arc length so the dashes hold their size at any radius
          float s = mod((atan(px.y, px.x) + 3.14159265) * r, 18.0);
          float chain = step(s, 10.0) + step(13.0, s) * step(s, 15.0);
          float ring = step(abs(d - r), 0.5) * chain;
          // the centre: a cross of 9px arms with the middle left open
          vec2 a = abs(px);
          float cross = (step(a.y, 0.5) * step(a.x, 9.0) + step(a.x, 0.5) * step(a.y, 9.0)) * step(2.5, max(a.x, a.y));
          col = mix(col, uLine, clamp(max(ring, cross), 0.0, 1.0) * uRingA);
        }
        // the yellow plate is pulled from the frame at the register offset
        // (zero in register): everything on it is read at q, not vUv
        vec2 q = vUv - uReg;
        // the spot plate: the hot particles' soft discs summed into a
        // density field, cut at one level -- a flat plate with a clean edge
        // wherever the hottest matter crowds, and nowhere else
        bool yellow = texture2D(tDiffuse, q).g > uSpotT;
        // the TINT plate, only while register is dialled in: a screened
        // yellow impression of the black image, slipped off it. Not a copy
        // of the specks -- that, slipped two pixels, is a yellow fringe on
        // every speck, chromatic aberration, a fault in the file and not
        // the press. A printer would separate the black's TONE: its density
        // over an 11 css px disc (24 taps on a golden-angle spiral), screened
        // as a 4 css px halftone at 0deg, the angle yellow is given because
        // it is the colour the eye resolves least. The dots grow with the
        // density toward 36% coverage, so the body carries a pale ground of
        // yellow that thins out at the limb, and the slip shows where it
        // should: a lip of yellow past the black at the down-right edge, a
        // margin of bare paper at the top-left.
        //
        // The density itself is NOT measured here. 24 taps a pixel, on
        // every pixel of a 2x buffer, more than doubled paper's frame (2.9
        // ms at REG 0 against 6.4-7.1 with the tint in, feel audit) -- for
        // a field that is a blur over 11 css px and cannot change inside 2.
        // TintDensityPass measures it once per 2x2 css px, the same 24-tap
        // spiral, and this reads it back with one filtered tap. And only
        // where it can show: a pixel the black plate is about to cover
        // (c.x > 0.5) never needs its tint.
        if (!yellow && uRegA > 0.001 && c.x <= 0.5) {
          float f = smoothstep(0.02, uRegCut, texture2D(tDensity, q).r) * 0.36 * uRegA;
          // the screen is on the plate, so it travels with the slip
          vec2 g = fract(q / uTexel / (4.0 * uDot)) - 0.5;
          yellow = length(g) < sqrt(f / 3.14159265);
        }
        if (yellow) col = uMark;
        // the black plate, last: a speck prints over everything under it
        if (c.x > 0.5) col = uInk;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  }
}

/** Critically-damped smoother — fast attack, settle without overshoot. */
class Env {
  v = 0
  private vel = 0
  update(target: number, dt: number, omega: number) {
    const x = this.v - target
    const t = (this.vel + omega * x) * dt
    this.v = target + (x + t) * Math.exp(-omega * dt)
    this.vel = (this.vel - omega * t) * Math.exp(-omega * dt)
    return this.v
  }
}

/** THE TINT'S TONE, measured once per 2x2 css px instead of per pixel.
 *
 *  The REG tint plate screens the black plate's DENSITY: the share of
 *  speck over an 11 css px disc, 24 taps on a golden-angle spiral. That
 *  estimate used to run inside the paper pass, per pixel -- 24 texture
 *  reads on each of 5.2M pixels of a 2x buffer -- and it more than doubled
 *  paper's frame. But it is a blur 22 px across: sampled every 2 css px
 *  and filtered back up it is the same field, and the screen that turns it
 *  into dots is 4 css px, coarser still. So this pass runs the same spiral
 *  into a target a quarter the area in css terms (a sixteenth of the 2x
 *  buffer's pixels) and the paper pass reads it with one bilinear tap.
 *
 *  The spiral's offsets are constants, computed here once -- no per-pixel
 *  cos, sin or sqrt -- in css px, scaled to the buffer by uDot x uTexel.
 *  It writes nothing to the composer's buffers (needsSwap = false): it
 *  only reads the frame the paper pass is about to read, and is enabled
 *  only while the tint is in (printBudget), so REG 0 costs nothing. */
const TINT_TAPS = 24
const TINT_R = 11
class TintDensityPass extends Pass {
  readonly target: THREE.WebGLRenderTarget
  private quad: FullScreenQuad
  private mat: THREE.ShaderMaterial
  /** buffer px per css px, from printBudget (the paper pass's own uDot) */
  dot = 1
  constructor() {
    super()
    this.needsSwap = false
    this.target = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    })
    const taps: THREE.Vector2[] = []
    for (let i = 0; i < TINT_TAPS; i++) {
      const fi = i + 0.5
      const a = fi * 2.39996323
      const rr = Math.sqrt(fi / TINT_TAPS) * TINT_R
      taps.push(new THREE.Vector2(Math.cos(a) * rr, Math.sin(a) * rr))
    }
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uTaps: { value: taps },
        // one css px, in the SOURCE buffer's uv
        uCss: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform vec2 uTaps[${TINT_TAPS}];
        uniform vec2 uCss;
        varying vec2 vUv;
        void main() {
          float tint = 0.0;
          for (int i = 0; i < ${TINT_TAPS}; i++) tint += texture2D(tDiffuse, vUv + uTaps[i] * uCss).r;
          gl_FragColor = vec4(vec3(tint / ${TINT_TAPS}.0), 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
    })
    this.quad = new FullScreenQuad(this.mat)
  }
  render(renderer: THREE.WebGLRenderer, _write: THREE.WebGLRenderTarget, read: THREE.WebGLRenderTarget) {
    // one texel per 2 css px, whatever the device ratio
    const step = 2 * Math.max(1, this.dot)
    const w = Math.max(1, Math.ceil(read.width / step))
    const h = Math.max(1, Math.ceil(read.height / step))
    if (this.target.width !== w || this.target.height !== h) this.target.setSize(w, h)
    this.mat.uniforms.tDiffuse.value = read.texture
    ;(this.mat.uniforms.uCss.value as THREE.Vector2).set(this.dot / read.width, this.dot / read.height)
    renderer.setRenderTarget(this.target)
    this.quad.render(renderer)
  }
  dispose() {
    this.target.dispose()
    this.mat.dispose()
    this.quad.dispose()
  }
}

export class Scene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private cluster = new THREE.Group()
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private after!: AfterimagePass
  private paper!: ShaderPass
  /** the REG tint's density, a quarter-area pre-pass (see TintDensityPass) */
  private tintDensity!: TintDensityPass
  /** the constellation, which paper does not print (see setTheme) */
  private links!: THREE.LineSegments
  private _theme: 'ink' | 'paper' = 'ink'
  /** Owner dial, 0.25..2: scales the drift/spin rate. */
  spinDial = 1
  private uniforms: Record<string, THREE.IUniform>
  private lowE = new Env()
  private midE = new Env()
  private highE = new Env()
  private pulseE = new Env()
  private sustainE = new Env()
  private centroidE = new Env()
  private tensionE = new Env()
  private ajAmpE = new Env()
  /** raw targets from setVoices, sprung in render() */
  private sustainT = 0
  private centroidT = 0
  private tensionT = 0
  private kickPrev = 0
  private snarePrev = 0
  private hatPrev = 0
  /** the variant glide: linear 0..1 progress, eased on the way out */
  private ajT = 0
  private ajGo = 0
  /** cymatic mode bookkeeping. The shown pattern morphs A -> B; a new
   *  target has to hold for PATTERN_HOLD before it is allowed to start a
   *  morph, or a bell's attack would re-deal the whole sphere. */
  private modeA = { l: 6, m: 3 }
  private modeB = { l: 6, m: 3 }
  private modeCand = { l: 6, m: 3 }
  private modeCandFor = 0
  private morphT = 1
  private ajLevel = 0
  private ajSlow = 0
  /** seconds since the last kick or snare: are drums playing */
  private ajDrumsAgo = 99
  private ajHz = 0
  /** what AJ says it is PLAYING: the chord root, the tempo, the section.
   *  Root 0 = not given, and the detector's pitch stands in. */
  private ajRoot = 0
  private ajBpm = 0
  private ajSection = ''
  /** the bass against its own mean (bandsRel 0..3), for how tight the sand */
  private ajBass = 0.5
  private ajGrooveE = new Env()
  /** the ripple: seconds since the snare that launched it, -1 idle */
  private ripT = -1
  private ripA = 0
  private aheadE = new Env()
  private dissectE = new Env()
  private dissectTarget = 0
  private tierCount = 6
  private lastDis = 0
  private _v = new THREE.Vector3()
  private ejecta!: { dir: THREE.BufferAttribute; org: THREE.BufferAttribute; birth: THREE.BufferAttribute; spd: THREE.BufferAttribute; cursor: number }
  private ptr = { x: 0, y: 0, tx: 0, ty: 0 }
  /** 0..1 presence of the hand; the shader's strength chases this */
  private hoverT = 0
  /** the GPGPU field. null only if the GPU refused float render targets. */
  private sim: ParticleSim | null = null
  /** scratch, so the per-frame hand velocity allocates nothing */
  private simVel = new THREE.Vector3()
  private simAxis = new THREE.Vector3()
  /** how hard the hand is working, from its own speed, decaying */
  private handHeat = 0
  /** Live multiplier on SIM_AMT, so the throw can be judged on real
   *  hardware rather than guessed at: `__sc.setSimDial(0)` is today's
   *  star exactly, 3 is the ceiling. */
  private simDial = 1
  private drag = { x: 0, y: 0, tx: 0, ty: 0 }
  private driftT = 0
  private born = performance.now()
  private t = 0
  private focusFrac = 0.5
  private focusTx = 0.5
  /** Vertical aim, and the frame dolly: >1 pushes the camera back so the
   *  body fits inside the standby poster's image cell. */
  private focusFracY = 0.5
  private focusTy = 0.5
  private dolly = 1
  private dollyT = 1
  /** power-on spin-up, and the previous aim the motion readout differences */
  private bootRev = 0
  private mPrev = { x: 0, y: 0, gx: 0, gy: 0 }
  private quality = 1
  /** Camera zoom, 1..5. Damped toward zoomTarget every frame. */
  private zoom = 1
  private zoomTarget = 1
  /** Reduced-motion visitors get a still star that still hears the music —
   *  the boil is content, the spin is decoration. */
  private calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  private lastW = 2
  private lastH = 1
  private lastDpr = 0

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
    // Display-space pipeline (the composer double-encoded sRGB and washed
    // the frame grey — measured at the glass): what we set is what shows.
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    THREE.ColorManagement.enabled = false
    this.renderer.setClearColor(0x0a0a0a, 1)
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20)
    this.camera.position.z = 1 / Math.tan((40 / 2) * (Math.PI / 180))
    this.scene.add(this.cluster)

    this.uniforms = {
      uTime: { value: 0 },
      uLow: { value: 0 },
      uMid: { value: 0 },
      uHigh: { value: 0 },
      uPulse: { value: 0 },
      uAhead: { value: 0 },
      uR: { value: 1 },
      uReveal: { value: 0 },
      // Adaptive quality: fraction of particles allowed to render. The
      // app's frame loop lowers this on hardware that can't hold 60.
      uDensity: { value: 1 },
      // Owner dials: turbulence and exposure multipliers (spin lives on the
      // CPU side of the motion law).
      uTurb: { value: 1 },
      uCalm: { value: 0 },
      uStems: { value: 0 },
      uExpo: { value: 1 },
      // The transient fast-path: sub-frame attack, ~150ms decay, NO spring.
      uSnap: { value: 0 },
      uZoom: { value: 1 },
      // The grab: a point in cluster-local space that attracts nearby
      // matter, and per-band-group EQ visual multipliers (low/mid/high).
      uGrabPos: { value: new THREE.Vector3() },
      uGrabStr: { value: 0 },
      uGrabBand: { value: -1 }, // 0 low / 1 mid / 2 high / -1 all
      // THE HAND IN THE FIELD. uHover is the raw pointer, unsprung —
      // easing the position is what makes a thing stop feeling like
      // something you are touching. Only its PRESENCE is damped.
      // uHoverLag is a lagging copy, so their difference is velocity.
      uHover: { value: new THREE.Vector3() },
      uHoverLag: { value: new THREE.Vector3() },
      uHoverStr: { value: 0 },
      // THE SIMULATOR. uSim is bound to a 1x1 black texel until a sim is
      // attached: an unbound sampler is undefined behaviour, and the whole
      // product hangs off this one canvas. uSimAmt at 0 makes the plumbing
      // a no-op that can be A/B'd against the pre-sim build without a
      // rebuild -- and is what reduced-motion and the boot dive turn down.
      uSim: { value: BLANK_SIM },
      uSimAmt: { value: 0 },
      /* THE BURST. uDrop and uStrong are 0..1 envelopes with a fast
       * attack and an eased decay, set from the energy classifier. uWave
       * is seconds since the last drop landed, negative when there has
       * not been one, and it drives a ring of displacement travelling
       * outward through the body. Kept separate from uPulse and uSnap
       * because those are per-beat and these are per-EVENT: a small beat
       * must produce a small reaction and only a genuine drop the large
       * one, which is the whole point. */
      uDrop: { value: 0 },
      uStrong: { value: 0 },
      uWave: { value: -1 },
      /* THE TYPED REFLEXES. Each is a 0..1 envelope from its own region's
       * onset detector in features.ts -- kick, snare, hat -- and each moves
       * the body its own way: the kick swells the core radially, the snare
       * cracks the shell into veins and owns the lattice, the hat glints
       * the skin. Unsprung, like uSnap: a spring would put the reflex
       * frames behind the sound it answers. The seeds re-deal WHICH veins
       * and glints on each hit, so no two hits draw the same figure. */
      uKick: { value: 0 },
      uSnare: { value: 0 },
      uHat: { value: 0 },
      uSnareSeed: { value: 0 },
      uHatN: { value: 0 },
      // slow reads, sprung here: sustain (pads turn the boil and the spin),
      // spectral centroid (grain), and the build's tension (energy.ts)
      uSustain: { value: 0 },
      uCentroid: { value: 0 },
      uTension: { value: 0 },
      /* THE AJ VARIANT: 0 = the star, 1 = cymatics. uYa/uYb are two
       * spherical-harmonic modes (l, m) and uMorph blends their fields;
       * uAjAmp is how firmly the sand settles (the measured level), uAjPeak
       * the swell that lets the lines glint yellow. */
      uAj: { value: 0 },
      uYa: { value: new THREE.Vector2(6, 3) },
      uYb: { value: new THREE.Vector2(6, 3) },
      uMorph: { value: 0 },
      uAjAmp: { value: 0 },
      uAjPeak: { value: 0 },
      /* the groove on the plate: the section's share of the drums' response
       * (0 under reduced motion), and the snare ripple -- its front as a
       * polar angle (-1 idle), its strength, and which pole it left */
      uAjGroove: { value: 0 },
      uAjRip: { value: -1 },
      uAjRipA: { value: 0 },
      uAjRipDir: { value: 1 },
      // The vocal voice: 0 = no corona; rises with vocal-stem presence.
      uVocal: { value: 0 },
      // THE DISSECTION: 0 = one star, 1 = exploded survey stack. Spring-
      // damped here; the app only sets the target.
      uDissect: { value: 0 },
      uTiers: { value: 6 },
      uGap: { value: 1.95 / 5 },
      // band index -> tier index. Default: the spectral anatomy itself
      // (low/mid/high), so dissection works on ANY source, stems or not.
      uTierOf: { value: new Float32Array(24).map((_, i) => Math.floor(i / 4)) },
      // row<->ring linkage: the highlighted tier burns brighter (-1 none).
      uHiTier: { value: -1 },
      // each tier's live voice (stems: real post-gain rms; spectral: kill
      // state) — the caller smooths, the shader only reads.
      uTierLvl: { value: new Float32Array(6).fill(1) },
      // where the vocals tier sits (cluster-local y), for the corona.
      uCoronaY: { value: 0 },
      // the ground plane's altitude (cluster-local y at full dissection).
      uGroundY: { value: -1.15 },
      uEqVis: { value: new THREE.Vector3(1, 1, 1) },
      // The full analyser: 24 log bands, mapped to angular sectors of the
      // body — the star's spectral anatomy.
      uBands: { value: new Float32Array(24) },
      // Onset counter rotates which constellations arm.
      uOnsetN: { value: 0 },
      // PAPER. 0 is the ink sheet and every paper line in every shader sits
      // behind a branch on it. uPrint turns a particle's light into the
      // chance it prints: 1 - exp(-glow * uPrint).
      uPaper: { value: 0 },
      uPrint: { value: 9 },
      // THE PRINT BUDGET. The same 60,000 points land in whatever area the
      // body covers, so a small star (the phone sheet, the standby cell)
      // has several times as many particles per pixel as the desktop one,
      // and printed at the same rate it floods. This is the body's area on
      // screen against the desktop console's, capped at 1 and set per frame,
      // so every size of star prints at the same density of specks.
      uPrintArea: { value: 1 },
      // a speck's side in buffer pixels (the buffer's pixel ratio), the
      // share of hot specks that print at twice that, and the spot plate's
      // gate (0 = the star is pure black)
      uDot: { value: 1 },
      uGrow: { value: 0.5 },
      uBold: { value: 0 },
      uSpot: { value: 0 },
      // the spot plate's disc (CSS px) and its weight, which falls with the
      // disc's area so the cut in the print pass means the same density
      uSpotPx: { value: 72 },
      uSpotW: { value: 0.25 * (22 / 72) ** 2 },
    }

    // --- the shell: fibonacci sphere ----------------------------------------
    {
      const dir = new Float32Array(SHELL_N * 3)
      const hash = new Float32Array(SHELL_N)
      const pos = new Float32Array(SHELL_N * 3)
      const suv = new Float32Array(SHELL_N * 2)
      const GA = Math.PI * (3 - Math.sqrt(5)) // golden angle
      for (let i = 0; i < SHELL_N; i++) {
        const y = 1 - (i / (SHELL_N - 1)) * 2
        const rad = Math.sqrt(1 - y * y)
        const th = GA * i
        dir[i * 3] = Math.cos(th) * rad
        dir[i * 3 + 1] = y
        dir[i * 3 + 2] = Math.sin(th) * rad
        hash[i] = Math.random()
        // aHash cannot serve as the slot: it is Math.random(), so it is
        // neither injective nor stable across loads, and eight separate
        // fract(aHash * K) decorrelations already read it.
        suv[i * 2] = simU(i)
        suv[i * 2 + 1] = simV(i)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', new THREE.BufferAttribute(dir, 3))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      geo.setAttribute('aSimUV', new THREE.BufferAttribute(suv, 2))
      // The simulator springs back to the RESTING photosphere, not to the
      // live one: the shader's radius breathes with the bass, and chasing
      // that would mean re-uploading 4MB of base positions every frame to
      // shift a falloff weight by a fraction of the 0.34 radius. 0.60 is
      // the shader's own base term, 0.88 its uR at rest.
      const rest = new Float32Array(SHELL_N * 3)
      for (let i = 0; i < SHELL_N * 3; i++) rest[i] = dir[i] * 0.88 * 0.6
      this.sim = new ParticleSim(this.renderer, SHELL_N, rest)
      if (this.sim.active) this.uniforms.uSim.value = this.sim.offsetTexture
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: SHELL_VERT.replace('__SNOISE__', SNOISE).replace('__CYMA__', CYMA),
        fragmentShader: SHELL_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
    }

    // --- the core ------------------------------------------------------------
    {
      const seed = new Float32Array(CORE_N * 3)
      const hash = new Float32Array(CORE_N)
      const pos = new Float32Array(CORE_N * 3)
      for (let i = 0; i < CORE_N; i++) {
        // Shell-biased 3D ball: structure and cracks, not a white blob.
        const u = Math.random() * Math.PI * 2
        const v = Math.acos(2 * Math.random() - 1)
        const rr = 0.45 + Math.pow(Math.random(), 0.45) * 0.85
        seed[i * 3] = Math.sin(v) * Math.cos(u) * rr
        seed[i * 3 + 1] = Math.sin(v) * Math.sin(u) * rr
        seed[i * 3 + 2] = Math.cos(v) * rr
        hash[i] = Math.random()
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: CORE_VERT,
        fragmentShader: CORE_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
    }

    // --- the ejecta pool -------------------------------------------------
    {
      const dir = new Float32Array(EJECTA_N * 3)
      const org = new Float32Array(EJECTA_N * 3)
      const birth = new Float32Array(EJECTA_N).fill(-1e4) // all dead
      const spd = new Float32Array(EJECTA_N)
      const hash = new Float32Array(EJECTA_N)
      const pos = new Float32Array(EJECTA_N * 3)
      for (let i = 0; i < EJECTA_N; i++) hash[i] = Math.random()
      const geo = new THREE.BufferGeometry()
      const aDir = new THREE.BufferAttribute(dir, 3)
      const aOrg = new THREE.BufferAttribute(org, 3)
      const aBirth = new THREE.BufferAttribute(birth, 1)
      const aSpd = new THREE.BufferAttribute(spd, 1)
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', aDir)
      geo.setAttribute('aOrg', aOrg)
      geo.setAttribute('aBirth', aBirth)
      geo.setAttribute('aSpd', aSpd)
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: EJECTA_VERT,
        fragmentShader: EJECTA_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
      this.ejecta = { dir: aDir, org: aOrg, birth: aBirth, spd: aSpd, cursor: 0 }
    }

    // --- the constellation ---------------------------------------------
    {
      const GA = Math.PI * (3 - Math.sqrt(5))
      const dirOf = (i: number) => {
        const y = 1 - (i / (SHELL_N - 1)) * 2
        const rad = Math.sqrt(1 - y * y)
        const th = GA * i
        return [Math.cos(th) * rad, y, Math.sin(th) * rad]
      }
      const dir = new Float32Array(LINK_N * 2 * 3)
      const hash = new Float32Array(LINK_N * 2)
      const pos = new Float32Array(LINK_N * 2 * 3)
      // On a fibonacci lattice, index deltas of 1/13/21 land on spatial
      // neighbours — short chords, never random cross-sphere slashes.
      const DELTAS = [1, 13, 21]
      const lsuv = new Float32Array(LINK_N * 2 * 2)
      for (let s = 0; s < LINK_N; s++) {
        const i = Math.floor(Math.random() * (SHELL_N - 22))
        const j = i + DELTAS[(Math.random() * DELTAS.length) | 0]
        const h = Math.random()
        const a = dirOf(i)
        const b = dirOf(j)
        dir.set(a, s * 6)
        dir.set(b, s * 6 + 3)
        hash[s * 2] = h
        hash[s * 2 + 1] = h
        // each endpoint borrows the slot of the shell particle it is drawn
        // between, or the lattice detaches from the matter it describes
        lsuv[s * 4] = simU(i)
        lsuv[s * 4 + 1] = simV(i)
        lsuv[s * 4 + 2] = simU(j)
        lsuv[s * 4 + 3] = simV(j)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aDir', new THREE.BufferAttribute(dir, 3))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      geo.setAttribute('aSimUV', new THREE.BufferAttribute(lsuv, 2))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: LINK_VERT.replace('__SNOISE__', SNOISE),
        fragmentShader: LINK_FRAG,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      })
      this.links = new THREE.LineSegments(geo, mat)
      this.cluster.add(this.links)
    }

    // --- the corona --------------------------------------------------------
    {
      const theta = new Float32Array(CORONA_N)
      const hash = new Float32Array(CORONA_N)
      const pos = new Float32Array(CORONA_N * 3)
      for (let i = 0; i < CORONA_N; i++) {
        theta[i] = (i / CORONA_N) * Math.PI * 2
        hash[i] = Math.random()
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aTheta', new THREE.BufferAttribute(theta, 1))
      geo.setAttribute('aHash', new THREE.BufferAttribute(hash, 1))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: CORONA_VERT.replace('__SNOISE__', SNOISE),
        fragmentShader: CORONA_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
    }

    // --- the ground ---------------------------------------------------------
    {
      const seed = new Float32Array(GROUND_N * 3)
      const pos = new Float32Array(GROUND_N * 3)
      for (let i = 0; i < GROUND_N; i++) {
        seed[i * 3] = Math.random()
        seed[i * 3 + 1] = Math.random() * Math.PI * 2
        seed[i * 3 + 2] = Math.random()
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3))
      const mat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: GROUND_VERT.replace('__SNOISE__', SNOISE),
        fragmentShader: GROUND_FRAG,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      this.cluster.add(new THREE.Points(geo, mat))
    }

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    // Phosphor persistence: the frame smears into itself like a slow CRT,
    // heavier when the bass leans in. Before bloom, so trails glow too.
    this.after = new AfterimagePass(0.82)
    this.composer.addPass(this.after)
    // Tight bloom: crisp particles first, halo second.
    this.bloom = new UnrealBloomPass(new THREE.Vector2(2, 2), 0.4, 0.25, 0.55)
    this.composer.addPass(this.bloom)
    // The paper remap: last in the chain, so it repaints whatever bloom and
    // afterimage actually produced. Disabled by default — `enabled = false`
    // makes EffectComposer skip it outright (see EffectComposer.render()),
    // so the 'ink' theme is not just visually unchanged but literally the
    // same draw calls as before this pass existed.
    this.paper = new ShaderPass(paperShader())
    this.paper.enabled = false
    // the tint's tone, measured just before the paper pass reads the same
    // frame; off until REG asks for it (printBudget), and off on ink
    this.tintDensity = new TintDensityPass()
    this.tintDensity.enabled = false
    this.composer.addPass(this.tintDensity)
    this.paper.uniforms.tDensity.value = this.tintDensity.target.texture
    this.composer.addPass(this.paper)
    // Without this the uniform keeps its initial 1 and the whole reserve
    // renders at zoom 1 — double the intended cost, zero headroom left.
    this.applyDensity()
    if (import.meta.env.DEV) (window as unknown as { __scene: Scene }).__scene = this
  }

  get bloomPass() {
    return this.bloom
  }

  /** The full analyser feed — 24 log bands into the anatomy. */
  setBands(bands: Float32Array) {
    const u = this.uniforms.uBands.value as Float32Array
    for (let i = 0; i < 24; i++) u[i] = bands[i]
  }

  /** A real transient happened — re-deal the armed constellations. */
  onset() {
    this.uniforms.uOnsetN.value = (this.uniforms.uOnsetN.value + 1) % 4096
  }

  /** THE PRINT BUDGET, per frame, and the plates' registration.
   *
   *  The same 60,000 points land in whatever area the body covers, so a
   *  small star (the phone sheet, the standby cell) has several times as
   *  many particles per pixel as the desktop one and, printed at the same
   *  rate, floods; a large one (the stage) spreads them thin and thins to
   *  dust. `cov` is the body's area on screen against the desktop
   *  console's, in CSS pixels. Below 1 it cuts the COUNT; above 1 the count
   *  is already whole, so it grows the SPECK instead (uBold): more specks
   *  take the 2px die and the hot ones the 3px, saturating
   *  (cap * (1 - exp(-x / cap))) so a big star gains presence and never
   *  fills. The stage asks for the same lever (setStagePrint).
   *
   *  The ring is the body's live photosphere (uR x (0.60 + the bass term),
   *  the shader's own radius before displacement), projected from the
   *  cluster's centre along the camera's right axis. */
  private printBudget() {
    const rt = this.composer.renderTarget1
    const dot = Math.max(1, Math.round(rt.height / Math.max(1, this.lastH)))
    const d = Math.max(0.2, this.dolly)
    const rCss = 0.88 * (this.lastH / 2) * (this.zoom / d)
    const cov = (rCss / PRINT_R) ** 2
    const u = this.uniforms
    u.uDot.value = dot
    // the stage sets display type over the star: there the count is lifted
    // toward whole as well as the speck grown, so it keeps its presence
    // behind the title instead of thinning to dust
    this.stageW += (this.stageGo - this.stageW) * 0.08
    // INK, the press's first dial: how much the plate takes. It scales the
    // chance a particle prints (a light proof drops the faint matter
    // first) and, past its detent, the count lifts toward whole and more
    // specks take the bigger die -- a heavy impression, still never a fill.
    const ink = this.dials.ink
    // Below its detent the dial has a FLOOR. Scaled straight, INK 25 cut
    // both levers to a quarter -- a quarter of the count, each printing at
    // a quarter of the rate -- and the two multiply: measured 4k black px
    // against 31k at home, a scatter of dust with no limb, no longer a
    // sphere. A light proof is a starved impression, not an absent one:
    // the press still lays the shape down, it just lays it thin. So the
    // light half of the travel runs from 0.55 to 1 of the home impression
    // (0.4 + 0.6 * ink), and above the detent it is the dial itself.
    const lean = ink < 1 ? 0.4 + 0.6 * ink : ink
    u.uPrint.value = 9 * lean
    u.uPrintArea.value = Math.min(1, Math.max(0.03, cov * (1 + 0.8 * this.stageW) * Math.min(1.5, lean)))
    const extra = Math.max(0, cov - 1)
    const heavy = Math.max(0, ink - 1) * 0.7
    u.uBold.value = Math.min(1, Math.max(0.55 * (1 - Math.exp(-extra / 0.8)), 0.6 * this.stageW, heavy))
    // the spot plate's gate: a real drop, or an AJ figure at its peak --
    // exactly the two moments the ink sheet puts yellow into the star
    const aj = u.uAj.value as number
    u.uSpot.value = Math.max((u.uDrop.value as number) * (1 - aj), aj * (u.uAjPeak.value as number)) * (1 - this.dissect)
    const pu = this.paper.uniforms as {
      uRing: { value: THREE.Vector3 }
      uRingA: { value: number }
      uDot: { value: number }
      uTexel: { value: THREE.Vector2 }
    }
    pu.uDot.value = dot
    pu.uTexel.value.set(1 / Math.max(1, rt.width), 1 / Math.max(1, rt.height))
    // REGISTER, the second: the yellow plate slips off the black by up to
    // 7 CSS px, down and to the right the way a sheet creeps in the press,
    // and as it slips it prints its tint (the paper shader's TINT plate),
    // so the slip has a shape to show. The slip breathes slowly on its
    // own, and a transient knocks it a little further -- through its own
    // envelope, quick out and slow home, because a plate that jumped back
    // on the next frame would read as a glitch, not a press taking a hit.
    // At zero it is dead still and in register, and the yellow is only
    // the spot.
    const reg = this.dials.reg
    const snap = u.uSnap.value as number
    this.regKnock += (snap - this.regKnock) * (snap > this.regKnock ? 0.3 : 0.035)
    const rp = this.paper.uniforms as { uReg: { value: THREE.Vector2 }; uRegA: { value: number }; uRegCut: { value: number } }
    if (reg > 0.001) {
      const t = u.uTime.value as number
      const kn = this.regKnock
      // ONE CURVE FOR BOTH. The tint used to come in over the first 35% of
      // the travel and sit at full from there, while the slip went on
      // growing linearly -- so the top two thirds of the dial only moved
      // the plate, and REG 30 already looked like REG 100. Now the tint's
      // coverage and the slip ride the same eased curve, x^0.8: a hair
      // ahead of linear, so 10 is already a visible tint and not nothing,
      // and still climbing at 100, so every step of the dial reads. The
      // dots still grow from nothing (the curve leaves 0 at 0), so 1 is
      // not a whole disc of yellow.
      const regE = Math.pow(reg, 0.8)
      const mag = regE * (7 + kn * 3) * (0.85 + 0.15 * Math.sin(t * 0.37))
      const ang = -0.62 + 0.18 * Math.sin(t * 0.23) + kn * 0.2
      rp.uReg.value.set((Math.cos(ang) * mag * dot) / rt.width, (Math.sin(ang) * mag * dot) / rt.height)
      // THE TINT FOLLOWS THE INK. Its tone is the black's density, and the
      // cut used to follow INK DOWN as well as up (0.2 x 0.35 at INK 25),
      // so the thinner the black the sooner the yellow hit full -- at INK
      // 25 + REG 100 the sheet was 13k px yellow over 5k of black: a yellow
      // star with ink dust on it, yellow standing on its own, which the
      // paper rule forbids (yellow is a field UNDER ink, never the image).
      // Now the cut only rises: above the detent it lifts with the dial so
      // a heavy proof does not flood the tint, and below it stays at home,
      // so a starved black gives a starved tone. And the tint's coverage
      // is scaled by the ink, sqrt(min(1, ink)): a light proof gets a
      // light tint, never more yellow than black. The root, not the ink
      // itself, because the tint is a SCREEN: dot radius goes as the root
      // of coverage, and at INK 25 x REG 30 a straight 0.25 left dots a
      // tenth of a pixel across -- no dot lands on a pixel and the dial
      // reads dead. Halved coverage still clears a pixel.
      rp.uRegA.value = regE * Math.sqrt(Math.min(1, ink))
      rp.uRegCut.value = 0.2 * Math.min(1.6, Math.max(1, ink))
    } else {
      rp.uReg.value.set(0, 0)
      rp.uRegA.value = 0
    }
    // the density pre-pass runs only while the shader will read it
    this.tintDensity.enabled = rp.uRegA.value > 0.001
    this.tintDensity.dot = dot
    this.cluster.updateMatrixWorld()
    const k = this.cluster.matrixWorld.getMaxScaleOnAxis()
    const R = (u.uR.value as number) * (0.6 + (u.uLow.value as number) * 0.16) * k
    this.cluster.getWorldPosition(this._ringC)
    this._ringE.setFromMatrixColumn(this.camera.matrixWorld, 0).multiplyScalar(R).add(this._ringC)
    this._ringC.project(this.camera)
    this._ringE.project(this.camera)
    const cx = (this._ringC.x * 0.5 + 0.5) * rt.width
    const cy = (this._ringC.y * 0.5 + 0.5) * rt.height
    const ex = (this._ringE.x * 0.5 + 0.5) * rt.width
    const ey = (this._ringE.y * 0.5 + 0.5) * rt.height
    pu.uRing.value.set(cx, cy, Math.hypot(ex - cx, ey - cy))
    // stands down as the body is dissected (the survey draws its own
    // rings), in AJ (a figure, not a sphere), and while the camera dives
    pu.uRingA.value = 0.55 * (1 - Math.min(1, this.dissect * 2)) * (1 - aj) * Math.min(1, Math.max(0, (d - 0.5) / 0.3))
  }
  private stageGo = 0
  private stageW = 0
  /** Paper only: the stage sets display type over the star, so the print
   *  carries more weight there (uBold). Eased, so the change of weight is
   *  not a cut. The dark sheet ignores it. */
  setStagePrint(on: boolean) {
    this.stageGo = on ? 1 : 0
  }
  private _ringC = new THREE.Vector3()
  private _ringE = new THREE.Vector3()

  /** Ink specks on uncoated paper -- a print of the raw particle frame, not
   *  a relit particle material (additive light on white can't work).
   *
   *  Paper does not glow and does not smear, so on paper the bloom and the
   *  afterimage stand down and the clear goes to true zero energy: the
   *  print pass wants the particles and nothing but the particles.
   *  'ink' restores exactly what the constructor built -- the same passes,
   *  the same #0a0a0a clear -- and the print pass is disabled outright, so
   *  the dark sheet is the same draw calls as before paper existed. */
  setTheme(t: 'ink' | 'paper') {
    this._theme = t
    const paper = t === 'paper'
    this.paper.enabled = paper
    // re-armed by printBudget on paper's next frame if REG is in
    if (!paper) this.tintDensity.enabled = false
    this.bloom.enabled = !paper
    this.after.enabled = !paper
    this.renderer.setClearColor(paper ? 0x000000 : 0x0a0a0a, 1)
    this.uniforms.uPaper.value = paper ? 1 : 0
    this.applyDials()
    // The constellation's chords include every index-delta-1 pair, and on a
    // fibonacci lattice those sit a golden angle apart: long horizontal
    // strokes across the whole body. As light on black they are a faint
    // lattice; printed, they are pen scratches through the stipple. The
    // snare still reads on paper -- it cracks the shell into veins, which
    // print as runs of heavier specks.
    this.links.visible = !paper
  }

  get theme() {
    return this._theme
  }

  /** Owner tuning: turbulence / exposure / spin, each 0.25..2, and the
   *  paper's own two -- ink (0.25..2) and register (0..1). A ground uses
   *  its own pair: paper has no light to expose and a print does not
   *  churn, so on paper turb and expo sit at their detents, and on ink the
   *  press dials do nothing. */
  setTuning(turb: number, expo: number, spin: number, ink = 1, reg = 0) {
    this.dials = { turb, expo, ink, reg }
    this.spinDial = spin
    this.applyDials()
  }
  private dials = { turb: 1, expo: 1, ink: 1, reg: 0 }
  /** the register's transient knock, enveloped (see printBudget) */
  private regKnock = 0
  private applyDials() {
    const paper = this._theme === 'paper'
    this.uniforms.uTurb.value = paper ? 1 : this.dials.turb
    this.uniforms.uExpo.value = paper ? 1 : this.dials.expo
  }

  /** Adaptive quality: q<1 halves the workload twice over — fewer
   *  particles AND a non-retina buffer. Called by the app's self-profiler. */
  setQuality(q: number) {
    this.quality = q
    this.applyDensity()
    this.resize(this.lastW, this.lastH)
  }

  /** Visible fraction = the governor's budget x whatever zoom has spent.
   *  Zoomed in, the view covers less sphere, so more of the reserve can
   *  render for the same fragment cost. */
  private applyDensity() {
    const spend = Math.min(1, BASE_DENSITY * (0.55 + 0.45 * this.zoom * 1.15))
    this.uniforms.uDensity.value = Math.min(1, spend) * this.quality
  }

  /** Pinch / wheel zoom, clamped. 1 = full body, 5 = surface detail. */
  zoomBy(factor: number) {
    this.zoomTarget = Math.max(1, Math.min(5, this.zoomTarget * factor))
  }
  setZoom(z: number) {
    this.zoomTarget = Math.max(1, Math.min(5, z))
  }
  /** Ray-cast a screen point against the body sphere. Returns the hit in
   *  CLUSTER-LOCAL space (what the shader needs) or null on miss. nx/ny in
   *  [-1,1] NDC. */
  bodyHit(nx: number, ny: number): THREE.Vector3 | null {
    const ray = new THREE.Raycaster()
    ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera)
    const bodyR = 0.88 * 0.62 // uR x resting photosphere
    const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), bodyR)
    const hit = new THREE.Vector3()
    if (!ray.ray.intersectSphere(sphere, hit)) return null
    return this.cluster.worldToLocal(hit)
  }

  /** The vocal stem's presence, damped by the caller. */
  setVocal(v: number) {
    this.uniforms.uVocal.value = Math.max(0, Math.min(1.4, v))
  }

  /**
   * The typed reflexes and the slow reads, once per frame, straight off the
   * analyser's features (the object is reused, so nothing here keeps it).
   * `tension` is energy.ts's build reading.
   *
   * The seeds re-deal on each detected hit so every snare cracks along new
   * veins and every hat lights new glints; Math.random here is a CHOICE of
   * figure, never a quantity -- how bright and how far always come from the
   * measured envelopes.
   */
  setVoices(f: Features, tension: number) {
    const u = this.uniforms
    u.uKick.value = f.kick
    u.uSnare.value = f.snare
    u.uHat.value = f.hat
    if (f.snareHit) u.uSnareSeed.value = Math.random()
    if (f.hatHit) u.uHatN.value = (u.uHatN.value + 1) % 4096
    this.sustainT = f.sustain
    this.centroidT = f.centroid
    this.tensionT = tension
    // AJ reads: level for the settle, and the tone for the mode
    this.ajLevel = f.rms
    this.ajHz = f.pitchConf > 0.3 ? f.pitchHz : 0
    this.ajBass = (f.bandsRel[0] + f.bandsRel[1] + f.bandsRel[2] + f.bandsRel[3]) / 4
    if (f.kickHit || f.snareHit) this.ajDrumsAgo = 0
    // a snare launches the ripple from the pole the last one arrived at, so
    // a backbeat sweeps the figure down, then up. Its strength is the hit's.
    if (f.snareHit && (u.uAj.value as number) > 0.001 && !this.calm) {
      this.ripT = 0
      this.ripA = Math.min(1, f.snare)
      u.uAjRipDir.value = -(u.uAjRipDir.value as number)
    } else if (this.ripT >= 0 && this.ripT < 0.1) {
      // a hit's envelope can keep climbing for a frame or two after the
      // onset fires (features.ts: "not a new hit"); the ripple is as strong
      // as the hit turned out to be, not as its first frame
      this.ripA = Math.max(this.ripA, Math.min(1, f.snare))
    }
  }

  /**
   * What AJ is actually playing, straight from its generator: the chord
   * root in Hz (0 = none given, the detector's pitch stands in), the tempo,
   * and the section. With drums and bass in the mix the detector's pitch
   * flutters between the kick, the bass and the chord; the root is the
   * honest reading of which standing wave the plate is being driven at.
   */
  setAJRoot(hz: number, bpm = 0, section = '') {
    this.ajRoot = Number.isFinite(hz) && hz > 0 ? hz : 0
    this.ajBpm = Number.isFinite(bpm) && bpm > 0 ? bpm : 0
    this.ajSection = section || ''
  }

  /**
   * 'star' is the instrument as it has always been. 'aj' is cymatics: the
   * particles settle into the standing-wave pattern of the measured tone.
   * The change glides over VARIANT_GLIDE seconds (instant under reduced
   * motion), and every burst, shockwave and scale break stands down while
   * the variant is in, because a Chladni figure is read by being still.
   */
  setVariant(v: 'star' | 'aj') {
    this.ajGo = v === 'aj' ? 1 : 0
    if (this.calm) this.ajT = this.ajGo
  }

  /** where the glide is right now, 0 = star, 1 = aj */
  get variant(): number {
    return this.uniforms.uAj.value as number
  }

  /** The mode the cymatic pattern is settling into, for a readout. */
  get cymaticMode(): { l: number; m: number } {
    return this.modeB
  }

  /** Target for the pull-apart, 0..1. The spring does the rest. */
  /**
   * The energy classifier's four-tier state, in one call.
   *
   * Everything the burst does hangs off two envelopes: uDrop and uStrong.
   * They are set here and read by the shader, the bloom, the afterimage
   * and the sim, so a tier change moves the whole instrument at once
   * rather than each effect deciding for itself what counts as loud.
   *
   * `wave` true starts the shockwave clock. It is an edge, not a level:
   * the caller fires it on the frame a drop is detected and never again
   * until the next one, or the ring restarts every frame and stands still.
   */
  setEnergy(drop: number, strong: number, wave: boolean, calm = 0) {
    this.uniforms.uDrop.value = Math.max(0, Math.min(1, drop))
    this.uniforms.uStrong.value = Math.max(0, Math.min(1, strong))
    // The other end of the same tick. calm is the classifier's read of how
    // far this passage sits below the track's own long-run loudness, so
    // tier 0 stops being the tier where nothing happens.
    this.uniforms.uCalm.value = Math.max(0, Math.min(1, calm))
    // no shockwave into a Chladni figure
    if (wave && (this.uniforms.uAj.value as number) < 0.5) this.uniforms.uWave.value = 0
    // the ground dips so a star that has outgrown its frame is actually
    // visible through the chrome rather than glowing faintly behind it
    if (this.dropCssEl) this.dropCssEl.style.setProperty('--drop', this.uniforms.uDrop.value.toFixed(3))
  }

  /** the element carrying --drop for the chrome's ground */
  dropCssEl: HTMLElement | null = null

  setDissect(t: number) {
    this.dissectTarget = Math.max(0, Math.min(1, t))
  }

  /** Where the shear actually is right now (sprung). */
  get dissect(): number {
    return this.uniforms.uDissect.value as number
  }

  /** Re-plumb the anatomy: which band belongs to which tier. Spectral
   *  fallback is 3 tiers of 8; stems get one tier per separated part. */
  setTierMap(tierOf: number[], count: number, vocalTier = -1) {
    const u = this.uniforms.uTierOf.value as Float32Array
    for (let i = 0; i < 24; i++) u[i] = tierOf[i] ?? 0
    this.tierCount = count
    this.uniforms.uTiers.value = count
    this.uniforms.uGap.value = 1.95 / Math.max(1, count - 1)
    // vocalTier is only ever passed by applyStemTiers, so it is also the
    // signal that these tiers are stems rather than frequency bands.
    this.stems = vocalTier >= 0
    this.uniforms.uStems.value = this.stems ? 1 : 0
    this.uniforms.uCoronaY.value = vocalTier >= 0 ? this.tierYFull(vocalTier) : 0
    this.uniforms.uGroundY.value = this.tierYFull(0) - (this.uniforms.uGap.value as number) * 0.9
  }

  /** true while the tiers are stems, not frequency bands */
  stems = false

  get tiers(): number {
    return this.tierCount
  }

  /** Row<->ring linkage: which tier the UI is touching (-1 none). */
  setHiTier(i: number) {
    this.uniforms.uHiTier.value = i
  }

  get hiTier(): number {
    return this.uniforms.uHiTier.value as number
  }

  /** Per-tier voices for the dissected rings — pre-smoothed by the caller. */
  setTierLevels(lvls: ArrayLike<number>) {
    const u = this.uniforms.uTierLvl.value as Float32Array
    for (let i = 0; i < 6; i++) u[i] = lvls[i] ?? 1
  }

  /** A tier's resting altitude at full dissection (cluster-local y). */
  tierYFull(tier: number): number {
    return (tier - (this.tierCount - 1) * 0.5) * (this.uniforms.uGap.value as number)
  }

  /** Where the tier is NOW — mirrors the shader's per-tier shear stagger
   *  exactly, so the survey chrome rides the same motion as the matter. */
  tierYNow(tier: number): number {
    const d = this.uniforms.uDissect.value as number
    const x = Math.max(0, Math.min(1, d * 1.15 - tier * 0.05))
    return this.tierYFull(tier) * x * x * (3 - 2 * x)
  }

  /** Cluster-local point -> CSS pixels. Valid right after render(). */
  projectLocal(x: number, y: number, z: number): { x: number; y: number } {
    this._v.set(x, y, z).applyMatrix4(this.cluster.matrixWorld).project(this.camera)
    return { x: (this._v.x * 0.5 + 0.5) * this.lastW, y: (-this._v.y * 0.5 + 0.5) * this.lastH }
  }

  /** The stack's silhouette — mirrors the shader's ring-radius profile. */
  ringProfile(tier: number): number {
    // Mirrors the shader exactly, including the stems case. If these two ever
    // disagree the drawn ellipse and the particles it describes come apart,
    // which is the whole reason this function exists rather than being
    // reimplemented at each call site.
    if (this.stems) return 1
    return 0.72 + 0.48 * Math.sin((Math.PI * (tier + 0.5)) / this.tierCount)
  }

  /** A point on a tier's survey ring (rs scales the ring radius; 0 = the
   *  tier's centre on the axis). */
  surveyPoint(tier: number, theta: number, rs = 1): { x: number; y: number } {
    const r = 0.88 * 0.56 * this.ringProfile(tier) * rs
    return this.projectLocal(Math.cos(theta) * r, this.tierYNow(tier), Math.sin(theta) * r)
  }

  /** Cursor ray -> the body's depth plane. ALWAYS returns a point, so the
   *  tendril follows the hand even after it leaves the silhouette — that
   *  was the broken first link of the feedback chain. */
  grabPlane(nx: number, ny: number): THREE.Vector3 {
    const ray = new THREE.Raycaster()
    ray.setFromCamera(new THREE.Vector2(nx, ny), this.camera)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const hit = new THREE.Vector3()
    ray.ray.intersectPlane(plane, hit)
    return this.cluster.worldToLocal(hit)
  }

  /** Drive the grab visual: local point + strength + band (0/1/2, -1 all). */
  setGrab(local: THREE.Vector3 | null, strength: number, band = -1) {
    if (local) (this.uniforms.uGrabPos.value as THREE.Vector3).copy(local)
    this.uniforms.uGrabStr.value = local ? strength : 0
    this.uniforms.uGrabBand.value = band
  }

  /** EQ visual multipliers, 1 = flat, 0 = killed, ~1.5 = boosted. */
  setEqVis(low: number, mid: number, high: number) {
    ;(this.uniforms.uEqVis.value as THREE.Vector3).set(low, mid, high)
  }

  /** What fraction of the shell is actually rendering right now. */
  get densityNow() {
    return this.uniforms.uDensity.value as number
  }

  get zoomLevel() {
    return this.zoom
  }

  /** The POWER ON moment reaches the star itself: a fast partial re-reveal
   *  (reads as the instrument re-acquiring) plus a full-strength eruption. */
  powerOn() {
    this.born = performance.now() - 0.3 * 1700
    this.pulseE.v = 1.1
    this.burst(1)
  }

  /** Spin-up multiplier for the power-on rev. 0 = at rest. */
  setRev(v: number) {
    this.bootRev = Math.max(0, v)
  }

  /**
   * How much the body is actually moving right now, 0..1: your sway over
   * it, whatever you are dragging, and its own idle breath. The standby
   * strip reads THIS — so it is a real readout of the instrument before
   * there is any audio to read, rather than a decorative squiggle.
   */
  readMotion(): number {
    const dx = this.ptr.x - this.mPrev.x
    const dy = this.ptr.y - this.mPrev.y
    const gx = this.drag.x - this.mPrev.gx
    const gy = this.drag.y - this.mPrev.gy
    this.mPrev.x = this.ptr.x
    this.mPrev.y = this.ptr.y
    this.mPrev.gx = this.drag.x
    this.mPrev.gy = this.drag.y
    const sway = Math.hypot(dx, dy) * 11 + Math.hypot(gx, gy) * 7
    const breath = 0.2 + 0.13 * Math.sin(this.t * 0.9) * Math.sin(this.t * 0.37 + 1.1)
    return Math.min(1, breath + sway + this.uniforms.uPulse.value * 0.5)
  }

  /**
   * Aim the body at a point on the glass, and optionally shrink it to sit
   * inside a frame. Standby parks the star inside the poster's image cell;
   * powering on glides it back out to full size. Snap for resizes, glide
   * for state changes.
   */
  /** Where the camera is aimed RIGHT NOW, so a return can start from it
   *  rather than from an assumed console framing. */
  get focusNow(): { x: number; y: number; d: number } {
    return { x: this.focusFrac, y: this.focusFracY, d: this.dolly }
  }

  setFocus(frac: number, fracY = 0.5, dolly = 1, snap = false) {
    this.focusTx = frac
    this.focusTy = fracY
    this.dollyT = dolly
    if (snap) {
      this.focusFrac = frac
      this.focusFracY = fracY
      this.dolly = dolly
    }
    this.resize(this.lastW, this.lastH)
  }

  /** Hover aim, normalized -0.5..0.5 of the viewport. */
  setPointer(nx: number, ny: number) {
    this.ptr.tx = nx
    this.ptr.ty = ny
    // setPointer speaks in -0.5..0.5 of the viewport; the ray wants NDC.
    // Same projection the grab uses, so hover and grab agree about where
    // your hand is to the pixel.
    this.uniforms.uHover.value.copy(this.grabPlane(nx * 2, -ny * 2))
  }

  /** Scale the simulator's throw. 1 is the shipped default; this exists so
   *  the amplitude can be judged on real hardware instead of guessed. */
  setSimDial(v: number) {
    this.simDial = Math.max(0, Math.min(3, v))
  }

  /** Is the hand on the field, 0..1. Zero while a grab owns it. */
  setHover(v: number) {
    this.hoverT = Math.max(0, Math.min(1, v))
  }

  /** A beat erupts matter from the surface: take the next slots in the
   *  ring pool, stamp launch time, origin, direction and speed. Recycling
   *  means a long build-up can never exhaust memory — old flares are
   *  overwritten. Pass a tier index and the eruption leaves THAT ring
   *  instead of the photosphere — dissected, the drums erupt from the
   *  drums' own tier, not from the empty centre the star vacated. */
  burst(strength: number, tier: number | null = null) {
    // AJ has no ejecta: tones do not throw matter, and a burst over a
    // settling pattern is exactly the spam the variant exists to be free of
    if ((this.uniforms.uAj.value as number) > 0.3) return
    const n = Math.round(90 + strength * 240)
    const e = this.ejecta
    const fromRing = tier != null && (this.uniforms.uDissect.value as number) > 0.35
    const ringY = fromRing ? this.tierYNow(tier as number) : 0
    const ringR = 0.88 * 0.5
    for (let i = 0; i < n; i++) {
      const s = e.cursor
      e.cursor = (e.cursor + 1) % EJECTA_N
      if (fromRing) {
        // Launch from the ring's rim, spraying outward and off-plane.
        const th = Math.random() * Math.PI * 2
        e.org.setXYZ(s, Math.cos(th) * ringR, ringY, Math.sin(th) * ringR)
        const up = Math.random() * 1.6 - 0.5
        const m = Math.hypot(1, up)
        e.dir.setXYZ(s, Math.cos(th) / m, up / m, Math.sin(th) / m)
      } else {
        // Uniform random direction — flares leave the whole photosphere.
        const u = Math.random() * Math.PI * 2
        const v = Math.acos(2 * Math.random() - 1)
        const dx = Math.sin(v) * Math.cos(u)
        const dy = Math.sin(v) * Math.sin(u)
        const dz = Math.cos(v)
        e.dir.setXYZ(s, dx, dy, dz)
        e.org.setXYZ(s, dx * 0.88 * 0.6, dy * 0.88 * 0.6, dz * 0.88 * 0.6)
      }
      e.birth.setX(s, this.t)
      e.spd.setX(s, (0.5 + Math.random() * 0.9) * (0.5 + strength))
    }
    e.dir.needsUpdate = true
    e.org.needsUpdate = true
    e.birth.needsUpdate = true
    e.spd.needsUpdate = true
  }

  /** Drag deltas in radians. A star has no wrong side — spin is free. */
  dragBy(rx: number, ry: number) {
    this.drag.tx += rx
    this.drag.ty += ry
  }

  resize(w: number, h: number) {
    const dpr = this.quality < 1 ? 1 : Math.min(2, window.devicePixelRatio || 1)
    // Only reallocate when the buffer ACTUALLY changes. three's setSize
    // reassigns canvas.width/height unconditionally, which resets and
    // clears the WebGL drawing buffer, and UnrealBloomPass.setSize
    // allocates five Vector2s. setFocus() and the zoom glide call in here
    // every frame — so the boot dive and every wheel zoom were paying a
    // full buffer reset per frame, which the self-profiler then read as
    // slow hardware and answered by shedding half the particles.
    if (w !== this.lastW || h !== this.lastH || dpr !== this.lastDpr) {
      this.lastW = w
      this.lastH = h
      this.lastDpr = dpr
      this.renderer.setPixelRatio(dpr)
      this.renderer.setSize(w, h, false)
      this.composer.setSize(w, h)
      this.camera.aspect = w / Math.max(1, h)
    }
    this.placeCamera()
    // The subject dominates the stage, like the reference. The base only;
    // the per-frame scale break is applied in render(), because this
    // function runs on resize and would otherwise hold a drop's expansion
    // frozen until the window changed size.
    this.uniforms.uR.value = R_BASE
  }

  /** Camera at x looking at (x,0,0) shows world-x at screen centre, so to
   *  place world 0 RIGHT of centre the camera itself moves LEFT.
   *  Closer camera = magnification; the pan offset shrinks with it so the
   *  subject stays where the chrome expects it. Dissection dollies back —
   *  the exploded stack is taller than the star it came from. */
  private placeCamera() {
    const aspect = this.camera.aspect
    const dis = this.uniforms.uDissect.value as number
    const baseZ = 1 / Math.tan((40 / 2) * (Math.PI / 180))
    // Portrait: the rail is a bottom sheet covering nearly half the glass,
    // so the dissected stack must live in the top half — dolly back harder
    // and aim below the stack's centre to raise it into the visible stage.
    const portrait = aspect < 0.85
    this.camera.position.z = ((baseZ * this.dolly) / this.zoom) * (1 + dis * (portrait ? 1.38 : 0.62))
    // Frustum half-extent at the subject plane is dolly/zoom, so the aim
    // offsets scale with both or the body drifts out of its frame.
    const off = (-(this.focusFrac - 0.5) * 2 * aspect * this.dolly) / this.zoom
    const offY = ((this.focusFracY - 0.5) * 2 * this.dolly) / this.zoom
    const ly = (portrait ? -1.0 * dis : 0) + offY
    this.camera.position.x = off
    this.camera.position.y = ly
    this.camera.lookAt(off, ly, 0)
    this.camera.updateProjectionMatrix()
  }

  /**
   * The variant glide and the cymatic mode.
   *
   * FREQUENCY -> MODE. The octave sets the order l -- more nodal lines for a
   * higher tone, as on a real plate, where a higher drive frequency excites
   * a higher mode -- and the note within the octave sets m, how those lines
   * divide between meridians and latitudes:
   *
   *   l = round(2 + 12 * log2(f / 60) / log2(2000 / 60)), clamped 2..14
   *   m = round(chroma * l), chroma = fract(log2(f / 261.63))  (C = 0)
   *
   * so 432Hz is Y(9,7), 528Hz Y(9,0) (all latitudes: 528 sits a hair above
   * C5), 396Hz Y(8,5). A tone held gives a held figure; a new tone morphs.
   * No clear tone (pitchConf < 0.3) holds the last figure and lets the sand
   * drift -- the pattern is never invented to fill a gap.
   *
   * The tone is the chord root AJ says it is playing (setAJRoot) whenever it
   * gives one, so each chord change is one morph; the detector's pitch is
   * the fallback, and the only reading under any other source.
   */
  private stepVariant(dt: number) {
    const u = this.uniforms
    // glide: linear progress, smoothstep out, VARIANT_GLIDE seconds
    const step = dt / VARIANT_GLIDE
    this.ajT = this.ajGo > this.ajT ? Math.min(this.ajGo, this.ajT + step) : Math.max(this.ajGo, this.ajT - step)
    const e = this.ajT * this.ajT * (3 - 2 * this.ajT)
    u.uAj.value = e
    if (e <= 0 && this.ajGo === 0) return

    const hz = this.ajRoot > 0 ? this.ajRoot : this.ajHz
    // settle: the level, sprung slow, over the range tones actually occupy,
    // times the bass against its own mean. 0.5 is "usual", so an ordinary
    // bar settles exactly as before; a bass note swelling pulls the loose
    // grains onto the lines (past 1 the shader clamps each grain, so more
    // of them sit ON the line rather than any overshooting it), a thin one
    // lets them lift. No bass at all is no reading (bandsRel is gated to 0
    // there), so it moves nothing: a drone keeps the figure it always had.
    // Sprung slower than a kick lasts, so the kick in the same bands does
    // not read as a bass swell.
    const lvl = Math.max(0, Math.min(1, (this.ajLevel - 0.04) / 0.5))
    const bassF = this.ajBass > 0.02 ? 1 + 0.5 * (Math.min(1, this.ajBass) - 0.5) : 1
    u.uAjAmp.value = Math.max(0, Math.min(1.25, this.ajAmpE.update((hz > 0 ? lvl : lvl * 0.35) * bassF, dt, 2.2)))
    // the section's share of the groove, eased over about a bar
    const secG = this.calm ? 0 : AJ_SECTION_GAIN[this.ajSection] ?? 1
    u.uAjGroove.value = Math.max(0, this.ajGrooveE.update(secG, dt, 1.6))
    // the ripple's front, pole to pole, spending itself as it goes
    if (this.ripT >= 0) {
      this.ripT += dt
      const x = this.ripT / AJ_RIPPLE_T
      if (x >= 1.15 || this.calm) {
        this.ripT = -1
        u.uAjRip.value = -1
      } else {
        u.uAjRip.value = x * Math.PI
        u.uAjRipA.value = this.ripA * (u.uAjGroove.value as number) * Math.max(0, 1 - x * 0.75)
      }
    }
    // peaks: the level swelling above its own 4s mean -- while no drums are
    // playing. Under a groove every kick is a spike above that mean, so the
    // yellow would pulse a beat behind each one; measured drums (a kick or a
    // snare in the last few seconds) hand the yellow to the hat's glints
    // instead, and a break gives it back to the tone's own swells.
    this.ajSlow += (this.ajLevel - this.ajSlow) * (1 - Math.exp(-dt / 4))
    this.ajDrumsAgo += dt
    const peak = Math.max(0, Math.min(1, (this.ajLevel - this.ajSlow) / 0.06)) * Math.max(0, Math.min(1, (this.ajDrumsAgo - 2) / 2))
    u.uAjPeak.value += (peak - u.uAjPeak.value) * (1 - Math.exp(-dt / 0.25))

    if (hz > 0) {
      const f = hz
      const l = Math.max(2, Math.min(14, Math.round(2 + (12 * Math.log2(f / 60)) / Math.log2(2000 / 60))))
      const lg = Math.log2(f / 261.63)
      const chroma = lg - Math.floor(lg)
      const m = Math.max(0, Math.min(l, Math.round(chroma * l)))
      if (l !== this.modeCand.l || m !== this.modeCand.m) {
        this.modeCand.l = l
        this.modeCand.m = m
        this.modeCandFor = 0
      } else this.modeCandFor += dt
      const settledOnB = this.modeB.l === l && this.modeB.m === m
      if (!settledOnB && this.modeCandFor >= PATTERN_HOLD) {
        if (this.morphT >= 1) {
          // start a morph from what is showing now
          this.modeA.l = this.modeB.l
          this.modeA.m = this.modeB.m
          this.modeB.l = l
          this.modeB.m = m
          this.morphT = 0
        } else if (this.morphT < 0.5) {
          // early in a morph: retarget rather than queue
          this.modeB.l = l
          this.modeB.m = m
        }
      }
    }
    // THE MORPH KEEPS TIME. With a tempo, a chord change morphs over two
    // beats -- a bar in a break, one beat in a drop -- so the figure turns
    // over with the harmony instead of at a fixed rate beside it.
    const beatS = this.ajBpm > 0 ? 60 / this.ajBpm : 0
    const morphS = beatS > 0
      ? beatS * (this.ajSection === 'break' ? 4 : this.ajSection === 'drop' ? 1 : 2)
      : PATTERN_MORPH
    if (this.morphT < 1) this.morphT = Math.min(1, this.morphT + dt / morphS)
    const mt = this.morphT * this.morphT * (3 - 2 * this.morphT)
    ;(u.uYa.value as THREE.Vector2).set(this.modeA.l, this.modeA.m)
    ;(u.uYb.value as THREE.Vector2).set(this.modeB.l, this.modeB.m)
    u.uMorph.value = mt
  }

  render(dt: number, low: number, mid: number, high: number, pulse: number, ahead = 0, snap = 0) {
    // The velocity edit: simulation time itself lurches on hits and eases
    // back between them — motion CUTS on the beat instead of drifting
    // through it. Snap is unsprung by design.
    this.uniforms.uSnap.value = snap
    const warp = 0.7 + this.uniforms.uPulse.value * 1.6 + snap * 1.4
    this.t += dt * warp
    this.uniforms.uTime.value = this.t
    this.uniforms.uLow.value = this.lowE.update(low, dt, 11)
    this.uniforms.uMid.value = this.midE.update(mid, dt, 9)
    this.uniforms.uHigh.value = this.highE.update(high, dt, 13)
    this.uniforms.uPulse.value = this.pulseE.update(pulse, dt, 16)
    this.uniforms.uAhead.value = this.aheadE.update(ahead, dt, 1.6)
    this.uniforms.uSustain.value = this.sustainE.update(this.sustainT, dt, 3)
    this.uniforms.uCentroid.value = this.centroidE.update(this.centroidT, dt, 4)
    this.uniforms.uTension.value = Math.max(0, this.tensionE.update(this.tensionT, dt, 5))
    this.stepVariant(dt)
    this.uniforms.uReveal.value = Math.min(1, (performance.now() - this.born) / 1700)

    // The shear itself is sprung: release your grip mid-pull and the stack
    // slams shut like a real mechanism, not a UI transition.
    const dis = this.dissectE.update(this.dissectTarget, dt, 7)
    this.uniforms.uDissect.value = dis
    if (Math.abs(dis - this.lastDis) > 1e-3) {
      this.lastDis = dis
      this.placeCamera()
    }

    // Damped framing: powering on glides the star out of the poster's
    // image cell to full size instead of cutting to it.
    if (
      Math.abs(this.dolly - this.dollyT) > 1e-4 ||
      Math.abs(this.focusFrac - this.focusTx) > 1e-5 ||
      Math.abs(this.focusFracY - this.focusTy) > 1e-5
    ) {
      const k = Math.min(1, dt * 3.4)
      this.dolly += (this.dollyT - this.dolly) * k
      this.focusFrac += (this.focusTx - this.focusFrac) * k
      this.focusFracY += (this.focusTy - this.focusFracY) * k
      this.placeCamera()
    }

    // Damped zoom: the dolly glides, and spending the reserve is gradual.
    if (Math.abs(this.zoom - this.zoomTarget) > 1e-4) {
      this.zoom += (this.zoomTarget - this.zoom) * Math.min(1, dt * 6)
      this.uniforms.uZoom.value = this.zoom
      this.applyDensity()
      this.resize(this.lastW, this.lastH)
    }

    // Reference cluster's motion law, unclamped for a sphere: free spin.
    const ease = Math.min(1, dt * 4)
    this.ptr.x += (this.ptr.tx - this.ptr.x) * ease
    this.ptr.y += (this.ptr.ty - this.ptr.y) * ease
    this.drag.x += (this.drag.tx - this.drag.x) * ease
    this.drag.y += (this.drag.ty - this.drag.y) * ease
    // The hand itself is unsprung; only its presence is damped, so
    // arriving is instant and leaving is a settle rather than a pop.
    this.uniforms.uHoverStr.value += (this.hoverT - this.uniforms.uHoverStr.value) * Math.min(1, dt * 7)
    this.uniforms.uHoverLag.value.lerp(this.uniforms.uHover.value, Math.min(1, dt * 9))
    // Sustain turns the body slowly (a held chord is a slow thing, and the
    // one audible quantity that should read as rotation rather than as a
    // hit), a build winds it up, and AJ turns at 40% so a figure can be read.
    const aj = this.uniforms.uAj.value as number
    // AJ with a tempo turns with it: 80bpm is the old 40% rate, and the
    // section leans on it (a break slows the plate, a drop winds it up).
    const ajSpin = aj > 0 ? (this.ajBpm > 0 ? Math.min(1.4, Math.max(0.7, this.ajBpm / 80)) : 1) * (AJ_SECTION_SPIN[this.ajSection] ?? 1) : 1
    if (!this.calm)
      this.driftT += dt * (0.06 + this.uniforms.uPulse.value * 0.05 * (1 - aj) + (this.uniforms.uSustain.value as number) * 0.03 + (this.uniforms.uTension.value as number) * 0.06) *
        this.spinDial * (0.75 + warp * 0.25) * (1 + this.bootRev * 5) * (1 - aj * 0.6) * (1 + (ajSpin - 1) * aj)
    this.cluster.rotation.y = this.driftT + this.ptr.x * 0.6 + this.drag.x
    // Dissected, the view settles into the surveyor's tilt — looking
    // slightly down the axis so the rings read as the drawing's ellipses.
    // The y-spin stays: numbered markers orbiting is the drawing, alive.
    const baseRx = Math.sin(this.driftT * 0.4) * 0.12 - this.ptr.y * 0.5 + this.drag.y
    this.cluster.rotation.x = baseRx * (1 - dis) + 0.42 * dis

    // Bloom carries the brightness spike. A drop is worth roughly twice
    // the whole sustained range, which is what makes it read as a flash
    // rather than as the music simply getting louder.
    this.bloom.strength = (0.32 + this.uniforms.uLow.value * 0.3 + this.uniforms.uPulse.value * 0.15) * this.uniforms.uExpo.value * (1 - dis * 0.28)
      // the kick is light pressure too; the drop's flash stands down in AJ,
      // where the kick is a softer breath on the plate's groove share
      + this.uniforms.uKick.value * (0.12 * (1 - aj) + 0.05 * aj * (this.uniforms.uAjGroove.value as number))
      + (this.uniforms.uDrop.value * 0.55 + this.uniforms.uStrong.value * 0.16) * (1 - aj)
    // Persistence leans with the bass: quiet = crisp, heavy = long
    // exposure. A drop adds motion blur on top, so the burst smears and
    // the calm state stays crisp.
    //
    // THE SURVEY IS NOT THE STAR. Dissected, persistence collapses. At
    // 0.86 damp each frame keeps 86% of the last, which is a half-life of
    // ~5 frames and a visible tail past half a second -- lovely on a star
    // that boils in place, and a lie on six rings that SPIN. Every particle
    // dragged its own arc and the rings read as smeared bands instead of
    // rings, with the survey ellipses lost inside the glare of their own
    // trails. Exposure is for the object; a reading has to be legible.
    ;(this.after.uniforms as { damp: { value: number } }).damp.value =
      Math.min(0.94, 0.76 + this.uniforms.uLow.value * 0.15 + this.uniforms.uDrop.value * 0.09) *
      (1 - this.dissect * 0.58)
    // THE SCALE BREAK, per frame. On a drop the body genuinely outgrows
    // its frame: the star canvas is full-bleed BEHIND the plate and the
    // chrome is a frame over it, so this needs no layout change, only
    // permission. A positional scale rather than a camera move on
    // purpose -- moving the camera would take the survey chrome and
    // projectLocal's registration with it.
    this.uniforms.uR.value =
      R_BASE * (1 + (this.uniforms.uDrop.value * 0.34 + this.uniforms.uStrong.value * 0.06) * (1 - aj))

    // the shockwave's clock. Runs from the frame the drop landed and
    // stops once the front is past every particle.
    if (this.uniforms.uWave.value >= 0) {
      this.uniforms.uWave.value += dt
      if (this.uniforms.uWave.value > 0.95) this.uniforms.uWave.value = -1
    }
    // THE SIM STEPS HERE, and nowhere else. The shell samples uSim during
    // composer.render(), so stepping on the line above means the texture
    // bound at sample time was written from THIS frame's dt and this
    // frame's uniforms. At the top of render() every audio uniform is
    // still last frame's, and uSnap is unsprung by design -- "the kick
    // flashes the frame it lands" -- so a one-frame lag there is the exact
    // artifact the snap path exists to avoid.
    //
    // step() binds and restores its own render targets and never touches
    // setSize or setPixelRatio, which would stale lastW/lastH and break
    // projectLocal's "valid right after render()" contract.
    // Gated on the dial so setSimDial(0) costs nothing, not just nothing
    // visible: two 512x512 passes a frame are cheap but not free.
    if (this.sim?.active && this.simDial > 0) {
      // the hand and its velocity are already cluster-local: uHover comes
      // from grabPlane(), and the lagging copy is the same space.
      this.simVel.subVectors(this.uniforms.uHover.value, this.uniforms.uHoverLag.value).divideScalar(Math.max(dt, 1 / 240))
      // The swirl needs to orbit what the camera looks down, and the sim
      // works in cluster space, so the axis is rotated in rather than
      // assumed. Without this the orbit tilts into the depth as the star
      // spins and reads as a wobble instead of a vortex.
      this.simAxis.set(0, 0, 1).applyQuaternion(this.camera.quaternion)
      this.cluster.worldToLocal(this.simAxis.add(this.cluster.position))
      this.sim.setViewAxis(this.simAxis)
      // STRENGTH FROM SPEED, not just from presence. A hand resting on the
      // field should barely disturb it and a fast swipe should hit hard --
      // presence alone made a still cursor push exactly as much as a
      // moving one, which is the single clearest tell that nothing has
      // mass. Decays rather than cutting, so the field keeps moving after
      // the hand stops.
      const speed = this.simVel.length()
      this.handHeat = Math.max(this.handHeat * Math.pow(0.94, dt * 60), Math.min(1, speed * 0.55))
      this.sim.setHand(
        this.uniforms.uHover.value,
        this.simVel,
        this.uniforms.uHoverStr.value * (0.25 + 0.75 * this.handHeat),
      )
      // The transient, per sector. uSnap is the frame the kick lands and
      // is deliberately unsprung, which is exactly what an impulse wants.
      // The RISING EDGE, not the level. uSnap decays over several frames,
      // so handing it over raw applied an outward force every frame it was
      // non-zero and the whole sphere inflated onto the clamp instead of
      // ringing. The positive delta is non-zero only on the frame a
      // transient actually arrives, which is what an impulse is.
      //
      // TYPED since the voices: the rising edge of the KICK throws the low
      // sectors, the snare's the mids, the hat's the highs (at half weight,
      // a hat is air). It used to be the generic snap for all 24, which
      // measured as a hat throwing the bass sectors exactly as hard as a
      // kick did (0.60 against 0.60) -- the anatomy this was written for
      // was never there. Silent in AJ: tones do not throw matter.
      const kNow = this.uniforms.uKick.value as number
      const sNow = this.uniforms.uSnare.value as number
      const hNow = this.uniforms.uHat.value as number
      const quiet = 1 - aj
      this.sim.setAudio(
        this.uniforms.uBands.value as Float32Array,
        Math.max(0, kNow - this.kickPrev) * quiet,
        Math.max(0, sNow - this.snarePrev) * quiet,
        Math.max(0, hNow - this.hatPrev) * 0.5 * quiet,
      )
      this.kickPrev = kNow
      this.snarePrev = sNow
      this.hatPrev = hNow
      this.sim.step(dt)
      // REBIND EVERY FRAME. The sim ping-pongs between two targets, so
      // offsetTexture is a different object after every step. Binding it
      // once in the constructor left the shell sampling whichever target
      // the sim was about to write -- reading and writing one texture in a
      // single draw is undefined, and it rendered as the star smeared
      // across the stage in tiles.
      this.uniforms.uSim.value = this.sim.offsetTexture
      // Reduced motion keeps the boil (it is content) and loses most of
      // the throw (that is decoration). The dive fades it out entirely:
      // the camera is inside the body there, and displaced points land on
      // the gl_PointSize floor as blobs straight into the bloom.
      const calm = this.calm ? 0.35 : 1
      this.uniforms.uSimAmt.value = SIM_AMT * this.simDial * calm * (1 - Math.min(1, this.bootRev)) * this.uniforms.uReveal.value
    }
    if (this._theme === 'paper') this.printBudget()
    this.composer.render()
  }
}
