<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'adminbemadabiah@gmail.com'],
            [
                'name' => 'Admin BEM STIA Adabiah',
                'password' => 'adminhehe',
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'userbemadabiah@gmail.com'],
            [
                'name' => 'User BEM STIA Adabiah',
                'password' => 'userhehe',
                'role' => 'user',
                'email_verified_at' => now(),
            ]
        );
    }
}
