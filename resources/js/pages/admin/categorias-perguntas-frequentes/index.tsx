import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import CategoriaPerguntaFrequenteDialog from '@/components/admin/dialogs/categoria-pergunta-frequente-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/categorias-perguntas-frequentes';
import type { CategoriaPerguntaFrequente } from '@/types/admin';

const columns: Column<CategoriaPerguntaFrequente>[] = [
    { key: 'nome', label: 'Nome' },
    {
        key: 'ativo',
        label: 'Ativa',
        render: (categoria) => (categoria.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    categorias,
}: {
    categorias: CategoriaPerguntaFrequente[];
}) {
    return (
        <>
            <Head title="Categorias de Perguntas Frequentes" />

            <ResourcePage
                title="Categorias de Perguntas Frequentes"
                description="Gerir as categorias das perguntas frequentes."
                createLabel="Nova categoria"
                data={categorias}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) =>
                    `/admin/categorias-perguntas-frequentes/${item.id}`
                }
                detailTitle={(item) => item.nome}
                renderDialog={({ item, onClose }) => (
                    <CategoriaPerguntaFrequenteDialog
                        item={item}
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
            title: 'Categorias de Perguntas Frequentes',
            href: index(),
        },
    ],
};
