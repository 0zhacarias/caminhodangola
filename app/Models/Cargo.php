<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['nome', 'ativo'])]
class Cargo extends Model
{
    protected $table = 'cargos';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
