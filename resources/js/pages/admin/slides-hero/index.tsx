import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import SlideHeroDialog from '@/components/admin/dialogs/slide-hero-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/slides-hero';
import type { SlideHero } from '@/types/admin';

const columns: Column<SlideHero>[] = [
    {
        key: 'imagem',
        label: 'Imagem',
        render: (slide) =>
            slide.imagem ? (
                <img
                    src={storageUrl(slide.imagem)}
                    alt={slide.titulo ?? ''}
                    className="h-10 w-16 rounded-md object-cover"
                />
            ) : (
                '—'
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

export default function Index({
    slides,
    paginas,
}: {
    slides: SlideHero[];
    paginas: Record<string, string>;
}) {
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
                detailTitle={(item) => item.titulo ?? ''}
                renderDialog={({ item, onClose }) => (
                    <SlideHeroDialog
                        item={item}
                        paginas={paginas}
                        onClose={onClose}
                    />
                )}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Slides Hero',
            href: index(),
        },
    ],
};
