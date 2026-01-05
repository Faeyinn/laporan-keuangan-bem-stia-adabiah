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
import api from '@/lib/api';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { User } from './types';

const defaultForm = {
    name: '',
    email: '',
    password: '',
    role: 'user',
};

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User | null;
    onSuccess: () => void;
}

export function UserDialog({
    open,
    onOpenChange,
    user,
    onSuccess,
}: UserDialogProps) {
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
