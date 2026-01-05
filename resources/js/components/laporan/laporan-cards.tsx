import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Wallet } from 'lucide-react';
import { LaporanData } from './types';

interface LaporanCardsProps {
    data: LaporanData;
}

export function LaporanCards({ data }: LaporanCardsProps) {
    return (
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
                            data.transaksi.filter((t) => t.tipe === 'pemasukan')
                                .length
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
    );
}
