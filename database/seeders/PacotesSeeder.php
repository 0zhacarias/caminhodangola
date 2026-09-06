<?php

namespace Database\Seeders;

use App\Models\CategoriaPacote;
use App\Models\Pacote;
use Illuminate\Database\Seeder;

class PacotesSeeder extends Seeder
{
    public function run(): void
    {
        $pacotes = [
            [
                'slug' => 'angola-highlights',
                'titulo' => 'Angola highlights',
                'descricao' => 'Explore Moon-view point, Calandula waterfalls, Tundavala escarpment, Mumuila, Handa, Ngendelengo & Mucubal tribes, Namibe Desert.',
                'duracao' => '9',
                'categoria' => 'highlights',
            ],
            [
                'slug' => 'culture-roads',
                'titulo' => 'Meet the last tribes at the south of Angola',
                'descricao' => 'Meet Mountain mumuila, plain Mumuila, Handa, Himba, Mundimba, Vatua, Ngabue, Ngendelengo, Mucubal, Muhakahona.',
                'duracao' => '11',
                'categoria' => 'cultura-tribos',
            ],
            [
                'slug' => 'waterfalls',
                'titulo' => 'Get to know the second biggest waterfalls in Africa',
                'descricao' => 'Calandula waterfalls, Pedras negras pungo-Andongo, Lukala river, Rápidas do Kwanza.',
                'duracao' => '3',
                'categoria' => 'natureza-quedas',
            ],
            [
                'slug' => 'quick-stop',
                'titulo' => 'Quick stop in Angola',
                'descricao' => 'Moonview point, military museum, Calandula falls, black rocks.',
                'duracao' => '2',
                'categoria' => 'cidade-curtas',
            ],
            [
                'slug' => 'best-of-angola',
                'titulo' => 'The best of Angola',
                'descricao' => 'Discover key regions with our curated itinerary.',
                'duracao' => '5',
                'categoria' => 'circuitos-classicos',
            ],
            [
                'slug' => 'day-tour',
                'titulo' => 'Angola Mega Tour',
                'descricao' => 'Culture, landscape, nature, desert, history, gastronomy.',
                'duracao' => '13',
                'categoria' => 'expedicoes',
            ],
            [
                'slug' => 'drive',
                'titulo' => 'Angola expedition in 14 days.',
                'descricao' => 'Luanda, Sumbe, Benguela, Lubango, Namibe, Malanje.',
                'duracao' => '-',
                'categoria' => 'expedicoes',
            ],
            [
                'slug' => 'solidarity',
                'titulo' => 'Solidarity Tour.',
                'descricao' => 'Make someone smile with your less.',
                'duracao' => '-',
                'categoria' => 'solidario',
            ],
            [
                'slug' => 'mysteries',
                'titulo' => 'Mysteries of the Phantom Bay.',
                'descricao' => 'Baía dos tigres, Namibe desert, Red Canyon.',
                'duracao' => '-',
                'categoria' => 'deserto-costa',
            ],
        ];

        foreach ($pacotes as $ordem => $pacote) {
            $categoria = CategoriaPacote::where('slug', $pacote['categoria'])->first();

            Pacote::updateOrCreate(
                ['slug' => $pacote['slug']],
                [
                    'categoria_pacote_id' => $categoria?->id,
                    'titulo' => $pacote['titulo'],
                    'descricao' => $pacote['descricao'],
                    'duracao' => $pacote['duracao'],
                    'imagem' => null,
                    'ordem' => $ordem,
                    'ativo' => true,
                ],
            );
        }
    }
}
