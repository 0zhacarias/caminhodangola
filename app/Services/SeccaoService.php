<?php

namespace App\Services;

use App\Models\Seccao;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class SeccaoService
{
    private const TTL = 3600;

    /**
     * @return EloquentCollection<int, Seccao>
     */
    public function listarAtivas(): EloquentCollection
    {
        return Cache::remember('seccoes.ativas', self::TTL, function (): EloquentCollection {
            return Seccao::query()->where('ativo', true)->orderBy('ordem')->get();
        });
    }

    public function obterPorSlug(string $slug): ?Seccao
    {
        return Cache::remember('seccao.'.$slug, self::TTL, function () use ($slug): ?Seccao {
            return Seccao::query()->where('ativo', true)->where('slug', $slug)->first();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Seccao
    {
        $seccao = Seccao::create($dados);

        Cache::forget('seccoes.ativas');

        return $seccao;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(Seccao $seccao, array $dados): Seccao
    {
        $seccao->update($dados);

        Cache::deleteMultiple(['seccoes.ativas', 'seccao.'.$seccao->slug]);

        return $seccao;
    }

    public function remover(Seccao $seccao): void
    {
        Cache::deleteMultiple(['seccoes.ativas', 'seccao.'.$seccao->slug]);

        $seccao->delete();
    }
}
