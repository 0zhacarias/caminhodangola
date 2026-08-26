import { usePage } from '@inertiajs/react';
import { DynamicIcon } from '@/lib/dynamic-icons';
import type { PorqueNos } from '@/types/site';

interface DestaquePadrao {
    icone: string;
    titulo: string;
    descricao: string;
}

interface ValorPadrao {
    icone: string;
    texto: string;
}

const DESTAQUES_PADRAO: DestaquePadrao[] = [
    {
        icone: 'map-pin',
        titulo: 'Local Expertise & Authenticity',
        descricao:
            'Our team consists of dynamic, committed local guides with deep knowledge of the regions. We are driven by genuine hospitality and a mission to reveal the true essence of Angola — from iconic sites to hidden treasures.',
    },
    {
        icone: 'sliders-horizontal',
        titulo: 'Fully Customizable Itineraries',
        descricao:
            'We create bespoke experiences tailored to your budget, interests, and schedule. We work closely with you to craft unique journeys — no off-the-shelf packages.',
    },
    {
        icone: 'shield-check',
        titulo: 'Service, Quality & Attention to Detail',
        descricao:
            "We're proud to provide exceptional service: reliable transportation, hand-picked accommodations, and a hands-on commitment to every detail — because our travelers' comfort and satisfaction come first.",
    },
    {
        icone: 'leaf',
        titulo: 'Respect for the Land & Communities',
        descricao:
            "We celebrate Angola's beauty, vibrant traditions, and the diversity of its communities. Our tours honor cultural and natural heritage, minimize impact, and support local development.",
    },
];

const VALORES_PADRAO: ValorPadrao[] = [
    {
        icone: 'users',
        texto: 'A dedicated team: we work together with a shared purpose.',
    },
    { icone: 'handshake', texto: "Integrity: we always do what's right." },
    { icone: 'smile', texto: 'Genuine hospitality: we put people first.' },
    {
        icone: 'users',
        texto: 'Inclusion: we listen, learn, and celebrate diversity.',
    },
    { icone: 'users', texto: 'Quality: excellence in every detail.' },
    { icone: 'leaf', texto: 'Community: local engagement is essential.' },
    {
        icone: 'users',
        texto: "Passion for Angola: it's our mission to share this country with the world.",
    },
];

const TITULO_PADRAO = "Why Choose Caminhos D'Angola?";
const INTRODUCAO_PADRAO =
    "Caminhos D'Angola is built on a strong reputation for delivering exceptional service, backed by deep regional expertise, tailor-made experiences, and competitive pricing. Every travel plan we design reflects our passion for Angola — we ensure each guest leaves with lasting impressions, a deeper appreciation for the country, and a desire to return.";
const TITULO_VALORES_PADRAO = 'Our Core Values';

export function WhyChooseUs() {
    const itens =
        usePage<{ porques_nos?: PorqueNos[] }>().props.porques_nos ?? [];

    const cabecalho = itens.find((item) => item.tipo === 'cabecalho');
    const destaques = itens.filter((item) => item.tipo === 'destaque');
    const valores = itens.filter((item) => item.tipo === 'valor');

    const titulo = cabecalho?.titulo ?? TITULO_PADRAO;
    const introducao = cabecalho?.descricao ?? INTRODUCAO_PADRAO;

    const destaquesVisiveis: DestaquePadrao[] = destaques.length
        ? destaques.map((item) => ({
              icone: item.icone ?? '',
              titulo: item.titulo,
              descricao: item.descricao ?? '',
          }))
        : DESTAQUES_PADRAO;

    const valoresVisiveis: ValorPadrao[] = valores.length
        ? valores.map((item) => ({
              icone: item.icone ?? '',
              texto: item.titulo,
          }))
        : VALORES_PADRAO;

    return (
        <section className="bg-gray-50 px-6 py-16 md:px-32">
            <div className="mx-auto mb-12 max-w-4xl text-center">
                <h2 className="mb-4 text-3xl font-bold">{titulo}</h2>
                <p className="leading-relaxed text-gray-700">{introducao}</p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {destaquesVisiveis.map((destaque) => (
                    <div
                        key={destaque.titulo}
                        className="flex items-start space-x-4"
                    >
                        <DynamicIcon
                            name={destaque.icone}
                            className="h-8 w-8 flex-shrink-0 text-yellow-500"
                        />
                        <div>
                            <h3 className="mb-2 text-2xl font-semibold">
                                {destaque.titulo}
                            </h3>
                            <p className="text-gray-700">
                                {destaque.descricao}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
                <h3 className="mb-4 text-center text-2xl font-semibold">
                    {TITULO_VALORES_PADRAO}
                </h3>
                <ul className="grid grid-cols-1 gap-6 text-gray-700 sm:grid-cols-2">
                    {valoresVisiveis.map((valor) => (
                        <li
                            key={valor.texto}
                            className="flex items-center space-x-3"
                        >
                            <DynamicIcon
                                name={valor.icone}
                                className="h-6 w-6 text-yellow-500"
                            />
                            <span>{valor.texto}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
