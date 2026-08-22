import { useState } from 'react';
import ImageLightbox from '@/components/image-lightbox';
import type { ImagemLightbox } from '@/components/image-lightbox';

export default function ImageThumbnail({
    imagens,
    indiceInicial,
    src,
    alt = '',
    className,
}: {
    imagens: ImagemLightbox[];
    indiceInicial: number;
    src: string;
    alt?: string;
    className: string;
}) {
    const [aberto, setAberto] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setAberto(true)}
                aria-label="Abrir imagem em tamanho maior"
                className="block cursor-zoom-in overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
                <img src={src} alt={alt} className={className} />
            </button>

            {aberto && (
                <ImageLightbox
                    imagens={imagens}
                    indiceInicial={indiceInicial}
                    onClose={() => setAberto(false)}
                />
            )}
        </>
    );
}
