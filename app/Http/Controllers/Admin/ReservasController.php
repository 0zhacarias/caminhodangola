<?php

namespace App\Http\Controllers\Admin;

use App\Models\Reserva;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ReservasController extends AdminController
{
    public function index(): Response
    {
        return $this->render('admin/reservas/index', [
            'reservas' => Reserva::with('pacote:id,titulo')->orderByDesc('id')->get(),
        ]);
    }

    public function update(Request $request, Reserva $reserva): RedirectResponse
    {
        $reserva->update($this->validated($request));

        return $this->backWithSuccess('Reserva atualizada com sucesso.');
    }

    public function destroy(Reserva $reserva): RedirectResponse
    {
        $reserva->delete();

        return $this->backWithSuccess('Reserva eliminada com sucesso.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'estado' => ['required', 'string', Rule::in(['new', 'confirmed', 'cancelled', 'completed'])],
        ]);
    }
}
