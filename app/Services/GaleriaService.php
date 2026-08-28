<?php

namespace App\Services;

use App\Models\Galeria;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class GaleriaService
{
    private const TTL = 3600;

    /**
     * @return EloquentCollection<int, Galeria>
     */
    public function listarAtivas(): EloquentCollection
    {
        return Cache::remember('galerias.ativas', self::TTL, function (): EloquentCollection {
            return Galeria::query()->where('ativo', true)->orderBy('ordem')->get();
        });
    }

    /**
     * Prévia para a secção de galeria pequena (primeiras imagens).
     *
     * @return EloquentCollection<int, Galeria>
     */
    public function previa(int $limite = 15): EloquentCollection
    {
        return Cache::remember('galerias.previa.'.$limite, self::TTL, function () use ($limite): EloquentCollection {
            return Galeria::query()->where('ativo', true)->orderBy('ordem')->limit($limite)->get();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Galeria
    {
        $galeria = Galeria::create($dados);

        Cache::deleteMultiple(['galerias.ativas', 'galerias.previa.15']);

        return $galeria;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(Galeria $galeria, array $dados): Galeria
    {

        $galeria->update($dados);

        Cache::deleteMultiple(['galerias.ativas', 'galerias.previa.15']);

        return $galeria;
    }

    public function remover(Galeria $galeria): void
    {
        Cache::deleteMultiple(['galerias.ativas', 'galerias.previa.15']);

        $galeria->delete();
    }
}
