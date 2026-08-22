import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import CategoriaPacoteDialog from '@/components/admin/dialogs/categoria-pacote-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/categorias-pacotes';
import type { CategoriaPacote } from '@/types/admin';

const columns: Column<CategoriaPacote>[] = [
    { key: 'nome', label: 'Nome' },
    { key: 'slug', label: 'Slug' },
    {
        key: 'pacotes_count',
        label: 'Pacotes',
        render: (categoria) => categoria.pacotes_count ?? 0,
    },
    {
        key: 'ativo',
        label: 'Ativa',
        render: (categoria) => (categoria.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    categorias,
}: {
    categorias: CategoriaPacote[];
}) {
    return (
        <>
            <Head title="Categorias de Pacotes" />

            <ResourcePage
                title="Categorias de Pacotes"
                description="Gerir as categorias dos pacotes turísticos."
                createLabel="Nova categoria"
                data={categorias}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/categorias-pacotes/${item.slug}`}
                detailTitle={(item) => item.nome}
                renderDialog={({ item, onClose }) => (
                    <CategoriaPacoteDialog item={item} onClose={onClose} />
                )}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Categorias de Pacotes',
            href: index(),
        },
    ],
};
