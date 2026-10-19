# Seksi Liturgi Paroki Mangga Besar

Situs informasi Seksi Liturgi Gereja St. Petrus & Paulus, Paroki Mangga Besar. Situs ini memperkenalkan tim pelayanan dan menyediakan akses ke sumber daya liturgi, jadwal petugas, serta kalender liturgi.

Alamat situs aktif akan diperbarui setelah nama proyek dan domain deployment disesuaikan.

## Isi situs

- **Beranda:** pengantar pelayanan dan semboyan “Sollicitudine non pigri Spiritu Ferventes Domino Servientes” (Rome 12:11), dengan tombol menuju layanan dan jadwal petugas.
- **Tentang Kami:** susunan pengurus periode 2026–2029, dari ketua dan enam wakil bidang hingga subseksi atau staf, beserta tanggal lahir dan wilayahnya.
- **Pilar Layanan:** tautan ke folder musik, panduan tata gerak, dan layanan surat kebutuhan acara khusus dalam Misa maupun ibadat khusus.
- **Kalender Liturgi:** tautan ke kalender tahun 2026 dan 2027.
- **Footer:** logo paroki dan Seksi Liturgi, navigasi, serta alamat gereja.

Tautan layanan, nama anggota, dan isi kartu dikelola di [`app/page.tsx`](app/page.tsx). Tampilan diatur dalam [`app/globals.css`](app/globals.css). Logo, favicon, dan ilustrasi liturgi berada di [`public/`](public/).

## Teknologi

Next.js App Router, React, TypeScript, Tailwind CSS, dan Lucide React. Proyek ini memakai Vinext untuk menjalankan dan membangun versi yang diterbitkan melalui Sites.

## Menjalankan secara lokal

Gunakan Node.js versi **22.13.0 atau lebih baru**.

```bash
npm ci
npm run dev
```

Buka alamat yang ditampilkan terminal; secara default `http://127.0.0.1:5173/`. Untuk membuat build produksi:

```bash
npm run build
```

Saat ini halaman tidak memerlukan variabel lingkungan atau basis data. Tautan ke Google Drive, Google Sheets, dan layanan surat membuka situs eksternal.

## Publikasi

Sumber proyek ada di [GitHub](https://github.com/TanjayaJason/seksi-liturgi). Situs aktif diterbitkan melalui layanan deployment yang terhubung ke repositori ini.
