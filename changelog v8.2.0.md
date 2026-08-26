# Changelog v8.2.0 — AI Sales Assistant pindah ke Gemini API (gratis)

## Yang berubah

**`app/api/chat/route.ts`** — backend AI Sales Assistant (chat widget) yang
sebelumnya memanggil Anthropic API (`@anthropic-ai/sdk`, model
`claude-sonnet-5`) sekarang memanggil **Google Gemini API** langsung lewat
`fetch` ke REST endpoint (tidak perlu tambah dependency baru):

```
https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent
```

Model default: `gemini-2.5-flash` — salah satu model paling stabil di
**free tier** Gemini API per pertengahan 2026 (tidak perlu kartu kredit).
Nama model bisa diganti kapan saja lewat env var `GEMINI_MODEL` tanpa
perlu ubah/deploy ulang kode — berguna karena Google cukup sering
memperbarui daftar model gratisnya.

Semua behavior lain **tidak berubah** — dari sisi pengunjung situs, chat
widget bekerja identik seperti sebelumnya:
- Limit 20 pesan per sesi, 2000 karakter per pesan (tetap).
- System prompt (`lib/sales-agent-prompt.ts`) tetap sama persis — tidak
  disentuh, karena Gemini juga mendukung system prompt (`system_instruction`)
  jadi tidak perlu diubah.
- Auto-follow bahasa Indonesia/Inggris sesuai toggle situs — tetap sama.
- Error handling & logging ke Vercel Function Logs — disesuaikan ke format
  error Gemini (`error.status`, `error.message`) supaya tetap mudah
  didiagnosis kalau key salah, kuota habis, dll.

## Environment variable — WAJIB DIGANTI

`ANTHROPIC_API_KEY` **tidak lagi dipakai** dan bisa dihapus dari Vercel
Project Settings kapan pun. Sebagai gantinya, set:

```
GEMINI_API_KEY=<API key Anda>
```

**Cara ambil API key gratis:**
1. Buka https://aistudio.google.com/apikey
2. Login pakai akun Google mana saja (tidak perlu kartu kredit untuk free tier)
3. Klik "Create API key"
4. Copy key-nya, paste ke Vercel Project Settings → Environment Variables
   → `GEMINI_API_KEY`

`.env.example` sudah diperbarui dengan instruksi yang sama.

## Dependency yang dihapus

`@anthropic-ai/sdk` dihapus dari `package.json` (dan entri terkaitnya di
`package-lock.json`) karena sudah tidak dipakai sama sekali di project ini.

**Penting:** setelah pull perubahan ini, jalankan `npm install` (BUKAN
`npm ci`) satu kali di Codespace. Ini supaya npm bisa membersihkan sisa
paket transitive yang dulu hanya dibutuhkan oleh `@anthropic-ai/sdk` dan
menulis ulang `package-lock.json` dengan benar. Setelah itu, `npm ci`
bisa dipakai seperti biasa untuk instalasi selanjutnya (misalnya di build
Vercel).

## Yang TIDAK diubah
- `components/ChatWidget.tsx` (frontend) — tidak menyebut Anthropic sama
  sekali sebelumnya, jadi tidak perlu diubah. Hanya satu komentar kode
  yang dirapikan (referensi "Anthropic API" → penjelasan generik).
- `lib/sales-agent-prompt.ts` — system prompt AI Sales Assistant, sama persis.
- Semua perubahan dari v8.1.8 (bahasa default, struktur halaman, SEO,
  legalitas) — tidak disentuh lagi di versi ini.

## Catatan jujur soal testing
Sama seperti v8.1.8: `npm run build` **tidak bisa saya jalankan** di
sandbox kerja saya (tidak ada akses internet untuk `npm install`). Kode
sudah ditinjau manual (sintaks, JSON lockfile, tidak ada sisa referensi
Anthropic yang tertinggal) — tapi endpoint Gemini yang sesungguhnya baru
bisa dites setelah `GEMINI_API_KEY` di-set dan chat widget dicoba live.
Setelah deploy, buka situs, klik chat widget, kirim satu pesan test — kalau
dapat balasan, integrasinya sudah benar.

## Versi
- `package.json` → `8.2.0`
