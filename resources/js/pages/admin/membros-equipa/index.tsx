import { Head, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import type { Column } from '@/components/admin/data-table';
import MembroEquipaDialog from '@/components/admin/dialogs/membro-equipa-dialog';
import type { GridAcoes } from '@/components/admin/resource-page';
import ResourcePage from '@/components/admin/resource-page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn, storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import {
    index,
    toggleAcesso,
    visao as visaoRoute,
} from '@/routes/admin/membros-equipa';
import type { Cargo, MembroEquipa } from '@/types/admin';

function iniciais(nome: string): string {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase();
}

function MembroCard({
    membro,
    acoes,
}: {
    membro: MembroEquipa;
    acoes: GridAcoes<MembroEquipa>;
}) {
    const temAcesso = membro.user?.ativo ?? false;

    return (
        <div className="flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center">
            <Avatar className="size-20">
                <AvatarImage
                    src={membro.foto ? storageUrl(membro.foto) : undefined}
                    alt={membro.nome}
                />
                <AvatarFallback className="bg-muted text-xl font-semibold text-muted-foreground">
                    {iniciais(membro.nome)}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
                <p className="truncate text-sm font-medium">{membro.nome}</p>
                <p className="truncate text-xs text-muted-foreground">
                    {membro.cargo}
                </p>
                {membro.email && (
                    <p className="truncate text-xs text-muted-foreground">
                        {membro.email}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1">
                <span
                    className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        membro.ativo
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-muted text-muted-foreground',
                    )}
                >
                    {membro.ativo ? 'Ativo' : 'Inativo'}
                </span>
                <span
                    className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        temAcesso
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-muted text-muted-foreground',
                    )}
                >
                    {temAcesso ? 'Com acesso' : 'Sem acesso'}
                </span>
            </div>

            <div className="flex items-center gap-1">
                {acoes.onView !== undefined && (
                    <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Visualizar"
                        onClick={() => acoes.onView?.(membro)}
                    >
                        <EyeIcon />
                    </Button>
                )}
                <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Editar"
                    onClick={() => acoes.onEdit(membro)}
                >
                    <PencilIcon />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Eliminar"
                    onClick={() => acoes.onDelete(membro)}
                >
                    <Trash2Icon className="text-destructive" />
                </Button>
            </div>

            <Button
                size="sm"
                variant={temAcesso ? 'outline' : 'secondary'}
                className="shrink-0"
                onClick={() =>
                    router.post(
                        toggleAcesso(membro.id).url,
                        {},
                        { preserveScroll: true },
                    )
                }
            >
                {temAcesso ? 'Desativar acesso' : 'Permitir acesso'}
            </Button>
        </div>
    );
}

const columns: Column<MembroEquipa>[] = [
    {
        key: 'foto',
        label: 'Foto',
        render: (membro) => (
            <Avatar className="size-10">
                <AvatarImage
                    src={membro.foto ? storageUrl(membro.foto) : undefined}
                    alt={membro.nome}
                />
                <AvatarFallback>{iniciais(membro.nome)}</AvatarFallback>
            </Avatar>
        ),
    },
    { key: 'nome', label: 'Nome' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'email', label: 'E-mail' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (membro) => (membro.ativo ? 'Sim' : 'Não'),
    },
    {
        key: 'acesso',
        label: 'Acesso ao Painel',
        render: (membro) => (
            <Button
                size="sm"
                variant={membro.user?.ativo ? 'outline' : 'secondary'}
                className="shrink-0"
                onClick={() =>
                    router.post(
                        toggleAcesso(membro.id).url,
                        {},
                        { preserveScroll: true },
                    )
                }
            >
                {membro.user?.ativo ? 'Desativar acesso' : 'Permitir acesso'}
            </Button>
        ),
    },
];

export default function Index({
    membros,
    cargos,
    visao,
}: {
    membros: MembroEquipa[];
    cargos: Cargo[];
    visao: 'grid' | 'list';
}) {
    const guardarVisao = (novaVisao: 'grid' | 'list') => {
        router.post(
            visaoRoute().url,
            { visao: novaVisao },
            { preserveScroll: true },
        );
    };

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
                defaultView={visao}
                onViewChange={guardarVisao}
                gridItem={(membro, acoes) => (
                    <MembroCard membro={membro} acoes={acoes} />
                )}
                renderDialog={({ item, onClose }) => (
                    <MembroEquipaDialog
                        item={item}
                        onClose={onClose}
                        cargos={cargos}
                    />
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
            title: 'Membros da Equipa',
            href: index(),
        },
    ],
};
