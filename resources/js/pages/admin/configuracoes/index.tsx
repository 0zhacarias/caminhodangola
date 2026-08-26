import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import ConfiguracaoDialog from '@/components/admin/dialogs/configuracao-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/configuracoes';
import type { Configuracao } from '@/types/admin';

const columns: Column<Configuracao>[] = [
    { key: 'chave', label: 'Chave' },
    {
        key: 'valor',
        label: 'Valor',
        render: (configuracao) =>
            configuracao.valor ? configuracao.valor : '—',
    },
];

export default function Index({
    configuracoes,
}: {
    configuracoes: Configuracao[];
}) {
    return (
        <>
            <Head title="Configurações" />

            <ResourcePage
                title="Configurações"
                description="Gerir as configurações gerais do site."
                createLabel="Nova configuração"
                data={configuracoes}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/configuracoes/${item.id}`}
                detailTitle={(item) => item.chave}
                renderDialog={({ item, onClose }) => (
                    <ConfiguracaoDialog item={item} onClose={onClose} />
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
            title: 'Configurações',
            href: index(),
        },
    ],
};
