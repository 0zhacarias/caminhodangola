import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/site/header';
import { storageUrl } from '@/lib/utils';
import type { SlideHero } from '@/types/site';

interface SiteHeroProps {
    slides: SlideHero[];
    cta?: {
        label: string;
        href: string;
    };
}

const DURATION = 20000;

const WHATSAPP_RESERVE = `https://wa.me/+244923469271?text=${encodeURIComponent(
    'Hello! I would like more information about your tours.',
)}`;

export default function SiteHero({ slides, cta }: SiteHeroProps) {
    const heroSlides = slides.map((slide) => ({
        image: slide.imagem ? storageUrl(slide.imagem) : '',
        title: slide.titulo ?? '',
        subtitle: slide.subtitulo ?? '',
        text: slide.texto ?? '',
        botaoRotulo: slide.botao_rotulo ?? '',
        botaoUrl: slide.botao_url ?? '',
    }));

    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const slideAtual = heroSlides[index];
    const botaoRotulo = slideAtual?.botaoRotulo || cta?.label || 'Reserve';
    const botaoUrl = slideAtual?.botaoUrl || cta?.href || WHATSAPP_RESERVE;
    const botaoExterno = /^https?:\/\//i.test(botaoUrl);

    const progressControls = useAnimation();
    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const animateProgress = useCallback(() => {
        const update = (time: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = time;
            }

            const elapsed = elapsedRef.current + (time - startTimeRef.current);
            const progress = Math.min(elapsed / DURATION, 1);

            progressControls.set({ scaleX: progress });

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                elapsedRef.current = 0;
                startTimeRef.current = null;
                setIndex((prev) => (prev + 1) % heroSlides.length);
            }
        };

        rafRef.current = requestAnimationFrame(update);
    }, [progressControls, heroSlides.length]);

    useEffect(() => {
        if (heroSlides.length === 0) {
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
    }, [index, heroSlides.length, progressControls, animateProgress]);

    useEffect(() => {
        if (isPaused) {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (startTimeRef.current !== null) {
                elapsedRef.current += performance.now() - startTimeRef.current;
                startTimeRef.current = null;
            }
        } else if (elapsedRef.current < DURATION) {
            startTimeRef.current = null;
            animateProgress();
        }
    }, [isPaused, animateProgress]);

    const goToSlide = (i: number) => {
        setIndex(i);
    };

    const handleDragEnd = (_event: unknown, info: PanInfo) => {
        if (info.offset.x < -100) {
            setIndex((prev) => (prev + 1) % heroSlides.length);
        } else if (info.offset.x > 100) {
            setIndex(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
            );
        }
    };

    return (
        <div
            className="relative z-0 flex flex-col overflow-hidden bg-slate-950"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                {heroSlides.length > 0 &&
                    slideAtual &&
                    slideAtual.image !== '' && (
                        <motion.img
                            key={slideAtual.image}
                            src={slideAtual.image}
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 0.7 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 left-0 h-full w-screen object-cover"
                        />
                    )}
            </AnimatePresence>

            <div className="relative z-10 w-full">
                <Header />

                <div className="h-1 w-full bg-slate-700">
                    <motion.div
                        className="h-full origin-left bg-yellow-500"
                        initial={{ scaleX: 0 }}
                        animate={progressControls}
                        transition={{ duration: 0, ease: 'linear' }}
                    />
                </div>

                <div className="flex w-full flex-1 flex-col items-center justify-between py-8 md:gap-32 md:py-16">
                    <div className="w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            {heroSlides.length > 0 && slideAtual && (
                                <motion.div
                                    key={index}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={handleDragEnd}
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="my-8 flex flex-1 cursor-grab items-center justify-start gap-8 p-8 max-md:flex-wrap md:px-16"
                                >
                                    <div className="flex flex-col gap-4 md:w-2/5">
                                        <div>
                                            <h5
                                                className="font-serif text-2xl text-slate-50"
                                                style={{
                                                    textShadow:
                                                        '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                                }}
                                            >
                                                {slideAtual.title}
                                            </h5>
                                            <h4
                                                className="font-serif text-5xl text-slate-50"
                                                style={{
                                                    textShadow:
                                                        '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                                }}
                                            >
                                                {slideAtual.subtitle}
                                            </h4>
                                            <p
                                                className="my-4 text-justify text-white"
                                                style={{
                                                    textShadow:
                                                        '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                                }}
                                            >
                                                {slideAtual.text}
                                            </p>
                                        </div>
                                        <div>
                                            <a
                                                href={botaoUrl}
                                                target={
                                                    botaoExterno
                                                        ? '_blank'
                                                        : undefined
                                                }
                                                rel={
                                                    botaoExterno
                                                        ? 'noopener noreferrer'
                                                        : undefined
                                                }
                                                className="rounded-full bg-yellow-500 p-2 px-6 shadow-xl"
                                            >
                                                {botaoRotulo}
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {heroSlides.length > 0 && (
                        <div className="-bottom-8 flex w-full justify-center gap-3">
                            {heroSlides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    className={`h-3 w-3 rounded-full ${i === index ? 'bg-yellow-500' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
