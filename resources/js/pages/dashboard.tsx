import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
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

import {
    BookHeart,
    Handshake,
    LayoutGrid,
    Megaphone,
    Users,
} from 'lucide-react';

function getDivisionIcon(name: string) {
    const normalized = name.toUpperCase();
    if (normalized.includes('PSDM')) return Users;
    if (normalized.includes('SOSMAS')) return Handshake;
    if (normalized.includes('KOMINFO')) return Megaphone;
    if (normalized.includes('KEROHANIAN')) return BookHeart;
    return LayoutGrid;
}

const centerLogosPlugin = {
    id: 'centerLogos',
    afterDatasetDraw(chart: any, args: any, options: any) {
        const { ctx } = chart;
        const meta = args.meta;
        const images = options.images || {};

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

function FinancialChart({
    financialReport,
}: {
    financialReport: FinancialReportItem[];
}) {
    const [type, setType] = useState<'pemasukan' | 'pengeluaran'>(
        'pengeluaran',
    );
    const [chartImages, setChartImages] = useState<
        Record<string, HTMLImageElement>
    >({});

    useEffect(() => {
        const loadImages = async () => {
            const newImages: Record<string, HTMLImageElement> = {};
            await Promise.all(
                financialReport.map(async (item) => {
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

        if (financialReport.length) {
            loadImages();
        }
    }, [financialReport]);

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
        labels: financialReport.map((item) => item.name),
        datasets: [
            {
                label: type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran',
                data: financialReport.map((item) =>
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

    const hasData = financialReport.some(
        (item) =>
            (type === 'pemasukan' ? item.pemasukan : item.pengeluaran) > 0,
    );

    const total = financialReport.reduce(
        (acc, item) =>
            acc + (type === 'pemasukan' ? item.pemasukan : item.pengeluaran),
        0,
    );

    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                        Laporan Per Divisi
                    </CardTitle>
                    <div className="flex rounded-lg bg-muted p-1">
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
                            {financialReport.map((item, index) => {
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
                        Belum ada data transaksi {type}.
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
    const [transaksi, setTransaksi] = useState<any[]>([]);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pemasukan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-semibold text-green-600">
                                Rp {pemasukan.toLocaleString()}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                Total pemasukan dari transaksi
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pengeluaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-semibold text-red-600">
                                Rp {pengeluaran.toLocaleString()}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                Total pengeluaran
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Saldo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-semibold text-gray-900">
                                Rp {saldo.toLocaleString()}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                Saldo saat ini
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaksi Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="py-8 text-center text-gray-400">
                                        Loading...
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Tanggal
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Divisi
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
                                                {transaksi.length === 0 ? (
                                                    <tr>
                                                        <td
                                                            colSpan={5}
                                                            className="py-8 text-center text-gray-400"
                                                        >
                                                            Tidak ada transaksi
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    transaksi
                                                        .slice(0, 8)
                                                        .map((trx: any) => (
                                                            <tr key={trx.id}>
                                                                <td className="px-4 py-2">
                                                                    {
                                                                        trx.tanggal
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {
                                                                        trx
                                                                            .divisi
                                                                            ?.nama
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {
                                                                        trx
                                                                            .kategori_transaksi
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
                                                                    ).toLocaleString(
                                                                        'id-ID',
                                                                        {
                                                                            maximumFractionDigits: 0,
                                                                        },
                                                                    )}
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

                    <div className="lg:col-span-1">
                        <FinancialChart financialReport={financialReport} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
