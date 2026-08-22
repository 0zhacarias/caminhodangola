import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { Field } from '@/components/admin/form-field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { reservaEstadoLabel, reservaEstados } from '@/types/admin';
import type { Reserva } from '@/types/admin';

export default function ReservaDialog({
    item,
    onClose,
}: {
    item: Reserva;
    onClose: () => void;
}) {
    const { data, setData, put, processing, errors } = useForm({
        estado: item.estado,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(`/admin/reservas/${item.id}`, {
            preserveScroll: true,
            onSuccess: onClose,
        });
    };

    return (
        <CrudDialog
            title="Reserva"
            description={`Recebida em ${new Date(item.created_at ?? '').toLocaleString('pt-PT')}`}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="nome" label="Nome">
                    <Input id="nome" value={item.nome} readOnly />
                </Field>

                <Field id="email" label="E-mail">
                    <Input id="email" value={item.email} readOnly />
                </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <Field id="telefone" label="Telefone">
                    <Input
                        id="telefone"
                        value={item.telefone ?? '—'}
                        readOnly
                    />
                </Field>

                <Field id="pacote" label="Pacote">
                    <Input
                        id="pacote"
                        value={item.pacote?.titulo ?? '—'}
                        readOnly
                    />
                </Field>

                <Field id="data_pretendida" label="Data pretendida">
                    <Input
                        id="data_pretendida"
                        value={item.data_pretendida ?? '—'}
                        readOnly
                    />
                </Field>
            </div>

            <Field id="numero_viajantes" label="Nº de viajantes">
                <Input
                    id="numero_viajantes"
                    value={item.numero_viajantes}
                    readOnly
                />
            </Field>

            {item.mensagem && (
                <Field id="mensagem" label="Mensagem">
                    <Textarea id="mensagem" value={item.mensagem} readOnly />
                </Field>
            )}

            <Field id="estado" label="Estado" error={errors.estado}>
                <Select
                    value={data.estado}
                    onValueChange={(value) => setData('estado', value)}
                >
                    <SelectTrigger id="estado" className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {reservaEstados.map((estado) => (
                            <SelectItem key={estado.value} value={estado.value}>
                                {estado.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            {item.estado !== data.estado && (
                <p className="text-xs text-muted-foreground">
                    Estado atual: {reservaEstadoLabel(item.estado)}
                </p>
            )}
        </CrudDialog>
    );
}
