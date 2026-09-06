<?php

namespace Tests\Feature\Admin;

use App\Models\TourGrupo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ToursGruposTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): void
    {
        $this->actingAs(User::factory()->create([
            'email_verified_at' => now(),
        ]));
    }

    public function test_pagina_dos_tours_em_grupo_e_renderizada_com_os_itens()
    {
        $this->admin();

        $item = TourGrupo::create([
            'tipo' => 'destaque',
            'titulo' => 'Community',
            'descricao' => 'Viaje em grupo.',
            'icone' => 'users-round',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.tours-grupos.index'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->component('admin/tours-grupos/index')
                    ->where('itens.0.id', $item->id)
                    ->where('itens.0.icone', 'users-round'),
            );
    }

    public function test_pagina_tours_renderiza_privados_e_grupos()
    {
        $this->admin();

        $privado = \App\Models\TourPrivado::create([
            'tipo' => 'cabecalho',
            'titulo' => 'Private Tours',
            'descricao' => 'Introdução privada.',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $grupo = TourGrupo::create([
            'tipo' => 'cabecalho',
            'titulo' => 'Group Tours',
            'descricao' => 'Introdução em grupo.',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.tours.index'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->component('admin/tours/index')
                    ->where('toursPrivados.0.id', $privado->id)
                    ->where('toursGrupos.0.id', $grupo->id),
            );
    }

    public function test_item_pode_ser_criado_atualizado_e_eliminado()
    {
        $this->admin();

        $this->post(route('admin.tours-grupos.store'), [
            'tipo' => 'cabecalho',
            'titulo' => 'Group tours for the curious and adventurous',
            'descricao' => 'Introdução da secção.',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('tours_grupos', [
            'tipo' => 'cabecalho',
            'titulo' => 'Group tours for the curious and adventurous',
        ]);

        $item = TourGrupo::firstOrFail();

        $this->put(route('admin.tours-grupos.update', $item), [
            'tipo' => 'destaque',
            'titulo' => 'Community',
            'descricao' => 'Viaje em grupo.',
            'icone' => 'users-round',
            'ordem' => 1,
            'ativo' => 1,
        ])->assertRedirect();

        $item->refresh();

        $this->assertSame('destaque', $item->tipo);
        $this->assertSame('Viaje em grupo.', $item->descricao);
        $this->assertSame('users-round', $item->icone);

        $this->delete(route('admin.tours-grupos.destroy', $item))
            ->assertRedirect();

        $this->assertDatabaseMissing('tours_grupos', ['id' => $item->id]);
    }

    public function test_validacao_por_tipo()
    {
        $this->admin();

        $this->post(route('admin.tours-grupos.store'), [
            'tipo' => 'destaque',
            'titulo' => 'Sem ícone',
            'descricao' => 'Destaque sem ícone.',
        ])->assertSessionHasErrors(['icone']);

        $this->post(route('admin.tours-grupos.store'), [
            'tipo' => 'cabecalho',
            'titulo' => 'Sem descrição',
        ])->assertSessionHasErrors(['descricao']);

        $this->post(route('admin.tours-grupos.store'), [
            'tipo' => 'cta_email',
            'titulo' => 'Join a Group Tour on Email',
            'descricao' => 'Sem email.',
        ])->assertSessionHasErrors(['link']);

        $this->assertDatabaseCount('tours_grupos', 0);
    }

    public function test_cta_guardam_numero_e_email()
    {
        $this->admin();

        $this->post(route('admin.tours-grupos.store'), [
            'tipo' => 'cta_whatsapp',
            'titulo' => 'Join a Group Tour',
            'descricao' => 'Olá!',
            'link' => '+244923469271',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('tours_grupos', [
            'tipo' => 'cta_whatsapp',
            'link' => '+244923469271',
        ]);

        $this->post(route('admin.tours-grupos.store'), [
            'tipo' => 'cta_email',
            'titulo' => 'Join a Group Tour on Email',
            'descricao' => 'Olá!',
            'link' => 'info@caminhosdangola.com',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('tours_grupos', [
            'tipo' => 'cta_email',
            'link' => 'info@caminhosdangola.com',
        ]);
    }

    public function test_itens_ativos_sao_partilhados_nas_paginas_do_site()
    {
        TourGrupo::create([
            'tipo' => 'cabecalho',
            'titulo' => 'Group tours for the curious and adventurous',
            'descricao' => 'Introdução da secção.',
            'ordem' => 0,
            'ativo' => true,
        ]);

        TourGrupo::create([
            'tipo' => 'destaque',
            'titulo' => 'Inativo',
            'descricao' => 'Não deve ser partilhado.',
            'icone' => 'flag',
            'ordem' => 0,
            'ativo' => false,
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->where('tours_grupos.0.titulo', 'Group tours for the curious and adventurous')
                    ->where('tours_grupos', function ($itens) {
                        return count($itens) === 1;
                    }),
            );
    }

    public function test_itens_nao_sao_partilhados_no_admin()
    {
        $this->admin();

        TourGrupo::create([
            'tipo' => 'destaque',
            'titulo' => 'Community',
            'descricao' => 'Viaje em grupo.',
            'icone' => 'users-round',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.tours-grupos.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('tours_grupos', 0));
    }
}
