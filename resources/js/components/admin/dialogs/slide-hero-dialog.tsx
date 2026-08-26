import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
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
import type { SlideHero } from '@/types/admin';

export default function SlideHeroDialog({
    item,
    paginas,
    onClose,
}: {
    item: SlideHero | null;
    paginas: Record<string, string>;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        pagina: string;
        imagem: string | File;
        titulo: string;
        subtitulo: string;
        texto: string;
        botao_rotulo: string;
        botao_url: string;
        ordem: number;
        ativo: boolean;
    }>({
        pagina: item?.pagina ?? 'home',
        imagem: item?.imagem ?? '',
        titulo: item?.titulo ?? '',
        subtitulo: item?.subtitulo ?? '',
        texto: item?.texto ?? '',
        botao_rotulo: item?.botao_rotulo ?? '',
        botao_url: item?.botao_url ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/slides-hero/${item.id}`, options);
        } else {
            post('/admin/slides-hero', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar slide' : 'Novo slide'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="titulo" label="Título" error={errors.titulo}>
                    <Input
                        id="titulo"
                        value={data.titulo}
                        onChange={(event) =>
                            setData('titulo', event.target.value)
                        }
                    />
                </Field>

                <Field id="pagina" label="Página" error={errors.pagina}>
                    <Select
                        value={data.pagina}
                        onValueChange={(value) => setData('pagina', value)}
                        required
                    >
                        <SelectTrigger id="pagina" className="w-full">
                            <SelectValue placeholder="Seleciona a página" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(paginas).map(([valor, rotulo]) => (
                                <SelectItem key={valor} value={valor}>
                                    {rotulo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </div>

            <Field id="subtitulo" label="Subtítulo" error={errors.subtitulo}>
                <Input
                    id="subtitulo"
                    value={data.subtitulo}
                    onChange={(event) =>
                        setData('subtitulo', event.target.value)
                    }
                />
            </Field>

            <ImageUpload
                id="imagem"
                label="Imagem"
                value={data.imagem}
                onChange={(ficheiro) => setData('imagem', ficheiro ?? '')}
                error={errors.imagem}
            />

            <Field id="texto" label="Texto" error={errors.texto}>
                <Textarea
                    id="texto"
                    value={data.texto}
                    onChange={(event) => setData('texto', event.target.value)}
                />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field
                    id="botao_rotulo"
                    label="Nome do botão"
                    error={errors.botao_rotulo}
                >
                    <Input
                        id="botao_rotulo"
                        value={data.botao_rotulo}
                        onChange={(event) =>
                            setData('botao_rotulo', event.target.value)
                        }
                        placeholder="Reserve"
                    />
                </Field>

                <Field
                    id="botao_url"
                    label="Link do botão"
                    error={errors.botao_url}
                >
                    <Input
                        id="botao_url"
                        value={data.botao_url}
                        onChange={(event) =>
                            setData('botao_url', event.target.value)
                        }
                        placeholder="https://wa.me/... ou /pacotes"
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
