<?php

use App\Http\Controllers\Admin\CargosController;
use App\Http\Controllers\Admin\CategoriasPacotesController;
use App\Http\Controllers\Admin\CategoriasPerguntasFrequentesController;
use App\Http\Controllers\Admin\ConfiguracoesController;
use App\Http\Controllers\Admin\DepoimentosController;
use App\Http\Controllers\Admin\DiasItinerarioController;
use App\Http\Controllers\Admin\EstatisticasController;
use App\Http\Controllers\Admin\GaleriasController;
use App\Http\Controllers\Admin\GaleriasPacotesController;
use App\Http\Controllers\Admin\ItensMenuController;
use App\Http\Controllers\Admin\MembrosEquipaController;
use App\Http\Controllers\Admin\PacotesController;
use App\Http\Controllers\Admin\PerguntasFrequentesController;
use App\Http\Controllers\Admin\PorquesNosController;
use App\Http\Controllers\Admin\ReservasController;
use App\Http\Controllers\Admin\RodapeController;
use App\Http\Controllers\Admin\SeccoesController;
use App\Http\Controllers\Admin\SlidesHeroController;
use App\Http\Controllers\Admin\SobresNosController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', fn () => redirect()->route('dashboard'))->name('dashboard');

    Route::get('', fn () => redirect()->route('admin.dashboard'))->name('home');

    Route::resource('categorias-pacotes', CategoriasPacotesController::class)->except(['show']);
    Route::resource('pacotes', PacotesController::class)->except(['show']);
    Route::resource('dias-itinerario', DiasItinerarioController::class)->except(['show']);
    Route::resource('galerias-pacotes', GaleriasPacotesController::class)->except(['show']);
    Route::resource('galerias', GaleriasController::class)->except(['show']);
    Route::resource('depoimentos', DepoimentosController::class)->except(['show']);
    Route::resource('perguntas-frequentes', PerguntasFrequentesController::class)->except(['show']);
    Route::resource('categorias-perguntas-frequentes', CategoriasPerguntasFrequentesController::class)->except(['show']);
    Route::resource('porques-nos', PorquesNosController::class)->except(['show']);
    Route::resource('sobres-nos', SobresNosController::class)->except(['show']);
    Route::resource('membros-equipa', MembrosEquipaController::class)->except(['show']);
    Route::post('membros-equipa/visao', [MembrosEquipaController::class, 'guardarVisao'])->name('membros-equipa.visao');
    Route::post('membros-equipa/{membrosEquipa}/toggle-acesso', [MembrosEquipaController::class, 'toggleAcesso'])->name('membros-equipa.toggle-acesso');
    Route::resource('cargos', CargosController::class)->except(['show']);
    Route::resource('slides-hero', SlidesHeroController::class)->except(['show']);
    Route::resource('seccoes', SeccoesController::class)->except(['show'])->parameters(['seccoes' => 'seccao']);
    Route::resource('estatisticas', EstatisticasController::class)->except(['show']);
    Route::resource('itens-menu', ItensMenuController::class)->except(['show']);
    Route::resource('configuracoes', ConfiguracoesController::class)->except(['show'])->parameters(['configuracoes' => 'configuracao']);
    Route::get('rodape', [RodapeController::class, 'edit'])->name('rodape.edit');
    Route::put('rodape', [RodapeController::class, 'update'])->name('rodape.update');
    Route::resource('reservas', ReservasController::class)->only(['index', 'update', 'destroy']);
});
