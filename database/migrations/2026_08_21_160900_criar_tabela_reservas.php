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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('email');
            $table->string('telefone')->nullable();
            $table->foreignId('pacote_id')->nullable()->constrained('pacotes')->nullOnDelete();
            $table->date('data_pretendida')->nullable();
            $table->unsignedTinyInteger('numero_viajantes')->default(1);
            $table->text('mensagem')->nullable();
            $table->string('estado')->default('new');
            $table->timestamps();
        });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
