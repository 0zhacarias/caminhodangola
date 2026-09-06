import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import DepoimentoCard from '@/components/site/depoimento-card';
import { Header } from '@/components/site/header';
import { storageUrl } from '@/lib/utils';
import { useWhatsapp } from '@/lib/whatsapp';
import type { Depoimento, SlideHero } from '@/types/site';

interface SiteHeroProps {
    slides: SlideHero[];
    depoimentos?: Depoimento[];
    centralizado?: boolean;
    cta?: {
        label: string;
        href: string;
    };
}

const DURATION = 20000;

export default function SiteHero({
    slides,
    depoimentos = [],
    centralizado = true,
    cta,
}: SiteHeroProps) {
    const whatsapp = useWhatsapp();
    const heroSlides = slides.map((slide) => ({
        image: slide.imagem ? storageUrl(slide.imagem) : '',
        title: slide.titulo ?? '',
        subtitle: slide.subtitulo ?? '',
        text: slide.texto ?? '',
        subtext: slide.subtexto ?? '',
        botaoRotulo: slide.botao_rotulo ?? '',
        botaoUrl: slide.botao_url ?? '',
    }));

    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // No modo depoimentos o carrossel é o conteúdo do hero:
    // cada depoimento é uma transição sobre a imagem de fundo.
    const modoDepoimentos = depoimentos.length > 0;
    const total = modoDepoimentos ? depoimentos.length : heroSlides.length;

    const imagemFundo =
        heroSlides.length > 0
            ? heroSlides[index % heroSlides.length].image
            : '';
    const slideAtual = modoDepoimentos
        ? undefined
        : heroSlides[index % Math.max(heroSlides.length, 1)];
    const depoimentoAtual = modoDepoimentos ? depoimentos[index] : undefined;

    const botaoRotulo = slideAtual?.botaoRotulo || cta?.label || 'Reserve';
    const botaoUrl = slideAtual?.botaoUrl || cta?.href || whatsapp.link();
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
                setIndex((prev) => (prev + 1) % total);
            }
        };

        rafRef.current = requestAnimationFrame(update);
    }, [progressControls, total]);

    useEffect(() => {
        if (total === 0) {
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
    }, [index, total, progressControls, animateProgress]);

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
        if (total === 0) {
            return;
        }

        if (info.offset.x < -100) {
            setIndex((prev) => (prev + 1) % total);
        } else if (info.offset.x > 100) {
            setIndex((prev) => (prev - 1 + total) % total);
        }
    };

    return (
        <div
            className="relative flex flex-col overflow-hidden bg-slate-950"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                {imagemFundo !== '' && (
                    <motion.img
                        key={imagemFundo}
                        src={imagemFundo}
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

                {modoDepoimentos && depoimentoAtual ? (
                    <div className="flex w-full flex-1 flex-col items-center justify-between gap-10 px-4 py-10 md:gap-16 md:px-16 md:py-16">
                        <div className="flex w-full flex-col items-center gap-8">
                            <h3
                                className="text-center text-2xl font-bold text-slate-50 md:text-3xl"
                                style={{
                                    textShadow:
                                        '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                }}
                            >
                                O que dizem os nossos clientes
                            </h3>

                            <div className="w-full max-w-3xl">
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
                                        className="cursor-grab"
                                    >
                                        <DepoimentoCard
                                            depoimento={depoimentoAtual}
                                            variant="light"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* círculos de navegação */}
                        <div className="flex w-full justify-center gap-3">
                            {depoimentos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className={`h-3 w-3 rounded-full ${i === index ? 'bg-yellow-500' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full flex-1 flex-col items-center justify-between py-8 md:gap-32 md:py-16">
                        <div className="w-full overflow-hidden">
                            <AnimatePresence mode="wait">
                                {total > 0 && slideAtual && (
                                    <motion.div
                                        key={index}
                                        drag="x"
                                        dragConstraints={{
                                            left: 0,
                                            right: 0,
                                        }}
                                        onDragEnd={handleDragEnd}
                                        initial={{ x: 300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -300, opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className={`my-8 flex flex-1 cursor-grab items-center gap-8 p-8 max-md:flex-wrap md:px-16 ${
                                            centralizado
                                                ? 'justify-center'
                                                : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            className={`flex flex-col gap-4 md:w-2/3 ${
                                                centralizado
                                                    ? 'text-center'
                                                    : ''
                                            }`}
                                        >
                                            <div>
                                                <h5
                                                    className="text-lg font-semibold text-yellow-500"
                                                    style={{
                                                        textShadow:
                                                            '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {slideAtual.title}
                                                </h5>
                                                <h4
                                                    className="text-4xl font-bold text-white "
                                                    style={{
                                                        textShadow:
                                                            '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {slideAtual.subtitle}
                                                </h4>
                                                <p
                                                    className={`my-4 text-slate-300 ${
                                                        centralizado
                                                            ? 'text-justify'
                                                            : 'text-center'
                                                    }`}
                                                    style={{
                                                        textShadow:
                                                            '2px 2px 16px rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {slideAtual.text}
                                                </p>
                                                {slideAtual.subtext && (
                                                    <p className="text-sm text-slate-400">
                                                        {slideAtual.subtext}
                                                    </p>
                                                )}
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
                                                    className="rounded-full bg-yellow-500 p-3 px-6 shadow-xl text-lg font-bold text-slate-950 transition hover:bg-yellow-600 text-white"
                                                >
                                                    {botaoRotulo}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {total > 0 && (
                            <div className="-bottom-8 flex w-full justify-center gap-3">
                                {Array.from({ length: total }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`h-3 w-3 rounded-full ${i === index ? 'bg-yellow-500' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
