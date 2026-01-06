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
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { LaporanData, Transaction } from './types';

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
    const [selectedTrx, setSelectedTrx] = useState<Transaction | null>(null);
    const [open, setOpen] = useState(false);

    const handleRowClick = (trx: Transaction) => {
        setSelectedTrx(trx);
        setOpen(true);
    };

    return (
        <>
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Rincian Transaksi</CardTitle>
                    <CardDescription>
                        Daftar lengkap transaksi untuk periode {monthLabel}{' '}
                        {year}
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
                                    <TableHead className="w-1/4">
                                        Tipe
                                    </TableHead>
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
                                            Tidak ada transaksi pada periode
                                            ini.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.transaksi.map((trx) => (
                                        <TableRow
                                            key={trx.id}
                                            className="cursor-pointer transition-colors hover:bg-muted/50"
                                            onClick={() => handleRowClick(trx)}
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
                                                        {trx.divisi?.nama ||
                                                            '-'}
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Detail Transaksi</DialogTitle>
                    </DialogHeader>
                    {selectedTrx && (
                        <div className="flex flex-col gap-6 py-4">
                            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-muted/30 py-6">
                                <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                                    Nominal
                                </span>
                                <span
                                    className={`text-3xl font-bold ${selectedTrx.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-rose-600'}`}
                                >
                                    {selectedTrx.tipe === 'pemasukan'
                                        ? '+'
                                        : '-'}{' '}
                                    Rp{' '}
                                    {Number(selectedTrx.nominal).toLocaleString(
                                        'id-ID',
                                        {
                                            maximumFractionDigits: 0,
                                        },
                                    )}
                                </span>
                                <Badge
                                    variant={
                                        selectedTrx.tipe === 'pemasukan'
                                            ? 'default'
                                            : 'destructive'
                                    }
                                    className={
                                        selectedTrx.tipe === 'pemasukan'
                                            ? 'bg-emerald-600'
                                            : 'bg-rose-600'
                                    }
                                >
                                    {selectedTrx.tipe === 'pemasukan'
                                        ? 'Pemasukan'
                                        : 'Pengeluaran'}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">
                                        Tanggal
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            selectedTrx.tanggal,
                                        ).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">
                                        Kategori
                                    </span>
                                    <span className="font-medium">
                                        {selectedTrx.kategori_transaksi?.nama ||
                                            '-'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">
                                        Divisi
                                    </span>
                                    <span className="font-medium">
                                        {selectedTrx.divisi?.nama || '-'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">
                                        Diinput Oleh
                                    </span>
                                    <span className="font-medium">
                                        {selectedTrx.user?.name || '-'}
                                    </span>
                                </div>
                                <div className="col-span-2 flex flex-col gap-1 rounded-lg border p-3">
                                    <span className="text-xs text-muted-foreground uppercase">
                                        Keterangan
                                    </span>
                                    <p className="leading-relaxed font-medium whitespace-pre-wrap">
                                        {selectedTrx.deskripsi ||
                                            'Tidak ada keterangan tambahan.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
