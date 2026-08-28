<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $categoria_pacote_id
 * @property string $slug
 * @property string $titulo
 * @property string|null $subtitulo
 * @property string|null $descricao
 * @property string|null $duracao
 * @property string|null $imagem
 * @property string|null $imagem_slide
 * @property string|null $preco_eur
 * @property string|null $rotulo_preco
 * @property string|null $preco_pacote_fotos_eur
 * @property int|null $avaliacao
 * @property array<int, string>|null $incluidos
 * @property array<int, string>|null $excluidos
 * @property array<int, string>|null $o_que_levar
 * @property array<int, string>|null $observacoes_importantes
 * @property int $ordem
 * @property bool $ativo
 * @property string|null $meta_titulo
 * @property string|null $meta_descricao
 * @property string|null $imagem_og
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read CategoriaPacote|null $categoria
 * @property-read CondicaoPagamento|null $condicaoPagamento
 * @property-read Collection<int, DiaItinerario> $diasItinerario
 * @property-read Collection<int, GaleriaPacote> $galerias
 * @property-read Collection<int, Reserva> $reservas
 */
#[Fillable([
    'categoria_pacote_id',
    'slug',
    'titulo',
    'subtitulo',
    'descricao',
    'duracao',
    'imagem',
    'imagem_slide',
    'preco_eur',
    'rotulo_preco',
    'preco_pacote_fotos_eur',
    'avaliacao',
    'incluidos',
    'excluidos',
    'o_que_levar',
    'observacoes_importantes',
    'ordem',
    'ativo',
    'meta_titulo',
    'meta_descricao',
    'imagem_og',
])]
class Pacote extends Model
{
    protected $table = 'pacotes';

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected function casts(): array
    {
        return [
            'preco_eur' => 'decimal:2',
            'preco_pacote_fotos_eur' => 'decimal:2',
            'avaliacao' => 'integer',
            'incluidos' => 'array',
            'excluidos' => 'array',
            'o_que_levar' => 'array',
            'observacoes_importantes' => 'array',
            'ativo' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<CategoriaPacote, $this>
     */
    public function categoria(): BelongsTo
    {
        return $this->belongsTo(CategoriaPacote::class, 'categoria_pacote_id');
    }

    /**
     * @return HasOne<CondicaoPagamento, $this>
     */
    public function condicaoPagamento(): HasOne
    {
        return $this->hasOne(CondicaoPagamento::class);
    }

    /**
     * @return HasMany<DiaItinerario, $this>
     */
    public function diasItinerario(): HasMany
    {
        return $this->hasMany(DiaItinerario::class)->orderBy('ordem');
    }

    /**
     * @return HasMany<GaleriaPacote, $this>
     */
    public function galerias(): HasMany
    {
        return $this->hasMany(GaleriaPacote::class)->orderBy('ordem');
    }

    /**
     * @return HasMany<Reserva, $this>
     */
    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class);
    }
}
