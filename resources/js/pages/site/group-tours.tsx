import { Head, usePage } from '@inertiajs/react';
import { Footer } from '@/components/site/footer';
import { GroupTourSection } from '@/components/site/group-tour';
import SiteHero from '@/components/site/site-hero';
import { Testimonials } from '@/components/site/testimonials';
import { WhyChooseUs } from '@/components/site/whyUs';
import { useWhatsapp } from '@/lib/whatsapp';
import type { Depoimento, SlideHero, TourGrupo } from '@/types/site';

interface GroupToursProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
}

const MENSAGEM_PADRAO =
    "Hi! I'm interested in joining a group tour with Caminhos D'Angola. Can you tell me more?";

export default function GroupTours({ slides, depoimentos }: GroupToursProps) {
    const itens =
        usePage<{ tours_grupos?: TourGrupo[] }>().props.tours_grupos ?? [];
    const whatsapp = useWhatsapp();

    const ctaWhatsapp = itens.find((item) => item.tipo === 'cta_whatsapp');
    const ctaLabel = ctaWhatsapp?.titulo ?? 'Join a Group Tour';
    const ctaHref = whatsapp.link(
        ctaWhatsapp?.descricao ?? MENSAGEM_PADRAO,
        ctaWhatsapp?.link || undefined,
    );

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Group Tours" />

            <SiteHero
                slides={slides}
                cta={{
                    label: ctaLabel,
                    href: ctaHref,
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
