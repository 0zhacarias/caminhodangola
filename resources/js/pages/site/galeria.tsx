import { Head } from '@inertiajs/react';
import type { Galeria } from '@/types/site';

interface GaleriaProps {
    galerias: Galeria[];
}

export default function Galeria({ galerias }: GaleriaProps) {
    return (
        <>
            <Head title="Galeria" />
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <h1 className="text-3xl font-bold">Galeria</h1>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {galerias.map((imagem) => (
                        <img
                            key={imagem.id}
                            src={imagem.imagem}
                            alt={imagem.alt ?? ''}
                            className="aspect-square w-full rounded-lg object-cover"
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
