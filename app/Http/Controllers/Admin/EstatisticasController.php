<?php

namespace App\Http\Controllers\Admin;

use App\Models\Estatistica;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class EstatisticasController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/estatisticas/index', [
            'estatisticas' => Estatistica::orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Estatistica::create($this->validated($request));

        return $this->backWithSuccess('Estatística criada com sucesso.');
    }

    public function update(Request $request, Estatistica $estatistica): RedirectResponse
    {
        $estatistica->update($this->validated($request));

        return $this->backWithSuccess('Estatística atualizada com sucesso.');
    }

    public function destroy(Estatistica $estatistica): RedirectResponse
    {
        $estatistica->delete();

        return $this->backWithSuccess('Estatística eliminada com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'rotulo' => ['required', 'string', 'max:255'],
            'valor' => ['required', 'string', 'max:255'],
            'icone' => ['nullable', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }
}
