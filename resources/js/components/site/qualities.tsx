import { usePage } from '@inertiajs/react';
import {
  MapsSquare02Icon,
  TimeQuarterIcon,
  UserGroupIcon,
} from 'hugeicons-react';
import type { Estatistica } from '@/types/site';

const ICONES: Record<string, typeof UserGroupIcon> = {
  'user-group': UserGroupIcon,
  users: UserGroupIcon,
  visitors: UserGroupIcon,
  'maps-square-02': MapsSquare02Icon,
  map: MapsSquare02Icon,
  places: MapsSquare02Icon,
  'time-quarter': TimeQuarterIcon,
  time: TimeQuarterIcon,
  years: TimeQuarterIcon,
};

const PADRAO: Estatistica[] = [
  { id: -1, rotulo: 'Visitors Welcomed', valor: '+500', icone: 'user-group', ordem: 0, ativo: true, created_at: null, updated_at: null },
  { id: -2, rotulo: 'Places to visit', valor: '+30', icone: 'maps-square-02', ordem: 1, ativo: true, created_at: null, updated_at: null },
  { id: -3, rotulo: 'Years in service', valor: `+${new Date().getFullYear() - 2022}`, icone: 'time-quarter', ordem: 2, ativo: true, created_at: null, updated_at: null },
];

export default function Qualities() {
  const estatisticas =
    usePage<{ estatisticas?: Estatistica[] }>().props.estatisticas ?? [];

  const itens = estatisticas.length > 0 ? estatisticas : PADRAO;

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap py-8">
      {itens.map((estatistica) => {
        const Icone = estatistica.icone
          ? (ICONES[estatistica.icone] ?? UserGroupIcon)
          : UserGroupIcon;

        return (
          <div
            key={estatistica.id}
            className="w-48 flex flex-col justify-center items-center border-4 bg-yellow-500/5 border-yellow-600/5 p-2 rounded-xl"
          >
            <Icone size={56} className="text-yellow-500" />
            <h6>{estatistica.rotulo}</h6>
            <h1 className="text-xl font-bold">{estatistica.valor}</h1>
          </div>
        );
      })}
    </div>
  );
}
