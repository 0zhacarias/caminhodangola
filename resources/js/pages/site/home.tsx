import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Header } from "../../components/site/header";
import Discover from "../../components/site/discover";
import { Footer } from "../../components/site/footer";
import Packages from "../../components/site/packages";
import { Testimonials } from "../../components/site/testimonials";
import { WhyChooseUs } from "../../components/site/whyUs";
import { SmallGallery } from "../../components/site/smallGallery";
import FAQSection from "../../components/site/faq";
import TeamSection from "../../components/site/team";

import { storageUrl } from '@/lib/utils';
import type { SlideHero, Pacote, Depoimento, Galeria, MembroEquipa, Seccao, Estatistica, PerguntaFrequente } from '@/types/site';

interface HomeProps {
    slides: SlideHero[];
    configuracoes: Record<string, string>;
    seccoes: Seccao[];
    pacotes: Pacote[];
    depoimentos: Depoimento[];
    estatisticas: Estatistica[];
    galeria: Galeria[];
    membros: MembroEquipa[];
    faqs: PerguntaFrequente[];
}

const DURATION = 20000; // duration in milliseconds

export default function Home({
  slides: dbSlides,
  pacotes,
  depoimentos,
  galeria,
  membros,
  configuracoes,
  seccoes,
  estatisticas,
  faqs,
}: HomeProps) {
  // Format slides from DB to match original structure
  const slides = dbSlides.map((slide) => ({
    image: storageUrl(slide.imagem),
    title: slide.titulo,
    subtitle: slide.subtitulo ?? '',
    text: slide.texto ?? '',
  }));
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
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

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
        if (slides.length > 0) {
          setIndex((prev) => (prev + 1) % slides.length);
        }
      }
    };

    rafRef.current = requestAnimationFrame(update);
  };

  // Sempre que o index mudar, reinicia a animação
  useEffect(() => {
    progressControls.set({ scaleX: 0 });
    elapsedRef.current = 0;
    startTimeRef.current = null;

    if (!isPaused) {
      animateProgress();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, progressControls]); // Não inclui isPaused para não reiniciar do zero ao pausar/despausar

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
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -100) {
      setIndex((prev) => (prev + 1) % slides.length);
    } else if (info.offset.x > 100) {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="">
        <div
          className="bg-slate-950 overflow-hidden relative z-0 flex flex-col"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Imagem de fundo animada */}
          <AnimatePresence>
            {slides.length > 0 && slides[index] && (
              <motion.img
                key={index}
                src={slides[index].image}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 0.7 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-screen h-full absolute top-0 left-0 object-cover"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 w-full">
            <Header />

            {/* Barra de progresso */}
            <div className="h-1 bg-slate-700 w-full">
              <motion.div
                className="h-full bg-yellow-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={progressControls}
                transition={{ duration: 0, ease: "linear" }}
              />
            </div>
            <div className="flex flex-col justify-between items-center w-full flex-1 md:gap-32 py-8 md:py-16">
              {/* Conteúdo do slide */}
              <div className="overflow-hidden w-full">
                <AnimatePresence>
                  {slides.length > 0 && slides[index] && (
                    <motion.div
                      key={index}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="flex max-md:flex-wrap flex-1 p-8 md:px-16 justify-start gap-8 items-center my-8 cursor-grab"
                    >
                      <div className="md:w-2/5 flex flex-col gap-4">
                        <div>
                          <h5
                            className="text-slate-50 text-2xl font-serif"
                            style={{
                              textShadow: "2px 2px 16px rgba(0, 0, 0, 0.8)",
                            }}
                          >
                            {slides[index].title}
                          </h5>
                          <h4
                            className="text-slate-50 text-5xl font-serif"
                            style={{
                              textShadow: "2px 2px 16px rgba(0, 0, 0, 0.8)",
                            }}
                          >
                            {slides[index].subtitle}
                          </h4>
                          <p
                            className="text-white text-justify my-4"
                            style={{
                              textShadow: "2px 2px 16px rgba(0, 0, 0, 0.8)",
                            }}
                          >
                            {slides[index].text}
                          </p>
                        </div>
                        <div>
                          <a
                            href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                              "Hello! I would like more information about your tours."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 px-6 rounded-full bg-yellow-500 shadow-xl"
                          
                          >
                            Reserve
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Círculos de navegação */}
              <div className="-bottom-8 w-full flex justify-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`w-3 h-3 rounded-full ${
                      i === index ? "bg-yellow-500" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Discover/>
      <Packages pacotes={pacotes} />
      <WhyChooseUs />
      <SmallGallery galeria={galeria} />
      <TeamSection membros={membros} />
      <Testimonials depoimentos={depoimentos} />
      <FAQSection faqs={faqs} />
      <Footer configuracoes={configuracoes} />
    </div>
  );
}
