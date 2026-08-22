import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import PerguntaFrequenteDialog from '@/components/admin/dialogs/pergunta-frequente-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/perguntas-frequentes';
import type { PerguntaFrequente } from '@/types/admin';

const columns: Column<PerguntaFrequente>[] = [
    { key: 'categoria', label: 'Categoria' },
    { key: 'pergunta', label: 'Pergunta' },
    {
        key: 'ativo',
        label: 'Ativa',
        render: (pergunta) => (pergunta.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    perguntas,
}: {
    perguntas: PerguntaFrequente[];
}) {
    return (
        <>
            <Head title="Perguntas Frequentes" />

            <ResourcePage
                title="Perguntas Frequentes"
                description="Gerir as perguntas frequentes do site."
                createLabel="Nova pergunta"
                data={perguntas}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/perguntas-frequentes/${item.id}`}
                detailTitle={(item) => item.pergunta}
                renderDialog={({ item, onClose }) => (
                    <PerguntaFrequenteDialog item={item} onClose={onClose} />
                )}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Perguntas Frequentes',
            href: index(),
        },
    ],
};
