<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriTransaksiSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_transaksi')->truncate();
        Schema::enableForeignKeyConstraints();

        $pemasukan = [
            'Dana Kampus',
            'Iuran',
            'Sponsorship',
            'Dana Kegiatan',
            'Usaha Dana',
            'Lain-lain'
        ];

        $pengeluaran = [
            'Administrasi',
            'Kegiatan',
            'Publikasi',
            'Transportasi',
            'Honorarium',
            'Inventaris',
            'Dana Sosial',
            'Lain-lain'
        ];

        foreach ($pemasukan as $nama) {
            DB::table('kategori_transaksi')->insert([
                'nama' => $nama,
                'tipe' => 'pemasukan',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        foreach ($pengeluaran as $nama) {
            DB::table('kategori_transaksi')->insert([
                'nama' => $nama,
                'tipe' => 'pengeluaran',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
