import { useForm } from '@inertiajs/react';
import AutocompleteSelect from '@/components/admin/autocomplete-select';
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
import { DYNAMIC_ICONS, DynamicIcon } from '@/lib/dynamic-icons';
import type { Option, PorqueNos, PorqueNosTipo } from '@/types/admin';

const TIPOS: { value: PorqueNosTipo; label: string }[] = [
    { value: 'cabecalho', label: 'Cabeçalho da secção' },
    { value: 'destaque', label: 'Destaque' },
    { value: 'valor', label: 'Valor' },
];

export const PORQUE_NOS_TIPO_LABEL: Record<PorqueNosTipo, string> = {
    cabecalho: 'Cabeçalho',
    destaque: 'Destaque',
    valor: 'Valor',
};

const OPCOES_ICONES: Option[] = DYNAMIC_ICONS.map((icone) => ({
    value: icone.value,
    label: icone.label,
}));

export default function PorqueNosDialog({
    item,
    onClose,
}: {
    item: PorqueNos | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        tipo: (item?.tipo ?? 'destaque') as PorqueNosTipo,
        titulo: item?.titulo ?? '',
        descricao: item?.descricao ?? '',
        icone: item?.icone ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const usaDescricao = data.tipo !== 'valor';
    const usaIcone = data.tipo !== 'cabecalho';

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/porques-nos/${item.id}`, options);
        } else {
            post('/admin/porques-nos', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar item' : 'Novo item'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <Field id="tipo" label="Tipo" error={errors.tipo}>
                <Select
                    value={data.tipo}
                    onValueChange={(value) =>
                        setData('tipo', value as PorqueNosTipo)
                    }
                >
                    <SelectTrigger id="tipo" className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {TIPOS.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            <Field
                id="titulo"
                label={data.tipo === 'valor' ? 'Texto' : 'Título'}
                error={errors.titulo}
            >
                <Input
                    id="titulo"
                    value={data.titulo}
                    onChange={(event) => setData('titulo', event.target.value)}
                    required
                />
            </Field>

            {usaDescricao && (
                <Field
                    id="descricao"
                    label="Descrição"
                    error={errors.descricao}
                >
                    <Textarea
                        id="descricao"
                        value={data.descricao}
                        onChange={(event) =>
                            setData('descricao', event.target.value)
                        }
                        required={data.tipo === 'cabecalho'}
                    />
                </Field>
            )}

            {usaIcone && (
                <Field id="icone" label="Ícone" error={errors.icone}>
                    <div className="flex items-center gap-2">
                        <AutocompleteSelect
                            id="icone"
                            value={data.icone}
                            onChange={(value) => setData('icone', value)}
                            options={OPCOES_ICONES}
                            placeholder="Selecionar ícone"
                            className="flex-1"
                        />
                        <DynamicIcon
                            name={data.icone || null}
                            className="size-6 shrink-0 text-muted-foreground"
                        />
                    </div>
                </Field>
            )}

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
