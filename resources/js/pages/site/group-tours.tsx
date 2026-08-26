import { Head } from '@inertiajs/react';
import { Footer } from '@/components/site/footer';
import { GroupTourSection } from '@/components/site/group-tour';
import SiteHero from '@/components/site/site-hero';
import { Testimonials } from '@/components/site/testimonials';
import { WhyChooseUs } from '@/components/site/whyUs';
import type { Depoimento, SlideHero } from '@/types/site';

interface GroupToursProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
}

export default function GroupTours({ slides, depoimentos }: GroupToursProps) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Group Tours" />

            <SiteHero
                slides={slides}
                cta={{
                    label: 'Join a Group Tour',
                    href: `https://wa.me/+244923469271?text=${encodeURIComponent(
                        "Hi! I'm interested in joining a group tour with Caminhos D'Angola. Can you tell me more?",
                    )}`,
                }}
            />

            <GroupTourSection />
            <WhyChooseUs />

            <Testimonials depoimentos={depoimentos} />

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
