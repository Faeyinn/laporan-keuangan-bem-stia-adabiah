<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';
    protected $fillable = [
        'user_id',
        'divisi_id',
        'kategori_transaksi_id',
        'tipe',
        'nominal',
        'deskripsi',
        'tanggal',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function divisi()
    {
        return $this->belongsTo(Divisi::class);
    }

    public function kategoriTransaksi()
    {
        return $this->belongsTo(KategoriTransaksi::class);
    }
}
