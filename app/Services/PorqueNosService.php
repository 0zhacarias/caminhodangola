<?php

namespace App\Services;

use App\Models\PorqueNos;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class PorqueNosService
{
    /**
     * @return EloquentCollection<int, PorqueNos>
     */
    public function listarAtivos(): EloquentCollection
    {
        return PorqueNos::query()
            ->where('ativo', true)
            ->orderBy('ordem')
            ->orderByDesc('id')
            ->get();
    }
}
