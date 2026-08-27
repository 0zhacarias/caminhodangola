import { Head } from '@inertiajs/react';
import { useState } from 'react';
import type { Column } from '@/components/admin/data-table';
import { describeItem } from '@/components/admin/describe-item';
import DepoimentoDialog from '@/components/admin/dialogs/depoimento-dialog';
import VideoDepoimentoDialog from '@/components/admin/dialogs/video-depoimento-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/depoimentos';
import type { Depoimento, VideoDepoimento } from '@/types/admin';

type TipoDepoimento = 'depoimentos' | 'videos';

const columnsDepoimentos: Column<Depoimento>[] = [
    { key: 'nome', label: 'Nome' },
    { key: 'localizacao', label: 'Localização' },
    {
        key: 'avaliacao',
        label: 'Avaliação',
        render: (depoimento) => `${depoimento.avaliacao} estrelas`,
    },
    {
        key: 'destaque',
        label: 'Destaque',
        render: (depoimento) => (depoimento.destaque ? 'Sim' : 'Não'),
    },
];

const columnsVideos: Column<VideoDepoimento>[] = [
    { key: 'titulo', label: 'Título' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'ordem', label: 'Ordem' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (video) => (video.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    depoimentos,
    videos,
}: {
    depoimentos: Depoimento[];
    videos: VideoDepoimento[];
}) {
    const [tipo, setTipo] = useState<TipoDepoimento>('depoimentos');

    return (
        <>
            <Head title="Depoimentos" />

            <div className="space-y-6">
                <div className="flex w-fit items-center gap-1 rounded-lg border p-1">
                    <ToggleGroup
                        type="single"
                        value={tipo}
                        onValueChange={(valor) => {
                            if (valor) {
                                setTipo(valor as TipoDepoimento);
                            }
                        }}
                    >
                        <ToggleGroupItem value="depoimentos" className="px-3">
                            Depoimentos
                        </ToggleGroupItem>
                        <ToggleGroupItem value="videos" className="px-3">
                            Vídeos de Depoimentos
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                {tipo === 'depoimentos' ? (
                    <ResourcePage
                        title="Depoimentos"
                        description="Gerir os depoimentos exibidos no site."
                        createLabel="Novo depoimento"
                        data={depoimentos}
                        columns={columnsDepoimentos}
                        getItemId={(item) => item.id}
                        deleteUrl={(item) => `/admin/depoimentos/${item.id}`}
                        detailTitle={(item) => item.nome}
                        detailFields={(item) =>
                            describeItem(item, {
                                format: {
                                    avaliacao: (avaliacao) =>
                                        `${String(avaliacao)} estrela(s)`,
                                },
                            })
                        }
                        renderDialog={({ item, onClose }) => (
                            <DepoimentoDialog item={item} onClose={onClose} />
                        )}
                    />
                ) : (
                    <ResourcePage
                        title="Vídeos de Depoimentos"
                        description="Gerir os vídeos de avaliações exibidos no site."
                        createLabel="Novo vídeo"
                        data={videos}
                        columns={columnsVideos}
                        getItemId={(item) => item.id}
                        deleteUrl={(item) =>
                            `/admin/videos-depoimentos/${item.id}`
                        }
                        detailTitle={(item) => item.titulo ?? ''}
                        detailFields={(item) =>
                            describeItem(item, {
                                labels: { video: 'Vídeo' },
                                format: {
                                    video: (valor) => (
                                        <video
                                            src={storageUrl(String(valor))}
                                            controls
                                            className="max-h-40 w-full rounded-md bg-slate-900"
                                        />
                                    ),
                                },
                            })
                        }
                        renderDialog={({ item, onClose }) => (
                            <VideoDepoimentoDialog
                                item={item}
                                onClose={onClose}
                            />
                        )}
                    />
                )}
            </div>
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
            title: 'Depoimentos',
            href: index(),
        },
    ],
};
