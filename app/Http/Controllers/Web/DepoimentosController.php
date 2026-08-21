<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\DepoimentoService;
use Inertia\Inertia;
use Inertia\Response;

class DepoimentosController extends Controller
{
    public function __construct(private readonly DepoimentoService $depoimentos) {}

    public function index(): Response
    {
        return Inertia::render('site/avaliacoes', [
            'depoimentos' => $this->depoimentos->listar(),
        ]);
    }
}
