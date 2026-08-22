<?php

namespace App\Http\Controllers\Admin;

use App\Models\MembroEquipa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class MembrosEquipaController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/membros-equipa/index', [
            'membros' => MembroEquipa::orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request));

        MembroEquipa::create($data);

        return $this->backWithSuccess('Membro da equipa criado com sucesso.');
    }

    public function update(Request $request, MembroEquipa $membrosEquipa): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request));

        $membrosEquipa->update($data);

        return $this->backWithSuccess('Membro da equipa atualizado com sucesso.');
    }

    public function destroy(MembroEquipa $membrosEquipa): RedirectResponse
    {
        $membrosEquipa->delete();

        return $this->backWithSuccess('Membro da equipa eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $dados = $request->all();

        if (array_key_exists('foto', $dados) && ! $dados['foto'] instanceof UploadedFile) {
            if ($dados['foto'] === '' || $dados['foto'] === null) {
                $dados['foto'] = null;
            } else {
                unset($dados['foto']);
            }
        }

        $request->replace($dados);

        return $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'cargo' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'telefone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
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
        if (isset($data['foto']) && $data['foto'] instanceof UploadedFile) {
            $data['foto'] = $this->guardarImagem($data['foto'], 'membros-equipa');
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
