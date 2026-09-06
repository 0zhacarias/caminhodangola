import { Quote, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Depoimento } from '@/types/site';

interface TestimonialsProps {
    depoimentos: Depoimento[];
}

const POR_PAGINA = 5;
const DURACAO_ANIMACAO = 30;

export function Testimonials({ depoimentos }: TestimonialsProps) {
    const [paused, setPaused] = useState(false);
    const [indice, setIndice] = useState(0);
    const [atraso, setAtraso] = useState(0);
    const pistaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let quadro: number;

        const atualizar = () => {
            const pista = pistaRef.current;

            if (pista?.firstElementChild) {
                const estilo = getComputedStyle(pista);
                const transformacao = new DOMMatrixReadOnly(estilo.transform);
                const deslocamento = -transformacao.m41;
                const larguraItem =
                    pista.firstElementChild.getBoundingClientRect().width +
                    parseFloat(estilo.columnGap || '0');

                setIndice(
                    Math.round(deslocamento / larguraItem) % depoimentos.length,
                );
            }

            quadro = requestAnimationFrame(atualizar);
        };

        quadro = requestAnimationFrame(atualizar);

        return () => cancelAnimationFrame(quadro);
    }, [depoimentos.length]);

    if (depoimentos.length === 0) {
        return null;
    }

    const irParaPagina = (pagina: number) => {
        setAtraso(
            (pagina * POR_PAGINA * DURACAO_ANIMACAO) / depoimentos.length,
        );
    };

    return (
        <section className="overflow-hidden border-t bg-white px-6 py-20 md:px-20">
            <div className="mb-14 text-center">
                <h2 className="mb-4 text-4xl font-bold text-slate-800">
                    What Travelers Say
                </h2>
                <p className="mx-auto max-w-xl text-gray-500">
                    Hear directly from travelers who explored Angola with
                    Caminhos D'Angola.
                </p>
            </div>

            <div
                className="relative w-full"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div
                    ref={pistaRef}
                    className="flex animate-scroll-left-once gap-6 pr-6"
                    style={{
                        animationPlayState: paused ? 'paused' : 'running',
                        animationDelay: `-${atraso}s`,
                        willChange: 'transform',
                    }}
                >
                    {[...depoimentos, ...depoimentos].map(
                        (depoimento, index) => (
                            <div
                                key={index}
                                className="relative flex w-full min-w-[320px] flex-col gap-4 rounded-xl bg-gray-50 p-7 shadow-sm transition duration-300 hover:shadow-lg md:max-w-[400px] md:min-w-[350px]"
                            >
                                <Quote className="absolute top-4 right-4 h-6 w-6 text-yellow-500" />

                                <p className="leading-relaxed text-gray-700 italic">
                                    "{depoimento.mensagem}"
                                </p>

                                <div className="mt-2 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={
                                                i < depoimento.avaliacao
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }
                                        />
                                    ))}
                                </div>

                                <div className="mt-auto border-t pt-4">
                                    <p className="font-semibold text-gray-900">
                                        {depoimento.nome}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {depoimento.localizacao}
                                    </p>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>

            {depoimentos.length > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    {[...Array(Math.ceil(depoimentos.length / POR_PAGINA))].map(
                        (_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => irParaPagina(i)}
                                aria-label={`Ir para a página ${i + 1}`}
                                className={`h-2.5 w-2.5 rounded-full transition ${
                                    Math.floor(indice / POR_PAGINA) === i
                                        ? 'bg-yellow-500'
                                        : 'bg-slate-300'
                                }`}
                            />
                        ),
                    )}
                </div>
            )}
        </section>
    );
}
