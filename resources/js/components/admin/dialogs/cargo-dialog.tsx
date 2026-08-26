import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import type { Cargo } from '@/types/admin';

export default function CargoDialog({
    item,
    onClose,
}: {
    item: Cargo | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        nome: item?.nome ?? '',
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/cargos/${item.id}`, options);
        } else {
            post('/admin/cargos', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar cargo' : 'Novo cargo'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <Field id="nome" label="Nome" error={errors.nome}>
                <Input
                    id="nome"
                    value={data.nome}
                    onChange={(event) => setData('nome', event.target.value)}
                    required
                />
            </Field>

            <BooleanField
                label="Ativo"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
