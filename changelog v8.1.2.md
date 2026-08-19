# Dokumentasi Perubahan — GCN Website

Tanggal: 19 Agustus 2026

## Ringkasan masalah yang ditemukan

1. **Gambar tidak muncul & error 503 di www** — akun hosting AnymHost kena limit
   proses (LVE/CloudLinux) 74 kali dalam 24 jam, ditambah limit CPU dan I/O.
   Penyebabnya: situs berjalan sebagai aplikasi Node.js (`output: "standalone"`)
   di belakang Passenger, sehingga **setiap request** — termasuk tiap file
   gambar, CSS, JS — melewati proses Node yang dibatasi. Padahal 35 dari 37
   halaman situs ini sebenarnya statis (hasil build `next build` sebelumnya
   menunjukkan hampir semua route ditandai `○ Static` / `● SSG`).

2. **Bug tersembunyi: form Contact & RFQ tidak pernah mengirim apa pun.**
   Saat memeriksa kode `app/api/contact/route.ts` dan `app/api/rfq/route.ts`,
   ternyata keduanya hanya melakukan `console.log(...)` lalu mengembalikan
   `{ ok: true }` — tidak ada baris kode yang benar-benar mengirim email ke
   mana pun. Jadi selama ini, kalaupun form berhasil "submit" dan pengunjung
   melihat pesan "Message sent", pesan itu **tidak pernah sampai ke mana pun**.
   Ini bug yang independen dari masalah hosting di atas dan sudah ada sejak
   awal build ini dibuat (ada komentar `// V4 demo endpoint: connect this to
   your mail/CRM provider before production` di kode aslinya).

## Perubahan yang dilakukan

### 1. `next.config.js` — pindah dari server Node ke static export
- `output: "standalone"` → `output: "export"`
- Fungsi `headers()` dihapus (tidak didukung di mode export) — digantikan
  header keamanan yang sama lewat `public/.htaccess`
- Efeknya: `next build` sekarang menghasilkan folder `/out` berisi HTML/CSS/JS
  murni, tanpa server Node yang perlu terus berjalan. Semua request dilayani
  langsung oleh Apache/LiteSpeed di cPanel, sehingga **tidak lagi kena limit
  proses/CPU/IO** yang selama ini memicu gambar hilang dan error 503.

### 2. `app/api/contact/route.ts` dan `app/api/rfq/route.ts` — dihapus
Static export tidak bisa menjalankan API routes (butuh server). Logicnya
dipindah jadi dua file PHP baru yang dijalankan langsung oleh Apache, **dan
sekaligus diperbaiki supaya benar-benar mengirim email** (lihat poin 2 di
atas):

- **`public/contact.php`** — validasi field, cek honeypot anti-bot (logic
  sama persis seperti versi TypeScript aslinya), lalu kirim email lewat
  `mail()` PHP bawaan.
- **`public/rfq.php`** — sama, ditambah dukungan file attachment (dikirim
  sebagai lampiran email multipart).

  ⚠️ **Perlu kamu ubah:** buka kedua file ini, ganti nilai
  `$RECIPIENT_EMAIL = 'info@gcnusantara.com';` dengan alamat email yang
  benar-benar kamu pakai untuk menerima pesan dari website.

  Catatan: `mail()` PHP bawaan cPanel biasanya cukup untuk volume kecil,
  tapi ada risiko masuk folder Spam tergantung konfigurasi SPF/DKIM domain
  kamu. Kalau nanti pesan sering nyasar ke spam, kabari saya — bisa
  di-upgrade pakai SMTP (PHPMailer + akun email cPanel) yang lebih reliable.

### 3. `components/forms/ContactForm.tsx` & `RFQForm.tsx`
Endpoint fetch diubah dari `/api/contact` dan `/api/rfq` menjadi
`/contact.php` dan `/rfq.php`. Tidak ada perubahan lain — tampilan dan
validasi form persis sama seperti sebelumnya.

### 4. `public/.htaccess` — file baru
Berisi:
- Header keamanan yang tadinya diatur lewat `next.config.js` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- Cache-Control agresif untuk file statis (`.js`, `.css`, gambar) karena nama
  filenya sudah content-hashed oleh Next.js, aman di-cache lama
- Redirect `www.gcnusantara.com` → `gcnusantara.com` (opsional — hapus bagian
  ini di file kalau kamu justru mau sebaliknya)

### 5. `app/robots.ts`
Baris `disallow: ["/api/"]` dihapus karena route `/api/` sudah tidak ada lagi.

### 6. `server.json` — dihapus
File custom Node server ini sudah tidak dipakai karena situs tidak lagi
butuh proses Node untuk berjalan.

### 7. Komentar di `components/forms/Fields.tsx` dan `lib/types/rfq.ts`
Diperbarui supaya tidak lagi merujuk ke `app/api/...` yang sudah dihapus.

## Langkah deploy (WAJIB dibaca)

1. **Build ulang di laptop kamu** (bukan di server — server tetap tidak
   sanggup handle build):
   ```
   npm install
   npm run build
   ```
   Hasilnya sekarang folder **`/out`**, bukan `.next`.

2. **Upload isi folder `/out`** (bukan foldernya, isinya saja) ke
   `public_html` di cPanel File Manager — sejajar dengan `contact.php` dan
   `rfq.php` yang sudah otomatis ikut ter-build ke dalam `/out` (karena
   berasal dari folder `public/`).

3. **Matikan aplikasi Node.js lama**: cPanel → Setup Node.js App → Stop/Delete
   aplikasi `gcnusantara.com` yang sekarang berstatus `started`. Situs ini
   sekarang murni file statis, tidak butuh Node.js sama sekali.

4. **Set alamat email tujuan** di `public/contact.php` dan `public/rfq.php`
   sebelum build (lihat catatan ⚠️ di atas).

5. Tes form contact & RFQ setelah live — pastikan email benar-benar masuk.

## Yang TIDAK berubah
- Semua tampilan, styling, konten, dan struktur halaman persis sama
- Validasi form dan proteksi honeypot anti-bot tetap identik
- Struktur routing/URL tetap sama (`/services/[slug]`, `/industries/[slug]`, dll)
