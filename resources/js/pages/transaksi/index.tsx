import { CreateTransaksiDialog } from '@/components/transaksi/create-transaksi-dialog';
import { DetailTransaksiDialog } from '@/components/transaksi/detail-transaksi-dialog';
import { TransaksiFilters } from '@/components/transaksi/transaksi-filters';
import { TransaksiTable } from '@/components/transaksi/transaksi-table';
import {
    Divisi,
    Kategori,
    Pagination,
    Transaksi,
} from '@/components/transaksi/types';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

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
        // eslint-disable-next-line
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

                {/* Filters */}
                <TransaksiFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    divisiOptions={options.divisi}
                    resetFilters={resetFilters}
                />

                {/* Main Content Card / Table */}
                <TransaksiTable
                    transaksi={transaksi}
                    loading={loading}
                    pagination={pagination}
                    fetchTransaksi={fetchTransaksi}
                    setSelectedTrx={setSelectedTrx}
                    setEditingTrx={setEditingTrx}
                    setIsCreateOpen={setIsCreateOpen}
                    openDeleteDialog={openDeleteDialog}
                />
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
                onDelete={() => {
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
