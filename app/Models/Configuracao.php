<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $chave
 * @property string|null $valor
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['chave', 'valor'])]
class Configuracao extends Model
{
    protected $table = 'configuracoes';
}
