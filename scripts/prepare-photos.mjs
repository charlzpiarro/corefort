/**
 * Prepares the marketing photos in public/images/photos from design-assets/originals.
 *   node scripts/prepare-photos.mjs
 * - robot-corefort: the "Ledgr" wordmark on the glass card is painted out and the Corefort mark is placed on it.
 * - ai-robot: cropped from a poster so its baked-in headline is not shown.
 * The other crops are plain resizes/crops.
 */
import sharp from "sharp";
import fs from "node:fs";

const IN = "design-assets/originals/";
const OUT = "public/images/photos/";
fs.mkdirSync(OUT, { recursive: true });
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const webp = (img, name, q = 82) => img.webp({ quality: q, effort: 5 }).toFile(OUT + name);

// ---------------------------------------------------------------- 1) robot hand with the Corefort mark on the glass card
{
  const { data, info } = await sharp(IN + "robot-glass-card-ledgr.webp").removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = 3;
  // text box (measured): x 966-1214, y 322-450. Rebuild it column by column from the clean gradient above and below.
  const x0 = 962, x1 = 1218, y0 = 318, y1 = 454;
  const px = (x, y, c) => data[(y * W + x) * C + c];
  for (let x = x0; x <= x1; x++) {
    for (let c = 0; c < C; c++) {
      let top = 0, bot = 0;
      for (let k = 1; k <= 5; k++) { top += px(x, y0 - k, c); bot += px(x, y1 + k, c); }
      top /= 5; bot /= 5;
      for (let y = y0; y <= y1; y++) {
        const t = (y - y0) / (y1 - y0);
        const noise = (Math.random() - 0.5) * 2.2; // avoid visible banding
        data[(y * W + x) * C + c] = clamp(top + (bot - top) * t + noise, 0, 255);
      }
    }
  }
  // Corefort mark: white on transparent, keyed from the logo file (mark is far brighter than the gradient behind it)
  const logo = await sharp(IN + "corefort-logo-source.webp").removeAlpha().extract({ left: 548, top: 588, width: 407, height: 410 }).raw().toBuffer({ resolveWithObject: true });
  const lw = logo.info.width, lh = logo.info.height;
  const rgba = Buffer.alloc(lw * lh * 4);
  for (let i = 0; i < lw * lh; i++) {
    const m = Math.min(logo.data[i * 3], logo.data[i * 3 + 1], logo.data[i * 3 + 2]);
    rgba[i * 4] = 255; rgba[i * 4 + 1] = 255; rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = Math.round(smooth(110, 215, m) * 255);
  }
  const mark = await sharp(rgba, { raw: { width: lw, height: lh, channels: 4 } }).resize({ width: 168 }).png().toBuffer();
  const base = await sharp(data, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer();
  const glow = await sharp(mark).blur(10).modulate({ brightness: 1.2 }).png().toBuffer();
  const out = sharp(base).composite([
    { input: glow, left: 1006, top: 300, blend: "screen" },
    { input: mark, left: 1006, top: 300 },
  ]);
  await webp(out.resize({ width: 1600 }), "robot-corefort.webp", 84);
}

// ---------------------------------------------------------------- 2) security desk (wide banner + a tighter crop for panels)
await webp(sharp(IN + "security-desk-wide.webp").resize({ width: 1800 }), "security-desk-wide.webp", 80);
await webp(sharp(IN + "security-desk-wide.webp").extract({ left: 880, top: 0, width: 1039, height: 820 }).resize({ width: 1000 }), "security-desk.webp", 82);

// ---------------------------------------------------------------- 3) networking + cloud, ERP, AI
await webp(sharp(IN + "network-devices.jpg").resize({ width: 1000 }), "network-devices.webp", 82);
await webp(sharp(IN + "network-devices.jpg").extract({ left: 640, top: 90, width: 560, height: 520 }).resize({ width: 900 }), "network-globe.webp", 82);
await webp(sharp(IN + "erp-dashboard.jpg").resize({ width: 1000 }), "erp-dashboard.webp", 82);
await webp(sharp(IN + "ai-robot-poster.jpg").extract({ left: 0, top: 430, width: 600, height: 770 }).resize({ width: 800 }), "ai-robot.webp", 84);

for (const f of fs.readdirSync(OUT)) console.log(f, (fs.statSync(OUT + f).size / 1024) | 0, "KB");
