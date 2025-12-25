import { Navbar } from '@/components/shared/navbar';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-white px-4 py-12 pt-20">
            <Navbar hideAuthButtons />
            <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="p-8 md:p-10">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="mb-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-green-50">
                                    <img
                                        src="/logo-bemstiaadabiah.png"
                                        alt="BEM KM STIA ADABIAH"
                                        className="h-12 w-12 object-cover"
                                    />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-extrabold text-gray-900">
                                    {title}
                                </h1>
                                <p className="text-center text-sm text-gray-600">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
