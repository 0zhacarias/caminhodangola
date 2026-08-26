import { usePage } from '@inertiajs/react';
import { DynamicIcon } from '@/lib/dynamic-icons';
import type { SobreNos } from '@/types/site';

interface DestaquePadrao {
    icone: string;
    titulo: string;
    descricao: string;
}

const DESTAQUES_PADRAO: DestaquePadrao[] = [
    {
        icone: 'book-open',
        titulo: 'Local Roots',
        descricao:
            'Deeply rooted in Angolan culture, our team brings first-hand knowledge and authentic connections to every itinerary.',
    },
    {
        icone: 'target',
        titulo: 'Tailored Experiences',
        descricao:
            'Personalized trips designed to reveal Angola’s hidden gems and cultural richness — not just the highlights.',
    },
    {
        icone: 'eye',
        titulo: 'Respectful Immersion',
        descricao:
            'We design experiences that are respectful to communities and environments while allowing deep cultural exchange.',
    },
    {
        icone: 'flag',
        titulo: 'Sustainable Goals',
        descricao:
            'We partner with local communities to create tourism that brings tangible benefits and promotes sustainable development.',
    },
];

const TITULO_PADRAO = 'About Us';
const INTRODUCAO_PADRAO =
    'Wherever your adventure leads across Angola, Angola Trails is here to ensure your journey is as enriching and unforgettable as the destination itself. As a leading local travel agency rooted in Angolan culture, we specialize in crafting personalized itineraries that go beyond sightseeing — connecting you with the people, traditions, and stories that make Angola unique. From comfortable transportation and handpicked local accommodations to immersive cultural encounters and private guided tours, every detail is thoughtfully designed to offer you a deeper, more authentic travel experience from start to finish.';

export function AboutUs() {
    const itens = usePage<{ sobres_nos?: SobreNos[] }>().props.sobres_nos ?? [];

    const cabecalho = itens.find((item) => item.tipo === 'cabecalho');
    const blocosTexto = itens.filter((item) =>
        ['quem_somos', 'unico', 'citacao'].includes(item.tipo),
    );
    const destaques = itens.filter((item) => item.tipo === 'destaque');

    const titulo = cabecalho?.titulo ?? TITULO_PADRAO;
    const introducao = cabecalho?.descricao ?? INTRODUCAO_PADRAO;

    const destaquesVisiveis: DestaquePadrao[] = destaques.length
        ? destaques.map((item) => ({
              icone: item.icone ?? '',
              titulo: item.titulo ?? '',
              descricao: item.descricao ?? '',
          }))
        : DESTAQUES_PADRAO;

    return (
        <section className="bg-white px-6 py-16 text-slate-900 md:px-32">
            {/* Header / Intro */}
            <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold">{titulo}</h2>
                <p className="leading-relaxed text-gray-700">{introducao}</p>
            </div>

            {/* Who Are We / What Makes Us Unique */}
            <div className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
                {blocosTexto.length ? (
                    <div className="space-y-4">
                        {blocosTexto.map((bloco) => {
                            if (bloco.tipo === 'quem_somos') {
                                return (
                                    <div key={bloco.id}>
                                        <h3 className="text-2xl font-semibold">
                                            {bloco.titulo}
                                        </h3>
                                        <p className="leading-relaxed whitespace-pre-line text-gray-700">
                                            {bloco.descricao}
                                        </p>
                                    </div>
                                );
                            }

                            if (bloco.tipo === 'unico') {
                                return (
                                    <div key={bloco.id} className="mt-6">
                                        <h4 className="text-xl font-semibold">
                                            {bloco.titulo}
                                        </h4>
                                        <p className="leading-relaxed text-gray-700">
                                            {bloco.descricao}
                                        </p>
                                    </div>
                                );
                            }

                            return (
                                <p
                                    key={bloco.id}
                                    className="mt-4 leading-relaxed text-gray-700 italic"
                                >
                                    {bloco.descricao}
                                </p>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Who Are We?</h3>
                        <p className="leading-relaxed text-gray-700">
                            <strong>A lot like you.</strong>
                            <br />
                            We are a team passionate about travel, culture, and
                            nature, dedicated to making every detail of your
                            experience in Angola unforgettable. As travelers and
                            local hosts, we understand that planning a dream
                            trip can be just as challenging as it is exciting.
                            We also know that, without proper care, a trip may
                            not go as expected — and that’s exactly why we’re
                            here: to ensure your journey through Angola is safe,
                            inspiring, and truly unique.
                        </p>

                        <h4 className="mt-6 text-xl font-semibold">
                            What Makes Us Unique?
                        </h4>
                        <p className="leading-relaxed text-gray-700">
                            At Angola Trails, we don’t just offer tours — we
                            create meaningful connections. What sets us apart is
                            our deep local knowledge, our passion for
                            storytelling, and our commitment to cultural
                            immersion. We work hand in hand with local
                            communities to ensure every journey supports and
                            celebrates Angola’s diverse heritage. Our
                            itineraries are guided by locals who not only know
                            the terrain but carry the spirit of their land.
                            Whether you’re sharing a traditional meal with a
                            village elder, learning local crafts, or exploring
                            sacred natural sites, each experience is designed to
                            be personal, respectful, and unforgettable.
                        </p>

                        <p className="mt-4 leading-relaxed text-gray-700 italic">
                            We believe true travel happens when you step off the
                            beaten path and into the heart of a place.
                        </p>
                    </div>
                )}

                {/* Icons / Short highlights (replacing original story/mission/vision/goals blocks) */}
                <div className="grid grid-cols-1 gap-6">
                    {destaquesVisiveis.map((destaque) => (
                        <div
                            key={destaque.titulo}
                            className="flex items-start gap-4"
                        >
                            <DynamicIcon
                                name={destaque.icone}
                                className="h-8 w-8 flex-shrink-0 text-yellow-500"
                            />
                            <div>
                                <h4 className="text-lg font-semibold">
                                    {destaque.titulo}
                                </h4>
                                <p className="text-gray-700">
                                    {destaque.descricao}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
