import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    AlertCircle,
    ArrowLeft,
    Book,
    CheckCircle2,
    FileWarning,
    Gavel,
} from 'lucide-react';

export function TermsContent() {
    return (
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
                                'Akses Pengguna',
                                'Tanggung Jawab',
                                'Integritas Data',
                                'Ketersediaan',
                                'Sanksi',
                            ].map((item, idx) => (
                                <a
                                    href={`#section-${idx + 1}`}
                                    key={idx}
                                    className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-white hover:text-blue-600 hover:shadow-sm"
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
                                Selamat datang di Sistem Keuangan BEM STIA
                                Adabiah. Dengan mengakses sistem ini, Anda
                                setuju untuk mematuhi syarat dan ketentuan
                                berikut.
                            </p>

                            <div id="section-1" className="mb-10 scroll-mt-28">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        <Book className="h-5 w-5" />
                                    </div>
                                    <h2 className="m-0 text-2xl font-bold text-slate-900">
                                        1. Akses Pengguna
                                    </h2>
                                </div>
                                <p>
                                    Akses ke sistem ini terbatas hanya untuk
                                    pengurus BEM, anggota, dan pihak yang
                                    berkepentingan di lingkungan STIA Adabiah.
                                    Akun pengguna bersifat pribadi dan tidak
                                    boleh dipindahtangankan.
                                </p>
                            </div>

                            <Separator className="my-8" />

                            <div id="section-2" className="mb-10 scroll-mt-28">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <h2 className="m-0 text-2xl font-bold text-slate-900">
                                        2. Tanggung Jawab Pengguna
                                    </h2>
                                </div>
                                <p>Setiap pengguna bertanggung jawab untuk:</p>
                                <ul className="list-disc pl-6 marker:text-orange-500">
                                    <li>
                                        Menjaga kerahasiaan kredensial akun
                                        (username dan password).
                                    </li>
                                    <li>
                                        Memastikan kebenaran data transaksi yang
                                        diinput.
                                    </li>
                                    <li>
                                        Tidak menyalahgunakan sistem untuk
                                        kepentingan pribadi atau kegiatan
                                        ilegal.
                                    </li>
                                </ul>
                            </div>

                            <Separator className="my-8" />

                            <div id="section-3" className="mb-10 scroll-mt-28">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                        <FileWarning className="h-5 w-5" />
                                    </div>
                                    <h2 className="m-0 text-2xl font-bold text-slate-900">
                                        3. Integritas Data
                                    </h2>
                                </div>
                                <p>
                                    Manipulasi data keuangan adalah pelanggaran
                                    berat. Segala aktivitas pencatatan dan
                                    perubahan data akan tercatat dalam audit log
                                    dan dapat dipertanggungjawabkan secara
                                    organisasi maupun hukum.
                                </p>
                            </div>

                            <Separator className="my-8" />

                            <div id="section-4" className="mb-10 scroll-mt-28">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <h2 className="m-0 text-2xl font-bold text-slate-900">
                                        4. Ketersediaan Layanan
                                    </h2>
                                </div>
                                <p>
                                    Kami berupaya menjaga sistem agar selalu
                                    dapat diakses, namun tidak menjamin sistem
                                    bebas dari gangguan teknis atau pemeliharaan
                                    berkala.
                                </p>
                            </div>

                            <div id="section-5" className="mb-6 scroll-mt-28">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                        <Gavel className="h-5 w-5" />
                                    </div>
                                    <h2 className="m-0 text-2xl font-bold text-slate-900">
                                        5. Sanksi
                                    </h2>
                                </div>
                                <p>
                                    Pelanggaran terhadap syarat dan ketentuan
                                    ini dapat mengakibatkan penangguhan akun,
                                    pencabutan hak akses, hingga sanksi
                                    organisasi sesuai AD/ART BEM STIA Adabiah.
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
    );
}
