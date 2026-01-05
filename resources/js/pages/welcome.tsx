import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { FeaturesSection } from '@/components/welcome/features-section';
import { HeroSection } from '@/components/welcome/hero-section';
import { StatsSection } from '@/components/welcome/stats-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Keuangan Transparan & Modern" />

            {/* Navbar */}
            <Navbar canRegister={canRegister} />

            <main>
                {/* Hero Section */}
                <HeroSection user={auth.user} />

                {/* Features Section */}
                <FeaturesSection />

                {/* Stats / Trust Section */}
                <StatsSection />
            </main>

            <Footer />
        </div>
    );
}
