import { useEffect, useState, useRef } from 'react';
import { useAnimation } from 'framer-motion';
import { Header } from '@/components/site/header';
import Praias from '@/assets/places/praias.jpg';
import { Footer } from '@/components/site/footer';
import { WhyChooseUs } from '@/components/site/whyUs';
import { AboutUs } from '@/components/site/aboutUs';
import TeamSection from '@/components/site/team';

const slides = [
    {
        image: Praias,
        title: 'Discover Angola with local guides',
        subtitle: 'Angola Trails-explore deeper, travel better',
        text: `Step into the heart of Africa and uncover the beauty of Angola – a
    land of unspoiled nature, vibrant cultures, and breathtaking
    landscapes. From majestic deserts and powerful waterfalls to
    traditional tribes and remote wilderness, Angola offers a rich and
    genuine African experience. Discover a country that remains raw,
    diverse, and remarkably untouched – Angola awaits you with open
    arms.`,
    },
];

const DURATION = 20000; // duration in milliseconds

export default function AboutUsScreen() {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Controls de animação da barra de progresso
    const progressControls = useAnimation();
    // refs para controle de tempo
    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // Função que faz o loop de requestAnimationFrame
    const animateProgress = () => {
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
    };

    // Sempre que o index mudar, reinicia a animação
    useEffect(() => {
        progressControls.set({ scaleX: 0 });
        elapsedRef.current = 0;
        startTimeRef.current = null;

        animateProgress();

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [index, progressControls]);

    // Controla pausa / retoma
    useEffect(() => {
        if (isPaused) {
            // pausa: cancela o RAF e acumula elapsed
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (startTimeRef.current !== null) {
                elapsedRef.current += performance.now() - startTimeRef.current;
                startTimeRef.current = null;
            }
        } else {
            // retoma somente se ainda não completou
            if (elapsedRef.current < DURATION) {
                startTimeRef.current = null;
                animateProgress();
            }
        }
    }, [isPaused]);

    // Navegação por círculos
    const goToSlide = (i: number) => {
        setIndex(i);
    };

    // Swipe (arrastar)

    return (
        <div className="flex flex-col gap-6">
            <div className="">
                <div
                    className="xl :h-[42rem] relative z-0 flex flex-col overflow-hidden bg-slate-950"
                    onMouseDown={() => setIsPaused(true)}
                    onMouseUp={() => setIsPaused(false)}
                >
                    {/* Imagem de fundo animada */}

                    <div className="relative z-10 w-full">
                        <Header />

                        {/* Barra de progresso */}
                        <div className="h-1 w-full bg-slate-700"></div>
                        <div className="flex w-full flex-col items-center justify-between">
                            {/* Conteúdo do slide */}
                            <div className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden bg-slate-950 p-8 py-16 text-center">
                                <div className="flex flex-col gap-4 md:w-3/5 lg:w-2/5">
                                    <h5 className="text-lg font-semibold text-yellow-500">
                                        Our Story
                                    </h5>
                                    <h4 className="text-4xl font-bold text-white">
                                        People, places, and the environment in
                                        mind
                                    </h4>
                                    <p className="text-justify text-slate-300">
                                        Caminhos D'Angola is an Angolan-based
                                        tour operator dedicated to crafting
                                        flexible, authentic travel experiences.
                                        With deep local expertise and a passion
                                        for sustainable tourism, we design every
                                        journey around your interests, ensuring
                                        you see Angola like a local—immersed in
                                        culture and natural beauty.
                                    </p>
                                    <a
                                        href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                                            "Hello! I would like to learn more about Caminhos D'Angola.",
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block rounded-full bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>

                            {/* Círculos de navegação */}
                            <div className="absolute -bottom-8 flex w-full justify-center gap-3">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`h-3 w-3 rounded-full ${
                                            i === index
                                                ? 'bg-yellow-500'
                                                : 'bg-white/30'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AboutUs />
            <TeamSection />
            <WhyChooseUs />
            <Footer />
        </div>
    );
}
