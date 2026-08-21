<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PerguntaFrequenteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PerguntasFrequentesController extends Controller
{
    public function __construct(private readonly PerguntaFrequenteService $faqs) {}

    public function index(Request $request): JsonResponse
    {
        $categoria = $request->string('categoria')->toString();

        $faqs = $categoria !== ''
            ? $this->faqs->listarPorCategoria($categoria)
            : $this->faqs->listarAtivas();

        return response()->json(['data' => $faqs]);
    }
}
