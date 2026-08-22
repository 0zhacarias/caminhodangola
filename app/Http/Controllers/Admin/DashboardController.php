<?php

namespace App\Http\Controllers\Admin;

use App\Models\CategoriaPacote;
use App\Models\Configuracao;
use App\Models\Depoimento;
use App\Models\DiaItinerario;
use App\Models\Estatistica;
use App\Models\Galeria;
use App\Models\GaleriaPacote;
use App\Models\ItemMenu;
use App\Models\MembroEquipa;
use App\Models\Pacote;
use App\Models\PerguntaFrequente;
use App\Models\Reserva;
use App\Models\Seccao;
use App\Models\SlideHero;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends AdminController
{
    public function dashboard(): Response
    {
        return Inertia::render('admin/dashboard/index', [
            'totais' => [
                'pacotes' => Pacote::count(),
                'categorias_pacotes' => CategoriaPacote::count(),
                'galerias' => Galeria::count(),
                'galerias_pacotes' => GaleriaPacote::count(),
                'dias_itinerario' => DiaItinerario::count(),
                'depoimentos' => Depoimento::count(),
                'perguntas_frequentes' => PerguntaFrequente::count(),
                'membros_equipa' => MembroEquipa::count(),
                'slides_hero' => SlideHero::count(),
                'seccoes' => Seccao::count(),
                'estatisticas' => Estatistica::count(),
                'itens_menu' => ItemMenu::count(),
                'configuracoes' => Configuracao::count(),
                'reservas' => Reserva::count(),
            ],
        ]);
    }
}
