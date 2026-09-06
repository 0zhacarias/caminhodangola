<?php

namespace App\Services;

use App\Models\TourGrupo;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class TourGrupoService
{
    /**
     * @return EloquentCollection<int, TourGrupo>
     */
    public function listarAtivos(): EloquentCollection
    {
        return TourGrupo::query()
            ->where('ativo', true)
            ->orderBy('ordem')
            ->orderByDesc('id')
            ->get();
    }
}
