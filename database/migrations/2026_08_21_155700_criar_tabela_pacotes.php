<?php

use App\Models\CategoriaPacote;
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
        Schema::create('pacotes', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('titulo');
            $table->string('subtitulo')->nullable();
            $table->text('descricao')->nullable();
            $table->string('duracao')->nullable();
            $table->string('imagem')->nullable();
            $table->decimal('preco_eur', 10, 2)->nullable();
            $table->string('rotulo_preco')->nullable();
            $table->decimal('preco_pacote_fotos_eur', 10, 2)->nullable();
            $table->unsignedTinyInteger('avaliacao')->nullable();
            $table->json('incluidos')->nullable();
            $table->json('excluidos')->nullable();
            $table->json('o_que_levar')->nullable();
            $table->json('observacoes_importantes')->nullable();
            $table->unsignedInteger('ordem')->default(0);
            $table->boolean('ativo')->default(true);
           $table->foreignIdFor(CategoriaPacote::class)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacotes');
    }
};
