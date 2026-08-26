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
        Schema::create('slides_hero', function (Blueprint $table) {
            $table->id();
            $table->string('pagina')->nullable();
            $table->string('imagem')->nullable();
            $table->string('titulo')->nullable();
            $table->text('texto')->nullable();
            $table->string('subtitulo')->nullable();
               $table->string('botao_rotulo')->nullable();
            $table->string('botao_url')->nullable();
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
        Schema::dropIfExists('slides_hero');
    }
};
