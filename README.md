# 💰 Sistem Informasi Keuangan BEM STIA Adabiah

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-12.0-red.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)
![Inertia](https://img.shields.io/badge/Inertia.js-2.0-purple.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)

Platform manajemen dan transparansi laporan keuangan digital modern untuk Badan Eksekutif Mahasiswa (BEM) STIA Adabiah. Dibangun dengan teknologi web terkini untuk menjamin performa, keamanan, dan pengalaman pengguna yang seamless.

## 🚀 Fitur Utama

- **Dashboard Interaktif**: Visualisasi data keuangan real-time menggunakan Chart.js.
- **Manajemen Transaksi**: Pencatatan pemasukan dan pengeluaran yang terstruktur.
- **Laporan Otomatis**:
    - 📄 Ekspor laporan ke **PDF** (menggunakan `laravel-dompdf`).
    - 📊 Ekspor data ke **Excel** (menggunakan `maatwebsite/excel`).
- **Autentikasi Aman**: Sistem login robust menggunakan Laravel Fortify.
- **Modern UI/UX**: Antarmuka responsif berbasis komponen React & Radix UI primitives.
- **Mode Gelap/Terang**: Dukungan tema otomatis (Next Themes).

## 🛠️ Teknologi yang Digunakan

### Backend

- **Laravel 12**: Framework PHP modern untuk backend yang robust.
- **SQLite/MySQL**: Database relasional.
- **Laravel Fortify**: Backend autentikasi headless.

### Frontend

- **React 19**: Library UI untuk membangun antarmuka interaktif.
- **Inertia.js 2.0**: Penghubung monolitik modern antara Laravel dan React.
- **TypeScript**: Superset JavaScript untuk kode yang lebih aman (Typehub).
- **Tailwind CSS 4.0**: Utility-first CSS framework untuk styling cepat.
- **Shadcn UI / Radix UI**: Komponen UI aksesibel dan kustomisable.
- **Vite 6**: Build tool generasi berikutnya yang super cepat.

## ⚙️ Persyaratan Sistem

Pastikan sistem Anda telah terinstal:

- **PHP** >= 8.2
- **Composer**
- **Node.js** & **NPM**

## 📦 Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

1. **Clone Repositori**

    ```bash
    git clone https://github.com/username/bem-adabiah-keuangan.git
    cd bem-adabiah-keuangan
    ```

2. **Instal Dependensi Backend**

    ```bash
    composer install
    ```

3. **Instal Dependensi Frontend**

    ```bash
    npm install
    ```

4. **Konfigurasi Environment**
   Salin file `.env.example` menjadi `.env`:

    ```bash
    cp .env.example .env
    ```

    Atur konfigurasi database di file `.env` Anda.

5. **Generate Application Key**

    ```bash
    php artisan key:generate
    ```

6. **Jalankan Migrasi Database**
    ```bash
    php artisan migrate
    ```
    ```bash
    php artisan db:seed
    ```

## 🖥️ Menjalankan Aplikasi

Gunakan perintah berikut untuk menjalankan server development (Laravel & Vite secara bersamaan):

```bash
npm run dev
```

Akses aplikasi di browser melalui: `http://localhost:8000`

## 🏗️ Perintah Utilitas

- **Format Code (Prettier)**:
    ```bash
    npm run format
    ```
- **Lint Code (ESLint)**:
    ```bash
    npm run lint
    ```
- **Type Check**:
    ```bash
    npm run types
    ```
- **Build untuk Production**:
    ```bash
    npm run build
    ```

## 📝 Lisensi

Proyek ini berlisensi di bawah [MIT License](LICENSE).

---

_Dibuat dengan ❤️ oleh Developer BEM STIA Adabiah_
