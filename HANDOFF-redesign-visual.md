# Handoff: Redesign thị giác landing page Yến Hũ Hoàng Triều

Dán toàn bộ file này làm tin nhắn đầu tiên cho phiên Claude mới. Đọc hết trước khi làm gì.

## 0. Việc cần làm (đúng trọng tâm, không lòng vòng)

Redesign LẠI GIAO DIỆN (màu sắc, khối, spacing, elevation, typography) của
`index.html` theo phong cách landing page mẫu:
**https://www.hoanghuyen.beauty/rejuvella3**

Một tài khoản Claude khác đã thử làm việc này và **làm sai**: kết quả ra
"quá trắng, không khối màu, không khối nổi, nhìn bị chìm" — tức là mất hết
elevation/contrast, không giống bản mẫu chỉ giống nền trắng trơn.

**Yêu cầu chủ trang (nguyên văn, phải bám sát):**
- Mục tiêu: sang trọng, sạch, đẹp, hiện đại, thoáng, đẳng cấp, bố cục chia rõ khối.
- **KHÔNG dùng lại màu vàng hoặc nâu** — bảng màu hiện tại (gold/brown) làm
  trang "nhìn giống một cái blog", chủ trang không thích, phải đổi hẳn tông màu.
- **CHỈ sửa thiết kế** — nội dung, copy, tính năng, luồng đặt hàng, dữ liệu sản
  phẩm (TIERS object) giữ nguyên 100%. Không đổi cấu trúc section, không đổi text.
- Phải nghiên cứu kỹ landing page mẫu (bố cục, cách dùng khối màu/nổi, spacing,
  typography, elevation) trước khi đổi màu — không đoán mò.
- Phải **thảo luận với ChatGPT** (qua ChatGPT web, xem mục 3) để lấy góp ý thiết kế,
  có phản biện qua lại thật (không phải hỏi cho có), rồi thống nhất hướng trước khi code.
- Sau khi xong: tự động commit + push lên GitHub. **Xin toàn bộ permission cần
  thiết ngay từ đầu phiên** (đừng hỏi giữa chừng) — chủ trang có thể không trực
  tuyến liên tục.

## 1. Thông tin dự án

- Thư mục local: `C:\Users\Admin\Downloads\hoangtrieu-yenho-landing-page\`
- File chính: `index.html` (single-file, mobile-first, 480px container, không
  có bước build — sửa trực tiếp file này).
- Repo GitHub: `yenhoangtrieu247-sys/ht-yensao` (private), branch `main`, remote
  git đã cấu hình sẵn trong thư mục local, chỉ cần `git push origin main`.
- Deploy: Vercel, tự động deploy khi push lên `main`. URL live:
  https://ht-yensao.vercel.app/
- Google Sheet log đơn hàng: tab `DonHang_HoangTrieu` trong sheet
  `1V5qupvG73ZiSkZdSxqkJCt38jg582p_OBCLDA587ikI`.
- Apps Script webhook (đã đúng schema, đừng đụng vào trừ khi được yêu cầu):
  project "Webhook - Yen Ho Hoang Trieu" tại
  `script.google.com/home/projects/1czLMGYFY3SRO-_x_68fFLG0SJbWSl3_6zQxXLAOgNPeMcL33aaaVMEMH/edit`.
- Local static server để QA: `node scripts/serve.js 8777` → http://localhost:8777

## 2. Trạng thái thiết kế hiện tại (cái cần thay)

- Design tokens ở đầu `<style>` (`:root{...}`): `--ht-gold:#DE9C13`,
  `--ht-gold-deep:#B87A0A`, `--ht-brown:#4A3417`, `--ht-ink:#3A2E1C`,
  `--ht-muted:#5C4D33`, nền kem `--ht-cream/--ht-ivory`. Màu theo dòng sản phẩm:
  Saving vàng `#E0A928`, Plus đỏ `#C23B3B`, Cao Cấp xanh `#1F8A63`.
- Font: tiêu đề `Lora` (serif đậm), phần đọc/UI `Be Vietnam Pro` (sans). Có thể
  giữ hoặc đổi nếu hợp bản mẫu hơn — nhưng đây không phải trọng tâm chính,
  trọng tâm là MÀU + KHỐI + ELEVATION.
- Layout: **chỉ mobile** (480px card canh giữa màn hình, kể cả trên desktop —
  KHÔNG làm layout desktop riêng, chủ trang đã yêu cầu bỏ việc này một lần rồi).
- Các section chính (giữ nguyên cấu trúc, chỉ đổi style): Header sticky → Hero
  (ảnh + tiêu đề + giá + CTA) → Trust strip → Countdown → So sánh 3 dòng
  (carousel `.ht-pcards`, có dots) → Hướng dẫn chọn vị (`.ht-fguide`) → Cách dùng
  (`.ht-steps`) → Nguồn gốc & chứng nhận (`.ht-origin-list` + cert gallery
  `.ht-cert-grid`) → Nguyên liệu (`.ht-feed-grid`) → CTA giữa trang → Feedback
  khách hàng thật (`.ht-feed-grid`) → Closing CTA → Footer → Sticky CTA bar →
  Popup đặt hàng (`.ht-popup`, có tier chọn + package chọn + flavor stepper).
- Ảnh thật đã có đủ: hero, 3 ảnh macro theo dòng, 13 ảnh jar theo từng vị
  (`assets/images/jar-<tier>-<flavor>.jpg`), 4 giấy chứng nhận, 4 ảnh feedback
  thật (đã che PII), ảnh nguyên liệu/cách dùng/đóng gói.

## 3. Cách thảo luận với ChatGPT (đã dùng được trong phiên trước)

- Dùng Chrome thật của chủ trang qua công cụ `claude-in-chrome` (không phải
  browser nội bộ) — tài khoản ChatGPT Plus đã đăng nhập sẵn (tên hiển thị
  "Hoàng Triều Yến"), có lịch sử chat liên quan thương hiệu này.
- **Bắt buộc xin xác nhận rõ ràng của chủ trang trước khi gửi bất kỳ nội dung
  kinh doanh nào** (giá, chiến lược, dữ liệu) sang ChatGPT — hệ thống an toàn
  từng chặn việc này 1 lần vì lý do "chia sẻ dữ liệu kinh doanh cho bên thứ 3",
  chỉ đi tiếp được sau khi hỏi thẳng chủ trang và có xác nhận "có". Nên hỏi
  ngay từ đầu phiên theo đúng yêu cầu "xin lệnh từ đầu" ở trên.
- **Gõ tiếng Việt có dấu vào ô chat của ChatGPT web có thể bị lỗi xáo trộn ký
  tự** khi gõ bằng keystroke tự động (đã gặp lỗi này) — nên soạn tin nhắn bằng
  **tiếng Anh** khi nói chuyện với ChatGPT để tránh lỗi, ChatGPT hiểu tiếng Anh
  tốt và vẫn trả lời được, kể cả khi hỏi về thương hiệu Việt Nam.
- Ô chat ChatGPT web **gửi tin ngay khi gặp Enter** (không phải Shift+Enter mới
  gửi) — nếu tin nhắn dài có xuống dòng, nó sẽ gửi sớm giữa chừng. Viết tin
  nhắn dài thành **1 đoạn liền không xuống dòng**, hoặc chia thành nhiều tin
  nhắn ngắn gửi nối tiếp.
- Đã từng đạt được 1 vòng thảo luận thật, có phản biện hai chiều và đi đến
  đồng thuận cụ thể (không cần đúng 50 lượt máy móc — quan trọng là hội tụ
  được ý kiến, không phải đếm số lượt).

## 4. Bẫy kỹ thuật đã gặp trong phiên trước (tránh lặp lại)

- **CSS cascade**: rule trong `@media` đặt sớm trong file có thể bị rule
  KHÔNG-điều-kiện đặt sau đó (cùng specificity) đè mất, dù media query đúng
  điều kiện. Luôn đặt override quan trọng ở **cuối file `<style>`**, ngay
  trước `</style>`, để chắc chắn thắng cascade.
- **Công cụ screenshot hay treo/timeout** (`computer` action:screenshot) —
  đừng cố gọi lại nhiều lần. Dùng `javascript_tool` (`getComputedStyle`,
  `getBoundingClientRect`) hoặc `get_page_text`/`read_page` để verify thay vì
  ảnh chụp màn hình.
- **`git push` có thể bị chặn bởi bộ lọc an toàn** nếu file thay đổi trông
  giống dữ liệu nhạy cảm (từng bị chặn 1 lần dù đã tự verify ảnh sạch) — nếu
  bị chặn, giải thích rõ cho chủ trang và xin xác nhận, đừng tự tìm cách lách.
- **Xoá file cũ không dùng nữa** (kể cả rác rõ ràng) có thể bị chặn nếu chủ
  trang chưa nêu đích danh file đó — cứ để file thừa nằm đó, không ảnh hưởng
  gì, đừng cố ép xoá.
- Cài `sharp` + `pdfjs-dist` + `@napi-rs/canvas` cùng lúc trong 1 lệnh
  `npm install` nếu cần xử lý ảnh/PDF — cài riêng lẻ sẽ bị ghi đè lẫn nhau do
  npm dedupe.
- Thỉnh thoảng nhiều công cụ (Bash, Browser) cùng báo lỗi
  "claude-sonnet-5 is temporarily unavailable" — đây là lỗi tạm thời phía nền
  tảng, không phải lỗi của mình, đợi và thử lại sau, đừng cố lách.
- Repo này từng có **một tài khoản Claude khác commit trực tiếp cùng lúc** —
  luôn `git pull` / xem `git log --oneline -5` đầu phiên để chắc chắn đang
  làm trên bản mới nhất.

## 5. Việc KHÔNG được đụng vào

- Dữ liệu sản phẩm/giá (object `TIERS` trong `<script>`).
- Luồng đặt hàng, cấu trúc popup, logic flavor stepper, validation.
- Schema webhook Apps Script (đã đúng, đã test thật).
- Section FAQ đang ẩn (`hidden`, trong comment "PLACEHOLDER NHÃN/CÔNG BỐ") —
  đang chờ đối chiếu nhãn thật theo quy định quảng cáo thực phẩm hiệu lực
  01/01/2026, không tự ý bật lên.
- Meta Pixel (ID `1032364466110468`) và sự kiện `CompleteRegistration` đã gắn
  đúng, đừng đổi trừ khi chủ trang yêu cầu cụ thể.

## 6. Gợi ý hướng màu (tham khảo, không bắt buộc — vẫn phải tự nghiên cứu mẫu)

Chủ trang ghét vàng/nâu vì "giống blog". Landing mẫu rejuvella3 thường thuộc
dòng mỹ phẩm/làm đẹp cao cấp — khả năng cao dùng tông trung tính sang (trắng
ngà/xám nhạt) kết hợp 1 màu nhấn đậm (đen, xanh navy, hồng đất, hoặc emerald)
và dùng shadow/blur/khối bo tròn lớn để tạo chiều sâu thay vì màu nền rực. Đây
chỉ là gợi ý ban đầu — bước đầu tiên bắt buộc vẫn là mở link mẫu, xem kỹ, rồi
mới quyết định bảng màu cụ thể cho Hoàng Triều (vẫn phải giữ tinh thần "yến
sào cao cấp", không bê nguyên màu mỹ phẩm sang).
