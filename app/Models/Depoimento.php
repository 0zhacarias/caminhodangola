<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property string|null $localizacao
 * @property string $mensagem
 * @property int $avaliacao
 * @property bool $destaque
 * @property int $ordem
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['nome', 'localizacao', 'mensagem', 'avaliacao', 'destaque', 'ordem'])]
class Depoimento extends Model
{
    protected $table = 'depoimentos';

    protected function casts(): array
    {
        return [
            'avaliacao' => 'integer',
            'destaque' => 'boolean',
        ];
    }
}
