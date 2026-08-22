import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import SlideHeroDialog from '@/components/admin/dialogs/slide-hero-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/slides-hero';
import type { SlideHero } from '@/types/admin';

const columns: Column<SlideHero>[] = [
    {
        key: 'imagem',
        label: 'Imagem',
        render: (slide) => (
            <img
                src={slide.imagem}
                alt={slide.titulo}
                className="h-10 w-16 rounded-md object-cover"
            />
        ),
    },
    { key: 'titulo', label: 'Título' },
    { key: 'pagina', label: 'Página' },
    { key: 'ordem', label: 'Ordem' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (slide) => (slide.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ slides }: { slides: SlideHero[] }) {
    return (
        <>
            <Head title="Slides Hero" />

            <ResourcePage
                title="Slides Hero"
                description="Gerir os slides do carrossel principal do site."
                createLabel="Novo slide"
                data={slides}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/slides-hero/${item.id}`}
                detailTitle={(item) => item.titulo}
                renderDialog={({ item, onClose }) => (
                    <SlideHeroDialog item={item} onClose={onClose} />
                )}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Slides Hero',
            href: index(),
        },
    ],
};
