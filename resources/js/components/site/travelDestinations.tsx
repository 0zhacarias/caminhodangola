import DefaultIcon from "../../assets/places/praias.jpg";

const tours = [
  {
    title: "Explore Luanda in 8 hours",
    image: DefaultIcon,
    duration: "8 hours",
    start: "Luanda",
    description:
      "Embark on an epic road trip from the capital, winding north to M’Banza Congo, then east through Malanje’s waterfalls, down to the sunbaked south coast — all at your own pace.",
    link: "/tours/angola-by-car",
  },
  {
    title: "Namibe & Desert Coast",
    image: DefaultIcon,
    duration: "9–15 days / 8–14 nights",
    start: "Namibe",
    description:
      "From the red dunes of Tombua to deserted islands at Baía dos Tigres, discover sweeping beaches, shipwrecks, and vibrant desert wildlife.",
    link: "/tours/namibe",
  },
];

export default function TravelDestinations() {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Journey Packages
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Choose from a curated collection of experiences across Angola—by road,
        rail, air or foot—and discover the landscapes, cultures and hidden gems
        that make this country unique.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tours.map((t) => (
          <div
            key={t.title}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{t.description}</p>
              <p className="text-xs text-slate-500 mb-4">
                <span className="font-medium">{t.duration}</span> — starts in{" "}
                <span className="font-medium">{t.start}</span>
              </p>
              {/*
              <Link
                href={t.link}
                className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                View More
              </Link>*/}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
