<?php

namespace App\Http\Controllers\Admin;

use App\Models\CategoriaPerguntaFrequente;
use App\Models\PerguntaFrequente;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class PerguntasFrequentesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/perguntas-frequentes/index', [
            'perguntas' => PerguntaFrequente::with('categoriaModelo:id,nome,ordem')
                ->orderBy('categoria_id')
                ->orderBy('ordem')
                ->orderByDesc('id')
                ->get(),
            'categorias' => CategoriaPerguntaFrequente::orderBy('ordem')->orderBy('nome')->get(),
            'categoriasOpcoes' => $this->categoriasComoOpcoes(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        PerguntaFrequente::create($this->validated($request));

        return $this->backWithSuccess('Pergunta frequente criada com sucesso.');
    }

    public function update(Request $request, PerguntaFrequente $perguntasFrequente): RedirectResponse
    {
        $perguntasFrequente->update($this->validated($request));

        return $this->backWithSuccess('Pergunta frequente atualizada com sucesso.');
    }

    public function destroy(PerguntaFrequente $perguntasFrequente): RedirectResponse
    {
        $perguntasFrequente->delete();

        return $this->backWithSuccess('Pergunta frequente eliminada com sucesso.');
    }

    /**
     * @return array<int, array{value: int, label: string}>
     */
    private function categoriasComoOpcoes(): array
    {
        return CategoriaPerguntaFrequente::orderBy('ordem')->orderBy('nome')->get()
            ->map(static fn (CategoriaPerguntaFrequente $categoria): array => [
                'value' => $categoria->id,
                'label' => $categoria->nome,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'categoria_id' => ['required', 'integer', 'exists:categorias_perguntas_frequentes,id'],
            'pergunta' => ['required', 'string', 'max:255'],
            'resposta' => ['required', 'string'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }
}
