import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    TrendingDown,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { Transaksi } from './types';

interface StatsGridProps {
    transaksi: Transaksi[];
}

export function StatsGrid({ transaksi }: StatsGridProps) {
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
                            Rp {pemasukanBulanIni.toLocaleString('id-ID')}
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
                            Rp {pengeluaranBulanIni.toLocaleString('id-ID')}
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
    );
}
