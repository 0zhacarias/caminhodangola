<?php

namespace App\Services;

use App\Models\ItemMenu;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Cache;

final class ItemMenuService
{
    private const TTL = 3600;

    /**
     * @return EloquentCollection<int, ItemMenu>
     */
    public function listarAtivos(): EloquentCollection
    {
        return ItemMenu::query()->where('ativo', true)->orderBy('ordem')->get();
    }

    /**
     * Devolve a árvore do menu: itens raiz com os respetivos filhos ativos.
     *
     * @return EloquentCollection<int, ItemMenu>
     */
    public function arvore(): EloquentCollection
    {
        return Cache::remember('menu.arvore', self::TTL, function (): EloquentCollection {
            return ItemMenu::query()
                ->where('ativo', true)
                ->whereNull('pai_id')
                ->with(['filhos' => fn ($query) => $query->where('ativo', true)->orderBy('ordem')])
                ->orderBy('ordem')
                ->get();
        });
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): ItemMenu
    {
        $item = ItemMenu::create($dados);

        Cache::forget('menu.arvore');

        return $item;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(ItemMenu $item, array $dados): ItemMenu
    {
        $item->update($dados);

        Cache::forget('menu.arvore');

        return $item;
    }

    public function remover(ItemMenu $item): void
    {
        Cache::forget('menu.arvore');

        $item->delete();
    }
}
