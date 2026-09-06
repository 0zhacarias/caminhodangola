<?php

namespace Database\Seeders;

use App\Models\Depoimento;
use Illuminate\Database\Seeder;

class DepoimentosSeeder extends Seeder
{
    public function run(): void
    {
        $depoimentos = [
            [
                'nome' => 'Rosy Path',
                'localizacao' => 'Kuwait City, Kuwait',
                'mensagem' => 'We had a wonderful 4-day tour with Marta Tours and Trips. From start to finish, the experience was seamless and truly memorable. Our journey began with a guided city tour around the capital, where we visited key landmarks and got a great introduction to Angolan culture and history. The following day, we traveled to the breathtaking Kalandula Falls, where we stayed for two nights and enjoyed a variety of activities in the area. Marta was highly professional, responsive, and committed to accommodate all our requests and ensure everything ran smoothly. Thanks to Marta and her drivers and supporting guides who made our time in Angola unforgettable.',
            ],
            [
                'nome' => 'Melissa H',
                'localizacao' => 'San Francisco, CA, USA',
                'mensagem' => 'Work with the Best Tour Operator in Angola! Prior to my arrival to Angola, I worked with Marta, a local female tour operator, who is AWESOME! Working with her was a great experience. She was extremely professional, responsive the entire time, super organized, great energy and very well connected. Marta helped coordinate pick up and drop offs from the airport to my hotel, a tour of Luanda and some key tour spots and we also took the long drive to visit Calandula Falls (breathtaking!). Everything was seamless. Supporting a local, woman-led business made my experience all the more meaningful. Highly recommend.',
            ],
            [
                'nome' => 'Il K',
                'localizacao' => 'Philadelphia, PA, USA',
                'mensagem' => 'I just got back from the most amazing trip in Angola with Marta and her team. I usually travel solo but knew exploring Angola would be enhanced with a local guide. Best decision ever! The trip was very flexible and comprehensive. The enthusiasm Marta has for her country really shines through! I\'ve been traveling for 25 years and I would say this Angola trip was the best travel experience I\'ve had so far. Marta and her colleagues are very detail oriented, caring, sensitive, and experts on the local culture. I can\'t recommend them enough!',
            ],
            [
                'nome' => 'SeattleC',
                'localizacao' => 'Seattle, WA, USA',
                'mensagem' => 'Marta is a fantastic guide! We asked to see tribes and she delivered. We visited markets to meet locals and got wonderful photos, then we drove to the countryside to visit villages. We learned how people live, what they eat, explored housing and their farming. Our trip included very nice hotels. Marta answered all our questions, told us about her family, education, country\'s government, interesting history. She\'s a pro! Highly recommend!',
            ],
            [
                'nome' => 'BedouinDreams',
                'localizacao' => 'South Bend, IN, USA',
                'mensagem' => 'Marta is in a class of tour operators all by herself. In a word, she is phenomenal. She is professional, kind, fair, and one of the best people I\'ve ever met in my travels. Every one she works with also amazing, including Dos Santos. The thing I loved about Marta is that she is fun to be with, we had so many laughs on our trip. She is also a great problem-solver. I was thrilled to be in Luanda for the Annual Tourism Gala awards ceremony when she was named \'Tour Guide of the Year\' for all of Angola 2025. Marta showed me the best of Angola over 8 or 9 days, and gave me the best impression of this beautiful country.',
            ],
            [
                'nome' => 'AndyLexKY',
                'localizacao' => 'San Francisco, CA, USA',
                'mensagem' => 'Fantastic experience with Marta! My friend and I are serious adventure travelers and for Angola we really wanted to meet some of the tribal communities, for which a guide is obviously a necessity. Marta came recommended and she did not disappoint. The itinerary was as promised, everything came together like clockwork, and the experiences were authentic and memorable. I recommend her strongly to anyone looking to visit this remarkable country.',
            ],
        ];

        foreach ($depoimentos as $ordem => $depoimento) {
            Depoimento::updateOrCreate(
                ['nome' => $depoimento['nome']],
                [
                    'localizacao' => $depoimento['localizacao'],
                    'mensagem' => $depoimento['mensagem'],
                    'avaliacao' => 5,
                    'destaque' => true,
                    'ordem' => $ordem,
                ],
            );
        }
    }
}
