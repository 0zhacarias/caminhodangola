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
import type { Option, TourPrivado, TourPrivadoTipo } from '@/types/admin';

const TIPOS: { value: TourPrivadoTipo; label: string }[] = [
    { value: 'cabecalho', label: 'Cabeçalho da secção' },
    { value: 'destaque', label: 'Destaque' },
    { value: 'cta_whatsapp', label: 'Botão WhatsApp' },
    { value: 'cta_email', label: 'Botão Email' },
];

export const TOUR_PRIVADO_TIPO_LABEL: Record<TourPrivadoTipo, string> = {
    cabecalho: 'Cabeçalho',
    destaque: 'Destaque',
    cta_whatsapp: 'WhatsApp',
    cta_email: 'Email',
};

const OPCOES_ICONES: Option[] = DYNAMIC_ICONS.map((icone) => ({
    value: icone.value,
    label: icone.label,
}));

export default function TourPrivadoDialog({
    item,
    onClose,
}: {
    item: TourPrivado | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        tipo: (item?.tipo ?? 'destaque') as TourPrivadoTipo,
        titulo: item?.titulo ?? '',
        descricao: item?.descricao ?? '',
        icone: item?.icone ?? '',
        link: item?.link ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const ehCta = data.tipo === 'cta_whatsapp' || data.tipo === 'cta_email';
    const usaIcone = data.tipo === 'destaque';

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/tours-privados/${item.id}`, options);
        } else {
            post('/admin/tours-privados', options);
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
                        setData('tipo', value as TourPrivadoTipo)
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
                label={ehCta ? 'Rótulo do botão' : 'Título'}
                error={errors.titulo}
            >
                <Input
                    id="titulo"
                    value={data.titulo}
                    onChange={(event) => setData('titulo', event.target.value)}
                    required
                />
            </Field>

            <Field
                id="descricao"
                label={ehCta ? 'Mensagem' : 'Descrição'}
                error={errors.descricao}
            >
                <Textarea
                    id="descricao"
                    value={data.descricao}
                    onChange={(event) =>
                        setData('descricao', event.target.value)
                    }
                    required
                />
            </Field>

            {ehCta && (
                <Field
                    id="link"
                    label={
                        data.tipo === 'cta_whatsapp'
                            ? 'Número (WhatsApp)'
                            : 'Email'
                    }
                    error={errors.link}
                >
                    <Input
                        id="link"
                        value={data.link}
                        onChange={(event) =>
                            setData('link', event.target.value)
                        }
                        placeholder={
                            data.tipo === 'cta_whatsapp'
                                ? '+244 923 469 271'
                                : 'info@exemplo.com'
                        }
                        required
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
