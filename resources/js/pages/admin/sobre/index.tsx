import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PorquesAngolaIndex from '@/pages/admin/porques-angola';
import PorquesNosIndex from '@/pages/admin/porques-nos';
import SobresNosIndex from '@/pages/admin/sobres-nos';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/sobre';
import type { PorqueAngola, PorqueNos, SobreNos } from '@/types/admin';

export default function Index({
    porquesNos,
    porquesAngola,
    sobresNos,
}: {
    porquesNos: PorqueNos[];
    porquesAngola: PorqueAngola[];
    sobresNos: SobreNos[];
}) {
    return (
        <>
            <Head title="Sobre Nós" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Sobre Nós"
                    description="Gerir as secções 'Porquê Nós', 'Porquê Angola' e 'Sobre Nós' do portal."
                />

                <Tabs defaultValue="porques-nos" className="-mt-2">
                    <TabsList>
                        <TabsTrigger value="porques-nos">
                            Porquê Nós
                        </TabsTrigger>
                        <TabsTrigger value="porques-angola">
                            Porquê Angola
                        </TabsTrigger>
                        <TabsTrigger value="sobres-nos">Sobre Nós</TabsTrigger>
                    </TabsList>

                    <TabsContent value="porques-nos">
                        <PorquesNosIndex itens={porquesNos} />
                    </TabsContent>

                    <TabsContent value="porques-angola">
                        <PorquesAngolaIndex itens={porquesAngola} />
                    </TabsContent>

                    <TabsContent value="sobres-nos">
                        <SobresNosIndex itens={sobresNos} />
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
            title: 'Sobre Nós',
            href: index(),
        },
    ],
};
