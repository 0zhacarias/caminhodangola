<?php

namespace Tests\Feature\Admin;

use App\Models\Configuracao;
use App\Models\User;
use App\Services\ConfiguracaoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class RodapeTest extends TestCase
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

    /**
     * @return array<string, string>
     */
    private function headersInertia(): array
    {
        $manifest = public_path('build/manifest.json');

        return [
            'X-Inertia' => 'true',
            'X-Inertia-Version' => file_exists($manifest) ? hash_file('xxh128', $manifest) : '',
        ];
    }

    public function test_pagina_do_rodape_e_renderizada_com_os_valores_existentes()
    {
        $this->admin();

        Configuracao::create(['chave' => 'slogan', 'valor' => 'Viagens diferentes']);
        Configuracao::create(['chave' => 'instagram', 'valor' => 'https://instagram.com/caminhosdangola']);
        Configuracao::create(['chave' => 'instagram_ativo', 'valor' => '1']);

        $this->get(route('admin.rodape.edit'), $this->headersInertia())
            ->assertOk()
            ->assertJsonPath('props.rodape.slogan', 'Viagens diferentes')
            ->assertJsonPath('props.rodape.instagram', 'https://instagram.com/caminhosdangola')
            ->assertJsonPath('props.rodape.instagram_ativo', '1');
    }

    public function test_rodape_pode_ser_atualizado()
    {
        $this->admin();

        $this->get(route('admin.rodape.edit'))->assertOk();

        $this->assertNotNull(Cache::get('configuracoes'));

        $this->put(route('admin.rodape.update'), [
            'slogan' => 'Angola Tourism – Travel different',
            'endereco' => "Rua Comandante Jica\nNamibe - Angola",
            'email_contato' => 'geral@caminhosdangola.com',
            'telefone_principal' => '(+244) 923 469 271',
            'telefone_secundario' => '(+244) 942 381 493',
            'horario_funcionamento' => '08:00 AM – 17:00 PM',
            'instagram' => 'https://instagram.com/caminhosdangola',
            'instagram_ativo' => 1,
            'facebook' => 'https://facebook.com/caminhosdangola',
            'facebook_ativo' => 0,
            'twitter' => 'https://twitter.com/caminhosdangola',
            'twitter_ativo' => 1,
            'youtube' => '',
            'youtube_ativo' => 0,
        ])->assertRedirect();

        $this->assertDatabaseHas('configuracoes', ['chave' => 'slogan', 'valor' => 'Angola Tourism – Travel different']);
        $this->assertDatabaseHas('configuracoes', ['chave' => 'instagram', 'valor' => 'https://instagram.com/caminhosdangola']);
        $this->assertDatabaseHas('configuracoes', ['chave' => 'instagram_ativo', 'valor' => '1']);
        $this->assertDatabaseHas('configuracoes', ['chave' => 'facebook_ativo', 'valor' => '0']);
        $this->assertDatabaseHas('configuracoes', ['chave' => 'youtube', 'valor' => null]);

        $this->assertNull(Cache::get('configuracoes'));

        $valores = app(ConfiguracaoService::class)->todas();

        $this->assertIsArray($valores);
        $this->assertSame('Angola Tourism – Travel different', $valores['slogan']);
    }

    public function test_rodape_rejeita_email_e_urls_invalidos()
    {
        $this->admin();

        $this->put(route('admin.rodape.update'), [
            'email_contato' => 'nao-e-email',
            'instagram' => 'nao-e-url',
        ])->assertSessionHasErrors(['email_contato', 'instagram']);

        $this->assertDatabaseCount('configuracoes', 0);
    }

    public function test_configuracoes_sao_partilhadas_nas_paginas_do_site()
    {
        Configuracao::create(['chave' => 'slogan', 'valor' => 'Slogan partilhado']);

        $this->get(route('home'), $this->headersInertia())
            ->assertOk()
            ->assertJsonPath('props.configuracoes.slogan', 'Slogan partilhado');
    }

    public function test_configuracoes_nao_sao_partilhadas_no_admin()
    {
        $this->admin();

        $this->get(route('admin.rodape.edit'), $this->headersInertia())
            ->assertOk()
            ->assertJsonMissingPath('props.configuracoes.slogan');
    }

    public function test_api_de_configuracoes_mantem_o_formato_de_lista()
    {
        Configuracao::create(['chave' => 'slogan', 'valor' => 'Slogan api']);

        $this->getJson('/api/configuracoes')
            ->assertOk()
            ->assertJsonPath('data.0.chave', 'slogan')
            ->assertJsonPath('data.0.valor', 'Slogan api');
    }
}
