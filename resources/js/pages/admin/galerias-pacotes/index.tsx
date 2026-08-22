import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import GaleriaPacoteDialog from '@/components/admin/dialogs/galeria-pacote-dialog';
import ImageThumbnail from '@/components/admin/image-thumbnail';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/galerias-pacotes';
import type { GaleriaPacote, Option } from '@/types/admin';

export default function Index({
    galerias,
    pacotes,
}: {
    galerias: GaleriaPacote[];
    pacotes: Option[];
}) {
    const imagens = galerias.map((galeria) => ({
        src: galeria.imagem,
        alt: galeria.pacote?.titulo ?? 'Imagem',
    }));

    const columns: Column<GaleriaPacote>[] = [
        {
            key: 'pacote',
            label: 'Pacote',
            render: (galeria) => galeria.pacote?.titulo ?? '—',
        },
        {
            key: 'imagem',
            label: 'Imagem',
            render: (galeria) => {
                const indice = imagens.findIndex(
                    (imagem) => imagem.src === galeria.imagem,
                );

                return (
                    <ImageThumbnail
                        imagens={imagens}
                        indiceInicial={indice === -1 ? 0 : indice}
                        src={galeria.imagem}
                        alt={galeria.pacote?.titulo ?? ''}
                        className="h-10 w-16 rounded-md object-cover"
                    />
                );
            },
        },
        { key: 'ordem', label: 'Ordem' },
    ];

    return (
        <>
            <Head title="Galerias de Pacotes" />

            <ResourcePage
                title="Galerias de Pacotes"
                description="Gerir as imagens das galerias dos pacotes."
                createLabel="Nova imagem"
                data={galerias}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/galerias-pacotes/${item.id}`}
                detailTitle={(item) => item.pacote?.titulo ?? 'Imagem'}
                renderDialog={({ item, onClose }) => (
                    <GaleriaPacoteDialog
                        item={item}
                        pacotes={pacotes}
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
            title: 'Galerias de Pacotes',
            href: index(),
        },
    ],
};
