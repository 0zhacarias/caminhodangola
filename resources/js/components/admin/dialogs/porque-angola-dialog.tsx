import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import ImageUpload from '@/components/admin/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PorqueAngola } from '@/types/admin';

export default function PorqueAngolaDialog({
    item,
    onClose,
}: {
    item: PorqueAngola | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        titulo: string;
        descricao: string;
        imagem: string | File;
        ordem: number;
        ativo: boolean;
    }>({
        titulo: item?.titulo ?? '',
        descricao: item?.descricao ?? '',
        imagem: item?.imagem ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/porques-angola/${item.id}`, options);
        } else {
            post('/admin/porques-angola', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar item' : 'Novo item'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <Field id="titulo" label="Título" error={errors.titulo}>
                <Input
                    id="titulo"
                    value={data.titulo}
                    onChange={(event) => setData('titulo', event.target.value)}
                    required
                />
            </Field>

            <Field id="descricao" label="Descrição" error={errors.descricao}>
                <Textarea
                    id="descricao"
                    value={data.descricao}
                    onChange={(event) =>
                        setData('descricao', event.target.value)
                    }
                    rows={8}
                    required
                />
            </Field>

            <ImageUpload
                id="imagem"
                label="Imagem"
                value={data.imagem}
                onChange={(ficheiro) => setData('imagem', ficheiro ?? '')}
                error={errors.imagem}
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
