<?php

namespace Tests\Feature\Admin;

use App\Models\CategoriaPacote;
use App\Models\Configuracao;
use App\Models\Depoimento;
use App\Models\DiaItinerario;
use App\Models\Estatistica;
use App\Models\Galeria;
use App\Models\GaleriaPacote;
use App\Models\ItemMenu;
use App\Models\MembroEquipa;
use App\Models\Pacote;
use App\Models\PerguntaFrequente;
use App\Models\Reserva;
use App\Models\Seccao;
use App\Models\SlideHero;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $this->actingAs($user);

        return $user;
    }

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('admin.dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_admin_pages_are_rendered()
    {
        $this->admin();

        $rotas = [
            'dashboard',
            'admin.categorias-pacotes.index',
            'admin.pacotes.index',
            'admin.pacotes.create',
            'admin.dias-itinerario.index',
            'admin.galerias-pacotes.index',
            'admin.galerias.index',
            'admin.depoimentos.index',
            'admin.perguntas-frequentes.index',
            'admin.membros-equipa.index',
            'admin.slides-hero.index',
            'admin.seccoes.index',
            'admin.estatisticas.index',
            'admin.itens-menu.index',
            'admin.configuracoes.index',
            'admin.reservas.index',
        ];

        foreach ($rotas as $rota) {
            $this->get(route($rota))->assertOk();
        }

        $this->get(route('admin.dashboard'))->assertRedirect(route('dashboard'));
    }

    public function test_depoimento_pode_ser_criado_atualizado_e_eliminado()
    {
        $this->admin();

        $resposta = $this->post(route('admin.depoimentos.store'), [
            'nome' => 'João Manuel',
            'localizacao' => 'Luanda',
            'mensagem' => 'Viagem incrível!',
            'avaliacao' => 5,
            'destaque' => true,
            'ordem' => 0,
        ]);

        $resposta->assertRedirect();
        $this->assertDatabaseHas('depoimentos', ['nome' => 'João Manuel']);

        $depoimento = Depoimento::firstOrFail();

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

    public function test_pacote_pode_ser_criado_com_listas()
    {
        $this->admin();

        $categoria = CategoriaPacote::create([
            'nome' => 'Aventura',
            'slug' => 'aventura',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->post(route('admin.pacotes.store'), [
            'categoria_pacote_id' => $categoria->id,
            'slug' => 'serra-da-leba',
            'titulo' => 'Serra da Leba',
            'duracao' => '3 dias',
            'preco_eur' => '250.00',
            'avaliacao' => 5,
            'incluidos' => "Transporte\nGuia",
            'excluidos' => 'Refeições',
            'o_que_levar' => 'Água',
            'observacoes_importantes' => '',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();

        $pacote = Pacote::where('slug', 'serra-da-leba')->firstOrFail();

        $this->assertSame(['Transporte', 'Guia'], $pacote->incluidos);
        $this->assertSame(['Refeições'], $pacote->excluidos);
        $this->assertSame(['Água'], $pacote->o_que_levar);
        $this->assertNull($pacote->observacoes_importantes);
        $this->assertSame($categoria->id, $pacote->categoria_pacote_id);
    }

    public function test_pacote_pode_ser_criado_com_upload_de_imagens()
    {
        Storage::fake('public');

        $this->admin();

        $this->post(route('admin.pacotes.store'), [
            'slug' => 'com-imagens',
            'titulo' => 'Com imagens',
            'ordem' => 0,
            'ativo' => true,
            'imagem' => UploadedFile::fake()->image('principal.jpg'),
            'galerias' => [
                UploadedFile::fake()->image('carrossel-a.jpg'),
                UploadedFile::fake()->image('carrossel-b.jpg'),
            ],
        ])->assertRedirect();

        $pacote = Pacote::where('slug', 'com-imagens')->firstOrFail();

        $this->assertStringContainsString('/storage/pacotes/', $pacote->imagem);
        $this->assertSame(2, $pacote->galerias()->count());

        Storage::disk('public')->assertExists(Str::after($pacote->imagem, '/storage/'));

        $pacote->galerias()->each(function (GaleriaPacote $imagem) {
            $this->assertStringContainsString('/storage/pacotes/galerias/', $imagem->imagem);

            Storage::disk('public')->assertExists(Str::after($imagem->imagem, '/storage/'));
        });
    }

    public function test_galeria_de_pacote_pode_receber_varias_imagens_de_uma_vez()
    {
        Storage::fake('public');

        $this->admin();

        $pacote = Pacote::create([
            'slug' => 'galeria-massa',
            'titulo' => 'Galeria em massa',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->post(route('admin.galerias-pacotes.store'), [
            'pacote_id' => $pacote->id,
            'galerias' => [
                UploadedFile::fake()->image('a.jpg'),
                UploadedFile::fake()->image('b.jpg'),
            ],
        ])->assertRedirect();

        $this->assertSame(2, $pacote->galerias()->count());

        $pacote->galerias()->each(function (GaleriaPacote $imagem) {
            $this->assertStringContainsString('/storage/pacotes/galerias/', $imagem->imagem);

            Storage::disk('public')->assertExists(Str::after($imagem->imagem, '/storage/'));
        });
    }

    public function test_pacote_editavel_mantem_imagem_existente_sem_novo_upload()
    {
        Storage::fake('public');

        $pacote = Pacote::create([
            'slug' => 'existente',
            'titulo' => 'Existente',
            'imagem' => 'https://example.com/existente.jpg',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->admin();

        $this->put(route('admin.pacotes.update', $pacote), [
            'slug' => 'existente',
            'titulo' => 'Existente',
            'imagem' => 'https://example.com/existente.jpg',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertSame(
            'https://example.com/existente.jpg',
            $pacote->refresh()->imagem,
        );
    }

    public function test_pagina_de_edicao_de_pacote_e_renderizada()
    {
        $this->admin();

        $pacote = Pacote::create([
            'slug' => 'formulario',
            'titulo' => 'Formulário',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.pacotes.edit', $pacote))->assertOk();
    }

    public function test_pacote_pode_guardar_condicoes_de_pagamento()
    {
        $this->admin();

        $this->post(route('admin.pacotes.store'), [
            'slug' => 'com-condicoes',
            'titulo' => 'Com condições',
            'ordem' => 0,
            'ativo' => true,
            'preco_base_por_pessoa' => '1500.00',
            'gasto_pessoal_estimado' => '300.00',
            'deposito_percentagem' => 30,
            'saldo_dias_antes_partida' => 45,
            'metodos_pagamento' => "Transferência bancária\nMulticaixa Express",
        ])->assertRedirect();

        $pacote = Pacote::where('slug', 'com-condicoes')->firstOrFail();

        $this->assertDatabaseHas('condicoes_pagamento', [
            'pacote_id' => $pacote->id,
            'deposito_percentagem' => 30,
            'saldo_dias_antes_partida' => 45,
        ]);

        $condicoes = $pacote->condicaoPagamento;

        $this->assertNotNull($condicoes);
        $this->assertSame('1500.00', $condicoes->preco_base_por_pessoa);
        $this->assertSame('300.00', $condicoes->gasto_pessoal_estimado);
        $this->assertSame(['Transferência bancária', 'Multicaixa Express'], $condicoes->metodos_pagamento);
    }

    public function test_condicoes_de_pagamento_sao_removidas_quando_ficam_vazias()
    {
        $this->admin();

        $pacote = Pacote::create([
            'slug' => 'sem-condicoes',
            'titulo' => 'Sem condições',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $pacote->condicaoPagamento()->create([
            'preco_base_por_pessoa' => '1500.00',
            'deposito_percentagem' => 30,
        ]);

        $this->put(route('admin.pacotes.update', $pacote), [
            'slug' => 'sem-condicoes',
            'titulo' => 'Sem condições',
            'ordem' => 0,
            'ativo' => true,
            'preco_base_por_pessoa' => '',
            'gasto_pessoal_estimado' => '',
            'deposito_percentagem' => '',
            'saldo_dias_antes_partida' => '',
            'metodos_pagamento' => '',
        ])->assertRedirect();

        $this->assertDatabaseCount('condicoes_pagamento', 0);
    }

    public function test_pacote_pode_guardar_imagem_og_por_upload()
    {
        Storage::fake('public');

        $this->admin();

        $this->post(route('admin.pacotes.store'), [
            'slug' => 'com-og',
            'titulo' => 'Com OG',
            'ordem' => 0,
            'ativo' => true,
            'imagem_og' => UploadedFile::fake()->image('og.jpg'),
        ])->assertRedirect();

        $pacote = Pacote::where('slug', 'com-og')->firstOrFail();

        $this->assertStringContainsString('/storage/pacotes/', $pacote->imagem_og);

        Storage::disk('public')->assertExists(Str::after($pacote->imagem_og, '/storage/'));
    }

    public function test_reserva_pode_ter_estado_atualizado()
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
    }

    public function test_outros_recursos_podem_ser_geridos()
    {
        Storage::fake('public');

        $this->admin();

        $this->post(route('admin.galerias.store'), [
            'imagens' => [
                UploadedFile::fake()->image('galeria.jpg'),
            ],
            'ativo' => true,
        ])->assertRedirect();
        $galeria = Galeria::firstOrFail();

        $this->post(route('admin.slides-hero.store'), [
            'pagina' => 'home',
            'imagem' => UploadedFile::fake()->image('slide.jpg'),
            'titulo' => 'Bem-vindo',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();
        $slide = SlideHero::firstOrFail();

        $this->assertStringContainsString('/storage/slides-hero/', $slide->imagem);

        Storage::disk('public')->assertExists(Str::after($slide->imagem, '/storage/'));

        $this->post(route('admin.estatisticas.store'), [
            'rotulo' => 'Destinos',
            'valor' => '50+',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();
        $estatistica = Estatistica::firstOrFail();

        $this->post(route('admin.perguntas-frequentes.store'), [
            'categoria' => 'Reservas',
            'pergunta' => 'Como reservo?',
            'resposta' => 'Através do formulário.',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();
        $pergunta = PerguntaFrequente::firstOrFail();

        $this->post(route('admin.membros-equipa.store'), [
            'nome' => 'Carlos Santos',
            'cargo' => 'Guia',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();
        $membro = MembroEquipa::firstOrFail();

        $this->post(route('admin.seccoes.store'), [
            'slug' => 'sobre',
            'titulo' => 'Sobre nós',
            'conteudo' => '{"texto":"Olá"}',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();
        $seccao = Seccao::firstOrFail();

        $this->post(route('admin.itens-menu.store'), [
            'rotulo' => 'Pacotes',
            'rota' => '/pacotes',
            'ordem' => 0,
            'ativo' => true,
        ])->assertRedirect();
        $item = ItemMenu::firstOrFail();

        $this->post(route('admin.configuracoes.store'), [
            'chave' => 'telefone',
            'valor' => '+244 900 000 000',
        ])->assertRedirect();
        $configuracao = Configuracao::firstOrFail();

        $pacote = Pacote::create([
            'slug' => 'p1',
            'titulo' => 'Pacote 1',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->post(route('admin.dias-itinerario.store'), [
            'pacote_id' => $pacote->id,
            'rotulo_dia' => 'Dia 1',
            'titulo' => 'Chegada',
            'descricao' => 'Chegada ao hotel.',
            'ordem' => 0,
        ])->assertRedirect();
        $dia = DiaItinerario::firstOrFail();

        $this->post(route('admin.galerias-pacotes.store'), [
            'pacote_id' => $pacote->id,
            'imagem' => UploadedFile::fake()->image('galeria-pacote.jpg'),
            'ordem' => 0,
        ])->assertRedirect();
        $galeriaPacote = GaleriaPacote::firstOrFail();

        $this->delete(route('admin.galerias.destroy', $galeria))->assertRedirect();
        $this->delete(route('admin.slides-hero.destroy', $slide))->assertRedirect();
        $this->delete(route('admin.estatisticas.destroy', $estatistica))->assertRedirect();
        $this->delete(route('admin.perguntas-frequentes.destroy', $pergunta))->assertRedirect();
        $this->delete(route('admin.membros-equipa.destroy', $membro))->assertRedirect();
        $this->delete(route('admin.seccoes.destroy', $seccao))->assertRedirect();
        $this->delete(route('admin.itens-menu.destroy', $item))->assertRedirect();
        $this->delete(route('admin.configuracoes.destroy', $configuracao))->assertRedirect();
        $this->delete(route('admin.dias-itinerario.destroy', $dia))->assertRedirect();
        $this->delete(route('admin.galerias-pacotes.destroy', $galeriaPacote))->assertRedirect();

        $this->assertDatabaseCount('galerias', 0);
        $this->assertDatabaseCount('slides_hero', 0);
        $this->assertDatabaseCount('estatisticas', 0);
        $this->assertDatabaseCount('perguntas_frequentes', 0);
        $this->assertDatabaseCount('membros_equipa', 0);
        $this->assertDatabaseCount('seccoes', 0);
        $this->assertDatabaseCount('itens_menu', 0);
        $this->assertDatabaseCount('configuracoes', 0);
        $this->assertDatabaseCount('dias_itinerario', 0);
        $this->assertDatabaseCount('galerias_pacotes', 0);
    }
}
