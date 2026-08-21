<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservas\StoreReservaRequest;
use App\Services\PacoteService;
use App\Services\ReservaService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReservasController extends Controller
{
    public function __construct(
        private readonly ReservaService $reservas,
        private readonly PacoteService $pacotes,
    ) {}

    public function create(): Response
    {
        return Inertia::render('site/reservas', [
            'pacotes' => $this->pacotes->listarAtivos(),
        ]);
    }

    public function store(StoreReservaRequest $request): RedirectResponse
    {
        $this->reservas->criar($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Reserva enviada com sucesso! Entraremos em contacto brevemente.')]);

        return redirect()->route('reservar');
    }
}
