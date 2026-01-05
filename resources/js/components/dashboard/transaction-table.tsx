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
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';
import { Transaksi } from './types';

interface TransactionTableProps {
    transaksi: Transaksi[];
    loading: boolean;
}

export function TransactionTable({
    transaksi,
    loading,
}: TransactionTableProps) {
    return (
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
                    onClick={() => (window.location.href = '/laporan')}
                >
                    Lihat Semua <ArrowUpRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-muted-foreground">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-sm">Memuat data...</p>
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
                                            Belum ada data transaksi.
                                        </td>
                                    </tr>
                                ) : (
                                    transaksi.slice(0, 8).map((trx) => (
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
                                                            {trx.tanggal}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="capitalize">
                                                            {trx.user?.name?.split(
                                                                ' ',
                                                            )[0] || 'System'}
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
                                                        {trx.divisi?.nama}
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
                                                    {trx.tipe === 'pemasukan'
                                                        ? '+'
                                                        : '-'}{' '}
                                                    Rp{' '}
                                                    {Number(
                                                        trx.nominal,
                                                    ).toLocaleString('id-ID')}
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
                                                            Lihat Detail
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
    );
}
