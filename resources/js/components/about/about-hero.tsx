import { Badge } from '@/components/ui/badge';

export function AboutHero() {
    return (
        <section className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
                <Badge
                    variant="outline"
                    className="mb-6 border-green-200 bg-green-50 px-4 py-1 text-sm text-green-700 shadow-sm"
                >
                    About The System
                </Badge>
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Mengenal Lebih Dekat <br />
                    <span className="text-green-600">Sistem Keuangan BEM</span>
                </h1>
                <p className="mb-10 text-lg leading-relaxed text-slate-600">
                    Platform digital yang dirancang khusus untuk memodernisasi
                    pengelolaan keuangan Badan Eksekutif Mahasiswa STIA Adabiah.
                    Kami menggabungkan transparansi, akuntabilitas, dan
                    teknologi terkini.
                </p>
            </div>
        </section>
    );
}
