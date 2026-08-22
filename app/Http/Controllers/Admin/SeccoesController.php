<?php

namespace App\Http\Controllers\Admin;

use App\Models\Seccao;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Response;

class SeccoesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/seccoes/index', [
            'seccoes' => Seccao::orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request));

        Seccao::create($data);

        return $this->backWithSuccess('Secção criada com sucesso.');
    }

    public function update(Request $request, Seccao $seccao): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request, $seccao));

        $seccao->update($data);

        return $this->backWithSuccess('Secção atualizada com sucesso.');
    }

    public function destroy(Seccao $seccao): RedirectResponse
    {
        $seccao->delete();

        return $this->backWithSuccess('Secção eliminada com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Seccao $seccao = null): array
    {
        $dados = $request->all();

        if (array_key_exists('imagem', $dados) && ! $dados['imagem'] instanceof UploadedFile) {
            if ($dados['imagem'] === '' || $dados['imagem'] === null) {
                $dados['imagem'] = null;
            } else {
                unset($dados['imagem']);
            }
        }

        $request->replace($dados);

        return $request->validate([
            'slug' => ['required', 'string', 'max:255', Rule::unique('seccoes', 'slug')->ignore($seccao?->id)],
            'titulo' => ['nullable', 'string', 'max:255'],
            'sobretitulo' => ['nullable', 'string', 'max:255'],
            'introducao' => ['nullable', 'string'],
            'conteudo' => ['nullable', 'json'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function processarImagem(array $data): array
    {
        if (isset($data['imagem']) && $data['imagem'] instanceof UploadedFile) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'seccoes');
        }

        return $data;
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
