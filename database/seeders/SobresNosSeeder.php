<?php

namespace Database\Seeders;

use App\Models\SobreNos;
use Illuminate\Database\Seeder;

class SobresNosSeeder extends Seeder
{
    public function run(): void
    {
        $itens = [
            [
                'tipo' => 'cabecalho',
                'titulo' => 'About Us',
                'descricao' => 'Wherever your adventure leads across Angola, Angola Trails is here to ensure your journey is as enriching and unforgettable as the destination itself. As a leading local travel agency rooted in Angolan culture, we specialize in crafting personalized itineraries that go beyond sightseeing — connecting you with the people, traditions, and stories that make Angola unique. From comfortable transportation and handpicked local accommodations to immersive cultural encounters and private guided tours, every detail is thoughtfully designed to offer you a deeper, more authentic travel experience from start to finish.',
            ],
            [
                'tipo' => 'quem_somos',
                'titulo' => 'Who Are We?',
                'descricao' => "A lot like you.\nWe are a team passionate about travel, culture, and nature, dedicated to making every detail of your experience in Angola unforgettable. As travelers and local hosts, we understand that planning a dream trip can be just as challenging as it is exciting. We also know that, without proper care, a trip may not go as expected — and that's exactly why we're here: to ensure your journey through Angola is safe, inspiring, and truly unique.",
            ],
            [
                'tipo' => 'unico',
                'titulo' => 'What Makes Us Unique?',
                'descricao' => "At Angola Trails, we don't just offer tours — we create meaningful connections. What sets us apart is our deep local knowledge, our passion for storytelling, and our commitment to cultural immersion. We work hand in hand with local communities to ensure every journey supports and celebrates Angola's diverse heritage. Our itineraries are guided by locals who not only know the terrain but carry the spirit of their land. Whether you're sharing a traditional meal with a village elder, learning local crafts, or exploring sacred natural sites, each experience is designed to be personal, respectful, and unforgettable.",
            ],
            [
                'tipo' => 'citacao',
                'descricao' => 'We believe true travel happens when you step off the beaten path and into the heart of a place.',
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'book-open',
                'titulo' => 'Local Roots',
                'descricao' => 'Deeply rooted in Angolan culture, our team brings first-hand knowledge and authentic connections to every itinerary.',
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'target',
                'titulo' => 'Tailored Experiences',
                'descricao' => "Personalized trips designed to reveal Angola's hidden gems and cultural richness — not just the highlights.",
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'eye',
                'titulo' => 'Respectful Immersion',
                'descricao' => 'We design experiences that are respectful to communities and environments while allowing deep cultural exchange.',
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'flag',
                'titulo' => 'Sustainable Goals',
                'descricao' => 'We partner with local communities to create tourism that brings tangible benefits and promotes sustainable development.',
            ],
        ];

        foreach ($itens as $ordem => $item) {
            SobreNos::updateOrCreate(
                ['tipo' => $item['tipo'], 'titulo' => $item['titulo'] ?? null],
                [
                    'descricao' => $item['descricao'] ?? null,
                    'icone' => $item['icone'] ?? null,
                    'ordem' => $ordem,
                    'ativo' => true,
                ],
            );
        }
    }
}
