<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\DepoimentoService;
use App\Services\EstatisticaService;
use App\Services\GaleriaService;
use App\Services\MembroEquipaService;
use App\Services\PacoteService;
use App\Services\SeccaoService;
use App\Services\SlideHeroService;
use App\Services\PerguntaFrequenteService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly SlideHeroService $slides,
        private readonly SeccaoService $seccoes,
        private readonly PacoteService $pacotes,
        private readonly DepoimentoService $depoimentos,
        private readonly EstatisticaService $estatisticas,
        private readonly GaleriaService $galerias,
        private readonly MembroEquipaService $membros,
        private readonly PerguntaFrequenteService $faqs,
    ) {}

    public function index(): Response
    {
        return Inertia::render('site/home', [
            'slides' => $this->slides->listarHome(),
            'seccoes' => $this->seccoes->listarAtivas(),
            'pacotes' => $this->pacotes->listarAtivos(),
            'depoimentos' => $this->depoimentos->listarDestaques(),
            'estatisticas' => $this->estatisticas->listarAtivas(),
            'galeria' => $this->galerias->previa(),
            'membros' => $this->membros->listarAtivos(),
            'faqs' => $this->faqs->listarAtivas(),
        ]);
    }

    public function privateTours(): Response
    {
        return Inertia::render('site/private-tours', [
            'slides' => $this->slides->listarPorPagina('private-tours'),
            'depoimentos' => $this->depoimentos->listarDestaques(),
        ]);
    }

    public function groupTours(): Response
    {
        return Inertia::render('site/group-tours', [
            'slides' => $this->slides->listarPorPagina('group-tours'),
            'depoimentos' => $this->depoimentos->listarDestaques(),
        ]);
    }
}
