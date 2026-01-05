import { Card, CardContent } from '@/components/ui/card';
import {
    Activity,
    Clock,
    FileSpreadsheet,
    LayoutDashboard,
    Users,
} from 'lucide-react';

export function AboutFeatures() {
    return (
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
                                    Unduh laporan keuangan ke format PDF dan
                                    Excel dengan mudah.
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
                                    Kontrol akses bertingkat untuk admin dan
                                    pengurus departemen.
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
                                    Jejak audit lengkap untuk setiap transaksi
                                    yang terjadi.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
