<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Keuangan</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 18px;
        }
        .header p {
            margin: 5px 0;
            color: #666;
        }
        .summary {
            margin-bottom: 20px;
            width: 100%;
            border-collapse: collapse;
        }
        .summary td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
        }
        .summary .label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        .summary .value {
            font-size: 14px;
        }
        .text-green { color: #16a34a; }
        .text-red { color: #dc2626; }
        .text-blue { color: #2563eb; }
        
        table.transactions {
            width: 100%;
            border-collapse: collapse;
        }
        table.transactions th, table.transactions td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        table.transactions th {
            background-color: #f3f4f6;
            font-weight: bold;
        }
        .text-right { text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Keuangan BEM KM ADABIAH</h1>
        <p>Bulan: {{ \Carbon\Carbon::parse($bulan)->translatedFormat('F Y') }}</p>
    </div>

    <table class="summary">
        <tr>
            <td>
                <span class="label">Pemasukan</span>
                <span class="value text-green">Rp {{ number_format($pemasukan, 0, ',', '.') }}</span>
            </td>
            <td>
                <span class="label">Pengeluaran</span>
                <span class="value text-red">Rp {{ number_format($pengeluaran, 0, ',', '.') }}</span>
            </td>
            <td>
                <span class="label">Saldo</span>
                <span class="value text-blue">Rp {{ number_format($saldo, 0, ',', '.') }}</span>
            </td>
        </tr>
    </table>

    <table class="transactions">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Divisi</th>
                <th>Kategori</th>
                <th>Tipe</th>
                <th class="text-right">Nominal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transaksi as $trx)
            <tr>
                <td>{{ $trx->tanggal }}</td>
                <td>{{ $trx->divisi ? $trx->divisi->nama : '-' }}</td>
                <td>{{ $trx->kategoriTransaksi ? $trx->kategoriTransaksi->nama : '-' }}</td>
                <td>{{ ucfirst($trx->tipe) }}</td>
                <td class="text-right {{ $trx->tipe == 'pemasukan' ? 'text-green' : 'text-red' }}">
                    Rp {{ number_format($trx->nominal, 0, ',', '.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
