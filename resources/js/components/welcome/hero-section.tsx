import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';
import { SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    user: SharedData['auth']['user'];
}

export function HeroSection({ user }: HeroSectionProps) {
    return (
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-32">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff8b] to-[#89fc90] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 text-center">
                <Badge
                    variant="outline"
                    className="mb-6 border-green-200 bg-green-50 px-4 py-1 text-sm text-green-700 shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Sistem Manajemen Keuangan Organisasi
                </Badge>

                <h1
                    className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Transparansi Keuangan <br />
                    <span className="text-green-600 drop-shadow-sm">
                        Tanpa Batas
                    </span>
                </h1>

                <p
                    className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 sm:text-xl"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    Kelola arus kas, pantau anggaran, dan buat laporan keuangan
                    BEM KM STIA Adabiah dengan presisi tinggi. Modern, cepat,
                    dan akuntabel.
                </p>

                <div
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    {user ? (
                        <Link href={dashboard()}>
                            <Button
                                size="lg"
                                className="h-12 bg-green-600 px-8 text-base text-white shadow-xl shadow-green-200 transition-all hover:bg-green-700 hover:shadow-2xl"
                            >
                                Buka Dashboard
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href={login()}>
                            <Button
                                size="lg"
                                className="h-12 bg-green-600 px-8 text-base text-white shadow-xl shadow-green-200 transition-all hover:bg-green-700 hover:shadow-2xl"
                            >
                                Mulai Sekarang
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    )}
                    <Link href="/about">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 border-slate-300 bg-white px-8 text-base text-slate-900 hover:bg-slate-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                        >
                            Pelajari Lebih Lanjut
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
