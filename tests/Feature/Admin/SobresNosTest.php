<?php

namespace Tests\Feature\Admin;

use App\Models\SobreNos;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SobresNosTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): void
    {
        $this->actingAs(User::factory()->create([
            'email_verified_at' => now(),
        ]));
    }

    public function test_pagina_do_sobre_nos_e_renderizada_com_os_itens()
    {
        $this->admin();

        $item = SobreNos::create([
            'tipo' => 'destaque',
            'titulo' => 'Raízes locais',
            'descricao' => 'Equipa com conhecimento profundo de Angola.',
            'icone' => 'book-open',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.sobres-nos.index'))
            ->assertOk()
            ->assertInertia(
                fn ($page) => $page
                    ->component('admin/sobres-nos/index')
                    ->where('itens.0.id', $item->id)
                    ->where('itens.0.icone', 'book-open'),
            );
    }

    public function test_item_pode_ser_criado_atualizado_e_eliminado()
    {
        $this->admin();

        $this->post(route('admin.sobres-nos.store'), [
            'tipo' => 'cabecalho',
            'titulo' => 'About Us',
            'descricao' => 'Introdução da secção.',
            'ordem' => 0,
            'ativo' => 1,
        ])->assertRedirect();

        $this->assertDatabaseHas('sobres_nos', [
            'tipo' => 'cabecalho',
            'titulo' => 'About Us',
        ]);

        $item = SobreNos::firstOrFail();

        $this->put(route('admin.sobres-nos.update', $item), [
            'tipo' => 'destaque',
            'titulo' => 'Raízes locais',
            'descricao' => 'Equipa com conhecimento profundo.',
            'icone' => 'book-open',
            'ordem' => 1,
            'ativo' => 1,
        ])->assertRedirect();

        $item->refresh();

        $this->assertSame('destaque', $item->tipo);
        $this->assertSame('Equipa com conhecimento profundo.', $item->descricao);
        $this->assertSame('book-open', $item->icone);

        $this->delete(route('admin.sobres-nos.destroy', $item))
            ->assertRedirect();

        $this->assertDatabaseMissing('sobres_nos', ['id' => $item->id]);
    }

    public function test_validacao_por_tipo()
    {
        $this->admin();

        $this->post(route('admin.sobres-nos.store'), [
            'tipo' => 'destaque',
            'titulo' => 'Sem ícone',
        ])->assertSessionHasErrors(['icone']);

        $this->post(route('admin.sobres-nos.store'), [
            'tipo' => 'citacao',
            'titulo' => 'Citação sem texto',
        ])->assertSessionHasErrors(['descricao']);

        $this->assertDatabaseCount('sobres_nos', 0);
    }

    public function test_itens_ativos_sao_partilhados_nas_paginas_do_site()
    {
        SobreNos::create([
            'tipo' => 'cabecalho',
            'titulo' => 'About Us',
            'descricao' => 'Introdução da secção.',
            'ordem' => 0,
            'ativo' => true,
        ]);

        SobreNos::create([
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
                    ->where('sobres_nos.0.titulo', 'About Us')
                    ->where('sobres_nos', function ($itens) {
                        return count($itens) === 1;
                    }),
            );
    }

    public function test_itens_nao_sao_partilhados_no_admin()
    {
        $this->admin();

        SobreNos::create([
            'tipo' => 'destaque',
            'titulo' => 'Raízes locais',
            'descricao' => 'Equipa local.',
            'icone' => 'book-open',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->get(route('admin.sobres-nos.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('sobres_nos', 0));
    }
}
