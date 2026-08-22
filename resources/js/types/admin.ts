export type * from './site';

export interface Option {
    value: number | string;
    label: string;
}

export interface Reserva {
    id: number;
    nome: string;
    email: string;
    telefone: string | null;
    pacote_id: number | null;
    data_pretendida: string | null;
    numero_viajantes: number;
    mensagem: string | null;
    estado: string;
    pacote?: { id: number; titulo: string } | null;
    created_at: string | null;
    updated_at: string | null;
}

export const reservaEstados = [
    { value: 'new', label: 'Nova' },
    { value: 'confirmed', label: 'Confirmada' },
    { value: 'cancelled', label: 'Cancelada' },
    { value: 'completed', label: 'Concluída' },
] as const;

export function reservaEstadoLabel(estado: string): string {
    return (
        reservaEstados.find((item) => item.value === estado)?.label ?? estado
    );
}
