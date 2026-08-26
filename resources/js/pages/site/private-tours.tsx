import { Head } from '@inertiajs/react';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { WhyChooseUs } from '@/components/site/whyUs';
import { Testimonials } from '@/components/site/testimonials';
import { PrivateTourSection } from '@/components/site/private-tour';
import type { Depoimento } from '@/types/site';

interface PrivateToursProps {
    depoimentos: Depoimento[];
}

export default function PrivateTours({ depoimentos }: PrivateToursProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Head title="Private Tours" />
            
            <div className="bg-slate-950 overflow-hidden relative z-0 flex flex-col">
                <div className="relative z-10 w-full">
                    <Header />

                    <div className="h-1 bg-slate-700 w-full"></div>
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className="overflow-hidden w-full items-center justify-center flex flex-col gap-4 p-8 py-16 md:py-24 bg-slate-950 text-center">
                            <div className="md:w-3/5 lg:w-2/5 flex flex-col gap-4 items-center">
                                <h5 className="text-yellow-500 text-lg font-semibold uppercase tracking-widest">
                                    Private Tours
                                </h5>
                                <h4 className="text-white text-4xl md:text-5xl font-bold">
                                    Tailor-made experiences, just for you
                                </h4>
                                <p className="text-slate-300 text-lg mt-4 max-w-2xl leading-relaxed">
                                    Discover Angola your way with Caminhos D'Angola. Our
                                    private tours are fully personalized to fit your schedule,
                                    preferences, and travel goals. Whether you're looking for
                                    cultural immersion, natural wonders, or relaxed exploration,
                                    we design your journey around you.
                                </p>
                                <p className="text-slate-400 text-sm max-w-xl">
                                    Choose your own pace, explore with expert local guides, and
                                    enjoy a safe, flexible, and unforgettable travel experience.
                                </p>
                                <a
                                    href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                                        "Hello! I'm interested in booking a private tour with Caminhos D'Angola. Can you help me customize my journey?"
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-block text-slate-950 bg-yellow-500 hover:bg-yellow-400 px-8 py-3 rounded-full font-semibold shadow-lg transition"
                                >
                                    Customize Your Trip
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PrivateTourSection />
            <WhyChooseUs />
            
            <Testimonials depoimentos={depoimentos} />
            
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
