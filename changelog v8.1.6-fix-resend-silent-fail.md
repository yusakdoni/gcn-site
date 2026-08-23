# Changelog v8.1.6 — Fix: Form Contact & RFQ "sukses" tapi email tidak terkirim

## Bug yang ditemukan

`resend.emails.send()` dari SDK Resend **tidak melempar error** (tidak
`throw`) ketika Resend menolak pengiriman di level API — misalnya domain
pengirim belum pas, alamat tidak valid, kena rate limit, dsb. SDK ini malah
mengembalikan objek `{ data, error }`, dan kode di `app/api/contact/route.ts`
serta `app/api/rfq/route.ts` **tidak pernah mengecek field `error` itu**.

Akibatnya: form selalu menampilkan pesan sukses ("Message sent" / "Thank
you") ke pengunjung web, **walaupun Resend sebenarnya menolak pengiriman
emailnya secara diam-diam** di baliknya. Ini exact match dengan gejala yang
dilaporkan: form bilang sukses, tapi email tidak pernah masuk ke inbox atau
bahkan folder spam sekalipun.

## Perbaikan

Kedua route (`contact` dan `rfq`) sekarang mengecek `result.error` setelah
memanggil `resend.emails.send()`. Kalau Resend menolak pengiriman, server
akan:
1. Mencatat pesan error asli dari Resend ke Vercel Function Logs (bisa
   dilihat di Vercel → Deployments → deployment aktif → Functions/Logs,
   cari baris `Resend rejected contact email:` atau
   `Resend rejected RFQ email:`)
2. Mengirim response gagal (bukan sukses palsu) ke browser pengunjung

## Langkah setelah deploy versi ini

1. Deploy paket ini seperti biasa (extract → rsync → npm install →
   npm run build → commit → push)
2. Coba submit form Contact atau RFQ lagi di situs live
3. **Kalau kali ini muncul pesan error di form** (bukan sukses) — itu bagus,
   artinya sekarang kita bisa lihat penyebab aslinya. Buka Vercel →
   Deployments → deployment aktif → Functions/Logs, cari baris
   `Resend rejected...`, dan kirim screenshot pesan errornya ke saya —
   biasanya langsung menunjukkan penyebab pastinya (contoh umum: alamat
   pengirim belum cocok dengan domain yang diverifikasi, akun Resend masih
   dalam mode testing dan hanya boleh kirim ke email pemilik akun, dsb).
4. Kalau ternyata sekarang berhasil terkirim tanpa error — berarti
   masalahnya sudah selesai sepenuhnya di sisi kode dan konfigurasi.

## Versi
- `package.json` → `8.1.6`
