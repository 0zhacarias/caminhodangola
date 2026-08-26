import { Head } from '@inertiajs/react';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { WhyChooseUs } from '@/components/site/whyUs';
import { Testimonials } from '@/components/site/testimonials';
import { GroupTourSection } from '@/components/site/group-tour';
import type { Depoimento } from '@/types/site';

interface GroupToursProps {
    depoimentos: Depoimento[];
}

export default function GroupTours({ depoimentos }: GroupToursProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Head title="Group Tours" />
            
            <div className="bg-slate-950 overflow-hidden relative z-0 flex flex-col">
                <div className="relative z-10 w-full">
                    <Header />

                    <div className="h-1 bg-slate-700 w-full"></div>
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className="overflow-hidden w-full items-center justify-center flex flex-col gap-4 p-8 py-16 md:py-24 bg-slate-950 text-center">
                            <div className="md:w-3/5 lg:w-2/5 flex flex-col gap-4 items-center">
                                <h5 className="text-yellow-500 text-lg font-semibold uppercase tracking-widest">
                                    Group Tours
                                </h5>
                                <h4 className="text-white text-4xl md:text-5xl font-bold">
                                    Share the journey, discover together
                                </h4>
                                <p className="text-slate-300 text-lg mt-4 max-w-2xl leading-relaxed">
                                    Join one of our expertly crafted group tours across Angola.
                                    Explore stunning landscapes, local traditions, and hidden
                                    gems in the company of like-minded adventurers — all guided
                                    by our trusted experts.
                                </p>
                                <p className="text-slate-400 text-sm max-w-xl">
                                    Whether you're traveling solo or with companions, our group
                                    tours offer a safe, fun, and culturally rich experience for
                                    all ages.
                                </p>
                                <a
                                    href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                                        "Hi! I'm interested in joining a group tour with Caminhos D'Angola. Can you tell me more?"
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-block text-slate-950 bg-yellow-500 hover:bg-yellow-400 px-8 py-3 rounded-full font-semibold shadow-lg transition"
                                >
                                    Join a Group Tour
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GroupTourSection />
            <WhyChooseUs />
            
            <Testimonials depoimentos={depoimentos} />
            
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
