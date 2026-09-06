<?php

namespace Database\Seeders;

use App\Models\CategoriaPacote;
use Illuminate\Database\Seeder;

class CategoriasPacotesSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            [
                'nome' => 'Highlights',
                'slug' => 'highlights',
                'descricao' => 'The essential Angola: iconic sights condensed into unforgettable journeys.',
            ],
            [
                'nome' => 'Culture & Tribes',
                'slug' => 'cultura-tribos',
                'descricao' => 'Immersive encounters with the traditional communities of southern Angola.',
            ],
            [
                'nome' => 'Nature & Waterfalls',
                'slug' => 'natureza-quedas',
                'descricao' => 'Rivers, waterfalls and dramatic landscapes across the heart of Angola.',
            ],
            [
                'nome' => 'City & Short Trips',
                'slug' => 'cidade-curtas',
                'descricao' => 'Quick escapes and city tours for travelers with limited time.',
            ],
            [
                'nome' => 'Classic Circuits',
                'slug' => 'circuitos-classicos',
                'descricao' => 'Curated itineraries covering Angola’s most remarkable regions.',
            ],
            [
                'nome' => 'Expeditions',
                'slug' => 'expedicoes',
                'descricao' => 'Long-distance adventures across Angola’s provinces and remote territories.',
            ],
            [
                'nome' => 'Solidarity Tours',
                'slug' => 'solidario',
                'descricao' => 'Travel with purpose: community-driven journeys that give back.',
            ],
            [
                'nome' => 'Desert & Coast',
                'slug' => 'deserto-costa',
                'descricao' => 'Namibe desert, wild coastlines and the mysteries of southern Angola.',
            ],
        ];

        foreach ($categorias as $ordem => $categoria) {
            CategoriaPacote::updateOrCreate(
                ['slug' => $categoria['slug']],
                [
                    'nome' => $categoria['nome'],
                    'descricao' => $categoria['descricao'],
                    'ordem' => $ordem,
                    'ativo' => true,
                ],
            );
        }
    }
}
