import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { TermsContent } from '@/components/terms/terms-content';
import { TermsHero } from '@/components/terms/terms-hero';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Syarat & Ketentuan" />
            <Navbar />

            <main className="pt-24 pb-16">
                <TermsHero />
                <TermsContent />
            </main>

            <Footer />
        </div>
    );
}
