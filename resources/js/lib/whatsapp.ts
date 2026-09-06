import { usePage } from '@inertiajs/react';

export const WHATSAPP_NUMERO_PADRAO = '+244923469271';

export const WHATSAPP_MENSAGEM_PADRAO =
    'Hello! I would like more information about your tours.';

type ConfiguracoesPortal = Record<string, string | null>;

/**
 * Limpa um número de telefone para usar num link wa.me.
 */
export function whatsappNumeroLimpo(numero: string): string {
    return numero.replace(/[^\d]/g, '');
}

/**
 * Constrói o link https://wa.me a partir do número e da mensagem.
 */
export function whatsappUrl(numero: string, mensagem: string): string {
    return `https://wa.me/${whatsappNumeroLimpo(numero)}?text=${encodeURIComponent(mensagem)}`;
}

export interface WhatsappContexto {
    numero: string;
    mensagem: string;
    link: (mensagem?: string, numero?: string) => string;
}

/**
 * Lê o número e a mensagem de WhatsApp das configurações partilhadas
 * (chaves `whatsapp_numero` e `whatsapp_mensagem`), com valores padrão.
 * Alterar o número nas Configurações do admin atualiza todo o portal.
 */
export function useWhatsapp(): WhatsappContexto {
    const configuracoes =
        usePage<{ configuracoes?: ConfiguracoesPortal }>().props
            .configuracoes ?? {};

    const numero =
        configuracoes['whatsapp_numero']?.trim() || WHATSAPP_NUMERO_PADRAO;

        console.log( configuracoes['whatsapp_numero']?.trim())
    const mensagem =
        configuracoes['whatsapp_mensagem']?.trim() || WHATSAPP_MENSAGEM_PADRAO;

    return {
        numero,
        mensagem,
        link: (mensagemPersonalizada, numeroPersonalizado) =>
            whatsappUrl(
                numeroPersonalizado ?? numero,
                mensagemPersonalizada ?? mensagem,
            ),
    };
}
