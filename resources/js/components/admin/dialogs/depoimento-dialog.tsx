import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Depoimento } from '@/types/admin';

export default function DepoimentoDialog({
    item,
    onClose,
}: {
    item: Depoimento | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        nome: item?.nome ?? '',
        localizacao: item?.localizacao ?? '',
        mensagem: item?.mensagem ?? '',
        avaliacao: item?.avaliacao ?? 5,
        destaque: item?.destaque ?? false,
        ordem: item?.ordem ?? 0,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/depoimentos/${item.id}`, options);
        } else {
            post('/admin/depoimentos', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar depoimento' : 'Novo depoimento'}
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

                <Field
                    id="localizacao"
                    label="Localização"
                    error={errors.localizacao}
                >
                    <Input
                        id="localizacao"
                        value={data.localizacao}
                        onChange={(event) =>
                            setData('localizacao', event.target.value)
                        }
                    />
                </Field>
            </div>

            <Field id="mensagem" label="Mensagem" error={errors.mensagem}>
                <Textarea
                    id="mensagem"
                    value={data.mensagem}
                    onChange={(event) =>
                        setData('mensagem', event.target.value)
                    }
                    required
                />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field
                    id="avaliacao"
                    label="Avaliação"
                    error={errors.avaliacao}
                >
                    <Select
                        value={String(data.avaliacao)}
                        onValueChange={(value) =>
                            setData('avaliacao', Number(value))
                        }
                    >
                        <SelectTrigger id="avaliacao" className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 4, 3, 2, 1].map((valor) => (
                                <SelectItem key={valor} value={String(valor)}>
                                    {valor} estrela{valor > 1 ? 's' : ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                label="Destacado na página de avaliações"
                checked={data.destaque}
                onCheckedChange={(checked) => setData('destaque', checked)}
            />
        </CrudDialog>
    );
}
