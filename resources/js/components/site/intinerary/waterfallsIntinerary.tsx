import Itinerary, { type ItineraryItem } from "./intinirary";

import Pic1 from "../../assets/waterfalls/1.jpg";
import Pic2 from "../../assets/waterfalls/2.jpg";
import Pic3 from "../../assets/waterfalls/3.jpg";
import Pic4 from "../../assets/waterfalls/4.jpg";
import Pic5 from "../../assets/waterfalls/5.jpg";
import Pic6 from "../../assets/waterfalls/6.jpg";
import Pic7 from "../../assets/waterfalls/7.jpg";
import Pic8 from "../../assets/waterfalls/8.jpg";
import Pic9 from "../../assets/waterfalls/9.jpg";
import Pic10 from "../../assets/waterfalls/10.jpg";
import Pic11 from "../../assets/waterfalls/11.jpg";
import Pic12 from "../../assets/waterfalls/12.jpg";
import Pic13 from "../../assets/waterfalls/13.jpg";
import Pic14 from "../../assets/waterfalls/14.jpg";
import Pic15 from "../../assets/waterfalls/15.jpg";
import Pic16 from "../../assets/waterfalls/16.jpg";
import Pic17 from "../../assets/waterfalls/17.jpg";
import Pic18 from "../../assets/waterfalls/18.jpg";
import Pic19 from "../../assets/waterfalls/19.jpg";
import Pic20 from "../../assets/waterfalls/20.jpg";
import Pic21 from "../../assets/waterfalls/21.jpg";
import Pic22 from "../../assets/waterfalls/22.jpg";
import Pic23 from "../../assets/waterfalls/23.jpg";
import Pic24 from "../../assets/waterfalls/24.jpg";
import Pic25 from "../../assets/waterfalls/25.jpg";
import Pic26 from "../../assets/waterfalls/26.jpg";

const itinerary: ItineraryItem[] = [
  {
    dayLabel: "Day 1",
    title: "Luanda – Kalandula Falls – Malanje",
    description: `Today we have quite a long drive (7–8 hrs, ~520 km) to reach the magnificent Kalandula Waterfalls — one of the largest waterfalls by volume in Africa.

We will stop in Ndalatando to walk around the Botanical Garden (Rosas de Porcelana). Arrival at the falls is expected in the early afternoon; spend 1–2 hours enjoying the spectacular views.

Kalandula has an impressive drop of approximately 105 meters (344 ft) and a width around 400 meters (1,312 ft). A short, challenging and sometimes slippery path takes you to the base of the falls for a unique perspective. Overnight at Pousada de Kalandula (fronting the waterfalls).`,
    imageUrl: Pic1,
  },
  {
    dayLabel: "Day 2",
    title: "Kalandula – Malanje – Kwanza Rapids",
    description: `In the morning we return to the waterfalls (about 1 hr / 2 km) and stop at another viewpoint on the opposite side.

Drive to Malanje (approximately 2 hrs, 60 km) and continue to Kwanza Municipality to visit the Rapidas do Kwanza (Kwanza Rapids) — a scenic stretch of the Kwanza River. Return to Malanje for overnight at Hotel Palanca.`,
    imageUrl: Pic2,
  },
  {
    dayLabel: "Day 3",
    title: "Malanje – Pedras Negras – Dondo – Luanda",
    description: `After breakfast we drive (about 2 hrs, 65 km) to the impressive Pedras Negras (The Black Stones) — hard sedimentary rock formations that remain a geological mystery.

This region was once the capital of the Kingdom of Ndongo. Local tradition holds that the footprints of King Ngola Kiluanji and Queen Ginga (Nzinga) are embedded in the rocks.

Next we stop in Dondo for a local riverside lunch, then continue back to Luanda (approximately 6 hrs) with evening arrival. Overnight at Hotel IlhaMar.`,
    imageUrl: Pic3,
  },
  {
    dayLabel: "Day 4",
    title: "Luanda City Tour & Departure",
    description: `Our last day in Angola is dedicated to exploring the capital city of Luanda.

We start at the Mausoleum of Agostinho Neto — the first President of Angola and an architectural landmark (the obelisk-like "Sputnik"). Then visit the National Museum of Anthropology to see traditional masks and artifacts.

Next: Fortaleza de São Miguel (a 16th-century Portuguese fort with an important and tragic history tied to the transatlantic slave trade) and Igreja Nossa Senhora do Pópulo (traditionally dated to 1482).

Drive to the Miradouro da Lua (Moon viewpoint) and stop at the art & craft market. Around 2:00 PM we stop for lunch before transfer to the airport for your flight home.`,
    imageUrl: Pic4,
  },
];

const gallery = [
  Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7, Pic8, Pic9, Pic10,
  Pic11, Pic12, Pic13, Pic14, Pic15, Pic16, Pic17, Pic18, Pic19, Pic20,
  Pic21, Pic22, Pic23, Pic24, Pic25, Pic26
];

const included = [
  "All transfers",
  "4×4 transport (3 pax + driver per car)",
  "Fuel",
  "Experienced driver",
  "English-speaking guide",
  "Domestic ticket",
  "Entrance fees",
  "Accommodation from Day 1–3 (shared rooms) and single room for the tour leader",
  "Meals: breakfast, lunch, water during the trip",
  "1 night at Pousada de Kalandula (fronting the waterfalls)",
];

const excluded = [
  "International tickets",
  "Medical insurance",
  "Tourist visa",
  "Drinks except water",
  "Sleeping bags",
  "Personal expenses",
  "Any service not mentioned in the 'included' section",
  "Tipping guide and driver",
];

const whatToBring = [
  "Jacket and long trousers (June is winter in Angola)",
  "Lip balm",
  "Personal hygiene items (towel, soap, wet wipes)",
  "Sunblock set (cream, spray)",
  "Mosquito spray",
  "Individual medical kit",
  "Power bank, batteries",
  "Favorite snacks",
  "Photo and video camera (drone permitted)",
];
/*
const paymentTerms = [
  "50% transfer 1 month before the tour",
  "50% transfer 5 days before arrival",
];
*/
const importantRemarks = [
  "Don’t take photographs of tribes without permission — fees may vary from 500 AO to 2000 AO; entering a village may vary from 5000 AO to 10,000 AO.",
  "Our program is flexible and can be changed when necessary.",
  "If you want to shop, do it the day before departure.",
  "Don’t forget sleeping bags.",
  "Prices are in EUR.",
];

export default function KalandulaFallsPage() {
  return (
    <Itinerary
      title="Get to know the second biggest waterfalls of Africa"
      subtitle="4 Days — Luanda · Kalandula · Malanje · Pedras Negras"
      priceEur={850} // valor ilustrativo — podes ajustar
      photoPackageEur={50}
      itinerary={itinerary}
      gallery={gallery}
      included={included}
      excluded={excluded}
      whatToBring={whatToBring}
      importantRemarks={importantRemarks}
      // added payment terms prop for display if your Itinerary component supports it
      // otherwise you can render paymentTerms inside importantRemarks or a custom field
      contactNumber="+244923469271"
    />
  );
}
