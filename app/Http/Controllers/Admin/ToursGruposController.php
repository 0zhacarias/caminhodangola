<?php

namespace App\Http\Controllers\Admin;

use App\Models\TourGrupo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ToursGruposController extends AdminController
{
    /**
     * Tipos de bloco da secção "Group Tours".
     *
     * @var array<int, string>
     */
    public const TIPOS = ['cabecalho', 'destaque', 'cta_whatsapp', 'cta_email'];

    public function index(): Response
    {
        return $this->render('admin/tours-grupos/index', [
            'itens' => TourGrupo::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        TourGrupo::create($this->validated($request));

        return $this->backWithSuccess('Item criado com sucesso.');
    }

    public function update(Request $request, TourGrupo $toursGrupo): RedirectResponse
    {
        $toursGrupo->update($this->validated($request));

        return $this->backWithSuccess('Item atualizado com sucesso.');
    }

    public function destroy(TourGrupo $toursGrupo): RedirectResponse
    {
        $toursGrupo->delete();

        return $this->backWithSuccess('Item eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $tipo = (string) $request->input('tipo', 'destaque');
        $usaIcone = $tipo === 'destaque';
        $usaLink = $tipo === 'cta_whatsapp' || $tipo === 'cta_email';

        $dados = $request->validate([
            'tipo' => ['required', 'string', Rule::in(self::TIPOS)],
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['required', 'string'],
            'icone' => [Rule::requiredIf($usaIcone), 'nullable', 'string', 'max:255'],
            'link' => [$tipo === 'cta_email' ? 'required' : 'nullable', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);

        if (! $usaIcone) {
            $dados['icone'] = null;
        }

        if (! $usaLink) {
            $dados['link'] = null;
        }

        return $dados;
    }
}
