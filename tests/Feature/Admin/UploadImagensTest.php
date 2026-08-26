<?php

namespace Tests\Feature\Admin;

use App\Models\Cargo;
use App\Models\DiaItinerario;
use App\Models\Galeria;
use App\Models\GaleriaPacote;
use App\Models\MembroEquipa;
use App\Models\Pacote;
use App\Models\Seccao;
use App\Models\SlideHero;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UploadImagensTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');

        $this->admin = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($this->admin);
    }

    public function test_pacote_com_imagem_imagem_og_e_galerias(): void
    {
        $ficheiro = UploadedFile::fake()->image('principal.jpg', 800, 600);
        $og = UploadedFile::fake()->image('og.png', 1200, 630);
        $galeria1 = UploadedFile::fake()->image('galeria1.webp', 400, 300);
        $galeria2 = UploadedFile::fake()->image('galeria2.gif', 400, 300);

        $this->call('POST', route('admin.pacotes.store'), [
            'slug' => 'viagem-teste',
            'titulo' => 'Viagem de Teste',
            'ordem' => 0,
            'ativo' => 1,
        ], [], [
            'imagem' => $ficheiro,
            'imagem_og' => $og,
            'galerias' => [$galeria1, $galeria2],
        ])->assertRedirect(route('admin.pacotes.index'));

        $pacote = Pacote::where('slug', 'viagem-teste')->firstOrFail();

        $this->assertStringContainsString('pacotes/', $pacote->imagem);
        $this->assertStringContainsString('pacotes/', $pacote->imagem_og);
        $this->assertSame(2, $pacote->galerias()->count());

        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($pacote->imagem, PHP_URL_PATH)));
    }

    public function test_pacote_atualizado_com_nova_imagem(): void
    {
        $pacote = Pacote::create([
            'slug' => 'viagem-antiga',
            'titulo' => 'Viagem Antiga',
            'imagem' => 'http://localhost/storage/pacotes/antiga.jpg',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $ficheiro = UploadedFile::fake()->image('nova.jpg', 800, 600);

        $this->call('POST', route('admin.pacotes.update', $pacote), [
            'slug' => 'viagem-antiga',
            'titulo' => 'Viagem Antiga',
            'ordem' => 0,
            'ativo' => 1,
            '_method' => 'PUT',
        ], [], ['imagem' => $ficheiro])
            ->assertRedirect(route('admin.pacotes.index'));

        $this->assertStringContainsString('pacotes/', $pacote->refresh()->imagem);
        $this->assertNotSame('http://localhost/storage/pacotes/antiga.jpg', $pacote->imagem);
    }

    public function test_dia_itinerario_com_imagem(): void
    {
        $pacote = Pacote::create(['slug' => 'p1', 'titulo' => 'P1', 'ordem' => 0, 'ativo' => true]);

        $ficheiro = UploadedFile::fake()->image('dia.jpg', 600, 400);

        $this->call('POST', route('admin.dias-itinerario.store'), [
            'pacote_id' => $pacote->id,
            'rotulo_dia' => 'Dia 1',
            'titulo' => 'Chegada',
            'descricao' => 'Descrição do dia',
            'ordem' => 0,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $dia = DiaItinerario::firstOrFail();
        $this->assertStringContainsString('pacotes/itinerario', $dia->imagem);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($dia->imagem, PHP_URL_PATH)));
    }

    public function test_galeria_criada_com_varias_imagens(): void
    {
        $f1 = UploadedFile::fake()->image('g1.jpg', 500, 500);
        $f2 = UploadedFile::fake()->image('g2.jpg', 500, 500);

        $this->call('POST', route('admin.galerias.store'), [
            'ativo' => 1,
        ], [], ['imagens' => [$f1, $f2]])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertSame(2, Galeria::count());

        foreach (Galeria::all() as $galeria) {
            Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($galeria->imagem, PHP_URL_PATH)));
        }
    }

    public function test_galeria_sem_imagens_devolve_erro(): void
    {
        $this->post(route('admin.galerias.store'), ['ativo' => 1])
            ->assertSessionHasErrors('imagens');

        $this->assertSame(0, Galeria::count());
    }

    public function test_galeria_atualizada_com_nova_imagem(): void
    {
        $galeria = Galeria::create([
            'imagem' => 'http://localhost/storage/galerias/antiga.jpg',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $ficheiro = UploadedFile::fake()->image('nova.jpg', 500, 500);

        $this->call('POST', route('admin.galerias.update', $galeria), [
            'alt' => 'Nova imagem',
            'ordem' => 1,
            'ativo' => 1,
            '_method' => 'PUT',
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertStringContainsString('galerias/', $galeria->refresh()->imagem);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($galeria->imagem, PHP_URL_PATH)));
    }

    public function test_galeria_pacote_criada_com_imagem(): void
    {
        $pacote = Pacote::create(['slug' => 'p2', 'titulo' => 'P2', 'ordem' => 0, 'ativo' => true]);

        $ficheiro = UploadedFile::fake()->image('gp.jpg', 500, 500);

        $this->call('POST', route('admin.galerias-pacotes.store'), [
            'pacote_id' => $pacote->id,
            'ordem' => 0,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $galeria = GaleriaPacote::firstOrFail();
        $this->assertStringContainsString('pacotes/galerias', $galeria->imagem);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($galeria->imagem, PHP_URL_PATH)));
    }

    public function test_galeria_pacote_criada_com_ficheiros_multiplos(): void
    {
        $pacote = Pacote::create(['slug' => 'p3', 'titulo' => 'P3', 'ordem' => 0, 'ativo' => true]);

        $f1 = UploadedFile::fake()->image('m1.jpg', 500, 500);
        $f2 = UploadedFile::fake()->image('m2.jpg', 500, 500);

        $this->call('POST', route('admin.galerias-pacotes.store'), [
            'pacote_id' => $pacote->id,
        ], [], ['galerias' => [$f1, $f2]])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertSame(2, GaleriaPacote::count());
    }

    public function test_galeria_pacote_atualizada_com_nova_imagem(): void
    {
        $pacote = Pacote::create(['slug' => 'p4', 'titulo' => 'P4', 'ordem' => 0, 'ativo' => true]);

        $galeria = GaleriaPacote::create([
            'pacote_id' => $pacote->id,
            'imagem' => 'http://localhost/storage/pacotes/galerias/antiga.jpg',
            'ordem' => 0,
        ]);

        $ficheiro = UploadedFile::fake()->image('nova.jpg', 500, 500);

        $this->call('POST', route('admin.galerias-pacotes.update', $galeria), [
            'pacote_id' => $pacote->id,
            'ordem' => 1,
            '_method' => 'PUT',
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertStringContainsString('pacotes/galerias', $galeria->refresh()->imagem);
        $this->assertNotSame('http://localhost/storage/pacotes/galerias/antiga.jpg', $galeria->imagem);
    }

    public function test_slide_hero_criado_com_imagem(): void
    {
        $ficheiro = UploadedFile::fake()->image('slide.jpg', 1920, 1080);

        $this->call('POST', route('admin.slides-hero.store'), [
            'pagina' => 'home',
            'titulo' => 'Bem-vindo',
            'ordem' => 0,
            'ativo' => 1,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $slide = SlideHero::firstOrFail();
        $this->assertStringContainsString('slides-hero', $slide->imagem);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($slide->imagem, PHP_URL_PATH)));
    }

    public function test_slide_hero_sem_imagem_e_criado(): void
    {
        $this->call('POST', route('admin.slides-hero.store'), [
            'pagina' => 'home',
            'titulo' => 'Só com página',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertSame(1, SlideHero::count());
        $this->assertNull(SlideHero::first()->imagem);
    }

    public function test_slide_hero_sem_pagina_devolve_erro(): void
    {
        $ficheiro = UploadedFile::fake()->image('slide.jpg', 1920, 1080);

        $this->call('POST', route('admin.slides-hero.store'), [
            'titulo' => 'Sem página',
            'ordem' => 0,
            'ativo' => 1,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasErrors('pagina');

        $this->assertSame(0, SlideHero::count());
    }

    public function test_slide_hero_guarda_botao(): void
    {
        $this->call('POST', route('admin.slides-hero.store'), [
            'pagina' => 'private-tours',
            'titulo' => 'Com botão',
            'botao_rotulo' => 'Saber mais',
            'botao_url' => '/pacotes',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertSessionHasNoErrors()
            ->assertRedirect();

        $slide = SlideHero::firstOrFail();
        $this->assertSame('Saber mais', $slide->botao_rotulo);
        $this->assertSame('/pacotes', $slide->botao_url);
    }

    public function test_slide_hero_atualizado_com_nova_imagem(): void
    {
        $slide = SlideHero::create([
            'imagem' => 'http://localhost/storage/slides-hero/antiga.jpg',
            'titulo' => 'Antigo',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $ficheiro = UploadedFile::fake()->image('nova.jpg', 1920, 1080);

        $this->call('POST', route('admin.slides-hero.update', $slide), [
            'pagina' => 'home',
            'titulo' => 'Novo',
            'ordem' => 0,
            'ativo' => 1,
            '_method' => 'PUT',
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertStringContainsString('slides-hero', $slide->refresh()->imagem);
    }

    public function test_seccao_criada_com_imagem(): void
    {
        $ficheiro = UploadedFile::fake()->image('seccao.jpg', 800, 600);

        $this->call('POST', route('admin.seccoes.store'), [
            'slug' => 'sobre-nos',
            'titulo' => 'Sobre nós',
            'ordem' => 0,
            'ativo' => 1,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $seccao = Seccao::firstOrFail();
        $this->assertStringContainsString('seccoes', $seccao->imagem);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($seccao->imagem, PHP_URL_PATH)));
    }

    public function test_seccao_atualizada_mantendo_imagem_como_url(): void
    {
        $seccao = Seccao::create([
            'slug' => 'sobre-nos',
            'imagem' => 'http://localhost/storage/seccoes/antiga.jpg',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->call('POST', route('admin.seccoes.update', $seccao), [
            'slug' => 'sobre-nos',
            'titulo' => 'Sobre nós atualizado',
            'imagem' => 'http://localhost/storage/seccoes/antiga.jpg',
            'ordem' => 1,
            'ativo' => 1,
            '_method' => 'PUT',
        ])->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertSame('http://localhost/storage/seccoes/antiga.jpg', $seccao->refresh()->imagem);
    }

    public function test_membro_equipa_criado_com_foto(): void
    {
        $cargo = Cargo::create(['nome' => 'Guia', 'ativo' => true]);

        $ficheiro = UploadedFile::fake()->image('foto.jpg', 400, 400);

        $this->call('POST', route('admin.membros-equipa.store'), [
            'nome' => 'Carlos Santos',
            'cargo_id' => $cargo->id,
            'ordem' => 0,
            'ativo' => 1,
            'permitir_login' => 0,
        ], [], ['foto' => $ficheiro])
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $membro = MembroEquipa::firstOrFail();
        $this->assertStringContainsString('membros-equipa', $membro->foto);
        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($membro->foto, PHP_URL_PATH)));
    }

    public function test_upload_nao_validado_para_tipo_nao_permitido(): void
    {
        $ficheiro = UploadedFile::fake()->create('documento.pdf', 100, 'application/pdf');

        $this->call('POST', route('admin.slides-hero.store'), [
            'pagina' => 'home',
            'titulo' => 'Ficheiro inválido',
            'ordem' => 0,
            'ativo' => 1,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasErrors('imagem');

        $this->assertSame(0, SlideHero::count());
    }

    public function test_upload_acima_do_limite_e_rejeitado(): void
    {
        $ficheiro = UploadedFile::fake()->create('grande.jpg', 6000, 'image/jpeg');

        $this->call('POST', route('admin.slides-hero.store'), [
            'pagina' => 'home',
            'titulo' => 'Imagem grande',
            'ordem' => 0,
            'ativo' => 1,
        ], [], ['imagem' => $ficheiro])
            ->assertSessionHasErrors('imagem');

        $this->assertSame(0, SlideHero::count());
    }
}
