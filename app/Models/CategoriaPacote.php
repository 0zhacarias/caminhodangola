<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property string $slug
 * @property string|null $descricao
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Pacote> $pacotes
 */
#[Fillable(['nome', 'slug', 'descricao', 'ordem', 'ativo'])]
class CategoriaPacote extends Model
{
    protected $table = 'categorias_pacotes';

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }

    /**
     * @return HasMany<Pacote, $this>
     */
    public function pacotes(): HasMany
    {
        return $this->hasMany(Pacote::class, 'categoria_id')->orderBy('ordem');
    }
}
