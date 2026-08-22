<?php

namespace App\Http\Controllers\Admin;

use App\Models\Configuracao;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ConfiguracoesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/configuracoes/index', [
            'configuracoes' => Configuracao::orderBy('chave')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Configuracao::create($this->validated($request));

        return $this->backWithSuccess('Configuração criada com sucesso.');
    }

    public function update(Request $request, Configuracao $configuracao): RedirectResponse
    {
        $configuracao->update($this->validated($request, $configuracao));

        return $this->backWithSuccess('Configuração atualizada com sucesso.');
    }

    public function destroy(Configuracao $configuracao): RedirectResponse
    {
        $configuracao->delete();

        return $this->backWithSuccess('Configuração eliminada com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Configuracao $configuracao = null): array
    {
        return $request->validate([
            'chave' => ['required', 'string', 'max:255', Rule::unique('configuracoes', 'chave')->ignore($configuracao?->id)],
            'valor' => ['nullable', 'string'],
        ]);
    }
}
