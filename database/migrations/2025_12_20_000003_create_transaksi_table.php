<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('divisi_id')->constrained('divisis')->onDelete('cascade');
            $table->foreignId('kategori_transaksi_id')->constrained('kategori_transaksi')->onDelete('cascade');
            $table->enum('tipe', ['pemasukan', 'pengeluaran']);
            $table->decimal('nominal', 15, 2);
            $table->string('deskripsi')->nullable();
            $table->date('tanggal');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
