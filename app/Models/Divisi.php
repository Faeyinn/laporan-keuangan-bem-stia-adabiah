<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    use HasFactory;

    protected $table = 'divisis';
    protected $fillable = ['nama'];

    public function transaksis()
    {
        return $this->hasMany(Transaksi::class);
    }
}
