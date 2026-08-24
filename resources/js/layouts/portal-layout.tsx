import { usePage } from '@inertiajs/react';
import { Header } from '@/components/site/header';

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { component } = usePage();
    return (
        <div className="flex min-h-screen flex-col">
            {component !== 'site/home' && component !== 'site/pacotes/show' && component !== 'site/avaliacoes' && component !== 'site/private-tours' && component !== 'site/group-tours' && component !== 'site/sobre' && component !== 'site/galeria' && <Header />}
            <main className="flex-1">{children}</main>
        </div>
    );
}
