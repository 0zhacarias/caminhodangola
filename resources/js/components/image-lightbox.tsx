import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface ImagemLightbox {
    src: string;
    alt: string;
}

export default function ImageLightbox({
    imagens,
    indiceInicial,
    onClose,
}: {
    imagens: ImagemLightbox[];
    indiceInicial: number;
    onClose: () => void;
}) {
    const [indice, setIndice] = useState(indiceInicial);

    const anterior = useCallback(() => {
        setIndice((atual) => (atual - 1 + imagens.length) % imagens.length);
    }, [imagens.length]);

    const seguinte = useCallback(() => {
        setIndice((atual) => (atual + 1) % imagens.length);
    }, [imagens.length]);

    useEffect(() => {
        const aoTeclar = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                onClose();
            } else if (event.key === 'ArrowLeft') {
                anterior();
            } else if (event.key === 'ArrowRight') {
                seguinte();
            }
        };

        window.addEventListener('keydown', aoTeclar, true);

        return () => {
            window.removeEventListener('keydown', aoTeclar, true);
        };
    }, [anterior, seguinte, onClose]);

    const imagem = imagens[indice];

    const conteudo = (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Imagem ${indice + 1} de ${imagens.length}`}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-12"
            onClick={onClose}
        >
            <button
                type="button"
                aria-label="Fechar"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
                <XIcon className="size-6" />
            </button>

            {imagens.length > 1 && (
                <button
                    type="button"
                    aria-label="Imagem anterior"
                    onClick={(event) => {
                        event.stopPropagation();
                        anterior();
                    }}
                    className={cn(
                        'absolute left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                    )}
                >
                    <ChevronLeftIcon className="size-7" />
                </button>
            )}

            <img
                src={imagem.src}
                alt={imagem.alt}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />

            {imagens.length > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Imagem seguinte"
                        onClick={(event) => {
                            event.stopPropagation();
                            seguinte();
                        }}
                        className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <ChevronRightIcon className="size-7" />
                    </button>

                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {indice + 1} / {imagens.length}
                    </span>
                </>
            )}
        </div>
    );

    return createPortal(conteudo, document.body);
}
