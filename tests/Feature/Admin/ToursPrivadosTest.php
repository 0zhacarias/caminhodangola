<?php

namespace Tests\Feature\Admin;

use App\Models\TourPrivado;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ToursPrivadosTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): void
    {
        $this->actingAs(User::factory()->create([
            'email_verified_at' => now(),
        ]));
    }

    public function test_pagina_dos_tours_privados_e_renderizada_com_os_itens()
    {
        $this->admin();

        $item = TourPrivado::create([
            'tipo' => 'destaque',
            'titulo' => 'Flexível',
            'descricao' => 'Viagens desenhadas à medida.',
            'icone' => 'sliders-horizontal',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.tours-privados.index'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->component('admin/tours-privados/index')
                    ->where('itens.0.id', $item->id)
                    ->where('itens.0.icone', 'sliders-horizontal'),
            );
    }

    public function test_item_pode_ser_criado_atualizado_e_eliminado()
    {
        $this->admin();

        $this->post(route('admin.tours-privados.store'), [
            'tipo' => 'cabecalho',
            'titulo' => 'Personalize your trip with a private tour',
            'descricao' => 'Introdução da secção.',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('tours_privados', [
            'tipo' => 'cabecalho',
            'titulo' => 'Personalize your trip with a private tour',
        ]);

        $item = TourPrivado::firstOrFail();

        $this->put(route('admin.tours-privados.update', $item), [
            'tipo' => 'destaque',
            'titulo' => 'Flexível',
            'descricao' => 'Viagens desenhadas à medida.',
            'icone' => 'sliders-horizontal',
            'ordem' => 1,
            'ativo' => 1,
        ])->assertRedirect();

        $item->refresh();

        $this->assertSame('destaque', $item->tipo);
        $this->assertSame('Viagens desenhadas à medida.', $item->descricao);
        $this->assertSame('sliders-horizontal', $item->icone);

        $this->delete(route('admin.tours-privados.destroy', $item))
            ->assertRedirect();

        $this->assertDatabaseMissing('tours_privados', ['id' => $item->id]);
    }

    public function test_validacao_por_tipo()
    {
        $this->admin();

        $this->post(route('admin.tours-privados.store'), [
            'tipo' => 'destaque',
            'titulo' => 'Sem ícone',
            'descricao' => 'Destaque sem ícone.',
        ])->assertSessionHasErrors(['icone']);

        $this->post(route('admin.tours-privados.store'), [
            'tipo' => 'cabecalho',
            'titulo' => 'Sem descrição',
        ])->assertSessionHasErrors(['descricao']);

        $this->post(route('admin.tours-privados.store'), [
            'tipo' => 'cta_whatsapp',
            'titulo' => 'Customize Your Trip on WhatsApp',
            'descricao' => 'Sem número.',
        ])->assertSessionHasErrors(['link']);

        $this->assertDatabaseCount('tours_privados', 0);
    }

    public function test_cta_guardam_numero_e_email()
    {
        $this->admin();

        $this->post(route('admin.tours-privados.store'), [
            'tipo' => 'cta_whatsapp',
            'titulo' => 'Customize Your Trip on WhatsApp',
            'descricao' => 'Olá!',
            'link' => '+244923469271',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('tours_privados', [
            'tipo' => 'cta_whatsapp',
            'link' => '+244923469271',
        ]);

        $this->post(route('admin.tours-privados.store'), [
            'tipo' => 'cta_email',
            'titulo' => 'Customize Your Trip on Email',
            'descricao' => 'Olá!',
            'link' => 'info@caminhosdangola.com',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('tours_privados', [
            'tipo' => 'cta_email',
            'link' => 'info@caminhosdangola.com',
        ]);
    }

    public function test_itens_ativos_sao_partilhados_nas_paginas_do_site()
    {
        TourPrivado::create([
            'tipo' => 'cabecalho',
            'titulo' => 'Personalize your trip with a private tour',
            'descricao' => 'Introdução da secção.',
            'ordem' => 0,
            'ativo' => true,
        ]);

        TourPrivado::create([
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
                    ->where('tours_privados.0.titulo', 'Personalize your trip with a private tour')
                    ->where('tours_privados', function ($itens) {
                        return count($itens) === 1;
                    }),
            );
    }

    public function test_itens_nao_sao_partilhados_no_admin()
    {
        $this->admin();

        TourPrivado::create([
            'tipo' => 'destaque',
            'titulo' => 'Flexível',
            'descricao' => 'Viagens desenhadas à medida.',
            'icone' => 'sliders-horizontal',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.tours-privados.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('tours_privados', 0));
    }
}
