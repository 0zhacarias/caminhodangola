<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\MembroEquipaService;
use Inertia\Inertia;
use Inertia\Response;

class MembrosEquipaController extends Controller
{
    public function __construct(private readonly MembroEquipaService $membros) {}

    public function index(): Response
    {
        return Inertia::render('site/equipa', [
            'membros' => $this->membros->listarAtivos(),
        ]);
    }
}
