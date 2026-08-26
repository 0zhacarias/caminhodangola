import { Head } from '@inertiajs/react';
import { AboutUs } from '@/components/site/about-us';
import { Footer } from '@/components/site/footer';
import SiteHero from '@/components/site/site-hero';
import TeamSection from '@/components/site/team';
import { WhyChooseUs } from '@/components/site/whyUs';
import type { MembroEquipa, SlideHero } from '@/types/site';

interface SobreProps {
    slides: SlideHero[];
    membros: MembroEquipa[];
}

export default function Sobre({ slides, membros }: SobreProps) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Sobre Nós" />

            <SiteHero
                slides={slides}
                cta={{
                    label: 'Contact Us',
                    href: `https://wa.me/+244923469271?text=${encodeURIComponent(
                        "Hello! I would like to learn more about Caminhos D'Angola.",
                    )}`,
                }}
            />

            <AboutUs />

            <TeamSection membros={membros} />

            <WhyChooseUs />

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
