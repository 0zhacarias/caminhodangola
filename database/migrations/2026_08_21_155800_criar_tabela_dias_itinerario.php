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
        Schema::create('dias_itinerario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pacote_id')->constrained('pacotes')->cascadeOnDelete();
            $table->string('rotulo_dia');
            $table->string('titulo');
            $table->text('descricao');
            $table->string('imagem')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('dias_itinerario');
    }
};
