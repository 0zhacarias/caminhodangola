<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\CategoriaPacoteService;
use App\Services\PacoteService;
use App\Services\PerguntaFrequenteService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PacotesController extends Controller
{
    public function __construct(
        private readonly PacoteService $pacotes,
        private readonly CategoriaPacoteService $categorias,
        private readonly PerguntaFrequenteService $faqs,
    ) {}

    public function index(): Response
    {
        return Inertia::render('site/pacotes/index', [
            'pacotes' => $this->pacotes->listarAtivos(),
            'categorias' => $this->categorias->listarAtivas(),
        ]);
    }

    public function show(string $slug): Response|RedirectResponse
    {
        $pacote = $this->pacotes->obterPorSlug($slug);

        if ($pacote === null) {
            return redirect()->route('pacotes.index');
        }

        return Inertia::render('site/pacotes/show', [
            'pacote' => $pacote,
            'faqs' => $this->faqs->listarAtivas(),
        ]);
    }
}
