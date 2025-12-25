<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LaporanController extends Controller
{
    private function getData($bulan)
    {
        $start = Carbon::createFromFormat('Y-m', $bulan)->startOfMonth();
        $end = Carbon::createFromFormat('Y-m', $bulan)->endOfMonth();

        $transaksi = Transaksi::with(['divisi', 'kategoriTransaksi', 'user'])
            ->whereBetween('tanggal', [$start, $end])
            ->orderByDesc('tanggal')
            ->get();

        $pemasukan = $transaksi->where('tipe', 'pemasukan')->sum('nominal');
        $pengeluaran = $transaksi->where('tipe', 'pengeluaran')->sum('nominal');
        $saldo = $pemasukan - $pengeluaran;

        return compact('transaksi', 'pemasukan', 'pengeluaran', 'saldo', 'bulan');
    }

    public function bulanan(Request $request)
    {
        $bulan = $request->input('bulan', Carbon::now()->format('Y-m'));
        $data = $this->getData($bulan);

        return response()->json($data);
    }

    public function exportExcel(Request $request)
    {
        $bulan = $request->input('bulan', Carbon::now()->format('Y-m'));
        $data = $this->getData($bulan);
        $fileName = 'laporan-keuangan-' . $bulan . '.csv';

        $headers = [
            'Content-type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=$fileName",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Tanggal', 'Divisi', 'Kategori', 'Tipe', 'Nominal', 'Deskripsi']);

            foreach ($data['transaksi'] as $trx) {
                fputcsv($file, [
                    $trx->tanggal,
                    $trx->divisi ? $trx->divisi->nama : '-',
                    $trx->kategoriTransaksi ? $trx->kategoriTransaksi->nama : '-',
                    $trx->tipe,
                    $trx->nominal,
                    $trx->deskripsi
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportPdf(Request $request)
    {
        $bulan = $request->input('bulan', Carbon::now()->format('Y-m'));
        $data = $this->getData($bulan);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('laporan.pdf', $data);
        return $pdf->download('laporan-keuangan-' . $bulan . '.pdf');
    }
}
