import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import MembroEquipaDialog from '@/components/admin/dialogs/membro-equipa-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { index } from '@/routes/admin/membros-equipa';
import type { MembroEquipa } from '@/types/admin';

const columns: Column<MembroEquipa>[] = [
    { key: 'nome', label: 'Nome' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'email', label: 'E-mail' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (membro) => (membro.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ membros }: { membros: MembroEquipa[] }) {
    return (
        <>
            <Head title="Membros da Equipa" />

            <ResourcePage
                title="Membros da Equipa"
                description="Gerir os membros da equipa exibidos no site."
                createLabel="Novo membro"
                data={membros}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/membros-equipa/${item.id}`}
                detailTitle={(item) => item.nome}
                renderDialog={({ item, onClose }) => (
                    <MembroEquipaDialog item={item} onClose={onClose} />
                )}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Membros da Equipa',
            href: index(),
        },
    ],
};
