import { usePage } from '@inertiajs/react';

export const EMAIL_PADRAO = 'info@caminhosdangola.com';

type ConfiguracoesPortal = Record<string, string | null>;

/**
 * Constrói um link mailto com assunto e corpo opcionais.
 */
export function emailUrl(
    email: string,
    assunto?: string,
    corpo?: string,
): string {
    const params = new URLSearchParams();

    if (assunto) {
        params.set('subject', assunto);
    }

    if (corpo) {
        params.set('body', corpo);
    }

    const query = params.toString();

    return `mailto:${email}${query ? `?${query}` : ''}`;
}

export interface EmailContexto {
    email: string;
    link: (assunto?: string, corpo?: string) => string;
}

/**
 * Lê o email de contacto das configurações partilhadas
 * (chave `email_contato`), com valor padrão.
 * Alterar o email no admin atualiza todo o portal.
 */
export function useEmail(): EmailContexto {
    const configuracoes =
        usePage<{ configuracoes?: ConfiguracoesPortal }>().props
            .configuracoes ?? {};

    const email = configuracoes['email_contato']?.trim() || EMAIL_PADRAO;

    return {
        email,
        link: (assunto, corpo) => emailUrl(email, assunto, corpo),
    };
}
