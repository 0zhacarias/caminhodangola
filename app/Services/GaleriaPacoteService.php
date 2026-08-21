<?php

namespace App\Services;

use App\Models\GaleriaPacote;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class GaleriaPacoteService
{
    /**
     * @return EloquentCollection<int, GaleriaPacote>
     */
    public function listarPorPacote(int $pacoteId): EloquentCollection
    {
        return GaleriaPacote::query()->where('pacote_id', $pacoteId)->orderBy('ordem')->get();
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): GaleriaPacote
    {
        return GaleriaPacote::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(GaleriaPacote $imagem, array $dados): GaleriaPacote
    {
        $imagem->update($dados);

        return $imagem;
    }

    public function remover(GaleriaPacote $imagem): void
    {
        $imagem->delete();
    }
}
