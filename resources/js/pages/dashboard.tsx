import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { FinancialChart } from '@/components/dashboard/financial-chart';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import { TransactionTable } from '@/components/dashboard/transaction-table';
import { FinancialReportItem, Transaksi } from '@/components/dashboard/types';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 p-4 sm:p-8">
                {/* Header Section */}
                <DashboardHeader />

                {/* Main Stats Grid */}
                <StatsGrid transaksi={transaksi} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
                    {/* Recent Transactions Table */}
                    <div className="lg:col-span-5">
                        <TransactionTable
                            transaksi={transaksi}
                            loading={loading}
                        />
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
