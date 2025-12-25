<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DivisiSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('divisis')->truncate();
        Schema::enableForeignKeyConstraints();

        $divisis = [
            'PSDM',
            'SOSMAS',
            'KOMINFO',
            'KEROHANIAN'
        ];

        foreach ($divisis as $nama) {
            DB::table('divisis')->insert([
                'nama' => $nama,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
