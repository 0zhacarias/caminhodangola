import { Head, Link } from '@inertiajs/react';
import { storageUrl } from '@/lib/utils';
import type { Pacote, PerguntaFrequente } from '@/types/site';
import FAQSection from '../../../components/site/faq';
import { Header } from '../../../components/site/header';
import { Footer } from '../../../components/site/footer';
import Itinerary from '../../../components/site/intinerary/intinirary';
import Qualities from '../../../components/site/qualities';

interface PacoteShowProps {
    pacote: Pacote;
    faqs: PerguntaFrequente[];
}

export default function PacoteShow({ pacote, faqs }: PacoteShowProps) {
    const imagemHero = pacote.imagem_slide ?? pacote.imagem;

    const imagemOg = pacote.imagem_og
        ? /^https?:\/\//i.test(pacote.imagem_og)
            ? pacote.imagem_og
            : `${window.location.origin}${storageUrl(pacote.imagem_og)}`
        : null;

    const condicao = pacote.condicao_pagamento ?? null;

    const dias = (pacote.dias_itinerario ?? []).map((dia) => ({
        dayLabel: dia.rotulo_dia,
        title: dia.titulo,
        description: dia.descricao,
        imageUrl: dia.imagem ? storageUrl(dia.imagem) : '',
    }));

    const galerias = (pacote.galerias ?? []).map((galeria) =>
        storageUrl(galeria.imagem),
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Head title={pacote.meta_titulo ?? pacote.titulo}>
                <meta name="description" content={pacote.meta_descricao ?? pacote.descricao ?? ''} />
                <meta property="og:title" content={pacote.meta_titulo ?? pacote.titulo} />
                <meta property="og:description" content={pacote.meta_descricao ?? pacote.descricao ?? ''} />
                <meta property="og:type" content="website" />
                {imagemOg && <meta property="og:image" content={imagemOg} />}
            </Head>

            {/* Hero banner */}
            <div className={`relative w-full overflow-hidden flex flex-col z-0 ${imagemHero ? 'h-[80vh] bg-slate-950' : 'bg-slate-950 pb-8'}`}>
                {imagemHero && (
                    <img src={storageUrl(imagemHero)} alt={pacote.titulo}
                         className="absolute top-0 left-0 h-full w-full object-cover opacity-50" />
                )}

                <div className="relative z-10 w-full h-full flex flex-col">
                    <Header />

                    {imagemHero && (
                        <div className="h-full flex items-center px-8 md:px-16">
                            <div className="w-full">
                                <div className="flex flex-wrap flex-1 justify-start gap-8 items-center my-8">
                                    <div className="md:w-3/5 flex flex-col gap-4">
                                        {pacote.subtitulo && (
                                            <h5 className="text-yellow-400 text-lg uppercase tracking-widest font-medium">
                                                {pacote.subtitulo}
                                            </h5>
                                        )}
                                        <h4 className="text-slate-50 text-4xl md:text-5xl font-extrabold">
                                            {pacote.titulo}
                                        </h4>
                                        {pacote.descricao && (
                                            <p className="text-slate-200 text-justify max-w-2xl mt-2 text-lg">
                                                {pacote.descricao.length > 150
                                                    ? pacote.descricao.substring(0, 150) + '...'
                                                    : pacote.descricao}
                                            </p>
                                        )}

                                        <div className="mt-4 flex flex-wrap items-center gap-4">
                                            <a
                                                href={`https://wa.me/+244923469271?text=${encodeURIComponent(`Hello! I would like more information about ${pacote.titulo}.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 px-8 rounded-full bg-yellow-500 font-semibold text-slate-950 shadow-lg hover:bg-yellow-400 transition"
                                            >
                                                Book now
                                            </a>
                                            {pacote.duracao && (
                                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white font-medium backdrop-blur-sm">
                                                    {pacote.duracao}
                                                </span>
                                            )}
                                            {pacote.avaliacao != null && pacote.avaliacao > 0 && (
                                                <span className="text-yellow-400 text-xl">{'★'.repeat(pacote.avaliacao)}</span>
                                            )}
                                            <span className="font-bold text-white text-xl ml-2">
                                                {pacote.rotulo_preco ?? (pacote.preco_eur ? `€ ${pacote.preco_eur}` : null)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <main className="mx-auto w-full max-w-6xl px-4 py-4 md:px-8">
                <Link href="/pacotes" className="text-sm font-medium text-slate-600 hover:underline">
                    ← Todos os pacotes
                </Link>

                {!imagemHero && (
                    <div className="mt-4">
                        {pacote.subtitulo && <p className="text-sm font-medium uppercase tracking-wide text-gray-500">{pacote.subtitulo}</p>}
                        <h1 className="mt-1 text-4xl font-bold">{pacote.titulo}</h1>
                    </div>
                )}
            </main>

            <Itinerary
                title={pacote.titulo}
                subtitle={pacote.subtitulo ?? undefined}
                description={pacote.descricao}
                priceEur={Number(pacote.preco_eur ?? 0)}
                photoPackageEur={
                    pacote.preco_pacote_fotos_eur
                        ? Number(pacote.preco_pacote_fotos_eur)
                        : undefined
                }
                itinerary={dias}
                gallery={galerias}
                included={pacote.incluidos ?? []}
                excluded={pacote.excluidos ?? []}
                whatToBring={pacote.o_que_levar ?? []}
                importantRemarks={pacote.observacoes_importantes ?? []}
                precoBasePorPessoa={condicao?.preco_base_por_pessoa ?? null}
                gastoPessoalEstimado={condicao?.gasto_pessoal_estimado ?? null}
                depositoPercentagem={condicao?.deposito_percentagem ?? null}
                saldoDiasAntesPartida={condicao?.saldo_dias_antes_partida ?? null}
                metodosPagamento={condicao?.metodos_pagamento ?? []}
                contactNumber="+244923469271"
            />

            <Qualities />

            <FAQSection faqs={faqs} />

            {/* Footer */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
