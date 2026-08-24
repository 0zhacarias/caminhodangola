import {
  MountainIcon,
  PlaneIcon,
  AngryBirdIcon,
  Location08Icon,
  MusicNote02Icon,
  FishFoodIcon,
  Route01Icon,
  BookOpen01Icon,
  Tree01Icon,
  BedIcon,
  Train01Icon,
  WindSurfIcon,
} from "hugeicons-react";
import type { JSX } from "react";

interface Category {
  label: string;
  description: string;
  icon: JSX.Element;
}

export function CategoryGrid() {
  const categories: Category[] = [
    {
      label: "Adventure",
      description: "From wild camping to scenic flights — Angola thrills adventurers.",
      icon: <PlaneIcon size={32} />,
    },
    {
      label: "Birdlife",
      description: "A paradise for bird lovers, rich in rare and endemic species.",
      icon: <AngryBirdIcon size={32} />,
    },
    {
      label: "Cross Border",
      description: "Explore neighboring countries in a single unforgettable journey.",
      icon: <Route01Icon size={32} />,
    },
    {
      label: "Culture",
      description: "Experience Angola’s artistic soul, traditions, and local lifestyles.",
      icon: <Location08Icon size={32} />,
    },
    {
      label: "Dance",
      description: "Feel the rhythm of Kizomba and local beats rooted in heritage.",
      icon: <MusicNote02Icon size={32} />,
    },
    {
      label: "Fishing",
      description: "Catch giants in some of the richest fishing waters in Africa.",
      icon: <FishFoodIcon size={32} />,
    },
    {
      label: "Hiking & Climbing",
      description: "Climb mountains and hike pristine trails across stunning landscapes.",
      icon: <MountainIcon size={32} />,
    },
    {
      label: "History",
      description: "Explore Angola’s layered past — from kingdoms to colonial times.",
      icon: <BookOpen01Icon size={32} />,
    },
    {
      label: "Nature",
      description: "Waterfalls, rock formations, and unique biomes await discovery.",
      icon: <Tree01Icon size={32} />,
    },
    {
      label: "Relaxation",
      description: "Unwind at beaches or hit the golf course for pure serenity.",
      icon: <BedIcon size={32} />,
    },
    {
      label: "Train Travel",
      description: "Travel deeper — scenic train routes through the heart of Angola.",
      icon: <Train01Icon size={32} />,
    },
    {
      label: "Wildlife",
      description: "Spot elephants, hippos, giraffes and much more in the wild.",
      icon: <WindSurfIcon size={32} />,
    },
  ];

  return (
    <section className="text-slate-900 py-16 px-6 md:px-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        What are you interested in?
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="bg-slate-50 hover:bg-slate-200 transition rounded-xl py-16 p-6 shadow-sm flex flex-col items-center gap-3"
          >
            <div className="text-yellow-600 p-4 bg-slate-100 rounded-full">{cat.icon}</div>
            <h3 className="font-semibold text-lg">{cat.label}</h3>
            <p className="text-sm text-slate-600">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
