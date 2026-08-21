<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SlideHeroService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SlidesHeroController extends Controller
{
    public function __construct(private readonly SlideHeroService $slides) {}

    public function index(Request $request): JsonResponse
    {
        $pagina = $request->string('pagina')->toString();

        $slides = $pagina !== ''
            ? $this->slides->listarPorPagina($pagina)
            : $this->slides->listarHome();

        return response()->json(['data' => $slides]);
    }
}
