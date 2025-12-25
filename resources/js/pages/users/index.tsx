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
import { PasswordInput } from '@/components/ui/password-input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import api from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
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

    const handleDelete = (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;
        api.delete(`/users/${id}`)
            .then(() => {
                toast.success('User berhasil dihapus.');
                fetchUsers();
            })
            .catch((err) => {
                console.error(err);
                toast.error('Gagal menghapus user.');
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen User" />

            <div className="animate-fade-in-up flex flex-col gap-6 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen User
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola pengguna sistem.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-green-600 text-white hover:bg-green-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Tambah User
                    </Button>
                </div>

                <div className="rounded-lg bg-card p-6 shadow">
                    {loading ? (
                        <div className="py-8 text-center text-gray-400">
                            Loading...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Nama
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Role
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-8 text-center text-gray-400"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-2">
                                                    {user.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <Badge variant="outline">
                                                        {user.role || 'user'}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="icon"
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
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
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
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                            {submitting ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
