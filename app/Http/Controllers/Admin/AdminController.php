<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

abstract class AdminController extends Controller
{
    /**
     * @param  array<string, mixed>  $props
     */
    protected function render(string $component, array $props = []): Response
    {
        return Inertia::render($component, $props);
    }

    protected function backWithSuccess(string $message): RedirectResponse
    {
        Inertia::flash('toast', ['type' => 'success', 'message' => $message]);

        return back();
    }

    protected function backWithError(string $message): RedirectResponse
    {
        Inertia::flash('toast', ['type' => 'error', 'message' => $message]);

        return back();
    }
}
