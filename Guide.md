# Panduan Edit Cepat — Situs GCN (v8.2.1)

Cara pakai: cari baris "Mau edit..." yang paling cocok, buka file yang
disebut, lalu Ctrl+F / cari teks di kolom "Cari teks/kode ini". Semua path
relatif dari root project (`/workspaces/gcn-site/...`).

Setelah edit apa pun: `npm run build` untuk cek tidak ada error, lalu
commit & push seperti biasa.

---

## 1. Halaman: Home (`/`)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Headline besar di hero | `components/layout/Hero.tsx` | `<h1 className=` |
| Sub-teks di bawah headline hero | `components/layout/Hero.tsx` | `<p className="text-white/70` (bagian awal file) |
| Tombol "Explore our business" / "Explore Construction" | `components/layout/Hero.tsx` | `Explore our business` |
| Foto/gambar latar hero | `lib/data/photos.ts` | cari key foto yang dipakai `Hero.tsx` (biasanya `hero`) |
| Section "Yang Kami Kerjakan" (grid 3 layanan) | `components/layout/Services.tsx` | isi teks ada di `lib/data/services.ts` |
| 4 angka besar (stat band) di homepage | `app/page.tsx` | `const HOME_STATS` |
| Section "How We Work" (langkah kerja) | `components/layout/HowWeWork.tsx` | teks langsung di file ini |
| Section "Explore our business / Construction" (band biru besar) | `components/layout/CapabilityBand.tsx` | teks langsung di file ini |
| Band "Become a Supplier / Partner" | `components/layout/PartnerStatement.tsx` | `Become a Supplier` |
| CTA besar terakhir sebelum footer | `components/layout/FinalCTA.tsx` | teks langsung di file ini |
| Urutan section di homepage (tambah/hapus/pindah) | `app/page.tsx` | lihat urutan `<Hero/><ValueProposition/>...` |

---

## 2. Halaman: Our Services (`/services`)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Judul besar & deskripsi di hero halaman ini | `app/services/page.tsx` | `<PageHero` |
| Daftar layanan, ringkasan, dan gambar tiap layanan | `lib/data/services.ts` | `export const SERVICES` |
| Isi detail per layanan (Supply/Trading/Construction) — daftar kapabilitas | `lib/data/services.ts` | cari `slug:"supply"` / `"trading"` / `"construction"` |
| Terjemahan Bahasa Indonesia untuk layanan | `lib/i18n/data-id.ts` | `export const SERVICES_ID` |
| Layout halaman detail (`/services/supply`, dst.) | `app/services/[slug]/page.tsx` | — |

---

## 3. Halaman: Our Work (`/our-work`)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Judul & deskripsi hero halaman ini | `app/our-work/page.tsx` | `<PageHero` |
| Daftar proyek (judul, sektor, tantangan, hasil, gambar) | `lib/data/projects.ts` | `export const PROJECTS` |
| Terjemahan Bahasa Indonesia untuk proyek | `lib/i18n/data-id.ts` | `export const PROJECTS_ID` |
| Layout halaman detail per proyek | `app/our-work/[slug]/page.tsx` | — |

> **Catatan:** Data proyek saat ini masih berlabel "contoh berbasis
> kapabilitas" (bukan klaim proyek klien nyata) — lihat field `label` di
> `lib/data/projects.ts`. Kalau sudah ada proyek klien nyata yang boleh
> dipublikasikan, edit di sini.

---

## 4. Halaman: Client Impact (`/client-impact`)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| 4 angka besar (masih placeholder `[XX]`) | `app/client-impact/page.tsx` | `const STATS =` |
| Kutipan/testimoni klien (masih placeholder) | `app/client-impact/page.tsx` | `CLIENT VOICE` |
| 3 proyek yang ditampilkan di "Illustrative Examples" | `app/client-impact/page.tsx` | `const FEATURED_SLUGS =` (isi dengan slug dari `lib/data/projects.ts`) |
| Judul & deskripsi hero halaman ini | `app/client-impact/page.tsx` | `<PageHero` |

> **Ini halaman yang paling perlu Anda isi manual** begitu ada data klien
> nyata yang sudah disetujui untuk dipublikasikan.

---

## 5. Halaman: Our Company (`/company`)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Judul & deskripsi hero halaman ini | `app/company/page.tsx` | `<PageHero` |
| Nilai-nilai perusahaan (Integrity, Reliability, dst.) | `app/company/page.tsx` | `const VALUES =` |
| Cerita/narasi tentang perusahaan (paragraf-paragraf) | `app/company/page.tsx` | scroll ke bawah `<PageHero.../>` |
| Daftar industri yang dilayani (grid foto) | `lib/data/industries.ts` | `export const INDUSTRIES` |
| Terjemahan Bahasa Indonesia untuk industri | `lib/i18n/data-id.ts` | `export const INDUSTRIES_ID` |

---

## 6. Halaman: Work With Us (`/work-with-us`)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Judul & deskripsi hero halaman ini | `app/work-with-us/page.tsx` | `<PageHero` |
| Alamat kantor | `app/work-with-us/page.tsx` | `Kawasan Pergudangan` |
| Email kontak yang tampil | `app/work-with-us/page.tsx` | `sales@gcnusantara.com` |
| Waktu respons ("1–2 hari kerja") | `app/work-with-us/page.tsx` | `Response Time` |
| Band "Become a supplier or execution partner" | `app/work-with-us/page.tsx` | `id="partner"` |
| Field-field form contact (nama, email, pesan, dll) | `components/forms/ContactForm.tsx` | — |
| **Alamat email tujuan** semua notifikasi form (Contact & RFQ) | `lib/mail-recipients.ts` | `SALES_TO`, `SALES_CC` |

---

## 7. Halaman RFQ (`/rfq`) — form permintaan penawaran

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Field-field form RFQ | `components/forms/RFQForm.tsx` | — |
| Pilihan dropdown "Industry" | `lib/types/rfq.ts` | `INDUSTRY_OPTIONS` (label Indonesia: `INDUSTRY_OPTIONS_ID`) |
| Judul & intro halaman RFQ | `app/rfq/page.tsx` | — |

---

## 8. Elemen yang muncul di SEMUA halaman

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Menu navigasi atas (5 item nav) | `components/layout/Navbar.tsx` | `const NAV_LINKS =` |
| Logo/nama "GCN" di navbar | `components/layout/Navbar.tsx` | cari `GCN` |
| Menu & alamat di footer | `components/layout/Footer.tsx` | `const NAV =` |
| **Data legalitas** (NIB, NPWP, Akta, SK) di footer | `components/layout/Footer.tsx` | `const LEGAL =` — isi placeholder `[ISI NIB]` dst. |
| Tombol toggle bahasa ID/EN | `components/layout/LanguageToggle.tsx` | — |
| Bahasa default saat situs dibuka | `lib/i18n/LanguageContext.tsx` | `useState<Lang>(` |
| Widget chat AI Sales Assistant (perilaku/instruksi AI) | `lib/sales-agent-prompt.ts` | — |
| Model AI yang dipakai chat widget | `app/api/chat/route.ts` | `GEMINI_MODEL` |
| Tampilan bubble chat widget | `components/ChatWidget.tsx` | — |

---

## 9. Warna, font, dan tampilan (branding)

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Warna navy/biru gelap utama | `tailwind.config.ts` | `"deep-blue"` dan `navy` (keduanya `#051C2C`) |
| Warna aksen biru terang (tombol, link) | `tailwind.config.ts` | `electric` (`#2251FF`) |
| Font yang dipakai (Inter) | `tailwind.config.ts` | `fontFamily` |
| Ukuran judul H1/H2/H3 | `tailwind.config.ts` | `fontSize` |
| Favicon / icon situs | `public/icon.png`, `public/favicon.ico` | ganti file langsung |
| Gambar Open Graph (preview saat link di-share) | `public/og-image.png` | ganti file langsung |
| Foto-foto yang dipakai di seluruh situs | `public/assets/generated/` + `lib/data/photos.ts` | `lib/data/photos.ts` memetakan nama foto ke file-nya |

---

## 10. SEO & metadata

| Mau edit... | Buka file | Cari teks/kode ini |
|---|---|---|
| Judul & deskripsi default situs (muncul di tab browser & Google) | `app/layout.tsx` | `SITE_TITLE`, `SITE_DESCRIPTION` |
| Kata kunci SEO | `app/layout.tsx` | `keywords:[` |
| Judul & deskripsi per halaman (khusus halaman itu) | file page-nya masing-masing, mis. `app/services/page.tsx` | `export const metadata =` |
| Data alamat perusahaan untuk Google (Organization schema) | `app/layout.tsx` | `organizationJsonLd` |
| Peta situs (sitemap) | `app/sitemap.ts` | — biasanya otomatis ikut kalau ada halaman baru |
| Redirect dari URL lama ke URL baru | `next.config.js` | `async redirects()` |

---

## 11. Kalau bingung file mana → pakai perintah pencarian ini

Buka terminal Codespace, dari root project, jalankan:

```bash
grep -rn "teks yang mau dicari" app components lib --include="*.tsx" --include="*.ts"
```

Ganti `"teks yang mau dicari"` dengan potongan teks yang tampil di
website (dalam Bahasa Inggris **atau** Indonesia, keduanya ada di source
code). Hasilnya akan menunjukkan nama file dan nomor barisnya persis.

Contoh:

```bash
grep -rn "Menjadi Supplier" app components lib --include="*.tsx"
```
