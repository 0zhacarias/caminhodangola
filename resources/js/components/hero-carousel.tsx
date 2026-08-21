import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

export interface HeroSlide {
    image: string;
    title: string;
    subtitle: string;
    text: string;
}

const DURATION = 20000; // duration in milliseconds

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Controls de animação da barra de progresso
    const progressControls = useAnimation();
    // refs para controle de tempo
    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // Função que faz o loop de requestAnimationFrame
    const animateProgress = useCallback(() => {
        const update = (time: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = time;
            }

            const elapsed = elapsedRef.current + (time - startTimeRef.current);
            const progress = Math.min(elapsed / DURATION, 1);

            // Atualiza o scaleX da barra
            progressControls.set({ scaleX: progress });

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                // Reinicia tempo e avança slide
                elapsedRef.current = 0;
                startTimeRef.current = null;
                setIndex((prev) => (prev + 1) % slides.length);
            }
        };

        rafRef.current = requestAnimationFrame(update);
    }, [progressControls, slides.length]);

    // Sempre que o index mudar, reinicia a animação
    useEffect(() => {
        if (slides.length === 0) {
            return;
        }

        progressControls.set({ scaleX: 0 });
        elapsedRef.current = 0;
        startTimeRef.current = null;

        animateProgress();

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [index, slides.length, progressControls, animateProgress]);

    // Controla pausa / retoma
    useEffect(() => {
        if (isPaused) {
            // pausa: cancela o RAF e acumula elapsed
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (startTimeRef.current !== null) {
                elapsedRef.current += performance.now() - startTimeRef.current;
                startTimeRef.current = null;
            }
        } else if (elapsedRef.current < DURATION) {
            // retoma somente se ainda não completou
            startTimeRef.current = null;
            animateProgress();
        }
    }, [isPaused, animateProgress]);

    // Navegação por círculos
    const goToSlide = (i: number) => {
        setIndex(i);
    };

    // Swipe (arrastar)
    const handleDragEnd = (_event: unknown, info: PanInfo) => {
        if (info.offset.x < -100) {
            setIndex((prev) => (prev + 1) % slides.length);
        } else if (info.offset.x > 100) {
            setIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }
    };

    if (slides.length === 0) {
        return null;
    }

    return (
        <div
            className="bg-slate-950 relative z-0 flex flex-col overflow-hidden"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
        >
            {/* Imagem de fundo animada */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={slides[index]!.image}
                    src={slides[index]!.image}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 0.7 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-0 h-full w-screen object-cover"
                />
            </AnimatePresence>

            <div className="relative z-10 w-full">
                {/* Barra de progresso */}
                <div className="h-1 w-full bg-slate-700">
                    <motion.div
                        className="h-full origin-left bg-yellow-500"
                        initial={{ scaleX: 0 }}
                        animate={progressControls}
                        transition={{ duration: 0, ease: 'linear' }}
                    />
                </div>

                <div className="flex w-full flex-1 flex-col items-center justify-between py-8 md:gap-32 md:py-16">
                    {/* Conteúdo do slide */}
                    <div className="w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="my-8 flex flex-1 cursor-grab items-center justify-start gap-8 p-8 md:px-16 max-md:flex-wrap"
                            >
                                <div className="flex flex-col gap-4 md:w-2/5">
                                    <div>
                                        <h5
                                            className="font-serif text-2xl text-slate-50"
                                            style={{ textShadow: '2px 2px 16px rgba(0, 0, 0, 0.8)' }}
                                        >
                                            {slides[index]!.title}
                                        </h5>
                                        <h4
                                            className="font-serif text-5xl text-slate-50"
                                            style={{ textShadow: '2px 2px 16px rgba(0, 0, 0, 0.8)' }}
                                        >
                                            {slides[index]!.subtitle}
                                        </h4>
                                        <p
                                            className="my-4 text-justify text-white"
                                            style={{ textShadow: '2px 2px 16px rgba(0, 0, 0, 0.8)' }}
                                        >
                                            {slides[index]!.text}
                                        </p>
                                    </div>
                                    <div>
                                        <a
                                            href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                                                'Hello! I would like more information about your tours.',
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-yellow-500 p-2 px-6 shadow-xl"
                                        >
                                            Reserve
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Círculos de navegação */}
                    <div className="-bottom-8 flex w-full justify-center gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`h-3 w-3 rounded-full ${i === index ? 'bg-yellow-500' : 'bg-white/30'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
