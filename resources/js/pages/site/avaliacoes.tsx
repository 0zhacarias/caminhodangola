import { Head } from '@inertiajs/react';
import Flag from '@/assets/flag-england.png';
import { Footer } from '@/components/site/footer';
import SiteHero from '@/components/site/site-hero';
import { storageUrl } from '@/lib/utils';
import { useWhatsapp } from '@/lib/whatsapp';
import type { Depoimento, SlideHero, VideoDepoimento } from '@/types/site';

interface AvaliacoesProps {
    slides: SlideHero[];
    depoimentos: Depoimento[];
    videos: VideoDepoimento[];
}

export default function Avaliacoes({
    slides,
    depoimentos,
    videos,
}: AvaliacoesProps) {
    const whatsapp = useWhatsapp();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title="Avaliações" />

            <SiteHero slides={slides} depoimentos={depoimentos} />

            {/* Vídeos de avaliações */}
            <section className="bg-white px-6 py-12 md:px-32">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                    <h3 className="text-2xl font-bold">
                        Veja o que nossos clientes dizem
                    </h3>

                    {videos.length > 0 ? (
                        <div className="grid w-full gap-8 md:grid-cols-2 align-items-center justify-items-center">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <video
                                        className="w-full rounded-lg shadow-lg"
                                        controls
                                        preload="metadata"
                                    >
                                        <source
                                            src={storageUrl(video.video)}
                                            type="video/mp4"
                                        />
                                        Seu navegador não suporta a tag de
                                        vídeo.
                                    </video>

                                    {(video.titulo || video.descricao) && (
                                        <div className="flex w-full max-w-md items-center justify-center gap-4 rounded-xl bg-slate-100 p-4">
                                            <div className="inline-block shrink-0 rounded-full border-2 border-yellow-500 bg-white p-1">
                                                <img
                                                    className="h-12 w-12 rounded-full object-cover"
                                                    src={
                                                        video.bandeira
                                                            ? storageUrl(
                                                                  video.bandeira,
                                                              )
                                                            : Flag
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text-start">
                                                {video.titulo && (
                                                    <p className="text-lg font-semibold">
                                                        {video.titulo}
                                                    </p>
                                                )}
                                                {video.descricao && (
                                                    <p className="text-md text-slate-600">
                                                        {video.descricao}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg text-slate-400">
                            Sem vídeos no momento.
                        </p>
                    )}

                    <a
                        href={whatsapp.link()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 rounded-full bg-yellow-500 p-3 px-8 font-semibold text-slate-950 shadow-md transition hover:bg-yellow-400"
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
