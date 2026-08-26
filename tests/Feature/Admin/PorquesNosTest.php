<?php

namespace Tests\Feature\Admin;

use App\Models\PorqueNos;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PorquesNosTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): void
    {
        $this->actingAs(User::factory()->create([
            'email_verified_at' => now(),
        ]));
    }

    public function test_pagina_do_porque_nos_e_renderizada_com_os_itens()
    {
        $this->admin();

        $item = PorqueNos::create([
            'tipo' => 'destaque',
            'titulo' => 'Experiência local',
            'descricao' => 'Guias locais com conhecimento profundo.',
            'icone' => 'map-pin',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.porques-nos.index'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->component('admin/porques-nos/index')
                    ->where('itens.0.id', $item->id)
                    ->where('itens.0.icone', 'map-pin'),
            );
    }

    public function test_item_pode_ser_criado_atualizado_e_eliminado()
    {
        $this->admin();

        $this->post(route('admin.porques-nos.store'), [
            'tipo' => 'destaque',
            'titulo' => 'Experiência local',
            'descricao' => 'Guias locais com conhecimento profundo.',
            'icone' => 'map-pin',
            'ordem' => 1,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('porques_nos', [
            'tipo' => 'destaque',
            'titulo' => 'Experiência local',
        ]);

        $item = PorqueNos::firstOrFail();

        $this->put(route('admin.porques-nos.update', $item), [
            'tipo' => 'valor',
            'titulo' => 'Qualidade: excelência em cada detalhe.',
            'icone' => 'users',
            'ordem' => 2,
            'ativo' => 1,
        ])->assertRedirect();

        $item->refresh();

        $this->assertSame('valor', $item->tipo);
        $this->assertNull($item->descricao);

        $this->delete(route('admin.porques-nos.destroy', $item))
            ->assertRedirect();

        $this->assertDatabaseMissing('porques_nos', ['id' => $item->id]);
    }

    public function test_cabecalho_requer_descricao_e_destaque_requer_icone()
    {
        $this->admin();

        $this->post(route('admin.porques-nos.store'), [
            'tipo' => 'cabecalho',
            'titulo' => 'Porquê nós',
        ])->assertSessionHasErrors(['descricao']);

        $this->post(route('admin.porques-nos.store'), [
            'tipo' => 'destaque',
            'titulo' => 'Sem ícone',
            'descricao' => 'Descrição válida.',
        ])->assertSessionHasErrors(['icone']);

        $this->assertDatabaseCount('porques_nos', 0);
    }

    public function test_itens_ativos_sao_partilhados_nas_paginas_do_site()
    {
        PorqueNos::create([
            'tipo' => 'destaque',
            'titulo' => 'Experiência local',
            'descricao' => 'Guias locais com conhecimento profundo.',
            'icone' => 'map-pin',
            'ordem' => 0,
            'ativo' => true,
        ]);

        PorqueNos::create([
            'tipo' => 'valor',
            'titulo' => 'Qualidade em cada detalhe.',
            'icone' => 'users',
            'ordem' => 0,
            'ativo' => false,
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->where('porques_nos.0.titulo', 'Experiência local')
                    ->where('porques_nos', function ($itens) {
                        return count($itens) === 1;
                    }),
            );
    }

    public function test_itens_nao_sao_partilhados_no_admin()
    {
        $this->admin();

        PorqueNos::create([
            'tipo' => 'destaque',
            'titulo' => 'Experiência local',
            'descricao' => 'Guias locais.',
            'icone' => 'map-pin',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.porques-nos.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('porques_nos', 0));
    }
}
