<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\GaleriaService;
use Inertia\Inertia;
use Inertia\Response;

class GaleriasController extends Controller
{
    public function __construct(private readonly GaleriaService $galerias) {}

    public function index(): Response
    {
        return Inertia::render('site/galeria', [
            'galerias' => $this->galerias->listarAtivas(),
        ]);
    }
}
