import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { BooleanField, Field } from '@/components/admin/form-field';
import ImageUpload, {
    ImageUploadMultiple,
} from '@/components/admin/image-upload';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { storageUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/pacotes';
import type { Option, Pacote } from '@/types/admin';

const METODOS_PAGAMENTO = [
    'Transferência bancária',
    'Multicaixa Express',
    'Cartão de crédito',
    'PayPal',
    'Dinheiro',
];

interface PacoteFormData {
    categoria_pacote_id: string | number;
    slug: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    duracao: string;
    imagem: string | File;
    imagem_slide: string | File;
    preco_eur: string | number;
    rotulo_preco: string;
    preco_pacote_fotos_eur: string | number;
    avaliacao: string | number;
    incluidos: string;
    excluidos: string;
    o_que_levar: string;
    observacoes_importantes: string;
    ordem: number;
    ativo: boolean;
    meta_titulo: string;
    meta_descricao: string;
    imagem_og: string | File;
    galerias: File[];
    preco_base_por_pessoa: string | number;
    gasto_pessoal_estimado: string | number;
    deposito_percentagem: string | number;
    saldo_dias_antes_partida: string | number;
    metodos_pagamento: string[];
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

export default function Form({
    pacote,
    categorias,
}: {
    pacote: Pacote | null;
    categorias: Option[];
}) {
    const { data, setData, post, put, processing, errors, transform } =
        useForm<PacoteFormData>({
            categoria_pacote_id: pacote?.categoria_pacote_id ?? '',
            slug: pacote?.slug ?? '',
            titulo: pacote?.titulo ?? '',
            subtitulo: pacote?.subtitulo ?? '',
            descricao: pacote?.descricao ?? '',
            duracao: pacote?.duracao ?? '',
            imagem: pacote?.imagem ?? '',
            imagem_slide: pacote?.imagem_slide ?? '',
            preco_eur: pacote?.preco_eur ?? '',
            rotulo_preco: pacote?.rotulo_preco ?? '',
            preco_pacote_fotos_eur: pacote?.preco_pacote_fotos_eur ?? '',
            avaliacao: pacote?.avaliacao ?? '',
            incluidos: pacote?.incluidos?.join('\n') ?? '',
            excluidos: pacote?.excluidos?.join('\n') ?? '',
            o_que_levar: pacote?.o_que_levar?.join('\n') ?? '',
            observacoes_importantes:
                pacote?.observacoes_importantes?.join('\n') ?? '',
            ordem: pacote?.ordem ?? 0,
            ativo: pacote?.ativo ?? true,
            meta_titulo: pacote?.meta_titulo ?? '',
            meta_descricao: pacote?.meta_descricao ?? '',
            imagem_og: pacote?.imagem_og ?? '',
            galerias: [],
            preco_base_por_pessoa:
                pacote?.condicao_pagamento?.preco_base_por_pessoa ?? '',
            gasto_pessoal_estimado:
                pacote?.condicao_pagamento?.gasto_pessoal_estimado ?? '',
            deposito_percentagem:
                pacote?.condicao_pagamento?.deposito_percentagem ?? '',
            saldo_dias_antes_partida:
                pacote?.condicao_pagamento?.saldo_dias_antes_partida ?? '',
            metodos_pagamento:
                pacote?.condicao_pagamento?.metodos_pagamento ?? [],
        });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            forceFormData: true,
        };

        transform((data) => ({
            ...data,
            categoria_pacote_id:
                data.categoria_pacote_id === ''
                    ? null
                    : Number(data.categoria_pacote_id),
            avaliacao: data.avaliacao === '' ? null : Number(data.avaliacao),
        }));

        if (pacote) {
            put(`/admin/pacotes/${pacote.slug}`, options);
        } else {
            post('/admin/pacotes', options);
        }
    };

    return (
        <>
            <Head title={pacote ? 'Editar pacote' : 'Novo pacote'} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Heading
                            variant="small"
                            title={pacote ? 'Editar pacote' : 'Novo pacote'}
                            description="Preencha os dados do pacote. As imagens aceites são JPG, PNG, WebP e GIF até 5 MB."
                        />
                        {pacote && (
                            <p className="text-sm text-muted-foreground">
                                {pacote.titulo}
                            </p>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 self-start sm:self-auto"
                        asChild
                    >
                        <Link href={index().url}>
                            <ArrowLeftIcon />
                            Voltar
                        </Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    <Section
                        title="Informações gerais"
                        description="Dados principais apresentados na listagem e na página do pacote."
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="titulo"
                                label="Título"
                                error={errors.titulo}
                            >
                                <Input
                                    id="titulo"
                                    value={data.titulo}
                                    onChange={(event) =>
                                        setData('titulo', event.target.value)
                                    }
                                    required
                                />
                            </Field>

                            <Field id="slug" label="Slug" error={errors.slug}>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(event) =>
                                        setData('slug', event.target.value)
                                    }
                                    required
                                />
                            </Field>
                        </div>

                        <Field
                            id="subtitulo"
                            label="Subtítulo"
                            error={errors.subtitulo}
                        >
                            <Input
                                id="subtitulo"
                                value={data.subtitulo}
                                onChange={(event) =>
                                    setData('subtitulo', event.target.value)
                                }
                            />
                        </Field>

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
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field
                                id="categoria_pacote_id"
                                label="Categoria"
                                error={errors.categoria_pacote_id}
                            >
                                <Select
                                    value={
                                        data.categoria_pacote_id === ''
                                            ? 'none'
                                            : String(data.categoria_pacote_id)
                                    }
                                    onValueChange={(value) =>
                                        setData(
                                            'categoria_pacote_id',
                                            value === 'none' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        id="categoria_pacote_id"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Sem categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Sem categoria
                                        </SelectItem>
                                        {categorias.map((categoria) => (
                                            <SelectItem
                                                key={categoria.value}
                                                value={String(categoria.value)}
                                            >
                                                {categoria.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field
                                id="duracao"
                                label="Duração"
                                error={errors.duracao}
                            >
                                <Input
                                    id="duracao"
                                    value={data.duracao}
                                    onChange={(event) =>
                                        setData('duracao', event.target.value)
                                    }
                                    placeholder="7 dias / 6 noites"
                                />
                            </Field>

                            <Field
                                id="avaliacao"
                                label="Avaliação"
                                error={errors.avaliacao}
                            >
                                <Select
                                    value={
                                        data.avaliacao === ''
                                            ? 'none'
                                            : String(data.avaliacao)
                                    }
                                    onValueChange={(value) =>
                                        setData(
                                            'avaliacao',
                                            value === 'none' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        id="avaliacao"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Sem avaliação" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Sem avaliação
                                        </SelectItem>
                                        {[5, 4, 3, 2, 1].map((valor) => (
                                            <SelectItem
                                                key={valor}
                                                value={String(valor)}
                                            >
                                                {valor} estrela
                                                {valor > 1 ? 's' : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="ordem"
                                label="Ordem"
                                error={errors.ordem}
                            >
                                <Input
                                    id="ordem"
                                    type="number"
                                    min={0}
                                    value={data.ordem}
                                    onChange={(event) =>
                                        setData(
                                            'ordem',
                                            Number(event.target.value),
                                        )
                                    }
                                />
                            </Field>

                            <BooleanField
                                label="Ativo"
                                checked={data.ativo}
                                onCheckedChange={(checked) =>
                                    setData('ativo', checked)
                                }
                                className="mt-6"
                            />
                        </div>
                    </Section>

                    <Section title="Preços">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field
                                id="preco_eur"
                                label="Preço (EUR)"
                                error={errors.preco_eur}
                            >
                                <Input
                                    id="preco_eur"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={data.preco_eur}
                                    onChange={(event) =>
                                        setData('preco_eur', event.target.value)
                                    }
                                />
                            </Field>

                            <Field
                                id="rotulo_preco"
                                label="Rótulo do preço"
                                error={errors.rotulo_preco}
                            >
                                <Input
                                    id="rotulo_preco"
                                    value={data.rotulo_preco}
                                    onChange={(event) =>
                                        setData(
                                            'rotulo_preco',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="A partir de"
                                />
                            </Field>

                            <Field
                                id="preco_pacote_fotos_eur"
                                label="Preço pacote fotos (EUR)"
                                error={errors.preco_pacote_fotos_eur}
                            >
                                <Input
                                    id="preco_pacote_fotos_eur"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={data.preco_pacote_fotos_eur}
                                    onChange={(event) =>
                                        setData(
                                            'preco_pacote_fotos_eur',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>
                    </Section>

                    <Section title="Imagens">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <ImageUpload
                                id="imagem"
                                label="Imagem principal"
                                value={data.imagem}
                                onChange={(ficheiro) =>
                                    setData('imagem', ficheiro ?? '')
                                }
                                error={errors.imagem}
                            />

                            <ImageUpload
                                id="imagem_slide"
                                label="Imagem do slide"
                                value={data.imagem_slide}
                                onChange={(ficheiro) =>
                                    setData('imagem_slide', ficheiro ?? '')
                                }
                                error={errors.imagem_slide}
                            />
                        </div>

                        <div className="max-w-md">
                            <ImageUploadMultiple
                                id="galerias"
                                label="Imagens do carrossel e detalhes"
                                values={data.galerias}
                                onChange={(ficheiros) =>
                                    setData('galerias', ficheiros)
                                }
                                error={errors.galerias}
                            />
                        </div>

                        {pacote?.galerias && pacote.galerias.length > 0 && (
                            <div className="grid gap-2">
                                <p className="text-sm font-medium">
                                    Imagens atuais do carrossel
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {pacote.galerias.map((galeria) => (
                                        <img
                                            key={galeria.id}
                                            src={storageUrl(galeria.imagem)}
                                            alt=""
                                            className="h-16 w-24 rounded-md border object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>

                    <Section title="Listas do pacote">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="incluidos"
                                label="Incluídos (um por linha)"
                                error={errors.incluidos}
                            >
                                <Textarea
                                    id="incluidos"
                                    value={data.incluidos}
                                    onChange={(event) =>
                                        setData('incluidos', event.target.value)
                                    }
                                />
                            </Field>

                            <Field
                                id="excluidos"
                                label="Excluídos (um por linha)"
                                error={errors.excluidos}
                            >
                                <Textarea
                                    id="excluidos"
                                    value={data.excluidos}
                                    onChange={(event) =>
                                        setData('excluidos', event.target.value)
                                    }
                                />
                            </Field>

                            <Field
                                id="o_que_levar"
                                label="O que levar (um por linha)"
                                error={errors.o_que_levar}
                            >
                                <Textarea
                                    id="o_que_levar"
                                    value={data.o_que_levar}
                                    onChange={(event) =>
                                        setData(
                                            'o_que_levar',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>

                            <Field
                                id="observacoes_importantes"
                                label="Observações importantes (um por linha)"
                                error={errors.observacoes_importantes}
                            >
                                <Textarea
                                    id="observacoes_importantes"
                                    value={data.observacoes_importantes}
                                    onChange={(event) =>
                                        setData(
                                            'observacoes_importantes',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>
                    </Section>

                    <Section
                        title="Condições de pagamento"
                        description="Opcional. Deixe vazio para não apresentar esta informação no pacote."
                    >
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field
                                id="preco_base_por_pessoa"
                                label="Preço base por pessoa (EUR)"
                                error={errors.preco_base_por_pessoa}
                            >
                                <Input
                                    id="preco_base_por_pessoa"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={data.preco_base_por_pessoa}
                                    onChange={(event) =>
                                        setData(
                                            'preco_base_por_pessoa',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>

                            <Field
                                id="gasto_pessoal_estimado"
                                label="Gasto pessoal estimado (EUR)"
                                error={errors.gasto_pessoal_estimado}
                            >
                                <Input
                                    id="gasto_pessoal_estimado"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={data.gasto_pessoal_estimado}
                                    onChange={(event) =>
                                        setData(
                                            'gasto_pessoal_estimado',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>

                            <Field
                                id="deposito_percentagem"
                                label="Depósito (%)"
                                error={errors.deposito_percentagem}
                            >
                                <Input
                                    id="deposito_percentagem"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={data.deposito_percentagem}
                                    onChange={(event) =>
                                        setData(
                                            'deposito_percentagem',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="saldo_dias_antes_partida"
                                label="Saldo até (dias antes da partida)"
                                error={errors.saldo_dias_antes_partida}
                            >
                                <Input
                                    id="saldo_dias_antes_partida"
                                    type="number"
                                    min={0}
                                    value={data.saldo_dias_antes_partida}
                                    onChange={(event) =>
                                        setData(
                                            'saldo_dias_antes_partida',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>

                            <Field
                                id="metodos_pagamento"
                                label="Métodos de pagamento"
                                error={errors.metodos_pagamento}
                            >
                                <div className="grid gap-2">
                                    {METODOS_PAGAMENTO.map((metodo) => {
                                        const selecionado =
                                            data.metodos_pagamento.includes(
                                                metodo,
                                            );

                                        return (
                                            <label
                                                key={metodo}
                                                className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-muted/30"
                                            >
                                                <Checkbox
                                                    checked={selecionado}
                                                    onCheckedChange={(checked) =>
                                                        setData(
                                                            'metodos_pagamento',
                                                            checked
                                                                ? [
                                                                      ...data.metodos_pagamento,
                                                                      metodo,
                                                                  ]
                                                                : data.metodos_pagamento.filter(
                                                                      (item) =>
                                                                          item !==
                                                                          metodo,
                                                                  ),
                                                        )
                                                    }
                                                />
                                                {metodo}
                                            </label>
                                        );
                                    })}
                                </div>
                            </Field>
                        </div>
                    </Section>

                    <Section
                        title="SEO"
                        description="Metadados para partilhas nas redes sociais e motores de pesquisa."
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                id="meta_titulo"
                                label="Meta título"
                                error={errors.meta_titulo}
                            >
                                <Input
                                    id="meta_titulo"
                                    value={data.meta_titulo}
                                    onChange={(event) =>
                                        setData(
                                            'meta_titulo',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>

                            <Field
                                id="meta_descricao"
                                label="Meta descrição"
                                error={errors.meta_descricao}
                            >
                                <Input
                                    id="meta_descricao"
                                    value={data.meta_descricao}
                                    onChange={(event) =>
                                        setData(
                                            'meta_descricao',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="max-w-md">
                            <ImageUpload
                                id="imagem_og"
                                label="Imagem OG"
                                value={data.imagem_og}
                                onChange={(ficheiro) =>
                                    setData('imagem_og', ficheiro ?? '')
                                }
                                error={errors.imagem_og}
                            />
                        </div>
                    </Section>

                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" asChild>
                            <Link href={index().url}>Cancelar</Link>
                        </Button>
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

Form.layout = ({ pacote }: { pacote: Pacote | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Pacotes',
            href: index(),
        },
        {
            title: pacote ? 'Editar pacote' : 'Novo pacote',
            href: index(),
        },
    ],
});
