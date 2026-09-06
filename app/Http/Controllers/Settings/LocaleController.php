<?php

namespace App\Http\Controllers\Settings;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LocaleController
{
    public function update(Request $request): RedirectResponse
    {
        $locale = $request->validate([
            'locale' => ['required', 'string', Rule::in(config('app.supported_locales'))],
        ])['locale'];

        if ($request->user()) {
            $request->user()->update(['locale' => $locale]);
        } else {
            $request->session()->put('locale', $locale);
        }
        app()->setLocale($locale);

        return back();
    }
}
