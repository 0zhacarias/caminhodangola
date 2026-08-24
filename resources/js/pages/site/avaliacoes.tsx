import { Head } from '@inertiajs/react';
import { useEffect, useState, useRef } from "react";
import { useAnimation, motion } from "framer-motion";
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import VideoSource from "@/assets/video.mp4";
import Flag from "@/assets/flag-england.png";
import type { Depoimento } from '@/types/site';

interface AvaliacoesProps {
    depoimentos: Depoimento[];
}

const DURATION = 20000; // duração de cada slide em ms

export default function Avaliacoes({ depoimentos }: AvaliacoesProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // controls para a barra de progresso (scaleX)
  const progressControls = useAnimation();
  const startTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Função que roda o loop do RAF e atualiza a barra
  const animateProgress = () => {
    if (depoimentos.length === 0) return;

    const update = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;
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

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
  };

  // Sempre que o index muda, reinicia barra/animação
  useEffect(() => {
    progressControls.set({ scaleX: 0 });
    elapsedRef.current = 0;
    startTimeRef.current = null;

    if (!isPaused && depoimentos.length > 0) animateProgress();

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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const goToSlide = (i: number) => setIndex(i);

  const Stars = ({ n }: { n: number }) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-yellow-400 ${i < n ? "opacity-100" : "opacity-40"}`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head title="Avaliações" />
      <div
        className="bg-slate-950 overflow-hidden relative z-0 flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="relative z-10 w-full">
          <Header />

          {/* Barra de fundo + barra animada */}
          <div className="h-1 bg-slate-700 w-full relative">
            <motion.div
              animate={progressControls}
              initial={{ scaleX: 0 }}
              style={{ transformOrigin: "0 50%" }}
              className="absolute left-0 top-0 h-1 bg-yellow-500 w-full origin-left"
            />
          </div>

          {/* Conteúdo do testimonial */}
          {depoimentos.length > 0 ? (
              <div className="w-full flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="max-w-3xl bg-slate-900/60 backdrop-blur-sm rounded-xl p-8 md:p-12 text-left text-white shadow-xl">
                  <div className="flex items-start gap-6 flex-col md:flex-row md:justify-center">
                    {/* avatar estilizado */}
                    <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 font-semibold text-lg shrink-0">
                      {depoimentos[index].nome
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="flex-1">
                      <Stars n={depoimentos[index].avaliacao} />
                      <p className="mt-4 text-lg md:text-xl leading-relaxed max-md:text-sm">
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
                <div className="flex items-center gap-3 mt-8">
                  {depoimentos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`w-3 h-3 rounded-full ${
                        i === index ? "bg-yellow-500" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
          ) : (
              <div className="w-full flex flex-col items-center justify-center py-32 px-6 text-center">
                  <p className="text-slate-400 text-lg">Sem avaliações no momento.</p>
              </div>
          )}
        </div>
      </div>

      {/* Conteúdo adicional / call-to-action */}
      <section className="py-12 px-6 md:px-32 bg-white">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-4 items-center">
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
          <div className="flex items-center gap-4 mt-4 justify-center bg-slate-100 p-4 rounded-xl w-full max-w-md">
            <div className="rounded-full border-2 border-yellow-500 p-1 inline-block bg-white">
              <img className="w-12 h-12" src={Flag} alt="" />
            </div>
            <div className="text-start">
              <p className="text-lg font-semibold">David</p>
              <p className="text-md text-slate-600">Tourist from England</p>
            </div>
          </div>
          <a
            href={`https://wa.me/+244923469271?text=${encodeURIComponent(
              "Hello! I would like more information about your tours."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 px-8 mt-4 rounded-full bg-yellow-500 text-slate-950 font-semibold shadow-md hover:bg-yellow-400 transition"
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
