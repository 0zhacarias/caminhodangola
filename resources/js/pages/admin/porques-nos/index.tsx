import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import PorqueNosDialog, {
    PORQUE_NOS_TIPO_LABEL,
} from '@/components/admin/dialogs/porque-nos-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { DynamicIcon } from '@/lib/dynamic-icons';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/porques-nos';
import type { PorqueNos } from '@/types/admin';

const columns: Column<PorqueNos>[] = [
    {
        key: 'tipo',
        label: 'Tipo',
        render: (item) => PORQUE_NOS_TIPO_LABEL[item.tipo] ?? item.tipo,
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

export default function Index({ itens }: { itens: PorqueNos[] }) {
    return (
        <>
            <Head title="Porquê Nós" />

            <ResourcePage
                title="Porquê Nós"
                description="Gerir a secção 'Why Choose Us' do portal: cabeçalho, destaques e valores."
                createLabel="Novo item"
                data={itens}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/porques-nos/${item.id}`}
                detailTitle={(item) => item.titulo}
                renderDialog={({ item, onClose }) => (
                    <PorqueNosDialog item={item} onClose={onClose} />
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
            title: 'Porquê Nós',
            href: index(),
        },
    ],
};
