# Dokumentasi Perubahan — GCN Website (Update 19 Agustus 2026)

> **Catatan penting:** dokumen sebelumnya membahas migrasi ke static export +
> PHP untuk hosting AnymHost. Ternyata hosting production yang sebenarnya
> dipakai adalah **Vercel**, jadi seluruh perubahan itu sudah
> **dibatalkan/di-revert** di paket ini. Dokumen ini menggantikannya
> sepenuhnya.

## Masalah yang ditemukan

Saat memeriksa Vercel Function Logs, terkonfirmasi: form Contact dan RFQ di
`app/api/contact/route.ts` dan `app/api/rfq/route.ts` **hanya melakukan
`console.log(...)`** — tidak pernah benar-benar mengirim email. Jadi setiap
kali ada pengunjung submit RFQ atau pertanyaan, datanya cuma tercatat di log
Vercel (yang nggak ada yang cek), dan tidak pernah masuk ke inbox
`sales@gcnusantara.com`.

Terpisah dari itu, gambar di kartu industri **Medical & Healthcare** tidak
muncul karena mismatch nama file: kode di `lib/data/photos.ts` mereferensikan
`industry-medical.jpg`, tapi file yang ada di
`public/assets/generated/` bernama `industry-medical.jpeg` (extension beda).
Linux (server Vercel) case/extension-sensitive, jadi 1 huruf beda saja bikin
404. Sudah diperbaiki dengan rename file ke `.jpg` supaya cocok dengan semua
referensi lain. Semua 17 file gambar lain di folder itu sudah dicek ulang
satu-satu — tidak ada mismatch lain.

## Perubahan yang dilakukan

### 1. Dikembalikan ke arsitektur Vercel-native
Perubahan `output: "export"` di `next.config.js` (dari revisi sebelumnya)
**dibatalkan**. Vercel adalah platform serverless yang mendukung penuh
Next.js API routes dan image optimization — tidak ada alasan untuk membatasi
diri ke static export di sini. `public/contact.php`, `public/rfq.php`, dan
`public/.htaccess` dihapus karena Vercel tidak menjalankan PHP/Apache.

### 2. `app/api/contact/route.ts` dan `app/api/rfq/route.ts` — sekarang benar-benar mengirim email
Menggunakan [Resend](https://resend.com) (email API modern, andal untuk
serverless functions, ada free tier). Setiap submission form dikirim ke:

- **To:** `sales@gcnusantara.com`
- **Cc:** `yusakdoni@gcnusantara.com`, `hendrik@gcnusantara.com`, `fedy@gcnusantara.com`

Daftar penerima ini disimpan terpisah di `lib/mail-recipients.ts` supaya
gampang diubah tanpa harus mengutak-atik logic API.

RFQ tetap mendukung lampiran file (dikirim sebagai attachment email,
maksimal 8MB — sama seperti sebelumnya). Validasi field wajib dan proteksi
honeypot anti-bot **tidak berubah** dari versi asli.

### 3. AI Sales Agent — fitur baru
Widget chat AI muncul di pojok kanan bawah di **semua halaman** situs
(dipasang lewat `app/layout.tsx`, komponen `components/ChatWidget.tsx`).

- Backend: `app/api/chat/route.ts`, memanggil Claude (Anthropic API,
  model `claude-sonnet-5`)
- System prompt ada di `lib/sales-agent-prompt.ts` — berisi info dasar GCN
  (layanan, industri yang dilayani, kontak) dan aturan: **tidak boleh**
  menyebutkan harga/timeline spesifik atau membuat komitmen apa pun atas
  nama perusahaan; selalu arahkan visitor yang serius ke form RFQ atau
  Contact.
- Percakapan dibatasi 20 pesan per sesi dan panjang tiap pesan dibatasi,
  untuk kontrol biaya API.

  💡 **Untuk mengedit kepribadian/pengetahuan AI Sales Agent**, cukup ubah
  teks di `lib/sales-agent-prompt.ts` — tidak perlu sentuh kode lain.

## Environment Variables — WAJIB di-set sebelum deploy

Buka **Vercel Dashboard → Project ini → Settings → Environment Variables**,
tambahkan (lihat juga `.env.example`):

| Nama | Untuk apa | Cara dapat |
|---|---|---|
| `RESEND_API_KEY` | Kirim email dari form Contact & RFQ | Daftar di [resend.com](https://resend.com), verifikasi domain `gcnusantara.com`, generate API key |
| `ANTHROPIC_API_KEY` | AI Sales Agent bisa menjawab chat | Ambil dari [console.anthropic.com](https://console.anthropic.com/settings/keys) |

⚠️ Tanpa `RESEND_API_KEY`, form akan gagal dengan pesan error (bukan diam-diam
gagal seperti sebelumnya — sekarang ada error handling yang jelas).
⚠️ Tanpa `ANTHROPIC_API_KEY`, widget chat akan menampilkan pesan "sedang ada
kendala teknis" ke pengunjung.

### Soal domain pengirim email (`from`)
Kode mengirim dari `no-reply@gcnusantara.com`. Resend **mengharuskan** domain
pengirim diverifikasi lewat DNS record (SPF/DKIM) di dashboard Resend
sebelum bisa kirim dari alamat itu — kalau belum diverifikasi, pengiriman
akan gagal. Langkahnya ada di dashboard Resend → Domains → Add Domain →
ikuti instruksi tambah DNS record di provider domain kamu.

## Cara deploy
Karena project sudah connected ke GitHub dengan auto-deploy branch `main`:
1. Set kedua environment variable di atas dulu di Vercel
2. Push kode ini ke `main`
3. Vercel otomatis build & deploy
4. Verifikasi domain di Resend (kalau belum)
5. Test: submit form Contact & RFQ di situs live, pastikan email masuk
   (cek juga folder Spam pertama kali)
6. Test: buka widget chat, coba tanya sesuatu

## Yang TIDAK berubah
- Tampilan, styling, konten, dan struktur halaman
- Validasi form dan honeypot anti-bot
- Struktur routing/URL

## Riwayat dokumen sebelumnya (AnymHost — TIDAK DIPAKAI)
Kalau suatu saat ingin pindah dari Vercel ke hosting sendiri (misal
AnymHost), pendekatan static export + PHP dari eksplorasi sebelumnya masih
valid sebagai referensi, tapi perlu disusun ulang dari kode versi Vercel
ini (bukan dari file lama), karena API routes sekarang sudah berbeda
strukturnya (pakai Resend + AI chat).
