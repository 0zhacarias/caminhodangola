import { Head } from '@inertiajs/react';
import type { Column } from '@/components/admin/data-table';
import PerguntaFrequenteDialog from '@/components/admin/dialogs/pergunta-frequente-dialog';
import ResourcePage from '@/components/admin/resource-page';
import Heading from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoriasPerguntasFrequentesIndex from '@/pages/admin/categorias-perguntas-frequentes';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/perguntas-frequentes';
import type {
    CategoriaPerguntaFrequente,
    Option,
    PerguntaFrequente,
} from '@/types/admin';

const columns: Column<PerguntaFrequente>[] = [
    { key: 'categoria', label: 'Categoria' },
    { key: 'pergunta', label: 'Pergunta' },
    {
        key: 'ativo',
        label: 'Ativa',
        render: (pergunta) => (pergunta.ativo ? 'Sim' : 'Não'),
    },
];

export default function Index({
    perguntas,
    categorias,
    categoriasOpcoes,
}: {
    perguntas: PerguntaFrequente[];
    categorias: CategoriaPerguntaFrequente[];
    categoriasOpcoes: Option[];
}) {
    return (
        <>
            <Head title="Perguntas Frequentes" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Perguntas Frequentes"
                    description="Gerir as perguntas frequentes do site e as suas categorias."
                />

                <Tabs defaultValue="perguntas" className="-mt-2">
                    <TabsList>
                        <TabsTrigger value="perguntas">Perguntas</TabsTrigger>
                        <TabsTrigger value="categorias">Categorias</TabsTrigger>
                    </TabsList>

                    <TabsContent value="perguntas">
                        <ResourcePage
                            title="Perguntas Frequentes"
                            description="Gerir as perguntas frequentes do site."
                            createLabel="Nova pergunta"
                            data={perguntas}
                            columns={columns}
                            getItemId={(item) => item.id}
                            deleteUrl={(item) =>
                                `/admin/perguntas-frequentes/${item.id}`
                            }
                            detailTitle={(item) => item.pergunta}
                            renderDialog={({ item, onClose }) => (
                                <PerguntaFrequenteDialog
                                    item={item}
                                    onClose={onClose}
                                    categorias={categoriasOpcoes}
                                />
                            )}
                        />
                    </TabsContent>

                    <TabsContent value="categorias">
                        <CategoriasPerguntasFrequentesIndex
                            categorias={categorias}
                        />
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
            title: 'Perguntas Frequentes',
            href: index(),
        },
    ],
};
