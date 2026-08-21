<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\GaleriaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GaleriasController extends Controller
{
    public function __construct(private readonly GaleriaService $galerias) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->galerias->listarAtivas()]);
    }

    public function previa(Request $request): JsonResponse
    {
        $limite = $request->integer('limite', 15);

        return response()->json(['data' => $this->galerias->previa($limite)]);
    }
}
