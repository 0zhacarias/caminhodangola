<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $pagina
 * @property string $imagem
 * @property string $titulo
 * @property string|null $subtitulo
 * @property string|null $texto
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['pagina', 'imagem', 'titulo', 'subtitulo', 'texto', 'ordem', 'ativo'])]
class SlideHero extends Model
{
    protected $table = 'slides_hero';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }
}
