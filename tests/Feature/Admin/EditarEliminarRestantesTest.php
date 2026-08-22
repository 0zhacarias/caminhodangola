<?php

namespace Tests\Feature\Admin;

use App\Models\Configuracao;
use App\Models\Estatistica;
use App\Models\ItemMenu;
use App\Models\MembroEquipa;
use App\Models\Reserva;
use App\Models\Seccao;
use App\Models\SlideHero;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EditarEliminarRestantesTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): void
    {
        $this->actingAs(User::factory()->create([
            'email_verified_at' => now(),
        ]));
    }

    public function test_membro_de_equipa_pode_ser_editado_e_eliminado()
    {
        $this->admin();

        $membro = MembroEquipa::create([
            'nome' => 'Carlos Santos',
            'cargo' => 'Guia',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.membros-equipa.update', $membro), [
            'nome' => 'Carlos dos Santos',
            'cargo' => 'Guia sénior',
            'telefone' => '+244 900 000 000',
            'ordem' => 1,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertDatabaseHas('membros_equipa', [
            'id' => $membro->id,
            'cargo' => 'Guia sénior',
        ]);

        $this->delete(route('admin.membros-equipa.destroy', $membro))
            ->assertRedirect();

        $this->assertDatabaseMissing('membros_equipa', ['id' => $membro->id]);
    }

    public function test_slide_hero_pode_ser_editado_e_eliminado()
    {
        $this->admin();

        $slide = SlideHero::create([
            'pagina' => 'home',
            'imagem' => 'https://example.com/slide.jpg',
            'titulo' => 'Bem-vindo',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.slides-hero.update', $slide), [
            'pagina' => 'sobre',
            'imagem' => 'https://example.com/slide-novo.jpg',
            'titulo' => 'Sobre nós',
            'ordem' => 1,
            'ativo' => false,
        ])->assertRedirect();

        $this->assertDatabaseHas('slides_hero', [
            'id' => $slide->id,
            'titulo' => 'Sobre nós',
        ]);

        $this->delete(route('admin.slides-hero.destroy', $slide))
            ->assertRedirect();

        $this->assertDatabaseMissing('slides_hero', ['id' => $slide->id]);
    }

    public function test_seccao_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $seccao = Seccao::create([
            'slug' => 'sobre',
            'titulo' => 'Sobre nós',
            'conteudo' => '{"texto":"Olá"}',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.seccoes.update', $seccao), [
            'slug' => 'sobre',
            'titulo' => 'Sobre a empresa',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertDatabaseHas('seccoes', [
            'id' => $seccao->id,
            'titulo' => 'Sobre a empresa',
        ]);

        $this->delete(route('admin.seccoes.destroy', $seccao))
            ->assertRedirect();

        $this->assertDatabaseMissing('seccoes', ['id' => $seccao->id]);
    }

    public function test_estatistica_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $estatistica = Estatistica::create([
            'rotulo' => 'Destinos',
            'valor' => '50+',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.estatisticas.update', $estatistica), [
            'rotulo' => 'Viajantes',
            'valor' => '1200+',
            'icone' => 'users',
            'ordem' => 1,
            'ativo' => false,
        ])->assertRedirect();

        $this->assertDatabaseHas('estatisticas', [
            'id' => $estatistica->id,
            'rotulo' => 'Viajantes',
        ]);

        $this->delete(route('admin.estatisticas.destroy', $estatistica))
            ->assertRedirect();

        $this->assertDatabaseMissing('estatisticas', ['id' => $estatistica->id]);
    }

    public function test_item_de_menu_pode_ser_editado_e_eliminado()
    {
        $this->admin();

        $pai = ItemMenu::create([
            'rotulo' => 'Pacotes',
            'rota' => '/pacotes',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $item = ItemMenu::create([
            'pai_id' => $pai->id,
            'rotulo' => 'Pacotes de aventura',
            'rota' => '/pacotes/aventura',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.itens-menu.update', $item), [
            'pai_id' => $pai->id,
            'rotulo' => 'Pacotes de praia',
            'rota' => '/pacotes/praia',
            'ordem' => 1,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertDatabaseHas('itens_menu', [
            'id' => $item->id,
            'rotulo' => 'Pacotes de praia',
        ]);

        $this->delete(route('admin.itens-menu.destroy', $pai))
            ->assertRedirect();

        $this->assertDatabaseMissing('itens_menu', ['id' => $pai->id]);
        $this->assertNull($item->refresh()->pai_id);
    }

    public function test_item_de_menu_nao_pode_ser_pai_de_si_proprio()
    {
        $this->admin();

        $item = ItemMenu::create([
            'rotulo' => 'Sobre',
            'rota' => '/sobre',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.itens-menu.update', $item), [
            'pai_id' => $item->id,
            'rotulo' => 'Sobre',
            'rota' => '/sobre',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertNull($item->refresh()->pai_id);
    }

    public function test_configuracao_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $configuracao = Configuracao::create([
            'chave' => 'telefone',
            'valor' => '+244 900 000 000',
        ]);

        $this->put(route('admin.configuracoes.update', $configuracao), [
            'chave' => 'telefone',
            'valor' => '+244 910 000 000',
        ])->assertRedirect();

        $this->assertDatabaseHas('configuracoes', [
            'id' => $configuracao->id,
            'valor' => '+244 910 000 000',
        ]);

        $this->delete(route('admin.configuracoes.destroy', $configuracao))
            ->assertRedirect();

        $this->assertDatabaseMissing('configuracoes', ['id' => $configuracao->id]);
    }

    public function test_reserva_pode_ser_editada_e_eliminada()
    {
        $this->admin();

        $reserva = Reserva::create([
            'nome' => 'Ana Costa',
            'email' => 'ana@example.com',
            'numero_viajantes' => 2,
            'estado' => 'new',
        ]);

        $this->put(route('admin.reservas.update', $reserva), [
            'estado' => 'confirmed',
        ])->assertRedirect();

        $this->assertDatabaseHas('reservas', [
            'id' => $reserva->id,
            'estado' => 'confirmed',
        ]);

        $this->delete(route('admin.reservas.destroy', $reserva))
            ->assertRedirect();

        $this->assertDatabaseMissing('reservas', ['id' => $reserva->id]);
    }
}
