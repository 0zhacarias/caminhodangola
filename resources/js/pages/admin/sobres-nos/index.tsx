import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import SobreNosDialog, {
    SOBRE_NOS_TIPO_LABEL,
} from '@/components/admin/dialogs/sobre-nos-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { DynamicIcon } from '@/lib/dynamic-icons';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/sobres-nos';
import type { SobreNos } from '@/types/admin';

const columns: Column<SobreNos>[] = [
    {
        key: 'tipo',
        label: 'Tipo',
        render: (item) => SOBRE_NOS_TIPO_LABEL[item.tipo] ?? item.tipo,
    },
    { key: 'titulo', label: 'Título' },
    {
        key: 'icone',
        label: 'Ícone',
        render: (item) => (
            <DynamicIcon
                name={item.icone}
                className="size-5 text-muted-foreground"
            />
        ),
    },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (item) => (item.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ itens }: { itens: SobreNos[] }) {
    return (
        <>
            <Head title="Sobre Nós" />

            <ResourcePage
                title="Sobre Nós"
                description="Gerir a secção 'About Us' do portal: cabeçalho, textos e destaques."
                createLabel="Novo item"
                data={itens}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/sobres-nos/${item.id}`}
                detailTitle={(item) => item.titulo ?? item.descricao ?? ''}
                renderDialog={({ item, onClose }) => (
                    <SobreNosDialog item={item} onClose={onClose} />
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
            title: 'Sobre Nós',
            href: index(),
        },
    ],
};
