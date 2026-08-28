<?php

namespace App\Http\Controllers\Admin;

use App\Models\ItemMenu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ItensMenuController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/itens-menu/index', [
            'itens' => ItemMenu::with('pai:id,rotulo')->orderBy('ordem')->orderByDesc('id')->get(),
            'pais' => ItemMenu::whereNull('pai_id')->orderBy('ordem')->get(['id', 'rotulo'])
                ->map(static fn (ItemMenu $item): array => [
                    'value' => $item->id,
                    'label' => $item->rotulo,
                ])
                ->values()
                ->all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        ItemMenu::create($this->validated($request));

        return $this->backWithSuccess('Item de menu criado com sucesso.');
    }

    public function update(Request $request, ItemMenu $itensMenu): RedirectResponse
    {
        $data = $this->validated($request);

        if ((int) $data['pai_id'] === $itensMenu->id) {
            $data['pai_id'] = null;
        }

        $itensMenu->update($data);

        return $this->backWithSuccess('Item de menu atualizado com sucesso.');
    }

    public function destroy(ItemMenu $itensMenu): RedirectResponse
    {
        $itensMenu->delete();

        return $this->backWithSuccess('Item de menu eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'pai_id' => ['nullable', 'integer', 'exists:itens_menu,id'],
            'rotulo' => ['required', 'string', 'max:255'],
            'rota' => ['required', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }
}
