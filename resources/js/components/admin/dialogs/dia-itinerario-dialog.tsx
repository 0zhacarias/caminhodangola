import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { Field } from '@/components/admin/form-field';
import ImageUpload from '@/components/admin/image-upload';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { DiaItinerario, Option } from '@/types/admin';

export default function DiaItinerarioDialog({
    item,
    pacotes,
    onClose,
    preservarEstado = false,
}: {
    item: DiaItinerario | null;
    pacotes: Option[];
    onClose: () => void;
    preservarEstado?: boolean;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        pacote_id: number | string;
        rotulo_dia: string;
        titulo: string;
        descricao: string;
        imagem: string | File;
        ordem: number;
    }>({
        pacote_id: item?.pacote_id ?? pacotes[0]?.value ?? '',
        rotulo_dia: item?.rotulo_dia ?? '',
        titulo: item?.titulo ?? '',
        descricao: item?.descricao ?? '',
        imagem: item?.imagem ?? '',
        ordem: item?.ordem ?? 0,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            preserveState: preservarEstado,
            onSuccess: onClose,
        };

        if (item) {
            put(`/admin/dias-itinerario/${item.id}`, options);
        } else {
            post('/admin/dias-itinerario', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar dia de itinerário' : 'Novo dia de itinerário'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <Field id="pacote_id" label="Pacote" error={errors.pacote_id}>
                <Select
                    value={String(data.pacote_id)}
                    onValueChange={(value) =>
                        setData('pacote_id', Number(value))
                    }
                >
                    <SelectTrigger id="pacote_id" className="w-full">
                        <SelectValue placeholder="Selecionar pacote" />
                    </SelectTrigger>
                    <SelectContent>
                        {pacotes.map((pacote) => (
                            <SelectItem
                                key={pacote.value}
                                value={String(pacote.value)}
                            >
                                {pacote.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field
                    id="rotulo_dia"
                    label="Rótulo do dia"
                    error={errors.rotulo_dia}
                >
                    <Input
                        id="rotulo_dia"
                        value={data.rotulo_dia}
                        onChange={(event) =>
                            setData('rotulo_dia', event.target.value)
                        }
                        placeholder="Dia 1"
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
        </CrudDialog>
    );
}
