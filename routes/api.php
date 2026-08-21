<?php

use App\Http\Controllers\Api\CategoriasPacoteController;
use App\Http\Controllers\Api\ConfiguracoesController;
use App\Http\Controllers\Api\DepoimentosController;
use App\Http\Controllers\Api\EstatisticasController;
use App\Http\Controllers\Api\GaleriasController;
use App\Http\Controllers\Api\MembrosEquipaController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\PacotesController;
use App\Http\Controllers\Api\PerguntasFrequentesController;
use App\Http\Controllers\Api\ReservasController;
use App\Http\Controllers\Api\SeccoesController;
use App\Http\Controllers\Api\SlidesHeroController;
use Illuminate\Support\Facades\Route;

Route::get('configuracoes', [ConfiguracoesController::class, 'index'])->name('api.configuracoes.index');
Route::get('configuracoes/{chave}', [ConfiguracoesController::class, 'show'])->name('api.configuracoes.show');

Route::get('menu', [MenuController::class, 'index'])->name('api.menu.index');

Route::get('pacotes', [PacotesController::class, 'index'])->name('api.pacotes.index');
Route::get('pacotes/{slug}', [PacotesController::class, 'show'])->name('api.pacotes.show');

Route::get('categorias-pacotes', [CategoriasPacoteController::class, 'index'])->name('api.categorias-pacotes.index');
Route::get('categorias-pacotes/{slug}', [CategoriasPacoteController::class, 'show'])->name('api.categorias-pacotes.show');

Route::get('galerias', [GaleriasController::class, 'index'])->name('api.galerias.index');
Route::get('galerias/previa', [GaleriasController::class, 'previa'])->name('api.galerias.previa');

Route::get('depoimentos', [DepoimentosController::class, 'index'])->name('api.depoimentos.index');
Route::get('depoimentos/destaques', [DepoimentosController::class, 'destaques'])->name('api.depoimentos.destaques');

Route::get('perguntas-frequentes', [PerguntasFrequentesController::class, 'index'])->name('api.perguntas-frequentes.index');

Route::get('membros-equipa', [MembrosEquipaController::class, 'index'])->name('api.membros-equipa.index');

Route::get('slides-hero', [SlidesHeroController::class, 'index'])->name('api.slides-hero.index');

Route::get('seccoes', [SeccoesController::class, 'index'])->name('api.seccoes.index');
Route::get('seccoes/{slug}', [SeccoesController::class, 'show'])->name('api.seccoes.show');

Route::get('estatisticas', [EstatisticasController::class, 'index'])->name('api.estatisticas.index');

Route::post('reservas', [ReservasController::class, 'store'])->name('api.reservas.store');
