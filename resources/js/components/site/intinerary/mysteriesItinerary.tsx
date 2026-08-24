import Itinerary, { type ItineraryItem } from "./intinirary";

import Pic1 from "../../assets/MysteriesOfThePhantom/1.jpg";
import Pic2 from "../../assets/MysteriesOfThePhantom/2.jpg";
import Pic3 from "../../assets/MysteriesOfThePhantom/3.jpg";
import Pic4 from "../../assets/MysteriesOfThePhantom/4.jpg";
import Pic5 from "../../assets/MysteriesOfThePhantom/5.jpg";
import Pic6 from "../../assets/MysteriesOfThePhantom/6.jpg";
import Pic7 from "../../assets/MysteriesOfThePhantom/7.jpg";
import Pic8 from "../../assets/MysteriesOfThePhantom/8.jpg";
import Pic9 from "../../assets/MysteriesOfThePhantom/9.jpg";
import Pic10 from "../../assets/MysteriesOfThePhantom/10.jpg";

const itinerary: ItineraryItem[] = [
  {
    dayLabel: "Day 1",
    title: "Into the Namibe Desert",
    description: `Embark on your desert adventure: cross endless dunes and narrow passages between ocean and sand. 
Tonight, camp beneath a sky ablaze with stars — the silence of the desert will be your lullaby.`,
    imageUrl: Pic1,
  },
  {
    dayLabel: "Day 2",
    title: "Baía dos Tigres & Desert Majesty",
    description: `Roam the towering dunes of Namibe before reaching Baía dos Tigres, a mysterious bay cut off from the mainland. 
Discover its abandoned settlement and its secrets, where history, ocean, and desert intertwine.`,
    imageUrl: Pic2,
  },
  {
    dayLabel: "Day 3",
    title: "Arches, Hills & Ancient Plants",
    description: `Return slowly towards the coast, stopping at surreal arches carved by wind, ochre-colored hills, and the ancient Welwitschia Mirabilis — a plant older than civilizations. 
The afternoon is free to relax on a quiet beach.`,
    imageUrl: Pic3,
  },
  {
    dayLabel: "Day 4",
    title: "Farewell Namibe, Hello Luanda",
    description: `Enjoy one last morning in Namibe before flying back to Luanda. 
In the evening, celebrate your journey with a special farewell dinner in the capital.`,
    imageUrl:   Pic4,
  },
];

const gallery = [Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7, Pic8, Pic9, Pic10];

const included = [
  "4x4 vehicles with fuel",
  "English-speaking guide",
  "Camping logistics (cook, mattress and tents)",
  "Hotel accommodation where indicated",
  "Meals on camping nights",
  "Park/entry fees where indicated",
];

const excluded = [
  "International flights",
  "Domestic flights (Namibe–Luanda)",
  "Visa and insurance",
  "Tips and personal expenses",
  "Drinks at hotels/lodges",
  "Sleeping bag",
];

const whatToBring = [
  "Comfortable shoes",
  "Sun protection (hat, cream)",
  "Personal hygiene items",
  "Mosquito repellent",
  "Camera and batteries",
  "Power bank",
];

const importantRemarks = [
  "Itinerary is indicative and may change depending on weather or road conditions.",
  "Always ask before photographing local tribes; fees may apply.",
  "Carry local currency in small notes for entrance or photo fees.",
];

export default function MasteriesOfPhantomBayPage() {
  return (
    <Itinerary
      title="Masteries of Phantom Bay"
      subtitle="4 Days of Desert Magic — Namibe · Baía dos Tigres · Luanda"
      priceEur={1100} // valor ilustrativo — ajusta conforme necessário
      photoPackageEur={50}
      itinerary={itinerary}
      gallery={gallery}
      included={included}
      excluded={excluded}
      whatToBring={whatToBring}
      importantRemarks={importantRemarks}
      contactNumber="+244923469271"
    />
  );
}
