# Changelog v8.2.1 — Struktur ulang situs: Services / Our Work / Client Impact / Company / Work With Us

## Struktur halaman baru

Navigasi utama sekarang berisi 5 halaman (menggantikan struktur 4-halaman
v8.1.8: Home, Tentang Kami, Proyek, Kontak):

| Halaman | URL | Sebelumnya |
|---|---|---|
| Our Services | `/services` | dihapus di v8.1.8, **dibangun ulang** |
| Our Work | `/our-work` | `/projects` (rename) |
| Client Impact | `/client-impact` | **baru**, tidak pernah ada sebelumnya |
| Our Company | `/company` | `/about` (rename) |
| Work With Us | `/work-with-us` | `/contact` (rename) |

`/rfq` (form RFQ) dan `/privacy-policy` tetap di URL yang sama — keduanya
halaman utilitas, bukan bagian navigasi utama, jadi tidak ikut berganti nama.

Semua URL lama (`/about`, `/projects`, `/projects/:slug`, `/contact`,
`/industries`, `/sertifikasi`, `/capabilities`, `/insights`) di-redirect
301 di `next.config.js` ke tujuan yang relevan, supaya tidak ada broken
link dari hasil index Google atau bookmark lama. Perhatikan: `/services`
**sengaja tidak lagi di-redirect** — sekarang halaman asli, bukan alias.

## Desain — arah "konsultan besar" (ala BCG.com)

Palet warna, font (Inter), dan brand asli GCN (navy `#051C2C` / electric
blue `#2251FF`) **tidak diubah** — permintaan brief sebelumnya eksplisit
melarang mengubah branding sembarangan, dan sistem desain yang sudah ada
(hairline rules, eyebrow labels uppercase, grid editorial) sebenarnya
sudah searah dengan estetika konsultan korporat. Yang saya naikkan adalah
skala dan kepercayaan diri tipografi serta menambah struktur "editorial"
yang jadi ciri khas situs seperti BCG:

- **`components/ui/PageHero.tsx`** (baru) — hero band besar dan konsisten
  di setiap halaman interior, dengan headline besar (hingga ~4.25rem di
  desktop), eyebrow label, dan hairline rule penutup. Dipakai di kelima
  halaman baru.
- **`components/ui/StatBand.tsx`** (baru) — band angka besar bergaya
  "impact metrics" (angka raksasa + label tipis), dipasang di homepage
  dan di halaman Client Impact.
- **`components/ui/PageCTA.tsx`** (baru) — penutup setiap halaman dengan
  ajakan bertindak yang jelas ke halaman berikutnya dalam alur (Services
  → Our Work → Client Impact → Work With Us), dipakai konsisten di semua
  halaman baru.
- Headline hero **homepage** diperbesar dari `text-h1` (3.5rem) menjadi
  hingga 5rem di desktop.

## Halaman baru: Client Impact — CATATAN PENTING soal data

Ini halaman yang paling perlu perhatian Anda. Karena GCN **belum punya
data klien terverifikasi** (data proyek yang ada di `lib/data/projects.ts`
sendiri secara eksplisit berlabel "Temporary portfolio concept" —
bukan klaim keterlibatan klien nyata), saya **tidak mengarang** angka
metrik dampak, nama klien, atau testimoni. Semua ditampilkan sebagai
placeholder yang jujur dan jelas:

- 4 stat besar: `[XX]`, `[XX]%`, dll — bukan angka asli.
- 1 blok kutipan klien dengan teks `[Nama Klien]` / `[Jabatan, Perusahaan]`
  dan isi kutipan `[Disediakan untuk kutipan langsung dari klien...]`.
- Ada catatan eksplisit di halaman itu sendiri yang bilang ke pengunjung
  bahwa angka-angka ini placeholder dan akan diperbarui begitu ada data
  riil.

**Ini perlu Anda isi manual** begitu ada data klien nyata yang sudah
disetujui untuk dipublikasikan — lokasinya di
`app/client-impact/page.tsx` (konstanta `STATS` di bagian atas file, dan
bagian "CLIENT VOICE" untuk testimoni).

Bagian "Illustrative Examples" di halaman yang sama menampilkan 3 profil
dari `lib/data/projects.ts` (data yang sudah ada, tidak diubah) sebagai
contoh jenis hasil yang ingin dicapai — bukan klaim proyek yang sudah
selesai.

## Perubahan pendukung lain

- `lib/sales-agent-prompt.ts` (system prompt AI Sales Assistant) — 2
  referensi ke `/contact` diperbarui menjadi `/work-with-us`, supaya chat
  widget mengarahkan pengunjung ke URL yang benar (bukan yang cuma
  ke-redirect).
- Halaman **Work With Us** sekarang menampilkan blok "Become a supply or
  execution partner" dengan porsi lebih besar dibanding sebelumnya
  (dulu hanya potongan kecil di homepage) — sesuai posisinya sebagai
  tujuan "kerja sama" yang sekarang punya nama sendiri di navigasi.
- `app/sitemap.ts` diperbarui penuh ke struktur URL baru, termasuk
  menambahkan kembali rute `/services/:slug` yang sempat hilang.
- Navbar: breakpoint menu desktop dinaikkan dari `lg` ke `xl` supaya 5 item
  navigasi + tombol RFQ + toggle bahasa tidak berdesakan di layar medium
  (laptop 13"–14").

## Yang TIDAK diubah
- Warna, font, dan brand asli GCN.
- `app/api/contact/route.ts`, `app/api/rfq/route.ts`, `app/api/chat/route.ts`
  — tidak disentuh sama sekali di versi ini.
- Isi data proyek dan layanan (`lib/data/projects.ts`, `lib/data/services.ts`)
  — hanya dipindah lokasi URL-nya, teksnya sama persis.
- Integrasi Gemini API dari v8.2.0 — tidak disentuh.

## Catatan jujur soal testing
Sama seperti versi-versi sebelumnya: **`npm run build` tidak bisa saya
jalankan** di sandbox kerja saya (tidak ada akses internet untuk
`npm install`). Untuk perubahan sebesar ini saya melakukan pengecekan
ekstra hati-hati secara manual:
- Cek keseimbangan kurung kurawal/kurung biasa di setiap file yang
  dibuat/diubah (20 file) — semua seimbang.
- Grep menyeluruh ke seluruh codebase untuk memastikan tidak ada sisa
  link ke `/about`, `/contact`, atau `/projects` yang lolos.
- Verifikasi tipe props `T` component (`en`/`id` menerima `ReactNode`)
  cocok dengan cara `StatBand` memakainya.

Karena ini restrukturisasi besar (bukan sekadar edit kecil), **jalankan
`npm run build` di Codespace sebelum push** — kalau ada error TypeScript
yang lolos dari review manual saya, di sinilah akan ketahuan. Kirim
pesan errornya ke saya kalau ada, saya bantu perbaiki cepat.

## Versi
- `package.json` → `8.2.1`
