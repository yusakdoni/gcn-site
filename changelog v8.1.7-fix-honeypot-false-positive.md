# Changelog v8.1.7 — Fix: Form Contact "sukses" tapi tidak pernah sampai ke Resend

## Penyebab

RFQ form terkirim dengan benar (sudah dicek muncul di Resend Emails log),
tapi Contact form (termasuk yang diakses lewat tombol "Menjadi Supplier /
Mitra") menampilkan "Message sent" padahal **tidak ada entry sama sekali**
di Resend Emails log untuk submission itu.

Ini artinya request tidak pernah sampai memanggil Resend API sama sekali —
diblokir lebih dulu oleh sistem **anti-bot honeypot** yang memang sengaja
dipasang di kedua form (field tersembunyi bernama `hp_website`; kalau
field itu terisi, sistem menganggap submission itu dari bot, lalu diam-diam
mengembalikan respons "sukses" tanpa benar-benar mengirim email — supaya
bot tidak tahu dia terdeteksi).

Root cause paling mungkin: nama field `hp_website` mengandung kata
"website", yang merupakan salah satu kategori autofill umum di banyak
browser. Sebagian browser/password manager tetap mengisi field yang cocok
polanya meskipun disembunyikan secara visual dan diberi
`autoComplete="off"`. Pada form Contact, field ini berdekatan dengan field
"Company" — kombinasi ini kemungkinan memicu autofill browser mengisi
field tersembunyi itu (dianggap "company website"), sehingga submission
asli dari manusia salah terdeteksi sebagai bot.

## Perbaikan

Nama field honeypot diganti dari `hp_website` menjadi `hp_ref_note` —
nama yang tidak cocok dengan kategori autofill manapun (bukan website, url,
email, company, dll), jadi jauh lebih kecil kemungkinan ke-autofill secara
tidak sengaja. Diubah di 3 tempat: komponen `HoneypotField` di
`components/forms/Fields.tsx`, serta pengecekannya di
`app/api/contact/route.ts` dan `app/api/rfq/route.ts`.

## Setelah deploy

1. Deploy seperti biasa
2. Tes submit Contact form lagi (termasuk lewat tombol "Menjadi Supplier /
   Mitra")
3. Cek Resend → Emails — kali ini harus muncul entry baru dengan subject
   `[GCN Contact] ...`
4. Cek inbox sales@gcnusantara.com dan CC-nya

## Versi
- `package.json` → `8.1.7`
