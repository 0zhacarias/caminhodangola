import { useForm } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import AutocompleteSelect from '@/components/admin/autocomplete-select';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Option, PerguntaFrequente } from '@/types/admin';

export default function PerguntaFrequenteDialog({
    item,
    onClose,
    categorias,
}: {
    item: PerguntaFrequente | null;
    onClose: () => void;
    categorias: Option[];
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        categoria: item?.categoria ?? '',
        pergunta: item?.pergunta ?? '',
        resposta: item?.resposta ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const categoriaForm = useForm({ nome: '' });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/perguntas-frequentes/${item.id}`, options);
        } else {
            post('/admin/perguntas-frequentes', options);
        }
    };

    const criarCategoria = (nome: string) => {
        categoriaForm.setData('nome', nome);
        categoriaForm.post('/admin/categorias-perguntas-frequentes', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setData('categoria', nome),
        });
    };

    return (
        <CrudDialog
            title={
                item ? 'Editar pergunta frequente' : 'Nova pergunta frequente'
            }
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="categoria">Categoria</Label>
                        <a
                            href="https://emojipedia.org/pt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                        >
                            <ExternalLink className="size-3" />
                            Procurar emoji
                        </a>
                    </div>
                    <AutocompleteSelect
                        id="categoria"
                        value={data.categoria}
                        onChange={(value) => setData('categoria', value)}
                        options={categorias}
                        placeholder="(categoria 🔑, 🏠)"
                        onCreate={criarCategoria}
                        createLabel={(nome) => `Criar categoria "${nome}"`}
                        createProcessing={categoriaForm.processing}
                    />
                    <InputError
                        className="mt-0"
                        message={errors.categoria ?? categoriaForm.errors.nome}
                    />
                </div>

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

            <Field id="pergunta" label="Pergunta" error={errors.pergunta}>
                <Input
                    id="pergunta"
                    value={data.pergunta}
                    onChange={(event) =>
                        setData('pergunta', event.target.value)
                    }
                    required
                />
            </Field>

            <Field id="resposta" label="Resposta" error={errors.resposta}>
                <Textarea
                    id="resposta"
                    value={data.resposta}
                    onChange={(event) =>
                        setData('resposta', event.target.value)
                    }
                    required
                />
            </Field>

            <BooleanField
                label="Ativa"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
