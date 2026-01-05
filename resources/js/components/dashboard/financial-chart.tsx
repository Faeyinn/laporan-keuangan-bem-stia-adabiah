import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import {
    BookHeart,
    Handshake,
    LayoutGrid,
    Megaphone,
    Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { renderToStaticMarkup } from 'react-dom/server';
import { FinancialReportItem, Transaksi } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

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

interface FinancialChartProps {
    financialReport: FinancialReportItem[];
    transaksi: Transaksi[];
}

export function FinancialChart({
    financialReport,
    transaksi,
}: FinancialChartProps) {
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
    }, [transaksi, selectedMonth, selectedYear, financialReport]);

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
                        img.onload = resolve as () => void;
                        img.onerror = resolve as () => void;
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
