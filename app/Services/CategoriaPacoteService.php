<?php

namespace App\Services;

use App\Models\CategoriaPacote;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class CategoriaPacoteService
{
    private const TTL = 3600;

    /**
     * @return EloquentCollection<int, CategoriaPacote>
     */
    public function listarAtivas(): EloquentCollection
    {
        return Cache::remember('categorias.ativas', self::TTL, function (): EloquentCollection {
            return CategoriaPacote::query()->where('ativo', true)->orderBy('ordem')->get();
        });
    }

    public function obterPorSlug(string $slug): ?CategoriaPacote
    {
        return Cache::remember('categoria.'.$slug, self::TTL, function () use ($slug): ?CategoriaPacote {
            return CategoriaPacote::query()->with('pacotes')->where('ativo', true)->where('slug', $slug)->first();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): CategoriaPacote
    {
        $categoria = CategoriaPacote::create($dados);

        Cache::forget('categorias.ativas');

        return $categoria;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(CategoriaPacote $categoria, array $dados): CategoriaPacote
    {
        $categoria->update($dados);

        Cache::deleteMultiple(['categorias.ativas', 'categoria.'.$categoria->slug]);

        return $categoria;
    }

    public function remover(CategoriaPacote $categoria): void
    {
        Cache::deleteMultiple(['categorias.ativas', 'categoria.'.$categoria->slug]);

        $categoria->delete();
    }
}
