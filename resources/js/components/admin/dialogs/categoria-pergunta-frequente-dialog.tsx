import { useForm } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CategoriaPerguntaFrequente } from '@/types/admin';

export default function CategoriaPerguntaFrequenteDialog({
    item,
    onClose,
}: {
    item: CategoriaPerguntaFrequente | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        nome: item?.nome ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/categorias-perguntas-frequentes/${item.id}`, options);
        } else {
            post('/admin/categorias-perguntas-frequentes', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar categoria' : 'Nova categoria'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="nome">Nome</Label>
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
                    <Input
                        id="nome"
                        value={data.nome}
                        onChange={(event) =>
                            setData('nome', event.target.value)
                        }
                        placeholder="🔑 Reservas"
                        required
                    />
                    <InputError className="mt-0" message={errors.nome} />
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

            <BooleanField
                label="Ativa"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
