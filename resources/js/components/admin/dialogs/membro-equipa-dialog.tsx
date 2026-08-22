import { useForm } from '@inertiajs/react';
import CrudDialog from '@/components/admin/dialogs/crud-dialog';
import { BooleanField, Field } from '@/components/admin/form-field';
import ImageUpload from '@/components/admin/image-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { MembroEquipa } from '@/types/admin';

export default function MembroEquipaDialog({
    item,
    onClose,
}: {
    item: MembroEquipa | null;
    onClose: () => void;
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        nome: string;
        cargo: string;
        bio: string;
        foto: string | File;
        linkedin: string;
        instagram: string;
        telefone: string;
        email: string;
        ordem: number;
        ativo: boolean;
    }>({
        nome: item?.nome ?? '',
        cargo: item?.cargo ?? '',
        bio: item?.bio ?? '',
        foto: item?.foto ?? '',
        linkedin: item?.linkedin ?? '',
        instagram: item?.instagram ?? '',
        telefone: item?.telefone ?? '',
        email: item?.email ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = { preserveScroll: true, onSuccess: onClose };

        if (item) {
            put(`/admin/membros-equipa/${item.id}`, options);
        } else {
            post('/admin/membros-equipa', options);
        }
    };

    return (
        <CrudDialog
            title={item ? 'Editar membro da equipa' : 'Novo membro da equipa'}
            onClose={onClose}
            onSubmit={submit}
            processing={processing}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="nome" label="Nome" error={errors.nome}>
                    <Input
                        id="nome"
                        value={data.nome}
                        onChange={(event) =>
                            setData('nome', event.target.value)
                        }
                        required
                    />
                </Field>

                <Field id="cargo" label="Cargo" error={errors.cargo}>
                    <Input
                        id="cargo"
                        value={data.cargo}
                        onChange={(event) =>
                            setData('cargo', event.target.value)
                        }
                        required
                    />
                </Field>
            </div>

            <ImageUpload
                id="foto"
                label="Foto"
                value={data.foto}
                onChange={(ficheiro) => setData('foto', ficheiro ?? '')}
                error={errors.foto}
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

            <Field id="bio" label="Biografia" error={errors.bio}>
                <Textarea
                    id="bio"
                    value={data.bio}
                    onChange={(event) => setData('bio', event.target.value)}
                />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="linkedin" label="LinkedIn" error={errors.linkedin}>
                    <Input
                        id="linkedin"
                        type="url"
                        value={data.linkedin}
                        onChange={(event) =>
                            setData('linkedin', event.target.value)
                        }
                    />
                </Field>

                <Field
                    id="instagram"
                    label="Instagram"
                    error={errors.instagram}
                >
                    <Input
                        id="instagram"
                        type="url"
                        value={data.instagram}
                        onChange={(event) =>
                            setData('instagram', event.target.value)
                        }
                    />
                </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="telefone" label="Telefone" error={errors.telefone}>
                    <Input
                        id="telefone"
                        value={data.telefone}
                        onChange={(event) =>
                            setData('telefone', event.target.value)
                        }
                    />
                </Field>

                <Field id="email" label="E-mail" error={errors.email}>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(event) =>
                            setData('email', event.target.value)
                        }
                    />
                </Field>
            </div>

            <BooleanField
                label="Ativo"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />
        </CrudDialog>
    );
}
