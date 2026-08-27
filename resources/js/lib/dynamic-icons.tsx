import {
    BadgeCheck,
    BookOpen,
    Bus,
    Camera,
    Compass,
    Eye,
    Flag,
    Gem,
    Globe,
    Handshake,
    Heart,
    Hotel,
    Leaf,
    MapPin,
    ShieldCheck,
    SlidersHorizontal,
    Smile,
    Sparkles,
    Star,
    Target,
    TimerReset,
    UserRoundSearch,
    Users,
    Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DynamicIconOption {
    value: string;
    label: string;
    Icon: LucideIcon;
}

export const DYNAMIC_ICONS: DynamicIconOption[] = [
    { value: 'map-pin', label: 'Marcador de mapa', Icon: MapPin },
    { value: 'sliders-horizontal', label: 'Ajustes', Icon: SlidersHorizontal },
    { value: 'shield-check', label: 'Escudo verificado', Icon: ShieldCheck },
    { value: 'leaf', label: 'Folha', Icon: Leaf },
    { value: 'users', label: 'Pessoas', Icon: Users },
    { value: 'handshake', label: 'Aperto de mão', Icon: Handshake },
    { value: 'smile', label: 'Sorriso', Icon: Smile },
    { value: 'heart', label: 'Coração', Icon: Heart },
    { value: 'star', label: 'Estrela', Icon: Star },
    { value: 'globe', label: 'Globo', Icon: Globe },
    { value: 'compass', label: 'Bússola', Icon: Compass },
    { value: 'gem', label: 'Gema', Icon: Gem },
    { value: 'badge-check', label: 'Selo verificado', Icon: BadgeCheck },
    { value: 'sparkles', label: 'Brilhos', Icon: Sparkles },
    { value: 'wallet', label: 'Carteira', Icon: Wallet },
    { value: 'camera', label: 'Câmara', Icon: Camera },
    { value: 'bus', label: 'Autocarro', Icon: Bus },
    { value: 'hotel', label: 'Hotel', Icon: Hotel },
    { value: 'book-open', label: 'Livro aberto', Icon: BookOpen },
    { value: 'target', label: 'Alvo', Icon: Target },
    { value: 'eye', label: 'Olho', Icon: Eye },
    { value: 'flag', label: 'Bandeira', Icon: Flag },
    {
        value: 'user-round-search',
        label: 'Pesquisa de pessoa',
        Icon: UserRoundSearch,
    },
    { value: 'timer-reset', label: 'Temporizador', Icon: TimerReset },
];

export function DynamicIcon({
    name,
    className,
}: {
    name?: string | null;
    className?: string;
}) {
    const option = DYNAMIC_ICONS.find((item) => item.value === name);

    if (!option) {
        return null;
    }

    return <option.Icon className={className} />;
}
