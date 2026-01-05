import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function CtaSection() {
    return (
        <section className="container mx-auto mt-20 px-4 text-center">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Siap untuk transparansi keuangan?
            </h2>
            <Link href="/">
                <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                >
                    Kembali ke Beranda
                </Button>
            </Link>
        </section>
    );
}
