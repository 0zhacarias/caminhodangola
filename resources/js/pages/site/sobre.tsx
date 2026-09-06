import { Head } from '@inertiajs/react';
import { AboutUs } from '@/components/site/about-us';
import { Footer } from '@/components/site/footer';
import SiteHero from '@/components/site/site-hero';
import TeamSection from '@/components/site/team';
import { WhyChooseUs } from '@/components/site/whyUs';
import { useWhatsapp } from '@/lib/whatsapp';
import type { MembroEquipa, SlideHero } from '@/types/site';

interface SobreProps {
    slides: SlideHero[];
    membros: MembroEquipa[];
}

export default function Sobre({ slides, membros }: SobreProps) {
    const whatsapp = useWhatsapp();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Sobre Nós" />

            <SiteHero
                slides={slides}
                cta={{
                    label: 'Contact Us',
                    href: whatsapp.link(
                        "Hello! I would like to learn more about Caminhos D'Angola.",
                    ),
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
