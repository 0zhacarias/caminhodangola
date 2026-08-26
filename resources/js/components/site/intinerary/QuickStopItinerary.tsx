import Itinerary, { type ItineraryItem } from "./intinirary";
import Pic1 from "../../assets/quickStop/1.jpg";
import Pic2 from "../../assets/quickStop/2.jpg";
import Pic3 from "../../assets/quickStop/3.jpg";
import Pic4 from "../../assets/quickStop/4.jpg";

const itinerary: ItineraryItem[] = [
  {
    dayLabel: "Day 1",
    title: "Luanda City Tour",
    description: `Luanda is a lively city, full of contrasts. It is the country's main port and economic center, and was founded in 1576 by the Portuguese explorer Paulo Dias de Novais. Even though Luanda has been regarded in the past as one of the most expensive cities in the world, this is not the present reality. It is now aiming to be a model of progress, which is leaving behind a 30-year-long civil war. Strolling around some of the districts with their colonial architecture is a pleasant experience.

Stop at Iron Palace
Known to have been designed or inspired by the works of Gustav Eiffel in 1880, the Iron Palace is a must see when visiting the City of Luanda. The mystery behind its history and detail of its iron work is complemented by the artwork of local artists exhibited in the Palace.

Drive through Ilha do Cabo
Ilha do Cabo, Ilha de Luanda or simply Ilha as the locals would call it is a 7 km long peninsula. Previously it was known as the bank of the Kingdom of Kongo where shells were collected and sent to the Kingdom to be used as currency. Today Ilha is a favourite stop for a day out at the beach, with many options of restaurants and hotels.

Stop at Fortress of São Miguel
Built in the 17th century by the first Portuguese Governor of Luanda, Paulo Dias de Novais, the well-preserved fortress was an administrative centre of the Portuguese colony and is today the National Museum of Military History. The museum displays military tanks and guns used during the colonial period and includes a resume of Angolan history from the 15th to the 19th century, with fauna and flora portrayed in azulejos.

Drive through Mausoleum of Agostinho Neto
With its spaceship-inspired architecture, the Mausoleum is the resting place of the first President of Angola, Agostinho Neto, who in 1975 proclaimed the country's independence.

Stop at the Moon Viewpoint — Miradouro da Lua
The lunar-like landscape shaped by years of erosion from rain and wind is located about 40 km from Luanda city centre. Its unique beauty makes the long drive to the Miradouro worthwhile.

Stop at the Slavery Museum
The 17th-century Catholic church located on the former property of one of the most prominent slave traders on the Atlantic coast has, since 1977, become a museum with the mission of educating about the history of slavery in Angola.

Final stop: Arts & Crafts Market
On the way back we will visit the local arts and crafts market where you can buy souvenirs. Around 2pm we stop for lunch before transfer to the hotel.`,
    imageUrl: Pic1,
  },
  {
    dayLabel: "Day 2",
    title: "Luanda — Kalandula Falls — Malanje",
    description: `Today we have a long drive (approx. 7–8 hours, ~520 km) to reach the magnificent Kalandula Waterfalls — one of the largest waterfalls by volume in Africa and a highlight of any visit to Angola. We will make a short stop in the town of Ndalatando to walk around its beautiful Botanical Garden (Rosas de Porcelana).

Arrive at the waterfalls in the early afternoon and spend about an hour or two enjoying the spectacular view. The falls have an impressive drop of approximately 105 meters (344 feet) and a width around 400 meters (1,312 feet), contributing to the grandeur of the site. A short, challenging and slippery road leads to the base of the waterfall for a unique perspective. Overnight at the Pousada de Kalandula (hotel in front of the falls).`,
    imageUrl: Pic2,
  },
  {
    dayLabel: "Day 3",
    title: "Malanje — Pedras Negras — Return to Luanda",
    description: `After breakfast we drive (approx. 2 hrs, 65 km) to the impressive rock formation of Pedras Negras (The Black Stones). These hard sedimentary stones remain a geological mystery since they do not fit with the surrounding topography. The region was once the capital of the Kingdom of Ndongo — an African kingdom that existed from the 16th to the 20th century. It is believed that the footprints of King Ngola Kiluanji and Queen Nzinga (Ginga) are embedded in the rocks.

Next stop: Dondo for a local lunch near the river. After lunch we drive back to Luanda (approx. 6 hrs) and arrive in the evening. Accommodation at Hotel IlhaMar.`,
    imageUrl: Pic3,
  },
];

const gallery = [Pic1, Pic2, Pic3, Pic4];

const included = [
  "Transfers and local transport",
  "English-speaking guide",
  "Selected accommodation",
  "Park/entry fees where indicated",
];

const excluded = [
  "International flights",
  "Meals unless stated",
  "Visa and medical insurance",
  "Tips and personal expenses",
];

const whatToBring = [
  "Comfortable shoes",
  "Sun protection (hat, cream)",
  "Light layers",
  "Personal medical kit",
  "Camera and charger",
];

const importantRemarks = [
  "Itinerary is indicative and may change due to road or weather conditions.",
  "Carry local currency for small purchases and entrance fees.",
  "Always ask before photographing people; local fees may apply.",
];

export default function LuandaKalandulaPage() {
  return (
    <Itinerary
      title="Luanda — Kalandula — Pedras Negras"
      subtitle="Compact 2 day route: Luanda city highlights, Kalandula Falls and Pedras Negras."
      priceEur={800}               // adjust price if needed
      photoPackageEur={50}          // optional
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
