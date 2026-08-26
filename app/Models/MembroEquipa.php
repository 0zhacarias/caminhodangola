<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property string $cargo
 * @property int|null $cargo_id
 * @property int|null $user_id
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
 * @property Cargo|null $cargoModelo
 * @property User|null $user
 */
#[Fillable(['nome', 'cargo', 'cargo_id', 'user_id', 'bio', 'foto', 'linkedin', 'instagram', 'telefone', 'email', 'ordem', 'ativo'])]
class MembroEquipa extends Model
{
    protected $table = 'membros_equipa';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }

    public function cargoModelo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class, 'cargo_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
