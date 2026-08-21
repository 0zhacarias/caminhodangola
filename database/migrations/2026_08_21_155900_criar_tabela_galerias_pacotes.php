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
        Schema::create('galerias_pacotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pacote_id')->constrained('pacotes')->cascadeOnDelete();
            $table->string('imagem');
            $table->unsignedInteger('ordem')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('galerias_pacotes');
    }
};
