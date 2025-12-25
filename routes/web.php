<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stats = \App\Models\Divisi::withSum(['transaksis as total_pemasukan' => function($query) {
            $query->where('tipe', 'pemasukan');
        }], 'nominal')
        ->withSum(['transaksis as total_pengeluaran' => function($query) {
            $query->where('tipe', 'pengeluaran');
        }], 'nominal')
        ->get();

        $financialReport = $stats->map(function($divisi) {
            return [
                'name' => $divisi->nama,
                'pemasukan' => (int) $divisi->total_pemasukan,
                'pengeluaran' => (int) $divisi->total_pengeluaran,
            ];
        });

        return Inertia::render('dashboard', [
            'financialReport' => $financialReport
        ]);
    })->name('dashboard');
        Route::get('laporan', function () {
            return Inertia::render('laporan/index');
        })->name('laporan.index');

        Route::get('laporan/export/excel', [\App\Http\Controllers\Api\LaporanController::class, 'exportExcel'])->name('laporan.export.excel');
        Route::get('laporan/export/pdf', [\App\Http\Controllers\Api\LaporanController::class, 'exportPdf'])->name('laporan.export.pdf');

        Route::middleware('admin')->group(function () {
            Route::get('transaksi', function () {
                return Inertia::render('transaksi/index');
            })->name('transaksi.index');

            Route::get('users', function () {
                return Inertia::render('users/index');
            })->name('users.index');
        });
    });

require __DIR__.'/settings.php';
