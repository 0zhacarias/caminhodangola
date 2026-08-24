// components/Itinerary.tsx
import React, { useEffect, useRef, useState } from "react";

export interface ItineraryItem {
  dayLabel: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ItineraryProps {
  title: string;
  subtitle?: string;
  priceEur: number;
  photoPackageEur?: number;
  itinerary: ItineraryItem[];
  gallery: string[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  importantRemarks: string[];
  contactNumber?: string; // e.g. "+244923469271"
}

export default function Itinerary({
  title,
  subtitle,
  priceEur,
  //photoPackageEur = 0,
  itinerary,
  gallery,
  included,
  excluded,
  whatToBring,
  importantRemarks,
  contactNumber = "+244923469271",
}: ItineraryProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "itinerary" | "essential" | "map" | "gallery" | "data"
  >("overview");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Lightbox state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const item = container.children[activeIndex] as HTMLElement | undefined;
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  // close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setActiveIndex((i) => Math.min(itinerary.length - 1, i + 1));

  const active = itinerary[activeIndex];

  const openImage = (url: string) => setSelectedImage(url);
  const closeImage = () => setSelectedImage(null);

  return (
    <section className="py-8 px-4 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>

          <div className="hidden md:block">
            <div className="rounded-xl p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow">
              <div className="text-xs">Starting price (quote)</div>
              <div className="mt-1 text-2xl font-bold">
                {" "}
                <span className="font-normal">from</span> €{priceEur}
              </div>
              <div className="mt-1 text-xs">per person</div>
              <div className="mt-2 text-xs opacity-95"></div>
            </div>
          </div>
        </header>

        <div className="md:grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 hidden md:block">
            <nav className="sticky top-6 bg-white rounded-lg p-3 shadow-sm space-y-2">
              {[
                { id: "overview", label: "Overview" },
                { id: "itinerary", label: "Itinerary" },
                { id: "essential", label: "Essential info" },
                { id: "map", label: "Map" },
                { id: "gallery", label: "Gallery" },
                { id: "data", label: "Data & prices" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`w-full text-left p-2 rounded-md transition flex items-center gap-3 text-sm font-medium ${
                    activeTab === t.id
                      ? "bg-yellow-50 border border-yellow-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs ${
                      activeTab === t.id
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t.label[0]}
                  </span>
                  <span>{t.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="md:col-span-3 space-y-6">
            <div className="md:hidden space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Quick info</div>
                    <div className="font-semibold">€{priceEur} / person</div>
                  </div>
                  <div>
                    <a
                      href={`https://wa.me/${contactNumber.replace(
                        /\s+/g,
                        ""
                      )}?text=${encodeURIComponent(
                        "Hello! I would like more information about your tours."
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded bg-yellow-500 text-white text-sm"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-2 shadow-sm flex justify-between">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "itinerary", label: "Itinerary" },
                  { id: "essential", label: "Info" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`flex-1 text-center p-2 text-sm rounded-md ${
                      activeTab === t.id ? "bg-yellow-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div>
              {activeTab === "overview" && (
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-xl font-semibold">Overview</h2>
                      <p className="mt-2 text-sm text-gray-700">{subtitle}</p>

                      <ul className="mt-3 text-sm text-gray-700 list-disc list-inside space-y-1">
                        <li>4×4 transport, English-speaking guide</li>
                        <li>Starting price from €{priceEur} per person</li>
                      </ul>

                      <div className="mt-4 flex gap-3">
                        <a
                          href={`https://wa.me/${contactNumber.replace(
                            /\s+/g,
                            ""
                          )}?text=${encodeURIComponent(
                            "Hello! I would like make a new book."
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded bg-yellow-500 text-white"
                        >
                          Book now
                        </a>
                        <button
                          onClick={() => setActiveTab("itinerary")}
                          className="px-4 py-2 rounded border"
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
                        onClick={() => openImage(gallery[0])}
                        className="w-full md:w-48 h-36 object-cover rounded-md shadow-sm cursor-pointer transition hover:opacity-90"
                      />
                    )}
                  </div>
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Itinerary</h3>
                    <div className="text-xs text-gray-500">
                      Day {activeIndex + 1} / {itinerary.length}
                    </div>
                  </div>

                  <div className="rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={active.imageUrl}
                        alt={active.title}
                        onClick={() => openImage(active.imageUrl)}
                        className="w-full h-56 object-cover cursor-pointer"
                      />

                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20">
                        <button
                          onClick={goPrev}
                          className="p-2 rounded-full bg-white/80"
                        >
                          ◀
                        </button>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20">
                        <button
                          onClick={goNext}
                          className="p-2 rounded-full bg-white/80"
                        >
                          ▶
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500">
                        {active.dayLabel}
                      </div>
                      <h4 className="font-semibold mt-1">{active.title}</h4>
                      <p className="mt-2 text-sm text-gray-700">
                        {active.description}
                      </p>

                      <div className="mt-4">
                        <div
                          ref={listRef}
                          className="flex gap-2 overflow-x-auto py-2"
                        >
                          {itinerary.map((d, i) => (
                            <button
                              key={d.dayLabel}
                              onClick={() => setActiveIndex(i)}
                              className={`flex-shrink-0 w-36 p-2 rounded-md text-left text-sm ${
                                i === activeIndex
                                  ? "bg-yellow-50 border border-yellow-200"
                                  : "bg-gray-50 hover:bg-gray-100"
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {d.dayLabel}
                              </div>
                              <div className="font-medium truncate">
                                {d.title}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "essential" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <CardSection title="Included">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {included.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </CardSection>

                  <CardSection title="Excluded">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {excluded.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </CardSection>

                  <CardSection title="What to bring">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {whatToBring.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </CardSection>

                  <CardSection title="Important remarks">
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {importantRemarks.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </CardSection>
                </div>
              )}

              {activeTab === "map" && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold mb-3">Map</h3>
                  <div className="w-full h-72 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
                    Map placeholder — embed OpenStreetMap / Google Maps here
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    Tip: replace the placeholder with an embedded map iframe
                    (centered on southern Angola) or a Leaflet/Mapbox component.
                  </div>
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold mb-3">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {gallery.map((g, i) => (
                      <img
                        key={i}
                        src={g}
                        alt={`gallery-${i}`}
                        onClick={() => openImage(g)}
                        className="w-full h-36 object-cover rounded-md cursor-pointer transition hover:opacity-90"
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "data" && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold mb-3">Data & prices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <CardSection title="Pricing">
                        <div className="text-sm">
                          <div>
                            Base price:{" "}
                            <span className="font-semibold">€{priceEur}</span> /
                            person
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            Estimated personal spending: €500
                          </div>
                        </div>
                      </CardSection>

                      <CardSection title="Booking & payment">
                        <ol className="list-decimal list-inside text-sm space-y-1">
                          <li>Deposit: 30% to confirm.</li>
                          <li>Balance: due 30 days before departure.</li>
                          <li>
                            Payment methods: bank transfer, card (check
                            availability).
                          </li>
                        </ol>
                      </CardSection>
                    </div>

                    <div>

                      <CardSection title="Contact">
                        <div className="text-sm">
                          For bookings or questions, contact via WhatsApp or email: <br />
                          <a
                            href={`https://wa.me/${contactNumber.replace(
                              /\s+/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-yellow-600"
                          >
                            {contactNumber}
                          </a><br />
                          <a href={`mailto:reservas@caminhosdangola.com`} className="text-yellow-600">
                            reservas@caminhosdangola.com
                          </a>
                        </div>
                      </CardSection>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {gallery.slice(0, 3).map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt={`preview-${i}`}
                    onClick={() => openImage(g)}
                    className="w-28 h-20 object-cover rounded-md cursor-pointer"
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${contactNumber.replace(
                    /\s+/g,
                    ""
                  )}?text=${encodeURIComponent(
                    "Hello! I would like make a new book."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded bg-yellow-500 text-white"
                >
                  Book now
                </a>
              </div>
            </div>
          </main>
        </div>

        <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur rounded-xl shadow-lg p-2 flex justify-between items-center">
          {[
            { id: "overview", label: "Overview", icon: "🏁" },
            { id: "itinerary", label: "Itinerary", icon: "🗓️" },
            { id: "essential", label: "Info", icon: "ℹ️" },
            { id: "map", label: "Map", icon: "🗺️" },
            { id: "gallery", label: "Gallery", icon: "🖼️" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 text-center p-2 text-xs ${
                activeTab === t.id ? "text-yellow-600" : "text-gray-600"
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
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={closeImage}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImage}
                aria-label="Close image"
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl hover:bg-black transition"
              >
                ✖
              </button>
              <img
                src={selectedImage}
                alt="Enlarged"
                className="w-full max-h-[85vh] object-contain rounded-lg shadow-lg"
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
    <div className="p-4 rounded-lg bg-white shadow-sm">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
