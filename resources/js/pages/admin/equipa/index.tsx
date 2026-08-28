import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CargosIndex from '@/pages/admin/cargos';
import MembrosEquipaIndex from '@/pages/admin/membros-equipa';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/equipa';
import type { Cargo, MembroEquipa } from '@/types/admin';

export default function Index({
    membros,
    cargos,
    visao,
}: {
    membros: MembroEquipa[];
    cargos: Cargo[];
    visao: 'grid' | 'list';
}) {
    return (
        <>
            <Head title="Equipa" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Equipa"
                    description="Gerir os membros da equipa exibidos no site e os cargos disponíveis."
                />

                <Tabs defaultValue="membros" className="-mt-2">
                    <TabsList>
                        <TabsTrigger value="membros">
                            Membros da Equipa
                        </TabsTrigger>
                        <TabsTrigger value="cargos">Cargos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="membros">
                        <MembrosEquipaIndex
                            membros={membros}
                            cargos={cargos}
                            visao={visao}
                        />
                    </TabsContent>

                    <TabsContent value="cargos">
                        <CargosIndex cargos={cargos} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Equipa',
            href: index(),
        },
    ],
};
