import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Configuracao } from '@/types/admin';

export default function ConfiguracaoDialog({
    item,
    onClose,
}: {
    item: Configuracao | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        chave: item?.chave ?? '',
        valor: item?.valor ?? '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/configuracoes/${item.id}`, options);
        } else {
            post('/admin/configuracoes', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar configuração' : 'Nova configuração'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <Field id="chave" label="Chave" error={errors.chave}>
                <Input
                    id="chave"
                    value={data.chave}
                    onChange={(event) => setData('chave', event.target.value)}
                    required
                />
            </Field>

            <Field id="valor" label="Valor" error={errors.valor}>
                <Textarea
                    id="valor"
                    value={data.valor}
                    onChange={(event) => setData('valor', event.target.value)}
                />
            </Field>
        </CrudDialog>
    );
}
