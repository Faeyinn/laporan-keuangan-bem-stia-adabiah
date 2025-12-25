import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    FileText,
    Lock,
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Keuangan Transparan & Modern" />

            {/* Navbar */}
            <Navbar canRegister={canRegister} />

            <main>
                {/* Hero Section */}
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
                            Kelola arus kas, pantau anggaran, dan buat laporan
                            keuangan BEM KM STIA Adabiah dengan presisi tinggi.
                            Modern, cepat, dan akuntabel.
                        </p>

                        <div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            {auth.user ? (
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
                            <a href="#features">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-12 border-slate-300 bg-white px-8 text-base text-slate-900 hover:bg-slate-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                                >
                                    Pelajari Lebih Lanjut
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-slate-50 py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center" data-aos="fade-up">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Fitur Unggulan
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Platform lengkap untuk kebutuhan administrasi
                                keuangan modern.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Feature 1 */}
                            <Card
                                className="border-slate-200 bg-white/50 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-md"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm">
                                        <BarChart3 className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl text-slate-900">
                                        Monitoring Real-time
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-slate-600">
                                        Pantau pemasukan dan pengeluaran secara
                                        langsung dengan visualisasi data yang
                                        mudah dipahami.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            {/* Feature 2 */}
                            <Card
                                className="border-slate-200 bg-white/50 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-md"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl text-slate-900">
                                        Laporan Otomatis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-slate-600">
                                        Generate laporan bulanan dan tahunan
                                        secara otomatis. Ekspor ke PDF/Excel
                                        dengan sekali klik.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            {/* Feature 3 */}
                            <Card
                                className="border-slate-200 bg-white/50 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-md"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
                                        <Lock className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl text-slate-900">
                                        Aman & Terpercaya
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-slate-600">
                                        Keamanan data prioritas utama. Akses
                                        berbasis role menjaga integritas
                                        informasi keuangan.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Stats / Trust Section */}
                <section className="border-t border-slate-100 bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                            <div data-aos="fade-right">
                                <Badge
                                    variant="secondary"
                                    className="mb-4 bg-green-100 text-green-700 hover:bg-green-200"
                                >
                                    Trusted Platform
                                </Badge>
                                <h2 className="mb-6 text-3xl leading-tight font-bold text-slate-900">
                                    Mengapa Transparansi Itu Penting?
                                </h2>
                                <p className="mb-6 text-lg text-slate-600">
                                    Kepercayaan anggota adalah aset terbesar
                                    organisasi. Dengan sistem yang terbuka dan
                                    akuntabel, kita membangun fondasi yang kuat
                                    untuk kemajuan bersama.
                                </p>
                                <ul className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm">
                                    {[
                                        'Pencatatan yang tersentralisasi dan rapi',
                                        'Bukti transaksi digital yang dapat diverifikasi',
                                        'Akses mudah bagi pengurus yang berwenang',
                                        'Audit trail yang jelas untuk setiap perubahan',
                                    ].map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-3"
                                        >
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                                            <span className="text-slate-700">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div
                                className="group relative"
                                data-aos="fade-left"
                            >
                                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-green-200 to-blue-200 opacity-40 blur-2xl transition duration-1000 group-hover:opacity-60"></div>
                                <div className="relative transform overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl transition duration-500 hover:scale-[1.01]">
                                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                                        {/* Stylized placeholder for dashboard UI */}
                                        <div className="absolute inset-0 bg-slate-100"></div>
                                        <img
                                            src="/logo-bemstiaadabiah.png"
                                            alt="BEM Logo"
                                            className="z-10 h-32 w-32 object-contain opacity-20"
                                        />
                                        <div className="absolute z-10 text-3xl font-bold text-slate-300">
                                            Dashboard Preview
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
