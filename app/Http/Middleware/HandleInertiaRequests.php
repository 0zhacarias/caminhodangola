<?php

namespace App\Http\Middleware;

use App\Services\ConfiguracaoService;
use App\Services\EstatisticaService;
use App\Services\PorqueAngolaService;
use App\Services\PorqueNosService;
use App\Services\SobreNosService;
use App\Services\TourPrivadoService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'configuracoes' => fn (): array => $request->routeIs('admin.*')
                ? []
                : app(ConfiguracaoService::class)->todas(),
            'porques_nos' => fn (): array => $request->routeIs('admin.*')
                ? []
                : app(PorqueNosService::class)->listarAtivos()->all(),
            'porques_angola' => fn (): array => $request->routeIs('admin.*')
                ? []
                : app(PorqueAngolaService::class)->listarAtivos()->all(),
            'sobres_nos' => fn (): array => $request->routeIs('admin.*')
                ? []
                : app(SobreNosService::class)->listarAtivos()->all(),
            'tours_privados' => fn (): array => $request->routeIs('admin.*')
                ? []
                : app(TourPrivadoService::class)->listarAtivos()->all(),
            'estatisticas' => fn (): array => $request->routeIs('admin.*')
                ? []
                : app(EstatisticaService::class)->listarAtivas()->all(),
        ];
    }
}
