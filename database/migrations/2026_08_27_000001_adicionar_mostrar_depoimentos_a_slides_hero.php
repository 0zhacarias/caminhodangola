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
        Schema::table('slides_hero', function (Blueprint $table) {
            $table->boolean('mostrar_depoimentos')->default(false)->after('ativo');
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::table('slides_hero', function (Blueprint $table) {
            $table->dropColumn('mostrar_depoimentos');
        });
    }
};
