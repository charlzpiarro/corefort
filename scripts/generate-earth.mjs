/**
 * Generates the satellite-style Earth used in the hero (public/images/hero/earth.webp + clouds.webp).
 *
 * Nothing is downloaded: the coastline comes from world-atlas (already a dependency), and the colours
 * come from a small climate model (deserts, savanna, rainforest, forest, mountains, snow) plus fractal
 * noise for terrain and cloud texture. The projection settings MUST match components/HeroSection/NetworkMap.tsx
 * so the animated network nodes land on the right cities.
 *
 *   node scripts/generate-earth.mjs
 */
import fs from "node:fs";
import sharp from "sharp";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

// ---- must match NetworkMap.tsx (640 x 640 canvas, geoMercator center [26, 10], scale 310)
const VIEW = 640;
const CENTER = [26, 10];
const SCALE = 310;

const W = 1024; // output pixels
const K = W / VIEW;
const OUT = "public/images/hero";

const topo = JSON.parse(fs.readFileSync("node_modules/world-atlas/land-50m.json", "utf8"));
const land = feature(topo, topo.objects.land);
const proj = geoMercator().center(CENTER).scale(SCALE * K).translate([W / 2, W / 2]);

// ------------------------------------------------------------------ helpers
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a + (b - a) * t;
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mixC = (c1, c2, t) => [mix(c1[0], c2[0], t), mix(c1[1], c2[1], t), mix(c1[2], c2[2], t)];
const ramp = (stops, v) => {
  if (v <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) if (v <= stops[i][0]) return mixC(stops[i - 1][1], stops[i][1], (v - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0]));
  return stops[stops.length - 1][1];
};

// seeded gradient noise (optionally periodic so the cloud layer tiles)
function makeNoise(seed) {
  const perm = new Uint8Array(512);
  const p = Array.from({ length: 256 }, (_, i) => i);
  let s = seed >>> 0;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = (h, x, y) => { const a = (h & 7) * (Math.PI / 4); return Math.cos(a) * x + Math.sin(a) * y; };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  return function noise(x, y, period = 0) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const w = (v) => (period ? ((v % period) + period) % period : v) & 255;
    const x0 = w(xi), x1 = w(xi + 1), y0 = w(yi), y1 = w(yi + 1);
    const u = fade(xf), v = fade(yf);
    const n00 = grad(perm[perm[x0] + y0], xf, yf);
    const n10 = grad(perm[perm[x1] + y0], xf - 1, yf);
    const n01 = grad(perm[perm[x0] + y1], xf, yf - 1);
    const n11 = grad(perm[perm[x1] + y1], xf - 1, yf - 1);
    return mix(mix(n00, n10, u), mix(n01, n11, u), v) * 1.4; // roughly -1..1
  };
}
const noiseA = makeNoise(7), noiseB = makeNoise(31), noiseC = makeNoise(99);
const fbm = (n, x, y, oct = 5, period = 0) => {
  let a = 0.5, f = 1, sum = 0, norm = 0;
  for (let o = 0; o < oct; o++) { sum += a * n(x * f, y * f, period ? period * f : 0); norm += a; a *= 0.5; f *= 2; }
  return sum / norm; // -1..1
};

// ------------------------------------------------------------------ land mask (with organic coastline)
console.log("rasterising coastline...");
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}"><rect width="100%" height="100%" fill="#000"/><path d="${geoPath(proj)(land)}" fill="#fff"/></svg>`;
const maskRaw = await sharp(Buffer.from(maskSvg)).greyscale().raw().toBuffer();
const sample = (buf, x, y) => {
  const xi = clamp(Math.floor(x), 0, W - 2), yi = clamp(Math.floor(y), 0, W - 2);
  const fx = clamp(x - xi, 0, 1), fy = clamp(y - yi, 0, 1);
  const a = buf[yi * W + xi], b = buf[yi * W + xi + 1], c = buf[(yi + 1) * W + xi], d = buf[(yi + 1) * W + xi + 1];
  return mix(mix(a, b, fx), mix(c, d, fx), fy) / 255;
};

// domain-warp the mask a few pixels so straight polygon edges become a fractal-looking shoreline
const mask = new Float32Array(W * W);
for (let y = 0; y < W; y++) {
  for (let x = 0; x < W; x++) {
    const wx = fbm(noiseA, x / 34, y / 34, 4) * 5.5 + fbm(noiseB, x / 9, y / 9, 3) * 1.6;
    const wy = fbm(noiseB, x / 34 + 40, y / 34 + 40, 4) * 5.5 + fbm(noiseC, x / 9, y / 9, 3) * 1.6;
    mask[y * W + x] = sample(maskRaw, x + wx, y + wy);
  }
}

// blurred land masks: how close is each ocean pixel to a coast
const blurOf = async (sigma) => {
  const raw = Buffer.alloc(W * W);
  for (let i = 0; i < raw.length; i++) raw[i] = Math.round(mask[i] * 255);
  const { data, info } = await sharp(raw, { raw: { width: W, height: W, channels: 1 } }).blur(sigma).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
  if (info.channels === 1) return data;
  const one = Buffer.alloc(W * W);
  for (let i = 0; i < one.length; i++) one[i] = data[i * info.channels];
  return one;
};
const [L1, L2, L3] = await Promise.all([blurOf(4), blurOf(14), blurOf(38)]);

// ------------------------------------------------------------------ climate model
const wrapDx = (a, b) => { let d = a - b; if (d > 180) d -= 360; if (d < -180) d += 360; return d; };
const blob = (lon, lat, cx, cy, rx, ry) => { const dx = wrapDx(lon, cx) / rx, dy = (lat - cy) / ry; return Math.exp(-(dx * dx + dy * dy)); };

const DESERTS = [
  [12, 23, 32, 7.5, 1.0], [-6, 25, 12, 6, 0.9], [26, 26, 12, 5, 1.0], [46, 23, 12, 8, 1.0], [55, 33, 12, 6, 0.75],
  [62, 41, 10, 5, 0.6], [71, 27, 5, 3, 0.6], [21, -23, 9, 6, 0.8], [46, 6, 6, 5, 0.6], [22, -31, 6, 3, 0.55],
  [66, 47, 14, 5, 0.5], [-8, 21, 8, 3, 0.7], [37, 20, 6, 4, 0.7],
];
const WET = [
  [22, -1, 13, 8, 1.0], [-4, 6.5, 12, 3.5, 0.9], [8, 5, 8, 3, 0.9], [38, 9, 5, 4, 0.75], [33, 0, 7, 6, 0.7],
  [47, -18, 3.5, 7, 0.9], [35, -16, 4, 6, 0.6], [76, 13, 6, 8, 0.6], [92, 22, 6, 6, 0.9], [10, 48, 20, 8, 0.55],
  [-3, 54, 6, 4, 0.75], [24, -11, 12, 5, 0.6], [30, -26, 5, 5, 0.5], [28, 52, 14, 5, 0.5], [104, 12, 8, 8, 0.9],
];
const MOUNTS = [
  [-3, 32, 8, 2, 0.7], [38, 10, 4, 3.5, 0.95], [6, 23, 4, 3, 0.55], [17, 21, 3, 2.5, 0.55], [29, -29, 4, 3, 0.65],
  [49, 33, 6, 3, 0.8], [44, 42.5, 6, 1.6, 0.9], [10, 46.5, 6, 1.7, 1.0], [36, 37.5, 8, 1.5, 0.75], [75, 34, 12, 4, 1.0],
  [64, 35, 6, 2.5, 0.8], [30, -6, 3, 6, 0.5], [-2, 42.5, 5, 1.2, 0.75], [24, 46, 6, 2, 0.6], [56, 25, 3, 2, 0.6],
  [35, 12, 2, 6, 0.45], [78, 15, 3, 5, 0.35],
];
const sumBlobs = (list, lon, lat) => { let s = 0; for (const [cx, cy, rx, ry, w] of list) s = Math.max(s, w * blob(lon, lat, cx, cy, rx, ry)); return s; };

const C = {
  desertDark: hex("#b98352"), desert: hex("#d3ad70"), desertLight: hex("#e4cb92"), khaki: hex("#b5a466"),
  savanna: hex("#8d9245"), grass: hex("#5b8f3a"), forest: hex("#2f6b2d"), deep: hex("#18512a"), rain: hex("#0e3d1e"),
  boreal: hex("#2b4d38"), tundra: hex("#8b9484"), rock: hex("#7d6b5a"), rockDark: hex("#5a4d42"), snow: hex("#f3f6f8"),
};
const LAND_RAMP = [
  [0.0, C.desertDark], [0.12, C.desert], [0.24, C.desertLight], [0.36, C.khaki], [0.48, C.savanna],
  [0.62, C.grass], [0.76, C.forest], [0.9, C.deep], [1.0, C.rain],
];

// lakes & rivers painted as water on land
const LAKES = [[32.9, -1.0, 1.7, 1.7], [29.6, -6.3, 0.55, 3.4], [34.6, -11.9, 0.55, 2.6], [36, 3.5, 0.5, 1.2], [14, 13, 0.9, 0.8], [26, 18, 0, 0]];
const NILE = [[32.5, 15.6], [33.3, 17], [32.7, 19.2], [31.4, 22], [31.5, 24.5], [31.1, 27], [31.2, 30], [31.1, 31.4]];
const distToSeg = (px, py, ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay; const t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)); return Math.hypot(px - (ax + t * dx), py - (ay + t * dy)); };

const OCEAN = { coast: hex("#3fd9c8"), shelf: hex("#1d9bb8"), mid: hex("#0d5a9a"), deep: hex("#062b63"), abyss: hex("#031a45") };

// terrain height (for relief shading). computed first so we can take finite differences.
console.log("terrain...");
const height = new Float32Array(W * W);
const lonlat = new Float32Array(W * W * 2);
for (let y = 0; y < W; y++) {
  for (let x = 0; x < W; x++) {
    const ll = proj.invert([x, y]);
    lonlat[(y * W + x) * 2] = ll[0];
    lonlat[(y * W + x) * 2 + 1] = ll[1];
    const m = sumBlobs(MOUNTS, ll[0], ll[1]);
    const ridge = 1 - Math.abs(fbm(noiseA, x / 60, y / 60, 5)) * 2; // ridged noise
    height[y * W + x] = m * (0.55 + 0.75 * clamp(ridge)) + fbm(noiseB, x / 22, y / 22, 5) * 0.16 + fbm(noiseC, x / 90, y / 90, 3) * 0.1;
  }
}

// ------------------------------------------------------------------ colour every pixel
console.log("colouring...");
const rgb = Buffer.alloc(W * W * 3);
for (let y = 0; y < W; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const lon = lonlat[i * 2], lat = lonlat[i * 2 + 1];
    const alat = Math.abs(lat);
    const landness = smooth(0.42, 0.58, mask[i]);

    // ---------- ocean
    const l1 = L1[i] / 255, l2 = L2[i] / 255, l3 = L3[i] / 255;
    let ocean = OCEAN.deep;
    ocean = mixC(ocean, OCEAN.abyss, smooth(0.0, 1.0, 1 - clamp(l3 * 5)) * 0.55);
    ocean = mixC(ocean, OCEAN.mid, smooth(0.02, 0.32, l3));
    ocean = mixC(ocean, OCEAN.shelf, smooth(0.05, 0.42, l2));
    ocean = mixC(ocean, OCEAN.coast, smooth(0.18, 0.62, l1));
    const swirl = fbm(noiseC, x / 70, y / 70, 4);
    ocean = ocean.map((v) => v * (1 + swirl * 0.16));

    // ---------- land
    const A = sumBlobs(DESERTS, lon, lat);
    const Wt = sumBlobs(WET, lon, lat);
    const tropic = 0.5 * (1 - smooth(14, 26, alat));
    const temperate = 0.6 * smooth(28, 40, alat) * (1 - smooth(56, 66, alat));
    let g = clamp(tropic + temperate + Wt * 0.85 - A * 1.15 + 0.06);
    g = clamp(g + fbm(noiseA, x / 46, y / 46, 5) * 0.2 + fbm(noiseB, x / 12, y / 12, 3) * 0.07);
    let col = ramp(LAND_RAMP, g);
    // boreal + tundra + polar
    col = mixC(col, C.boreal, smooth(50, 60, alat) * 0.75 * (1 - smooth(62, 68, alat)));
    col = mixC(col, C.tundra, smooth(62, 68, alat) * 0.8);
    // mountains: rock, then snow on the very high ones
    const h = height[i];
    const mount = smooth(0.32, 0.8, h);
    col = mixC(col, mixC(C.rock, C.rockDark, clamp(fbm(noiseB, x / 15, y / 15, 3) * 0.5 + 0.5)), mount * 0.72);
    col = mixC(col, C.snow, smooth(0.86, 1.08, h + fbm(noiseC, x / 8, y / 8, 3) * 0.08) * (0.3 + 0.7 * smooth(28, 44, alat)) * 0.85);
    col = mixC(col, C.snow, smooth(70, 76, alat));
    // relief shading, light from the north-west
    const hx = height[i - (x > 0 ? 1 : 0)] - height[i + (x < W - 1 ? 1 : 0)];
    const hy = height[i - (y > 0 ? W : 0)] - height[i + (y < W - 1 ? W : 0)];
    const shade = clamp((hx + hy) * 5.2, -0.6, 0.6);
    col = col.map((v) => v * (1 + shade * 0.75) * (1 + fbm(noiseA, x / 2.6, y / 2.6, 2) * 0.07));
    // green fringe of vegetation along coasts inside arid zones
    col = mixC(col, mixC(col, C.savanna, 0.35), smooth(0.5, 0.95, l1) * A * 0.4);

    // Nile ribbon
    let nd = 1e9;
    for (let s = 0; s < NILE.length - 1; s++) nd = Math.min(nd, distToSeg(lon, lat, NILE[s][0], NILE[s][1], NILE[s + 1][0], NILE[s + 1][1]));
    col = mixC(col, hex("#3d8a3a"), (1 - smooth(0.04, 0.2, nd)) * 0.9);
    col = mixC(col, hex("#2e7d3a"), (1 - smooth(0.6, 1.5, Math.hypot(lon - 31, (lat - 30.7) * 1.2))) * 0.45 * (lat > 30 ? 1 : 0)); // delta

    // lakes
    let lakeW = 0;
    for (const [cx, cy, rx, ry] of LAKES) if (rx > 0) lakeW = Math.max(lakeW, 1 - smooth(0.7, 1.05, Math.hypot((lon - cx) / rx, (lat - cy) / ry) * (1 + fbm(noiseB, x / 6, y / 6, 3) * 0.45)));
    col = mixC(col, mixC(OCEAN.shelf, OCEAN.mid, 0.5), lakeW);

    const out = mixC(ocean, col, landness);
    // soft globe-style limb darkening baked lightly into the texture edges
    const rr = Math.hypot(x - W / 2, y - W / 2) / (W / 2);
    const limb = 1 - smooth(0.78, 1.0, rr) * 0.38;
    rgb[i * 3] = clamp(out[0] * limb, 0, 255);
    rgb[i * 3 + 1] = clamp(out[1] * limb, 0, 255);
    rgb[i * 3 + 2] = clamp(out[2] * limb, 0, 255);
  }
}

fs.mkdirSync(OUT, { recursive: true });
await sharp(rgb, { raw: { width: W, height: W, channels: 3 } })
  .modulate({ saturation: 1.12, brightness: 1.03 })
  .sharpen({ sigma: 0.7 })
  .webp({ quality: 84, effort: 5 })
  .toFile(`${OUT}/earth.webp`);
console.log("earth.webp written");

// ------------------------------------------------------------------ seamless cloud layer (tiles horizontally)
console.log("clouds...");
const CW = 1024, CH = 1024, PER = 8; // lattice period so both axes wrap
const cloud = Buffer.alloc(CW * CH * 4);
for (let y = 0; y < CH; y++) {
  for (let x = 0; x < CW; x++) {
    const u = (x / CW) * PER, v = (y / CH) * PER;
    const n = fbm(noiseA, u, v, 6, PER) * 0.5 + 0.5;
    const swirl = fbm(noiseB, u * 0.5 + 3, v * 0.5, 3, PER / 2) * 0.5 + 0.5;
    const d = clamp(n * 0.8 + swirl * 0.35 - 0.06);
    const a = smooth(0.5, 0.78, d) * 0.9;
    const o = (y * CW + x) * 4;
    const shadeTone = 255 - Math.round(smooth(0.6, 1, d) * 18);
    cloud[o] = shadeTone; cloud[o + 1] = shadeTone; cloud[o + 2] = 255;
    cloud[o + 3] = Math.round(a * 255);
  }
}
await sharp(cloud, { raw: { width: CW, height: CH, channels: 4 } }).blur(0.6).resize(768, 768).webp({ quality: 68, alphaQuality: 60, effort: 5 }).toFile(`${OUT}/clouds.webp`);
console.log("clouds.webp written");
