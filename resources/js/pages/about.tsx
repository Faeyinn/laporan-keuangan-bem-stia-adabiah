import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    BarChart3,
    Clock,
    FileSpreadsheet,
    Globe,
    LayoutDashboard,
    Lock,
    ShieldCheck,
    Users,
    Zap,
} from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Tentang Sistem" />

            <Navbar />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
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
                            <span className="text-green-600">
                                Sistem Keuangan BEM
                            </span>
                        </h1>
                        <p className="mb-10 text-lg leading-relaxed text-slate-600">
                            Platform digital yang dirancang khusus untuk
                            memodernisasi pengelolaan keuangan Badan Eksekutif
                            Mahasiswa STIA Adabiah. Kami menggabungkan
                            transparansi, akuntabilitas, dan teknologi terkini.
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="container mx-auto mt-12 px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        {/* Left Side: Image/Visual */}
                        <div className="relative rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                            <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
                                <img
                                    src="/dashboard-preview.png"
                                    alt="System Preview"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="absolute -right-6 -bottom-6 hidden lg:block">
                                <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">
                                                Status Sistem
                                            </p>
                                            <p className="font-bold text-slate-900">
                                                Online & Secure
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Features List */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">
                                    Solusi Lengkap Manajemen Keuangan
                                </h3>
                                <p className="mt-4 text-slate-600">
                                    Tidak ada lagi pencatatan manual yang rentan
                                    kesalahan. Sistem ini menyediakan alat bantu
                                    pengambilan keputusan berbasis data.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Card className="border-none bg-transparent shadow-none">
                                    <CardContent className="p-0">
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                            <LayoutDashboard className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900">
                                            Intuitive Dashboard
                                        </h4>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Overview singkat kesehatan finansial
                                            organisasi dalam satu layar.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-none bg-transparent shadow-none">
                                    <CardContent className="p-0">
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                            <FileSpreadsheet className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900">
                                            Export Laporan
                                        </h4>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Unduh laporan keuangan ke format PDF
                                            dan Excel dengan mudah.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-none bg-transparent shadow-none">
                                    <CardContent className="p-0">
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900">
                                            Manajemen User
                                        </h4>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Kontrol akses bertingkat untuk admin
                                            dan pengurus departemen.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-none bg-transparent shadow-none">
                                    <CardContent className="p-0">
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900">
                                            Real-time History
                                        </h4>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Jejak audit lengkap untuk setiap
                                            transaksi yang terjadi.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="my-16" />

                {/* Tech & Security */}
                <section className="container mx-auto px-4">
                    <div className="rounded-2xl bg-slate-900 px-6 py-16 text-center shadow-2xl sm:px-12">
                        <div className="mx-auto max-w-2xl">
                            <ShieldCheck className="mx-auto mb-6 h-12 w-12 text-green-400" />
                            <h2 className="text-3xl font-bold text-white">
                                Keamanan & Teknologi
                            </h2>
                            <p className="mt-4 text-slate-400">
                                Dibangun di atas fondasi teknologi modern yang
                                andal dan aman. Kami menggunakan standar
                                enkripsi industri untuk melindungi data
                                sensitif.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8 text-center text-white md:grid-cols-4">
                            <div className="flex flex-col items-center">
                                <div className="mb-4 rounded-full bg-slate-800 p-4">
                                    <Globe className="h-6 w-6 text-blue-400" />
                                </div>
                                <h5 className="font-semibold">Cloud Based</h5>
                                <p className="mt-1 text-xs text-slate-500">
                                    Akses dari mana saja
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4 rounded-full bg-slate-800 p-4">
                                    <Lock className="h-6 w-6 text-green-400" />
                                </div>
                                <h5 className="font-semibold">Encrypted</h5>
                                <p className="mt-1 text-xs text-slate-500">
                                    Data aman terlindungi
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4 rounded-full bg-slate-800 p-4">
                                    <Zap className="h-6 w-6 text-yellow-400" />
                                </div>
                                <h5 className="font-semibold">
                                    Fast Performance
                                </h5>
                                <p className="mt-1 text-xs text-slate-500">
                                    Optimasi kecepatan tinggi
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-4 rounded-full bg-slate-800 p-4">
                                    <BarChart3 className="h-6 w-6 text-purple-400" />
                                </div>
                                <h5 className="font-semibold">Visual Data</h5>
                                <p className="mt-1 text-xs text-slate-500">
                                    Grafik interaktif
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
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
            </main>

            <Footer />
        </div>
    );
}
