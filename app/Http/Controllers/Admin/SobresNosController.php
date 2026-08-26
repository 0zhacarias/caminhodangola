<?php

namespace App\Http\Controllers\Admin;

use App\Models\SobreNos;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class SobresNosController extends AdminController
{
    /**
     * Tipos de bloco da secção "About Us".
     *
     * @var array<int, string>
     */
    public const TIPOS = ['cabecalho', 'quem_somos', 'unico', 'citacao', 'destaque'];

    public function index(): Response
    {
        return $this->render('admin/sobres-nos/index', [
            'itens' => SobreNos::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        SobreNos::create($this->validated($request));

        return $this->backWithSuccess('Item criado com sucesso.');
    }

    public function update(Request $request, SobreNos $sobresNo): RedirectResponse
    {
        $sobresNo->update($this->validated($request));

        return $this->backWithSuccess('Item atualizado com sucesso.');
    }

    public function destroy(SobreNos $sobresNo): RedirectResponse
    {
        $sobresNo->delete();

        return $this->backWithSuccess('Item eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $tipo = (string) $request->input('tipo', 'destaque');
        $usaTitulo = in_array($tipo, ['cabecalho', 'quem_somos', 'unico', 'destaque'], true);
        $usaDescricao = true;
        $usaIcone = $tipo === 'destaque';

        $dados = $request->validate([
            'tipo' => ['required', 'string', Rule::in(self::TIPOS)],
            'titulo' => [Rule::requiredIf($usaTitulo), 'nullable', 'string', 'max:255'],
            'descricao' => [Rule::requiredIf($usaDescricao), 'nullable', 'string'],
            'icone' => [Rule::requiredIf($usaIcone), 'nullable', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);

        if (! $usaTitulo) {
            $dados['titulo'] = null;
        }

        if (! $usaDescricao) {
            $dados['descricao'] = null;
        }

        if (! $usaIcone) {
            $dados['icone'] = null;
        }

        return $dados;
    }
}
