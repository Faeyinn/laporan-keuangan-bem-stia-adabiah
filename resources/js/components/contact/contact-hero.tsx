import { Badge } from '@/components/ui/badge';

export function ContactHero() {
    return (
        <section className="relative overflow-hidden py-16 text-center lg:py-24">
            <div className="relative container mx-auto px-4">
                <Badge
                    variant="outline"
                    className="mb-6 border-purple-200 bg-purple-50 px-4 py-1 text-sm text-purple-700 shadow-sm"
                    data-aos="fade-up"
                >
                    Contact Us
                </Badge>
                <h1
                    className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Hubungi Tim <span className="text-purple-600">BEM</span>
                </h1>
                <p
                    className="mx-auto max-w-2xl text-lg text-slate-600"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Kami siap mendengarkan aspirasi, pertanyaan, dan masukan
                    Anda. Pilih saluran komunikasi yang paling nyaman bagi Anda.
                </p>
            </div>
        </section>
    );
}
