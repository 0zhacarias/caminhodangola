import { Head } from '@inertiajs/react';
import { Footer } from '@/components/site/footer';
import { Gallery } from '@/components/site/gallery';
import SiteHero from '@/components/site/site-hero';
import type { Galeria as GaleriaType, SlideHero } from '@/types/site';

interface GaleriaProps {
    slides: SlideHero[];
    galerias: GaleriaType[];
}

export default function GaleriaPage({ slides, galerias }: GaleriaProps) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Galeria" />

            <SiteHero
                slides={slides}
                cta={{
                    label: 'Browse Tours',
                    href: '/pacotes',
                }}
            />

            <Gallery galerias={galerias} />

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
