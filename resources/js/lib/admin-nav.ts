import {
    CalendarCheck,
    ChartColumn,
    CircleHelp,
    HeartHandshake,
    Image as ImageIcon,
    LayoutGrid,
    LayoutTemplate,
    Map,
    Menu,
    MessageSquareQuote,
    MonitorPlay,
    Package,
    PanelBottom,
    Plane,
    Settings,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes';
import { index as configuracoesIndex } from '@/routes/admin/configuracoes';
import { index as depoimentosIndex } from '@/routes/admin/depoimentos';
import { index as diasItinerarioIndex } from '@/routes/admin/dias-itinerario';
import { index as equipaIndex } from '@/routes/admin/equipa';
import { index as estatisticasIndex } from '@/routes/admin/estatisticas';
import { index as galeriasIndex } from '@/routes/admin/galerias';
import { index as itensMenuIndex } from '@/routes/admin/itens-menu';
import { index as pacotesIndex } from '@/routes/admin/pacotes';
import { index as perguntasFrequentesIndex } from '@/routes/admin/perguntas-frequentes';
import { index as reservasIndex } from '@/routes/admin/reservas';
import { edit as rodapeEdit } from '@/routes/admin/rodape';
import { index as seccoesIndex } from '@/routes/admin/seccoes';
import { index as slidesHeroIndex } from '@/routes/admin/slides-hero';
import { index as sobreIndex } from '@/routes/admin/sobre';
import { index as toursPrivadosIndex } from '@/routes/admin/tours-privados';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

export interface NavGroup {
    label: string;
    items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
    {
        label: 'Pacotes',
        items: [
            {
                title: 'Pacotes',
                href: pacotesIndex(),
                icon: Package,
            },
            {
                title: 'Dias de Itinerário',
                href: diasItinerarioIndex(),
                icon: Map,
            },
        ],
    },
    {
        label: 'Conteúdo',
        items: [
            {
                title: 'Slides Hero',
                href: slidesHeroIndex(),
                icon: MonitorPlay,
            },
            {
                title: 'Secções',
                href: seccoesIndex(),
                icon: LayoutTemplate,
            },
            {
                title: 'Estatísticas',
                href: estatisticasIndex(),
                icon: ChartColumn,
            },
            {
                title: 'Galerias',
                href: galeriasIndex(),
                icon: ImageIcon,
            },
            {
                title: 'Depoimentos',
                href: depoimentosIndex(),
                icon: MessageSquareQuote,
            },
            {
                title: 'Perguntas Frequentes',
                href: perguntasFrequentesIndex(),
                icon: CircleHelp,
            },
            {
                title: 'Sobre Nós',
                href: sobreIndex(),
                icon: HeartHandshake,
            },
            {
                title: 'Tours Privados',
                href: toursPrivadosIndex(),
                icon: Plane,
            },
            {
                title: 'Equipa',
                href: equipaIndex(),
                icon: Users,
            },
        ],
    },
    {
        label: 'Sistema',
        items: [
            {
                title: 'Itens de Menu',
                href: itensMenuIndex(),
                icon: Menu,
            },
            {
                title: 'Configurações',
                href: configuracoesIndex(),
                icon: Settings,
            },
            {
                title: 'Rodapé',
                href: rodapeEdit(),
                icon: PanelBottom,
            },
        ],
    },
    {
        label: 'Reservas',
        items: [
            {
                title: 'Reservas',
                href: reservasIndex(),
                icon: CalendarCheck,
            },
        ],
    },
];
