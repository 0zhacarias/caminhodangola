import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import EstatisticaDialog from '@/components/admin/dialogs/estatistica-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/estatisticas';
import type { Estatistica } from '@/types/admin';

const columns: Column<Estatistica>[] = [
    { key: 'rotulo', label: 'Rótulo' },
    { key: 'valor', label: 'Valor' },
    { key: 'icone', label: 'Ícone' },
    {
        key: 'ativo',
        label: 'Ativa',
        render: (estatistica) => (estatistica.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    estatisticas,
}: {
    estatisticas: Estatistica[];
}) {
    return (
        <>
            <Head title="Estatísticas" />

            <ResourcePage
                title="Estatísticas"
                description="Gerir as estatísticas exibidas no site."
                createLabel="Nova estatística"
                data={estatisticas}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/estatisticas/${item.id}`}
                detailTitle={(item) => item.rotulo}
                renderDialog={({ item, onClose }) => (
                    <EstatisticaDialog item={item} onClose={onClose} />
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
            title: 'Estatísticas',
            href: index(),
        },
    ],
};
