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
import type { GaleriaPacote, Option } from '@/types/admin';

export default function GaleriaPacoteDialog({
    item,
    pacotes,
    onClose,
}: {
    item: GaleriaPacote | null;
    pacotes: Option[];
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        pacote_id: number | string;
        imagem: string | File;
        ordem: number;
    }>({
        pacote_id: item?.pacote_id ?? pacotes[0]?.value ?? '',
        imagem: item?.imagem ?? '',
        ordem: item?.ordem ?? 0,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/galerias-pacotes/${item.id}`, options);
        } else {
            post('/admin/galerias-pacotes', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar imagem do pacote' : 'Nova imagem do pacote'}
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
