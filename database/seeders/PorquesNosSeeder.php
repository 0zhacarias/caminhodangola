<?php

namespace Database\Seeders;

use App\Models\PorqueNos;
use Illuminate\Database\Seeder;

class PorquesNosSeeder extends Seeder
{
    public function run(): void
    {
        $itens = [
            [
                'tipo' => 'cabecalho',
                'titulo' => "Why Choose Caminhos D'Angola?",
                'descricao' => "Caminhos D'Angola is built on a strong reputation for delivering exceptional service, backed by deep regional expertise, tailor-made experiences, and competitive pricing. Every travel plan we design reflects our passion for Angola — we ensure each guest leaves with lasting impressions, a deeper appreciation for the country, and a desire to return.",
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'map-pin',
                'titulo' => 'Local Expertise & Authenticity',
                'descricao' => 'Our team consists of dynamic, committed local guides with deep knowledge of the regions. We are driven by genuine hospitality and a mission to reveal the true essence of Angola — from iconic sites to hidden treasures.',
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'sliders-horizontal',
                'titulo' => 'Fully Customizable Itineraries',
                'descricao' => 'We create bespoke experiences tailored to your budget, interests, and schedule. We work closely with you to craft unique journeys — no off-the-shelf packages.',
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'shield-check',
                'titulo' => 'Service, Quality & Attention to Detail',
                'descricao' => "We're proud to provide exceptional service: reliable transportation, hand-picked accommodations, and a hands-on commitment to every detail — because our travelers' comfort and satisfaction come first.",
            ],
            [
                'tipo' => 'destaque',
                'icone' => 'leaf',
                'titulo' => 'Respect for the Land & Communities',
                'descricao' => "We celebrate Angola's beauty, vibrant traditions, and the diversity of its communities. Our tours honor cultural and natural heritage, minimize impact, and support local development.",
            ],
            [
                'tipo' => 'valor',
                'icone' => 'users',
                'titulo' => 'A dedicated team: we work together with a shared purpose.',
            ],
            [
                'tipo' => 'valor',
                'icone' => 'handshake',
                'titulo' => "Integrity: we always do what's right.",
            ],
            [
                'tipo' => 'valor',
                'icone' => 'smile',
                'titulo' => 'Genuine hospitality: we put people first.',
            ],
            [
                'tipo' => 'valor',
                'icone' => 'users',
                'titulo' => 'Inclusion: we listen, learn, and celebrate diversity.',
            ],
            [
                'tipo' => 'valor',
                'icone' => 'users',
                'titulo' => 'Quality: excellence in every detail.',
            ],
            [
                'tipo' => 'valor',
                'icone' => 'leaf',
                'titulo' => 'Community: local engagement is essential.',
            ],
            [
                'tipo' => 'valor',
                'icone' => 'users',
                'titulo' => "Passion for Angola: it's our mission to share this country with the world.",
            ],
        ];

        foreach ($itens as $ordem => $item) {
            PorqueNos::updateOrCreate(
                ['tipo' => $item['tipo'], 'titulo' => $item['titulo']],
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
