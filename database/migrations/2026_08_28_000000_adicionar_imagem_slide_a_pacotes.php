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
            $table->string('imagem_slide')->nullable();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::table('pacotes', function (Blueprint $table) {
            $table->dropColumn('imagem_slide');
        });
    }
};
