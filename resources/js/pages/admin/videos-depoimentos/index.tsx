import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import { describeItem } from '@/components/admin/describe-item';
import VideoDepoimentoDialog from '@/components/admin/dialogs/video-depoimento-dialog';
import ResourcePage from '@/components/admin/resource-page';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/videos-depoimentos';
import type { VideoDepoimento } from '@/types/admin';

const columns: Column<VideoDepoimento>[] = [
    { key: 'titulo', label: 'Título' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'ordem', label: 'Ordem' },
    {
        key: 'ativo',
        label: 'Ativo',
        render: (video) => (video.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({ videos }: { videos: VideoDepoimento[] }) {
    return (
        <>
            <Head title="Vídeos de Depoimentos" />

            <ResourcePage
                title="Vídeos de Depoimentos"
                description="Gerir os vídeos de avaliações exibidos no site."
                createLabel="Novo vídeo"
                data={videos}
                columns={columns}
                getItemId={(item) => item.id}
                deleteUrl={(item) => `/admin/videos-depoimentos/${item.id}`}
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
                    <VideoDepoimentoDialog item={item} onClose={onClose} />
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
            title: 'Vídeos de Depoimentos',
            href: index(),
        },
    ],
};
