<?php

namespace App\Http\Requests\Reservas;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'telefone' => ['nullable', 'string', 'max:255'],
            'pacote_id' => ['nullable', 'integer', 'exists:pacotes,id'],
            'data_pretendida' => ['nullable', 'date', 'after:today'],
            'numero_viajantes' => ['required', 'integer', 'min:1', 'max:255'],
            'mensagem' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
