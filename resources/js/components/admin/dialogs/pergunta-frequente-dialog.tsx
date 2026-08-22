import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PerguntaFrequente } from '@/types/admin';

export default function PerguntaFrequenteDialog({
    item,
    onClose,
}: {
    item: PerguntaFrequente | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        categoria: item?.categoria ?? '',
        pergunta: item?.pergunta ?? '',
        resposta: item?.resposta ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/perguntas-frequentes/${item.id}`, options);
        } else {
            post('/admin/perguntas-frequentes', options);
        }
    };

    return (
        <CrudDialog
            title={
                item ? 'Editar pergunta frequente' : 'Nova pergunta frequente'
            }
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field
                    id="categoria"
                    label="Categoria"
                    error={errors.categoria}
                >
                    <Input
                        id="categoria"
                        value={data.categoria}
                        onChange={(event) =>
                            setData('categoria', event.target.value)
                        }
                        placeholder="Reservas"
                        required
                    />
                </Field>

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
            </div>

            <Field id="pergunta" label="Pergunta" error={errors.pergunta}>
                <Input
                    id="pergunta"
                    value={data.pergunta}
                    onChange={(event) =>
                        setData('pergunta', event.target.value)
                    }
                    required
                />
            </Field>

            <Field id="resposta" label="Resposta" error={errors.resposta}>
                <Textarea
                    id="resposta"
                    value={data.resposta}
                    onChange={(event) =>
                        setData('resposta', event.target.value)
                    }
                    required
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
