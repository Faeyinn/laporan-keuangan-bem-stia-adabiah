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
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Divisi, Kategori, Transaksi } from './types';

const defaultForm = {
    tipe: 'pengeluaran',
    divisi_id: '',
    divisi_custom_name: '',
    kategori_transaksi_id: '',
    nominal: '',
    deskripsi: '',
    tanggal: new Date().toISOString().split('T')[0],
};

interface CreateTransaksiDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    options: { divisi: Divisi[]; kategori: Kategori[] };
    onSuccess: () => void;
    trx?: Transaksi | null;
}

export function CreateTransaksiDialog({
    open,
    onOpenChange,
    options,
    onSuccess,
    trx,
}: CreateTransaksiDialogProps) {
    const [form, setForm] = useState(() => {
        if (trx) {
            return {
                tipe: trx.tipe,
                divisi_id: trx.divisi_id.toString(),
                divisi_custom_name: '',
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
                                    <SelectItem value="other">
                                        Lainnya...
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.divisi_id && (
                                <p className="text-xs text-red-500">
                                    {errors.divisi_id[0]}
                                </p>
                            )}
                            {form.divisi_id === 'other' && (
                                <div className="mt-2">
                                    <Input
                                        placeholder="Nama Divisi Baru"
                                        value={form.divisi_custom_name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                divisi_custom_name:
                                                    e.target.value,
                                            })
                                        }
                                        className={
                                            errors.divisi_custom_name
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        required
                                    />
                                    {errors.divisi_custom_name && (
                                        <p className="text-xs text-red-500">
                                            {errors.divisi_custom_name[0]}
                                        </p>
                                    )}
                                </div>
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

                    <DialogFooter className="gap-2">
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
