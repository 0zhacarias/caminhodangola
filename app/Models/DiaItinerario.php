<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $pacote_id
 * @property string $rotulo_dia
 * @property string $titulo
 * @property string $descricao
 * @property string|null $imagem
 * @property int $ordem
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Pacote $pacote
 */
#[Fillable(['pacote_id', 'rotulo_dia', 'titulo', 'descricao', 'imagem', 'ordem'])]
class DiaItinerario extends Model
{
    protected $table = 'dias_itinerario';

    /**
     * @return BelongsTo<Pacote, $this>
     */
    public function pacote(): BelongsTo
    {
        return $this->belongsTo(Pacote::class);
    }
}
