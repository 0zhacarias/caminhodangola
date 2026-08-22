<?php

namespace App\Services;

use App\Models\Pacote;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class PacoteService
{
    private const TTL = 3600;

    /**
     * @return EloquentCollection<int, Pacote>
     */
    public function listarAtivos(): EloquentCollection
    {
        return Cache::remember('pacotes.ativos', self::TTL, function (): EloquentCollection {
            return Pacote::query()->with('categoria')->where('ativo', true)->orderBy('ordem')->get();
        });
    }

    /**
     * @return EloquentCollection<int, Pacote>
     */
    public function listarPorCategoria(int $categoriaId): EloquentCollection
    {
        return Pacote::query()->with('categoria')->where('ativo', true)->where('categoria_pacote_id', $categoriaId)->orderBy('ordem')->get();
    }

    public function obterPorSlug(string $slug): ?Pacote
    {
        return Cache::remember('pacote.'.$slug, self::TTL, function () use ($slug): ?Pacote {
            return Pacote::query()
                ->with(['categoria', 'condicaoPagamento', 'diasItinerario', 'galerias'])
                ->where('ativo', true)
                ->where('slug', $slug)
                ->first();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Pacote
    {
        $pacote = Pacote::create($dados);

        Cache::forget('pacotes.ativos');

        return $pacote;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(Pacote $pacote, array $dados): Pacote
    {
        $pacote->update($dados);

        Cache::forget(['pacotes.ativos', 'pacote.'.$pacote->slug]);

        return $pacote;
    }

    public function remover(Pacote $pacote): void
    {
        Cache::forget(['pacotes.ativos', 'pacote.'.$pacote->slug]);

        $pacote->delete();
    }
}
