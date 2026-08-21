<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SeccaoService;
use Illuminate\Http\JsonResponse;

class SeccoesController extends Controller
{
    public function __construct(private readonly SeccaoService $seccoes) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->seccoes->listarAtivas()]);
    }

    public function show(string $slug): JsonResponse
    {
        $seccao = $this->seccoes->obterPorSlug($slug);

        if ($seccao === null) {
            return response()->json(['message' => 'Secção não encontrada.'], 404);
        }

        return response()->json(['data' => $seccao]);
    }
}
