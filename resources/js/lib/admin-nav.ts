import {
    BadgeCheck,
    CalendarCheck,
    ChartColumn,
    CircleHelp,
    Image as ImageIcon,
    Images,
    LayoutGrid,
    LayoutTemplate,
    Map,
    HeartHandshake,
    Menu,
    MessageSquareQuote,
    MonitorPlay,
    Package,
    PanelBottom,
    Settings,
    Tags,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes';
import { index as cargosIndex } from '@/routes/admin/cargos';
import { index as categoriasIndex } from '@/routes/admin/categorias-pacotes';
import { index as categoriasPerguntasFrequentesIndex } from '@/routes/admin/categorias-perguntas-frequentes';
import { index as configuracoesIndex } from '@/routes/admin/configuracoes';
import { index as depoimentosIndex } from '@/routes/admin/depoimentos';
import { index as diasItinerarioIndex } from '@/routes/admin/dias-itinerario';
import { index as estatisticasIndex } from '@/routes/admin/estatisticas';
import { index as galeriasIndex } from '@/routes/admin/galerias';
import { index as galeriasPacotesIndex } from '@/routes/admin/galerias-pacotes';
import { index as itensMenuIndex } from '@/routes/admin/itens-menu';
import { index as membrosEquipaIndex } from '@/routes/admin/membros-equipa';
import { index as pacotesIndex } from '@/routes/admin/pacotes';
import { index as perguntasFrequentesIndex } from '@/routes/admin/perguntas-frequentes';
import { index as porquesNosIndex } from '@/routes/admin/porques-nos';
import { index as reservasIndex } from '@/routes/admin/reservas';
import { edit as rodapeEdit } from '@/routes/admin/rodape';
import { index as seccoesIndex } from '@/routes/admin/seccoes';
import { index as slidesHeroIndex } from '@/routes/admin/slides-hero';
import { index as sobresNosIndex } from '@/routes/admin/sobres-nos';
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
                title: 'Categorias',
                href: categoriasIndex(),
                icon: Tags,
            },
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
            {
                title: 'Galerias de Pacotes',
                href: galeriasPacotesIndex(),
                icon: Images,
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
                title: 'Categorias de Perguntas',
                href: categoriasPerguntasFrequentesIndex(),
                icon: Tags,
            },
            {
                title: 'Porquê Nós',
                href: porquesNosIndex(),
                icon: HeartHandshake,
            },
            {
                title: 'Sobre Nós',
                href: sobresNosIndex(),
                icon: Users,
            },
            {
                title: 'Membros da Equipa',
                href: membrosEquipaIndex(),
                icon: Users,
            },
            {
                title: 'Cargos',
                href: cargosIndex(),
                icon: BadgeCheck,
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
