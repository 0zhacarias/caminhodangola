import { useState } from "react";
import { storageUrl } from "@/lib/utils";
import type { Galeria as GaleriaType } from "@/types/site";

interface GalleryProps {
  galerias: GaleriaType[];
}

export function Gallery({ galerias }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => setSelectedImage(null);

  return (
    <section className="py-12 px-4 md:px-16 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
        Gallery
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
        {galerias.map((item, idx) => (
          <div
            key={item.id}
            className={`overflow-hidden rounded-xl cursor-pointer ${
              idx % 13 === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => setSelectedImage(storageUrl(item.imagem))}
          >
            <img
              src={storageUrl(item.imagem)}
              alt={item.alt || `Gallery image ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
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

export default Gallery;
