import { useForm } from '@inertiajs/react';
import AvatarUpload from '@/components/admin/avatar-upload';
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
import type { Cargo, MembroEquipa } from '@/types/admin';

export default function MembroEquipaDialog({
    item,
    onClose,
    cargos,
}: {
    item: MembroEquipa | null;
    onClose: () => void;
    cargos: Cargo[];
}) {
    const { data, setData, post, put, processing, errors } = useForm<{
        nome: string;
        cargo_id: string;
        bio: string;
        foto: string | File;
        linkedin: string;
        instagram: string;
        telefone: string;
        email: string;
        ordem: number;
        ativo: boolean;
        permitir_login: boolean;
    }>({
        nome: item?.nome ?? '',
        cargo_id: item?.cargo_id !== null ? String(item?.cargo_id) : '',
        bio: item?.bio ?? '',
        foto: item?.foto ?? '',
        linkedin: item?.linkedin ?? '',
        instagram: item?.instagram ?? '',
        telefone: item?.telefone ?? '',
        email: item?.email ?? '',
        ordem: item?.ordem ?? 0,
        ativo: item?.ativo ?? true,
        permitir_login: item?.user?.ativo ?? false,
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
            <AvatarUpload
                value={data.foto}
                onChange={(ficheiro) => setData('foto', ficheiro ?? '')}
                error={errors.foto}
                nome={data.nome}
            />

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

                <Field id="cargo_id" label="Cargo" error={errors.cargo_id}>
                    <Select
                        value={data.cargo_id}
                        onValueChange={(value) => setData('cargo_id', value)}
                    >
                        <SelectTrigger id="cargo_id" className="w-full">
                            <SelectValue placeholder="Selecionar cargo" />
                        </SelectTrigger>
                        <SelectContent>
                            {cargos.map((cargo) => (
                                <SelectItem
                                    key={cargo.id}
                                    value={String(cargo.id)}
                                >
                                    {cargo.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
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
                        required={data.permitir_login}
                    />
                </Field>
            </div>

            <BooleanField
                label="Ativo"
                checked={data.ativo}
                onCheckedChange={(checked) => setData('ativo', checked)}
            />

            <BooleanField
                label="Permitir acesso ao painel administrativo (e-mail obrigatório)"
                checked={data.permitir_login}
                onCheckedChange={(checked) =>
                    setData('permitir_login', checked)
                }
            />
        </CrudDialog>
    );
}
