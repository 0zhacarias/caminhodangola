import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import DiaItinerarioDialog from '@/components/admin/dialogs/dia-itinerario-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/dias-itinerario';
import type { DiaItinerario, Option } from '@/types/admin';

const columns: Column<DiaItinerario>[] = [
    {
        key: 'pacote',
        label: 'Pacote',
        render: (dia) => dia.pacote?.titulo ?? '—',
    },
    { key: 'rotulo_dia', label: 'Dia' },
    { key: 'titulo', label: 'Título' },
    { key: 'ordem', label: 'Ordem' },
];

export default function Index({
    dias,
    pacotes,
}: {
    dias: DiaItinerario[];
    pacotes: Option[];
}) {
    return (
        <>
            <Head title="Dias de Itinerário" />

            <ResourcePage
                title="Dias de Itinerário"
                description="Gerir os dias de itinerário dos pacotes."
                createLabel="Novo dia"
                data={dias}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/dias-itinerario/${item.id}`}
                detailTitle={(item) => item.titulo}
                renderDialog={({ item, onClose }) => (
                    <DiaItinerarioDialog
                        item={item}
                        pacotes={pacotes}
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
            title: 'Dias de Itinerário',
            href: index(),
        },
    ],
};
