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
import { User } from '@/components/users/types';
import { UserDialog } from '@/components/users/user-dialog';
import { UserTable } from '@/components/users/user-table';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'User', href: '/users' }];

export default function UsersIndex() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        user: User | null;
    }>({
        open: false,
        user: null,
    });

    const fetchUsers = useCallback(() => {
        setLoading(true);
        api.get('/users')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error('Gagal memuat data user.');
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchUsers();
    }, [fetchUsers]);

    const confirmDelete = () => {
        if (!deleteDialog.user) return;

        api.delete(`/users/${deleteDialog.user.id}`)
            .then(() => {
                toast.success('User berhasil dihapus.');
                fetchUsers();
            })
            .catch((err) => {
                console.error(err);
                toast.error('Gagal menghapus user.');
            })
            .finally(() => {
                setDeleteDialog({ open: false, user: null });
            });
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen User" />

            <div className="flex flex-col gap-8 p-4 sm:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Manajemen User
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola akses dan peran pengguna sistem.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Tambah User
                    </Button>
                </div>

                {/* Filters & Actions */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari user..."
                            className="bg-background pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Main Content Card */}
                <UserTable
                    users={filteredUsers}
                    loading={loading}
                    setEditingUser={setEditingUser}
                    setIsCreateOpen={setIsCreateOpen}
                    setDeleteDialog={setDeleteDialog}
                />
            </div>

            <UserDialog
                key={editingUser ? `edit-${editingUser.id}` : 'create'}
                open={isCreateOpen}
                onOpenChange={(v) => {
                    setIsCreateOpen(v);
                    if (!v) setEditingUser(null);
                }}
                user={editingUser}
                onSuccess={() => {
                    setIsCreateOpen(false);
                    setEditingUser(null);
                    fetchUsers();
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
                            Apakah Anda yakin ingin menghapus user{' '}
                            <strong>{deleteDialog.user?.name}</strong>? Tindakan
                            ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-end space-x-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialog({ open: false, user: null })
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
