import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { BarChart3, FileText, Lock } from 'lucide-react';

export function FeaturesSection() {
    return (
        <section id="features" className="bg-slate-50 py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Fitur Unggulan
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Platform lengkap untuk kebutuhan administrasi keuangan
                        modern.
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
                                Pantau pemasukan dan pengeluaran secara langsung
                                dengan visualisasi data yang mudah dipahami.
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
                                Generate laporan bulanan dan tahunan secara
                                otomatis. Ekspor ke PDF/Excel dengan sekali
                                klik.
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
                                Keamanan data prioritas utama. Akses berbasis
                                role menjaga integritas informasi keuangan.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
