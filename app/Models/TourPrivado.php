<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $tipo
 * @property string $titulo
 * @property string|null $descricao
 * @property string|null $icone
 * @property string|null $link
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['tipo', 'titulo', 'descricao', 'icone', 'link', 'ordem', 'ativo'])]
class TourPrivado extends Model
{
    protected $table = 'tours_privados';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
