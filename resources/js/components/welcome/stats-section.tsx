import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export function StatsSection() {
    return (
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
                            Kepercayaan anggota adalah aset terbesar organisasi.
                            Dengan sistem yang terbuka dan akuntabel, kita
                            membangun fondasi yang kuat untuk kemajuan bersama.
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
                    <div className="group relative" data-aos="fade-left">
                        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-green-200 to-blue-200 opacity-40 blur-2xl transition duration-1000 group-hover:opacity-60"></div>
                        <div className="relative transform overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl transition duration-500 hover:scale-[1.01]">
                            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                                <img
                                    src="/dashboard-preview.png"
                                    alt="Dashboard Preview"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
