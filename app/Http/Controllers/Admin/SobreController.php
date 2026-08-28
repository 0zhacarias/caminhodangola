<?php

namespace App\Http\Controllers\Admin;

use App\Models\PorqueAngola;
use App\Models\PorqueNos;
use App\Models\SobreNos;
use Inertia\Response;

class SobreController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/sobre/index', [
            'porquesNos' => PorqueNos::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
            'porquesAngola' => PorqueAngola::orderBy('ordem')->orderByDesc('id')->get(),
            'sobresNos' => SobreNos::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }
}
