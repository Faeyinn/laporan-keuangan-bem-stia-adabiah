import { Badge } from '@/components/ui/badge';

export function TermsHero() {
    return (
        <section className="relative overflow-hidden bg-slate-900 py-20 text-center text-white">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="bg-grid-white/[0.05] absolute inset-0 bg-[size:60px_60px]"></div>
            <div className="relative container mx-auto px-4">
                <Badge
                    variant="secondary"
                    className="mb-6 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    data-aos="fade-up"
                >
                    Terms of Service
                </Badge>
                <h1
                    className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Syarat & Ketentuan
                </h1>
                <p
                    className="mx-auto max-w-2xl text-lg text-slate-400"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Harap baca syarat dan ketentuan ini dengan saksama sebelum
                    menggunakan Sistem Keuangan BEM STIA Adabiah.
                </p>
            </div>
        </section>
    );
}
