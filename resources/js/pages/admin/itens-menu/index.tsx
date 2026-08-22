import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import ItemMenuDialog from '@/components/admin/dialogs/item-menu-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/itens-menu';
import type { ItemMenu, Option } from '@/types/admin';

const columns: Column<ItemMenu>[] = [
    { key: 'rotulo', label: 'Rótulo' },
    { key: 'rota', label: 'Rota' },
    {
        key: 'pai',
        label: 'Item pai',
        render: (item) => item.pai?.rotulo ?? '—',
    },
    { key: 'ordem', label: 'Ordem' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (item) => (item.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    itens,
    pais,
}: {
    itens: ItemMenu[];
    pais: Option[];
}) {
    return (
        <>
            <Head title="Itens de Menu" />

            <ResourcePage
                title="Itens de Menu"
                description="Gerir os itens do menu de navegação do site."
                createLabel="Novo item"
                data={itens}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/itens-menu/${item.id}`}
                detailTitle={(item) => item.rotulo}
                renderDialog={({ item, onClose }) => (
                    <ItemMenuDialog item={item} pais={pais} onClose={onClose} />
                )}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Itens de Menu',
            href: index(),
        },
    ],
};
