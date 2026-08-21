<?php

namespace App\Services;

use App\Models\PerguntaFrequente;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class PerguntaFrequenteService
{
    /**
     * @return EloquentCollection<int, PerguntaFrequente>
     */
    public function listarAtivas(): EloquentCollection
    {
        return PerguntaFrequente::query()->where('ativo', true)->orderBy('categoria')->orderBy('ordem')->get();
    }

    /**
     * @return EloquentCollection<int, PerguntaFrequente>
     */
    public function listarPorCategoria(string $categoria): EloquentCollection
    {
        return PerguntaFrequente::query()->where('ativo', true)->where('categoria', $categoria)->orderBy('ordem')->get();
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): PerguntaFrequente
    {
        return PerguntaFrequente::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(PerguntaFrequente $faq, array $dados): PerguntaFrequente
    {
        $faq->update($dados);

        return $faq;
    }

    public function remover(PerguntaFrequente $faq): void
    {
        $faq->delete();
    }
}
