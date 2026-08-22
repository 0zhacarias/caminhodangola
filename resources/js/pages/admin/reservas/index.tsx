import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import { describeItem } from '@/components/admin/describe-item';
import ReservaDialog from '@/components/admin/dialogs/reserva-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/reservas';
import { reservaEstadoLabel } from '@/types/admin';
import type { Reserva } from '@/types/admin';

const columns: Column<Reserva>[] = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    {
        key: 'pacote',
        label: 'Pacote',
        render: (reserva) => reserva.pacote?.titulo ?? '—',
    },
    {
        key: 'data_pretendida',
        label: 'Data pretendida',
        render: (reserva) => reserva.data_pretendida ?? '—',
    },
    {
        key: 'estado',
        label: 'Estado',
        render: (reserva) => reservaEstadoLabel(reserva.estado),
    },
];

export default function Index({ reservas }: { reservas: Reserva[] }) {
    return (
        <>
            <Head title="Reservas" />

            <ResourcePage
                title="Reservas"
                description="Gerir as reservas recebidas através do site."
                data={reservas}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/reservas/${item.id}`}
                deleteDescription={(item) =>
                    `Tem a certeza que pretende eliminar a reserva de ${item.nome}?`
                }
                detailTitle={(item) => `Reserva de ${item.nome}`}
                detailFields={(item) =>
                    describeItem(item, {
                        format: {
                            estado: (estado) =>
                                reservaEstadoLabel(String(estado)),
                        },
                    })
                }
                renderDialog={({ item, onClose }) =>
                    item !== null ? (
                        <ReservaDialog item={item} onClose={onClose} />
                    ) : null
                }
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Reservas',
            href: index(),
        },
    ],
};
