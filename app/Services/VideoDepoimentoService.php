<?php

namespace App\Services;

use App\Models\VideoDepoimento;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

final class VideoDepoimentoService
{
    /**
     * @return EloquentCollection<int, VideoDepoimento>
     */
    public function listar(): EloquentCollection
    {
        return VideoDepoimento::query()->orderBy('ordem')->orderByDesc('id')->get();
    }

    /**
     * @return EloquentCollection<int, VideoDepoimento>
     */
    public function listarAtivos(): EloquentCollection
    {
        return VideoDepoimento::query()->where('ativo', true)->orderBy('ordem')->get();
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function criar(array $dados): VideoDepoimento
    {
        return VideoDepoimento::create($dados);
    }

    /**
     * @param  array<string, mixed>  $dados
     */
    public function atualizar(VideoDepoimento $video, array $dados): VideoDepoimento
    {
        $video->update($dados);

        return $video;
    }

    public function remover(VideoDepoimento $video): void
    {
        $video->delete();
    }
}
