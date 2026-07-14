const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = 'C:/Users/Admin/Downloads/ảnh landing page/ảnh thành phẩm 13 sp';
const OUT = path.join(__dirname, '..', 'assets', 'images');

const MAP = [
  ['77-79.jpg', 'jar-saving-duongphen'],
  ['84-86.jpg', 'jar-saving-tamvi'],
  ['81-83.jpg', 'jar-saving-nhansam'],
  ['87-89.jpg', 'jar-saving-duongkieng'],
  ['74-76.jpg', 'jar-saving-kids'],
  ['97-99.jpg', 'jar-plus-duongphen'],
  ['906-08.jpg', 'jar-plus-tamvi'],
  ['900-902.jpg', 'jar-plus-nhansam'],
  ['94-96.jpg', 'jar-plus-duongkieng'],
  ['909-11.jpg', 'jar-plus-kids'],
  ['920-21.jpg', 'jar-caocap-duongphen'],
  ['925-27.jpg', 'jar-caocap-nhansam'],
  ['922-24.jpg', 'jar-caocap-duongkieng']
];

async function main() {
  for (const [src, out] of MAP) {
    const srcPath = path.join(SRC, src);
    const outPath = path.join(OUT, out + '.jpg');
    const trimmed = await sharp(srcPath).rotate().trim({ background: '#ffffff', threshold: 12 }).toBuffer();
    await sharp(trimmed)
      .resize({ width: 640, height: 640, fit: 'contain', background: '#ffffff' })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(out + '.jpg', (stat.size / 1024).toFixed(0) + 'KB');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
