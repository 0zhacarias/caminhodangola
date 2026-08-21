<?php

namespace App\Services;

use App\Models\Depoimento;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class DepoimentoService
{
    /**
     * @return EloquentCollection<int, Depoimento>
     */
    public function listar(): EloquentCollection
    {
        return Depoimento::query()->orderBy('destaque', 'desc')->orderBy('ordem')->get();
    }

    /**
     * @return EloquentCollection<int, Depoimento>
     */
    public function listarDestaques(): EloquentCollection
    {
        return Depoimento::query()->where('destaque', true)->orderBy('ordem')->get();
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Depoimento
    {
        return Depoimento::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(Depoimento $depoimento, array $dados): Depoimento
    {
        $depoimento->update($dados);

        return $depoimento;
    }

    public function remover(Depoimento $depoimento): void
    {
        $depoimento->delete();
    }
}
