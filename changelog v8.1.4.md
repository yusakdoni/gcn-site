# Changelog v8.1.4 — 20 Agustus 2026

## Verifikasi ulang bug gambar
Cross-check ulang seluruh 12 file di `public/assets/generated/` terhadap
semua referensi di `lib/data/photos.ts` — **semua cocok persis**, tidak ada
mismatch nama file atau ekstensi (termasuk kasus `industry-medical.jpg` vs
`.jpeg` yang sudah dibetulkan di v8.1.3). Kalau gambar tertentu masih belum
muncul di situs live setelah deploy paket ini, itu bukan soal kode lagi —
kemungkinan besar cache CDN Vercel/browser dari deployment lama. Hard refresh
(Ctrl+Shift+R) atau cek di jendela Incognito setelah deploy v8.1.4.

## AI Sales Agent (chat widget) — diperkuat
Kode di `app/api/chat/route.ts` dan `components/ChatWidget.tsx` sudah benar
dari sisi logic (pesan sapaan tidak ikut terkirim ke API, first message
selalu role `user`). Tapi karena chat masih error saat dites di screenshot
kamu, kemungkinan penyebabnya ada di luar kode aplikasi ini:

1. **`ANTHROPIC_API_KEY` belum di-set / salah / kehabisan kredit di Vercel.**
   Ini penyebab paling umum untuk error "kendala teknis" yang muncul di
   *setiap* pesan (bukan cuma pesan pertama). Cara cek: buka Vercel
   Dashboard → project kamu → **Deployments** → deployment yang aktif →
   tab **Functions/Logs** → cari log `AI sales agent error:`. Sekarang log
   ini sudah saya perjelas (`status`, `detail`, `message`) supaya kamu bisa
   langsung lihat apakah errornya `401` (API key salah/kosong), `400`/`402`
   (kredit habis), `429` (rate limit), atau error lain.
2. Sudah diperjelas juga alur cek: kalau `ANTHROPIC_API_KEY` kosong di
   Vercel, endpoint langsung balas error jelas di log server (tidak
   nyoba panggil API sama sekali).
3. `@anthropic-ai/sdk` di-upgrade dari `^0.32.1` (Okt 2024, sangat lama) ke
   `^0.117.1` (rilis terbaru) untuk stabilitas dan dukungan model terbaru.
4. Menambahkan timeout eksplisit 20 detik ke request Anthropic supaya kalau
   API lambat merespons, widget gagal dengan jelas dan cepat, bukan
   menggantung.

**Aksi yang perlu kamu lakukan (tidak bisa saya lakukan dari sini):** buka
Vercel Project Settings → Environment Variables, pastikan `ANTHROPIC_API_KEY`
ada, valid, dan akun Anthropic-nya masih ada kredit/tidak melewati limit —
lalu redeploy. Setelah redeploy, coba chat lagi dan kalau masih error, cek
Function Logs seperti di atas untuk tahu penyebab persisnya.

## Email notifikasi RFQ & Contact ke 4 alamat sekaligus
Ini **sudah ada** dari paket sebelumnya (`lib/mail-recipients.ts`,
dipakai di `app/api/contact/route.ts` dan `app/api/rfq/route.ts`) — setiap
submission RFQ atau Contact terkirim ke:

- **To:** `sales@gcnusantara.com`
- **Cc:** `yusakdoni@gcnusantara.com`, `hendrik@gcnusantara.com`,
  `fedy@gcnusantara.com`

Supaya ini benar-benar jalan, domain `gcnusantara.com` harus **terverifikasi
penuh di Resend** dulu. Dari screenshot yang kamu kirim, ada 3 DNS record
dari Resend yang **belum ada** di DomaiNesia:

| Type | Name                  | Content (dari dashboard Resend kamu)     | Priority |
|------|-----------------------|-------------------------------------------|----------|
| TXT  | `resend._domainkey`   | nilai `p=MIGfMA...` yang ditampilkan Resend | –      |
| MX   | `send`                | `feedback...ses.com` (nilai dari Resend)  | 10       |
| TXT  | `send`                | `v=spf1 i...om ~all` (nilai dari Resend)  | –        |

Tambahkan ketiganya di DomaiNesia (menu **Add New Record**, sama seperti
record `default._domainkey` yang sudah ada di sana). Catatan penting:
- Record ini di subdomain `send.gcnusantara.com`, **bukan** menimpa record
  MX/SPF utama domain kamu (`mx4.mailspace.id` untuk email harian tetap
  aman, tidak terganggu).
- Setelah ditambahkan, balik ke halaman Resend "Add domain" dan klik
  **"I've added the records"** supaya Resend memverifikasi.
- Toggle **Enable Receiving** boleh dibiarkan mati — kamu tidak perlu
  Resend untuk menerima email, hanya untuk mengirim notifikasi form.
- Verifikasi DNS biasanya butuh beberapa menit sampai beberapa jam untuk
  propagasi.
- `RESEND_API_KEY` juga harus sudah di-set di Vercel Environment Variables
  (lihat `.env.example`) — kalau belum, form akan gagal terkirim meski
  domain sudah terverifikasi.

## SEO — kenapa "Gega Cahaya Nusantara" belum muncul di Google
Saya cek langsung: `site:gcnusantara.com` di Google **belum menampilkan
halaman apapun** dari domain kamu. Ini berarti situsnya **belum ter-index**
sama sekali oleh Google — bukan soal kode/konten di website salah. Untuk
domain baru, ini normal, biasanya butuh beberapa hari–minggu sejak pertama
kali online sebelum Google mulai meng-index secara menyeluruh, apalagi kalau
belum pernah didaftarkan manual.

Selain itu, nama "Cahaya Nusantara" ternyata dipakai banyak PT lain di
Indonesia (mis. PT Paguntaka Cahaya Nusantara/anak usaha PLN, PT Cahaya
Niaga Nusantara, PT Sentra Cahaya Nusantara, dll.) yang sudah lama online
dengan follower/backlink banyak — jadi begitu Google mulai meng-index
domain kamu, dia akan bersaing di pencarian generik "cahaya nusantara".
Untuk pencarian nama lengkap "PT Gega Cahaya Nusantara" atau brand "GCN"
yang lebih spesifik, situs kamu punya peluang jauh lebih besar untuk
tampil di posisi atas begitu ter-index dan (khususnya) begitu ada Google
Business Profile resmi.

**Yang sudah saya perbaiki di kode (v8.1.4):**
- Menambahkan `canonical` URL resmi (`alternates.canonical`) di semua
  halaman — sinyal ke Google bahwa `gcnusantara.com` adalah versi resmi/
  utama, bukan duplikat.
- Memperkaya data terstruktur (JSON-LD): menambahkan `legalName`,
  `alternateName` ("GCN", "Gega Cahaya Nusantara", "GCN Indonesia"), `logo`,
  `image`, `@id`, dan objek `WebSite` terpisah yang terhubung ke
  `Organization` — ini membantu Google memahami identitas brand secara
  lebih jelas saat mulai meng-index.
- Menyiapkan slot untuk meta tag verifikasi Google Search Console di
  `app/layout.tsx` (baris `verification:{google:"..."}`, sekarang
  dikomentari) — tinggal isi kodenya begitu kamu daftar di GSC (lihat
  langkah di bawah).

**Yang perlu kamu lakukan sendiri (di luar kode, tidak bisa saya lakukan
dari sini karena butuh akses akun Google kamu):**
1. Daftarkan domain di **Google Search Console**
   (search.google.com/search-console) → tambah properti `gcnusantara.com`
   → verifikasi (paling gampang lewat DNS TXT record atau HTML meta tag,
   lalu isi ke `verification.google` di `app/layout.tsx`) → submit
   `https://gcnusantara.com/sitemap.xml` → pakai fitur "Request Indexing"
   untuk halaman utama supaya di-crawl lebih cepat, bukan menunggu Google
   datang sendiri.
2. Buat **Google Business Profile** dengan nama persis "PT Gega Cahaya
   Nusantara" dan alamat kantor di Tangerang — ini yang paling efektif
   untuk bikin nama perusahaan kamu tampil di atas saat orang cari nama
   lengkapnya, karena knowledge panel/local pack biasanya menang lawan
   hasil organik biasa.
3. Bikin/lengkapi profil LinkedIn Company Page dan Instagram bisnis dengan
   nama & domain yang konsisten, lalu link balik ke gcnusantara.com — setiap
   profil ini jadi sinyal tambahan (dan sekaligus tempat orang menemukan
   kamu selain Google).
4. Sabar 1–4 minggu setelah langkah di atas sebelum benar-benar mengevaluasi
   ranking — indexing situs baru memang butuh waktu, ini bukan sesuatu yang
   instan meski semua teknis sudah benar.

## Versi
- `package.json` → `8.1.4`
- `@anthropic-ai/sdk` → `^0.117.1` (dari `^0.32.1`)
- `package-lock.json` dihapus dari paket ini supaya di-generate ulang bersih
  saat `npm install` — jalankan `npm install` sebelum `npm run build` atau
  biarkan Vercel yang menjalankannya otomatis saat deploy.
