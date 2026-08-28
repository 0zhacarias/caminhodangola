import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import PorqueAngolaDialog from '@/components/admin/dialogs/porque-angola-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/porques-angola';
import type { PorqueAngola } from '@/types/admin';

const columns: Column<PorqueAngola>[] = [
    {
        key: 'imagem',
        label: 'Imagem',
        render: (item) =>
            item.imagem ? (
                <img
                    src={storageUrl(item.imagem)}
                    alt={item.titulo}
                    className="h-10 w-16 rounded-md object-cover"
                />
            ) : (
                '—'
            ),
    },
    { key: 'titulo', label: 'Título' },
    { key: 'ordem', label: 'Ordem' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (item) => (item.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ itens }: { itens: PorqueAngola[] }) {
    return (
        <>
            <Head title="Porquê Angola" />

            <ResourcePage
                title="Porquê Angola"
                description="Gerir a secção 'Why Angola' do portal."
                createLabel="Novo item"
                data={itens}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/porques-angola/${item.id}`}
                detailTitle={(item) => item.titulo}
                renderDialog={({ item, onClose }) => (
                    <PorqueAngolaDialog item={item} onClose={onClose} />
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
            title: 'Porquê Angola',
            href: index(),
        },
    ],
};
