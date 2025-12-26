import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
            <Head title="Hubungi Kami" />
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Header Section */}
                <section className="relative overflow-hidden py-16 text-center lg:py-24">
                    <div className="relative container mx-auto px-4">
                        <Badge
                            variant="outline"
                            className="mb-6 border-purple-200 bg-purple-50 px-4 py-1 text-sm text-purple-700 shadow-sm"
                            data-aos="fade-up"
                        >
                            Contact Us
                        </Badge>
                        <h1
                            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            Hubungi Tim{' '}
                            <span className="text-purple-600">BEM</span>
                        </h1>
                        <p
                            className="mx-auto max-w-2xl text-lg text-slate-600"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Kami siap mendengarkan aspirasi, pertanyaan, dan
                            masukan Anda. Pilih saluran komunikasi yang paling
                            nyaman bagi Anda.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1: Address */}
                        <Card
                            className="group relative overflow-hidden border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-green-50 transition-all group-hover:scale-150"></div>
                            <CardContent className="relative flex flex-col items-center p-8 text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 shadow-sm ring-4 ring-white transition-transform group-hover:scale-110">
                                    <MapPin className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-slate-900">
                                    Sekretariat
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Kampus STIA Adabiah
                                    <br />
                                    Jl. Perintis Kemerdekaan, Padang
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 2: Email */}
                        <Card
                            className="group relative overflow-hidden border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-50 transition-all group-hover:scale-150"></div>
                            <CardContent className="relative flex flex-col items-center p-8 text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm ring-4 ring-white transition-transform group-hover:scale-110">
                                    <Mail className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-slate-900">
                                    Email Resmi
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Kirim pertanyaan umum ke:
                                    <br />
                                    <a
                                        href="mailto:bem@stiaadabiah.ac.id"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        bem@stiaadabiah.ac.id
                                    </a>
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 3: WhatsApp */}
                        <Card
                            className="group relative overflow-hidden border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-orange-50 transition-all group-hover:scale-150"></div>
                            <CardContent className="relative flex flex-col items-center p-8 text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm ring-4 ring-white transition-transform group-hover:scale-110">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-slate-900">
                                    WhatsApp Center
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600">
                                    Respon cepat pada jam kerja:
                                    <br />
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-medium text-orange-600 hover:underline"
                                    >
                                        +62 812-3456-7890
                                    </a>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
