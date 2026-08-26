import { usePage } from '@inertiajs/react';
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from 'lucide-react';
import logoIdeal from '../../assets/logotipo-caminhosdangola.svg';

interface FooterProps {
    configuracoes?: Record<string, string>;
}

type ConfiguracoesPortal = Record<string, string | null>;

interface RedeSocial {
    chave: string;
    nome: string;
    url?: string | null;
    ativo?: string | null;
    padrao?: string;
    Icon: typeof InstagramIcon;
}

const REDES_PADRAO: Omit<RedeSocial, 'url' | 'ativo'>[] = [
    {
        chave: 'instagram',
        nome: 'Instagram',
        Icon: InstagramIcon,
        padrao: 'https://instagram.com/caminhosdangola',
    },
    { chave: 'facebook', nome: 'Facebook', Icon: FacebookIcon },
    { chave: 'twitter', nome: 'X / Twitter', Icon: TwitterIcon },
    { chave: 'youtube', nome: 'YouTube', Icon: YoutubeIcon },
];

export function Footer({ configuracoes = {} }: FooterProps) {
    const partilhadas =
        usePage<{ configuracoes?: ConfiguracoesPortal }>().props
            .configuracoes ?? {};

    const valores: ConfiguracoesPortal = { ...partilhadas, ...configuracoes };

    const slogan = valores['slogan'] ?? 'Angola Tourism – Travel different';

    const redes: RedeSocial[] = REDES_PADRAO.map((rede) => ({
        ...rede,
        url: valores[rede.chave],
        ativo: valores[`${rede.chave}_ativo`],
    }));

    const redesVisiveis = redes.filter(
        (rede) => (rede.url || rede.padrao) && rede.ativo !== '0',
    );

    return (
        <footer className="mt-16 bg-slate-950 px-6 py-12 text-slate-100 md:px-32">
            <div className="flex flex-col flex-wrap justify-between gap-12 border-b border-slate-700 pb-10 md:flex-row">
                {/* Logo & Slogan */}
                <div className="flex max-w-sm flex-col gap-4">
                    <img
                        src={logoIdeal}
                        alt="Logo Caminhos de Angola"
                        className="w-40 brightness-0 invert"
                    />
                    <p className="text-sm text-slate-400">{slogan}</p>
                </div>

                {/* Reserve Info */}
                <div className="flex flex-col gap-3 text-sm">
                    <h3 className="mb-2 font-semibold tracking-wide text-slate-200 uppercase">
                        Get In Touch
                    </h3>
                    {valores['email_contato'] ? (
                        <p>{valores['email_contato']}</p>
                    ) : (
                        <p>geral@caminhosdangola.com</p>
                    )}
                    {valores['telefone_principal'] ? (
                        <p>{valores['telefone_principal']}</p>
                    ) : (
                        <p>(+244) 923 469 271</p>
                    )}
                    {valores['telefone_secundario'] ? (
                        <p>{valores['telefone_secundario']}</p>
                    ) : (
                        <p>(+244) 942 381 493</p>
                    )}
                    <p>Whatsapp | LINE</p>
                    {valores['horario_funcionamento'] ? (
                        <p>{valores['horario_funcionamento']}</p>
                    ) : (
                        <p>08:00 AM – 17:00 PM</p>
                    )}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-3 text-sm">
                    <h3 className="mb-2 font-semibold tracking-wide text-slate-200 uppercase">
                        Address
                    </h3>
                    {valores['endereco'] ? (
                        <p className="whitespace-pre-line">
                            {valores['endereco']}
                        </p>
                    ) : (
                        <p>
                            Comandante Jica Street, near the Moçâmedes Hotel{' '}
                            <br />
                            <span className="font-bold">Namibe - Angola</span>
                        </p>
                    )}
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-3 text-sm">
                    <h3 className="mb-2 font-semibold tracking-wide text-slate-200 uppercase">
                        Follow Us
                    </h3>
                    <div className="flex gap-4 text-yellow-400">
                        {redesVisiveis.map((rede) => (
                            <a
                                key={rede.nome}
                                href={rede.url ?? rede.padrao}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={rede.nome}
                                className="hover:text-white"
                            >
                                <rede.Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 md:flex-row">
                <p>© {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
