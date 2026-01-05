import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, RotateCcw, Search } from 'lucide-react';
import { Divisi } from './types';

interface TransaksiFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filters: {
        tipe: string;
        divisi_id: string;
        start_date: string;
        end_date: string;
    };
    setFilters: (filters: {
        tipe: string;
        divisi_id: string;
        start_date: string;
        end_date: string;
    }) => void;
    divisiOptions: Divisi[];
    resetFilters: () => void;
}

export function TransaksiFilters({
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    divisiOptions,
    resetFilters,
}: TransaksiFiltersProps) {
    return (
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
                        <SelectItem value="pemasukan">Pemasukan</SelectItem>
                        <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.divisi_id === '' ? 'all' : filters.divisi_id}
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
                        <SelectItem value="all">Semua Divisi</SelectItem>
                        {divisiOptions.map((d) => (
                            <SelectItem key={d.id} value={d.id.toString()}>
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
    );
}
