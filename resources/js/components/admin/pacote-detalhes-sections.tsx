import { useForm, usePage } from '@inertiajs/react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import ConfirmDeleteDialog from '@/components/admin/confirm-delete-dialog';
import DiaItinerarioDialog from '@/components/admin/dialogs/dia-itinerario-dialog';
import ImageThumbnail from '@/components/admin/image-thumbnail';
import { Dropzone } from '@/components/admin/image-upload';
import type {
    DiaItinerario,
    GaleriaPacote,
    Option,
    Pacote,
} from '@/types/admin';

function usePacoteAtual(pacote: Pacote): Pacote {
    const { props } = usePage<{ pacotes?: Pacote[] }>();

    return props.pacotes?.find((item) => item.id === pacote.id) ?? pacote;
}

export function PacoteGaleriaSection({ pacote }: { pacote: Pacote }) {
    const pacoteAtual = usePacoteAtual(pacote);
    const galerias = pacoteAtual.galerias ?? [];
    const [removendo, setRemovendo] = useState<GaleriaPacote | null>(null);

    const { setData, post, processing, errors } = useForm<{
        pacote_id: number;
        galerias: File[];
    }>({
        pacote_id: pacoteAtual.id,
        galerias: [],
    });

    const imagens = galerias.map((galeria) => ({
        src: galeria.imagem,
        alt: pacoteAtual.titulo,
    }));

    const adicionar = (ficheiros: File[]) => {
        setData('galerias', ficheiros);

        post('/admin/galerias-pacotes', {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setData('galerias', []),
        });
    };

    return (
        <div className="grid gap-3">
            {galerias.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {galerias.map((galeria, indice) => (
                        <div key={galeria.id} className="group relative">
                            <ImageThumbnail
                                imagens={imagens}
                                indiceInicial={indice}
                                src={galeria.imagem}
                                alt={pacoteAtual.titulo}
                                className="aspect-video w-full rounded-md border object-cover"
                            />
                            <button
                                type="button"
                                aria-label="Remover imagem da galeria"
                                onClick={() => setRemovendo(galeria)}
                                className="absolute top-1 right-1 rounded-md bg-background/90 p-1 text-destructive opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                            >
                                <Trash2Icon className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Sem imagens na galeria.
                </p>
            )}

            <Dropzone
                id={`galeria-pacote-${pacoteAtual.id}`}
                multiple
                onFiles={adicionar}
                className="py-4"
            />

            {processing && (
                <p className="text-xs text-muted-foreground">
                    A enviar imagens…
                </p>
            )}

            {errors.galerias && (
                <p className="text-xs text-destructive">{errors.galerias}</p>
            )}

            {removendo !== null && (
                <ConfirmDeleteDialog
                    url={`/admin/galerias-pacotes/${removendo.id}`}
                    description="Remover esta imagem da galeria do pacote?"
                    preserveState
                    onClose={() => setRemovendo(null)}
                />
            )}
        </div>
    );
}

export function PacoteDiasSection({ pacote }: { pacote: Pacote }) {
    const pacoteAtual = usePacoteAtual(pacote);
    const dias = pacoteAtual.dias_itinerario ?? [];
    const [dia, setDia] = useState<DiaItinerario | null>(null);

    const { props } = usePage<{ pacotes?: Pacote[] }>();

    const opcoes: Option[] = props.pacotes?.map((item) => ({
        value: item.id,
        label: item.titulo,
    })) ?? [{ value: pacoteAtual.id, label: pacoteAtual.titulo }];

    return (
        <>
            {dias.length > 0 ? (
                <ol className="grid gap-2">
                    {dias.map((diaItem) => (
                        <li key={diaItem.id}>
                            <button
                                type="button"
                                onClick={() => setDia(diaItem)}
                                className="grid w-full gap-0.5 rounded-md border p-2 text-left transition-colors hover:border-primary/50 hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                            >
                                <span className="flex items-center gap-1.5 text-xs font-semibold">
                                    {diaItem.rotulo_dia} — {diaItem.titulo}
                                    <PencilIcon className="size-3 text-muted-foreground" />
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {diaItem.descricao}
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Sem dias de itinerário.
                </p>
            )}

            {dia !== null && (
                <DiaItinerarioDialog
                    item={dia}
                    pacotes={opcoes}
                    preservarEstado
                    onClose={() => setDia(null)}
                />
            )}
        </>
    );
}
