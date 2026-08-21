<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $rotulo
 * @property string $valor
 * @property string|null $icone
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['rotulo', 'valor', 'icone', 'ordem', 'ativo'])]
class Estatistica extends Model
{
    protected $table = 'estatisticas';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
