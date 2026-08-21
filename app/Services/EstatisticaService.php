<?php

namespace App\Services;

use App\Models\Estatistica;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class EstatisticaService
{
    /**
     * @return EloquentCollection<int, Estatistica>
     */
    public function listarAtivas(): EloquentCollection
    {
        return Estatistica::query()->where('ativo', true)->orderBy('ordem')->get();
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
