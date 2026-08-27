<?php

namespace App\Http\Controllers\Admin;

use App\Models\VideoDepoimento;
use App\Services\VideoDepoimentoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class VideosDepoimentosController extends AdminController
{
    public function __construct(private readonly VideoDepoimentoService $videos) {}

    public function index(): Response
    {
        return $this->render('admin/videos-depoimentos/index', [
            'videos' => $this->videos->listar(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request, obrigatorio: true);

        $data['video'] = $this->guardarVideo($data['video']);

        $this->videos->criar($data);

        return $this->backWithSuccess('Vídeo criado com sucesso.');
    }

    public function update(Request $request, VideoDepoimento $videosDepoimento): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['video'])) {
            $data['video'] = $this->guardarVideo($data['video']);
        }

        $this->videos->atualizar($videosDepoimento, $data);

        return $this->backWithSuccess('Vídeo atualizado com sucesso.');
    }

    public function destroy(VideoDepoimento $videosDepoimento): RedirectResponse
    {
        $this->videos->remover($videosDepoimento);

        return $this->backWithSuccess('Vídeo eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, bool $obrigatorio = false): array
    {
        $dados = $request->all();

        if (array_key_exists('video', $dados) && ! $dados['video'] instanceof UploadedFile) {
            unset($dados['video']);
        }

        $request->replace($dados);

        return $request->validate([
            'titulo' => ['nullable', 'string', 'max:255'],
            'descricao' => ['nullable', 'string', 'max:255'],
            'video' => [
                $obrigatorio ? 'required' : 'nullable',
                'file',
                'mimetypes:video/mp4,video/quicktime,video/webm,video/x-msvideo',
                'max:102400',
            ],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
        ]);
    }

    private function guardarVideo(UploadedFile $ficheiro): string
    {
        $caminho = Storage::disk('public')->putFile('videos-depoimentos', $ficheiro);

        if ($caminho === false) {
            throw new \RuntimeException('Não foi possível guardar o vídeo.');
        }

        return $caminho;
    }
}
