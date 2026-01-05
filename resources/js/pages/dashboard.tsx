import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BookHeart,
    Calendar,
    Handshake,
    LayoutGrid,
    Megaphone,
    MoreHorizontal,
    TrendingDown,
    TrendingUp,
    Users,
    Wallet,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { renderToStaticMarkup } from 'react-dom/server';

ChartJS.register(ArcElement, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface FinancialReportItem {
    name: string;
    pemasukan: number;
    pengeluaran: number;
}

function getDivisionIcon(name: string) {
    const normalized = name.toUpperCase();
    if (normalized.includes('PSDM')) return Users;
    if (normalized.includes('SOSMAS')) return Handshake;
    if (normalized.includes('KOMINFO')) return Megaphone;
    if (normalized.includes('KEROHANIAN')) return BookHeart;
    return LayoutGrid;
}

interface Transaksi {
    id: number;
    tanggal: string;
    deskripsi: string;
    nominal: number;
    tipe: 'pemasukan' | 'pengeluaran';
    divisi?: { nama: string };
    kategori_transaksi?: { nama: string };
    user?: { name: string };
}

const centerLogosPlugin = {
    id: 'centerLogos',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterDatasetDraw(chart: any, args: any, options: any) {
        const { ctx } = chart;
        const meta = args.meta;
        const images = options.images || {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        meta.data.forEach((element: any, index: number) => {
            const label = chart.data.labels[index];
            const image = images[label];

            // Prevent drawing on zero-value or hidden segments
            if (Math.abs(element.endAngle - element.startAngle) < 0.05) {
                return;
            }

            if (image) {
                const { x, y } = element.getCenterPoint();
                const size = 20;
                const halfSize = size / 2;

                ctx.save();
                ctx.drawImage(image, x - halfSize, y - halfSize, size, size);
                ctx.restore();
            }
        });
    },
};

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// ... (existing imports)

function FinancialChart({
    financialReport,
    transaksi,
}: {
    financialReport: FinancialReportItem[];
    transaksi: Transaksi[];
}) {
    const [type, setType] = useState<'pemasukan' | 'pengeluaran'>(
        'pengeluaran',
    );
    const [selectedMonth, setSelectedMonth] = useState<string>(
        String(new Date().getMonth()),
    );
    const [selectedYear, setSelectedYear] = useState<string>(
        String(new Date().getFullYear()),
    );
    const [chartImages, setChartImages] = useState<
        Record<string, HTMLImageElement>
    >({});

    const years = useMemo(() => {
        if (transaksi.length === 0) return [new Date().getFullYear()];
        const years = new Set(
            transaksi.map((t) => new Date(t.tanggal).getFullYear()),
        );
        years.add(new Date().getFullYear());
        return Array.from(years).sort((a, b) => b - a);
    }, [transaksi]);

    // Filter and process data based on selection
    const filteredData = useMemo(() => {
        // If we want to show specific month from transactions
        if (transaksi.length > 0) {
            const targetYear = parseInt(selectedYear);
            const targetMonth = parseInt(selectedMonth);

            // Group by division
            const divisionMap = new Map<
                string,
                { pemasukan: number; pengeluaran: number }
            >();

            transaksi.forEach((t) => {
                const date = new Date(t.tanggal);
                if (
                    date.getMonth() === targetMonth &&
                    date.getFullYear() === targetYear
                ) {
                    const divName = t.divisi?.nama || 'Lainnya';
                    const current = divisionMap.get(divName) || {
                        pemasukan: 0,
                        pengeluaran: 0,
                    };

                    if (t.tipe === 'pemasukan') {
                        current.pemasukan += Number(t.nominal);
                    } else {
                        current.pengeluaran += Number(t.nominal);
                    }
                    divisionMap.set(divName, current);
                }
            });

            return Array.from(divisionMap.entries()).map(([name, vals]) => ({
                name,
                ...vals,
            }));
        }
        return financialReport;
    }, [transaksi, selectedMonth, financialReport]);

    useEffect(() => {
        const loadImages = async () => {
            const newImages: Record<string, HTMLImageElement> = {};
            await Promise.all(
                filteredData.map(async (item) => {
                    const Icon = getDivisionIcon(item.name);
                    const svgString = renderToStaticMarkup(
                        <Icon size={24} color="#ffffff" strokeWidth={2.5} />,
                    );
                    const encoded = encodeURIComponent(svgString);
                    const img = new Image();
                    img.src = `data:image/svg+xml;charset=utf-8,${encoded}`;
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                    newImages[item.name] = img;
                }),
            );
            setChartImages(newImages);
        };

        if (filteredData.length) {
            loadImages();
        }
    }, [filteredData]);

    const colors = [
        '#10b981', // emerald-500
        '#3b82f6', // blue-500
        '#f59e0b', // amber-500
        '#ef4444', // red-500
        '#8b5cf6', // violet-500
        '#ec4899', // pink-500
        '#6366f1', // indigo-500
        '#14b8a6', // teal-500
        '#84cc16', // lime-500
        '#f97316', // orange-500
    ];

    const data = {
        labels: filteredData.map((item) => item.name),
        datasets: [
            {
                label: type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran',
                data: filteredData.map((item) =>
                    type === 'pemasukan' ? item.pemasukan : item.pengeluaran,
                ),
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide default legend
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: function (context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                            }).format(context.parsed);
                        }
                        return label;
                    },
                },
            },
            centerLogos: {
                images: chartImages,
            },
        },
        cutout: '75%', // Thinner ring to have more space in center
    };

    const hasData = filteredData.some(
        (item) =>
            (type === 'pemasukan' ? item.pemasukan : item.pengeluaran) > 0,
    );

    const total = filteredData.reduce(
        (acc, item) =>
            acc + (type === 'pemasukan' ? item.pemasukan : item.pengeluaran),
        0,
    );

    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="pb-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">
                            Laporan Per Divisi
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Select
                                value={selectedYear}
                                onValueChange={setSelectedYear}
                            >
                                <SelectTrigger className="h-8 w-[100px]">
                                    <SelectValue placeholder="Tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem
                                            key={year}
                                            value={String(year)}
                                        >
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedMonth}
                                onValueChange={setSelectedMonth}
                            >
                                <SelectTrigger className="h-8 w-[120px]">
                                    <SelectValue placeholder="Pilih Bulan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month, index) => (
                                        <SelectItem
                                            key={index}
                                            value={String(index)}
                                        >
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex self-start rounded-lg bg-muted p-1">
                        <button
                            onClick={() => setType('pemasukan')}
                            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                                type === 'pemasukan'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-background/50'
                            }`}
                        >
                            Masuk
                        </button>
                        <button
                            onClick={() => setType('pengeluaran')}
                            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                                type === 'pengeluaran'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-background/50'
                            }`}
                        >
                            Keluar
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
                {hasData ? (
                    <>
                        <div className="relative w-full max-w-[280px]">
                            <Doughnut
                                data={data}
                                options={options}
                                plugins={[centerLogosPlugin]}
                            />
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground uppercase">
                                    Total {type}
                                </span>
                                <span className="text-lg font-bold text-foreground">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        maximumFractionDigits: 0,
                                        notation: 'compact',
                                    }).format(total)}
                                </span>
                            </div>
                        </div>

                        {/* Custom Legend with Icons */}
                        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2">
                            {filteredData.map((item, index) => {
                                const Icon = getDivisionIcon(item.name);
                                const value =
                                    type === 'pemasukan'
                                        ? item.pemasukan
                                        : item.pengeluaran;
                                if (value === 0) return null; // Hide zero values in legend optionally? Or keep them.

                                return (
                                    <div
                                        key={item.name}
                                        className="flex items-center gap-2 rounded-lg border bg-muted/20 p-2"
                                    >
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                                            style={{
                                                backgroundColor:
                                                    colors[
                                                        index % colors.length
                                                    ],
                                            }}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="truncate text-xs font-semibold text-foreground">
                                                {item.name}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {new Intl.NumberFormat(
                                                    'id-ID',
                                                    {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        maximumFractionDigits: 0,
                                                    },
                                                ).format(value)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                        Belum ada data transaksi {type} pada bulan{' '}
                        {months[parseInt(selectedMonth)]} {selectedYear}.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function Dashboard({
    financialReport = [],
}: {
    financialReport?: FinancialReportItem[];
}) {
    const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/transaksi', { params: { all: 1 } })
            .then((res) => {
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data.data || [];
                setTransaksi(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const pemasukan = transaksi.reduce(
        (s, t) => s + (t.tipe === 'pemasukan' ? Number(t.nominal) : 0),
        0,
    );
    const pengeluaran = transaksi.reduce(
        (s, t) => s + (t.tipe === 'pengeluaran' ? Number(t.nominal) : 0),
        0,
    );
    const saldo = pemasukan - pengeluaran;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const pemasukanBulanIni = transaksi.reduce((total, t) => {
        const d = new Date(t.tanggal);
        if (
            t.tipe === 'pemasukan' &&
            d.getMonth() === currentMonth &&
            d.getFullYear() === currentYear
        ) {
            return total + Number(t.nominal);
        }
        return total;
    }, 0);

    const pengeluaranBulanIni = transaksi.reduce((total, t) => {
        const d = new Date(t.tanggal);
        if (
            t.tipe === 'pengeluaran' &&
            d.getMonth() === currentMonth &&
            d.getFullYear() === currentYear
        ) {
            return total + Number(t.nominal);
        }
        return total;
    }, 0);

    const saldoBulanIni = pemasukanBulanIni - pengeluaranBulanIni;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 p-4 sm:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Dashboard Keuangan
                        </h1>
                        <p className="text-muted-foreground">
                            Ringkasan dan analisis keuangan BEM Adabiah.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex"
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </Button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Income Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden decoration-emerald-500/20 shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Pemasukan
                                </CardTitle>
                                <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">
                                    Rp {pemasukan.toLocaleString('id-ID')}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Akumulasi semua dana masuk
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Pemasukan Bulan Ini
                                </CardTitle>
                                <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                    <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                    Rp{' '}
                                    {pemasukanBulanIni.toLocaleString('id-ID')}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Bulan{' '}
                                    {new Date().toLocaleDateString('id-ID', {
                                        month: 'long',
                                    })}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Expense Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Pengeluaran
                                </CardTitle>
                                <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/30">
                                    <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">
                                    Rp {pengeluaran.toLocaleString('id-ID')}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Akumulasi semua dana keluar
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Pengeluaran Bulan Ini
                                </CardTitle>
                                <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/30">
                                    <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                                    Rp{' '}
                                    {pengeluaranBulanIni.toLocaleString(
                                        'id-ID',
                                    )}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Bulan{' '}
                                    {new Date().toLocaleDateString('id-ID', {
                                        month: 'long',
                                    })}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Balance Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden border-primary/20 bg-primary/5 shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-foreground">
                                    Saldo Total
                                </CardTitle>
                                <div className="rounded-full bg-primary/20 p-2">
                                    <Wallet className="h-4 w-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-foreground">
                                    Rp {saldo.toLocaleString('id-ID')}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Dana tersedia saat ini
                                </p>
                            </CardContent>
                        </Card>
                        <Card
                            className={`overflow-hidden shadow-sm transition-all hover:shadow-md ${saldoBulanIni < 0 ? 'border-rose-200 bg-rose-50/30' : ''}`}
                        >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Arus Kas Bulan Ini
                                </CardTitle>
                                <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                                    <Activity className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`text-2xl font-bold ${saldoBulanIni >= 0 ? 'text-foreground' : 'text-rose-600'}`}
                                >
                                    {saldoBulanIni > 0 ? '+' : ''}Rp{' '}
                                    {saldoBulanIni.toLocaleString('id-ID')}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Selisih masuk - keluar bulan ini
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
                    {/* Recent Transactions Table */}
                    <div className="lg:col-span-5">
                        <Card className="h-full shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Transaksi Terbaru</CardTitle>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        8 transaksi terakhir yang tercatat.
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="as-link gap-1"
                                    onClick={() =>
                                        (window.location.href = '/laporan')
                                    }
                                >
                                    Lihat Semua{' '}
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                        <p className="text-sm">
                                            Memuat data...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                        Detail
                                                    </th>
                                                    <th className="hidden h-12 px-4 text-left align-middle font-medium text-muted-foreground sm:table-cell">
                                                        Kategori
                                                    </th>
                                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                                        Nominal
                                                    </th>
                                                    <th className="h-12 w-[50px] px-4 text-right align-middle font-medium text-muted-foreground"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transaksi.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={4}
                                                            className="h-24 text-center text-muted-foreground"
                                                        >
                                                            Belum ada data
                                                            transaksi.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    transaksi
                                                        .slice(0, 8)
                                                        .map((trx) => (
                                                            <tr
                                                                key={trx.id}
                                                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                            >
                                                                <td className="p-4 align-middle">
                                                                    <div className="flex flex-col">
                                                                        <span className="max-w-[200px] truncate font-medium sm:max-w-[300px]">
                                                                            {trx.deskripsi ||
                                                                                'Tanpa Keterangan'}
                                                                        </span>
                                                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                                            <span>
                                                                                {
                                                                                    trx.tanggal
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                •
                                                                            </span>
                                                                            <span className="capitalize">
                                                                                {trx.user?.name?.split(
                                                                                    ' ',
                                                                                )[0] ||
                                                                                    'System'}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="hidden p-4 align-middle sm:table-cell">
                                                                    <div className="flex flex-col gap-1">
                                                                        <Badge
                                                                            variant="secondary"
                                                                            className="w-fit font-normal"
                                                                        >
                                                                            {
                                                                                trx
                                                                                    .divisi
                                                                                    ?.nama
                                                                            }
                                                                        </Badge>
                                                                        <span className="px-1 text-xs text-muted-foreground">
                                                                            {
                                                                                trx
                                                                                    .kategori_transaksi
                                                                                    ?.nama
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="p-4 text-right align-middle">
                                                                    <span
                                                                        className={`font-semibold ${trx.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-rose-600'}`}
                                                                    >
                                                                        {trx.tipe ===
                                                                        'pemasukan'
                                                                            ? '+'
                                                                            : '-'}{' '}
                                                                        Rp{' '}
                                                                        {Number(
                                                                            trx.nominal,
                                                                        ).toLocaleString(
                                                                            'id-ID',
                                                                        )}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 text-right align-middle">
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8"
                                                                            >
                                                                                <MoreHorizontal className="h-4 w-4" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                            <DropdownMenuLabel>
                                                                                Aksi
                                                                            </DropdownMenuLabel>
                                                                            <DropdownMenuItem
                                                                                onClick={() =>
                                                                                    (window.location.href =
                                                                                        '/laporan')
                                                                                }
                                                                            >
                                                                                Lihat
                                                                                Detail
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </td>
                                                            </tr>
                                                        ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chart Section */}
                    <div className="lg:col-span-2">
                        <FinancialChart
                            financialReport={financialReport}
                            transaksi={transaksi}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
