<?php

namespace App\Http\Controllers\Admin;

use App\Models\CategoriaPacote;
use App\Models\GaleriaPacote;
use App\Models\Pacote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PacotesController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/pacotes/index', [
            'pacotes' => Pacote::with(['categoria:id,nome', 'galerias', 'diasItinerario:id,pacote_id,rotulo_dia,titulo,descricao,imagem,ordem'])->orderBy('ordem')->orderByDesc('id')->get(),
            'categorias' => $this->categoriasComoOpcoes(),
        ]);
    }

    public function create(): Response
    {
        return $this->render('admin/pacotes/form', [
            'pacote' => null,
            'categorias' => $this->categoriasComoOpcoes(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $pacote = Pacote::create($this->processarImagens($data));

        $this->guardarCondicoesPagamento($pacote, $data);

        $this->guardarGalerias($pacote, $data['galerias'] ?? [], 0);

        return $this->redirectToIndex('Pacote criado com sucesso.');
    }

    public function edit(Pacote $pacote): Response
    {
        $pacote->loadMissing(['galerias', 'condicaoPagamento']);

        return $this->render('admin/pacotes/form', [
            'pacote' => $pacote,
            'categorias' => $this->categoriasComoOpcoes(),
        ]);
    }

    public function update(Request $request, Pacote $pacote): RedirectResponse
    {
        $data = $this->validated($request, $pacote);

        $pacote->update($this->processarImagens($data));

        $this->guardarCondicoesPagamento($pacote, $data);

        $this->guardarGalerias($pacote, $data['galerias'] ?? [], $pacote->galerias()->count());

        return $this->redirectToIndex('Pacote atualizado com sucesso.');
    }

    public function destroy(Pacote $pacote): RedirectResponse
    {
        $pacote->delete();

        return $this->backWithSuccess('Pacote eliminado com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Pacote $pacote = null): array
    {
        $dados = $request->all();

        foreach (['imagem', 'imagem_og'] as $campo) {
            if (! array_key_exists($campo, $dados)) {
                continue;
            }

            if ($dados[$campo] instanceof UploadedFile) {
                continue;
            }

            if ($dados[$campo] === '' || $dados[$campo] === null) {
                $dados[$campo] = null;

                continue;
            }

            unset($dados[$campo]);
        }

        $request->replace($dados);

        $data = $request->validate([
            'categoria_pacote_id' => ['nullable', 'integer', 'exists:categorias_pacotes,id'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('pacotes', 'slug')->ignore($pacote?->id)],
            'titulo' => ['required', 'string', 'max:255'],
            'subtitulo' => ['nullable', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'duracao' => ['nullable', 'string', 'max:255'],
            'imagem' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'galerias' => ['nullable', 'array', 'max:20'],
            'galerias.*' => ['image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'preco_eur' => ['nullable', 'numeric', 'min:0'],
            'rotulo_preco' => ['nullable', 'string', 'max:255'],
            'preco_pacote_fotos_eur' => ['nullable', 'numeric', 'min:0'],
            'avaliacao' => ['nullable', 'integer', 'between:1,5'],
            'incluidos' => ['nullable', 'string'],
            'excluidos' => ['nullable', 'string'],
            'o_que_levar' => ['nullable', 'string'],
            'observacoes_importantes' => ['nullable', 'string'],
            'ordem' => ['integer', 'min:0'],
            'ativo' => ['boolean'],
            'meta_titulo' => ['nullable', 'string', 'max:255'],
            'meta_descricao' => ['nullable', 'string'],
            'imagem_og' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'preco_base_por_pessoa' => ['nullable', 'numeric', 'min:0'],
            'gasto_pessoal_estimado' => ['nullable', 'numeric', 'min:0'],
            'deposito_percentagem' => ['nullable', 'integer', 'between:0,100'],
            'saldo_dias_antes_partida' => ['nullable', 'integer', 'min:0'],
            'metodos_pagamento' => ['nullable', 'string'],
        ]);

        foreach (['incluidos', 'excluidos', 'o_que_levar', 'observacoes_importantes', 'metodos_pagamento'] as $campo) {
            $texto = trim((string) ($data[$campo] ?? ''));

            if ($texto === '') {
                $data[$campo] = null;

                continue;
            }

            $linhas = preg_split('/\r\n|\r|\n/', $texto) ?: [];

            $data[$campo] = array_values(array_filter(array_map('trim', $linhas)));
        }

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function processarImagens(array $data): array
    {
        foreach (['imagem', 'imagem_og'] as $campo) {
            if (isset($data[$campo]) && $data[$campo] instanceof UploadedFile) {
                $data[$campo] = $this->guardarImagem($data[$campo], 'pacotes');
            }
        }

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function guardarCondicoesPagamento(Pacote $pacote, array $data): void
    {
        $campos = [
            'preco_base_por_pessoa' => $data['preco_base_por_pessoa'] ?? null,
            'gasto_pessoal_estimado' => $data['gasto_pessoal_estimado'] ?? null,
            'deposito_percentagem' => $data['deposito_percentagem'] ?? null,
            'saldo_dias_antes_partida' => $data['saldo_dias_antes_partida'] ?? null,
            'metodos_pagamento' => $data['metodos_pagamento'] ?? null,
        ];

        $estaVazio = collect($campos)->every(
            static fn (mixed $valor): bool => $valor === null || $valor === [] || $valor === '',
        );

        if ($estaVazio) {
            $pacote->condicaoPagamento()->delete();

            return;
        }

        $pacote->condicaoPagamento()->updateOrCreate(
            ['pacote_id' => $pacote->id],
            $campos,
        );
    }

    private function guardarImagem(UploadedFile $ficheiro, string $pasta): string
    {
        $caminho = Storage::disk('public')->putFile($pasta, $ficheiro);

        if ($caminho === false) {
            throw new \RuntimeException('Não foi possível guardar a imagem.');
        }

        return $caminho;
    }

    /**
     * @param  array<int, mixed>  $ficheiros
     */
    private function guardarGalerias(Pacote $pacote, array $ficheiros, int $ordemInicial): void
    {
        foreach ($ficheiros as $indice => $ficheiro) {
            if (! $ficheiro instanceof UploadedFile) {
                continue;
            }

            GaleriaPacote::create([
                'pacote_id' => $pacote->id,
                'imagem' => $this->guardarImagem($ficheiro, 'pacotes/galerias'),
                'ordem' => $ordemInicial + $indice,
            ]);
        }
    }

    private function redirectToIndex(string $message): RedirectResponse
    {
        Inertia::flash('toast', ['type' => 'success', 'message' => $message]);

        return redirect()->route('admin.pacotes.index');
    }

    /**
     * @return array<int, array{value: int, label: string}>
     */
    private function categoriasComoOpcoes(): array
    {
        return CategoriaPacote::orderBy('nome')->get()
            ->map(static fn (CategoriaPacote $categoria): array => [
                'value' => $categoria->id,
                'label' => $categoria->nome,
            ])
            ->values()
            ->all();
    }
}
