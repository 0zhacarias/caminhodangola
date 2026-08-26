<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $tipo
 * @property string|null $titulo
 * @property string|null $descricao
 * @property string|null $icone
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['tipo', 'titulo', 'descricao', 'icone', 'ordem', 'ativo'])]
class SobreNos extends Model
{
    protected $table = 'sobres_nos';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
