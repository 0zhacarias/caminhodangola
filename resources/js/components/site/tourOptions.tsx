import { Link } from "@inertiajs/react";

export function TourOptions() {
  const options = [
    {
      title: "Day Experiences",
      type: "DAY TRIPS",
      features: [
        "Diverse one-day itineraries",
        "Top sightseeing locations",
        "Simple and fast booking",
        "Private local guide"
      ],
      action: { label: "Explore", link: "/day-trips" }
    },
    {
      title: "Signature Tours",
      type: "TOURS",
      features: [
        "Unforgettable travel moments",
        "Angola’s top destinations",
        "Handpicked highlights",
        "Experienced private guide"
      ],
      action: { label: "Explore", link: "/tours" }
    },
    {
      title: "Group Adventures",
      type: "GROUP",
      features: [
        "Travel with others",
        "Visit top landmarks",
        "Make new friends",
        "Budget-friendly experience"
      ],
      action: { label: "Request Now", link: "/group" }
    },
    {
      title: "Custom Journeys",
      type: "INDIVIDUAL",
      features: [
        "Fully personalized route",
        "Built around your interests",
        "Unique and exclusive",
        "Guided private tour"
      ],
      action: { label: "Explore", link: "/individual" }
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-slate-800 tracking-wide mb-4">
          Explore Our Tour Options
        </h2>
        <p className="text-center text-slate-600 text-sm md:text-base mb-12 max-w-2xl mx-auto">
          Whether you're seeking a curated experience, a personal journey, or the excitement of a group tour — discover the path that suits you best.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {options.map((opt) => (
            <div
              key={opt.type}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300"
            >
              <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wide">
                {opt.type}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-2 mb-4">
                {opt.title}
              </h3>
              <ul className="text-slate-600 space-y-1 text-sm mb-6">
                {opt.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={opt.action.link}
                className="inline-block text-sm font-semibold bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                {opt.action.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
