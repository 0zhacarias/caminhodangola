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
        return PerguntaFrequente::query()
            ->select('perguntas_frequentes.*')
            ->join('categorias_perguntas_frequentes', 'perguntas_frequentes.categoria_id', '=', 'categorias_perguntas_frequentes.id')
            ->where('perguntas_frequentes.ativo', true)
            ->with('categoriaModelo:id,nome')
            ->orderBy('categorias_perguntas_frequentes.ordem')
            ->orderBy('perguntas_frequentes.ordem')
            ->get();
    }

    /**
     * @return EloquentCollection<int, PerguntaFrequente>
     */
    public function listarPorCategoria(string $categoria): EloquentCollection
    {
        return PerguntaFrequente::query()
            ->with('categoriaModelo:id,nome')
            ->where('ativo', true)
            ->whereHas('categoriaModelo', static fn ($query) => $query->where('nome', $categoria))
            ->orderBy('ordem')
            ->get();
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
