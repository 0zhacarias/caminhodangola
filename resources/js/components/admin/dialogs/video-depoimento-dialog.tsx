import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import VideoUpload from '@/components/admin/video-upload';
import { Input } from '@/components/ui/input';
import type { VideoDepoimento } from '@/types/admin';

export default function VideoDepoimentoDialog({
    item,
    onClose,
}: {
    item: VideoDepoimento | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        titulo: string;
        descricao: string;
        video: string | File;
        ordem: number;
        ativo: boolean;
    }>({
        titulo: item?.titulo ?? '',
        descricao: item?.descricao ?? '',
        video: item?.video ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/videos-depoimentos/${item.id}`, options);
        } else {
            post('/admin/videos-depoimentos', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar vídeo' : 'Novo vídeo'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="titulo" label="Título" error={errors.titulo}>
                    <Input
                        id="titulo"
                        value={data.titulo}
                        onChange={(event) =>
                            setData('titulo', event.target.value)
                        }
                        placeholder="David"
                    />
                </Field>

                <Field
                    id="descricao"
                    label="Descrição"
                    error={errors.descricao}
                >
                    <Input
                        id="descricao"
                        value={data.descricao}
                        onChange={(event) =>
                            setData('descricao', event.target.value)
                        }
                        placeholder="Tourist from England"
                    />
                </Field>
            </div>

            <VideoUpload
                id="video"
                label="Vídeo"
                value={data.video}
                onChange={(ficheiro) => setData('video', ficheiro ?? '')}
                error={errors.video}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="ordem" label="Ordem" error={errors.ordem}>
                    <Input
                        id="ordem"
                        type="number"
                        min={0}
                        value={data.ordem}
                        onChange={(event) =>
                            setData('ordem', Number(event.target.value))
                        }
                    />
                </Field>

                <BooleanField
                    label="Ativo"
                    checked={data.ativo}
                    onCheckedChange={(checked) => setData('ativo', checked)}
                    className="mt-6"
                />
            </div>
        </CrudDialog>
    );
}
