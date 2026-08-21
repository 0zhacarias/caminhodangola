<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property string $cargo
 * @property string|null $bio
 * @property string|null $foto
 * @property string|null $linkedin
 * @property string|null $instagram
 * @property string|null $telefone
 * @property string|null $email
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['nome', 'cargo', 'bio', 'foto', 'linkedin', 'instagram', 'telefone', 'email', 'ordem', 'ativo'])]
class MembroEquipa extends Model
{
    protected $table = 'membros_equipa';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
