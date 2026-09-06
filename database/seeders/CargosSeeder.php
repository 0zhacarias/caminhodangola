<?php

namespace Database\Seeders;

use App\Models\Cargo;
use Illuminate\Database\Seeder;

class CargosSeeder extends Seeder
{
    public function run(): void
    {
        $cargos = [
            'General manager, Founder & Tour leader',
            'Official guide',
            'Driver',
            'Customer experience assistant & Official guide',
            'Digital marketing manager',
            'Sales manager',
        ];

        foreach ($cargos as $ordem => $nome) {
            Cargo::updateOrCreate(
                ['nome' => $nome],
                ['ativo' => true],
            );
        }
    }
}
