<?php

namespace App\Http\Controllers\Admin;

use App\Models\CategoriaPerguntaFrequente;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CategoriasPerguntasFrequentesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/categorias-perguntas-frequentes/index', [
            'categorias' => CategoriaPerguntaFrequente::orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        CategoriaPerguntaFrequente::create($this->validated($request));

        return $this->backWithSuccess('Categoria criada com sucesso.');
    }

    public function update(Request $request, CategoriaPerguntaFrequente $categoriasPerguntasFrequente): RedirectResponse
    {
        $categoriasPerguntasFrequente->update($this->validated($request));

        return $this->backWithSuccess('Categoria atualizada com sucesso.');
    }

    public function destroy(CategoriaPerguntaFrequente $categoriasPerguntasFrequente): RedirectResponse
    {
        $categoriasPerguntasFrequente->delete();

        return $this->backWithSuccess('Categoria eliminada com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }
}
