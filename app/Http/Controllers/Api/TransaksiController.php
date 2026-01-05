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
        $data = $this->resolveData($request);
        $data['user_id'] = Auth::id();
        $transaksi = Transaksi::create($data);
        return response()->json($transaksi, 201);
    }

    public function update(Request $request, $id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $data = $this->resolveData($request);
        
        $transaksi->update($data);
        return response()->json($transaksi);
    }

    private function resolveData(Request $request)
    {
        $rules = [
            'kategori_transaksi_id' => 'required|exists:kategori_transaksi,id',
            'tipe' => 'required|in:pemasukan,pengeluaran',
            'nominal' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'required|date',
        ];

        if ($request->input('divisi_id') === 'other') {
            $rules['divisi_custom_name'] = 'required|string|max:255';
        } else {
            $rules['divisi_id'] = 'required|exists:divisis,id';
        }

        $data = $request->validate($rules);

        if ($request->input('divisi_id') === 'other') {
            $divisi = Divisi::firstOrCreate(['nama' => $data['divisi_custom_name']]);
            $data['divisi_id'] = $divisi->id;
            unset($data['divisi_custom_name']);
        }

        return $data;
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
