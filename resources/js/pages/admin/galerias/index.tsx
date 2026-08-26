import { Head } from '@inertiajs/react';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import type { Column } from '@/components/admin/data-table';
import GaleriaDialog from '@/components/admin/dialogs/galeria-dialog';
import ImageThumbnail from '@/components/admin/image-thumbnail';
import ResourcePage from '@/components/admin/resource-page';
import ImageLightbox from '@/components/image-lightbox';
import type { ImagemLightbox } from '@/components/image-lightbox';
import { Button } from '@/components/ui/button';
import { cn, storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/galerias';
import type { Galeria } from '@/types/admin';

function classeGrelha(indice: number): string {
    const posicao = indice % 13;

    if (posicao === 7) {
        return 'lg:row-span-2';
    }

    if (posicao === 12) {
        return 'lg:col-span-2';
    }

    return '';
}

function GaleriaCard({
    galeria,
    onAbrir,
    onEdit,
    onDelete,
    className,
}: {
    galeria: Galeria;
    onAbrir: () => void;
    onEdit: () => void;
    onDelete: () => void;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex flex-col overflow-hidden rounded-xl border bg-card',
                className,
            )}
        >
            <div className="group relative min-h-0 flex-1">
                <button
                    type="button"
                    onClick={onAbrir}
                    aria-label="Abrir imagem em tamanho maior"
                    className="block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                    <img
                        src={storageUrl(galeria.imagem)}
                        alt={galeria.alt ?? ''}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </button>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                    <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Ver em tamanho maior"
                        onClick={onAbrir}
                    >
                        <EyeIcon />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Editar"
                        onClick={onEdit}
                    >
                        <PencilIcon />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Eliminar"
                        onClick={onDelete}
                    >
                        <Trash2Icon className="text-destructive" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                        {galeria.alt ?? `Imagem #${galeria.id}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Ordem {galeria.ordem}
                    </p>
                </div>
                <span
                    className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                        galeria.ativo
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-muted text-muted-foreground',
                    )}
                >
                    {galeria.ativo ? 'Ativa' : 'Inativa'}
                </span>
            </div>
        </div>
    );
}

export default function Index({ galerias }: { galerias: Galeria[] }) {
    const [indiceAberto, setIndiceAberto] = useState<number | null>(null);

    const imagens: ImagemLightbox[] = galerias.map((galeria) => ({
        src: galeria.imagem,
        alt: galeria.alt ?? `Imagem #${galeria.id}`,
    }));

    const indiceDe = (galeria: Galeria): number => {
        const indice = imagens.findIndex(
            (imagem) => imagem.src === galeria.imagem,
        );

        return indice === -1 ? 0 : indice;
    };

    const abrir = (galeria: Galeria) => {
        setIndiceAberto(indiceDe(galeria));
    };

    const columns: Column<Galeria>[] = [
        {
            key: 'imagem',
            label: 'Imagem',
            render: (galeria) => (
                <ImageThumbnail
                    imagens={imagens}
                    indiceInicial={indiceDe(galeria)}
                    src={galeria.imagem}
                    alt={galeria.alt ?? ''}
                    className="h-10 w-16 rounded-md object-cover"
                />
            ),
        },
        { key: 'alt', label: 'Texto alternativo' },
        { key: 'ordem', label: 'Ordem' },
        {
            key: 'ativo',
            label: 'Ativa',
            render: (galeria) => (galeria.ativo ? 'Sim' : 'Não'),
        },
    ];

    return (
        <>
            <Head title="Galerias" />

            <ResourcePage
                title="Galerias"
                description="Gerir as imagens da galeria geral do site."
                createLabel="Novas imagens"
                data={galerias}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/galerias/${item.id}`}
                defaultView="grid"
                onViewItem={abrir}
                gridClassName="auto-rows-[160px] gap-3 lg:grid-cols-5 lg:auto-rows-[190px] xl:grid-cols-5"
                gridItem={(galeria, acoes, indice) => (
                    <GaleriaCard
                        galeria={galeria}
                        className={classeGrelha(indice)}
                        onAbrir={() => abrir(galeria)}
                        onEdit={() => acoes.onEdit(galeria)}
                        onDelete={() => acoes.onDelete(galeria)}
                    />
                )}
                renderDialog={({ item, onClose }) => (
                    <GaleriaDialog item={item} onClose={onClose} />
                )}
            />

            {indiceAberto !== null && imagens.length > 0 && (
                <ImageLightbox
                    imagens={imagens}
                    indiceInicial={indiceAberto}
                    onClose={() => setIndiceAberto(null)}
                />
            )}
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
            title: 'Galerias',
            href: index(),
        },
    ],
};
