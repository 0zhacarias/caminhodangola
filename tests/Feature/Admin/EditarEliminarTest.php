<?php

namespace Tests\Feature\Admin;

use App\Models\CategoriaPacote;
use App\Models\Depoimento;
use App\Models\DiaItinerario;
use App\Models\Galeria;
use App\Models\GaleriaPacote;
use App\Models\Pacote;
use App\Models\PerguntaFrequente;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class EditarEliminarTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): void
    {
        $this->actingAs(User::factory()->create([
            'email_verified_at' => now(),
        ]));
    }

    public function test_categoria_de_pacote_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $categoria = CategoriaPacote::create([
            'nome' => 'Aventura',
            'slug' => 'aventura',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $url = route('admin.categorias-pacotes.update', $categoria);
        $resposta = $this->put($url, [
            'nome' => 'Aventura Radical',
            'slug' => 'aventura-radical',
            'ordem' => 1,
            'ativo' => false,
        ]);

        $resposta->assertRedirect();

        $this->assertDatabaseHas('categorias_pacotes', [
            'id' => $categoria->id,
            'nome' => 'Aventura Radical',
            'ativo' => false,
        ]);

        $categoria->refresh();

        $this->delete(route('admin.categorias-pacotes.destroy', $categoria))
            ->assertRedirect();

        $this->assertDatabaseMissing('categorias_pacotes', [
            'id' => $categoria->id,
        ]);
    }

    public function test_eliminar_categoria_com_pacotes_coloca_categoria_a_null()
    {
        $this->admin();

        $categoria = CategoriaPacote::create([
            'nome' => 'Praia',
            'slug' => 'praia',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $pacote = Pacote::create([
            'categoria_pacote_id' => $categoria->id,
            'slug' => 'praia-de-luanda',
            'titulo' => 'Praia de Luanda',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->delete(route('admin.categorias-pacotes.destroy', $categoria))
            ->assertRedirect();

        $this->assertDatabaseMissing('categorias_pacotes', [
            'id' => $categoria->id,
        ]);

        $this->assertNull($pacote->refresh()->categoria_pacote_id);
    }

    public function test_pacote_pode_ser_editado_pelo_slug_e_eliminado_em_cascata()
    {
        $this->admin();

        $pacote = Pacote::create([
            'slug' => 'serra-da-leba',
            'titulo' => 'Serra da Leba',
            'ordem' => 0,
            'ativo' => true,
        ]);

        DiaItinerario::create([
            'pacote_id' => $pacote->id,
            'rotulo_dia' => 'Dia 1',
            'titulo' => 'Chegada',
            'descricao' => 'Chegada ao destino.',
            'ordem' => 0,
        ]);

        GaleriaPacote::create([
            'pacote_id' => $pacote->id,
            'imagem' => 'https://example.com/foto.jpg',
            'ordem' => 0,
        ]);

        $this->get(route('admin.pacotes.edit', $pacote))->assertOk();
        $this->get(route('admin.pacotes.create'))->assertOk();

        $this->put(route('admin.pacotes.update', $pacote), [
            'slug' => 'serra-da-leba',
            'titulo' => 'Serra da Leba Atualizada',
            'duracao' => '3 dias',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertSame('Serra da Leba Atualizada', $pacote->refresh()->titulo);

        $this->delete(route('admin.pacotes.destroy', $pacote))
            ->assertRedirect();

        $this->assertDatabaseMissing('pacotes', ['id' => $pacote->id]);
        $this->assertDatabaseCount('dias_itinerario', 0);
        $this->assertDatabaseCount('galerias_pacotes', 0);
    }

    public function test_dia_de_itinerario_pode_ser_editado_e_eliminado()
    {
        $this->admin();

        $pacote = Pacote::create([
            'slug' => 'p1',
            'titulo' => 'Pacote 1',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $dia = DiaItinerario::create([
            'pacote_id' => $pacote->id,
            'rotulo_dia' => 'Dia 1',
            'titulo' => 'Chegada',
            'descricao' => 'Chegada ao hotel.',
            'ordem' => 0,
        ]);

        $this->put(route('admin.dias-itinerario.update', $dia), [
            'pacote_id' => $pacote->id,
            'rotulo_dia' => 'Dia 2',
            'titulo' => 'Partida',
            'descricao' => 'Regresso a casa.',
            'ordem' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('dias_itinerario', [
            'id' => $dia->id,
            'titulo' => 'Partida',
        ]);

        $this->delete(route('admin.dias-itinerario.destroy', $dia))
            ->assertRedirect();

        $this->assertDatabaseMissing('dias_itinerario', ['id' => $dia->id]);
    }

    public function test_galeria_de_pacote_pode_ser_editada_e_eliminada()
    {
        Storage::fake('public');

        $this->admin();

        $pacote = Pacote::create([
            'slug' => 'p1',
            'titulo' => 'Pacote 1',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $galeria = GaleriaPacote::create([
            'pacote_id' => $pacote->id,
            'imagem' => 'https://example.com/a.jpg',
            'ordem' => 0,
        ]);

        $this->put(route('admin.galerias-pacotes.update', $galeria), [
            'pacote_id' => $pacote->id,
            'imagem' => UploadedFile::fake()->image('nova.jpg'),
            'ordem' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('galerias_pacotes', [
            'id' => $galeria->id,
            'ordem' => 1,
        ]);

        $this->assertStringContainsString(
            '/storage/pacotes/galerias/',
            $galeria->refresh()->imagem,
        );

        $this->delete(route('admin.galerias-pacotes.destroy', $galeria))
            ->assertRedirect();

        $this->assertDatabaseMissing('galerias_pacotes', ['id' => $galeria->id]);
    }

    public function test_galeria_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $galeria = Galeria::create([
            'imagem' => 'https://example.com/foto.jpg',
            'alt' => 'Foto',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.galerias.update', $galeria), [
            'imagem' => 'https://example.com/foto-nova.jpg',
            'alt' => 'Foto nova',
            'ordem' => 1,
            'ativo' => false,
        ])->assertRedirect();

        $this->assertDatabaseHas('galerias', [
            'id' => $galeria->id,
            'alt' => 'Foto nova',
        ]);

        $this->delete(route('admin.galerias.destroy', $galeria))
            ->assertRedirect();

        $this->assertDatabaseMissing('galerias', ['id' => $galeria->id]);
    }

    public function test_depoimento_pode_ser_editado_e_eliminado()
    {
        $this->admin();

        $depoimento = Depoimento::create([
            'nome' => 'João Manuel',
            'localizacao' => 'Luanda',
            'mensagem' => 'Viagem incrível!',
            'avaliacao' => 5,
            'destaque' => true,
            'ordem' => 0,
        ]);

        $this->put(route('admin.depoimentos.update', $depoimento), [
            'nome' => 'João Manuel Silva',
            'localizacao' => 'Benguela',
            'mensagem' => 'Viagem incrível!',
            'avaliacao' => 4,
            'destaque' => false,
            'ordem' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('depoimentos', [
            'id' => $depoimento->id,
            'nome' => 'João Manuel Silva',
        ]);

        $this->delete(route('admin.depoimentos.destroy', $depoimento))
            ->assertRedirect();

        $this->assertDatabaseMissing('depoimentos', ['id' => $depoimento->id]);
    }

    public function test_pergunta_frequente_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $pergunta = PerguntaFrequente::create([
            'categoria' => 'Reservas',
            'pergunta' => 'Como reservo?',
            'resposta' => 'Através do formulário.',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.perguntas-frequentes.update', $pergunta), [
            'categoria' => 'Pagamentos',
            'pergunta' => 'Como pago?',
            'resposta' => 'Por transferência.',
            'ordem' => 1,
            'ativo' => false,
        ])->assertRedirect();

        $this->assertDatabaseHas('perguntas_frequentes', [
            'id' => $pergunta->id,
            'pergunta' => 'Como pago?',
        ]);

        $this->delete(route('admin.perguntas-frequentes.destroy', $pergunta))
            ->assertRedirect();

        $this->assertDatabaseMissing('perguntas_frequentes', [
            'id' => $pergunta->id,
        ]);
    }
}
