<?php

namespace App\Http\Controllers\Admin;

use App\Models\CategoriaPacote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class CategoriasPacotesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/categorias-pacotes/index', [
            'categorias' => CategoriaPacote::withCount('pacotes')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        CategoriaPacote::create($this->validated($request));

        return $this->backWithSuccess('Categoria criada com sucesso.');
    }

    public function update(Request $request, CategoriaPacote $categoriasPacote): RedirectResponse
    {
        $categoriasPacote->update($this->validated($request, $categoriasPacote));

        return $this->backWithSuccess('Categoria atualizada com sucesso.');
    }

    public function destroy(CategoriaPacote $categoriasPacote): RedirectResponse
    {
        $categoriasPacote->delete();

        return $this->backWithSuccess('Categoria eliminada com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?CategoriaPacote $categoria = null): array
    {
        return $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('categorias_pacotes', 'slug')->ignore($categoria?->id)],
            'descricao' => ['nullable', 'string'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }
}
