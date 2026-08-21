import { Head } from '@inertiajs/react';
import type { Depoimento } from '@/types/site';

interface AvaliacoesProps {
    depoimentos: Depoimento[];
}

export default function Avaliacoes({ depoimentos }: AvaliacoesProps) {
    return (
        <>
            <Head title="Avaliações" />
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <h1 className="text-3xl font-bold">Avaliações</h1>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {depoimentos.map((depoimento) => (
                        <div
                            key={depoimento.id}
                            className="rounded-xl border border-sidebar-border p-6"
                        >
                            <p className="text-sm font-medium text-yellow-600">
                                {'★'.repeat(depoimento.avaliacao)}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed">
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
            </main>
        </>
    );
}
