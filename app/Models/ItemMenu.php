<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $pai_id
 * @property string $rotulo
 * @property string $rota
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read ItemMenu|null $pai
 * @property-read Collection<int, ItemMenu> $filhos
 */
#[Fillable(['pai_id', 'rotulo', 'rota', 'ordem', 'ativo'])]
class ItemMenu extends Model
{
    protected $table = 'itens_menu';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<ItemMenu, $this>
     */
    public function pai(): BelongsTo
    {
        return $this->belongsTo(self::class, 'pai_id');
    }

    /**
     * @return HasMany<ItemMenu, $this>
     */
    public function filhos(): HasMany
    {
        return $this->hasMany(self::class, 'pai_id')->orderBy('ordem');
    }
}
