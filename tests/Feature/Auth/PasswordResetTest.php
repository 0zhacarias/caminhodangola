<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Notifications\PasswordInvitationNotification;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Laravel\Fortify\Features;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::resetPasswords());
    }

    public function test_reset_password_link_screen_can_be_rendered()
    {
        $response = $this->get(route('password.request'));

        $response->assertOk();
    }

    public function test_reset_password_link_can_be_requested()
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPasswordNotification::class);
    }

    public function test_password_reset_notification_is_rendered_in_portuguese(): void
    {
        $user = User::factory()->create(['name' => 'Carlos Santos']);
        $mail = (new ResetPasswordNotification('token-de-teste'))->toMail($user);

        $rendered = $mail->render();

        $this->assertStringContainsString('Defina a sua palavra-passe', $rendered);
        $this->assertStringContainsString('Carlos Santos', $rendered);
        $this->assertStringContainsString('Definir palavra-passe', $rendered);
    }

    public function test_pending_invitation_uses_the_invitation_template(): void
    {
        $user = User::factory()->create([
            'name' => 'Carlos Santos',
            'ativo' => false,
            'convite_pendente' => true,
        ]);

        $mail = (new PasswordInvitationNotification('token-de-teste'))->toMail($user);

        $rendered = $mail->render();

        $this->assertStringContainsString('Bem-vindo à equipa', $rendered);
        $this->assertStringContainsString('Foi criado um acesso', $rendered);
        $this->assertStringContainsString('Carlos Santos', $rendered);
    }

    public function test_reset_password_screen_can_be_rendered()
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) {
            $response = $this->get(route('password.reset', $notification->token));

            $response->assertOk();

            return true;
        });
    }

    public function test_password_can_be_reset_with_valid_token()
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) use ($user) {
            $response = $this->post(route('password.update'), [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ]);

            $response
                ->assertSessionHasNoErrors()
                ->assertRedirect(route('login'));

            return true;
        });
    }

    public function test_password_reset_activates_a_pending_invitation()
    {
        Notification::fake();

        $user = User::factory()->create([
            'ativo' => false,
            'convite_pendente' => true,
        ]);

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, PasswordInvitationNotification::class, function ($notification) use ($user) {
            $this->post(route('password.update'), [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ])->assertRedirect(route('login'));

            return true;
        });

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'ativo' => true,
            'convite_pendente' => false,
        ]);
    }

    public function test_password_cannot_be_reset_with_invalid_token(): void
    {
        $user = User::factory()->create();

        $response = $this->post(route('password.update'), [
            'token' => 'invalid-token',
            'email' => $user->email,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
