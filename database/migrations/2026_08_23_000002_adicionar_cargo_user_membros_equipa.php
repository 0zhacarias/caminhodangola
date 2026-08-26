<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Executa as migrações.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('ativo')->default(true)->after('email');
        });

        Schema::table('membros_equipa', function (Blueprint $table) {
            $table->foreignId('cargo_id')->nullable()->after('cargo')->constrained('cargos')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->after('cargo_id')->constrained('users')->nullOnDelete();
        });

        DB::table('membros_equipa')
            ->whereNotNull('cargo')
            ->where('cargo', '<>', '')
            ->select('id', 'cargo')
            ->orderBy('id')
            ->each(function ($membro) {
                $cargoId = DB::table('cargos')->where('nome', $membro->cargo)->value('id');

                if ($cargoId !== null) {
                    DB::table('membros_equipa')
                        ->where('id', $membro->id)
                        ->update(['cargo_id' => $cargoId]);
                }
            });
    }

    /**
     * Reverte as migrações.
     */
    public function down(): void
    {
        Schema::table('membros_equipa', function (Blueprint $table) {
            $table->dropConstrainedForeignId('cargo_id');
            $table->dropConstrainedForeignId('user_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('ativo');
        });
    }
};
