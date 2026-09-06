// components/Itinerary.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useEmail } from '@/lib/email';
import { useWhatsapp } from '@/lib/whatsapp';

export interface ItineraryItem {
    dayLabel: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface ItineraryProps {
    title: string;
    subtitle?: string;
    description?: string | null;
    priceEur: number;
    photoPackageEur?: number;
    itinerary: ItineraryItem[];
    gallery: string[];
    included: string[];
    excluded: string[];
    whatToBring: string[];
    importantRemarks: string[];
    precoBasePorPessoa?: string | null;
    gastoPessoalEstimado?: string | null;
    depositoPercentagem?: number | null;
    saldoDiasAntesPartida?: number | null;
    metodosPagamento?: string[];
    contactNumber?: string; // opcional — usa o número global das Configurações
}

export default function Itinerary({
    title,
    subtitle,
    description,
    priceEur,
    photoPackageEur,
    itinerary,
    gallery,
    included,
    excluded,
    whatToBring,
    importantRemarks,
    gastoPessoalEstimado,
    depositoPercentagem,
    saldoDiasAntesPartida,
    metodosPagamento = [],
    contactNumber,
}: ItineraryProps) {
    const whatsapp = useWhatsapp();
    const emailContato = useEmail();
    const numeroContacto = contactNumber ?? whatsapp.numero;
    const [activeTab, setActiveTab] = useState<
        'overview' | 'itinerary' | 'essential' | 'map' | 'gallery' | 'data'
    >('overview');
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<HTMLDivElement | null>(null);

    // Lightbox state
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const container = listRef.current;

        if (!container) {
            return;
        }

        const item = container.children[activeIndex] as HTMLElement | undefined;

        if (item) {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, [activeIndex]);

    // close on Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImage(null);
            }
        };
        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const goNext = () =>
        setActiveIndex((i) => Math.min(itinerary.length - 1, i + 1));

    const active = itinerary[activeIndex];

    const openImage = (url: string) => setSelectedImage(url);
    const closeImage = () => setSelectedImage(null);

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-8 md:px-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold md:text-3xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-1 text-sm text-gray-600">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="hidden md:block">
                        <div className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 text-white shadow">
                            <div className="text-xs">
                                Starting price (quote)
                            </div>
                            <div className="mt-1 text-2xl font-bold">
                                {' '}
                                <span className="font-normal">from</span> €
                                {priceEur}
                            </div>
                            <div className="mt-1 text-xs">per person</div>
                            <div className="mt-2 text-xs opacity-95"></div>
                        </div>
                    </div>
                </header>

                <div className="gap-6 md:grid md:grid-cols-4">
                    <aside className="hidden md:col-span-1 md:block">
                        <nav className="sticky top-6 space-y-2 rounded-lg bg-white p-3 shadow-sm">
                            {[
                                { id: 'overview', label: 'Overview' },
                                { id: 'itinerary', label: 'Itinerary' },
                                { id: 'essential', label: 'Essential info' },
                                { id: 'map', label: 'Map' },
                                { id: 'gallery', label: 'Gallery' },
                                { id: 'data', label: 'Data & prices' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id as any)}
                                    className={`flex w-full items-center gap-3 rounded-md p-2 text-left text-sm font-medium transition ${
                                        activeTab === t.id
                                            ? 'border border-yellow-200 bg-yellow-50'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <span
                                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                                            activeTab === t.id
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {t.label[0]}
                                    </span>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <main className="space-y-6 md:col-span-3">
                        <div className="space-y-3 md:hidden">
                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-gray-500">
                                            Quick info
                                        </div>
                                        <div className="font-semibold">
                                            €{priceEur} / person
                                        </div>
                                    </div>
                                    <div>
                                        <a
                                            href={whatsapp.link(
                                                'Hello! I would like more information about your tours.',
                                                numeroContacto,
                                            )}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded bg-yellow-500 px-3 py-2 text-sm text-white"
                                        >
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between rounded-lg bg-white p-2 shadow-sm">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'itinerary', label: 'Itinerary' },
                                    { id: 'essential', label: 'Info' },
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() =>
                                            setActiveTab(t.id as any)
                                        }
                                        className={`flex-1 rounded-md p-2 text-center text-sm ${
                                            activeTab === t.id
                                                ? 'bg-yellow-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div>
                            {activeTab === 'overview' && (
                                <div className="rounded-lg bg-white p-5 shadow-sm">
                                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                        <div className="min-w-0">
                                            <h2 className="text-xl font-semibold">
                                                Overview
                                            </h2>
                                            {description && (
                                                <p className="mt-2 text-sm whitespace-pre-line text-gray-700">
                                                    {description}
                                                </p>
                                            )}
                                            {!description && subtitle && (
                                                <p className="mt-2 text-sm text-gray-700">
                                                    {subtitle}
                                                </p>
                                            )}

                                            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700">
                                                <li>
                                                    4×4 transport,
                                                    English-speaking guide
                                                </li>
                                                <li>
                                                    Starting price from €
                                                    {priceEur} per person
                                                </li>
                                            </ul>

                                            <div className="mt-4 flex gap-3">
                                                <a
                                                    href={whatsapp.link(
                                                        'Hello! I would like make a new book.',
                                                        numeroContacto,
                                                    )}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="rounded bg-yellow-500 px-4 py-2 text-white"
                                                >
                                                    Book now
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        setActiveTab(
                                                            'itinerary',
                                                        )
                                                    }
                                                    className="rounded border px-4 py-2"
                                                >
                                                    See itinerary
                                                </button>
                                            </div>
                                        </div>

                                        {/* Overview image clickable if gallery has at least one */}
                                        {gallery[0] && (
                                            <img
                                                src={gallery[0]}
                                                alt="overview"
                                                onClick={() =>
                                                    openImage(gallery[0])
                                                }
                                                className="h-36 w-full cursor-pointer rounded-md object-cover shadow-sm transition hover:opacity-90 md:w-48"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="rounded-lg bg-white p-4 shadow-sm">
                                    {itinerary.length === 0 ? (
                                        <p className="text-sm text-gray-500">
                                            No itinerary available for this
                                            package.
                                        </p>
                                    ) : (
                                        <>
                                            <div className="mb-3 flex items-center justify-between">
                                                <h3 className="font-semibold">
                                                    Itinerary
                                                </h3>
                                                <div className="text-xs text-gray-500">
                                                    Day {activeIndex + 1} /{' '}
                                                    {itinerary.length}
                                                </div>
                                            </div>

                                            <div className="overflow-hidden rounded-lg">
                                                <div className="relative">
                                                    {active.imageUrl ? (
                                                        <img
                                                            src={
                                                                active.imageUrl
                                                            }
                                                            alt={active.title}
                                                            onClick={() =>
                                                                openImage(
                                                                    active.imageUrl,
                                                                )
                                                            }
                                                            className="h-56 w-full cursor-pointer object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-32 w-full items-center justify-center bg-slate-100 text-sm text-gray-400">
                                                            No image
                                                        </div>
                                                    )}

                                                    <div className="absolute top-1/2 left-3 z-20 -translate-y-1/2 transform">
                                                        <button
                                                            onClick={goPrev}
                                                            disabled={
                                                                activeIndex ===
                                                                0
                                                            }
                                                            className="rounded-full bg-white/80 p-2 disabled:opacity-30"
                                                        >
                                                            ◀
                                                        </button>
                                                    </div>
                                                    <div className="absolute top-1/2 right-3 z-20 -translate-y-1/2 transform">
                                                        <button
                                                            onClick={goNext}
                                                            disabled={
                                                                activeIndex ===
                                                                itinerary.length -
                                                                    1
                                                            }
                                                            className="rounded-full bg-white/80 p-2 disabled:opacity-30"
                                                        >
                                                            ▶
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <div className="text-xs text-gray-500">
                                                        {active.dayLabel}
                                                    </div>
                                                    <h4 className="mt-1 font-semibold">
                                                        {active.title}
                                                    </h4>
                                                    <p className="mt-2 text-sm whitespace-pre-line text-gray-700">
                                                        {active.description}
                                                    </p>

                                                    <div className="mt-4">
                                                        <div
                                                            ref={listRef}
                                                            className="flex gap-2 overflow-x-auto py-2"
                                                        >
                                                            {itinerary.map(
                                                                (d, i) => (
                                                                    <button
                                                                        key={
                                                                            d.dayLabel
                                                                        }
                                                                        onClick={() =>
                                                                            setActiveIndex(
                                                                                i,
                                                                            )
                                                                        }
                                                                        className={`w-36 flex-shrink-0 rounded-md p-2 text-left text-sm ${
                                                                            i ===
                                                                            activeIndex
                                                                                ? 'border border-yellow-200 bg-yellow-50'
                                                                                : 'bg-gray-50 hover:bg-gray-100'
                                                                        }`}
                                                                    >
                                                                        <div className="text-xs text-gray-500">
                                                                            {
                                                                                d.dayLabel
                                                                            }
                                                                        </div>
                                                                        <div className="truncate font-medium">
                                                                            {
                                                                                d.title
                                                                            }
                                                                        </div>
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === 'essential' && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <CardSection title="Included">
                                        <ul className="list-inside list-disc space-y-1 text-sm">
                                            {included.map((i) => (
                                                <li key={i}>{i}</li>
                                            ))}
                                        </ul>
                                    </CardSection>

                                    <CardSection title="Excluded">
                                        <ul className="list-inside list-disc space-y-1 text-sm">
                                            {excluded.map((e) => (
                                                <li key={e}>{e}</li>
                                            ))}
                                        </ul>
                                    </CardSection>

                                    <CardSection title="What to bring">
                                        <ul className="list-inside list-disc space-y-1 text-sm">
                                            {whatToBring.map((w) => (
                                                <li key={w}>{w}</li>
                                            ))}
                                        </ul>
                                    </CardSection>

                                    <CardSection title="Important remarks">
                                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                                            {importantRemarks.map((r) => (
                                                <li key={r}>{r}</li>
                                            ))}
                                        </ul>
                                    </CardSection>
                                </div>
                            )}

                            {activeTab === 'map' && (
                                <div className="rounded-lg bg-white p-4 shadow-sm">
                                    <h3 className="mb-3 font-semibold">Map</h3>
                                    <div className="w-full overflow-hidden rounded-md">
                                        <iframe
                                            title="Mapa de Angola"
                                            src="https://www.openstreetmap.org/export/embed.html?bbox=10.5%2C-18.5%2C25.0%2C-4.5&layer=mapnik"
                                            className="h-72 w-full border-0"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="mt-3 text-xs text-gray-600">
                                        Replace this embed with a custom map
                                        (Google Maps / Leaflet) if needed.
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gallery' && (
                                <div className="rounded-lg bg-white p-4 shadow-sm">
                                    <h3 className="mb-3 font-semibold">
                                        Gallery
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                        {gallery.map((g, i) => (
                                            <img
                                                key={i}
                                                src={g}
                                                alt={`gallery-${i}`}
                                                onClick={() => openImage(g)}
                                                className="h-36 w-full cursor-pointer rounded-md object-cover transition hover:opacity-90"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'data' && (
                                <div className="rounded-lg bg-white p-4 shadow-sm">
                                    <h3 className="mb-3 font-semibold">
                                        Data & prices
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <CardSection title="Pricing">
                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        Base price:{' '}
                                                        <span className="font-semibold">
                                                            €{priceEur}
                                                        </span>{' '}
                                                        / person
                                                    </div>
                                                    {photoPackageEur != null &&
                                                        photoPackageEur > 0 && (
                                                            <div>
                                                                Photo package:{' '}
                                                                <span className="font-semibold">
                                                                    €
                                                                    {
                                                                        photoPackageEur
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    {gastoPessoalEstimado && (
                                                        <div className="text-xs text-gray-600">
                                                            Estimated personal
                                                            spending: €
                                                            {
                                                                gastoPessoalEstimado
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </CardSection>

                                            <CardSection title="Booking & payment">
                                                <div className="space-y-2 text-sm">
                                                    {depositoPercentagem !=
                                                        null &&
                                                        depositoPercentagem >
                                                            0 && (
                                                            <div>
                                                                Deposit:{' '}
                                                                <span className="font-semibold">
                                                                    {
                                                                        depositoPercentagem
                                                                    }
                                                                    %
                                                                </span>{' '}
                                                                to confirm.
                                                            </div>
                                                        )}
                                                    {saldoDiasAntesPartida !=
                                                        null &&
                                                        saldoDiasAntesPartida >
                                                            0 && (
                                                            <div>
                                                                Balance due:{' '}
                                                                <span className="font-semibold">
                                                                    {
                                                                        saldoDiasAntesPartida
                                                                    }{' '}
                                                                    days
                                                                </span>{' '}
                                                                before
                                                                departure.
                                                            </div>
                                                        )}
                                                    {metodosPagamento.length >
                                                        0 && (
                                                        <div>
                                                            <div className="mb-1 font-medium">
                                                                Payment methods:
                                                            </div>
                                                            <ul className="list-inside list-disc space-y-1">
                                                                {metodosPagamento.map(
                                                                    (m) => (
                                                                        <li
                                                                            key={
                                                                                m
                                                                            }
                                                                        >
                                                                            {m}
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {depositoPercentagem ==
                                                        null &&
                                                        saldoDiasAntesPartida ==
                                                            null &&
                                                        metodosPagamento.length ===
                                                            0 && (
                                                            <p className="text-xs text-gray-600">
                                                                Payment
                                                                conditions on
                                                                request.
                                                            </p>
                                                        )}
                                                </div>
                                            </CardSection>
                                        </div>

                                        <div>
                                            <CardSection title="Contact">
                                                <div className="text-sm">
                                                    For bookings or questions,
                                                    contact via WhatsApp or
                                                    email: <br />
                                                    <a
                                                        href={whatsapp.link(
                                                            undefined,
                                                            numeroContacto,
                                                        )}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-yellow-600"
                                                    >
                                                        {numeroContacto}
                                                    </a>
                                                    <br />
                                                    <a
                                                        href={emailContato.link(
                                                            'Booking inquiry',
                                                        )}
                                                        className="text-yellow-600"
                                                    >
                                                        {emailContato.email}
                                                    </a>
                                                </div>
                                            </CardSection>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="hidden items-center justify-between gap-4 md:flex">
                            <div className="flex gap-2">
                                {gallery.slice(0, 3).map((g, i) => (
                                    <img
                                        key={i}
                                        src={g}
                                        alt={`preview-${i}`}
                                        onClick={() => openImage(g)}
                                        className="h-20 w-28 cursor-pointer rounded-md object-cover"
                                    />
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={whatsapp.link(
                                        'Hello! I would like make a new book.',
                                        numeroContacto,
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded bg-yellow-500 px-4 py-2 text-white"
                                >
                                    Book now
                                </a>
                            </div>
                        </div>
                    </main>
                </div>

                <nav className="fixed right-3 bottom-3 left-3 z-40 flex items-center justify-between rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur md:hidden">
                    {[
                        { id: 'overview', label: 'Overview', icon: '🏁' },
                        { id: 'itinerary', label: 'Itinerary', icon: '🗓️' },
                        { id: 'essential', label: 'Info', icon: 'ℹ️' },
                        { id: 'map', label: 'Map', icon: '🗺️' },
                        { id: 'gallery', label: 'Gallery', icon: '🖼️' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id as any)}
                            className={`flex-1 p-2 text-center text-xs ${
                                activeTab === t.id
                                    ? 'text-yellow-600'
                                    : 'text-gray-600'
                            }`}
                        >
                            <div className="text-lg">{t.icon}</div>
                            <div className="mt-1">{t.label}</div>
                        </button>
                    ))}
                </nav>

                {/* LIGHTBOX / POPUP */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                        onClick={closeImage}
                        aria-modal="true"
                        role="dialog"
                    >
                        <div
                            className="relative mx-4 w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeImage}
                                aria-label="Close image"
                                className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black"
                            >
                                ✖
                            </button>
                            <img
                                src={selectedImage}
                                alt="Enlarged"
                                className="max-h-[85vh] w-full rounded-lg object-contain shadow-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function CardSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-lg bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold">{title}</h4>
            <div className="text-sm text-gray-700">{children}</div>
        </div>
    );
}
