import { LaporanCards } from '@/components/laporan/laporan-cards';
import { LaporanFilters } from '@/components/laporan/laporan-filters';
import { LaporanTable } from '@/components/laporan/laporan-table';
import { LaporanData } from '@/components/laporan/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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

    const fetchLaporan = useCallback((bln: string) => {
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
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchLaporan(fullDate);
    }, [fullDate, fetchLaporan]);

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
                <LaporanFilters
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    months={MONTHS}
                    years={years}
                    onRefresh={() => fetchLaporan(fullDate)}
                />

                {/* Summary Cards */}
                <LaporanCards data={data} />

                <Separator />

                {/* Transaction Table */}
                <LaporanTable
                    data={data}
                    loading={loading}
                    monthLabel={MONTHS.find((m) => m.value === month)?.label}
                    year={year}
                />
            </div>
        </AppLayout>
    );
}
