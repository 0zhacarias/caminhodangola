<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $slug
 * @property string|null $titulo
 * @property string|null $sobretitulo
 * @property string|null $introducao
 * @property array<string, mixed>|null $conteudo
 * @property string|null $imagem
 * @property int $ordem
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['slug', 'titulo', 'sobretitulo', 'introducao', 'conteudo', 'imagem', 'ordem', 'ativo'])]
class Seccao extends Model
{
    protected $table = 'seccoes';

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected function casts(): array
    {
        return [
            'conteudo' => 'array',
            'ativo' => 'boolean',
        ];
    }
}
