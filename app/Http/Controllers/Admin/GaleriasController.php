<?php

namespace App\Http\Controllers\Admin;

use App\Models\Galeria;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class GaleriasController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/galerias/index', [
            'galerias' => Galeria::orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $ficheiros = $data['imagens'] ?? [];

        if ($ficheiros === []) {
            return back()->withErrors(['imagens' => 'É necessário adicionar pelo menos uma imagem.'])->withInput();
        }

        $ordemInicial = ((int) (Galeria::max('ordem') ?? -1)) + 1;

        foreach ($ficheiros as $indice => $ficheiro) {
            Galeria::create([
                'imagem' => $this->guardarImagem($ficheiro, 'galerias'),
                'alt' => null,
                'ordem' => $ordemInicial + $indice,
                'ativo' => $data['ativo'] ?? true,
            ]);
        }

        $mensagem = count($ficheiros) === 1
            ? 'Imagem da galeria criada com sucesso.'
            : count($ficheiros).' imagens da galeria criadas com sucesso.';

        return $this->backWithSuccess($mensagem);
    }

    public function update(Request $request, Galeria $galeria): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'galerias');
        }

        $galeria->update($data);

        return $this->backWithSuccess('Imagem da galeria atualizada com sucesso.');
    }

    public function destroy(Galeria $galeria): RedirectResponse
    {
        $galeria->delete();

        return $this->backWithSuccess('Imagem da galeria eliminada com sucesso.');
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
            'imagens' => ['nullable', 'array', 'max:50'],
            'imagens.*' => ['image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'alt' => ['nullable', 'string', 'max:255'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }

    private function guardarImagem(UploadedFile $ficheiro, string $pasta): string
    {
        $caminho = $ficheiro->store($pasta, 'public');

        if ($caminho === false) {
            throw new \RuntimeException('Não foi possível guardar a imagem.');
        }

        return Storage::disk('public')->url($caminho);
    }
}
