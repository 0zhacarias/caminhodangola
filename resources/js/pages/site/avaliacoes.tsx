import { Head } from '@inertiajs/react';
import { useAnimation, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Flag from '@/assets/flag-england.png';
import VideoSource from '@/assets/video.mp4';
import { Footer } from '@/components/site/footer';
import SiteHero from '@/components/site/site-hero';
import type { Depoimento, SlideHero } from '@/types/site';

interface AvaliacoesProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
}

const DURATION = 20000; // duração de cada slide em ms

function Stars({ n }: { n: number }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`text-yellow-400 ${i < n ? 'opacity-100' : 'opacity-40'}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default function Avaliacoes({ slides, depoimentos }: AvaliacoesProps) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // controls para a barra de progresso (scaleX)
    const progressControls = useAnimation();
    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // Função que roda o loop do RAF e atualiza a barra
    const animateProgress = () => {
        if (depoimentos.length === 0) {
            return;
        }

        const update = (time: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = time;
            }

            const elapsed = elapsedRef.current + (time - startTimeRef.current);
            const progress = Math.min(elapsed / DURATION, 1);

            // atualiza visualmente o scaleX da barra
            progressControls.set({ scaleX: progress });

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                // completou -> reseta e avança slide
                elapsedRef.current = 0;
                startTimeRef.current = null;
                rafRef.current = null;
                setIndex((prev) => (prev + 1) % depoimentos.length);
            }
        };

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(update);
    };

    // Sempre que o index muda, reinicia barra/animação
    useEffect(() => {
        progressControls.set({ scaleX: 0 });
        elapsedRef.current = 0;
        startTimeRef.current = null;

        if (!isPaused && depoimentos.length > 0) {
            animateProgress();
        }

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [index, depoimentos.length]);

    // Pausa / retoma
    useEffect(() => {
        if (isPaused) {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (startTimeRef.current !== null) {
                elapsedRef.current += performance.now() - startTimeRef.current;
                startTimeRef.current = null;
            }

            rafRef.current = null;
        } else {
            if (elapsedRef.current < DURATION && depoimentos.length > 0) {
                startTimeRef.current = null;
                animateProgress();
            }
        }
    }, [isPaused, depoimentos.length]);

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const goToSlide = (i: number) => setIndex(i);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Avaliações" />

            <SiteHero slides={slides} />

            {/* Carrossel de depoimentos */}
            <section
                className="bg-white px-6 py-16 md:px-32"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <div className="mx-auto flex max-w-4xl flex-col items-center">
                    <h3 className="mb-8 text-2xl font-bold text-slate-900">
                        O que dizem os nossos clientes
                    </h3>

                    {/* Barra de fundo + barra animada */}
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-200">
                        <motion.div
                            animate={progressControls}
                            initial={{ scaleX: 0 }}
                            style={{ transformOrigin: '0 50%' }}
                            className="absolute top-0 left-0 h-1 w-full origin-left bg-yellow-500"
                        />
                    </div>

                    {depoimentos.length > 0 ? (
                        <div className="flex w-full flex-col items-center justify-center px-2 py-10 text-center">
                            <div className="max-w-3xl rounded-xl bg-slate-900 p-8 text-left text-white shadow-xl md:p-12">
                                <div className="flex flex-col items-start gap-6 md:flex-row md:justify-center">
                                    {/* avatar estilizado */}
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-lg font-semibold text-slate-900">
                                        {depoimentos[index].nome
                                            .split(' ')
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join('')}
                                    </div>

                                    <div className="flex-1">
                                        <Stars
                                            n={depoimentos[index].avaliacao}
                                        />
                                        <p className="mt-4 text-lg leading-relaxed max-md:text-sm md:text-xl">
                                            {depoimentos[index].mensagem}
                                        </p>

                                        <div className="mt-6">
                                            <p className="font-semibold">
                                                {depoimentos[index].nome}
                                            </p>
                                            <p className="text-sm text-slate-300">
                                                {depoimentos[index].localizacao}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* círculos de navegação */}
                            <div className="mt-8 flex items-center gap-3">
                                {depoimentos.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                        className={`h-3 w-3 rounded-full ${
                                            i === index
                                                ? 'bg-yellow-500'
                                                : 'bg-slate-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full flex-col items-center justify-center px-6 py-16 text-center">
                            <p className="text-lg text-slate-400">
                                Sem avaliações no momento.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Conteúdo adicional / call-to-action */}
            <section className="bg-white px-6 py-12 md:px-32">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                    <h3 className="text-2xl font-bold">
                        Veja o que nossos clientes dizem
                    </h3>
                    <video
                        className="mt-4 max-w-72 rounded-lg shadow-lg"
                        controls
                        autoPlay
                        loop
                    >
                        <source src={VideoSource} type="video/mp4" />
                        Seu navegador não suporta a tag de vídeo.
                    </video>
                    <div className="mt-4 flex w-full max-w-md items-center justify-center gap-4 rounded-xl bg-slate-100 p-4">
                        <div className="inline-block rounded-full border-2 border-yellow-500 bg-white p-1">
                            <img className="h-12 w-12" src={Flag} alt="" />
                        </div>
                        <div className="text-start">
                            <p className="text-lg font-semibold">David</p>
                            <p className="text-md text-slate-600">
                                Tourist from England
                            </p>
                        </div>
                    </div>
                    <a
                        href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                            'Hello! I would like more information about your tours.',
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 rounded-full bg-yellow-500 p-3 px-8 font-semibold text-slate-950 shadow-md transition hover:bg-yellow-400"
                    >
                        Reserve
                    </a>
                </div>
            </section>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
