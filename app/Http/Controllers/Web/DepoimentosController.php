<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\DepoimentoService;
use App\Services\SlideHeroService;
use Inertia\Inertia;
use Inertia\Response;

class DepoimentosController extends Controller
{
    public function __construct(
        private readonly DepoimentoService $depoimentos,
        private readonly SlideHeroService $slides,
    ) {}

    public function index(): Response
    {
        return Inertia::render('site/avaliacoes', [
            'slides' => $this->slides->listarPorPagina('avaliacoes'),
            'depoimentos' => $this->depoimentos->listar(),
        ]);
    }
}
