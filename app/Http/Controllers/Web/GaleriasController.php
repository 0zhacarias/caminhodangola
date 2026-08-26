<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\GaleriaService;
use App\Services\SlideHeroService;
use Inertia\Inertia;
use Inertia\Response;

class GaleriasController extends Controller
{
    public function __construct(
        private readonly GaleriaService $galerias,
        private readonly SlideHeroService $slides,
    ) {}

    public function index(): Response
    {
        return Inertia::render('site/galeria', [
            'slides' => $this->slides->listarPorPagina('galeria'),
            'galerias' => $this->galerias->listarAtivas(),
        ]);
    }
}
