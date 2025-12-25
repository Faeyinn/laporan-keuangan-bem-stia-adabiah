import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Eye, Plus, RotateCcw, Search } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Helper for Textarea since component is missing in the provided UI library
const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaksi" />

            <div className="animate-fade-in-up flex flex-col gap-6 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Transaksi
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola semua pemasukan dan pengeluaran organisasi.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-green-600 text-white shadow-sm hover:bg-green-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Tambah Transaksi
                    </Button>
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari deskripsi atau nama penginput..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="grid w-full grid-cols-1 gap-2 md:flex md:w-auto md:flex-wrap md:gap-2">
                        <Select
                            value={filters.tipe === '' ? 'all' : filters.tipe}
                            onValueChange={(value) =>
                                setFilters({
                                    ...filters,
                                    tipe: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full md:w-[160px]">
                                <SelectValue placeholder="Semua Tipe" />
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
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Semua Divisi" />
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
                        <div className="flex items-center gap-2">
                            <span className="text-sm whitespace-nowrap text-muted-foreground">
                                Dari:
                            </span>
                            <Input
                                type="date"
                                className="w-full md:w-auto"
                                value={filters.start_date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        start_date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm whitespace-nowrap text-muted-foreground">
                                Sampai:
                            </span>
                            <Input
                                type="date"
                                className="w-full md:w-auto"
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
                            variant="outline"
                            size="icon"
                            onClick={resetFilters}
                            title="Reset Filter"
                            className="w-full md:w-10"
                        >
                            <span className="md:hidden">Reset Filter</span>
                            <RotateCcw className="hidden h-4 w-4 md:block" />
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                            <span className="ml-3 text-muted-foreground">
                                Memuat data...
                            </span>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="relative hidden w-full overflow-auto md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Keterangan</TableHead>
                                            <TableHead>Divisi</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Oleh</TableHead>
                                            <TableHead>Nominal</TableHead>
                                            <TableHead className="text-right">
                                                Aksi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transaksi.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    className="h-24 text-center text-muted-foreground"
                                                >
                                                    Belum ada data transaksi.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            transaksi.map((trx) => (
                                                <TableRow
                                                    key={trx.id}
                                                    className="cursor-pointer transition-colors hover:bg-muted/50"
                                                    onClick={() =>
                                                        setSelectedTrx(trx)
                                                    }
                                                >
                                                    <TableCell>
                                                        {trx.tanggal}
                                                    </TableCell>
                                                    <TableCell
                                                        className="max-w-[200px] truncate font-medium"
                                                        title={
                                                            trx.deskripsi || '-'
                                                        }
                                                    >
                                                        {trx.deskripsi || '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {trx.divisi?.nama}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            trx
                                                                .kategori_transaksi
                                                                ?.nama
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-muted-foreground">
                                                            {trx.user?.name ||
                                                                '-'}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={
                                                                trx.tipe ===
                                                                'pemasukan'
                                                                    ? 'font-semibold text-green-600'
                                                                    : 'font-semibold text-red-600'
                                                            }
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
                                                                {
                                                                    maximumFractionDigits: 0,
                                                                },
                                                            )}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedTrx(
                                                                    trx,
                                                                );
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                                {transaksi.length === 0 ? (
                                    <div className="py-8 text-center text-muted-foreground">
                                        Belum ada data transaksi.
                                    </div>
                                ) : (
                                    transaksi.map((trx) => (
                                        <div
                                            key={trx.id}
                                            className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm transition-all active:scale-[0.98]"
                                            onClick={() => setSelectedTrx(trx)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-muted-foreground">
                                                        {trx.tanggal}
                                                    </span>
                                                    <span className="font-semibold text-card-foreground">
                                                        {trx.deskripsi || '-'}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {trx.user?.name || '-'}
                                                    </span>
                                                </div>
                                                <Badge
                                                    variant={
                                                        trx.tipe === 'pemasukan'
                                                            ? 'default'
                                                            : 'destructive'
                                                    }
                                                    className={`shrink-0 uppercase ${trx.tipe === 'pemasukan' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                                >
                                                    {trx.tipe}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center justify-between border-t pt-3">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {trx.divisi?.nama}
                                                </Badge>
                                                <span
                                                    className={`font-semibold ${trx.tipe === 'pemasukan' ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    {trx.tipe === 'pemasukan'
                                                        ? '+'
                                                        : '-'}{' '}
                                                    Rp{' '}
                                                    {Number(
                                                        trx.nominal,
                                                    ).toLocaleString('id-ID', {
                                                        maximumFractionDigits: 0,
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {pagination && (
                <div className="mb-6 flex items-center justify-between px-2 md:mb-0">
                    <div className="text-sm text-gray-500">
                        Menampilkan {pagination.from} - {pagination.to} dari{' '}
                        {pagination.total} data
                    </div>
                    <div className="flex gap-2">
                        {pagination.links?.map((link, i) => (
                            <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    link.url && fetchTransaksi(link.url)
                                }
                                disabled={!link.url}
                                className={
                                    link.active
                                        ? 'bg-green-600 text-white hover:bg-green-700 hover:text-white'
                                        : ''
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}

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
                    if (
                        confirm(
                            'Apakah Anda yakin ingin menghapus transaksi ini?',
                        )
                    ) {
                        setLoading(true);
                        api.delete(`/transaksi/${id}`)
                            .then(() => {
                                setSelectedTrx(null);
                                fetchTransaksi();
                            })
                            .catch((err) => {
                                console.error(err);
                                alert('Gagal menghapus transaksi.');
                            })
                            .finally(() => setLoading(false));
                    }
                }}
            />
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
                    alert(
                        'Gagal menyimpan transaksi. Terjadi kesalahan sistem.',
                    );
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {trx ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
                    </DialogTitle>
                    <DialogDescription>
                        {trx
                            ? 'Perbarui detail transaksi.'
                            : 'Masukkan detail transaksi pemasukan atau pengeluaran.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Tipe Transaksi</Label>
                        <div className="flex gap-4">
                            <label
                                className={`flex flex-1 cursor-pointer items-center gap-2 rounded-md border p-3 text-sm leading-none font-medium transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-[:checked]:border-green-600 has-[:checked]:bg-green-50 ${errors.tipe ? 'border-red-500' : ''}`}
                            >
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
                                    className="accent-green-600"
                                />
                                <span
                                    className={
                                        form.tipe === 'pemasukan'
                                            ? 'text-green-700'
                                            : ''
                                    }
                                >
                                    Pemasukan
                                </span>
                            </label>
                            <label
                                className={`flex flex-1 cursor-pointer items-center gap-2 rounded-md border p-3 text-sm leading-none font-medium transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 ${errors.tipe ? 'border-red-500' : ''}`}
                            >
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
                                    className="accent-red-600"
                                />
                                <span
                                    className={
                                        form.tipe === 'pengeluaran'
                                            ? 'text-red-700'
                                            : ''
                                    }
                                >
                                    Pengeluaran
                                </span>
                            </label>
                        </div>
                        {errors.tipe && (
                            <p className="text-xs text-red-500">
                                {errors.tipe[0]}
                            </p>
                        )}
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
                            <Label htmlFor="divisi">
                                Divisi <span className="text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="kategori">
                                Kategori <span className="text-red-500">*</span>
                            </Label>
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
                        <Label htmlFor="deskripsi">
                            Keterangan / Deskripsi
                        </Label>
                        <Textarea
                            id="deskripsi"
                            placeholder="Contoh: Pembelian ATK untuk rapat bulanan"
                            value={form.deskripsi}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) =>
                                setForm({ ...form, deskripsi: e.target.value })
                            }
                            className={errors.deskripsi ? 'border-red-500' : ''}
                        />
                        {errors.deskripsi && (
                            <p className="text-xs text-red-500">
                                {errors.deskripsi[0]}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
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
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                            {submitting ? 'Menyimpan...' : 'Simpan Transaksi'}
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
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                            Nominal
                        </span>
                        <span
                            className={`text-2xl font-bold ${trx.tipe === 'pemasukan' ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {trx.tipe === 'pemasukan' ? '+' : '-'} Rp{' '}
                            {Number(trx.nominal).toLocaleString('id-ID', {
                                maximumFractionDigits: 0,
                            })}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="mb-1 text-muted-foreground">
                                Tanggal
                            </p>
                            <p className="font-medium">{trx.tanggal}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-muted-foreground">Tipe</p>
                            <Badge
                                variant={
                                    trx.tipe === 'pemasukan'
                                        ? 'default'
                                        : 'destructive'
                                }
                                className="text-[10px] uppercase"
                            >
                                {trx.tipe}
                            </Badge>
                        </div>
                        <div>
                            <p className="mb-1 text-muted-foreground">Divisi</p>
                            <p className="font-medium">{trx.divisi?.nama}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-muted-foreground">
                                Kategori
                            </p>
                            <p className="font-medium">
                                {trx.kategori_transaksi?.nama}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="mb-1 text-muted-foreground">
                                Keterangan
                            </p>
                            <p className="font-medium whitespace-pre-wrap">
                                {trx.deskripsi || '-'}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="mb-1 text-muted-foreground">
                                Diinput Oleh
                            </p>
                            <p className="font-medium">{trx.user?.name}</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex-row justify-end space-x-2">
                    <Button
                        variant="destructive"
                        onClick={() => onDelete(trx.id)}
                    >
                        Hapus
                    </Button>
                    <Button
                        onClick={() => onEdit(trx)}
                        className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Tutup
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
