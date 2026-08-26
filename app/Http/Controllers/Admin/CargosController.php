<?php

namespace App\Http\Controllers\Admin;

use App\Models\Cargo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class CargosController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/cargos/index', [
            'cargos' => Cargo::orderBy('nome')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Cargo::create($this->validated($request));

        return $this->backWithSuccess('Cargo criado com sucesso.');
    }

    public function update(Request $request, Cargo $cargo): RedirectResponse
    {
        $cargo->update($this->validated($request));

        return $this->backWithSuccess('Cargo atualizado com sucesso.');
    }

    public function destroy(Cargo $cargo): RedirectResponse
    {
        $cargo->delete();

        return $this->backWithSuccess('Cargo eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'nome' => ['required', 'string', 'max:255', Rule::unique('cargos', 'nome')->ignore($request->route('cargo'))],
            'ativo' => ['boolean'],
        ]);
    }
}
