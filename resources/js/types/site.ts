export interface Configuracao {
    id: number;
    chave: string;
    valor: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface ItemMenu {
    id: number;
    pai_id: number | null;
    rotulo: string;
    rota: string;
    ordem: number;
    ativo: boolean;
    pai?: Pick<ItemMenu, 'id' | 'rotulo'> | null;
    filhos?: ItemMenu[];
    created_at: string | null;
    updated_at: string | null;
}

export interface CategoriaPacote {
    id: number;
    nome: string;
    slug: string;
    descricao: string | null;
    ordem: number;
    ativo: boolean;
    pacotes?: Pacote[];
    pacotes_count?: number;
    created_at: string | null;
    updated_at: string | null;
}

export interface CategoriaPerguntaFrequente {
    id: number;
    nome: string;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export type PorqueNosTipo = 'cabecalho' | 'destaque' | 'valor';

export interface PorqueNos {
    id: number;
    tipo: PorqueNosTipo;
    titulo: string;
    descricao: string | null;
    icone: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface PorqueAngola {
    id: number;
    titulo: string;
    descricao: string;
    imagem: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export type SobreNosTipo =
    'cabecalho' | 'quem_somos' | 'unico' | 'citacao' | 'destaque';

export interface SobreNos {
    id: number;
    tipo: SobreNosTipo;
    titulo: string | null;
    descricao: string | null;
    icone: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export type TourPrivadoTipo =
    'cabecalho' | 'destaque' | 'cta_whatsapp' | 'cta_email';

export interface TourPrivado {
    id: number;
    tipo: TourPrivadoTipo;
    titulo: string;
    descricao: string | null;
    icone: string | null;
    link: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface DiaItinerario {
    id: number;
    pacote_id: number;
    rotulo_dia: string;
    titulo: string;
    descricao: string;
    imagem: string | null;
    ordem: number;
    pacote?: Pick<Pacote, 'id' | 'titulo'> | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface GaleriaPacote {
    id: number;
    pacote_id: number;
    imagem: string;
    ordem: number;
    pacote?: Pick<Pacote, 'id' | 'titulo'> | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface CondicaoPagamento {
    id: number;
    pacote_id: number;
    preco_base_por_pessoa: string | null;
    gasto_pessoal_estimado: string | null;
    deposito_percentagem: number | null;
    saldo_dias_antes_partida: number | null;
    metodos_pagamento: string[] | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Pacote {
    id: number;
    categoria_pacote_id: number | null;
    slug: string;
    titulo: string;
    subtitulo: string | null;
    descricao: string | null;
    duracao: string | null;
    imagem: string | null;
    imagem_slide: string | null;
    preco_eur: string | null;
    rotulo_preco: string | null;
    preco_pacote_fotos_eur: string | null;
    avaliacao: number | null;
    incluidos: string[] | null;
    excluidos: string[] | null;
    o_que_levar: string[] | null;
    observacoes_importantes: string[] | null;
    ordem: number;
    ativo: boolean;
    meta_titulo: string | null;
    meta_descricao: string | null;
    imagem_og: string | null;
    categoria?: CategoriaPacote | null;
    condicao_pagamento?: CondicaoPagamento | null;
    dias_itinerario?: DiaItinerario[];
    galerias?: GaleriaPacote[];
    created_at: string | null;
    updated_at: string | null;
}

export interface Galeria {
    id: number;
    imagem: string;
    alt: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface Depoimento {
    id: number;
    nome: string;
    localizacao: string | null;
    mensagem: string;
    avaliacao: number;
    destaque: boolean;
    ordem: number;
    created_at: string | null;
    updated_at: string | null;
}

export interface PerguntaFrequente {
    id: number;
    categoria: string;
    pergunta: string;
    resposta: string;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface MembroEquipa {
    id: number;
    nome: string;
    cargo: string;
    cargo_id: number | null;
    user_id: number | null;
    user?: {
        id: number;
        name: string;
        email: string;
        ativo: boolean;
    } | null;
    bio: string | null;
    foto: string | null;
    linkedin: string | null;
    instagram: string | null;
    telefone: string | null;
    email: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface Cargo {
    id: number;
    nome: string;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface SlideHero {
    id: number;
    pagina: string | null;
    imagem: string | null;
    titulo: string | null;
    subtitulo: string | null;
    texto: string | null;
    botao_rotulo: string | null;
    botao_url: string | null;
    ordem: number;
    ativo: boolean;
    mostrar_depoimentos: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface VideoDepoimento {
    id: number;
    titulo: string | null;
    descricao: string | null;
    video: string;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface Seccao {
    id: number;
    slug: string;
    titulo: string | null;
    sobretitulo: string | null;
    introducao: string | null;
    conteudo: unknown | null;
    imagem: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface Estatistica {
    id: number;
    rotulo: string;
    valor: string;
    icone: string | null;
    ordem: number;
    ativo: boolean;
    created_at: string | null;
    updated_at: string | null;
}
