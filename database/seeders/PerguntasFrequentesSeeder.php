<?php

namespace Database\Seeders;

use App\Models\CategoriaPerguntaFrequente;
use App\Models\PerguntaFrequente;
use Illuminate\Database\Seeder;

class PerguntasFrequentesSeeder extends Seeder
{
    public function run(): void
    {
        $grupos = [
            [
                'categoria' => '🌍 General Information',
                'perguntas' => [
                    [
                        'pergunta' => 'Where is Angola located?',
                        'resposta' => 'Angola is in Southern Africa, bordered by Namibia, Zambia, the Democratic Republic of Congo, and the Atlantic Ocean.',
                    ],
                    [
                        'pergunta' => 'What is the capital city?',
                        'resposta' => 'Luanda, a vibrant coastal city, is the capital and largest city.',
                    ],
                    [
                        'pergunta' => 'What language is spoken in Angola?',
                        'resposta' => 'The official language is Portuguese. Many people also speak local languages such as Umbundu, Kimbundu, Kikongo, and others. English is increasingly understood in tourism and business.',
                    ],
                    [
                        'pergunta' => 'What currency is used in Angola?',
                        'resposta' => 'The Angolan Kwanza (AOA). Credit cards are accepted in some hotels and restaurants, but cash is still widely used.',
                    ],
                ],
            ],
            [
                'categoria' => '🛂 Travel & Visa',
                'perguntas' => [
                    [
                        'pergunta' => 'Do I need a visa to visit Angola?',
                        'resposta' => 'Angola now allows visa-free entry for citizens of more than 90 countries (including much of Africa, Europe, and the Americas). Travelers from other countries can apply for an online tourist visa (e-visa).',
                    ],
                    [
                        'pergunta' => 'How long can I stay as a tourist?',
                        'resposta' => 'Typically 30 days, with possible extensions depending on nationality and visa type.',
                    ],
                    [
                        'pergunta' => 'What vaccinations are required?',
                        'resposta' => 'Yellow fever vaccination is mandatory. Other recommended vaccines include hepatitis A & B, typhoid, and routine immunizations.',
                    ],
                ],
            ],
            [
                'categoria' => '🚗 Transport & Safety',
                'perguntas' => [
                    [
                        'pergunta' => 'How do I get around Angola?',
                        'resposta' => 'Domestic flights connect major cities. Buses and private cars are common. For tourists, hiring a car with driver/guide is recommended due to road conditions and distances.',
                    ],
                    [
                        'pergunta' => 'Is Angola safe for tourists?',
                        'resposta' => 'Yes, Angola is becoming a safer destination, but travelers should take normal precautions: avoid isolated areas at night, keep valuables secure, and follow local advice.',
                    ],
                ],
            ],
            [
                'categoria' => '🌄 Attractions & Experiences',
                'perguntas' => [
                    [
                        'pergunta' => 'What are the top attractions in Angola?',
                        'resposta' => "• Nature: Namib Desert, Iona National Park, Kalandula Falls, Tundavala Gap, Miradouro da Lua\n• Culture: Tribes of the south (Himba, Mucubal, Mumuila), markets, music & dance\n• Coastline: Beaches in Luanda, Benguela, Namibe",
                    ],
                    [
                        'pergunta' => 'Can I visit local tribes?',
                        'resposta' => 'Yes, with a local guide. Visits should be respectful and often include community contributions.',
                    ],
                    [
                        'pergunta' => 'What wildlife can I see?',
                        'resposta' => 'Angola has elephants, zebras, giraffes, antelopes, and diverse birdlife, especially in Iona and Kissama National Parks.',
                    ],
                ],
            ],
            [
                'categoria' => '💰 Costs & Accommodation',
                'perguntas' => [
                    [
                        'pergunta' => 'Is Angola expensive to visit?',
                        'resposta' => 'Yes, compared to some African destinations. Hotels, transport, and imported food can be costly. Budget planning is recommended.',
                    ],
                    [
                        'pergunta' => 'What types of accommodation are available?',
                        'resposta' => 'From luxury hotels in Luanda to guesthouses, eco-lodges, and camping in rural areas.',
                    ],
                ],
            ],
            [
                'categoria' => '🍲 Food & Culture',
                'perguntas' => [
                    [
                        'pergunta' => 'What is traditional Angolan food?',
                        'resposta' => 'Popular dishes include funge (cassava porridge), mufete (grilled fish with beans, plantains, and sweet potato), moamba de galinha (chicken stew), and seafood along the coast.',
                    ],
                    [
                        'pergunta' => 'What cultural events or festivals can I experience?',
                        'resposta' => 'Carnival in Luanda, music festivals (kizomba, semba), and tribal ceremonies in the south like Efiko and Ekwendje.',
                    ],
                ],
            ],
            [
                'categoria' => '📶 Practical Information',
                'perguntas' => [
                    [
                        'pergunta' => 'Is internet available in Angola?',
                        'resposta' => 'Yes, in hotels and urban centers, though speeds vary. SIM cards with data are widely available.',
                    ],
                    [
                        'pergunta' => 'What is the best time to visit Angola?',
                        'resposta' => "• Dry season (May–October): Best for safaris and desert trips.\n• Rainy season (November–April): Lush landscapes, but some roads may be difficult.",
                    ],
                    [
                        'pergunta' => 'Do I need travel insurance?',
                        'resposta' => 'Yes, strongly recommended for health, transport, and unexpected delays.',
                    ],
                ],
            ],
            [
                'categoria' => '🏢 About the Agency',
                'perguntas' => [
                    [
                        'pergunta' => "What is Caminhos D'Angola?",
                        'resposta' => "Caminhos D'Angola is a boutique travel and tourism agency based in Moçâmedes (Namibe), Angola, operating nationwide. We specialize in sustainable, cultural, and nature-based tourism, offering authentic experiences that connect travelers with local communities and landscapes.",
                    ],
                    [
                        'pergunta' => "Who leads Caminhos D'Angola?",
                        'resposta' => "The agency was founded by Marta Kaymbi Manuel, a nationally recognized tour guide, 'Best Tour Guide of Angola 2024 & 2025,' and current President of the Association of Guides and Interpreters of Namibe (AGTIN).",
                    ],
                    [
                        'pergunta' => "What makes Caminhos D'Angola different from other agencies?",
                        'resposta' => "• Deep local expertise (12+ years guiding experience).\n• Focus on authentic culture and community benefit.\n• Sustainable approach: we protect the desert, involve local tribes, and support artisans.\n• Personalized service with small groups and private tours.",
                    ],
                ],
            ],
            [
                'categoria' => '🌍 Tours & Services',
                'perguntas' => [
                    [
                        'pergunta' => 'What types of tours do you offer?',
                        'resposta' => "• Desert expeditions (Namibe Desert, Iona National Park, Welwitschia plants).\n• Cultural immersions with tribes (Himba, Mucubal, Mwila, etc.).\n• Coastal experiences (Moçâmedes, Tômbwa, Benguela beaches).\n• National itineraries (Kalandula Falls, Luanda City, Lubango, Tundavala).\n• Tailor-made tours upon request.",
                    ],
                    [
                        'pergunta' => 'Do you offer day trips or only multi-day tours?',
                        'resposta' => 'Both. We arrange day excursions (desert, coastal, or cultural) and longer circuits (3–14 days), depending on your schedule.',
                    ],
                    [
                        'pergunta' => 'Are tours private or group-based?',
                        'resposta' => 'We specialize in private and small group tours to ensure flexibility, comfort, and exclusivity.',
                    ],
                    [
                        'pergunta' => 'Do you provide transport?',
                        'resposta' => 'Yes, tours include comfortable vehicles with professional drivers and guides.',
                    ],
                ],
            ],
            [
                'categoria' => '💰 Booking & Payments',
                'perguntas' => [
                    [
                        'pergunta' => "How can I book a tour with Caminhos D'Angola?",
                        'resposta' => "You can contact us via:\n• WhatsApp Business\n• Email\n• Social Media (Facebook, Instagram, LinkedIn)\n• In person at our Moçâmedes office.",
                    ],
                    [
                        'pergunta' => 'What payment methods do you accept?',
                        'resposta' => "• Bank transfer (AOA & USD or EUR accounts).\n• Cash payments.\n• In the near future: online and card payments.",
                    ],
                    [
                        'pergunta' => 'Do I need to pay in advance?',
                        'resposta' => 'Yes, to confirm your booking we require a deposit. The balance can be paid upon arrival or before departure.',
                    ],
                ],
            ],
            [
                'categoria' => '🛡 Safety & Comfort',
                'perguntas' => [
                    [
                        'pergunta' => 'Are the tours safe?',
                        'resposta' => 'Absolutely. Our guides are licensed professionals, vehicles are insured, and we operate with all necessary permits.',
                    ],
                    [
                        'pergunta' => 'What about accommodation and meals?',
                        'resposta' => 'We adapt to your preferences: hotels, eco-lodges, guesthouses, or camping. Meals can be included (traditional Angolan cuisine) or left flexible.',
                    ],
                    [
                        'pergunta' => 'Can you accommodate dietary restrictions or special needs?',
                        'resposta' => 'Yes. We arrange vegetarian, vegan, halal, or allergy-sensitive meals if notified in advance.',
                    ],
                ],
            ],
            [
                'categoria' => '🌿 Sustainability & Community Impact',
                'perguntas' => [
                    [
                        'pergunta' => "How does Caminhos D'Angola promote sustainable tourism?",
                        'resposta' => "• We involve local communities directly in tours.\n• We support artisans by including crafts in itineraries.\n• We run the Yetu Project to clean and protect natural sites.\n• We encourage respect for tribal cultures and environments.",
                    ],
                    [
                        'pergunta' => 'Do local communities benefit from the tours?',
                        'resposta' => 'Yes, part of the tour fees go directly to communities through contributions, cultural experiences, and handicraft purchases.',
                    ],
                ],
            ],
        ];

        foreach ($grupos as $ordemCategoria => $grupo) {
            $categoria = CategoriaPerguntaFrequente::updateOrCreate(
                ['nome' => $grupo['categoria']],
                ['ordem' => $ordemCategoria, 'ativo' => true],
            );

            foreach ($grupo['perguntas'] as $ordemPergunta => $pergunta) {
                PerguntaFrequente::updateOrCreate(
                    [
                        'categoria_id' => $categoria->id,
                        'pergunta' => $pergunta['pergunta'],
                    ],
                    [
                        'resposta' => $pergunta['resposta'],
                        'ordem' => $ordemPergunta,
                        'ativo' => true,
                    ],
                );
            }
        }
    }
}
