<?php

namespace App\Services;

use App\Models\TourPrivado;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class TourPrivadoService
{
    /**
     * @return EloquentCollection<int, TourPrivado>
     */
    public function listarAtivos(): EloquentCollection
    {
        return TourPrivado::query()
            ->where('ativo', true)
            ->orderBy('ordem')
            ->orderByDesc('id')
            ->get();
    }
}
