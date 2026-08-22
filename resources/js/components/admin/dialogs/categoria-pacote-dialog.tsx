import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CategoriaPacote } from '@/types/admin';

export default function CategoriaPacoteDialog({
    item,
    onClose,
}: {
    item: CategoriaPacote | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        nome: item?.nome ?? '',
        slug: item?.slug ?? '',
        descricao: item?.descricao ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/categorias-pacotes/${item.slug}`, options);
        } else {
            post('/admin/categorias-pacotes', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar categoria' : 'Nova categoria'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="nome" label="Nome" error={errors.nome}>
                    <Input
                        id="nome"
                        value={data.nome}
                        onChange={(event) =>
                            setData('nome', event.target.value)
                        }
                        required
                    />
                </Field>

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
            </div>

            <Field id="descricao" label="Descrição" error={errors.descricao}>
                <Textarea
                    id="descricao"
                    value={data.descricao}
                    onChange={(event) =>
                        setData('descricao', event.target.value)
                    }
                />
            </Field>

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
                    label="Ativa"
                    checked={data.ativo}
                    onCheckedChange={(checked) => setData('ativo', checked)}
                    className="mt-6"
                />
            </div>
        </CrudDialog>
    );
}
