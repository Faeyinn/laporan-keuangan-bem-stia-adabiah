import { Link } from '@inertiajs/react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-800 bg-slate-900 py-12 text-slate-400">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo-bemstiaadabiah.png"
                            alt="Logo"
                            className="h-10 w-10 opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-white">
                                BEM STIA Adabiah
                            </span>
                            <span className="text-xs text-slate-500">
                                Sistem Keuangan Terpadu
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-8 text-sm font-medium">
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-white"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="transition-colors hover:text-white"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/contact"
                            className="transition-colors hover:text-white"
                        >
                            Contact
                        </Link>
                    </div>
                    <p className="text-xs text-slate-500">
                        &copy; {currentYear} BEM KM STIA Adabiah. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
