import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactCards() {
    return (
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
    );
}
