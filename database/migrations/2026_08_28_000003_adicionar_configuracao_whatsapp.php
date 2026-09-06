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
            ['chave' => 'whatsapp_numero'],
            ['valor' => '+244923469271', 'created_at' => $agora, 'updated_at' => $agora],
        );

        DB::table('configuracoes')->updateOrInsert(
            ['chave' => 'whatsapp_mensagem'],
            ['valor' => 'Hello! I would like more information about your tours.', 'created_at' => $agora, 'updated_at' => $agora],
        );

        Cache::forget('configuracoes');
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        DB::table('configuracoes')
            ->whereIn('chave', ['whatsapp_numero', 'whatsapp_mensagem'])
            ->delete();
    }
};
