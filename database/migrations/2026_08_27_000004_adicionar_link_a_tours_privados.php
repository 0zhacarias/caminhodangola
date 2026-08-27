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
        Schema::table('tours_privados', function (Blueprint $table) {
            $table->string('link')->nullable()->after('icone');
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::table('tours_privados', function (Blueprint $table) {
            $table->dropColumn('link');
        });
    }
};
