<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $pagina
 * @property string|null $imagem
 * @property string|null $titulo
 * @property string|null $subtitulo
 * @property string|null $texto
 * @property string|null $botao_rotulo
 * @property string|null $botao_url
 * @property int $ordem
 * @property bool $ativo
 * @property bool $mostrar_depoimentos
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['pagina', 'imagem', 'titulo', 'subtitulo', 'texto', 'botao_rotulo', 'botao_url', 'ordem', 'ativo', 'mostrar_depoimentos'])]
class SlideHero extends Model
{
    public const PAGINAS = [
        'home' => 'Home',
        'avaliacoes' => 'Avaliações',
        'private-tours' => 'Private Tours',
        'group-tours' => 'Group Tours',
        'sobre' => 'Sobre Nós',
        'galeria' => 'Galeria',
    ];

    protected $table = 'slides_hero';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
            'mostrar_depoimentos' => 'boolean',
        ];
    }
}
