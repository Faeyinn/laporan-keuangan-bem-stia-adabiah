import { PrivacyContent } from '@/components/privacy/privacy-content';
import { PrivacyHero } from '@/components/privacy/privacy-hero';
import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Kebijakan Privasi" />
            <Navbar />

            <main className="pt-24 pb-16">
                <PrivacyHero />
                <PrivacyContent />
            </main>

            <Footer />
        </div>
    );
}
