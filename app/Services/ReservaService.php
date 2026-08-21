<?php

namespace App\Services;

use App\Models\Reserva;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class ReservaService
{
    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): Reserva
    {
        return Reserva::create([...$dados, 'estado' => 'new']);
    }

    /**
     * @return EloquentCollection<int, Reserva>
     */
    public function listar(): EloquentCollection
    {
        return Reserva::query()->with('pacote')->latest()->get();
    }

    public function atualizarEstado(Reserva $reserva, string $estado): Reserva
    {
        $reserva->update(['estado' => $estado]);

        return $reserva;
    }

    public function remover(Reserva $reserva): void
    {
        $reserva->delete();
    }
}
