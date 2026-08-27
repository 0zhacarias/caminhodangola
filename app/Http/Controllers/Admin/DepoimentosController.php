<?php

namespace App\Http\Controllers\Admin;

use App\Models\Depoimento;
use App\Services\VideoDepoimentoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DepoimentosController extends AdminController
{
    public function __construct(private readonly VideoDepoimentoService $videos) {}

    public function index(): Response
    {
        return $this->render('admin/depoimentos/index', [
            'depoimentos' => Depoimento::orderBy('ordem')->orderByDesc('id')->get(),
            'videos' => $this->videos->listar(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Depoimento::create($this->validated($request));

        return $this->backWithSuccess('Depoimento criado com sucesso.');
    }

    public function update(Request $request, Depoimento $depoimento): RedirectResponse
    {
        $depoimento->update($this->validated($request));

        return $this->backWithSuccess('Depoimento atualizado com sucesso.');
    }

    public function destroy(Depoimento $depoimento): RedirectResponse
    {
        $depoimento->delete();

        return $this->backWithSuccess('Depoimento eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'localizacao' => ['nullable', 'string', 'max:255'],
            'mensagem' => ['required', 'string'],
            'avaliacao' => ['required', 'integer', 'between:1,5'],
            'destaque' => ['boolean'],
            'ordem' => ['integer', 'min:0'],
        ]);
    }
}
