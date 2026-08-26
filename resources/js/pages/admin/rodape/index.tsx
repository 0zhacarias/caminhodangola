import { Head, useForm } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { BooleanField, Field } from '@/components/admin/form-field';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes/admin';
import { edit, update } from '@/routes/admin/rodape';

interface RodapeFormData {
    slogan: string;
    endereco: string;
    email_contato: string;
    telefone_principal: string;
    telefone_secundario: string;
    horario_funcionamento: string;
    instagram: string;
    instagram_ativo: boolean;
    facebook: string;
    facebook_ativo: boolean;
    twitter: string;
    twitter_ativo: boolean;
    youtube: string;
    youtube_ativo: boolean;
}

function Section({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <section className="grid gap-4 rounded-xl border p-6">
            <div>
                <h2 className="text-base font-semibold">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </section>
    );
}

function RedeSocial({
    nome,
    erroUrl,
    erroAtivo,
    url,
    setUrl,
    ativo,
    setAtivo,
}: {
    nome: string;
    erroUrl?: string;
    erroAtivo?: string;
    url: string;
    setUrl: (valor: string) => void;
    ativo: boolean;
    setAtivo: (valor: boolean) => void;
}) {
    return (
        <div className="grid gap-2 rounded-lg border p-4">
            <Label htmlFor={nome}>URL do {nome}</Label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                    id={nome}
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder={`https://${nome}.com/...`}
                    className="sm:flex-1"
                />

                <BooleanField
                    label="Visível no rodapé"
                    checked={ativo}
                    onCheckedChange={setAtivo}
                    className="sm:self-center"
                />
            </div>

            <InputError className="mt-0" message={erroUrl} />

            {erroAtivo && (
                <p className="text-sm text-destructive">{erroAtivo}</p>
            )}
        </div>
    );
}

export default function Index({
    rodape,
}: {
    rodape: Record<string, string | null>;
}) {
    const { data, setData, put, processing, errors } = useForm<RodapeFormData>({
        slogan: rodape.slogan ?? '',
        endereco: rodape.endereco ?? '',
        email_contato: rodape.email_contato ?? '',
        telefone_principal: rodape.telefone_principal ?? '',
        telefone_secundario: rodape.telefone_secundario ?? '',
        horario_funcionamento: rodape.horario_funcionamento ?? '',
        instagram: rodape.instagram ?? '',
        instagram_ativo: rodape.instagram_ativo !== '0',
        facebook: rodape.facebook ?? '',
        facebook_ativo: rodape.facebook_ativo !== '0',
        twitter: rodape.twitter ?? '',
        twitter_ativo: rodape.twitter_ativo !== '0',
        youtube: rodape.youtube ?? '',
        youtube_ativo: rodape.youtube_ativo !== '0',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(update().url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <Head title="Rodapé" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <Heading
                        variant="small"
                        title="Rodapé"
                        description="Editar o conteúdo do rodapé apresentado no portal. Os campos vazios usam os valores por omissão."
                    />
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    <Section title="Slogan">
                        <Field id="slogan" label="Slogan" error={errors.slogan}>
                            <Input
                                id="slogan"
                                value={data.slogan}
                                onChange={(event) =>
                                    setData('slogan', event.target.value)
                                }
                                placeholder="Angola Tourism – Travel different"
                            />
                        </Field>
                    </Section>

                    <Section title="Address">
                        <Field
                            id="endereco"
                            label="Morada"
                            error={errors.endereco}
                        >
                            <Textarea
                                id="endereco"
                                value={data.endereco}
                                onChange={(event) =>
                                    setData('endereco', event.target.value)
                                }
                                placeholder={
                                    'Comandante Jica Street, near the Moçâmedes Hotel\nNamibe - Angola'
                                }
                                rows={3}
                            />
                            <p className="text-xs text-muted-foreground">
                                As quebras de linha são mantidas no portal.
                            </p>
                        </Field>
                    </Section>

                    <Section title="Get In Touch">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="email_contato"
                                label="E-mail de contacto"
                                error={errors.email_contato}
                            >
                                <Input
                                    id="email_contato"
                                    type="email"
                                    value={data.email_contato}
                                    onChange={(event) =>
                                        setData(
                                            'email_contato',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="geral@caminhosdangola.com"
                                />
                            </Field>

                            <Field
                                id="horario_funcionamento"
                                label="Horário de funcionamento"
                                error={errors.horario_funcionamento}
                            >
                                <Input
                                    id="horario_funcionamento"
                                    value={data.horario_funcionamento}
                                    onChange={(event) =>
                                        setData(
                                            'horario_funcionamento',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="08:00 AM – 17:00 PM"
                                />
                            </Field>

                            <Field
                                id="telefone_principal"
                                label="Telefone principal"
                                error={errors.telefone_principal}
                            >
                                <Input
                                    id="telefone_principal"
                                    value={data.telefone_principal}
                                    onChange={(event) =>
                                        setData(
                                            'telefone_principal',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="(+244) 923 469 271"
                                />
                            </Field>

                            <Field
                                id="telefone_secundario"
                                label="Telefone secundário"
                                error={errors.telefone_secundario}
                            >
                                <Input
                                    id="telefone_secundario"
                                    value={data.telefone_secundario}
                                    onChange={(event) =>
                                        setData(
                                            'telefone_secundario',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="(+244) 942 381 493"
                                />
                            </Field>
                        </div>
                    </Section>

                    <Section
                        title="Follow Us"
                        description="Redes sociais apresentadas no rodapé. Só são mostradas as que têm URL preenchido e estão visíveis."
                    >
                        <div className="grid gap-4">
                            <RedeSocial
                                nome="instagram"
                                erroUrl={errors.instagram}
                                url={data.instagram}
                                setUrl={(valor) => setData('instagram', valor)}
                                ativo={data.instagram_ativo}
                                setAtivo={(valor) =>
                                    setData('instagram_ativo', valor)
                                }
                            />

                            <RedeSocial
                                nome="facebook"
                                erroUrl={errors.facebook}
                                url={data.facebook}
                                setUrl={(valor) => setData('facebook', valor)}
                                ativo={data.facebook_ativo}
                                setAtivo={(valor) =>
                                    setData('facebook_ativo', valor)
                                }
                            />

                            <RedeSocial
                                nome="twitter"
                                erroUrl={errors.twitter}
                                url={data.twitter}
                                setUrl={(valor) => setData('twitter', valor)}
                                ativo={data.twitter_ativo}
                                setAtivo={(valor) =>
                                    setData('twitter_ativo', valor)
                                }
                            />

                            <RedeSocial
                                nome="youtube"
                                erroUrl={errors.youtube}
                                url={data.youtube}
                                setUrl={(valor) => setData('youtube', valor)}
                                ativo={data.youtube_ativo}
                                setAtivo={(valor) =>
                                    setData('youtube_ativo', valor)
                                }
                            />
                        </div>
                    </Section>

                    <div className="flex items-center justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            <SaveIcon />
                            {processing ? 'A guardar...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Rodapé',
            href: edit(),
        },
    ],
};
