import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function storageUrl(value: string): string {
    if (!value) return value;
    if (value.startsWith('http')) {
        return value.replace(/^https?:\/\/[^/]+\/storage\//i, '/storage/');
    }
    return value.startsWith('/storage/') ? value : `/storage/${value}`;
}

export function isGetHref(href: NonNullable<InertiaLinkProps['href']>): boolean {
    if (typeof href === 'string') {
        return true;
    }

    const metodo = (href as { method?: string }).method;

    return metodo === undefined || metodo === 'get';
}
