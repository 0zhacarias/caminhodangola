<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pacote_id
 * @property string|null $preco_base_por_pessoa
 * @property string|null $gasto_pessoal_estimado
 * @property int|null $deposito_percentagem
 * @property int|null $saldo_dias_antes_partida
 * @property array<int, string>|null $metodos_pagamento
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Pacote $pacote
 */
#[Fillable([
    'pacote_id',
    'preco_base_por_pessoa',
    'gasto_pessoal_estimado',
    'deposito_percentagem',
    'saldo_dias_antes_partida',
    'metodos_pagamento',
])]
class CondicaoPagamento extends Model
{
    protected $table = 'condicoes_pagamento';

    protected function casts(): array
    {
        return [
            'preco_base_por_pessoa' => 'decimal:2',
            'gasto_pessoal_estimado' => 'decimal:2',
            'deposito_percentagem' => 'integer',
            'saldo_dias_antes_partida' => 'integer',
            'metodos_pagamento' => 'array',
        ];
    }

    /**
     * @return BelongsTo<Pacote, $this>
     */
    public function pacote(): BelongsTo
    {
        return $this->belongsTo(Pacote::class);
    }
}
