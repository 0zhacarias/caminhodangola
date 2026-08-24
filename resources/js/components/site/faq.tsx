import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import type { PerguntaFrequente } from "@/types/site";

interface FAQSectionProps {
  faqs: PerguntaFrequente[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Agrupa as FAQs por categoria
  const groupedFaqs = useMemo(() => {
    const groups: { category: string; items: PerguntaFrequente[] }[] = [];
    faqs.forEach((faq) => {
      let group = groups.find((g) => g.category === faq.categoria);
      if (!group) {
        group = { category: faq.categoria, items: [] };
        groups.push(group);
      }
      group.items.push(faq);
    });
    return groups;
  }, [faqs]);

  // How many groups to show initially (responsive UX)
  const INITIAL_VISIBLE_GROUPS = 6;
  const visibleFaqs = showAll ? groupedFaqs : groupedFaqs.slice(0, INITIAL_VISIBLE_GROUPS);

  const toggle = (index: string) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        {/* Two-column layout on md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleFaqs.map((group, gi) => (
            <div key={gi}>
              <h3 className="text-xl font-semibold mb-4">{group.category}</h3>

              <div className="space-y-4">
                {group.items.map((item, i) => {
                  const index = `${gi}-${i}`;
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={index}
                      className="border rounded-xl bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:scale-[1.01]"
                    >
                      <button
                        aria-expanded={isOpen}
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between bg-gray-100 p-4 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        <span className="font-md">{item.pergunta}</span>
                        <ChevronDown
                          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                      </button>

                      <div
                        className={`px-4 pb-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
                      >
                        <div className="mt-2 text-gray-700 whitespace-pre-line">{item.resposta}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* See more / Show less button */}
        {groupedFaqs.length > INITIAL_VISIBLE_GROUPS && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full text-sm transition"
              aria-expanded={showAll}
            >
              {showAll ? "Show less" : "See more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
