<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['nome', 'ordem', 'ativo'])]
class CategoriaPerguntaFrequente extends Model
{
    protected $table = 'categorias_perguntas_frequentes';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
