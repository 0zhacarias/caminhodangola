<?php

namespace App\Http\Controllers\Admin;

use App\Models\PorqueAngola;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class PorquesAngolaController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/porques-angola/index', [
            'itens' => PorqueAngola::orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'porques-angola');
        }

        PorqueAngola::create($data);

        return $this->backWithSuccess('Item criado com sucesso.');
    }

    public function update(Request $request, PorqueAngola $porquesAngola): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'porques-angola');
        }

        $porquesAngola->update($data);

        return $this->backWithSuccess('Item atualizado com sucesso.');
    }

    public function destroy(PorqueAngola $porquesAngola): RedirectResponse
    {
        $porquesAngola->delete();

        return $this->backWithSuccess('Item eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $dados = $request->all();

        if (array_key_exists('imagem', $dados) && ! $dados['imagem'] instanceof UploadedFile) {
            unset($dados['imagem']);
        }

        $request->replace($dados);

        return $request->validate([
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['required', 'string'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }

    private function guardarImagem(UploadedFile $ficheiro, string $pasta): string
    {
        $caminho = Storage::disk('public')->putFile($pasta, $ficheiro);

        if ($caminho === false) {
            throw new \RuntimeException('Não foi possível guardar a imagem.');
        }

        return $caminho;
    }
}
