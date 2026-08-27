import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import TourPrivadoDialog, {
    TOUR_PRIVADO_TIPO_LABEL,
} from '@/components/admin/dialogs/tour-privado-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { DynamicIcon } from '@/lib/dynamic-icons';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/tours-privados';
import type { TourPrivado } from '@/types/admin';

const columns: Column<TourPrivado>[] = [
    {
        key: 'tipo',
        label: 'Tipo',
        render: (item) => TOUR_PRIVADO_TIPO_LABEL[item.tipo] ?? item.tipo,
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

export default function Index({ itens }: { itens: TourPrivado[] }) {
    return (
        <>
            <Head title="Tours Privados" />

            <ResourcePage
                title="Tours Privados"
                description="Gerir a secção 'Private Tours' do portal: cabeçalho, destaques e botões de contacto."
                createLabel="Novo item"
                data={itens}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/tours-privados/${item.id}`}
                detailTitle={(item) => item.titulo ?? item.descricao ?? ''}
                renderDialog={({ item, onClose }) => (
                    <TourPrivadoDialog item={item} onClose={onClose} />
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
            title: 'Tours Privados',
            href: index(),
        },
    ],
};
