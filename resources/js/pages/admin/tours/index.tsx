import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ToursGruposIndex from '@/pages/admin/tours-grupos';
import ToursPrivadosIndex from '@/pages/admin/tours-privados';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/tours';
import type { TourGrupo, TourPrivado } from '@/types/admin';

export default function Index({
    toursPrivados,
    toursGrupos,
}: {
    toursPrivados: TourPrivado[];
    toursGrupos: TourGrupo[];
}) {
    return (
        <>
            <Head title="Tours" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Tours"
                    description="Gerir as secções 'Private Tours' e 'Group Tours' do portal."
                />

                <Tabs defaultValue="tours-privados" className="-mt-2">
                    <TabsList>
                        <TabsTrigger value="tours-privados">
                            Tours Privados
                        </TabsTrigger>
                        <TabsTrigger value="tours-grupos">
                            Tours em Grupo
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tours-privados">
                        <ToursPrivadosIndex itens={toursPrivados} />
                    </TabsContent>

                    <TabsContent value="tours-grupos">
                        <ToursGruposIndex itens={toursGrupos} />
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
            title: 'Tours',
            href: index(),
        },
    ],
};
