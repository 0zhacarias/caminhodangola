<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DepoimentoService;
use Illuminate\Http\JsonResponse;

class DepoimentosController extends Controller
{
    public function __construct(private readonly DepoimentoService $depoimentos) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->depoimentos->listar()]);
    }

    public function destaques(): JsonResponse
    {
        return response()->json(['data' => $this->depoimentos->listarDestaques()]);
    }
}
