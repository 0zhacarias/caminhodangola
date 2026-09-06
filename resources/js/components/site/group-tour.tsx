import { usePage } from '@inertiajs/react';
import { Mail, MessageSquare } from 'lucide-react';
import { DynamicIcon } from '@/lib/dynamic-icons';
import { useEmail } from '@/lib/email';
import { useWhatsapp } from '@/lib/whatsapp';
import type { TourGrupo } from '@/types/site';

interface DestaquePadrao {
    icone: string;
    titulo: string;
    descricao: string;
}

interface CtaPadrao {
    rotulo: string;
    mensagem: string;
    link: string;
}

const DESTAQUES_PADRAO: DestaquePadrao[] = [
    {
        icone: 'users-round',
        titulo: 'Community',
        descricao:
            'Travel with like-minded people and share unforgettable moments in a welcoming group.',
    },
    {
        icone: 'globe-2',
        titulo: 'Join solo or with friends',
        descricao:
            "Whether you're exploring solo or bringing company, our tours welcome all — from ages 11 to 81!",
    },
    {
        icone: 'landmark',
        titulo: 'Cultural immersion',
        descricao:
            'Go beyond surface tourism — dive deep into Angola’s history, traditions, and local life with our expert guides.',
    },
];

const TITULO_PADRAO = 'Group tours for the curious and adventurous';
const INTRODUCAO_PADRAO =
    'Join one of our unforgettable group tours through Angola. Led by expert guides, our trips are designed for curious minds and bold spirits who seek authenticity, culture, and community — all while exploring safely and deeply.';
const CTA_WHATSAPP_PADRAO: CtaPadrao = {
    rotulo: 'Join a Group Tour',
    mensagem:
        "Hi! I'm interested in joining a group tour with Caminhos D'Angola. Can you send me more info?",
    link: '',
};
const CTA_EMAIL_PADRAO: CtaPadrao = {
    rotulo: 'Join a Group Tour on Email',
    mensagem:
        "Hi! I'm interested in joining a group tour with Caminhos D'Angola. Can you send me more info?",
    link: '',
};

export function GroupTourSection() {
    const itens =
        usePage<{ tours_grupos?: TourGrupo[] }>().props.tours_grupos ?? [];

    const whatsapp = useWhatsapp();
    const emailContato = useEmail();

    const cabecalho = itens.find((item) => item.tipo === 'cabecalho');
    const destaques = itens.filter((item) => item.tipo === 'destaque');
    const ctaWhatsapp = itens.find((item) => item.tipo === 'cta_whatsapp');
    const ctaEmail = itens.find((item) => item.tipo === 'cta_email');

    const titulo = cabecalho?.titulo ?? TITULO_PADRAO;
    const introducao = cabecalho?.descricao ?? INTRODUCAO_PADRAO;

    const destaquesVisiveis: DestaquePadrao[] = destaques.length
        ? destaques.map((item) => ({
              icone: item.icone ?? '',
              titulo: item.titulo,
              descricao: item.descricao ?? '',
          }))
        : DESTAQUES_PADRAO;

    const ctaWhatsappVisivel: CtaPadrao = ctaWhatsapp
        ? {
              rotulo: ctaWhatsapp.titulo,
              mensagem: ctaWhatsapp.descricao ?? '',
              link: ctaWhatsapp.link ?? CTA_WHATSAPP_PADRAO.link,
          }
        : CTA_WHATSAPP_PADRAO;

    const ctaEmailVisivel: CtaPadrao = ctaEmail
        ? {
              rotulo: ctaEmail.titulo,
              mensagem: ctaEmail.descricao ?? '',
              link: ctaEmail.link ?? emailContato.email,
          }
        : { ...CTA_EMAIL_PADRAO, link: emailContato.email };

    const numeroWhatsapp = ctaWhatsappVisivel.link || whatsapp.numero;
    const whatsappUrl = ctaWhatsappVisivel.link.startsWith('http')
        ? ctaWhatsappVisivel.link
        : whatsapp.link(ctaWhatsappVisivel.mensagem, numeroWhatsapp);

    const emailUrl = ctaEmailVisivel.link.startsWith('mailto:')
        ? ctaEmailVisivel.link
        : `mailto:${ctaEmailVisivel.link}`;

    return (
        <section className="bg-white px-6 py-16 md:px-32">
            <div className="mx-auto mb-12 max-w-5xl text-center">
                <h2 className="text-lg font-semibold text-yellow-500">
                    Group Tours
                </h2>
                <h3 className="my-4 text-3xl font-bold text-slate-800 md:text-4xl">
                    {titulo}
                </h3>
                <p className="mx-auto max-w-3xl text-lg text-slate-600">
                    {introducao}
                </p>
            </div>

            <div className="grid gap-8 text-center md:grid-cols-3">
                {destaquesVisiveis.map((destaque) => (
                    <div
                        key={destaque.titulo}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-4 rounded-full bg-yellow-100 p-4">
                            <DynamicIcon
                                name={destaque.icone}
                                className="h-8 w-8 text-yellow-500"
                            />
                        </div>
                        <h4 className="mb-2 text-xl font-semibold text-slate-800">
                            {destaque.titulo}
                        </h4>
                        <p className="text-slate-600">{destaque.descricao}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex w-full items-center justify-center gap-4 text-center">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-green-600"
                >
                    <MessageSquare className="mr-3 h-6 w-6" aria-hidden />
                    {ctaWhatsappVisivel.rotulo}
                </a>
                <a
                    href={`${emailUrl}?subject=Group Tour Inquiry&body=${encodeURIComponent(
                        ctaEmailVisivel.mensagem,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-yellow-600"
                >
                    <Mail className="mr-3 h-6 w-6" aria-hidden />
                    {ctaEmailVisivel.rotulo}
                </a>
            </div>
        </section>
    );
}
