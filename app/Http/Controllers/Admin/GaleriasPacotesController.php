<?php

namespace App\Http\Controllers\Admin;

use App\Models\GaleriaPacote;
use App\Models\Pacote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class GaleriasPacotesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/galerias-pacotes/index', [
            'galerias' => GaleriaPacote::with('pacote:id,titulo')->orderBy('pacote_id')->orderBy('ordem')->get(),
            'pacotes' => Pacote::orderBy('titulo')->get(['id', 'titulo'])
                ->map(static fn (Pacote $pacote): array => [
                    'value' => $pacote->id,
                    'label' => $pacote->titulo,
                ])
                ->values()
                ->all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['galerias'])) {
            $ordem = (int) GaleriaPacote::where('pacote_id', $data['pacote_id'])->max('ordem');

            foreach ($data['galerias'] as $indice => $ficheiro) {
                GaleriaPacote::create([
                    'pacote_id' => $data['pacote_id'],
                    'imagem' => $this->guardarImagem($ficheiro, 'pacotes/galerias'),
                    'ordem' => $ordem + $indice + 1,
                ]);
            }

            $this->limparCachePacote((int) $data['pacote_id']);

            return $this->backWithSuccess('Imagens adicionadas à galeria com sucesso.');
        }

        if (! isset($data['imagem'])) {
            return back()->withErrors(['imagem' => 'A imagem é obrigatória.'])->withInput();
        }

        $data['imagem'] = $this->guardarImagem($data['imagem'], 'pacotes/galerias');

        GaleriaPacote::create($data);

        $this->limparCachePacote((int) $data['pacote_id']);

        return $this->backWithSuccess('Imagem do pacote criada com sucesso.');
    }

    public function update(Request $request, GaleriaPacote $galeriasPacote): RedirectResponse
    {
        $data = $this->validated($request);

        if (isset($data['imagem'])) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'pacotes/galerias');
        }

        $galeriasPacote->update($data);

        $this->limparCachePacote($galeriasPacote->pacote_id);

        return $this->backWithSuccess('Imagem do pacote atualizada com sucesso.');
    }

    public function destroy(GaleriaPacote $galeriasPacote): RedirectResponse
    {
        $pacoteId = $galeriasPacote->pacote_id;

        $galeriasPacote->delete();

        $this->limparCachePacote($pacoteId);

        return $this->backWithSuccess('Imagem do pacote eliminada com sucesso.');
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
            'pacote_id' => ['required', 'integer', 'exists:pacotes,id'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'galerias' => ['nullable', 'array', 'max:20'],
            'galerias.*' => ['image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'ordem' => ['integer', 'min:0'],
        ]);
    }

    private function limparCachePacote(int $pacoteId): void
    {
        $slug = Pacote::whereKey($pacoteId)->value('slug');

        if ($slug === null) {
            return;
        }

        Cache::deleteMultiple(['pacotes.ativos', 'pacote.'.$slug]);
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
