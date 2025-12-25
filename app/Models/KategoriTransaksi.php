<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriTransaksi extends Model
{
    use HasFactory;

    protected $table = 'kategori_transaksi';
    protected $fillable = ['nama', 'tipe'];

    public function transaksis()
    {
        return $this->hasMany(Transaksi::class);
    }
}
