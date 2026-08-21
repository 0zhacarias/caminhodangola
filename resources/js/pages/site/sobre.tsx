import { Head } from '@inertiajs/react';
import type { Seccao } from '@/types/site';

interface SobreProps {
    seccoes: Seccao[];
}

export default function Sobre({ seccoes }: SobreProps) {
    return (
        <>
            <Head title="Sobre Nós" />
            <main className="mx-auto w-full max-w-3xl px-6 py-12">
                <h1 className="text-3xl font-bold">Sobre Nós</h1>
                {seccoes.map((seccao) => (
                    <section key={seccao.id} className="mt-10">
                        {seccao.sobretitulo && (
                            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                                {seccao.sobretitulo}
                            </p>
                        )}
                        {seccao.titulo && (
                            <h2 className="mt-1 text-2xl font-bold">
                                {seccao.titulo}
                            </h2>
                        )}
                        {seccao.introducao && (
                            <p className="mt-3 leading-relaxed text-muted-foreground">
                                {seccao.introducao}
                            </p>
                        )}
                        {seccao.imagem && (
                            <img
                                src={seccao.imagem}
                                alt={seccao.titulo ?? ''}
                                className="mt-6 w-full rounded-xl object-cover"
                            />
                        )}
                    </section>
                ))}
            </main>
        </>
    );
}
