import { BarChart3, Globe, Lock, ShieldCheck, Zap } from 'lucide-react';

export function TechSpecs() {
    return (
        <section className="container mx-auto px-4">
            <div className="rounded-2xl bg-slate-900 px-6 py-16 text-center shadow-2xl sm:px-12">
                <div className="mx-auto max-w-2xl">
                    <ShieldCheck className="mx-auto mb-6 h-12 w-12 text-green-400" />
                    <h2 className="text-3xl font-bold text-white">
                        Keamanan & Teknologi
                    </h2>
                    <p className="mt-4 text-slate-400">
                        Dibangun di atas fondasi teknologi modern yang andal dan
                        aman. Kami menggunakan standar enkripsi industri untuk
                        melindungi data sensitif.
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
                        <h5 className="font-semibold">Fast Performance</h5>
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
    );
}
