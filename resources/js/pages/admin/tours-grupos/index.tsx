import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import TourGrupoDialog, {
    TOUR_GRUPO_TIPO_LABEL,
} from '@/components/admin/dialogs/tour-grupo-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { DynamicIcon } from '@/lib/dynamic-icons';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/tours-grupos';
import type { TourGrupo } from '@/types/admin';

const columns: Column<TourGrupo>[] = [
    {
        key: 'tipo',
        label: 'Tipo',
        render: (item) => TOUR_GRUPO_TIPO_LABEL[item.tipo] ?? item.tipo,
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

export default function Index({ itens }: { itens: TourGrupo[] }) {
    return (
        <>
            <Head title="Tours em Grupo" />

            <ResourcePage
                title="Tours em Grupo"
                description="Gerir a secção 'Group Tours' do portal: cabeçalho, destaques e botões de contacto."
                createLabel="Novo item"
                data={itens}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/tours-grupos/${item.id}`}
                detailTitle={(item) => item.titulo ?? item.descricao ?? ''}
                renderDialog={({ item, onClose }) => (
                    <TourGrupoDialog item={item} onClose={onClose} />
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
            title: 'Tours em Grupo',
            href: index(),
        },
    ],
};
