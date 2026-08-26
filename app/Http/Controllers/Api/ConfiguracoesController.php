<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Configuracao;
use App\Services\ConfiguracaoService;
use Illuminate\Http\JsonResponse;

class ConfiguracoesController extends Controller
{
    public function __construct(private readonly ConfiguracaoService $configuracoes) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => Configuracao::query()->orderBy('chave')->get()]);
    }

    public function show(string $chave): JsonResponse
    {
        $valor = $this->configuracoes->obter($chave);

        if ($valor === null) {
            return response()->json(['message' => 'Configuração não encontrada.'], 404);
        }

        return response()->json(['data' => ['chave' => $chave, 'valor' => $valor]]);
    }
}
