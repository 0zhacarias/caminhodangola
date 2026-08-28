<?php

namespace App\Services;

use App\Models\PorqueAngola;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class PorqueAngolaService
{
    /**
     * @return EloquentCollection<int, PorqueAngola>
     */
    public function listarAtivos(): EloquentCollection
    {
        return PorqueAngola::query()
            ->where('ativo', true)
            ->orderBy('ordem')
            ->orderByDesc('id')
            ->get();
    }
}
