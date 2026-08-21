<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property string $email
 * @property string|null $telefone
 * @property int|null $pacote_id
 * @property Carbon|null $data_pretendida
 * @property int $numero_viajantes
 * @property string|null $mensagem
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Pacote|null $pacote
 */
#[Fillable(['nome', 'email', 'telefone', 'pacote_id', 'data_pretendida', 'numero_viajantes', 'mensagem', 'estado'])]
class Reserva extends Model
{
    protected $table = 'reservas';

    protected function casts(): array
    {
        return [
            'data_pretendida' => 'date',
            'numero_viajantes' => 'integer',
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
