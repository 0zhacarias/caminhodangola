<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Executa as migrações.
     */
    public function up(): void
    {
        Schema::create('condicoes_pagamento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pacote_id')->unique()->constrained('pacotes')->cascadeOnDelete();
            $table->decimal('preco_base_por_pessoa', 10, 2)->nullable();
            $table->decimal('gasto_pessoal_estimado', 10, 2)->nullable();
            $table->unsignedTinyInteger('deposito_percentagem')->nullable();
            $table->unsignedSmallInteger('saldo_dias_antes_partida')->nullable();
            $table->json('metodos_pagamento')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('condicoes_pagamento');
    }
};
