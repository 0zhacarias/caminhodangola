<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $titulo
 * @property string|null $descricao
 * @property string $video
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['titulo', 'descricao', 'video', 'ordem', 'ativo'])]
class VideoDepoimento extends Model
{
    protected $table = 'videos_depoimentos';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
