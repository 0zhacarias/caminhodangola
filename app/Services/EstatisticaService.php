<?php

namespace App\Services;

use App\Models\Estatistica;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class EstatisticaService
{
    private const TTL = 3600;

    /**
     * @return EloquentCollection<int, Estatistica>
     */
    public function listarAtivas(): EloquentCollection
    {
        return Cache::remember('estatisticas.ativas', self::TTL, function (): EloquentCollection {
            return Estatistica::query()->where('ativo', true)->orderBy('ordem')->get();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Estatistica
    {
        return Estatistica::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(Estatistica $estatistica, array $dados): Estatistica
    {
        $estatistica->update($dados);

        return $estatistica;
    }

    public function remover(Estatistica $estatistica): void
    {
        $estatistica->delete();
    }
}
