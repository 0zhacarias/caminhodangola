import { Head } from '@inertiajs/react';
import { Footer } from '@/components/site/footer';
import { PrivateTourSection } from '@/components/site/private-tour';
import SiteHero from '@/components/site/site-hero';
import { Testimonials } from '@/components/site/testimonials';
import { WhyChooseUs } from '@/components/site/whyUs';
import type { Depoimento, SlideHero } from '@/types/site';

interface PrivateToursProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
}

export default function PrivateTours({
    slides,
    depoimentos,
}: PrivateToursProps) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Private Tours" />

            <SiteHero
                slides={slides}
                centralizado
                cta={{
                    label: 'Customize Your Trip',
                    href: `https://wa.me/+244923469271?text=${encodeURIComponent(
                        "Hello! I'm interested in booking a private tour with Caminhos D'Angola. Can you help me customize my journey?",
                    )}`,
                }}
            />

            <PrivateTourSection />
            <WhyChooseUs />

            <Testimonials depoimentos={depoimentos} />

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
