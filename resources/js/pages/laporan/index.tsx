import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Transaction {
    id: number;
    tanggal: string;
    divisi?: {
        nama: string;
    };
    kategori_transaksi?: {
        nama: string;
    };
    tipe: string;
    nominal: number;
}

interface LaporanData {
    pemasukan: number;
    pengeluaran: number;
    saldo: number;
    transaksi: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Laporan', href: '/laporan' }];

export default function LaporanIndex() {
    const [bulan, setBulan] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });
    const [data, setData] = useState<LaporanData>({
        pemasukan: 0,
        pengeluaran: 0,
        saldo: 0,
        transaksi: [],
    });
    const [loading, setLoading] = useState(true);

    const fetchLaporan = (bln: string) => {
        api.get(`/laporan/bulanan?bulan=${bln}`).then((res) => {
            setData(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchLaporan(bulan);
    }, [bulan]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Bulanan" />

            <div className="flex flex-col gap-6 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Laporan Bulanan</h1>
                    <div className="flex gap-2">
                        <a
                            href={`/laporan/export/excel?bulan=${bulan}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Excel
                        </a>
                        <a
                            href={`/laporan/export/pdf?bulan=${bulan}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-red-700 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            PDF
                        </a>
                    </div>
                </div>

                <div className="mb-4 rounded-lg bg-card p-6 shadow">
                    <form
                        className="flex items-end gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLoading(true);
                            fetchLaporan(bulan);
                        }}
                    >
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Bulan
                            </label>
                            <input
                                type="month"
                                className="rounded border px-3 py-2"
                                value={bulan}
                                onChange={(e) => {
                                    setBulan(e.target.value);
                                    setLoading(true);
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded bg-green-600 px-4 py-2 text-white"
                        >
                            Tampilkan
                        </button>
                    </form>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pemasukan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-xl font-semibold text-green-600">
                                Rp{' '}
                                {data.pemasukan.toLocaleString('id-ID', {
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengeluaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-xl font-semibold text-red-600">
                                Rp{' '}
                                {data.pengeluaran.toLocaleString('id-ID', {
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Saldo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-xl font-semibold text-blue-600">
                                Rp{' '}
                                {data.saldo.toLocaleString('id-ID', {
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                        </CardContent>
                    </Card>
                </div>

                <div className="rounded-lg bg-card p-6 shadow">
                    <h2 className="mb-4 text-lg font-semibold">
                        Detail Transaksi
                    </h2>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="py-8 text-center text-gray-400">
                                Loading...
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Dinas
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Kategori
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tipe
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Nominal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.transaksi.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-8 text-center text-gray-400"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    ) : (
                                        data.transaksi.map((trx) => (
                                            <tr key={trx.id}>
                                                <td className="px-4 py-2">
                                                    {trx.tanggal}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {trx.divisi?.nama}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {
                                                        trx.kategori_transaksi
                                                            ?.nama
                                                    }
                                                </td>
                                                <td className="px-4 py-2">
                                                    {trx.tipe}
                                                </td>
                                                <td
                                                    className={`px-4 py-2 ${trx.tipe === 'pemasukan' ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    Rp{' '}
                                                    {Number(
                                                        trx.nominal,
                                                    ).toLocaleString('id-ID', {
                                                        maximumFractionDigits: 0,
                                                    })}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
