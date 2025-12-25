import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    Calendar as CalendarIcon,
    Download,
    FileSpreadsheet,
    FileText,
    Wallet,
} from 'lucide-react';
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
    tipe: 'pemasukan' | 'pengeluaran';
    nominal: number;
}

interface LaporanData {
    pemasukan: number;
    pengeluaran: number;
    saldo: number;
    transaksi: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Laporan', href: '/laporan' }];

const MONTHS = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

export default function LaporanIndex() {
    const [month, setMonth] = useState(() => {
        const now = new Date();
        return String(now.getMonth() + 1).padStart(2, '0');
    });
    const [year, setYear] = useState(() => {
        return String(new Date().getFullYear());
    });

    const [data, setData] = useState<LaporanData>({
        pemasukan: 0,
        pengeluaran: 0,
        saldo: 0,
        transaksi: [],
    });
    const [loading, setLoading] = useState(true);

    const fullDate = `${year}-${month}`;

    const fetchLaporan = (bln: string) => {
        setLoading(true);
        api.get(`/laporan/bulanan?bulan=${bln}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch laporan:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLaporan(fullDate);
    }, [fullDate]);

    // Generate last 5 years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

    const downloadReport = (type: 'excel' | 'pdf') => {
        window.open(
            `/laporan/export/${type}?bulan=${fullDate}`,
            '_blank',
            'noopener,noreferrer',
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Bulanan" />

            <div className="flex flex-col gap-8 p-4 sm:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Laporan Keuangan
                        </h1>
                        <p className="text-muted-foreground">
                            Ringkasan dan analisis arus kas bulanan.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => downloadReport('excel')}
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Excel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => downloadReport('pdf')}
                            className="border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            PDF
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Periode:</span>
                    </div>
                    <Select value={month} onValueChange={setMonth}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            {MONTHS.map((m) => (
                                <SelectItem key={m.value} value={m.value}>
                                    {m.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((y) => (
                                <SelectItem key={y} value={y}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            fetchLaporan(fullDate);
                        }}
                        className="ml-auto sm:ml-0"
                        title="Refresh Data"
                    >
                        <Download className="h-4 w-4 rotate-180" />{' '}
                        {/* Reuse icon to symbolize refresh/reload if distinct from download */}
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-l-4 border-l-emerald-500 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Pemasukan
                            </CardTitle>
                            <ArrowUp className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">
                                Rp {data.pemasukan.toLocaleString('id-ID')}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +
                                {
                                    data.transaksi.filter(
                                        (t) => t.tipe === 'pemasukan',
                                    ).length
                                }{' '}
                                transaksi
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-rose-500 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Pengeluaran
                            </CardTitle>
                            <ArrowDown className="h-4 w-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-rose-600">
                                Rp {data.pengeluaran.toLocaleString('id-ID')}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                -
                                {
                                    data.transaksi.filter(
                                        (t) => t.tipe === 'pengeluaran',
                                    ).length
                                }{' '}
                                transaksi
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Sisa Saldo
                            </CardTitle>
                            <Wallet className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                Rp {data.saldo.toLocaleString('id-ID')}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Net Cash Flow
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Separator />

                {/* Transaction Table */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Rincian Transaksi</CardTitle>
                        <CardDescription>
                            Daftar lengkap transaksi untuk periode{' '}
                            {MONTHS.find((m) => m.value === month)?.label}{' '}
                            {year}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[150px] pl-6">
                                            Tanggal
                                        </TableHead>
                                        <TableHead>Divisi & Kategori</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead className="text-right">
                                            Nominal
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-24 text-center"
                                            >
                                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                                    Memuat data...
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : data.transaksi.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-24 text-center text-muted-foreground"
                                            >
                                                Tidak ada transaksi pada periode
                                                ini.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        data.transaksi.map((trx) => (
                                            <TableRow
                                                key={trx.id}
                                                className="hover:bg-muted/50"
                                            >
                                                <TableCell className="pl-6 font-medium">
                                                    {new Date(
                                                        trx.tanggal,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-foreground">
                                                            {trx.divisi?.nama ||
                                                                '-'}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {trx
                                                                .kategori_transaksi
                                                                ?.nama || '-'}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            trx.tipe ===
                                                            'pemasukan'
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                        className={
                                                            trx.tipe ===
                                                            'pemasukan'
                                                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                                                : 'bg-rose-600 hover:bg-rose-700'
                                                        }
                                                    >
                                                        {trx.tipe ===
                                                        'pemasukan'
                                                            ? 'Pemasukan'
                                                            : 'Pengeluaran'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell
                                                    className={`text-right font-mono font-bold ${
                                                        trx.tipe === 'pemasukan'
                                                            ? 'text-emerald-600'
                                                            : 'text-rose-600'
                                                    }`}
                                                >
                                                    {trx.tipe === 'pemasukan'
                                                        ? '+'
                                                        : '-'}{' '}
                                                    Rp{' '}
                                                    {Number(
                                                        trx.nominal,
                                                    ).toLocaleString('id-ID')}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
