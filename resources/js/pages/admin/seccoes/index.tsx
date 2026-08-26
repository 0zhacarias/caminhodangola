import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import SeccaoDialog from '@/components/admin/dialogs/seccao-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/seccoes';
import type { Seccao } from '@/types/admin';

const columns: Column<Seccao>[] = [
    { key: 'slug', label: 'Slug' },
    { key: 'titulo', label: 'Título' },
    {
        key: 'conteudo',
        label: 'Conteúdo',
        render: (seccao) => (seccao.conteudo != null ? 'Sim' : '—'),
    },
    {
        key: 'ativo',
        label: 'Ativa',
        render: (seccao) => (seccao.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ seccoes }: { seccoes: Seccao[] }) {
    return (
        <>
            <Head title="Secções" />

            <ResourcePage
                title="Secções"
                description="Gerir as secções de conteúdo das páginas do site."
                createLabel="Nova secção"
                data={seccoes}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/seccoes/${item.slug}`}
                detailTitle={(item) => item.titulo ?? item.slug}
                renderDialog={({ item, onClose }) => (
                    <SeccaoDialog item={item} onClose={onClose} />
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
            title: 'Secções',
            href: index(),
        },
    ],
};
