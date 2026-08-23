# Changelog v8.1.4 — Language Toggle (EN/ID) — 22 Agustus 2026

## Fitur baru: Toggle Bahasa Inggris / Bahasa Indonesia

Ditambahkan toggle "EN | ID" di Navbar (desktop & mobile) yang mengganti
bahasa tampilan di seluruh website secara real-time, tanpa reload halaman.

### Cara kerja teknis (penting untuk dipahami)

- **Pilihan bahasa disimpan** di `localStorage` browser pengunjung + cookie,
  jadi kalau mereka balik lagi ke situs, bahasa yang terakhir dipilih tetap
  diingat.
- **Rendering awal dari server tetap Bahasa Inggris** (sama seperti metadata
  SEO, judul halaman `<title>`, dan JSON-LD yang sudah dioptimasi di v8.1.4
  sebelumnya) — supaya Google tetap meng-crawl dan meng-index situs seperti
  biasa. Begitu halaman selesai dimuat di browser, teks otomatis berganti ke
  Bahasa Indonesia kalau itu yang dipilih pengunjung.
- Ini pendekatan **toggle sederhana** (bukan URL terpisah `/en` dan `/id`
  dengan `hreflang` tag). Trade-off-nya: Google akan selalu meng-index versi
  Bahasa Inggris sebagai versi utama. Kalau suatu saat butuh kedua bahasa
  ter-index terpisah di Google (misal untuk SEO pencarian Bahasa Indonesia
  secara spesifik), itu proyek terpisah yang lebih besar (routing per-locale)
  — beri tahu saya kalau itu jadi prioritas nanti.

### Yang sudah diterjemahkan penuh

- Navbar, Footer, semua tombol CTA
- Homepage lengkap (Hero, Services, Industries, How We Work, Value
  Proposition, Capability Band, Partner Statement, Final CTA, Insights
  Teaser)
- Halaman: About, Contact, RFQ, Capabilities, Sertifikasi, Privacy Policy
- Listing & detail: Services (3), Industries (6), Projects (6 case study),
  Insights (4 artikel) — termasuk body paragraf artikel, bukan cuma judul
- Form Contact & RFQ — semua label, placeholder, pesan sukses/error, tombol
- Chat widget (AI Sales Assistant) — UI-nya (judul, placeholder, tombol) DAN
  AI-nya sekarang otomatis membalas dalam bahasa yang sedang aktif di
  toggle (Inggris kalau toggle di EN, Indonesia kalau di ID)

### Yang TIDAK berubah (dan kenapa)

- `<title>` tab browser dan meta description tetap Bahasa Inggris (batasan
  teknis dari pendekatan toggle sederhana di atas — metadata di-generate di
  server sebelum tahu pilihan bahasa pengunjung)
- Nilai pilihan dropdown "Industry" di form RFQ tetap dalam Bahasa Inggris
  (mis. "Construction", "Machinery & Industrial") — ini istilah kategori
  yang umum dipakai lintas bahasa dalam konteks bisnis, dan datanya perlu
  konsisten dengan sistem back-end

## File baru yang ditambahkan
- `lib/i18n/LanguageContext.tsx` — context + persist localStorage/cookie
- `components/i18n/T.tsx` — komponen kecil untuk render teks EN/ID
- `components/layout/LanguageToggle.tsx` — tombol toggle EN/ID
- `lib/i18n/data-id.ts` — terjemahan Bahasa Indonesia untuk seluruh data
  services/industries/projects/insights (didesain sebagai overlay, TIDAK
  mengubah file data asli — jadi risiko rusak minim)

## Catatan setelah deploy
Setelah deploy, coba klik toggle "EN | ID" di navbar pada beberapa halaman
berbeda (homepage, detail service, artikel insight, form RFQ) untuk
memastikan semua teks berganti dengan benar. Kalau ada teks yang kelewat
belum diterjemahkan atau ada bagian yang terlihat aneh, kasih tahu saya
halaman & bagian mana, saya perbaiki.
