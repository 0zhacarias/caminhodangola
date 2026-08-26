<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;

class EnsureUserIsActive
{
    /**
     * Bloqueia o login de utilizadores desativados.
     *
     * @throws ValidationException
     */
    public function handle(Request $request, Closure $next)
    {
        $utilizador = User::query()
            ->where(Fortify::username(), Str::lower((string) $request->input(Fortify::username())))
            ->first();

        if ($utilizador !== null && ! $utilizador->ativo) {
            throw ValidationException::withMessages([
                Fortify::username() => ['Esta conta está desativada. Contacte o administrador.'],
            ]);
        }

        return $next($request);
    }
}
