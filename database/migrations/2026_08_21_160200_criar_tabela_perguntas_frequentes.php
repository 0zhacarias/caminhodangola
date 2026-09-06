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
        Schema::create('perguntas_frequentes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categoria_id')->constrained('categorias_perguntas_frequentes')->cascadeOnDelete();
            $table->string('pergunta');
            $table->text('resposta');
            $table->unsignedInteger('ordem')->default(0);
            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('perguntas_frequentes');
    }
};
