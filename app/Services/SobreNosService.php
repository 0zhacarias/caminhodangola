<?php

namespace App\Services;

use App\Models\SobreNos;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class SobreNosService
{
    /**
     * @return EloquentCollection<int, SobreNos>
     */
    public function listarAtivos(): EloquentCollection
    {
        return SobreNos::query()
            ->where('ativo', true)
            ->orderBy('ordem')
            ->orderByDesc('id')
            ->get();
    }
}
