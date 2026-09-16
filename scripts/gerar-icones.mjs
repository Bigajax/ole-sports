/**
 * Gera o favicon e a imagem de compartilhamento da Olé Sports a partir
 * da logo recortada (public/marca/logo.png): app/icon.png (512) e
 * app/apple-icon.png (180) com a logo sobre o branco; public/og/site.jpg
 * (1200x630) com a logo sobre o gramado e as linhas de giz.
 *
 *   node scripts/gerar-icones.mjs
 */
import fs from "node:fs";
import sharp from "sharp";

const BRANCO = "#ffffff";
const GRAMADO = "#0f6b35";

async function icone(tamanho, destino) {
  const logo = await sharp("public/marca/logo.png").resize({ width: Math.round(tamanho * 0.86) }).png().toBuffer();
  const meta = await sharp(logo).metadata();
  await sharp({ create: { width: tamanho, height: tamanho, channels: 4, background: BRANCO } })
    .composite([{ input: logo, left: Math.round((tamanho - meta.width) / 2), top: Math.round((tamanho - meta.height) / 2) }])
    .png()
    .toFile(destino);
  console.log(destino, tamanho);
}

async function og() {
  const L = 1200, A = 630;
  fs.mkdirSync("public/og", { recursive: true });
  const logo = await sharp("public/marca/logo.png").resize({ width: 420 }).png().toBuffer();
  const lm = await sharp(logo).metadata();
  const fundo = Buffer.from(`<svg width="${L}" height="${A}">
    <style>text{font-family:Impact,"Arial Narrow",Arial,sans-serif}</style>
    <rect width="${L}" height="${A}" fill="${GRAMADO}"/>
    <g fill="none" stroke="#ffffff" stroke-width="3" opacity="0.35">
      <rect x="-200" y="40" width="1600" height="900"/>
      <line x1="600" y1="40" x2="600" y2="940"/>
      <circle cx="600" cy="490" r="130"/>
      <rect x="-200" y="200" width="240" height="580"/>
      <rect x="1160" y="200" width="240" height="580"/>
    </g>
    <rect x="80" y="130" width="${lm.width + 80}" height="${lm.height + 60}" rx="12" fill="#ffffff"/>
    <text x="640" y="290" font-size="54" fill="#ffffff" letter-spacing="1">SEU TIME ENTRA</text>
    <text x="640" y="350" font-size="54" fill="#ffffff" letter-spacing="1">EM CAMPO FARDADO.</text>
    <text x="640" y="404" font-size="21" font-family="Arial, sans-serif" fill="#ffffff" opacity="0.9">Uniformes esportivos personalizados,</text>
    <text x="640" y="434" font-size="21" font-family="Arial, sans-serif" fill="#ffffff" opacity="0.9">com sublimação digital. Birigui-SP,</text>
    <text x="640" y="464" font-size="21" font-family="Arial, sans-serif" fill="#ffffff" opacity="0.9">envio para todo o país. Orçamento pelo WhatsApp.</text>
  </svg>`);
  await sharp(fundo)
    .composite([{ input: logo, left: 120, top: 160 }])
    .jpeg({ quality: 88 })
    .toFile("public/og/site.jpg");
  console.log("public/og/site.jpg");
}

await icone(512, "app/icon.png");
await icone(180, "app/apple-icon.png");
await og();
