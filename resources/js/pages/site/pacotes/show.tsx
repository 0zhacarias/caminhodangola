import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { storageUrl } from '@/lib/utils';
import type { Pacote } from '@/types/site';

interface PacoteShowProps {
    pacote: Pacote;
}

type Tab = 'overview' | 'itinerary' | 'essential' | 'gallery' | 'prices';

const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '🏁' },
    { id: 'itinerary', label: 'Itinerary', icon: '🗓️' },
    { id: 'essential', label: 'Essential Info', icon: 'ℹ️' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'prices', label: 'Data & Prices', icon: '💰' },
];

import { Header } from '../../../components/site/header';
import { Footer } from '../../../components/site/footer';

function CardSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-lg bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold">{title}</h4>
            <div className="text-sm text-gray-700">{children}</div>
        </div>
    );
}

export default function PacoteShow({ pacote }: PacoteShowProps) {
    const imagemOg = pacote.imagem_og
        ? /^https?:\/\//i.test(pacote.imagem_og)
            ? pacote.imagem_og
            : `${window.location.origin}${storageUrl(pacote.imagem_og)}`
        : null;

    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const dias = pacote.dias_itinerario ?? [];
    const galerias = pacote.galerias ?? [];
    const activeDia = dias[activeIndex];

    useEffect(() => {
        const container = listRef.current;
        if (!container) return;
        const item = container.children[activeIndex] as HTMLElement | undefined;
        if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [activeIndex]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const goNext = () => setActiveIndex((i) => Math.min(dias.length - 1, i + 1));
    const waMsg = encodeURIComponent(`Hello! I would like more information about ${pacote.titulo}.`);
    const waLink = `https://wa.me/+244923469271?text=${waMsg}`;

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
            <div className={`relative w-full overflow-hidden flex flex-col z-0 ${pacote.imagem ? 'h-[80vh] bg-slate-950' : 'bg-slate-950 pb-8'}`}>
                {pacote.imagem && (
                    <img src={storageUrl(pacote.imagem)} alt={pacote.titulo}
                         className="absolute top-0 left-0 h-full w-full object-cover opacity-50" />
                )}
                
                <div className="relative z-10 w-full h-full flex flex-col">
                    <Header />

                    {pacote.imagem && (
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
                                        <p className="text-slate-200 text-justify max-w-2xl mt-2 text-lg">
                                            {pacote.descricao && pacote.descricao.length > 150 
                                                ? pacote.descricao.substring(0, 150) + '...' 
                                                : pacote.descricao}
                                        </p>
                                        
                                        <div className="mt-4 flex flex-wrap items-center gap-4">
                                            <a
                                                href={waLink}
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
                                            {pacote.avaliacao && <span className="text-yellow-400 text-xl">{'★'.repeat(pacote.avaliacao)}</span>}
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

            <section className="min-h-screen bg-gray-50 pb-24 md:pb-8">
                <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
                    <Link href="/pacotes" className="text-sm font-medium text-slate-600 hover:underline">
                        ← Todos os pacotes
                    </Link>

                    {!pacote.imagem && (
                        <div className="mt-4">
                            {pacote.subtitulo && <p className="text-sm font-medium uppercase tracking-wide text-gray-500">{pacote.subtitulo}</p>}
                            <h1 className="mt-1 text-4xl font-bold">{pacote.titulo}</h1>
                        </div>
                    )}

                    <div className="mt-6 md:grid md:grid-cols-4 md:gap-6">
                        {/* Desktop sidebar */}
                        <aside className="hidden md:block md:col-span-1">
                            <nav className="sticky top-6 space-y-2 rounded-lg bg-white p-3 shadow-sm">
                                {TABS.map((t) => (
                                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                                        className={`flex w-full items-center gap-3 rounded-md p-2 text-left text-sm font-medium transition ${activeTab === t.id ? 'border border-yellow-200 bg-yellow-50' : 'hover:bg-gray-100'}`}>
                                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs ${activeTab === t.id ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                            {t.label[0]}
                                        </span>
                                        <span>{t.label}</span>
                                    </button>
                                ))}
                                <div className="mt-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 text-white shadow">
                                    <div className="text-xs">Starting price (quote)</div>
                                    <div className="mt-1 text-2xl font-bold">
                                        <span className="text-base font-normal">from </span>
                                        {pacote.rotulo_preco ?? (pacote.preco_eur ? `€${pacote.preco_eur}` : '—')}
                                    </div>
                                    <div className="mt-1 text-xs">per person</div>
                                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                                        className="mt-3 block rounded-lg bg-white/20 px-3 py-2 text-center text-sm font-semibold hover:bg-white/30">
                                        Book now
                                    </a>
                                </div>
                            </nav>
                        </aside>

                        <main className="md:col-span-3 space-y-6">
                            {/* Mobile quick info bar */}
                            <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm md:hidden">
                                <div>
                                    <div className="text-xs text-gray-500">Quick info</div>
                                    <div className="font-semibold">
                                        {pacote.rotulo_preco ?? (pacote.preco_eur ? `€${pacote.preco_eur} / person` : '—')}
                                    </div>
                                </div>
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    className="rounded bg-yellow-500 px-4 py-2 text-sm text-white">
                                    Book now
                                </a>
                            </div>

                            {/* OVERVIEW */}
                            {activeTab === 'overview' && (
                                <div className="rounded-lg bg-white p-5 shadow-sm">
                                    <h2 className="text-xl font-semibold">Overview</h2>
                                    {pacote.descricao && (
                                        <p className="mt-3 leading-relaxed text-gray-700 whitespace-pre-line">{pacote.descricao}</p>
                                    )}
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <a href={waLink} target="_blank" rel="noopener noreferrer"
                                            className="rounded bg-yellow-500 px-5 py-2 text-sm font-medium text-white">
                                            Reserve now
                                        </a>
                                        {dias.length > 0 && (
                                            <button onClick={() => setActiveTab('itinerary')}
                                                className="rounded border border-slate-300 px-5 py-2 text-sm">
                                                See itinerary
                                            </button>
                                        )}
                                    </div>
                                    {galerias.length > 0 && (
                                        <img src={storageUrl(galerias[0].imagem)} alt={pacote.titulo}
                                            onClick={() => setLightboxSrc(storageUrl(galerias[0].imagem))}
                                            className="mt-6 h-48 w-full cursor-pointer rounded-lg object-cover shadow transition hover:opacity-90" />
                                    )}
                                </div>
                            )}

                            {/* ITINERARY */}
                            {activeTab === 'itinerary' && (
                                <div className="rounded-lg bg-white p-4 shadow-sm">
                                    {dias.length === 0 ? (
                                        <p className="text-sm text-gray-500">No itinerary available for this package.</p>
                                    ) : activeDia ? (
                                        <>
                                            <div className="mb-3 flex items-center justify-between">
                                                <h3 className="font-semibold">Itinerary</h3>
                                                <div className="text-xs text-gray-500">Day {activeIndex + 1} / {dias.length}</div>
                                            </div>
                                            <div className="overflow-hidden rounded-lg">
                                                <div className="relative">
                                                    {activeDia.imagem ? (
                                                        <img src={storageUrl(activeDia.imagem)} alt={activeDia.titulo}
                                                            onClick={() => setLightboxSrc(storageUrl(activeDia.imagem!))}
                                                            className="h-56 w-full cursor-pointer object-cover" />
                                                    ) : (
                                                        <div className="flex h-32 w-full items-center justify-center bg-slate-100 text-sm text-gray-400">No image</div>
                                                    )}
                                                    <button onClick={goPrev} disabled={activeIndex === 0}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 disabled:opacity-30">◀</button>
                                                    <button onClick={goNext} disabled={activeIndex === dias.length - 1}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 disabled:opacity-30">▶</button>
                                                </div>
                                                <div className="p-4">
                                                    <div className="text-xs text-gray-500">{activeDia.rotulo_dia}</div>
                                                    <h4 className="mt-1 font-semibold">{activeDia.titulo}</h4>
                                                    <p className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-line">{activeDia.descricao}</p>
                                                    <div ref={listRef} className="mt-4 flex gap-2 overflow-x-auto py-2">
                                                        {dias.map((d, i) => (
                                                            <button key={d.id} onClick={() => setActiveIndex(i)}
                                                                className={`flex-shrink-0 w-36 rounded-md p-2 text-left text-sm ${i === activeIndex ? 'border border-yellow-200 bg-yellow-50' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                                                <div className="text-xs text-gray-500">{d.rotulo_dia}</div>
                                                                <div className="truncate font-medium">{d.titulo}</div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            )}

                            {/* ESSENTIAL INFO */}
                            {activeTab === 'essential' && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {pacote.incluidos && pacote.incluidos.length > 0 && (
                                        <CardSection title="✅ Included">
                                            <ul className="list-inside list-disc space-y-1">
                                                {pacote.incluidos.map((item) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </CardSection>
                                    )}
                                    {pacote.excluidos && pacote.excluidos.length > 0 && (
                                        <CardSection title="❌ Not Included">
                                            <ul className="list-inside list-disc space-y-1">
                                                {pacote.excluidos.map((item) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </CardSection>
                                    )}
                                    {pacote.o_que_levar && pacote.o_que_levar.length > 0 && (
                                        <CardSection title="🎒 What to Bring">
                                            <ul className="list-inside list-disc space-y-1">
                                                {pacote.o_que_levar.map((item) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </CardSection>
                                    )}
                                    {pacote.observacoes_importantes && pacote.observacoes_importantes.length > 0 && (
                                        <CardSection title="⚠️ Important Remarks">
                                            <ul className="list-inside list-disc space-y-1">
                                                {pacote.observacoes_importantes.map((item) => <li key={item}>{item}</li>)}
                                            </ul>
                                        </CardSection>
                                    )}
                                    {(!pacote.incluidos?.length && !pacote.excluidos?.length && !pacote.o_que_levar?.length && !pacote.observacoes_importantes?.length) && (
                                        <p className="col-span-2 text-sm text-gray-500">No essential info available.</p>
                                    )}
                                </div>
                            )}

                            {/* GALLERY */}
                            {activeTab === 'gallery' && (
                                <div className="rounded-lg bg-white p-4 shadow-sm">
                                    <h3 className="mb-3 font-semibold">Gallery</h3>
                                    {galerias.length === 0 ? (
                                        <p className="text-sm text-gray-500">No photos available.</p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                            {galerias.map((img, i) => (
                                                <img key={img.id} src={storageUrl(img.imagem)} alt={`${pacote.titulo} ${i + 1}`}
                                                    onClick={() => setLightboxSrc(storageUrl(img.imagem))}
                                                    className="h-36 w-full cursor-pointer rounded-md object-cover transition hover:opacity-90" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* DATA & PRICES */}
                            {activeTab === 'prices' && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <CardSection title="💶 Pricing">
                                        <div className="space-y-2">
                                            {pacote.condicaoPagamento?.preco_base_por_pessoa && (
                                                <div>Base price per person: <span className="font-semibold">€{pacote.condicaoPagamento.preco_base_por_pessoa}</span></div>
                                            )}
                                            {pacote.condicaoPagamento?.gasto_pessoal_estimado && (
                                                <div>Estimated personal spending: <span className="font-semibold">€{pacote.condicaoPagamento.gasto_pessoal_estimado}</span></div>
                                            )}
                                            {pacote.preco_pacote_fotos_eur && (
                                                <div>Photo package: <span className="font-semibold">€{pacote.preco_pacote_fotos_eur}</span></div>
                                            )}
                                            {!pacote.condicaoPagamento?.preco_base_por_pessoa && !pacote.preco_eur && (
                                                <p className="text-gray-500">Price on request.</p>
                                            )}
                                        </div>
                                    </CardSection>
                                    <CardSection title="🏦 Booking & Payment">
                                        <div className="space-y-2">
                                            {pacote.condicaoPagamento?.deposito_percentagem != null && (
                                                <div>Deposit: <span className="font-semibold">{pacote.condicaoPagamento.deposito_percentagem}%</span> to confirm</div>
                                            )}
                                            {pacote.condicaoPagamento?.saldo_dias_antes_partida != null && (
                                                <div>Balance due: <span className="font-semibold">{pacote.condicaoPagamento.saldo_dias_antes_partida} days</span> before departure</div>
                                            )}
                                            {pacote.condicaoPagamento?.metodos_pagamento && pacote.condicaoPagamento.metodos_pagamento.length > 0 && (
                                                <div>
                                                    <div className="mb-1 font-medium">Payment methods:</div>
                                                    <ul className="list-inside list-disc space-y-1">
                                                        {pacote.condicaoPagamento.metodos_pagamento.map((m) => <li key={m}>{m}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                            {!pacote.condicaoPagamento && <p className="text-gray-500">Payment conditions on request.</p>}
                                        </div>
                                    </CardSection>
                                    <CardSection title="📞 Contact">
                                        <div className="space-y-1">
                                            <p>For bookings or questions:</p>
                                            <a href={waLink} target="_blank" rel="noreferrer" className="block text-yellow-600 hover:underline">+244 923 469 271</a>
                                            <a href="mailto:geral@caminhosdangola.com" className="block text-yellow-600 hover:underline">geral@caminhosdangola.com</a>
                                        </div>
                                    </CardSection>
                                </div>
                            )}

                            {/* Gallery preview strip (desktop bottom) */}
                            {galerias.length > 0 && (
                                <div className="hidden items-center justify-between gap-4 md:flex">
                                    <div className="flex gap-2">
                                        {galerias.slice(0, 3).map((img, i) => (
                                            <img key={img.id} src={storageUrl(img.imagem)} alt={`preview-${i}`}
                                                onClick={() => setLightboxSrc(storageUrl(img.imagem))}
                                                className="h-20 w-28 cursor-pointer rounded-md object-cover" />
                                        ))}
                                    </div>
                                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                                        className="rounded bg-yellow-500 px-4 py-2 text-sm text-white">Book now</a>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* Mobile bottom tab bar */}
            <nav className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
                {TABS.map((t) => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                        className={`flex-1 p-2 text-center text-xs ${activeTab === t.id ? 'text-yellow-600' : 'text-gray-600'}`}>
                        <div className="text-lg">{t.icon}</div>
                        <div className="mt-0.5">{t.label.split(' ')[0]}</div>
                    </button>
                ))}
            </nav>

            {/* Lightbox */}
            {lightboxSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
                    onClick={() => setLightboxSrc(null)} role="dialog" aria-modal="true">
                    <div className="relative mx-4 max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setLightboxSrc(null)} aria-label="Close"
                            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-black">
                            ✖
                        </button>
                        <img src={lightboxSrc} alt="Enlarged"
                            className="max-h-[85vh] w-full rounded-lg object-contain shadow-lg" />
                    </div>
                </div>
            )}
            {/* Footer */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

