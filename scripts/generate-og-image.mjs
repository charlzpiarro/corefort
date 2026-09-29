/**
 * Generates the default social share image (public/images/og/default.png, 1200x630) used by
 * every page's OpenGraph/Twitter metadata. Built from the site's own brand tokens and the
 * circular Corefort mark, no external assets.
 *   node scripts/generate-og-image.mjs
 */
import sharp from "sharp";
import fs from "node:fs";

const W = 1200, H = 630;
const OUT_DIR = "public/images/og";
fs.mkdirSync(OUT_DIR, { recursive: true });

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#05060A"/>
      <stop offset="0.55" stop-color="#12225E"/>
      <stop offset="1" stop-color="#3A56E8"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="18%" r="60%">
      <stop offset="0" stop-color="#FBB040" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#FBB040" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FBB040"/>
      <stop offset="1" stop-color="#FBB040" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g opacity="0.08" stroke="#FFFFFF" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 105}" x2="${W}" y2="${i * 105}"/>`).join("")}
  </g>
  <circle cx="1040" cy="120" r="230" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1.5"/>
  <circle cx="1040" cy="120" r="160" fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>

  <rect x="96" y="108" width="64" height="6" rx="3" fill="url(#rule)"/>
  <text x="96" y="280" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#FFFFFF">Corefort</text>
  <text x="96" y="352" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#FFFFFF">Technologies</text>
  <text x="97" y="410" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="500" fill="#C9D3F5">Software, cloud, cybersecurity and connectivity</text>
  <text x="97" y="446" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="500" fill="#C9D3F5">built for businesses across Tanzania and the region.</text>
</svg>`;

const mark = await sharp("public/images/logo/corefort-mark-512.png").resize(300, 300).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: mark, left: 1040 - 150, top: 120 - 150 }])
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/default.png`);

console.log("wrote", `${OUT_DIR}/default.png`, (fs.statSync(`${OUT_DIR}/default.png`).size / 1024 | 0) + "KB");
