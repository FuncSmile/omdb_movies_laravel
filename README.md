# OMDB Movies (Laravel)

A Laravel + Inertia + React starter for browsing and saving movies using the OMDB API.

## Deskripsi singkat
- Aplikasi ini memungkinkan pencarian data film via OMDB API dan menyimpan film favorit pengguna.
- Dibangun dengan Laravel (backend) dan Inertia + React (frontend) untuk pengalaman single-page app tanpa meninggalkan ekosistem Laravel.

## Fitur utama
- Pencarian film (OMDB)
- Menandai / menyimpan film favorit
- Autentikasi pengguna (Laravel Fortify)
- Dukungan i18n dan SSR (Inertia)

## Persyaratan
- PHP >= 8.4
- Composer
- Node.js (modern, disarankan v18+)

## Library & Dependensi (ringkasan)

PHP (lihat `composer.json` untuk versi lengkap):
- `laravel/framework` — kernel aplikasi Laravel (repos ini menargetkan Laravel 12 / 11+).
- `inertiajs/inertia-laravel` — integrasi Inertia untuk Laravel.
- `laravel/fortify` — authentication scaffolding (login, register, two-factor, dsb).
- `laravel/tinker` — REPL untuk debugging.
- `laravel/wayfinder` — helper untuk navigasi dan rute aplikasi.

Dev (PHP): `pestphp/pest`, `fakerphp/faker`, `nunomaduro/collision`, `laravel/pint`, `laravel/sail`, dll.

JavaScript (lihat `package.json`):
- `react`, `react-dom`, `@inertiajs/react` — UI dengan React + Inertia.
- `vite`, `laravel-vite-plugin` — build tool modern untuk aset frontend.
- `tailwindcss`, `@headlessui/react` — utilitas styling dan komponen UI.
- Berbagai paket Radix, i18next untuk terjemahan, dan tooling lint/format seperti ESLint & Prettier.

## Mengapa tidak memakai Laravel v5 dan memilih Laravel 11 (atau 11+ seperti Laravel 12)?

Intinya: keamanan, dukungan, performa, dan ekosistem modern.

- Keamanan & dukungan: Laravel 5 sudah berusia sangat tua dan tidak lagi menerima pembaruan keamanan atau perbaikan. Menjalankan aplikasi produksi pada versi yang tidak didukung meningkatkan risiko.
- Kompatibilitas PHP modern: Laravel 11/12 memanfaatkan fitur PHP modern (typed properties, union types, performance improvements) dan membutuhkan versi PHP terbaru. Banyak paket pihak ketiga terbaru juga menargetkan PHP 8.1+ atau 8.2/8.3/8.4.
- Fitur platform: Laravel versi baru menghadirkan banyak peningkatan developer experience (improved route caching, job batching, model casting improvements, query builder enhancements, first-class typed routes, dsb.) yang mempercepat pengembangan dan mengurangi boilerplate.
- Ekosistem frontend modern: toolset seperti Vite, Inertia, serta integrasi React terbaru bekerja lebih mulus dengan Laravel 11/12. Laravel 5 lahir di era Webpack/Elixir dan tidak mendukung integrasi native dengan banyak tooling modern tanpa banyak penyesuaian.
- Paket & dependensi: paket-paket modern (mis. Fortify, latest Inertia adapters, tools untuk testing dan developer tooling) biasanya mensyaratkan Laravel versi terbaru atau setidaknya Laravel 8/9+. Menggunakan versi lawas akan mempersulit pemasangan paket atau memaksa penggunaan versi lama paket yang mungkin mengandung bug/kerentanan.
- Performa & maintanability: patch perf, optimizations, dan perbaikan bug juga fokus pada rilis terbaru — memulai pada versi terbaru membuat aplikasi lebih mudah dipelihara jangka panjang.

Catatan: Repos ini menargetkan Laravel 11+ (composer menunjuk `^12.0`), jadi alasan di atas berlaku sama dan memberikan konteks kenapa menggunakan versi modern daripada Laravel v5.

## Instalasi singkat
1. Salin `.env.example` ke `.env` dan sesuaikan kredensial.
2. Jalankan `composer install` dan `npm install`.
3. Jalankan migrasi: `php artisan migrate`.
4. Jalankan dev server: `npm run dev` dan `php artisan serve`.

---
Jika ingin saya sesuaikan bahasa atau menambahkan bagian teknis (contoh environment, variabel OMDB API key, atau instruksi deploy), beri tahu saya dan saya akan tambahkan.
