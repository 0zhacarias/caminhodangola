<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\PerguntaFrequenteService;
use Inertia\Inertia;
use Inertia\Response;

class PerguntasFrequentesController extends Controller
{
    public function __construct(private readonly PerguntaFrequenteService $faqs) {}

    public function index(): Response
    {
        return Inertia::render('site/perguntas-frequentes', [
            'faqs' => $this->faqs->listarAtivas(),
        ]);
    }
}
