<?php

namespace App\Services;

use App\Models\DiaItinerario;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class DiaItinerarioService
{
    /**
     * @return EloquentCollection<int, DiaItinerario>
     */
    public function listarPorPacote(int $pacoteId): EloquentCollection
    {
        return DiaItinerario::query()->where('pacote_id', $pacoteId)->orderBy('ordem')->get();
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): DiaItinerario
    {
        return DiaItinerario::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(DiaItinerario $dia, array $dados): DiaItinerario
    {
        $dia->update($dados);

        return $dia;
    }

    public function remover(DiaItinerario $dia): void
    {
        $dia->delete();
    }
}
