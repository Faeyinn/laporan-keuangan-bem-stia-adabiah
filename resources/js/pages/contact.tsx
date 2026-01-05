import { ContactCards } from '@/components/contact/contact-cards';
import { ContactHero } from '@/components/contact/contact-hero';
import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Hubungi Kami" />
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Header Section */}
                <ContactHero />

                <ContactCards />
            </main>

            <Footer />
        </div>
    );
}
