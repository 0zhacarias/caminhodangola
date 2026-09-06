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

        if (isset($data['bandeira'])) {
            $data['bandeira'] = $this->guardarBandeira($data['bandeira']);
        }

        $this->videos->criar($data);

        return $this->backWithSuccess('Vídeo criado com sucesso.');
    }

    public function update(Request $request, VideoDepoimento $videosDepoimento): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['video'])) {
            $data['video'] = $this->guardarVideo($data['video']);
        }

        if (isset($data['bandeira'])) {
            $data['bandeira'] = $this->guardarBandeira($data['bandeira']);
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

        if (array_key_exists('bandeira', $dados) && ! $dados['bandeira'] instanceof UploadedFile) {
            if ($dados['bandeira'] === '' || $dados['bandeira'] === null) {
                $dados['bandeira'] = null;
            } else {
                unset($dados['bandeira']);
            }
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
            'bandeira' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
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

    private function guardarBandeira(UploadedFile $ficheiro): string
    {
        $caminho = Storage::disk('public')->putFile('videos-depoimentos', $ficheiro);

        if ($caminho === false) {
            throw new \RuntimeException('Não foi possível guardar a bandeira.');
        }

        return $caminho;
    }
}
