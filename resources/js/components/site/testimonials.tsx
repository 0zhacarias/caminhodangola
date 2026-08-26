import { Quote, Star } from "lucide-react";
import { useState } from "react";
import type { Depoimento } from "@/types/site";

interface TestimonialsProps {
  depoimentos: Depoimento[];
}

export function Testimonials({ depoimentos }: TestimonialsProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section className="bg-white py-20 px-6 md:px-20 border-t overflow-hidden">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-4 text-slate-800">What Travelers Say</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Hear directly from travelers who explored Angola with Caminhos D'Angola.
        </p>
      </div>

      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-6 animate-scroll-left-once"
          style={{
            animationPlayState: paused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {depoimentos.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-sm hover:shadow-lg transition duration-300 rounded-xl p-6 relative flex flex-col gap-4 w-full md:min-w-[350px] md:max-w-[400px]"
            >
              <Quote className="text-yellow-500 absolute top-4 right-4 w-6 h-6" />

              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.mensagem}"
              </p>

              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < testimonial.avaliacao
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <div className="border-t pt-4 mt-auto">
                <p className="font-semibold text-gray-900">{testimonial.nome}</p>
                <p className="text-sm text-gray-500">{testimonial.localizacao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
