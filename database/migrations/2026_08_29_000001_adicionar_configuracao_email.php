<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Executa as migrações.
     */
    public function up(): void
    {
        $agora = now();

        DB::table('configuracoes')->updateOrInsert(
            ['chave' => 'email_contato'],
            ['valor' => 'info@caminhosdangola.com', 'created_at' => $agora, 'updated_at' => $agora],
        );

        Cache::forget('configuracoes');
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        DB::table('configuracoes')
            ->where('chave', 'email_contato')
            ->delete();
    }
};
