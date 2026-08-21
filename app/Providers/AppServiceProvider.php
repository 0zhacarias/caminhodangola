<?php

namespace App\Providers;

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
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->preloadCachedModels();
    }

    /**
     * Garante que as classes dos models estão carregadas antes de o cache
     * desserializar coleções Eloquent (evita __PHP_Incomplete_Class).
     */
    protected function preloadCachedModels(): void
    {
        class_exists(EloquentCollection::class);
        class_exists(CategoriaPacote::class);
        class_exists(Configuracao::class);
        class_exists(Depoimento::class);
        class_exists(DiaItinerario::class);
        class_exists(Estatistica::class);
        class_exists(Galeria::class);
        class_exists(GaleriaPacote::class);
        class_exists(ItemMenu::class);
        class_exists(MembroEquipa::class);
        class_exists(Pacote::class);
        class_exists(PerguntaFrequente::class);
        class_exists(Reserva::class);
        class_exists(Seccao::class);
        class_exists(SlideHero::class);
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
