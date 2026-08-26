<?php

namespace App\Services;

use App\Models\Configuracao;
use Illuminate\Support\Facades\Cache;

final class ConfiguracaoService
{
    private const TTL = 3600;

    public function obter(string $chave, ?string $padrao = null): ?string
    {
        /** @var string|null $valor */
        $valor = Cache::remember('configuracao.'.$chave, self::TTL, fn (): ?string => Configuracao::query()->where('chave', $chave)->value('valor'));

        return $valor ?? $padrao;
    }

    /**
     * @return array<string, string|null>
     */
    public function todas(): array
    {
        /** @var array<string, string|null> $valores */
        $valores = Cache::remember('configuracoes', self::TTL, fn (): array => Configuracao::query()->orderBy('chave')->pluck('valor', 'chave')->all());

        return $valores;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Configuracao
    {
        $configuracao = Configuracao::create($dados);

        Cache::forget(['configuracoes', 'configuracao.'.$configuracao->chave]);

        return $configuracao;
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(Configuracao $configuracao, array $dados): Configuracao
    {
        $configuracao->update($dados);

        Cache::forget(['configuracoes', 'configuracao.'.$configuracao->chave]);

        return $configuracao;
    }

    /**
     * @param  array<string, string|null>  $valores
     */
    public function gravarMuitos(array $valores): void
    {
        foreach ($valores as $chave => $valor) {
            Configuracao::updateOrCreate(['chave' => $chave], ['valor' => $valor]);
        }

        Cache::forget('configuracoes');

        foreach (array_keys($valores) as $chave) {
            Cache::forget('configuracao.'.$chave);
        }
    }

    public function remover(Configuracao $configuracao): void
    {
        Cache::forget(['configuracoes', 'configuracao.'.$configuracao->chave]);

        $configuracao->delete();
    }
}
