import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import { describeItem } from '@/components/admin/describe-item';
import {
    PacoteDiasSection,
    PacoteGaleriaSection,
} from '@/components/admin/pacote-detalhes-sections';
import ResourcePage from '@/components/admin/resource-page';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { create, edit, index } from '@/routes/admin/pacotes';
import type { Pacote } from '@/types/admin';

const columns: Column<Pacote>[] = [
    {
        key: 'imagem',
        label: 'Imagem',
        render: (pacote) =>
            pacote.imagem ? (
                <img
                    src={storageUrl(pacote.imagem)}
                    alt={pacote.titulo}
                    className="h-10 w-16 rounded-md object-cover"
                />
            ) : (
                '—'
            ),
    },
    { key: 'titulo', label: 'Título' },
    {
        key: 'categoria',
        label: 'Categoria',
        render: (pacote) => pacote.categoria?.nome ?? '—',
    },
    { key: 'duracao', label: 'Duração' },
    {
        key: 'preco_eur',
        label: 'Preço (EUR)',
        render: (pacote) => (pacote.preco_eur ? `${pacote.preco_eur} €` : '—'),
    },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (pacote) => (pacote.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ pacotes }: { pacotes: Pacote[] }) {
    return (
        <>
            <Head title="Pacotes" />

            <ResourcePage
                title="Pacotes"
                description="Gerir os pacotes turísticos do site."
                createLabel="Novo pacote"
                createHref={create().url}
                editHref={(item) => edit(item.slug).url}
                data={pacotes}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/pacotes/${item.slug}`}
                detailTitle={(item) => item.titulo}
                detailDialogClassName="sm:max-w-5xl"
                detailFields={(item) => [
                    ...describeItem(item, {
                        format: {
                            avaliacao: (avaliacao) =>
                                `${String(avaliacao)} estrela(s)`,
                            preco_eur: (preco) => `${String(preco)} €`,
                            preco_pacote_fotos_eur: (preco) =>
                                `${String(preco)} €`,
                        },
                    }),
                    {
                        label: 'Dias do itinerário',
                        fullWidth: true,
                        value: <PacoteDiasSection pacote={item} />,
                    },
                    {
                        label: 'Galeria do pacote',
                        fullWidth: true,
                        value: <PacoteGaleriaSection pacote={item} />,
                    },
                ]}
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
            title: 'Pacotes',
            href: index(),
        },
    ],
};
