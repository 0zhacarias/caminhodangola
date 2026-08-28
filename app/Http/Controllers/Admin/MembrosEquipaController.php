<?php

namespace App\Http\Controllers\Admin;

use App\Models\Cargo;
use App\Models\MembroEquipa;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Response;

class MembrosEquipaController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/membros-equipa/index', [
            'membros' => MembroEquipa::query()
                ->with('user')
                ->orderBy('ordem')
                ->orderByDesc('id')
                ->get(),
            'cargos' => Cargo::orderBy('nome')->get(),
            'visao' => session('preferencias.visualizacao.membros_equipa', 'grid'),
        ]);
    }

    public function guardarVisao(Request $request): RedirectResponse
    {
        $visao = $request->validate([
            'visao' => ['required', 'string', 'in:grid,list'],
        ])['visao'];

        session(['preferencias.visualizacao.membros_equipa' => $visao]);

        return redirect()->route('admin.equipa.index');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request));

        $permitirLogin = $data['permitir_login'] ?? false;

        $data = $this->processarCargo($data);

        $membro = MembroEquipa::create($data);

        $this->processarAcesso($request, $membro, $permitirLogin);

        return $this->backWithSuccess('Membro da equipa criado com sucesso.');
    }

    public function update(Request $request, MembroEquipa $membrosEquipa): RedirectResponse
    {
        $data = $this->processarImagem($this->validated($request));

        $permitirLogin = $data['permitir_login'] ?? false;

        $data = $this->processarCargo($data);

        $membrosEquipa->update($data);

        $this->processarAcesso($request, $membrosEquipa, $permitirLogin);

        return $this->backWithSuccess('Membro da equipa atualizado com sucesso.');
    }

    public function destroy(MembroEquipa $membrosEquipa): RedirectResponse
    {
        $membrosEquipa->loadMissing('user');

        $membrosEquipa->user?->update(['ativo' => false]);

        $membrosEquipa->delete();

        return $this->backWithSuccess('Membro da equipa eliminado com sucesso.');
    }

    public function toggleAcesso(Request $request, MembroEquipa $membrosEquipa): RedirectResponse
    {
        if ($membrosEquipa->user === null) {
            $membrosEquipa->loadMissing('user');

            if (blank($membrosEquipa->email)) {
                return $this->backWithError('Defina primeiro o e-mail do membro para permitir o acesso ao painel.');
            }

            $utilizador = $this->criarUtilizador($membrosEquipa, $membrosEquipa->email);

            if ($utilizador === null) {
                return $this->backWithError('Já existe um utilizador com este e-mail. Não foi possível criar o acesso.');
            }

            return $this->backWithSuccess('Acesso ao painel criado. O membro deve usar "Esqueceu a senha" para definir a palavra-passe.');
        }

        $membrosEquipa->user->update(['ativo' => ! $membrosEquipa->user->ativo]);

        $membrosEquipa->load('user');

        return $this->backWithSuccess(
            $membrosEquipa->user->ativo
                ? 'Acesso ao painel reativado.'
                : 'Acesso ao painel desativado.'
        );
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function processarAcesso(Request $request, MembroEquipa $membro, bool $permitirLogin): void
    {
        if (! $permitirLogin) {
            $membro->loadMissing('user');

            if ($membro->user !== null && $membro->user->ativo) {
                $membro->user->update(['ativo' => false]);
            }

            return;
        }

        if (blank($membro->email)) {
            return;
        }

        $membro->loadMissing('user');

        if ($membro->user !== null) {
            $membro->user->update([
                'name' => $membro->nome,
                'email' => $membro->email,
                'ativo' => true,
            ]);

            return;
        }

        $this->criarUtilizador($membro, $membro->email);
    }

    private function criarUtilizador(MembroEquipa $membro, string $email): ?User
    {
        if (User::query()->where('email', $email)->exists()) {
            return null;
        }

        $utilizador = User::create([
            'name' => $membro->nome,
            'email' => $email,
            'password' => Str::password(16),
            'email_verified_at' => now(),
        ]);

        $membro->update(['user_id' => $utilizador->id]);

        return $utilizador;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function processarCargo(array $data): array
    {
        unset($data['permitir_login']);

        if (isset($data['cargo_id'])) {
            $cargo = Cargo::find($data['cargo_id']);

            if ($cargo !== null) {
                $data['cargo'] = $cargo->nome;
            }
        }

        return $data;
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
            'cargo_id' => ['required', 'integer', 'exists:cargos,id'],
            'bio' => ['nullable', 'string'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'telefone' => ['nullable', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::requiredIf(fn () => $request->boolean('permitir_login')),
                Rule::unique('users', 'email')->ignore($request->route('membros_equipa')?->user_id),
            ],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
            'permitir_login' => ['boolean'],
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
        $caminho = Storage::disk('public')->putFile($pasta, $ficheiro);

        if ($caminho === false) {
            throw new \RuntimeException('Não foi possível guardar a imagem.');
        }

        return $caminho;
    }
}
