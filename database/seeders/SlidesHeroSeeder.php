<?php

namespace Database\Seeders;

use App\Models\SlideHero;
use Illuminate\Database\Seeder;

class SlidesHeroSeeder extends Seeder
{
    public function run(): void
    {
        $textoA = 'Step into the heart of Africa and uncover the beauty of Angola – a land of unspoiled nature, vibrant cultures, and breathtaking landscapes. From majestic deserts and powerful waterfalls to traditional tribes and remote wilderness, Angola offers a rich and genuine African experience. Discover a country that remains raw, diverse, and remarkably untouched – Angola awaits you with open arms.';

        $textoB = 'Embark on a journey through Angola’s hidden gems – where golden beaches meet ancient traditions. Explore its wild safaris, colorful cities, and warm hospitality. A world less traveled, but deeply rewarding.';

        $slides = [
            [
                'pagina' => 'home',
                'titulo' => 'Discover Angola with local guides',
                'subtitulo' => 'Explore deeper, travel better',
                'texto' => $textoA,
            ],
            [
                'pagina' => 'home',
                'titulo' => 'Discover Angola with local guides',
                'subtitulo' => 'Explore deeper, travel better',
                'texto' => $textoB,
            ],
            [
                'pagina' => 'home',
                'titulo' => 'Discover Angola with local guides',
                'subtitulo' => 'Explore deeper, travel better',
                'texto' => $textoA,
            ],
            [
                'pagina' => 'home',
                'titulo' => 'Discover Angola with local guides',
                'subtitulo' => 'Explore deeper, travel better',
                'texto' => $textoB,
            ],
            [
                'pagina' => 'home',
                'titulo' => 'Discover Angola with local guides',
                'subtitulo' => 'Explore deeper, travel better',
                'texto' => $textoA,
            ],
            [
                'pagina' => 'home',
                'titulo' => 'Discover Angola with local guides',
                'subtitulo' => 'Explore deeper, travel better',
                'texto' => $textoB,
            ],
            [
                'pagina' => 'avaliacoes',
                'titulo' => 'What travelers say about us',
                'subtitulo' => 'Real stories, real journeys',
                'texto' => 'Discover why travelers from around the world choose Caminhos D\'Angola to explore Angola. Authentic experiences, trusted local guides, and memories that last a lifetime.',
                'mostrar_depoimentos' => true,
            ],
            [
                'pagina' => 'private-tours',
                'titulo' => 'Private Tours',
                'subtitulo' => 'Tailor-made experiences, just for you',
                'texto' => "Discover Angola your way with Caminhos D'Angola. Our private tours are fully personalized to fit your schedule, preferences, and travel goals. Whether you're looking for cultural immersion, natural wonders, or relaxed exploration, we design your journey around you.",
                'subtexto' => 'Choose your own pace, explore with expert local guides, and enjoy a safe, flexible, and unforgettable travel experience.',
            ],
            [
                'pagina' => 'group-tours',
                'titulo' => 'Group Tours',
                'subtitulo' => 'Share the journey, discover together',
                'texto' => 'Join one of our expertly crafted group tours across Angola. Explore stunning landscapes, local traditions, and hidden gems in the company of like-minded adventurers — all guided by our trusted experts',
                'subtexto' => "Whether you're traveling solo or with companions, our group tours offer a safe, fun, and culturally rich experience for all ages.",
            ],
            [
                'pagina' => 'sobre',
                'titulo' => 'Our Story',
                'subtitulo' => 'People, places, and the environment in mind',
                'texto' => "Caminhos D'Angola is an Angolan-based tour operator dedicated to crafting flexible, authentic travel experiences. With deep local expertise and a passion for sustainable tourism, we design every journey around your interests, ensuring you see Angola like a local—immersed in culture and natural beauty.",
                'botao_rotulo' => 'Contact Us',
                'botao_url' => "https://wa.me/+244923469271?text=Hello! I would like to learn more about Caminhos D'Angola.",
            ],
            [
                'pagina' => 'galeria',
                'titulo' => 'Captured Moments',
                'subtitulo' => 'Explore Our Angola Gallery',
                'texto' => 'Discover the vibrant landscapes, rich cultures, and unforgettable experiences of Angola through our curated photo collection. From misty waterfalls to bustling markets, each image tells a story of adventure and heritage.',
            ],
        ];

        $paginas = ['home', 'avaliacoes', 'private-tours', 'group-tours', 'sobre', 'galeria'];
        SlideHero::whereIn('pagina', $paginas)->delete();

        $ordemPorPagina = [];

        foreach ($slides as $slide) {
            $pagina = $slide['pagina'];
            $ordem = $ordemPorPagina[$pagina] ?? 0;
            $ordemPorPagina[$pagina] = $ordem + 1;

            SlideHero::create([
                'pagina' => $pagina,
                'imagem' => null,
                'titulo' => $slide['titulo'],
                'subtitulo' => $slide['subtitulo'] ?? null,
                'texto' => $slide['texto'] ?? null,
                'subtexto' => $slide['subtexto'] ?? null,
                'botao_rotulo' => $slide['botao_rotulo'] ?? null,
                'botao_url' => $slide['botao_url'] ?? null,
                'ordem' => $ordem,
                'ativo' => true,
                'mostrar_depoimentos' => $slide['mostrar_depoimentos'] ?? false,
            ]);
        }
    }
}
