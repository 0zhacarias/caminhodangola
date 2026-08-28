<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $titulo
 * @property string $descricao
 * @property string|null $imagem
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['titulo', 'descricao', 'imagem', 'ordem', 'ativo'])]
class PorqueAngola extends Model
{
    protected $table = 'porques_angola';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
