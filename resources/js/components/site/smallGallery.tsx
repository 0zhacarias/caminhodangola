import { useState } from "react";
import { storageUrl } from "@/lib/utils";
import type { Galeria } from "@/types/site";

interface SmallGalleryProps {
  galeria: Galeria[];
}

// Embaralha a ordem das imagens
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function SmallGallery({ galeria }: SmallGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mapeia e embaralha as imagens do banco
  const images = galeria.map(item => storageUrl(item.imagem));
  const shuffledImages = shuffleArray(images);

  const closeModal = () => setSelectedImage(null);

  return (
    <section className="py-12 px-4 md:px-16 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
        Gallery
      </h2>

      {/* Grid de imagens */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
        {shuffledImages.map((src, idx) => (
          <div
            key={idx}
            className={`overflow-hidden rounded-xl cursor-pointer ${
              idx % 13 === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => setSelectedImage(src)}
          >
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Botão "See more" */}
      <div className="flex justify-center mt-8">
        <a
          href="/gallery"
          className="px-6 py-3 bg-slate-800 text-white rounded-xl shadow-md hover:bg-slate-700 transition-colors"
        >
          See more
        </a>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Impede o clique no fundo de fechar
          >
            <img
              src={selectedImage}
              alt="Full screen"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
