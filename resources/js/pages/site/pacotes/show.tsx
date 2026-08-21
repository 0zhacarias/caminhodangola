import { Head, Link } from '@inertiajs/react';
import type { Pacote } from '@/types/site';

interface PacoteShowProps {
    pacote: Pacote;
}

export default function PacoteShow({ pacote }: PacoteShowProps) {
    return (
        <>
            <Head title={pacote.meta_titulo ?? pacote.titulo} />
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <Link href="/pacotes" className="text-sm font-medium underline">
                    ← Todos os pacotes
                </Link>

                {pacote.imagem && (
                    <img
                        src={pacote.imagem}
                        alt={pacote.titulo}
                        className="mt-6 aspect-video w-full rounded-xl object-cover"
                    />
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
                            {pacote.galerias.map((imagem) => (
                                <img
                                    key={imagem.id}
                                    src={imagem.imagem}
                                    alt={pacote.titulo}
                                    className="aspect-square w-full rounded-lg object-cover"
                                />
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
            </main>
        </>
    );
}
