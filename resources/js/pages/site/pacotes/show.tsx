import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import ImageLightbox from '@/components/image-lightbox';
import type { Pacote } from '@/types/site';

interface PacoteShowProps {
    pacote: Pacote;
}

function urlAbsoluta(caminho: string | null): string | null {
    if (!caminho) {
        return null;
    }

    if (/^https?:\/\//i.test(caminho)) {
        return caminho;
    }

    return `${window.location.origin}${caminho}`;
}

export default function PacoteShow({ pacote }: PacoteShowProps) {
    const imagemOg = urlAbsoluta(pacote.imagem_og);
    const [indiceAberto, setIndiceAberto] = useState<number | null>(null);

    const imagens = [
        ...(pacote.imagem
            ? [{ src: pacote.imagem, alt: pacote.titulo }]
            : []),
        ...(pacote.galerias ?? []).map((imagem) => ({
            src: imagem.imagem,
            alt: pacote.titulo,
        })),
    ];

    const inicioGalerias = pacote.imagem ? 1 : 0;

    return (
        <>
            <Head title={pacote.meta_titulo ?? pacote.titulo}>
                <meta
                    name="description"
                    content={pacote.meta_descricao ?? pacote.descricao ?? ''}
                />
                <meta
                    property="og:title"
                    content={pacote.meta_titulo ?? pacote.titulo}
                />
                <meta
                    property="og:description"
                    content={pacote.meta_descricao ?? pacote.descricao ?? ''}
                />
                <meta property="og:type" content="website" />
                {imagemOg && <meta property="og:image" content={imagemOg} />}
            </Head>
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <Link href="/pacotes" className="text-sm font-medium underline">
                    ← Todos os pacotes
                </Link>

                {pacote.imagem && (
                    <button
                        type="button"
                        onClick={() => setIndiceAberto(0)}
                        aria-label={`Abrir imagem de ${pacote.titulo} em tamanho maior`}
                        className="mt-6 block w-full cursor-zoom-in overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                        <img
                            src={pacote.imagem}
                            alt={pacote.titulo}
                            className="aspect-video w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                        />
                    </button>
                )}

                <div className="mt-8">
                    {pacote.subtitulo && (
                        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                            {pacote.subtitulo}
                        </p>
                    )}
                    <h1 className="mt-1 text-4xl font-bold">{pacote.titulo}</h1>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        {pacote.duracao && (
                            <p className="text-sm text-muted-foreground">
                                {pacote.duracao}
                            </p>
                        )}
                        {pacote.avaliacao && (
                            <p className="text-sm font-medium text-yellow-600">
                                {'★'.repeat(pacote.avaliacao)}
                            </p>
                        )}
                        <p className="font-semibold">
                            {pacote.rotulo_preco ??
                                (pacote.preco_eur
                                    ? `€ ${pacote.preco_eur}`
                                    : null)}
                        </p>
                        <Link
                            href="/reservar"
                            className="rounded-md bg-sidebar-primary px-5 py-2 text-sm font-medium text-sidebar-primary-foreground"
                        >
                            Reservar
                        </Link>
                    </div>
                    {pacote.descricao && (
                        <p className="mt-6 leading-relaxed text-muted-foreground">
                            {pacote.descricao}
                        </p>
                    )}
                </div>

                {pacote.dias_itinerario &&
                    pacote.dias_itinerario.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold">Itinerário</h2>
                            <div className="mt-6 space-y-4">
                                {pacote.dias_itinerario.map((dia) => (
                                    <div
                                        key={dia.id}
                                        className="rounded-xl border border-sidebar-border p-6"
                                    >
                                        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                            {dia.rotulo_dia}
                                        </p>
                                        <h3 className="mt-1 text-lg font-semibold">
                                            {dia.titulo}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {dia.descricao}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                {pacote.galerias && pacote.galerias.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold">Galeria</h2>
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {pacote.galerias.map((imagem, indice) => (
                                <button
                                    key={imagem.id}
                                    type="button"
                                    onClick={() =>
                                        setIndiceAberto(
                                            inicioGalerias + indice,
                                        )
                                    }
                                    aria-label={`Abrir imagem ${indice + 1} da galeria em tamanho maior`}
                                    className="cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    <img
                                        src={imagem.imagem}
                                        alt={pacote.titulo}
                                        className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {pacote.incluidos && pacote.incluidos.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold">Incluído</h2>
                        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {pacote.incluidos.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {pacote.excluidos && pacote.excluidos.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-2xl font-bold">Não incluído</h2>
                        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {pacote.excluidos.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {pacote.condicaoPagamento && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold">
                            Condições de pagamento
                        </h2>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {pacote.condicaoPagamento.preco_base_por_pessoa && (
                                <div className="rounded-xl border border-sidebar-border p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Preço base por pessoa
                                    </p>
                                    <p className="mt-1 text-lg font-semibold">
                                        €{' '}
                                        {
                                            pacote.condicaoPagamento
                                                .preco_base_por_pessoa
                                        }
                                    </p>
                                </div>
                            )}

                            {pacote.condicaoPagamento
                                .gasto_pessoal_estimado && (
                                <div className="rounded-xl border border-sidebar-border p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Gasto pessoal estimado
                                    </p>
                                    <p className="mt-1 text-lg font-semibold">
                                        €{' '}
                                        {
                                            pacote.condicaoPagamento
                                                .gasto_pessoal_estimado
                                        }
                                    </p>
                                </div>
                            )}

                            {pacote.condicaoPagamento.deposito_percentagem !==
                                null && (
                                <div className="rounded-xl border border-sidebar-border p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Depósito
                                    </p>
                                    <p className="mt-1 text-lg font-semibold">
                                        {
                                            pacote.condicaoPagamento
                                                .deposito_percentagem
                                        }
                                        %
                                    </p>
                                </div>
                            )}

                            {pacote.condicaoPagamento
                                .saldo_dias_antes_partida !== null && (
                                <div className="rounded-xl border border-sidebar-border p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Saldo até
                                    </p>
                                    <p className="mt-1 text-lg font-semibold">
                                        {
                                            pacote.condicaoPagamento
                                                .saldo_dias_antes_partida
                                        }{' '}
                                        dias antes da partida
                                    </p>
                                </div>
                            )}
                        </div>

                        {pacote.condicaoPagamento.metodos_pagamento &&
                            pacote.condicaoPagamento.metodos_pagamento.length >
                                0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold">
                                        Métodos de pagamento
                                    </h3>
                                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                        {pacote.condicaoPagamento.metodos_pagamento.map(
                                            (metodo) => (
                                                <li key={metodo}>{metodo}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}
                    </section>
                )}
            </main>

            {indiceAberto !== null && imagens.length > 0 && (
                <ImageLightbox
                    imagens={imagens}
                    indiceInicial={indiceAberto}
                    onClose={() => setIndiceAberto(null)}
                />
            )}
        </>
    );
}
