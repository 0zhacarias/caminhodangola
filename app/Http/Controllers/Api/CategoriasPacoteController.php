<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoriaPacoteService;
use Illuminate\Http\JsonResponse;

class CategoriasPacoteController extends Controller
{
    public function __construct(private readonly CategoriaPacoteService $categorias) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->categorias->listarAtivas()]);
    }

    public function show(string $slug): JsonResponse
    {
        $categoria = $this->categorias->obterPorSlug($slug);

        if ($categoria === null) {
            return response()->json(['message' => 'Categoria não encontrada.'], 404);
        }

        return response()->json(['data' => $categoria]);
    }
}
