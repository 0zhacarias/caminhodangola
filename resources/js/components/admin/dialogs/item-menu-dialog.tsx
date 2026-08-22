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
import type { ItemMenu, Option } from '@/types/admin';

export default function ItemMenuDialog({
    item,
    pais,
    onClose,
}: {
    item: ItemMenu | null;
    pais: Option[];
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors, transform } = useForm(
        {
            pai_id: item?.pai_id ?? '',
            rotulo: item?.rotulo ?? '',
            rota: item?.rota ?? '',
            ordem: item?.ordem ?? 0,
            ativo: item?.ativo ?? true,
        },
    );

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        transform((data) => ({
            ...data,
            pai_id: data.pai_id === '' ? null : Number(data.pai_id),
        }));

        if (item) {
            put(`/admin/itens-menu/${item.id}`, options);
        } else {
            post('/admin/itens-menu', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar item de menu' : 'Novo item de menu'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <Field id="pai_id" label="Item pai" error={errors.pai_id}>
                <Select
                    value={
                        data.pai_id === '' || data.pai_id == null
                            ? 'none'
                            : String(data.pai_id)
                    }
                    onValueChange={(value) =>
                        setData('pai_id', value === 'none' ? '' : value)
                    }
                >
                    <SelectTrigger id="pai_id" className="w-full">
                        <SelectValue placeholder="Sem item pai" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Sem item pai</SelectItem>
                        {pais
                            .filter((pai) => pai.value !== item?.id)
                            .map((pai) => (
                                <SelectItem
                                    key={pai.value}
                                    value={String(pai.value)}
                                >
                                    {pai.label}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="rotulo" label="Rótulo" error={errors.rotulo}>
                    <Input
                        id="rotulo"
                        value={data.rotulo}
                        onChange={(event) =>
                            setData('rotulo', event.target.value)
                        }
                        placeholder="Pacotes"
                        required
                    />
                </Field>

                <Field id="rota" label="Rota" error={errors.rota}>
                    <Input
                        id="rota"
                        value={data.rota}
                        onChange={(event) =>
                            setData('rota', event.target.value)
                        }
                        placeholder="/pacotes"
                        required
                    />
                </Field>
            </div>

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
