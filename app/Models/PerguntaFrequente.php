<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $categoria
 * @property string $pergunta
 * @property string $resposta
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['categoria', 'pergunta', 'resposta', 'ordem', 'ativo'])]
class PerguntaFrequente extends Model
{
    protected $table = 'perguntas_frequentes';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
