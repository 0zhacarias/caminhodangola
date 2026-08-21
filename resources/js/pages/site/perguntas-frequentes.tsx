import { Head } from '@inertiajs/react';
import type { PerguntaFrequente } from '@/types/site';

interface PerguntasFrequentesProps {
    faqs: PerguntaFrequente[];
}

export default function PerguntasFrequentes({
    faqs,
}: PerguntasFrequentesProps) {
    const categorias = [...new Set(faqs.map((faq) => faq.categoria))];

    return (
        <>
            <Head title="Perguntas Frequentes" />
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
                {categorias.map((categoria) => (
                    <section key={categoria} className="mt-10">
                        <h2 className="text-xl font-semibold">{categoria}</h2>
                        <div className="mt-4 space-y-4">
                            {faqs
                                .filter((faq) => faq.categoria === categoria)
                                .map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="rounded-xl border border-sidebar-border p-6"
                                    >
                                        <h3 className="font-medium">
                                            {faq.pergunta}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {faq.resposta}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    );
}
