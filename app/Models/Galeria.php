<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $imagem
 * @property string|null $alt
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['imagem', 'alt', 'ordem', 'ativo'])]
class Galeria extends Model
{
    protected $table = 'galerias';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
