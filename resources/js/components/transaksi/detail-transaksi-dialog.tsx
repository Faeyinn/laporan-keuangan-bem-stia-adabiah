import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Edit, Trash2 } from 'lucide-react';
import { Transaksi } from './types';

interface DetailTransaksiDialogProps {
    trx: Transaksi | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (trx: Transaksi) => void;
    onDelete: (id: number) => void;
}

export function DetailTransaksiDialog({
    trx,
    open,
    onOpenChange,
    onEdit,
    onDelete,
}: DetailTransaksiDialogProps) {
    if (!trx) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Detail Transaksi</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-muted/30 py-6">
                        <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                            Nominal
                        </span>
                        <span
                            className={`text-3xl font-bold ${trx.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-rose-600'}`}
                        >
                            {trx.tipe === 'pemasukan' ? '+' : '-'} Rp{' '}
                            {Number(trx.nominal).toLocaleString('id-ID', {
                                maximumFractionDigits: 0,
                            })}
                        </span>
                        <Badge
                            variant={
                                trx.tipe === 'pemasukan'
                                    ? 'default'
                                    : 'destructive'
                            }
                            className={
                                trx.tipe === 'pemasukan'
                                    ? 'bg-emerald-600'
                                    : 'bg-rose-600'
                            }
                        >
                            {trx.tipe === 'pemasukan'
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
                                {new Date(trx.tanggal).toLocaleDateString(
                                    'id-ID',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    },
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">
                                Kategori
                            </span>
                            <span className="font-medium">
                                {trx.kategori_transaksi?.nama}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">
                                Divisi
                            </span>
                            <span className="font-medium">
                                {trx.divisi?.nama}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">
                                Diinput Oleh
                            </span>
                            <span className="font-medium">
                                {trx.user?.name}
                            </span>
                        </div>
                        <div className="col-span-2 flex flex-col gap-1 rounded-lg border p-3">
                            <span className="text-xs text-muted-foreground uppercase">
                                Keterangan
                            </span>
                            <p className="leading-relaxed font-medium whitespace-pre-wrap">
                                {trx.deskripsi ||
                                    'Tidak ada keterangan tambahan.'}
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <div className="flex w-full gap-2 sm:justify-end">
                        <Button
                            variant="destructive"
                            onClick={() => onDelete(trx.id)}
                            className="flex-1 sm:flex-none"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onEdit(trx)}
                            className="flex-1 sm:flex-none"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 sm:flex-none"
                        >
                            Tutup
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
