import { Head } from '@inertiajs/react';
import { useAnimation, motion } from 'framer-motion';
import { useCallback, useEffect, useState, useRef } from 'react';
import Flag from '@/assets/flag-england.png';
import DepoimentoCard from '@/components/site/depoimento-card';
import { Footer } from '@/components/site/footer';
import SiteHero from '@/components/site/site-hero';
import { storageUrl } from '@/lib/utils';
import type { Depoimento, SlideHero, VideoDepoimento } from '@/types/site';

interface AvaliacoesProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
    videos: VideoDepoimento[];
}

const DURATION = 20000; // duração de cada slide em ms

export default function Avaliacoes({
    slides,
    depoimentos,
    videos,
}: AvaliacoesProps) {
    const mostrarNoSlide = slides.some((slide) => slide.mostrar_depoimentos);

    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // controls para a barra de progresso (scaleX)
    const progressControls = useAnimation();
    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // Função que roda o loop do RAF e atualiza a barra
    const animateProgress = useCallback(() => {
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
    }, [depoimentos.length, progressControls]);

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
    }, [index, depoimentos.length, animateProgress, progressControls]);

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
    }, [isPaused, depoimentos.length, animateProgress]);

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

            <SiteHero
                slides={slides}
                depoimentos={mostrarNoSlide ? depoimentos : []}
            />

            {/* Carrossel de depoimentos (apenas quando não estão no slide) */}
            {!mostrarNoSlide && (
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
                                <div className="max-w-3xl">
                                    <DepoimentoCard
                                        depoimento={depoimentos[index]}
                                    />
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
            )}

            {/* Vídeos de avaliações */}
            <section className="bg-white px-6 py-12 md:px-32">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                    <h3 className="text-2xl font-bold">
                        Veja o que nossos clientes dizem
                    </h3>

                    {videos.length > 0 ? (
                        <div className="grid w-full gap-8 md:grid-cols-2">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <video
                                        className="w-full rounded-lg shadow-lg"
                                        controls
                                        preload="metadata"
                                    >
                                        <source
                                            src={storageUrl(video.video)}
                                            type="video/mp4"
                                        />
                                        Seu navegador não suporta a tag de
                                        vídeo.
                                    </video>

                                    {(video.titulo || video.descricao) && (
                                        <div className="flex w-full max-w-md items-center justify-center gap-4 rounded-xl bg-slate-100 p-4">
                                            <div className="inline-block shrink-0 rounded-full border-2 border-yellow-500 bg-white p-1">
                                                <img
                                                    className="h-12 w-12"
                                                    src={Flag}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text-start">
                                                {video.titulo && (
                                                    <p className="text-lg font-semibold">
                                                        {video.titulo}
                                                    </p>
                                                )}
                                                {video.descricao && (
                                                    <p className="text-md text-slate-600">
                                                        {video.descricao}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg text-slate-400">
                            Sem vídeos no momento.
                        </p>
                    )}

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
