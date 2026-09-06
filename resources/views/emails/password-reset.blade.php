@component('mail::message')
# Defina a sua palavra-passe

Olá, {{ $name }}!

Recebemos um pedido para definir ou alterar a palavra-passe da sua conta no {{ config('app.name') }}.

Clique no botão abaixo para escolher uma nova palavra-passe:

@component('mail::button', ['url' => $url])
Definir palavra-passe
@endcomponent

Este link irá expirar em {{ $expire }} minutos. Por motivos de segurança, o link só pode ser utilizado uma vez.

Se não solicitou esta alteração, pode ignorar este e-mail. A sua palavra-passe não será alterada.

Com os melhores cumprimentos,
{{ config('app.name') }}
@endcomponent
