import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import { describeItem } from '@/components/admin/describe-item';
import DepoimentoDialog from '@/components/admin/dialogs/depoimento-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/depoimentos';
import type { Depoimento } from '@/types/admin';

const columns: Column<Depoimento>[] = [
    { key: 'nome', label: 'Nome' },
    { key: 'localizacao', label: 'Localização' },
    {
        key: 'avaliacao',
        label: 'Avaliação',
        render: (depoimento) => `${depoimento.avaliacao} estrelas`,
    },
    {
        key: 'destaque',
        label: 'Destaque',
        render: (depoimento) => (depoimento.destaque ? 'Sim' : 'Não'),
    },
];

export default function Index({ depoimentos }: { depoimentos: Depoimento[] }) {
    return (
        <>
            <Head title="Depoimentos" />

            <ResourcePage
                title="Depoimentos"
                description="Gerir os depoimentos exibidos no site."
                createLabel="Novo depoimento"
                data={depoimentos}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/depoimentos/${item.id}`}
                detailTitle={(item) => item.nome}
                detailFields={(item) =>
                    describeItem(item, {
                        format: {
                            avaliacao: (avaliacao) =>
                                `${String(avaliacao)} estrela(s)`,
                        },
                    })
                }
                renderDialog={({ item, onClose }) => (
                    <DepoimentoDialog item={item} onClose={onClose} />
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
            title: 'Depoimentos',
            href: index(),
        },
    ],
};
