<?php

namespace App\Http\Controllers\Admin;

use App\Models\PorqueNos;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class PorquesNosController extends AdminController
{
    /**
     * Tipos de bloco da secção "Porquê Nós".
     *
     * @var array<int, string>
     */
    public const TIPOS = ['cabecalho', 'destaque', 'valor'];

    public function index(): Response
    {
        return $this->render('admin/porques-nos/index', [
            'itens' => PorqueNos::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        PorqueNos::create($this->validated($request));

        return $this->backWithSuccess('Item criado com sucesso.');
    }

    public function update(Request $request, PorqueNos $porquesNo): RedirectResponse
    {
        $porquesNo->update($this->validated($request));

        return $this->backWithSuccess('Item atualizado com sucesso.');
    }

    public function destroy(PorqueNos $porquesNo): RedirectResponse
    {
        $porquesNo->delete();

        return $this->backWithSuccess('Item eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $tipo = (string) $request->input('tipo', 'destaque');
        $usaDescricao = in_array($tipo, ['cabecalho', 'destaque'], true);
        $usaIcone = in_array($tipo, ['destaque', 'valor'], true);

        $dados = $request->validate([
            'tipo' => ['required', 'string', Rule::in(self::TIPOS)],
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => [Rule::requiredIf($usaDescricao), 'nullable', 'string'],
            'icone' => [Rule::requiredIf($usaIcone), 'nullable', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);

        if (! $usaIcone) {
            $dados['icone'] = null;
        }

        if (! $usaDescricao) {
            $dados['descricao'] = null;
        }

        return $dados;
    }
}
