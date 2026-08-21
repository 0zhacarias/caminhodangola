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
        Schema::create('itens_menu', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pai_id')->nullable()->constrained('itens_menu')->nullOnDelete();
            $table->string('rotulo');
            $table->string('rota');
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
        Schema::dropIfExists('itens_menu');
    }
};
