import { Head, Link } from '@inertiajs/react';
import { storageUrl } from '@/lib/utils';
import type { CategoriaPacote, Pacote } from '@/types/site';

interface PacotesIndexProps {
    pacotes: Pacote[];
    categorias: CategoriaPacote[];
}

export default function PacotesIndex({
    pacotes,
    categorias,
}: PacotesIndexProps) {
    return (
        <>
            <Head title="Pacotes Turísticos" />
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <h1 className="text-3xl font-bold">Pacotes Turísticos</h1>

                {categorias.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                        {categorias.map((categoria) => (
                            <span
                                key={categoria.id}
                                className="rounded-full border border-sidebar-border px-4 py-1.5 text-sm"
                            >
                                {categoria.nome}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pacotes.map((pacote) => (
                        <Link
                            key={pacote.id}
                            href={`/pacotes/${pacote.slug}`}
                            className="group rounded-xl border border-sidebar-border p-6 transition-colors hover:border-sidebar-ring"
                        >
                            {pacote.imagem && (
                                <img
                                    src={storageUrl(pacote.imagem)}
                                    alt={pacote.titulo}
                                    className="mb-4 aspect-video w-full rounded-lg object-cover"
                                />
                            )}
                            <h2 className="text-lg font-semibold group-hover:underline">
                                {pacote.titulo}
                            </h2>
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
            </main>
        </>
    );
}
