import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import ImageUpload from '@/components/admin/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Seccao } from '@/types/admin';

export default function SeccaoDialog({
    item,
    onClose,
}: {
    item: Seccao | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        slug: string;
        titulo: string;
        sobretitulo: string;
        introducao: string;
        conteudo: string;
        imagem: string | File;
        ordem: number;
        ativo: boolean;
    }>({
        slug: item?.slug ?? '',
        titulo: item?.titulo ?? '',
        sobretitulo: item?.sobretitulo ?? '',
        introducao: item?.introducao ?? '',
        conteudo:
            item?.conteudo != null
                ? JSON.stringify(item.conteudo, null, 2)
                : '',
        imagem: item?.imagem ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/seccoes/${item.slug}`, options);
        } else {
            post('/admin/seccoes', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar secção' : 'Nova secção'}
            description="O campo de conteúdo aceita JSON válido."
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="slug" label="Slug" error={errors.slug}>
                    <Input
                        id="slug"
                        value={data.slug}
                        onChange={(event) =>
                            setData('slug', event.target.value)
                        }
                        required
                    />
                </Field>

                <Field id="titulo" label="Título" error={errors.titulo}>
                    <Input
                        id="titulo"
                        value={data.titulo}
                        onChange={(event) =>
                            setData('titulo', event.target.value)
                        }
                    />
                </Field>
            </div>

            <Field
                id="sobretitulo"
                label="Sobretítulo"
                error={errors.sobretitulo}
            >
                <Input
                    id="sobretitulo"
                    value={data.sobretitulo}
                    onChange={(event) =>
                        setData('sobretitulo', event.target.value)
                    }
                />
            </Field>

            <Field id="introducao" label="Introdução" error={errors.introducao}>
                <Textarea
                    id="introducao"
                    value={data.introducao}
                    onChange={(event) =>
                        setData('introducao', event.target.value)
                    }
                />
            </Field>

            <Field
                id="conteudo"
                label="Conteúdo (JSON)"
                error={errors.conteudo}
            >
                <Textarea
                    id="conteudo"
                    value={data.conteudo}
                    onChange={(event) =>
                        setData('conteudo', event.target.value)
                    }
                    className="font-mono text-xs"
                />
            </Field>

            <ImageUpload
                id="imagem"
                label="Imagem"
                value={data.imagem}
                onChange={(ficheiro) => setData('imagem', ficheiro ?? '')}
                error={errors.imagem}
            />

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
                label="Ativa"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
