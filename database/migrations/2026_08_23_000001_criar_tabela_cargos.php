<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Executa as migrações.
     */
    public function up(): void
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique();
            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });

        $cargosExistentes = DB::table('membros_equipa')
            ->whereNotNull('cargo')
            ->where('cargo', '<>', '')
            ->distinct()
            ->pluck('cargo');

        foreach ($cargosExistentes as $cargo) {
            DB::table('cargos')->insert([
                'nome' => $cargo,
                'ativo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }
};
