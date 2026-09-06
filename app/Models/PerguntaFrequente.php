<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $categoria_id
 * @property string $pergunta
 * @property string $resposta
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $categoria
 * @property CategoriaPerguntaFrequente|null $categoriaModelo
 */
#[Fillable(['categoria_id', 'pergunta', 'resposta', 'ordem', 'ativo'])]
class PerguntaFrequente extends Model
{
    protected $table = 'perguntas_frequentes';

    protected $appends = ['categoria'];

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }

    public function categoriaModelo(): BelongsTo
    {
        return $this->belongsTo(CategoriaPerguntaFrequente::class, 'categoria_id');
    }

    protected function categoria(): Attribute
    {
        return Attribute::get(
            fn (): string => $this->categoriaModelo?->nome ?? '',
        );
    }
}
