import { Star } from 'lucide-react';
import Luanda from '../../assets/places/luanda2.jpg';
import Mega from '../../assets/places/mega.jpg';
import Cultura from '../../assets/places/cultura.jpg';
import NorteESul from '../../assets/places/norteesul.jpg';
import NamibeLubango from '../../assets/places/namibelubango.jpg';
import Quedas2 from '../../assets/places/quedas2.jpg';

interface Package {
  title: string;
  image: string;
  duration: string;
  cost: string;
  description: string;
  rating: number;
}

const packages: Package[] = [
  {
    title: "Luanda City Tour",
    image: Luanda,
    duration: "8-9 hours",
    cost: "On request",
    description: "Explore Angola's vibrant capital—visit its historic monuments, natural beauty spots, and modern infrastructure in a guided city tour.",
    rating: 4,
  },
  {
    title: "Mega Tour Angola",
    image: Mega,
    duration: "14 days",
    cost: "On request",
    description: "This epic route immerses you in authentic villages, colorful markets, and natural wonders across Angola's culturally rich regions.",
    rating: 5,
  },
  {
    title: "Culture, Nature & Desert",
    image: Cultura,
    duration: "9 days",
    cost: "On request",
    description: "Discover one of the world's oldest deserts—explore the stunning Namibe Desert and its unique desert landscapes.",
    rating: 4,
  },
  {
    title: "North & South Angola",
    image: NorteESul,
    duration: "9 days",
    cost: "On request",
    description: "Journey from Angola's ancient deserts in the south to the lush forests and vibrant cultures up north.",
    rating: 4,
  },
  {
    title: "Namibe & Lubango Tour",
    image: NamibeLubango,
    duration: "2 days",
    cost: "On request",
    description: "Experience the mountain landscapes and desert beauty of Lubango and Namibe, with rich cultural heritage stops.",
    rating: 5,
  },
  {
    title: "Kalandula Falls & Pedras Negras",
    image: Quedas2,
    duration: "3 days",
    cost: "On request",
    description: "Visit the majestic Kalandula Falls and the legendary Pedras Negras rock formations for an unforgettable natural spectacle.",
    rating: 5,
  },
  {
    title: "Custom Journey",
    image: NamibeLubango,
    duration: "Flexible",
    cost: "On request",
    description: "Craft a fully personalized itinerary that matches your interests and pace for the ultimate Angola experience.",
    rating: 5,
  },
];

export function TourPackages() {
  const phone = "+244923469271";

  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Available Packages</h2>
      <div className="flex flex-col gap-12">
        {packages.map((pkg) => {
          const message = encodeURIComponent(
            `Hello! I would like more information about the "${pkg.title}" package, please.`
          );
          const url = `https://wa.me/${phone}?text=${message}`;

          return (
            <div
              key={pkg.title}
              className="flex md:w-2/3 self-center flex-col md:flex-row bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: pkg.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">{pkg.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500 mb-2 sm:mb-0">
                    <span className="font-medium">Duration:</span> {pkg.duration}
                  </div>
                  <div className="text-sm text-slate-500 mb-4 sm:mb-0">
                    <span className="font-medium">Cost:</span> {pkg.cost}
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
