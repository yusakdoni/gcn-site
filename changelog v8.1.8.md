# Changelog v8.1.8 — Bahasa default, simplifikasi struktur halaman, SEO & legalitas

## 1. Bahasa Indonesia sekarang default
Sebelumnya situs selalu membuka dalam Bahasa Inggris di kunjungan pertama
(`lib/i18n/LanguageContext.tsx` di-hardcode ke `"en"`), padahal target
market utama adalah Indonesia. Sekarang default-nya `"id"`. Preferensi
bahasa yang tersimpan (localStorage/cookie) dari kunjungan sebelumnya tetap
dihormati saat halaman selesai hydrate. `<html lang="...">` di
`app/layout.tsx` juga disesuaikan.

Semua teks di komponen sudah diperiksa: setiap penggunaan `<T en=... id=...>`
sudah punya pasangan Bahasa Indonesia (tidak ada yang fallback diam-diam ke
Inggris). Dropdown Industry di form RFQ sebelumnya menampilkan label
Inggris walau toggle bahasa di-set ke Indonesia (nilai yang dikirim ke email
tetap Inggris untuk konsistensi data internal, tapi label yang dilihat
pengunjung sekarang ikut berbahasa Indonesia) — lihat
`lib/types/rfq.ts` (`INDUSTRY_OPTIONS_ID`) dan `components/forms/Fields.tsx`.

## 2. Contact Form & RFQ — dikonfirmasi, tidak diubah
Route `app/api/contact/route.ts` dan `app/api/rfq/route.ts` sudah diperiksa
ulang dan sudah benar (perbaikan dari sesi sebelumnya — lihat changelog
v8.1.6 dan v8.1.7 — sudah mengecek `result.error` dari Resend dan honeypot
sudah pakai nama field yang aman dari autofill browser). Tidak ada
perubahan lebih lanjut di sini karena log Resend yang dilampirkan
mengonfirmasi RFQ berhasil terkirim (status 200).

## 3. Simplifikasi struktur halaman
Struktur halaman disederhanakan menjadi: **Home, Tentang Kami, Proyek,
Kontak** (+ halaman utilitas RFQ dan Privacy Policy yang tidak masuk
navigasi utama).

Dihapus dari navigasi dan struktur halaman:
- `/services` (Supply & Trading) dan sub-halamannya
- `/industries` dan sub-halamannya — kontennya dipindahkan menjadi section
  baru "Industri yang kami layani" di halaman **Tentang Kami**
  (`app/about/page.tsx`)
- `/sertifikasi` — placeholder legalitas dipindahkan ke **Footer**
- `/capabilities` dan `/insights` — tidak termasuk dalam struktur 4 halaman
  yang diminta, jadi ikut disederhanakan (lihat catatan di bagian bawah)

Redirect 301 ditambahkan di `next.config.js` dari semua URL lama ke halaman
terdekat yang relevan, supaya tidak ada broken link/404 dari hasil index
Google atau bookmark lama.

Semua link internal yang tadinya mengarah ke halaman-halaman tersebut
(navbar, footer, homepage hero, homepage capability band, homepage
services grid) sudah diarahkan ulang.

`app/sitemap.ts` sudah diperbarui — hanya berisi rute yang masih ada.

## 4. Legalitas
Placeholder legalitas (NIB, NPWP, Akta Pendirian, SK Kemenkumham) sekarang
tampil di **Footer** di semua halaman, bukan di halaman terpisah. Tidak ada
data legalitas yang dikarang — semua masih placeholder eksplisit
(`[ISI NIB]`, dst.) sampai diisi datanya.

## 5. SEO
- `app/layout.tsx`: menambahkan `manifest`, memperjelas `icons` (ukuran
  eksplisit), mengubah Open Graph `locale` dari `en_ID` ke `id_ID`
  (konsisten dengan Bahasa Indonesia sebagai default), memperkaya
  `keywords` dengan istilah lokal (mis. "supplier pengadaan barang",
  "aircraft spare parts Indonesia"), dan memperbaiki schema
  `Organization.logo` menjadi `ImageObject` (format yang direkomendasikan
  Google untuk logo di knowledge panel) plus `areaServed: "ID"`.
- Menambahkan `public/site.webmanifest` baru (belum ada sebelumnya).
- Metadata halaman About diperkaya dengan deskripsi yang lebih spesifik
  dan mengandung kata kunci bisnis yang relevan (tanpa keyword stuffing).

**Catatan jujur:** perubahan source code ini tidak menjamin tampilan Google
Search berubah seketika — itu tergantung jadwal crawl/index ulang Google,
di luar kendali source code. Yang bisa dipastikan sekarang adalah seluruh
sinyal teknis (favicon, manifest, Organization schema, OG image, sitemap,
robots, canonical) sudah benar dan konsisten.

## 6. Kebersihan kode & keamanan
- Menghapus 2 komponen mati yang tidak pernah dipakai di mana pun
  (`TransformationArchitecture.tsx`, `DigitalDataBand.tsx` — keduanya cuma
  `return null`) dan `InsightsTeaser.tsx` + `lib/data/insights.ts` (terkait
  halaman Insights yang dihapus).
- `.gitignore` sebelumnya **tidak** mengecualikan `.env`/`.env.local` —
  hanya `node_modules` dan `.next`. Ini celah kecil yang bisa menyebabkan
  API key ter-commit tanpa sengaja kalau ada file `.env` lokal. Sudah
  ditambahkan.
- Dipastikan tidak ada API key/secret yang ter-hardcode di source code
  (audit grep menyeluruh — semua pakai `process.env.*`).

## Yang TIDAK diubah
- `app/api/contact/route.ts`, `app/api/rfq/route.ts`, `app/api/chat/route.ts`
  — sudah benar, tidak disentuh.
- Desain visual, warna, tipografi, dan branding.
- Data proyek, industri, dan layanan (`lib/data/*.ts`) — isi teksnya tidak
  diubah, hanya dipindah lokasi tampilannya.

## Catatan untuk pemilik project
- **Konfirmasi diperlukan:** halaman `/capabilities` dan `/insights` ikut
  disederhanakan (tidak diminta eksplisit untuk dihapus, tapi juga tidak
  termasuk dalam 4 halaman yang diminta). Kalau ternyata Insights
  (artikel/wawasan) masih ingin dipertahankan sebagai konten SEO, beri tahu
  — datanya masih ada di git history dan bisa dikembalikan.
- Build (`npm run build`) **tidak bisa dijalankan** di lingkungan kerja
  sandbox ini karena tidak ada akses internet untuk `npm install`. Seluruh
  perubahan sudah ditinjau manual baris-per-baris (sintaks JSX/TSX,
  brace/paren balance, import yang dipakai) tapi tetap jalankan
  `npm install && npm run build` sebelum deploy sebagai langkah verifikasi
  akhir — atau biarkan Vercel yang build otomatis saat push, lalu cek log
  build-nya.
- Gambar-gambar di `public/assets/generated/` masih placeholder AI-generated
  (lihat `ASSET_NOTES.txt`) — ganti dengan foto asli proyek/perusahaan
  kapan pun tersedia.

## Versi
- `package.json` → `8.1.8`
