<?php

namespace App\Http\Controllers\Admin;

use App\Services\ConfiguracaoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class RodapeController extends AdminController
{
    /**
     * Chaves de texto livre do rodapé.
     *
     * @var array<int, string>
     */
    public const CHAVES = [
        'slogan',
        'endereco',
        'email_contato',
        'telefone_principal',
        'telefone_secundario',
        'horario_funcionamento',
    ];

    /**
     * Redes sociais do rodapé (chave guarda o URL, chave_ativo guarda a visibilidade).
     *
     * @var array<int, string>
     */
    public const REDES_SOCIAIS = [
        'instagram',
        'facebook',
        'twitter',
        'youtube',
    ];

    public function __construct(private readonly ConfiguracaoService $configuracoes) {}

    public function edit(): Response
    {
        $valores = $this->configuracoes->todas();

        $chaves = [
            ...self::CHAVES,
            ...array_merge(...array_map(
                static fn (string $rede): array => [$rede, $rede.'_ativo'],
                self::REDES_SOCIAIS,
            )),
        ];

        return $this->render('admin/rodape/index', [
            'rodape' => array_intersect_key($valores, array_flip($chaves)),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $dados = $request->validate([
            'slogan' => ['nullable', 'string', 'max:255'],
            'endereco' => ['nullable', 'string'],
            'email_contato' => ['nullable', 'email', 'max:255'],
            'telefone_principal' => ['nullable', 'string', 'max:255'],
            'telefone_secundario' => ['nullable', 'string', 'max:255'],
            'horario_funcionamento' => ['nullable', 'string', 'max:255'],
            ...$this->regrasSociais(),
        ]);

        $valores = [];

        foreach (self::CHAVES as $chave) {
            $valor = trim((string) ($dados[$chave] ?? ''));

            $valores[$chave] = $valor === '' ? null : $valor;
        }

        foreach (self::REDES_SOCIAIS as $rede) {
            $url = trim((string) ($dados[$rede] ?? ''));

            $valores[$rede] = $url === '' ? null : $url;
            $valores[$rede.'_ativo'] = $request->boolean($rede.'_ativo') ? '1' : '0';
        }

        $this->configuracoes->gravarMuitos($valores);

        return $this->backWithSuccess('Rodapé atualizado com sucesso.');
    }

    /**
     * @return array<string, array<int, string>>
     */
    private function regrasSociais(): array
    {
        $regras = [];

        foreach (self::REDES_SOCIAIS as $rede) {
            $regras[$rede] = ['nullable', 'url', 'max:2048'];
            $regras[$rede.'_ativo'] = ['boolean'];
        }

        return $regras;
    }
}
