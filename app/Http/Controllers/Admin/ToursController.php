<?php

namespace App\Http\Controllers\Admin;

use App\Models\TourGrupo;
use App\Models\TourPrivado;
use Inertia\Response;

class ToursController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/tours/index', [
            'toursPrivados' => TourPrivado::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
            'toursGrupos' => TourGrupo::orderBy('tipo')->orderBy('ordem')->orderByDesc('id')->get(),
        ]);
    }
}
