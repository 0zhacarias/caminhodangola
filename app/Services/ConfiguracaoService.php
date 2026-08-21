<?php

namespace App\Services;

use App\Models\Configuracao;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
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
     * @return EloquentCollection<int, Configuracao>
     */
    public function todas(): EloquentCollection
    {
        return Cache::remember('configuracoes', self::TTL, fn (): EloquentCollection => Configuracao::query()->orderBy('chave')->get());
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

    public function remover(Configuracao $configuracao): void
    {
        Cache::forget(['configuracoes', 'configuracao.'.$configuracao->chave]);

        $configuracao->delete();
    }
}
