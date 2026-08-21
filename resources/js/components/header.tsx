import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

interface MenuItem {
    label: string;
    path: string;
    subItems: { label: string; path: string }[];
}

export default function Header() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const menu: MenuItem[] = [
        { label: 'Home', path: '/', subItems: [] },
        { label: 'Reviews', path: '/reviews', subItems: [] },
        { label: 'Private Tours', path: '/private-tours', subItems: [] },
        { label: 'Group Tours', path: '/group-tours', subItems: [] },
        { label: 'About Us', path: '/about-us', subItems: [] },
        { label: 'Gallery', path: '/gallery', subItems: [] },
    ];

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

    return (
        <header className="relative flex flex-1 items-center justify-between border-b-2 border-slate-600 bg-slate-50 px-8 py-6 md:px-32">
            {/* Logo */}
            <div className="flex min-w-[8rem] shrink-0 items-center">
                <Link href="/">
                    <img
                        src="/logotipo-caminhosdangola.svg"
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
                {/* Reserve - desktop only */}
                <a
                    href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                        'Hello! I would like more information about your tours.',
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden rounded-full bg-yellow-500 p-2 px-6 xl:inline-block"
                >
                    Reserve
                </a>

                {/* Hamburger (mobile) */}
                <button
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                    className="rounded-md p-2 text-slate-950 hover:bg-slate-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none xl:hidden"
                >
                    <Menu size={28} />
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
                                src="/logotipo-caminhosdangola.svg"
                                alt="Logo"
                                className="w-28 brightness-0 invert"
                            />
                        </Link>

                        <button
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                            className="rounded-md p-2 text-slate-100 hover:bg-slate-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4">
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
                            href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                                'Hello! I would like more information about your tours.',
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block rounded-full bg-yellow-500 p-2 px-6 text-center text-slate-950"
                            onClick={() => setMobileOpen(false)}
                        >
                            Reserve
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
