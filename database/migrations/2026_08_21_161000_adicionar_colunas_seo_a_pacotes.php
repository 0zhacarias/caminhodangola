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
        Schema::table('pacotes', function (Blueprint $table) {
            $table->string('meta_titulo')->nullable();
            $table->text('meta_descricao')->nullable();
            $table->string('imagem_og')->nullable();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::table('pacotes', function (Blueprint $table) {
            $table->dropColumn(['meta_titulo', 'meta_descricao', 'imagem_og']);
        });
    }
};
