import { useState } from 'react';
import { storageUrl } from '@/lib/utils';
import type { Galeria } from '@/types/site';

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
    const images = galeria.map((item) => storageUrl(item.imagem));
    const shuffledImages = shuffleArray(images);

    const closeModal = () => setSelectedImage(null);

    return (
        <section className="bg-gray-50 px-4 py-12 md:px-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-800 md:text-3xl">
                Gallery
            </h2>

            {/* Grid de imagens */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:gap-3 lg:grid-cols-6">
                {shuffledImages.map((src, idx) => (
                    <div
                        key={idx}
                        className={`cursor-pointer overflow-hidden rounded-xl ${
                            idx % 13 === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                        onClick={() => setSelectedImage(src)}
                    >
                        <img
                            src={src}
                            alt={`Gallery image ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Botão "See more" */}
            <div className="mt-8 flex justify-center">
                <a
                    href="/galeria"
                    className="rounded-xl bg-slate-800 px-6 py-3 text-white shadow-md transition-colors hover:bg-slate-700"
                >
                    See more
                </a>
            </div>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
                    onClick={closeModal}
                >
                    <div
                        className="max-h-[90vh] max-w-4xl overflow-hidden rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Impede o clique no fundo de fechar
                    >
                        <img
                            src={selectedImage}
                            alt="Full screen"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
