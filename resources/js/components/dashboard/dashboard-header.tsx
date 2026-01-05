import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export function DashboardHeader() {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Dashboard Keuangan
                </h1>
                <p className="text-muted-foreground">
                    Ringkasan dan analisis keuangan BEM Adabiah.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </Button>
            </div>
        </div>
    );
}
