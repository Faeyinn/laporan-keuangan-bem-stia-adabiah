import { Badge } from '@/components/ui/badge';

export function PrivacyHero() {
    return (
        <section className="relative overflow-hidden bg-slate-900 py-20 text-center text-white">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="bg-grid-white/[0.05] absolute inset-0 bg-[size:60px_60px]"></div>
            <div className="relative container mx-auto px-4">
                <Badge
                    variant="secondary"
                    className="mb-6 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    data-aos="fade-up"
                >
                    Privacy Policy
                </Badge>
                <h1
                    className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Kebijakan Privasi
                </h1>
                <p
                    className="mx-auto max-w-2xl text-lg text-slate-400"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Kami transparan dalam mengelola data Anda. Pelajari
                    bagaimana kami melindungi privasi dan keamanan Anda di BEM
                    STIA Adabiah.
                </p>
            </div>
        </section>
    );
}
