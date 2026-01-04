import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Menu } from 'lucide-react';

export function Navbar({
    canRegister = true,
    hideAuthButtons = false,
}: {
    canRegister?: boolean;
    hideAuthButtons?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav
            className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md"
            data-aos="fade-down"
            data-aos-duration="800"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="/logo-bemstiaadabiah.png"
                        alt="Logo"
                        className="h-10 w-10 rounded-full shadow-sm"
                    />
                    <span className="text-xl font-bold tracking-tight text-slate-800">
                        BEM <span className="text-green-600">Adabiah</span>
                    </span>
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    {!hideAuthButtons && (
                        <>
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button className="bg-green-600 text-white shadow-md hover:bg-green-700">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button
                                            variant="ghost"
                                            className="hidden text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
                                        >
                                            Masuk
                                        </Button>
                                    </Link>
                                    {canRegister && (
                                        <Link href={register()}>
                                            <Button className="bg-green-600 text-white shadow-md hover:bg-green-700">
                                                Daftar Sekarang
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                {!hideAuthButtons && (
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-800"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle className="text-left font-bold text-slate-800">
                                        BEM{' '}
                                        <span className="text-green-600">
                                            Adabiah
                                        </span>
                                    </SheetTitle>
                                    <SheetDescription className="text-left text-slate-500">
                                        Sistem Manajemen Keuangan
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 flex flex-col gap-4 px-4">
                                    {auth.user ? (
                                        <Link href={dashboard()}>
                                            <Button className="w-full bg-green-600 text-white shadow-md hover:bg-green-700">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={login()}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-slate-600"
                                                >
                                                    Masuk
                                                </Button>
                                            </Link>
                                            {canRegister && (
                                                <Link href={register()}>
                                                    <Button className="w-full bg-green-600 text-white shadow-md hover:bg-green-700">
                                                        Daftar Sekarang
                                                    </Button>
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}
            </div>
        </nav>
    );
}
