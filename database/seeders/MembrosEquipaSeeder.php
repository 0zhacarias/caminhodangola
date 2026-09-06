<?php

namespace Database\Seeders;

use App\Models\Cargo;
use App\Models\MembroEquipa;
use Illuminate\Database\Seeder;

class MembrosEquipaSeeder extends Seeder
{
    public function run(): void
    {
        $membros = [
            [
                'nome' => 'Marta Manuel',
                'cargo' => 'General manager, Founder & Tour leader',
                'bio' => 'Founder and award-winning lead guide (Best Tour Guide of Angola 2024 & 2025). Oversees itinerary design, partner relations and ensures high standards of safety, authenticity and community engagement.',
                'linkedin' => 'https://www.linkedin.com/in/marta-kaymbi-manuel',
                'email' => 'marta@caminhosdangola.com',
            ],
            [
                'nome' => 'Albino Chipandeca Wango',
                'cargo' => 'Official guide',
                'bio' => 'Specialist in desert and tribal routes with extensive field experience. Leads cultural visits with respect and context, fluent in regional languages and first-aid trained.',
                'telefone' => '+244 9XX XXX XXX',
            ],
            [
                'nome' => 'Isack dos Santos',
                'cargo' => 'Driver',
                'bio' => "Professional driver focused on safety and reliability. Experienced in long-distance transfers, basic vehicle maintenance and navigating Angola's varied road conditions.",
                'instagram' => 'https://instagram.com/ana_guide',
            ],
            [
                'nome' => 'Adilson Hifikepunye Pandeinge',
                'cargo' => 'Customer experience assistant & Official guide',
                'bio' => 'Handles guest relations, on-the-ground coordination and logistics. Also a licensed guide who supports cultural programs and ensures smooth guest experiences.',
                'telefone' => '+244 9XX XXX XXX',
                'email' => 'paulo@caminhosdangola.com',
            ],
            [
                'nome' => 'Mbira Adriano',
                'cargo' => 'Digital marketing manager',
                'bio' => 'Manages bookings, online communications and marketing. Creates content, handles social channels and ensures clear pre-trip information for guests.',
                'email' => 'hello@caminhosdangola.com',
            ],
            [
                'nome' => 'Fonseca Gomes Milonga',
                'cargo' => 'Sales manager',
                'bio' => 'Leads sales and partnerships, develops tailor-made proposals and group offers. Expert at matching client needs with local experiences and pricing strategies.',
                'instagram' => 'https://instagram.com/carlos_photo',
            ],
            [
                'nome' => 'Baptista (Becky)',
                'cargo' => 'Driver',
                'bio' => 'Reliable driver and field support specialist — oversees camp setup, guest comfort in remote locations and practical logistics during expeditions.',
                'instagram' => 'https://instagram.com/carlos_photo',
            ],
            [
                'nome' => 'Leonardo (Léo)',
                'cargo' => 'Driver',
                'bio' => 'Long-distance transfer specialist and logistics coordinator. Known for punctuality, calm driving and strong local route knowledge.',
                'instagram' => 'https://instagram.com/carlos_photo',
            ],
        ];

        foreach ($membros as $ordem => $membro) {
            $cargo = Cargo::where('nome', $membro['cargo'])->first();

            MembroEquipa::updateOrCreate(
                ['nome' => $membro['nome']],
                [
                    'cargo' => $membro['cargo'],
                    'cargo_id' => $cargo?->id,
                    'bio' => $membro['bio'],
                    'foto' => null,
                    'linkedin' => $membro['linkedin'] ?? null,
                    'instagram' => $membro['instagram'] ?? null,
                    'telefone' => $membro['telefone'] ?? null,
                    'email' => $membro['email'] ?? null,
                    'ordem' => $ordem,
                    'ativo' => true,
                ],
            );
        }
    }
}
