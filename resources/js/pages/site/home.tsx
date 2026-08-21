import { Head, Link } from '@inertiajs/react';
import type {
    Depoimento,
    Estatistica,
    Galeria,
    MembroEquipa,
    Pacote,
    Seccao,
    SlideHero,
} from '@/types/site';

interface HomeProps {
    configuracoes: Record<string, string>;
    slides: SlideHero[];
    seccoes: Seccao[];
    pacotes: Pacote[];
    depoimentos: Depoimento[];
    estatisticas: Estatistica[];
    galeria: Galeria[];
    membros: MembroEquipa[];
}

export default function Home({
    slides,
    seccoes,
    pacotes,
    depoimentos,
    estatisticas,
    galeria,
    membros,
}: HomeProps) {
    return (
        <>
            <Head title="Caminhos d'Angola" />
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                {slides.length > 0 && (
                    <section className="mb-12">
                        {slides.map((slide) => (
                            <div
                                key={slide.id}
                                className="mb-4 rounded-xl border border-sidebar-border p-8"
                            >
                                <h2 className="text-2xl font-semibold">
                                    {slide.titulo}
                                </h2>
                                {slide.subtitulo && (
                                    <p className="mt-2 text-muted-foreground">
                                        {slide.subtitulo}
                                    </p>
                                )}
                                {slide.texto && (
                                    <p className="mt-2 text-sm">
                                        {slide.texto}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {seccoes.map((seccao) => (
                    <section key={seccao.id} className="mb-12">
                        {seccao.sobretitulo && (
                            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                {seccao.sobretitulo}
                            </p>
                        )}
                        {seccao.titulo && (
                            <h2 className="mt-1 text-3xl font-bold">
                                {seccao.titulo}
                            </h2>
                        )}
                        {seccao.introducao && (
                            <p className="mt-3 leading-relaxed text-muted-foreground">
                                {seccao.introducao}
                            </p>
                        )}
                    </section>
                ))}

                <section className="mb-12">
                    <h2 className="text-3xl font-bold">Pacotes turísticos</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pacotes.map((pacote) => (
                            <Link
                                key={pacote.id}
                                href={`/pacotes/${pacote.slug}`}
                                className="group rounded-xl border border-sidebar-border p-6 transition-colors hover:border-sidebar-ring"
                            >
                                <h3 className="text-lg font-semibold group-hover:underline">
                                    {pacote.titulo}
                                </h3>
                                {pacote.duracao && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {pacote.duracao}
                                    </p>
                                )}
                                {pacote.descricao && (
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {pacote.descricao}
                                    </p>
                                )}
                                <p className="mt-4 font-medium">
                                    {pacote.rotulo_preco ??
                                        (pacote.preco_eur
                                            ? `€ ${pacote.preco_eur}`
                                            : null)}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {estatisticas.length > 0 && (
                    <section className="mb-12 grid gap-6 sm:grid-cols-3">
                        {estatisticas.map((estatistica) => (
                            <div
                                key={estatistica.id}
                                className="rounded-xl border border-sidebar-border p-6 text-center"
                            >
                                <p className="text-3xl font-bold">
                                    {estatistica.valor}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {estatistica.rotulo}
                                </p>
                            </div>
                        ))}
                    </section>
                )}

                {depoimentos.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold">Avaliações</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {depoimentos.map((depoimento) => (
                                <div
                                    key={depoimento.id}
                                    className="rounded-xl border border-sidebar-border p-6"
                                >
                                    <p className="text-sm leading-relaxed">
                                        {depoimento.mensagem}
                                    </p>
                                    <p className="mt-4 font-medium">
                                        {depoimento.nome}
                                    </p>
                                    {depoimento.localizacao && (
                                        <p className="text-sm text-muted-foreground">
                                            {depoimento.localizacao}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {galeria.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold">Galeria</h2>
                        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5">
                            {galeria.map((imagem) => (
                                <img
                                    key={imagem.id}
                                    src={imagem.imagem}
                                    alt={imagem.alt ?? ''}
                                    className="aspect-square w-full rounded-lg object-cover"
                                />
                            ))}
                        </div>
                        <Link
                            href="/galeria"
                            className="mt-4 inline-block text-sm font-medium underline"
                        >
                            Ver galeria completa
                        </Link>
                    </section>
                )}

                {membros.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold">A nossa equipa</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {membros.map((membro) => (
                                <div
                                    key={membro.id}
                                    className="rounded-xl border border-sidebar-border p-6 text-center"
                                >
                                    {membro.foto && (
                                        <img
                                            src={membro.foto}
                                            alt={membro.nome}
                                            className="mx-auto mb-4 size-20 rounded-full object-cover"
                                        />
                                    )}
                                    <p className="font-medium">{membro.nome}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {membro.cargo}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
