import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import React from 'react';
import { Pagination, Transaksi } from './types';

interface TransaksiTableProps {
    transaksi: Transaksi[];
    loading: boolean;
    pagination: Pagination | null;
    fetchTransaksi: (url: string | null) => void;
    setSelectedTrx: (trx: Transaksi) => void;
    setEditingTrx: (trx: Transaksi) => void;
    setIsCreateOpen: (open: boolean) => void;
    openDeleteDialog: (trx: Transaksi) => void;
}

export function TransaksiTable({
    transaksi,
    loading,
    pagination,
    fetchTransaksi,
    setSelectedTrx,
    setEditingTrx,
    setIsCreateOpen,
    openDeleteDialog,
}: TransaksiTableProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="p-0" />
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex h-[400px] flex-col items-center justify-center gap-2 text-muted-foreground">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-sm">Memuat data transaksi...</p>
                    </div>
                ) : (
                    <>
                        {/* Table View */}
                        <div className="relative hidden w-full overflow-auto md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[18%] pl-6">
                                            Tanggal
                                        </TableHead>
                                        <TableHead className="w-[18%]">
                                            Keterangan
                                        </TableHead>
                                        <TableHead className="w-[18%]">
                                            Divisi
                                        </TableHead>
                                        <TableHead className="w-[18%]">
                                            Kategori
                                        </TableHead>
                                        <TableHead className="w-[18%] text-right">
                                            Nominal
                                        </TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transaksi.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="h-32 text-center text-muted-foreground"
                                            >
                                                Tidak ada data transaksi yang
                                                ditemukan.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        transaksi.map((trx) => (
                                            <TableRow
                                                key={trx.id}
                                                className="group cursor-pointer hover:bg-muted/50"
                                                onClick={() =>
                                                    setSelectedTrx(trx)
                                                }
                                            >
                                                <TableCell className="pl-6 font-medium text-muted-foreground">
                                                    {new Date(
                                                        trx.tanggal,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="max-w-[300px] truncate font-medium text-foreground"
                                                            title={
                                                                trx.deskripsi
                                                            }
                                                        >
                                                            {trx.deskripsi ||
                                                                'Tanpa Keterangan'}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm text-foreground">
                                                        {trx.divisi?.nama}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className="font-normal capitalize"
                                                    >
                                                        {
                                                            trx
                                                                .kategori_transaksi
                                                                ?.nama
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span
                                                        className={`font-mono font-bold ${
                                                            trx.tipe ===
                                                            'pemasukan'
                                                                ? 'text-emerald-600'
                                                                : 'text-rose-600'
                                                        }`}
                                                    >
                                                        {trx.tipe ===
                                                        'pemasukan'
                                                            ? '+'
                                                            : '-'}{' '}
                                                        Rp{' '}
                                                        {Number(
                                                            trx.nominal,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
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
                                                                    setSelectedTrx(
                                                                        trx,
                                                                    )
                                                                }
                                                            >
                                                                Lihat Detail
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={(
                                                                    e: React.MouseEvent,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setEditingTrx(
                                                                        trx,
                                                                    );
                                                                    setIsCreateOpen(
                                                                        true,
                                                                    );
                                                                }}
                                                            >
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={(
                                                                    e: React.MouseEvent,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    openDeleteDialog(
                                                                        trx,
                                                                    );
                                                                }}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Hapus
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile List View */}
                        <div className="flex flex-col gap-4 bg-muted/10 p-4 md:hidden">
                            {transaksi.length === 0 ? (
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    Tidak ada data.
                                </div>
                            ) : (
                                transaksi.map((trx) => (
                                    <Card
                                        key={trx.id}
                                        className="overflow-hidden transition-transform active:scale-[0.99]"
                                        onClick={() => setSelectedTrx(trx)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-medium text-muted-foreground uppercase">
                                                        {new Date(
                                                            trx.tanggal,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                dateStyle:
                                                                    'long',
                                                            },
                                                        )}
                                                    </span>
                                                    <span className="line-clamp-2 font-semibold">
                                                        {trx.deskripsi ||
                                                            'Tanpa Keterangan'}
                                                    </span>
                                                </div>
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
                                                        ? 'Masuk'
                                                        : 'Keluar'}
                                                </Badge>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-muted-foreground">
                                                        {trx.divisi?.nama} (
                                                        {
                                                            trx
                                                                .kategori_transaksi
                                                                ?.nama
                                                        }
                                                        )
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        Oleh:{' '}
                                                        {
                                                            trx.user?.name.split(
                                                                ' ',
                                                            )[0]
                                                        }
                                                    </span>
                                                </div>
                                                <span
                                                    className={`text-lg font-bold ${
                                                        trx.tipe === 'pemasukan'
                                                            ? 'text-emerald-600'
                                                            : 'text-rose-600'
                                                    }`}
                                                >
                                                    Rp{' '}
                                                    {Number(
                                                        trx.nominal,
                                                    ).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </>
                )}
            </CardContent>
            {pagination && (
                <div className="flex items-center justify-between border-t p-4">
                    <div className="hidden text-sm text-muted-foreground sm:block">
                        Menampilkan {pagination.from} - {pagination.to} dari{' '}
                        {pagination.total} data
                    </div>
                    <div className="no-scrollbar flex w-full gap-2 overflow-auto sm:w-auto">
                        {pagination.links?.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                onClick={() =>
                                    link.url && fetchTransaksi(link.url)
                                }
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`h-8 min-w-[32px] px-2 text-xs ${
                                    link.active
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                        : ''
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
