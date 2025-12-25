import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    Edit,
    MoreHorizontal,
    Plus,
    RotateCcw,
    Search,
    Trash2,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Divisi {
    id: number;
    nama: string;
}

interface Kategori {
    id: number;
    nama: string;
    tipe: 'pemasukan' | 'pengeluaran';
}

interface Transaksi {
    id: number;
    tanggal: string;
    deskripsi: string;
    divisi?: Divisi;
    kategori_transaksi?: Kategori;
    tipe: 'pemasukan' | 'pengeluaran';
    nominal: number;
    user?: { name: string };
    divisi_id: number;
    kategori_transaksi_id: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Pagination {
    current_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transaksi', href: '/transaksi' },
];

export default function TransaksiIndex() {
    const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTrx, setEditingTrx] = useState<Transaksi | null>(null);
    const [selectedTrx, setSelectedTrx] = useState<Transaksi | null>(null);
    const [options, setOptions] = useState<{
        divisi: Divisi[];
        kategori: Kategori[];
    }>({
        divisi: [],
        kategori: [],
    });
    const [filters, setFilters] = useState({
        tipe: '',
        divisi_id: '',
        start_date: '',
        end_date: '',
        search: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        trx: Transaksi | null;
    }>({
        open: false,
        trx: null,
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters((prev) => ({ ...prev, search: searchTerm }));
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const resetFilters = () => {
        setSearchTerm('');
        setFilters({
            tipe: '',
            divisi_id: '',
            start_date: '',
            end_date: '',
            search: '',
        });
    };

    const fetchTransaksi = useCallback(
        (url: string | null = '/transaksi') => {
            if (!url) return;
            setLoading(true);
            api.get(url, { params: filters })
                .then((res) => {
                    setTransaksi(res.data.data);
                    setPagination(res.data);
                })
                .catch((err) => {
                    console.error('Failed to fetch transactions:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [filters],
    );

    useEffect(() => {
        fetchTransaksi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchTransaksi]);

    useEffect(() => {
        api.get('transaksi/options')
            .then((res) => {
                console.log('Options loaded:', res.data);
                setOptions(res.data);
            })
            .catch((err) => {
                console.error('Failed to load options:', err);
            });
    }, []);

    const openDeleteDialog = (trx: Transaksi) => {
        setDeleteDialog({ open: true, trx });
    };

    const confirmDelete = () => {
        if (!deleteDialog.trx) return;

        const trxId = deleteDialog.trx.id;
        // Close detail dialog if open
        setSelectedTrx(null);

        api.delete(`/transaksi/${trxId}`)
            .then(() => {
                toast.success('Transaksi berhasil dihapus.');
                fetchTransaksi();
            })
            .catch((err) => {
                console.error(err);
                toast.error('Gagal menghapus transaksi.');
            })
            .finally(() => {
                setDeleteDialog({ open: false, trx: null });
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaksi" />

            <div className="flex flex-col gap-8 p-4 sm:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Transaksi
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola pencatatan arus kas masuk dan keluar.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Tambah Transaksi
                    </Button>
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari deskripsi..."
                            className="bg-background pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Select
                            value={filters.tipe === '' ? 'all' : filters.tipe}
                            onValueChange={(value) =>
                                setFilters({
                                    ...filters,
                                    tipe: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="Tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Tipe</SelectItem>
                                <SelectItem value="pemasukan">
                                    Pemasukan
                                </SelectItem>
                                <SelectItem value="pengeluaran">
                                    Pengeluaran
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={
                                filters.divisi_id === ''
                                    ? 'all'
                                    : filters.divisi_id
                            }
                            onValueChange={(value) =>
                                setFilters({
                                    ...filters,
                                    divisi_id: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Divisi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Divisi
                                </SelectItem>
                                {options.divisi.map((d) => (
                                    <SelectItem
                                        key={d.id}
                                        value={d.id.toString()}
                                    >
                                        {d.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <input
                                type="date"
                                className="bg-transparent p-0 outline-none placeholder:text-muted-foreground"
                                value={filters.start_date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        start_date: e.target.value,
                                    })
                                }
                            />
                            <span className="text-muted-foreground">-</span>
                            <input
                                type="date"
                                className="bg-transparent p-0 outline-none placeholder:text-muted-foreground"
                                value={filters.end_date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        end_date: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={resetFilters}
                            title="Reset"
                            className="shrink-0"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="shadow-sm">
                    <CardHeader className="p-0" />
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex h-[400px] flex-col items-center justify-center gap-2 text-muted-foreground">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                <p className="text-sm">
                                    Memuat data transaksi...
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Table View */}
                                <div className="relative hidden w-full overflow-auto md:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead className="w-[150px] pl-6">
                                                    Tanggal
                                                </TableHead>
                                                <TableHead className="min-w-[250px]">
                                                    Keterangan
                                                </TableHead>
                                                <TableHead>Divisi</TableHead>
                                                <TableHead>Kategori</TableHead>
                                                <TableHead className="text-right">
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
                                                        Tidak ada data transaksi
                                                        yang ditemukan.
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
                                                                {
                                                                    trx.divisi
                                                                        ?.nama
                                                                }
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
                                                                        Lihat
                                                                        Detail
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
                                                onClick={() =>
                                                    setSelectedTrx(trx)
                                                }
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
                                                                trx.tipe ===
                                                                'pemasukan'
                                                                    ? 'default'
                                                                    : 'destructive'
                                                            }
                                                            className={
                                                                trx.tipe ===
                                                                'pemasukan'
                                                                    ? 'bg-emerald-600'
                                                                    : 'bg-rose-600'
                                                            }
                                                        >
                                                            {trx.tipe ===
                                                            'pemasukan'
                                                                ? 'Masuk'
                                                                : 'Keluar'}
                                                        </Badge>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-muted-foreground">
                                                                {
                                                                    trx.divisi
                                                                        ?.nama
                                                                }{' '}
                                                                (
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
                                                                trx.tipe ===
                                                                'pemasukan'
                                                                    ? 'text-emerald-600'
                                                                    : 'text-rose-600'
                                                            }`}
                                                        >
                                                            Rp{' '}
                                                            {Number(
                                                                trx.nominal,
                                                            ).toLocaleString(
                                                                'id-ID',
                                                            )}
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
                                Menampilkan {pagination.from} - {pagination.to}{' '}
                                dari {pagination.total} data
                            </div>
                            <div className="no-scrollbar flex w-full gap-2 overflow-auto sm:w-auto">
                                {pagination.links?.map((link, i) => (
                                    <Button
                                        key={i}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
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
            </div>

            <CreateTransaksiDialog
                key={editingTrx ? `edit-${editingTrx.id}` : 'create'}
                trx={editingTrx}
                open={isCreateOpen}
                onOpenChange={(v) => {
                    setIsCreateOpen(v);
                    if (!v) setEditingTrx(null);
                }}
                options={options}
                onSuccess={() => {
                    setIsCreateOpen(false);
                    setEditingTrx(null);
                    fetchTransaksi();
                }}
            />

            <DetailTransaksiDialog
                trx={selectedTrx}
                open={!!selectedTrx}
                onOpenChange={(v: boolean) => !v && setSelectedTrx(null)}
                onEdit={(trx) => {
                    setSelectedTrx(null);
                    setEditingTrx(trx);
                    setIsCreateOpen(true);
                }}
                onDelete={(id) => {
                    // Find the trx to delete - since we are in detail view, it is 'selectedTrx'
                    if (selectedTrx) {
                        openDeleteDialog(selectedTrx);
                    }
                }}
            />

            <Dialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog((prev) => ({ ...prev, open }))
                }
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus transaksi ini?
                            Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-end space-x-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, trx: null })
                            }
                        >
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Ya, Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

const defaultForm = {
    tipe: 'pengeluaran',
    divisi_id: '',
    kategori_transaksi_id: '',
    nominal: '',
    deskripsi: '',
    tanggal: new Date().toISOString().split('T')[0],
};

function CreateTransaksiDialog({
    open,
    onOpenChange,
    options,
    onSuccess,
    trx,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    options: { divisi: Divisi[]; kategori: Kategori[] };
    onSuccess: () => void;
    trx?: Transaksi | null;
}) {
    const [form, setForm] = useState(() => {
        if (trx) {
            return {
                tipe: trx.tipe,
                divisi_id: trx.divisi_id.toString(),
                kategori_transaksi_id: trx.kategori_transaksi_id.toString(),
                nominal: trx.nominal.toString(),
                deskripsi: trx.deskripsi || '',
                tanggal: trx.tanggal,
            };
        }
        return defaultForm;
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        const promise = trx
            ? api.put(`/transaksi/${trx.id}`, form)
            : api.post('/transaksi', form);

        promise
            .then(() => {
                onSuccess();
                setForm(defaultForm);
                toast.success('Transaksi berhasil disimpan.');
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    toast.error('Gagal menyimpan transaksi.');
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {trx ? 'Edit Transaksi' : 'Tambah Transaksi'}
                    </DialogTitle>
                    <DialogDescription>
                        {trx
                            ? 'Perbarui detail transaksi yang sudah ada.'
                            : 'Catat transaksi pemasukan atau pengeluaran baru.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-3">
                        <Label>Tipe Transaksi</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <label
                                className={`cursor-pointer rounded-lg border-2 p-3 transition-all hover:bg-muted/50 ${
                                    form.tipe === 'pemasukan'
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                                        : 'border-muted'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="tipe"
                                        value="pemasukan"
                                        checked={form.tipe === 'pemasukan'}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                tipe: e.target.value,
                                            })
                                        }
                                        className="sr-only"
                                    />
                                    <div
                                        className={`h-4 w-4 rounded-full border ${form.tipe === 'pemasukan' ? 'border-[5px] border-emerald-500' : 'border-muted-foreground'}`}
                                    />
                                    <span
                                        className={`font-medium ${form.tipe === 'pemasukan' ? 'text-emerald-700 dark:text-emerald-400' : 'text-muted-foreground'}`}
                                    >
                                        Pemasukan
                                    </span>
                                </div>
                            </label>
                            <label
                                className={`cursor-pointer rounded-lg border-2 p-3 transition-all hover:bg-muted/50 ${
                                    form.tipe === 'pengeluaran'
                                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20'
                                        : 'border-muted'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="tipe"
                                        value="pengeluaran"
                                        checked={form.tipe === 'pengeluaran'}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                tipe: e.target.value,
                                            })
                                        }
                                        className="sr-only"
                                    />
                                    <div
                                        className={`h-4 w-4 rounded-full border ${form.tipe === 'pengeluaran' ? 'border-[5px] border-rose-500' : 'border-muted-foreground'}`}
                                    />
                                    <span
                                        className={`font-medium ${form.tipe === 'pengeluaran' ? 'text-rose-700 dark:text-rose-400' : 'text-muted-foreground'}`}
                                    >
                                        Pengeluaran
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tanggal">Tanggal</Label>
                        <Input
                            id="tanggal"
                            type="date"
                            required
                            value={form.tanggal}
                            onChange={(e) =>
                                setForm({ ...form, tanggal: e.target.value })
                            }
                            className={errors.tanggal ? 'border-red-500' : ''}
                        />
                        {errors.tanggal && (
                            <p className="text-xs text-red-500">
                                {errors.tanggal[0]}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="divisi">Divisi</Label>
                            <Select
                                value={form.divisi_id}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        divisi_id: value,
                                    })
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.divisi_id ? 'border-red-500' : ''
                                    }
                                >
                                    <SelectValue placeholder="Pilih Divisi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.divisi.map((d) => (
                                        <SelectItem
                                            key={d.id}
                                            value={d.id.toString()}
                                        >
                                            {d.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.divisi_id && (
                                <p className="text-xs text-red-500">
                                    {errors.divisi_id[0]}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="kategori">Kategori</Label>
                            <Select
                                value={form.kategori_transaksi_id}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        kategori_transaksi_id: value,
                                    })
                                }
                            >
                                <SelectTrigger
                                    className={
                                        errors.kategori_transaksi_id
                                            ? 'border-red-500'
                                            : ''
                                    }
                                >
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.kategori
                                        .filter((k) => k.tipe === form.tipe)
                                        .map((k) => (
                                            <SelectItem
                                                key={k.id}
                                                value={k.id.toString()}
                                            >
                                                {k.nama}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            {errors.kategori_transaksi_id && (
                                <p className="text-xs text-red-500">
                                    {errors.kategori_transaksi_id[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="nominal">Nominal (Rp)</Label>
                        <Input
                            id="nominal"
                            type="number"
                            placeholder="0"
                            required
                            min="0"
                            value={form.nominal}
                            onChange={(e) =>
                                setForm({ ...form, nominal: e.target.value })
                            }
                            className={errors.nominal ? 'border-red-500' : ''}
                        />
                        {errors.nominal && (
                            <p className="text-xs text-red-500">
                                {errors.nominal[0]}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="deskripsi">Keterangan</Label>
                        <Textarea
                            id="deskripsi"
                            placeholder="Contoh: Pembelian ATK untuk rapat bulanan"
                            className={`resize-none ${errors.deskripsi ? 'border-red-500' : ''}`}
                            rows={3}
                            value={form.deskripsi}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) =>
                                setForm({ ...form, deskripsi: e.target.value })
                            }
                        />
                        {errors.deskripsi && (
                            <p className="text-xs text-red-500">
                                {errors.deskripsi[0]}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {submitting ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan Transaksi'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function DetailTransaksiDialog({
    trx,
    open,
    onOpenChange,
    onEdit,
    onDelete,
}: {
    trx: Transaksi | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (trx: Transaksi) => void;
    onDelete: (id: number) => void;
}) {
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
