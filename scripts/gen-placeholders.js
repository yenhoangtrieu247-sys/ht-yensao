const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets', 'images');
fs.mkdirSync(outDir, { recursive: true });

const sizes = {
  square: [800, 800],
  card: [800, 1000],   // 4:5
  fb: [750, 1000],     // 3:4
  wide: [800, 600],    // 4:3
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrapLines(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function makeSVG(w, h, label, sub, seed) {
  const lines = wrapLines(label, 22);
  const lineHeight = 34;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2 - (sub ? 14 : 0) + 30;
  const textEls = lines.map((l, i) =>
    `<text x="50%" y="${startY + i * lineHeight}" text-anchor="middle" font-family="'Be Vietnam Pro',Arial,sans-serif" font-size="30" font-weight="700" fill="#5B4222">${esc(l)}</text>`
  ).join('\n');
  const subEl = sub ? `<text x="50%" y="${startY + lines.length * lineHeight + 12}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#A87F3B">${esc(sub)}</text>` : '';
  const gid = 'g' + (seed || Math.random().toString(36).slice(2, 8));
  const dotY = h - 70;
  const dotCx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="${gid}bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF0D2"/>
      <stop offset="45%" stop-color="#F6E0AE"/>
      <stop offset="100%" stop-color="#E9C87E"/>
    </linearGradient>
    <radialGradient id="${gid}glow" cx="50%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${gid}ic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DE9C13"/>
      <stop offset="100%" stop-color="#9A6B14"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#${gid}bg)"/>
  <rect width="100%" height="100%" fill="url(#${gid}glow)"/>
  <circle cx="${w * 0.08}" cy="${h * 0.1}" r="${w * 0.28}" fill="#C23B3B" opacity="0.08"/>
  <circle cx="${w * 0.95}" cy="${h * 0.92}" r="${w * 0.32}" fill="#1F8A63" opacity="0.10"/>
  <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="#C9971F" stroke-width="2.5" stroke-dasharray="1 9" stroke-linecap="round" rx="20" opacity="0.6"/>
  <circle cx="${w/2}" cy="${h/2 - 60}" r="38" fill="url(#${gid}ic)"/>
  <text x="50%" y="${h/2 - 48}" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" fill="#fff">🖼</text>
  <circle cx="${dotCx - 22}" cy="${dotY}" r="7" fill="#E0A928"/>
  <circle cx="${dotCx}" cy="${dotY}" r="7" fill="#C23B3B"/>
  <circle cx="${dotCx + 22}" cy="${dotY}" r="7" fill="#1F8A63"/>
  ${textEls}
  ${subEl}
  <text x="50%" y="${h - 34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="600" fill="#8a6633">PLACEHOLDER — thay ảnh thật sau</text>
</svg>`;
}

const items = [
  // Product jars (13) — card ratio
  ['jar-saving-duongkieng', 'card', 'Saving', 'Vị Đường Kiêng'],
  ['jar-saving-tamvi', 'card', 'Saving', 'Vị Tam Vị'],
  ['jar-saving-nhansam', 'card', 'Saving', 'Vị Nhân Sâm'],
  ['jar-saving-duongphen', 'card', 'Saving', 'Vị Đường Phèn'],
  ['jar-saving-kids', 'card', 'Saving', 'Vị Kids'],
  ['jar-plus-duongkieng', 'card', 'Plus', 'Vị Đường Kiêng'],
  ['jar-plus-tamvi', 'card', 'Plus', 'Vị Tam Vị'],
  ['jar-plus-nhansam', 'card', 'Plus', 'Vị Nhân Sâm'],
  ['jar-plus-duongphen', 'card', 'Plus', 'Vị Đường Phèn'],
  ['jar-plus-kids', 'card', 'Plus', 'Vị Kids'],
  ['jar-caocap-duongkieng', 'card', 'Cao Cấp', 'Vị Đường Kiêng'],
  ['jar-caocap-duongphen', 'card', 'Cao Cấp', 'Vị Đường Phèn'],
  ['jar-caocap-nhansam', 'card', 'Cao Cấp', 'Vị Nhân Sâm'],
  // Hero / lifestyle / macro / etc (mục 0.5)
  ['hero-3tang', 'square', 'HERO', '3 hũ 3 tầng cạnh nhau'],
  ['lifestyle-kids', 'card', 'Lifestyle', 'Mẹ dùng cho con nhỏ'],
  ['lifestyle-bieuchame', 'card', 'Lifestyle', 'Biếu cha mẹ lớn tuổi'],
  ['lifestyle-hangngay', 'card', 'Lifestyle', 'Dùng buổi sáng đi làm'],
  ['lifestyle-doitac', 'card', 'Lifestyle', 'Biếu sếp / đối tác'],
  ['macro-saving', 'square', 'Macro nhãn', 'Saving — hàm lượng yến'],
  ['macro-plus', 'square', 'Macro nhãn', 'Plus — hàm lượng yến'],
  ['macro-caocap', 'square', 'Macro nhãn', 'Cao Cấp — hàm lượng yến'],
  ['sosanh-3tang', 'wide', 'So sánh', '3 hũ 3 tầng cùng cỡ'],
  ['nguyenlieu-duongphen', 'square', 'Nguyên liệu', 'Đường phèn viên'],
  ['nguyenlieu-nhansam', 'square', 'Nguyên liệu', 'Củ nhân sâm'],
  ['nguyenlieu-yensoi', 'square', 'Nguyên liệu', 'Sợi yến trắng'],
  ['nguyenlieu-dongtrunghathao', 'square', 'Nguyên liệu', 'Đông trùng hạ thảo'],
  ['nguyenlieu-taodokytu', 'square', 'Nguyên liệu', 'Táo đỏ + Kỳ tử'],
  ['cachdung-lachu', 'square', 'Cách dùng', 'Bước 1 — Lắc nhẹ hũ'],
  ['cachdung-monap', 'square', 'Cách dùng', 'Bước 2 — Mở nắp'],
  ['cachdung-rotly', 'square', 'Cách dùng', 'Bước 3 — Dùng trực tiếp'],
  ['donggoi-hopqua1', 'square', 'Đóng gói', 'Hộp quà hoàn chỉnh'],
  ['donggoi-hopqua2', 'square', 'Đóng gói', 'Khoảnh khắc trao quà'],
  ['feedback-1', 'fb', 'Feedback', 'Ảnh khách hàng thật #1'],
  ['feedback-2', 'fb', 'Feedback', 'Ảnh khách hàng thật #2'],
  ['feedback-3', 'fb', 'Feedback', 'Ảnh khách hàng thật #3'],
  ['feedback-4', 'fb', 'Feedback', 'Ảnh khách hàng thật #4'],
  ['feedback-5', 'fb', 'Feedback', 'Ảnh khách hàng thật #5'],
  ['giay-attp', 'wide', 'Chứng nhận', 'Giấy ATTP / HACCP'],
  ['nha-yen-that', 'wide', 'Xuất xứ', 'Nhà yến Khánh Hòa'],
  ['logo-hoangtrieu', 'square', 'Logo', 'Hoàng Triều Nest Gift'],
];

for (const [name, size, label, sub] of items) {
  const [w, h] = sizes[size];
  fs.writeFileSync(path.join(outDir, name + '.svg'), makeSVG(w, h, label, sub, name.replace(/[^a-z0-9]/gi, '')));
}

console.log(`Generated ${items.length} placeholder SVGs into ${outDir}`);
