<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\SeccaoService;
use Inertia\Inertia;
use Inertia\Response;

class SobreController extends Controller
{
    public function __construct(private readonly SeccaoService $seccoes) {}

    public function index(): Response
    {
        return Inertia::render('site/sobre', [
            'seccoes' => $this->seccoes->listarAtivas(),
        ]);
    }
}
