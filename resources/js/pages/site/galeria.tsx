import { useEffect, useState, useRef } from "react";
import { Head } from '@inertiajs/react';
import { useAnimation } from "framer-motion";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import type { Galeria as GaleriaType } from "@/types/site";

const slides = [
  {
    image: "/images/places/praias.jpg",
    title: "Discover Angola with local guides",
    subtitle: "Angola Trails-explore deeper, travel better",
    text: `Step into the heart of Africa and uncover the beauty of Angola – a
    land of unspoiled nature, vibrant cultures, and breathtaking
    landscapes. From majestic deserts and powerful waterfalls to
    traditional tribes and remote wilderness, Angola offers a rich and
    genuine African experience. Discover a country that remains raw,
    diverse, and remarkably untouched – Angola awaits you with open
    arms.`,
  },
];

const DURATION = 20000;

interface GaleriaProps {
    galerias: GaleriaType[];
}

export default function GaleriaPage({ galerias }: GaleriaProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const progressControls = useAnimation();
  const startTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const animateProgress = () => {
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
        setIndex((prev) => (prev + 1) % slides.length);
      }
    };

    rafRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    progressControls.set({ scaleX: 0 });
    elapsedRef.current = 0;
    startTimeRef.current = null;

    animateProgress();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, progressControls]);

  useEffect(() => {
    if (isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (startTimeRef.current !== null) {
        elapsedRef.current += performance.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
    } else {
      if (elapsedRef.current < DURATION) {
        startTimeRef.current = null;
        animateProgress();
      }
    }
  }, [isPaused]);

  const goToSlide = (i: number) => {
    setIndex(i);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head title="Galeria" />
      
      <div
        className="bg-slate-950 overflow-hidden relative z-0 xl:h-[42rem] flex flex-col"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
      >
        <div className="relative z-10 w-full">
          <Header />

          <div className="h-1 bg-slate-700 w-full"></div>
          <div className="flex flex-col justify-between items-center w-full">
            <div className="overflow-hidden w-full items-center justify-center flex flex-col gap-4 p-8 py-16 bg-slate-950 text-center">
              <div className="md:w-3/5 lg:w-2/5 flex flex-col gap-4">
                <h5 className="text-yellow-500 text-lg font-semibold">
                  Captured Moments
                </h5>
                <h4 className="text-white text-4xl font-bold">
                  Explore Our Angola Gallery
                </h4>
                <p className="text-slate-300">
                  Discover the vibrant landscapes, rich cultures, and
                  unforgettable experiences of Angola through our curated
                  photo collection. From misty waterfalls to bustling markets,
                  each image tells a story of adventure and heritage.
                </p>
                <a
                  href="/pacotes"
                  className="mt-4 inline-block text-slate-900 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full font-semibold transition self-center"
                >
                  Browse Tours
                </a>
              </div>
            </div>

            <div className="absolute -bottom-8 w-full flex justify-center gap-3">
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
      
      <Gallery galerias={galerias} />
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
