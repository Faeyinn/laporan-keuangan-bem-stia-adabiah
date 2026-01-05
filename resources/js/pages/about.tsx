import { AboutFeatures } from '@/components/about/about-features';
import { AboutHero } from '@/components/about/about-hero';
import { CtaSection } from '@/components/about/cta-section';
import { TechSpecs } from '@/components/about/tech-specs';
import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Tentang Sistem" />

            <Navbar />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <AboutHero />

                {/* Main Content Grid */}
                <AboutFeatures />

                <Separator className="my-16" />

                {/* Tech & Security */}
                <TechSpecs />

                {/* CTA */}
                <CtaSection />
            </main>

            <Footer />
        </div>
    );
}
