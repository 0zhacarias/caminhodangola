import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import ImageUpload, {
    ImageUploadMultiple,
} from '@/components/admin/image-upload';
import { Input } from '@/components/ui/input';
import type { Galeria } from '@/types/admin';

export default function GaleriaDialog({
    item,
    onClose,
}: {
    item: Galeria | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        imagens: File[];
        imagem: string | File;
        alt: string;
        ordem: number;
        ativo: boolean;
    }>({
        imagens: [],
        imagem: item?.imagem ?? '',
        alt: item?.alt ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/galerias/${item.id}`, options);
        } else {
            post('/admin/galerias', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar imagem' : 'Novas imagens'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            {item ? (
                <ImageUpload
                    id="imagem"
                    label="Imagem"
                    value={data.imagem}
                    onChange={(ficheiro) => setData('imagem', ficheiro ?? '')}
                    error={errors.imagem}
                />
            ) : (
                <ImageUploadMultiple
                    id="imagens"
                    label="Imagens"
                    values={data.imagens}
                    onChange={(ficheiros) => setData('imagens', ficheiros)}
                    error={errors.imagens}
                />
            )}

            {item && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                        id="alt"
                        label="Texto alternativo"
                        error={errors.alt}
                    >
                        <Input
                            id="alt"
                            value={data.alt}
                            onChange={(event) =>
                                setData('alt', event.target.value)
                            }
                        />
                    </Field>

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
            )}

            <BooleanField
                label={item ? 'Ativa' : 'Ativas'}
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
