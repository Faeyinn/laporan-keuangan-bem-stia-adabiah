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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
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
import {
    Edit,
    Plus,
    Search,
    Shield,
    Trash2,
    UserCog,
    User as UserIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User', href: { url: '/users' } as any },
];

interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export default function UsersIndex() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Delete Dialog State
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        user: User | null;
    }>({
        open: false,
        user: null,
    });

    const fetchUsers = () => {
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
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
                <Card className="shadow-sm">
                    <CardHeader className="p-0" />
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex h-[400px] flex-col items-center justify-center gap-2 text-muted-foreground">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                <p className="text-sm">Memuat data user...</p>
                            </div>
                        ) : (
                            <>
                                {/* Table View (Desktop) */}
                                <div className="relative hidden w-full overflow-auto md:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead className="w-1/3 pl-6">
                                                    Nama
                                                </TableHead>
                                                <TableHead className="w-1/3 pl-6">
                                                    Email
                                                </TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead className="pr-6 text-right">
                                                    Aksi
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredUsers.length === 0 ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        className="h-32 text-center text-muted-foreground"
                                                    >
                                                        Tidak ada data user.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredUsers.map((user) => (
                                                    <TableRow
                                                        key={user.id}
                                                        className="group hover:bg-muted/50"
                                                    >
                                                        <TableCell className="pl-6 font-medium">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                                    <UserIcon className="h-4 w-4" />
                                                                </div>
                                                                <span>
                                                                    {user.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {user.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    user.role ===
                                                                    'admin'
                                                                        ? 'default'
                                                                        : 'secondary'
                                                                }
                                                                className="capitalize"
                                                            >
                                                                {user.role ===
                                                                'admin' ? (
                                                                    <Shield className="mr-1 h-3 w-3" />
                                                                ) : (
                                                                    <UserCog className="mr-1 h-3 w-3" />
                                                                )}
                                                                {user.role ||
                                                                    'user'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="pr-6 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                                    onClick={() => {
                                                                        setEditingUser(
                                                                            user,
                                                                        );
                                                                        setIsCreateOpen(
                                                                            true,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Edit
                                                                    </span>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                                                                    onClick={() =>
                                                                        setDeleteDialog(
                                                                            {
                                                                                open: true,
                                                                                user,
                                                                            },
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Hapus
                                                                    </span>
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* List View (Mobile) */}
                                <div className="flex flex-col gap-4 bg-muted/10 p-4 md:hidden">
                                    {filteredUsers.length === 0 ? (
                                        <div className="py-12 text-center text-sm text-muted-foreground">
                                            Tidak ada data.
                                        </div>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <Card key={user.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                                <UserIcon className="h-5 w-5" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold">
                                                                    {user.name}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    {user.email}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                user.role ===
                                                                'admin'
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                            className="text-xs capitalize"
                                                        >
                                                            {user.role ||
                                                                'user'}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-4 flex justify-end gap-2 border-t pt-4">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setEditingUser(
                                                                    user,
                                                                );
                                                                setIsCreateOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <Edit className="mr-2 h-3.5 w-3.5" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                setDeleteDialog(
                                                                    {
                                                                        open: true,
                                                                        user,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
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

const defaultForm = {
    name: '',
    email: '',
    password: '',
    role: 'user',
};

function UserDialog({
    open,
    onOpenChange,
    user,
    onSuccess,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User | null;
    onSuccess: () => void;
}) {
    const [form, setForm] = useState(() => {
        if (user) {
            return {
                name: user.name,
                email: user.email,
                password: '',
                role: user.role || 'user',
            };
        }
        return defaultForm;
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        const promise = user
            ? api.put(`/users/${user.id}`, form)
            : api.post('/users', form);

        promise
            .then(() => {
                toast.success(
                    user
                        ? 'User berhasil diperbarui.'
                        : 'User berhasil dibuat.',
                );
                onSuccess();
            })
            .catch((err) => {
                if (err.response && err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    toast.error('Terjadi kesalahan.');
                }
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {user ? 'Edit User' : 'Tambah User Baru'}
                    </DialogTitle>
                    <DialogDescription>
                        {user
                            ? 'Perbarui informasi pengguna.'
                            : 'Isi formulir untuk menambahkan pengguna baru.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Password {user && '(Opsional)'}
                        </Label>
                        <PasswordInput
                            id="password"
                            placeholder={
                                user ? 'Biarkan kosong jika tidak diubah' : ''
                            }
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={form.role}
                            onValueChange={(val) =>
                                setForm({ ...form, role: val })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
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
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            {submitting ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
