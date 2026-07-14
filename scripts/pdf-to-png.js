const path = require('path');
const fs = require('fs');
const { createCanvas } = require('@napi-rs/canvas');

async function main() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  const scale = parseFloat(process.argv[4] || '2.2');

  const data = new Uint8Array(fs.readFileSync(inputPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({ canvasContext: ctx, viewport }).promise;

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buf);
  console.log('Rendered', outputPath, viewport.width, 'x', viewport.height);
}

main().catch(e => { console.error(e); process.exit(1); });
