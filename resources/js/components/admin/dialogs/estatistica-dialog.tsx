import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import type { Estatistica } from '@/types/admin';

export default function EstatisticaDialog({
    item,
    onClose,
}: {
    item: Estatistica | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        rotulo: item?.rotulo ?? '',
        valor: item?.valor ?? '',
        icone: item?.icone ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/estatisticas/${item.id}`, options);
        } else {
            post('/admin/estatisticas', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar estatística' : 'Nova estatística'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="rotulo" label="Rótulo" error={errors.rotulo}>
                    <Input
                        id="rotulo"
                        value={data.rotulo}
                        onChange={(event) =>
                            setData('rotulo', event.target.value)
                        }
                        placeholder="Destinos"
                        required
                    />
                </Field>

                <Field id="valor" label="Valor" error={errors.valor}>
                    <Input
                        id="valor"
                        value={data.valor}
                        onChange={(event) =>
                            setData('valor', event.target.value)
                        }
                        placeholder="50+"
                        required
                    />
                </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="icone" label="Ícone" error={errors.icone}>
                    <Input
                        id="icone"
                        value={data.icone}
                        onChange={(event) =>
                            setData('icone', event.target.value)
                        }
                        placeholder="lucide:map"
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

            <BooleanField
                label="Ativa"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
