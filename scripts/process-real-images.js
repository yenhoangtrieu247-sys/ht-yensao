const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = 'C:/Users/Admin/Downloads/ảnh landing page';
const LOGO_SRC = 'C:/Users/Admin/Downloads/drive-download-20260605T033509Z-3-001';
const OUT = path.join(__dirname, '..', 'assets', 'images');
fs.mkdirSync(OUT, { recursive: true });

const MAXDIM = 1600;
const QUALITY = 82;

async function processPhoto(srcFile, outName) {
  const outPath = path.join(OUT, outName + '.jpg');
  await sharp(srcFile)
    .rotate()
    .resize({ width: MAXDIM, height: MAXDIM, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(outPath);
  const stat = fs.statSync(outPath);
  console.log(outName + '.jpg', (stat.size / 1024).toFixed(0) + 'KB');
}

const photoMap = [
  ['ảnh 1.png', 'hero-3tang'],
  ['ảnh 2.1.png', 'lifestyle-kids'],
  ['ảnh 2.2.png', 'lifestyle-bieuchame'],
  ['ảnh 2.3.png', 'lifestyle-hangngay'],
  ['ảnh 2.4.png', 'lifestyle-doitac'],
  ['ảnh 3.1.png', 'macro-saving'],
  ['ảnh 3.2.png', 'macro-plus'],
  ['ảnh 3.3.png', 'macro-caocap'],
  ['ảnh 4.png', 'sosanh-3tang'],
  ['ảnh 5.1.png', 'nguyenlieu-duongphen'],
  ['ảnh 5.2.png', 'nguyenlieu-nhansam'],
  ['ảnh 5.3.png', 'nguyenlieu-yensoi'],
  ['ảnh 5.4.png', 'nguyenlieu-dongtrunghathao'],
  ['ảnh 5.5.png', 'nguyenlieu-taodokytu'],
  ['ảnh 6.1.png', 'cachdung-lachu'],
  ['ảnh 6.2.png', 'cachdung-monap'],
  ['ảnh 6.3.png', 'cachdung-rotly'],
  ['ảnh 7.1.png', 'donggoi-hopqua1'],
  ['ảnh 7.2.png', 'donggoi-hopqua3'],
  ['ảnh 7.3.png', 'donggoi-hopqua2'],
];

async function main() {
  for (const [src, out] of photoMap) {
    await processPhoto(path.join(SRC, src), out);
  }

  // Certification (already rendered from PDF to PNG)
  await processPhoto(path.join(__dirname, '..', 'tmp_pdf', 'cert-page1.png'), 'giay-attp');

  // Logo: full lockup (icon + wordmark) for footer, square 1:1 padded on white
  const logoFull = path.join(LOGO_SRC, 'LOGO HOÀNG TRIỀU GỐC-01.png');
  await sharp(logoFull)
    .resize({ width: 900, height: 900, fit: 'inside' })
    .flatten({ background: '#FFFFFF' })
    .png({ quality: 90 })
    .toFile(path.join(OUT, 'logo-hoangtrieu-full.png'));
  console.log('logo-hoangtrieu-full.png done');

  // Logo icon only: crop just the bird glyph (top ~62% of the square source) for the 36x36 header dot
  const meta = await sharp(logoFull).metadata();
  const cropH = Math.round(meta.height * 0.60);
  await sharp(logoFull)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .resize({ width: 300, height: 300, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'logo-hoangtrieu.png'));
  console.log('logo-hoangtrieu.png (icon crop) done');
}

main().catch(e => { console.error(e); process.exit(1); });
