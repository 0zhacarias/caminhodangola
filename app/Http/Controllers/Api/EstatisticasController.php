<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\EstatisticaService;
use Illuminate\Http\JsonResponse;

class EstatisticasController extends Controller
{
    public function __construct(private readonly EstatisticaService $estatisticas) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->estatisticas->listarAtivas()]);
    }
}
