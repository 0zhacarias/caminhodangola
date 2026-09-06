import { Link, router } from '@inertiajs/react';
import { Menu01Icon, Cancel01Icon } from 'hugeicons-react';
import { Languages } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { localeLabels, supportedLocales } from '@/i18n';
import type { Locale } from '@/i18n';
import { useWhatsapp } from '@/lib/whatsapp';
import { update as updateLocale } from '@/routes/locale';
import Logo from '../../assets/logotipo-caminhosdangola.svg';

interface MenuItem {
    label: string;
    path: string;
    subItems: { label: string; path: string }[];
}

export function Header() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [fixo, setFixo] = useState(false);
    const [altura, setAltura] = useState(0);
    const headerRef = useRef<HTMLElement | null>(null);
    const whatsapp = useWhatsapp();
    const { t, i18n } = useTranslation();

    const menu: MenuItem[] = [
        { label: t('home'), path: '/', subItems: [] },
        { label: t('reviews'), path: '/avaliacoes', subItems: [] },
        { label: t('privateTours'), path: '/private-tours', subItems: [] },
        { label: t('groupTours'), path: '/group-tours', subItems: [] },
        { label: t('aboutUs'), path: '/sobre', subItems: [] },
        { label: t('gallery'), path: '/galeria', subItems: [] },
    ];

    const alterarIdioma = (locale: Locale) => {
        if (locale === i18n.language) {
            return;
        }

        void i18n.changeLanguage(locale);
        router.patch(updateLocale().url, { locale }, { preserveScroll: true });
    };

    // Close mobile menu with Escape
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setMobileOpen(false);
            }
        }

        if (mobileOpen) {
            window.addEventListener('keydown', onKey);
        }

        return () => window.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    // Fixa o menu no topo ao fazer scroll
    useEffect(() => {
        const onScroll = () => setFixo(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Mede a altura do cabeçalho para reservar espaço quando fica fixo
    useEffect(() => {
        const header = headerRef.current;

        if (!header) {
            return;
        }

        const medir = () => setAltura(header.offsetHeight);
        medir();

        const observador = new ResizeObserver(medir);
        observador.observe(header);

        return () => observador.disconnect();
    }, []);

    const fixoVisivel = fixo && !mobileOpen;

    return (
        <>
            {fixoVisivel && (
                <div aria-hidden="true" style={{ height: altura }} />
            )}
            <header
                ref={headerRef}
                className={`flex flex-1 items-center justify-between border-b-2 border-slate-600 bg-slate-50 px-8 py-6 md:px-32 ${
                    fixoVisivel
                        ? 'fixed inset-x-0 top-0 z-50 shadow-md'
                        : 'relative'
                }`}
            >
                {/* Logo */}
                <div className="flex min-w-[8rem] shrink-0 items-center">
                    <Link href="/">
                        <img
                            src={Logo}
                            alt="Logotipo Caminhos de Angola"
                            className="w-32 object-contain"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="relative hidden items-center gap-8 xl:flex">
                    {menu.map((item, idx) => (
                        <div
                            key={item.label}
                            className="relative p-1 py-2"
                            onMouseEnter={() => setOpenIndex(idx)}
                            onMouseLeave={() => setOpenIndex(null)}
                        >
                            <Link
                                href={item.path}
                                className="w-32 whitespace-nowrap text-slate-950 hover:text-yellow-500"
                            >
                                {item.label}
                            </Link>

                            {openIndex === idx && item.subItems.length > 0 && (
                                <div className="absolute top-full left-0 z-50 mt-0 w-48 rounded-md bg-slate-800 shadow-lg">
                                    <ul className="flex flex-col p-2 text-sm">
                                        {item.subItems.map((sub) => (
                                            <li key={sub.path}>
                                                <Link
                                                    href={sub.path}
                                                    className="block rounded px-4 py-2 text-slate-200 hover:bg-slate-700"
                                                >
                                                    {sub.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Buttons / Controls on the right */}
                <div className="flex items-center gap-4">
                    <div className="hidden items-center gap-1 xl:flex">
                        {supportedLocales.map((locale) => (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => alterarIdioma(locale)}
                                className={`rounded px-2 py-1 text-xs font-medium ${i18n.language === locale ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                {localeLabels[locale]}
                            </button>
                        ))}
                    </div>
                    {/* Reserve - desktop only */}
                    <a
                        href={whatsapp.link()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden rounded-full bg-yellow-500 p-2 px-6 xl:inline-block"
                    >
                        {t('reserve')}
                    </a>

                    {/* Login - desktop only */}
                    <Link
                        href="/login"
                        className="hidden rounded-full border border-slate-300 p-2 px-6 text-slate-950 hover:bg-slate-200 xl:inline-block"
                    >
                        {t('login')}
                    </Link>

                    {/* Hamburger (mobile) */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                        className="rounded-md p-2 text-slate-950 hover:bg-slate-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none xl:hidden"
                    >
                        <Menu01Icon size={28} />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileOpen && (
                    <div
                        className="bg-opacity-95 fixed inset-0 z-40 flex flex-col bg-slate-950 px-8 py-6"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <Link href="/" onClick={() => setMobileOpen(false)}>
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="w-28 brightness-0 invert"
                                />
                            </Link>

                            <button
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                                className="rounded-md p-2 text-slate-100 hover:bg-slate-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                            >
                                <Cancel01Icon size={28} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-slate-100">
                                {supportedLocales.map((locale) => (
                                    <button
                                        key={locale}
                                        type="button"
                                        onClick={() => alterarIdioma(locale)}
                                        className={`rounded px-2 py-1 text-xs ${i18n.language === locale ? 'bg-white text-slate-950' : 'bg-slate-800'}`}
                                    >
                                        {localeLabels[locale]}
                                    </button>
                                ))}
                            </div>
                            {menu.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="text-lg font-semibold text-slate-100 hover:text-yellow-500"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {/* Reserve dentro do menu mobile */}
                            <a
                                href={whatsapp.link()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block rounded-full bg-yellow-500 p-2 px-6 text-center text-slate-950"
                                onClick={() => setMobileOpen(false)}
                            >
                                {t('reserve')}
                            </a>

                            {/* Login dentro do menu mobile */}
                            <Link
                                href="/login"
                                className="inline-block rounded-full border border-slate-500 p-2 px-6 text-center text-slate-100 hover:bg-slate-800"
                                onClick={() => setMobileOpen(false)}
                            >
                                {t('login')}
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
