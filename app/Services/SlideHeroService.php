<?php

namespace App\Services;

use App\Models\SlideHero;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class SlideHeroService
{
    private const TTL = 3600;

    /**
     * Slides da home (pagina nula).
     *
     * @return EloquentCollection<int, SlideHero>
     */
    public function listarHome(): EloquentCollection
    {
        return Cache::remember('slides.home', self::TTL, function (): EloquentCollection {
            return SlideHero::query()
                ->where('ativo', true)
                ->where(static function ($query): void {
                    $query->whereNull('pagina')->orWhere('pagina', 'home');
                })
                ->orderBy('ordem')
                ->get();
        });
    }

    /**
     * @return EloquentCollection<int, SlideHero>
     */
    public function listarPorPagina(string $pagina): EloquentCollection
    {
        return Cache::remember('slides.pagina.'.$pagina, self::TTL, function () use ($pagina): EloquentCollection {
            return SlideHero::query()->where('ativo', true)->where('pagina', $pagina)->orderBy('ordem')->get();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): SlideHero
    {
        $slide = SlideHero::create($dados);

        $this->limparCache($slide->pagina);

        return $slide;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(SlideHero $slide, array $dados): SlideHero
    {
        $paginaAntiga = $slide->pagina;

        $slide->update($dados);

        $this->limparCache($paginaAntiga);
        $this->limparCache($slide->pagina);

        return $slide;
    }

    public function remover(SlideHero $slide): void
    {
        $this->limparCache($slide->pagina);

        $slide->delete();
    }

    private function limparCache(?string $pagina): void
    {
        Cache::forget('slides.home');

        if ($pagina !== null && $pagina !== '') {
            Cache::forget('slides.pagina.'.$pagina);
        }
    }
}
