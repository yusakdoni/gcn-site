# Changelog v8.1.3 — 20 Agustus 2026

## Bug fixes
- **Chat widget AI Sales Agent gagal di pesan pertama** — pesan sapaan
  pembuka ikut terkirim ke Anthropic API sebagai bagian dari histori
  percakapan, padahal API mewajibkan pesan pertama harus role `user`.
  Ini akan selalu bikin error di pesan pertama setiap sesi chat. Sudah
  diperbaiki di frontend (`components/ChatWidget.tsx`) dan ditambah
  pengaman yang sama di backend (`app/api/chat/route.ts`).
- **Gambar "Medical & Healthcare" tidak muncul di halaman Industries** —
  file gambarnya sudah benar dan valid di paket ini; kemungkinan besar
  penyebabnya adalah proses upload manual sebelumnya (hapus repo + upload
  ulang) yang gagal menyertakan file ini secara utuh. Lihat bagian
  "Cara update" di dokumentasi utama untuk alur upload yang lebih reliable.

## Optimisasi assets
- Menghapus 3 file gambar (`project-asphalt-002.jpg`, `-003.jpeg`,
  `-004.jpg`) dan 1 file mockup (`v8.1.2-asset-reference-mockup.png`) yang
  ternyata **tidak direferensikan di kode manapun** — total ~20MB dead
  weight yang cuma numpang di repo tanpa pernah tampil di situs.
- Mengompres & resize seluruh gambar yang benar-benar dipakai di
  `public/assets/generated/` (cap lebar maksimal 1920px, kualitas JPEG
  dioptimalkan, metadata di-strip). Total ukuran folder ini turun dari
  ±25MB menjadi ±3MB tanpa penurunan kualitas visual yang terlihat.
  File yang sudah kecil dari awal dibiarkan seperti aslinya (nggak semua
  file otomatis ditimpa — hanya yang benar-benar lebih kecil hasil
  kompresinya).
- File `README.txt` (catatan internal soal placeholder asset) dipindah
  keluar dari folder `public/` (sekarang jadi `ASSET_NOTES.txt` di root
  project) supaya tidak ikut ter-publish sebagai halaman yang bisa diakses
  publik di `/assets/generated/README.txt`.

## Verifikasi yang dilakukan
- Cross-check semua path gambar yang direferensikan di
  `lib/data/photos.ts` terhadap file yang benar-benar ada — semua cocok,
  tidak ada broken reference.
- Cross-check semua field name di `ContactForm.tsx`/`RFQForm.tsx` terhadap
  yang divalidasi di `app/api/contact` dan `app/api/rfq` — semua cocok.
- TypeScript check (`tsc --noEmit`) — tidak ada error nyata selain yang
  disebabkan oleh `node_modules` yang tidak terinstall di sandbox
  pemeriksaan (butuh koneksi internet yang tidak tersedia di sisi saya).
  Build penuh (`npm run build`) tetap perlu dijalankan di Codespace/lokal
  kamu sebagai verifikasi akhir sebelum live.
