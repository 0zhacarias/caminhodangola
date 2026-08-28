<?php

namespace App\Http\Controllers\Admin;

use App\Models\Cargo;
use App\Models\MembroEquipa;
use Inertia\Response;

class EquipaController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/equipa/index', [
            'membros' => MembroEquipa::query()
                ->with('user')
                ->orderBy('ordem')
                ->orderByDesc('id')
                ->get(),
            'cargos' => Cargo::orderBy('nome')->get(),
            'visao' => session('preferencias.visualizacao.membros_equipa', 'grid'),
        ]);
    }
}
