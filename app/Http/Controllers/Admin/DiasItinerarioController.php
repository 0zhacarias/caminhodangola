<?php

namespace App\Http\Controllers\Admin;

use App\Models\DiaItinerario;
use App\Models\Pacote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class DiasItinerarioController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/dias-itinerario/index', [
            'dias' => DiaItinerario::with('pacote:id,titulo')->orderBy('pacote_id')->orderBy('ordem')->get(),
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
        $data = $this->processarImagem($this->validated($request));

        DiaItinerario::create($data);

        return $this->backWithSuccess('Dia de itinerário criado com sucesso.');
    }

    public function update(Request $request, DiaItinerario $diasItinerario): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request));

        $diasItinerario->update($data);

        return $this->backWithSuccess('Dia de itinerário atualizado com sucesso.');
    }

    public function destroy(DiaItinerario $diasItinerario): RedirectResponse
    {
        $diasItinerario->delete();

        return $this->backWithSuccess('Dia de itinerário eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
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
            'pacote_id' => ['required', 'integer', 'exists:pacotes,id'],
            'rotulo_dia' => ['required', 'string', 'max:255'],
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['required', 'string'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'ordem' => ['integer', 'min:0'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function processarImagem(array $data): array
    {
        if (isset($data['imagem']) && $data['imagem'] instanceof UploadedFile) {
            $data['imagem'] = $this->guardarImagem($data['imagem'], 'pacotes/itinerario');
        }

        return $data;
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
