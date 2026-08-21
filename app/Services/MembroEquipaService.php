<?php

namespace App\Services;

use App\Models\MembroEquipa;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class MembroEquipaService
{
    /**
     * @return EloquentCollection<int, MembroEquipa>
     */
    public function listarAtivos(): EloquentCollection
    {
        return MembroEquipa::query()->where('ativo', true)->orderBy('ordem')->get();
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): MembroEquipa
    {
        return MembroEquipa::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(MembroEquipa $membro, array $dados): MembroEquipa
    {
        $membro->update($dados);

        return $membro;
    }

    public function remover(MembroEquipa $membro): void
    {
        $membro->delete();
    }
}
