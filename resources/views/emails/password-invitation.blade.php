@component('mail::message')
# Bem-vindo à equipa

Olá, {{ $name }}!

Foi criado um acesso para si no painel administrativo do {{ config('app.name') }}.

Defina a sua palavra-passe através do botão abaixo:

@component('mail::button', ['url' => $url])
Definir palavra-passe
@endcomponent

Este convite irá expirar em {{ $expire }} minutos e o link só pode ser utilizado uma vez.

Se não esperava receber este convite, pode ignorar este e-mail.

Com os melhores cumprimentos,
{{ config('app.name') }}
@endcomponent
