<?php

namespace App\Http\Controllers\Admin;

use App\Models\SlideHero;
use App\Services\SlideHeroService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Response;

class SlidesHeroController extends AdminController
{
    public function __construct(private readonly SlideHeroService $slides) {}

    public function index(): Response
    {
        return $this->render('admin/slides-hero/index', [
            'slides' => SlideHero::orderBy('pagina')->orderBy('ordem')->orderByDesc('id')->get(),
            'paginas' => SlideHero::PAGINAS,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'slides-hero');
        }

        $this->slides->criar($data);

        return $this->backWithSuccess('Slide criado com sucesso.');
    }

    public function update(Request $request, SlideHero $slidesHero): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'slides-hero');
        }

        $this->slides->atualizar($slidesHero, $data);

        return $this->backWithSuccess('Slide atualizado com sucesso.');
    }

    public function destroy(SlideHero $slidesHero): RedirectResponse
    {
        $this->slides->remover($slidesHero);

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
            'pagina' => ['required', 'string', Rule::in(array_keys(SlideHero::PAGINAS))],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'titulo' => ['nullable', 'string', 'max:255'],
            'subtitulo' => ['nullable', 'string', 'max:255'],
            'texto' => ['nullable', 'string'],
            'botao_rotulo' => ['nullable', 'string', 'max:255'],
            'botao_url' => ['nullable', 'string', 'max:2048'],
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
