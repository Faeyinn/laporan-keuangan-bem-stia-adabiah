import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Download } from 'lucide-react';

interface LaporanFiltersProps {
    month: string;
    setMonth: (val: string) => void;
    year: string;
    setYear: (val: string) => void;
    months: { value: string; label: string }[];
    years: string[];
    onRefresh: () => void;
}

export function LaporanFilters({
    month,
    setMonth,
    year,
    setYear,
    months,
    years,
    onRefresh,
}: LaporanFiltersProps) {
    return (
        <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Periode:</span>
            </div>
            <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Bulan" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                            {m.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((y) => (
                        <SelectItem key={y} value={y}>
                            {y}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                size="icon"
                variant="ghost"
                onClick={onRefresh}
                className="ml-auto sm:ml-0"
                title="Refresh Data"
            >
                <Download className="h-4 w-4 rotate-180" />
            </Button>
        </div>
    );
}
