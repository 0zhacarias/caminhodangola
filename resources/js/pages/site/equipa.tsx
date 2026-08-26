import { Head } from '@inertiajs/react';
import { storageUrl } from '@/lib/utils';
import type { MembroEquipa } from '@/types/site';

interface EquipaProps {
    membros: MembroEquipa[];
}

export default function Equipa({ membros }: EquipaProps) {
    return (
        <>
            <Head title="A Nossa Equipa" />
            <main className="mx-auto w-full max-w-5xl px-6 py-12">
                <h1 className="text-3xl font-bold">A Nossa Equipa</h1>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {membros.map((membro) => (
                        <div
                            key={membro.id}
                            className="rounded-xl border border-sidebar-border p-6 text-center"
                        >
                            {membro.foto && (
                                <img
                                    src={storageUrl(membro.foto)}
                                    alt={membro.nome}
                                    className="mx-auto mb-4 size-24 rounded-full object-cover"
                                />
                            )}
                            <h2 className="font-medium">{membro.nome}</h2>
                            <p className="text-sm text-muted-foreground">
                                {membro.cargo}
                            </p>
                            {membro.bio && (
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    {membro.bio}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
