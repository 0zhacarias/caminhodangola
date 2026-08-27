import type { Depoimento } from '@/types/site';

export function Stars({ n }: { n: number }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={`text-yellow-400 ${i < n ? 'opacity-100' : 'opacity-40'}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export function iniciaisDoNome(nome: string): string {
    return nome
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('');
}

export default function DepoimentoCard({
    depoimento,
    variant = 'dark',
}: {
    depoimento: Depoimento;
    variant?: 'dark' | 'light';
}) {
    const dark = variant === 'dark';

    return (
        <div
            className={`rounded-xl p-8 text-left shadow-xl md:p-12 ${
                dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}
        >
            <div className="flex flex-col items-start gap-6 md:flex-row md:justify-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-lg font-semibold text-slate-900">
                    {iniciaisDoNome(depoimento.nome)}
                </div>

                <div className="flex-1">
                    <Stars n={depoimento.avaliacao} />
                    <p className="mt-4 text-lg leading-relaxed max-md:text-sm md:text-xl">
                        {depoimento.mensagem}
                    </p>

                    <div className="mt-6">
                        <p className="font-semibold">{depoimento.nome}</p>
                        <p
                            className={`text-sm ${
                                dark ? 'text-slate-300' : 'text-slate-500'
                            }`}
                        >
                            {depoimento.localizacao}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
