import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { LaporanData } from './types';

interface LaporanTableProps {
    data: LaporanData;
    loading: boolean;
    monthLabel?: string;
    year: string;
}

export function LaporanTable({
    data,
    loading,
    monthLabel,
    year,
}: LaporanTableProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Rincian Transaksi</CardTitle>
                <CardDescription>
                    Daftar lengkap transaksi untuk periode {monthLabel} {year}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 pl-6">
                                    Tanggal
                                </TableHead>
                                <TableHead className="w-1/4">
                                    Divisi & Kategori
                                </TableHead>
                                <TableHead className="w-1/4">Tipe</TableHead>
                                <TableHead className="w-1/4 text-right">
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
                                        Tidak ada transaksi pada periode ini.
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
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">
                                                    {trx.divisi?.nama || '-'}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {trx.kategori_transaksi
                                                        ?.nama || '-'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    trx.tipe === 'pemasukan'
                                                        ? 'default'
                                                        : 'destructive'
                                                }
                                                className={
                                                    trx.tipe === 'pemasukan'
                                                        ? 'bg-emerald-600 hover:bg-emerald-700'
                                                        : 'bg-rose-600 hover:bg-rose-700'
                                                }
                                            >
                                                {trx.tipe === 'pemasukan'
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
                                            {Number(trx.nominal).toLocaleString(
                                                'id-ID',
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
