import { useState } from 'react';
import type { ReactNode } from 'react';
import ImageLightbox from '@/components/image-lightbox';
import type { ImagemLightbox } from '@/components/image-lightbox';
import { storageUrl } from '@/lib/utils';

export interface DetailField {
    label: string;
    value: ReactNode;
    fullWidth?: boolean;
}

interface DescribeOptions {
    labels?: Record<string, string>;
    skip?: string[];
    format?: Record<string, (value: unknown) => ReactNode>;
}

const labels: Record<string, string> = {
    id: 'ID',
    nome: 'Nome',
    chave: 'Chave',
    valor: 'Valor',
    rotulo: 'Rótulo',
    rota: 'Rota',
    ordem: 'Ordem',
    ativo: 'Ativo(a)',
    slug: 'Slug',
    titulo: 'Título',
    subtitulo: 'Subtítulo',
    sobretitulo: 'Sobretítulo',
    introducao: 'Introdução',
    descricao: 'Descrição',
    conteudo: 'Conteúdo',
    duracao: 'Duração',
    imagem: 'Imagem',
    imagem_og: 'Imagem OG',
    alt: 'Texto alternativo',
    texto: 'Texto',
    pagina: 'Página',
    icone: 'Ícone',
    preco_eur: 'Preço (EUR)',
    rotulo_preco: 'Rótulo do preço',
    preco_pacote_fotos_eur: 'Preço pacote fotos (EUR)',
    avaliacao: 'Avaliação',
    incluidos: 'Incluídos',
    excluidos: 'Excluídos',
    o_que_levar: 'O que levar',
    observacoes_importantes: 'Observações importantes',
    meta_titulo: 'Meta título',
    meta_descricao: 'Meta descrição',
    pacotes_count: 'Nº de pacotes',
    categoria: 'Categoria',
    pergunta: 'Pergunta',
    resposta: 'Resposta',
    localizacao: 'Localização',
    mensagem: 'Mensagem',
    destaque: 'Destaque',
    cargo: 'Cargo',
    bio: 'Biografia',
    foto: 'Foto',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    telefone: 'Telefone',
    email: 'E-mail',
    rotulo_dia: 'Dia',
    pacote: 'Pacote',
    pai: 'Item pai',
    data_pretendida: 'Data pretendida',
    numero_viajantes: 'Nº de viajantes',
    estado: 'Estado',
    created_at: 'Criado em',
    updated_at: 'Atualizado em',
};

const skipKeys = new Set(['pacotes', 'filhos', 'dias_itinerario', 'galerias']);

const imageKeys = new Set(['imagem', 'foto', 'imagem_og']);

const dateKeys = new Set(['created_at', 'updated_at', 'data_pretendida']);

const fullWidthKeys = new Set([
    'texto',
    'descricao',
    'conteudo',
    'introducao',
    'resposta',
    'mensagem',
    'bio',
    'observacoes_importantes',
    'incluidos',
    'excluidos',
    'o_que_levar',
    'metodos_pagamento',
]);

function humanize(key: string): string {
    const words = key.replace(/_/g, ' ').split(' ');

    return words
        .map((word) =>
            word.length === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join(' ');
}

function ehUrlImagem(value: string): boolean {
    return /^(https?:\/\/|\/|data:image\/)/i.test(value.trim());
}

export function nodeToText(node: unknown): string {
    if (node === null || node === undefined) {
        return '—';
    }

    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (typeof node === 'boolean') {
        return node ? 'Sim' : 'Não';
    }

    if (Array.isArray(node)) {
        return node.map(nodeToText).join(', ');
    }

    if (typeof node === 'object' && 'props' in node) {
        const element = node as {
            type?: unknown;
            props: { alt?: string; children?: unknown };
        };

        if (element.type === 'img') {
            return element.props.alt ?? '—';
        }

        return nodeToText(element.props.children);
    }

    return String(node);
}

function formatDate(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function ImagePreview({
    imagens,
    indiceInicial,
    src,
    className,
}: {
    imagens: ImagemLightbox[];
    indiceInicial: number;
    src: string;
    className: string;
}) {
    const [aberto, setAberto] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setAberto(true)}
                aria-label="Abrir imagem em tamanho maior"
                className="block w-full cursor-zoom-in overflow-hidden rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
                <img src={src} alt="" className={className} />
            </button>

            {aberto && (
                <ImageLightbox
                    imagens={imagens}
                    indiceInicial={indiceInicial}
                    onClose={() => setAberto(false)}
                />
            )}
        </>
    );
}

function formatValue(
    key: string,
    value: unknown,
    options: DescribeOptions,
    imagens: ImagemLightbox[],
): ReactNode {
    const formatter = options.format?.[key];

    if (formatter !== undefined) {
        return formatter(value);
    }

    if (value === null || value === undefined || value === '') {
        return '—';
    }

    if (typeof value === 'boolean') {
        return value ? 'Sim' : 'Não';
    }

    if (Array.isArray(value)) {
        return value.map((item) => nodeToText(item)).join(', ');
    }

    if (typeof value === 'number') {
        return String(value);
    }

    if (typeof value === 'object') {
        const record = value as Record<string, unknown>;

        if (key === 'pacote' || key === 'categoria' || key === 'pai') {
            const nested =
                record.titulo ?? record.nome ?? record.rotulo ?? null;

            return nested === null ? '—' : String(nested);
        }

        const json = JSON.stringify(value);

        return json.length > 300 ? `${json.slice(0, 300)}…` : json;
    }

    if (typeof value === 'string' && imageKeys.has(key)) {
        if (!ehUrlImagem(value)) {
            return value;
        }

        const src = storageUrl(value);
        const indice = imagens.findIndex((imagem) => imagem.src === value);

        return (
            <ImagePreview
                imagens={imagens.map((imagem) => ({
                    ...imagem,
                    src: storageUrl(imagem.src),
                }))}
                indiceInicial={indice === -1 ? 0 : indice}
                src={src}
                className="max-h-40 w-full rounded-md object-cover"
            />
        );
    }

    if (typeof value === 'string' && dateKeys.has(key)) {
        return formatDate(value);
    }

    return String(value);
}

export function describeItem(
    item: object,
    options: DescribeOptions = {},
): DetailField[] {
    const skip = new Set([...skipKeys, ...(options.skip ?? [])]);

    const entries = Object.entries(item).filter(
        ([key]) => !skip.has(key) && !key.endsWith('_id'),
    );

    const imagens: ImagemLightbox[] = entries
        .filter(
            ([key, value]) =>
                imageKeys.has(key) &&
                typeof value === 'string' &&
                value !== '' &&
                ehUrlImagem(value),
        )
        .map(([key, value]) => ({
            src: value as string,
            alt: options.labels?.[key] ?? labels[key] ?? humanize(key),
        }));

    return entries.map(([key, value]) => ({
        label: options.labels?.[key] ?? labels[key] ?? humanize(key),
        value: formatValue(key, value, options, imagens),
        fullWidth: fullWidthKeys.has(key),
    }));
}
