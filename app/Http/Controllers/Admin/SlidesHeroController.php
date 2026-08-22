<?php

namespace App\Http\Controllers\Admin;

use App\Models\SlideHero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class SlidesHeroController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/slides-hero/index', [
            'slides' => SlideHero::orderBy('pagina')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if (! isset($data['imagem'])) {
            return back()->withErrors(['imagem' => 'A imagem é obrigatória.'])->withInput();
        }

        $data['imagem'] = $this->guardarImagem($data['imagem'], 'slides-hero');

        SlideHero::create($data);

        return $this->backWithSuccess('Slide criado com sucesso.');
    }

    public function update(Request $request, SlideHero $slidesHero): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'slides-hero');
        }

        $slidesHero->update($data);

        return $this->backWithSuccess('Slide atualizado com sucesso.');
    }

    public function destroy(SlideHero $slidesHero): RedirectResponse
    {
        $slidesHero->delete();

        return $this->backWithSuccess('Slide eliminado com sucesso.');
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
            'pagina' => ['nullable', 'string', 'max:255'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'titulo' => ['required', 'string', 'max:255'],
            'subtitulo' => ['nullable', 'string', 'max:255'],
            'texto' => ['nullable', 'string'],
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
