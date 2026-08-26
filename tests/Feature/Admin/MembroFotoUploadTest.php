<?php

namespace Tests\Feature\Admin;

use App\Models\Cargo;
use App\Models\MembroEquipa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class MembroFotoUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_foto_do_membro_e_atualizada_com_upload_multipart()
    {
        $this->actingAs(User::factory()->create(['email_verified_at' => now()]));

        $cargo = Cargo::create(['nome' => 'Guia', 'ativo' => true]);

        $membro = MembroEquipa::create([
            'nome' => 'Carlos Santos',
            'cargo' => 'Guia',
            'cargo_id' => $cargo->id,
            'foto' => 'http://localhost:8000/storage/membros-equipa/antiga.png',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $ficheiro = UploadedFile::fake()->image('foto.jpg', 200, 200);

        $this->call('POST', route('admin.membros-equipa.update', $membro), [
            'nome' => 'Carlos dos Santos',
            'cargo_id' => $cargo->id,
            'ordem' => 1,
            'ativo' => 1,
            '_method' => 'PUT',
        ], [], ['foto' => $ficheiro])
            ->assertRedirect();

        $membro->refresh();

        $this->assertStringContainsString('membros-equipa/', $membro->foto);
        $this->assertNotSame('http://localhost:8000/storage/membros-equipa/antiga.png', $membro->foto);
    }

    public function test_foto_existente_e_mantida_quando_e_enviada_como_url()
    {
        $this->actingAs(User::factory()->create(['email_verified_at' => now()]));

        $cargo = Cargo::create(['nome' => 'Guia', 'ativo' => true]);

        $membro = MembroEquipa::create([
            'nome' => 'Carlos Santos',
            'cargo' => 'Guia',
            'cargo_id' => $cargo->id,
            'foto' => 'http://localhost:8000/storage/membros-equipa/antiga.png',
            'ordem' => 0,
            'ativo' => true,
        ]);

        $this->put(route('admin.membros-equipa.update', $membro), [
            'nome' => 'Carlos dos Santos',
            'cargo_id' => $cargo->id,
            'foto' => 'http://localhost:8000/storage/membros-equipa/antiga.png',
            'ordem' => 1,
            'ativo' => true,
        ])->assertRedirect();

        $this->assertSame(
            'http://localhost:8000/storage/membros-equipa/antiga.png',
            $membro->refresh()->foto
        );
    }
}
