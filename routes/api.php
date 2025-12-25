<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/laporan/bulanan', [\App\Http\Controllers\Api\LaporanController::class, 'bulanan']);

    Route::get('/transaksi', [\App\Http\Controllers\Api\TransaksiController::class, 'index']);
    Route::get('/transaksi/options', [\App\Http\Controllers\Api\TransaksiController::class, 'options']);

    Route::middleware('admin')->group(function () {
        Route::post('/transaksi', [\App\Http\Controllers\Api\TransaksiController::class, 'store']);
        Route::put('/transaksi/{id}', [\App\Http\Controllers\Api\TransaksiController::class, 'update']);
        Route::delete('/transaksi/{id}', [\App\Http\Controllers\Api\TransaksiController::class, 'destroy']);
        Route::get('/users', [\App\Http\Controllers\Api\UserController::class, 'index']);
        Route::post('/users', [\App\Http\Controllers\Api\UserController::class, 'store']);
        Route::put('/users/{id}', [\App\Http\Controllers\Api\UserController::class, 'update']);
        Route::delete('/users/{id}', [\App\Http\Controllers\Api\UserController::class, 'destroy']);
    });
});
