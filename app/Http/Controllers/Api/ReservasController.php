<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservas\StoreReservaRequest;
use App\Services\ReservaService;
use Illuminate\Http\JsonResponse;

class ReservasController extends Controller
{
    public function __construct(private readonly ReservaService $reservas) {}

    public function store(StoreReservaRequest $request): JsonResponse
    {
        $reserva = $this->reservas->criar($request->validated());

        return response()->json(['data' => $reserva], 201);
    }
}
