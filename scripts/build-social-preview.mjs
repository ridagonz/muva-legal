import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const width = 1200;
const height = 630;
const output = new URL("../public/social/", import.meta.url);
await mkdir(output, { recursive: true });
const logoPath = new URL("../public/images/muva-logo.png", import.meta.url);
const logo = await readFile(logoPath);
// Decode every source pixel before using the logo in a sharing image.
await sharp(logo, { failOn: "error" }).raw().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#242a3d"/>
  <path d="M1000 0h100l-90 150H910z" fill="#4564f2" opacity=".35"/>
  <path d="M1100 0h100l-90 150h-100z" fill="#77a8ff" opacity=".25"/>
  <image x="300" y="40" width="600" height="334" href="data:image/png;base64,${logo.toString("base64")}"/>
  <text x="600" y="451" text-anchor="middle" fill="#ffffff" font-size="44" font-weight="600" font-family="Arial,Helvetica,sans-serif">Estrategia penal con criterio.</text>
  <text x="600" y="511" text-anchor="middle" fill="#d4d9e5" font-size="25" font-family="Arial,Helvetica,sans-serif">Defensa · Representación de víctimas · Prevención</text>
  <rect x="520" y="563" width="160" height="5" fill="#77a8ff"/>
</svg>`;
const source = Buffer.from(svg);
const jpegPath = new URL("muva-legal-whatsapp-v2.jpg", output);
await sharp(source).flatten({ background: "#242a3d" }).toColourspace("srgb")
  .jpeg({ quality: 88, progressive: false, chromaSubsampling: "4:4:4" }).toFile(fileURLToPath(jpegPath));
// Keep the previous public URL valid for existing bookmarks and older consumers.
await sharp(source).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL("../public/og.png", import.meta.url)));
const { data, info } = await sharp(fileURLToPath(jpegPath), { failOn: "error" }).removeAlpha().raw()
  .toBuffer({ resolveWithObject: true });
assert.equal(info.width, width);
assert.equal(info.height, height);
assert.equal(info.channels, 3);
for (let y = 0; y < height; y++) {
  let sum = 0;
  for (let x = 0; x < width * 3; x++) sum += data[y * width * 3 + x];
  assert.ok(sum / (width * 3) > 10, `Unexpected black band at row ${y}`);
}
const bytes = await readFile(jpegPath);
assert.ok(bytes.length < 300_000, "Sharing image should remain under 300 KB");
await writeFile(new URL("preview-info.json", output),
  JSON.stringify({ width, height, type: "image/jpeg", bytes: bytes.length }) + "\n");
console.log(`Validated sharing image: ${width}x${height}, ${bytes.length} bytes, no black bands`);
