<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PacoteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PacotesController extends Controller
{
    public function __construct(private readonly PacoteService $pacotes) {}

    public function index(Request $request): JsonResponse
    {
        $categoriaId = $request->integer('categoria_id');

        $pacotes = $categoriaId > 0
            ? $this->pacotes->listarPorCategoria($categoriaId)
            : $this->pacotes->listarAtivos();

        return response()->json(['data' => $pacotes]);
    }

    public function show(string $slug): JsonResponse
    {
        $pacote = $this->pacotes->obterPorSlug($slug);

        if ($pacote === null) {
            return response()->json(['message' => 'Pacote não encontrado.'], 404);
        }

        return response()->json(['data' => $pacote]);
    }
}
