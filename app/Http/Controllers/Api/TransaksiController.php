<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Divisi;
use App\Models\KategoriTransaksi;

class TransaksiController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaksi::with(['divisi', 'kategoriTransaksi', 'user'])
            ->orderByDesc('tanggal');

        if ($request->has('tipe') && $request->tipe) {
            $query->where('tipe', $request->tipe);
        }

        if ($request->has('divisi_id') && $request->divisi_id) {
            $query->where('divisi_id', $request->divisi_id);
        }

        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('tanggal', '>=', $request->start_date);
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('tanggal', '<=', $request->end_date);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('deskripsi', 'like', "%{$search}%")
                  ->orWhereHas('user', function($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('all')) {
            $transaksi = $query->get();
        } else {
            $transaksi = $query->paginate(10);
        }
        return response()->json($transaksi);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'divisi_id' => 'required|exists:divisis,id',
            'kategori_transaksi_id' => 'required|exists:kategori_transaksi,id',
            'tipe' => 'required|in:pemasukan,pengeluaran',
            'nominal' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'required|date',
        ]);
        $data['user_id'] = Auth::id();
        $transaksi = Transaksi::create($data);
        return response()->json($transaksi, 201);
    }

    public function update(Request $request, $id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $data = $request->validate([
            'divisi_id' => 'required|exists:divisis,id',
            'kategori_transaksi_id' => 'required|exists:kategori_transaksi,id',
            'tipe' => 'required|in:pemasukan,pengeluaran',
            'nominal' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'required|date',
        ]);
        
        $transaksi->update($data);
        return response()->json($transaksi);
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();
        return response()->json(['message' => 'Transaksi berhasil dihapus']);
    }

    public function options()
    {
        return response()->json([
            'divisi' => Divisi::all(),
            'kategori' => KategoriTransaksi::all(),
        ]);
    }
}
