import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Lock, ShieldCheck, UserCheck } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Kebijakan Privasi" />
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Header Section */}
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
                            bagaimana kami melindungi privasi dan keamanan Anda
                            di BEM STIA Adabiah.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto -mt-10 max-w-4xl px-4 pb-12">
                    <Card
                        className="overflow-hidden border-slate-200 shadow-xl"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="grid md:grid-cols-[250px_1fr]">
                            {/* Sidebar / Table of Contents (Desktop) */}
                            <div className="hidden border-r border-slate-100 bg-slate-50/50 p-6 md:block">
                                <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-500 uppercase">
                                    Daftar Isi
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        'Pengumpulan Data',
                                        'Penggunaan Informasi',
                                        'Keamanan',
                                        'Pihak Ketiga',
                                        'Perubahan Kebijakan',
                                    ].map((item, idx) => (
                                        <a
                                            href={`#section-${idx + 1}`}
                                            key={idx}
                                            className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-white hover:text-green-600 hover:shadow-sm"
                                        >
                                            {idx + 1}. {item}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 md:p-12">
                                <div className="prose prose-slate max-w-none">
                                    <p className="lead text-xl text-slate-600">
                                        Di BEM STIA Adabiah, kami mengutamakan
                                        privasi dan keamanan data Anda.
                                        Kebijakan ini menjelaskan bagaimana kami
                                        mengelola informasi dalam Sistem
                                        Keuangan BEM.
                                    </p>

                                    <div
                                        id="section-1"
                                        className="mb-10 scroll-mt-28"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                                <UserCheck className="h-5 w-5" />
                                            </div>
                                            <h2 className="m-0 text-2xl font-bold text-slate-900">
                                                1. Informasi yang Kami Kumpulkan
                                            </h2>
                                        </div>
                                        <p>
                                            Kami mengumpulkan informasi yang
                                            diperlukan untuk pengelolaan
                                            administrasi dan keuangan
                                            organisasi, termasuk:
                                        </p>
                                        <ul className="list-disc pl-6 marker:text-green-500">
                                            <li>
                                                Data identitas (Nama, NIM,
                                                Jabatan).
                                            </li>
                                            <li>
                                                Informasi kontak (Email, Nomor
                                                Telepon).
                                            </li>
                                            <li>
                                                Riwayat transaksi dan aktivitas
                                                dalam sistem.
                                            </li>
                                        </ul>
                                    </div>

                                    <Separator className="my-8" />

                                    <div
                                        id="section-2"
                                        className="mb-10 scroll-mt-28"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                                <ShieldCheck className="h-5 w-5" />
                                            </div>
                                            <h2 className="m-0 text-2xl font-bold text-slate-900">
                                                2. Penggunaan Informasi
                                            </h2>
                                        </div>
                                        <p>
                                            Informasi yang dikumpulkan digunakan
                                            semata-mata untuk:
                                        </p>
                                        <ul className="list-disc pl-6 marker:text-blue-500">
                                            <li>
                                                Memverifikasi identitas pengurus
                                                dan anggota.
                                            </li>
                                            <li>
                                                Mencatat dan melacak arus kas
                                                organisasi.
                                            </li>
                                            <li>
                                                Menyusun laporan
                                                pertanggungjawaban keuangan.
                                            </li>
                                            <li>Keperluan audit internal.</li>
                                        </ul>
                                    </div>

                                    <Separator className="my-8" />

                                    <div
                                        id="section-3"
                                        className="mb-10 scroll-mt-28"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                                <Lock className="h-5 w-5" />
                                            </div>
                                            <h2 className="m-0 text-2xl font-bold text-slate-900">
                                                3. Keamanan Data
                                            </h2>
                                        </div>
                                        <p>
                                            Kami menerapkan langkah-langkah
                                            keamanan teknis untuk melindungi
                                            data Anda dari akses yang tidak sah,
                                            termasuk enkripsi data sensitif dan
                                            pembatasan akses berbasis peran
                                            (Role-Based Access Control).
                                        </p>
                                    </div>

                                    <Separator className="my-8" />

                                    <div
                                        id="section-4"
                                        className="mb-10 scroll-mt-28"
                                    >
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            4. Berbagi Informasi Pihak Ketiga
                                        </h2>
                                        <p>
                                            Kami tidak menjual, memperdagangkan,
                                            atau menyewakan informasi pribadi
                                            pengguna kepada pihak ketiga. Data
                                            hanya dapat diakses oleh pihak yang
                                            berwenang dalam struktur organisasi
                                            BEM STIA Adabiah atau pihak kampus
                                            jika diperlukan untuk audit.
                                        </p>
                                    </div>

                                    <div
                                        id="section-5"
                                        className="mb-6 scroll-mt-28"
                                    >
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            5. Perubahan Kebijakan
                                        </h2>
                                        <p>
                                            Kebijakan privasi ini dapat
                                            diperbarui sewaktu-waktu sesuai
                                            dengan kebutuhan organisasi.
                                            Pengguna akan diberitahu jika
                                            terdapat perubahan signifikan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div
                        className="mt-8 text-center"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <Button
                            variant="ghost"
                            className="text-slate-600 hover:text-slate-900"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
