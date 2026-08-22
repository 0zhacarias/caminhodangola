<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Web\DepoimentosController;
use App\Http\Controllers\Web\GaleriasController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\MembrosEquipaController;
use App\Http\Controllers\Web\PacotesController;
use App\Http\Controllers\Web\PerguntasFrequentesController;
use App\Http\Controllers\Web\ReservasController;
use App\Http\Controllers\Web\SobreController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('galeria', [GaleriasController::class, 'index'])->name('galeria');
Route::get('avaliacoes', [DepoimentosController::class, 'index'])->name('avaliacoes');
Route::get('perguntas-frequentes', [PerguntasFrequentesController::class, 'index'])->name('perguntas-frequentes');
Route::get('pacotes', [PacotesController::class, 'index'])->name('pacotes.index');
Route::get('pacotes/{slug}', [PacotesController::class, 'show'])->name('pacotes.show');
Route::get('equipa', [MembrosEquipaController::class, 'index'])->name('equipa');
Route::get('sobre', [SobreController::class, 'index'])->name('sobre');
Route::get('reservar', [ReservasController::class, 'create'])->name('reservar');
Route::post('reservas', [ReservasController::class, 'store'])->name('reservas.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
