import { Head, usePage } from '@inertiajs/react';
import { Footer } from '@/components/site/footer';
import { PrivateTourSection } from '@/components/site/private-tour';
import SiteHero from '@/components/site/site-hero';
import { Testimonials } from '@/components/site/testimonials';
import { WhyChooseUs } from '@/components/site/whyUs';
import { useWhatsapp } from '@/lib/whatsapp';
import type { Depoimento, SlideHero, TourPrivado } from '@/types/site';

interface PrivateToursProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
}

const MENSAGEM_PADRAO =
    "Hello! I'm interested in booking a private tour with Caminhos D'Angola. Can you help me customize my journey?";

export default function PrivateTours({
    slides,
    depoimentos,
}: PrivateToursProps) {
    const itens =
        usePage<{ tours_privados?: TourPrivado[] }>().props.tours_privados ??
        [];
    const whatsapp = useWhatsapp();

    const ctaWhatsapp = itens.find((item) => item.tipo === 'cta_whatsapp');
    const ctaLabel = ctaWhatsapp?.titulo ?? 'Customize Your Trip';
    const ctaHref = whatsapp.link(
        ctaWhatsapp?.descricao ?? MENSAGEM_PADRAO,
        ctaWhatsapp?.link || undefined,
    );

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Private Tours" />

            <SiteHero
                slides={slides}
                centralizado
                cta={{
                    label: ctaLabel,
                    href: ctaHref,
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
