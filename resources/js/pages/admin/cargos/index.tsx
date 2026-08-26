import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import CargoDialog from '@/components/admin/dialogs/cargo-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/cargos';
import type { Cargo } from '@/types/admin';

const columns: Column<Cargo>[] = [
    { key: 'nome', label: 'Nome' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (cargo) => (cargo.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ cargos }: { cargos: Cargo[] }) {
    return (
        <>
            <Head title="Cargos" />

            <ResourcePage
                title="Cargos"
                description="Gerir os cargos disponíveis para os membros da equipa."
                createLabel="Novo cargo"
                data={cargos}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/cargos/${item.id}`}
                detailTitle={(item) => item.nome}
                renderDialog={({ item, onClose }) => (
                    <CargoDialog item={item} onClose={onClose} />
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
            title: 'Cargos',
            href: index(),
        },
    ],
};
