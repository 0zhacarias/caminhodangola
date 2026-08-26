import { Link } from '@inertiajs/react';
import { LayoutGridIcon, ListIcon, PlusIcon, PrinterIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment, useCallback, useState } from 'react';
import ConfirmDeleteDialog from '@/components/admin/confirm-delete-dialog';
import { DataTable } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import { describeItem } from '@/components/admin/describe-item';
import type { DetailField } from '@/components/admin/describe-item';
import DetailsDialog from '@/components/admin/details-dialog';
import { printListing } from '@/components/admin/print-listing';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface GridAcoes<T> {
    onView?: (item: T) => void;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
}

interface ResourcePageProps<T> {
    title: string;
    description?: string;
    createLabel?: string;
    createHref?: string;
    editHref?: (item: T) => string;
    data: T[];
    columns: Column<T>[];
    getItemId: (item: T) => number | string;
    deleteUrl: (item: T) => string;
    deleteDescription?: (item: T) => string;
    renderDialog?: (props: {
        item: T | null;
        onClose: () => void;
    }) => ReactNode;
    detailFields?: (item: T) => DetailField[];
    detailTitle?: (item: T) => string;
    detailDialogClassName?: string;
    printable?: boolean;
    gridItem?: (item: T, acoes: GridAcoes<T>, indice: number) => ReactNode;
    gridClassName?: string;
    defaultView?: 'grid' | 'list';
    onViewChange?: (view: 'grid' | 'list') => void;
    onViewItem?: (item: T) => void;
}

export default function ResourcePage<T>({
    title,
    description,
    createLabel,
    createHref,
    editHref,
    data,
    columns,
    getItemId,
    deleteUrl,
    deleteDescription,
    renderDialog,
    detailFields,
    detailTitle,
    detailDialogClassName,
    printable = true,
    gridItem,
    gridClassName,
    defaultView = 'list',
    onViewChange,
    onViewItem,
}: ResourcePageProps<T>) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<T | null>(null);
    const [deleting, setDeleting] = useState<T | null>(null);
    const [viewing, setViewing] = useState<T | null>(null);
    const [filtered, setFiltered] = useState<T[]>(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<'grid' | 'list'>(defaultView);

    const handleFilteredChange = useCallback((rows: T[], term: string) => {
        setFiltered(rows);
        setSearchTerm(term);
    }, []);

    const aoVer = onViewItem ?? setViewing;

    const acoes = {
        onView: aoVer,
        onEdit: (item: T) => {
            setEditing(item);
            setDialogOpen(true);
        },
        onDelete: setDeleting,
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <Heading
                    variant="small"
                    title={title}
                    description={description}
                />

                <div className="flex items-center gap-2">
                    {gridItem !== undefined && (
                        <div className="flex items-center gap-1 rounded-lg border p-1">
                            <Button
                                size="sm"
                                variant={
                                    view === 'grid' ? 'secondary' : 'ghost'
                                }
                                aria-label="Vista em grelha"
                                onClick={() => {
                                    setView('grid');
                                    onViewChange?.('grid');
                                }}
                                className="px-2.5"
                            >
                                <LayoutGridIcon />
                            </Button>
                            <Button
                                size="sm"
                                variant={
                                    view === 'list' ? 'secondary' : 'ghost'
                                }
                                aria-label="Vista em lista"
                                onClick={() => {
                                    setView('list');
                                    onViewChange?.('list');
                                }}
                                className="px-2.5"
                            >
                                <ListIcon />
                            </Button>
                        </div>
                    )}

                    {printable && filtered.length > 0 && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="shrink-0"
                            onClick={() =>
                                printListing({
                                    title,
                                    columns,
                                    data: filtered,
                                    searchTerm,
                                })
                            }
                        >
                            <PrinterIcon />
                            Imprimir
                        </Button>
                    )}

                    {createHref !== undefined ? (
                        <Button size="sm" className="shrink-0" asChild>
                            <Link href={createHref}>
                                <PlusIcon />
                                {createLabel ?? 'Criar'}
                            </Link>
                        </Button>
                    ) : (
                        createLabel !== undefined && (
                            <Button
                                size="sm"
                                className="shrink-0"
                                onClick={() => {
                                    setEditing(null);
                                    setDialogOpen(true);
                                }}
                            >
                                <PlusIcon />
                                {createLabel}
                            </Button>
                        )
                    )}
                </div>
            </div>

            {gridItem !== undefined && view === 'grid' ? (
                <div className="space-y-4">
                    <div
                        className={cn(
                            'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
                            gridClassName,
                        )}
                    >
                        {data.map((item, indice) => (
                            <Fragment key={getItemId(item)}>
                                {gridItem(item, acoes, indice)}
                            </Fragment>
                        ))}
                    </div>

                    {data.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {data.length} registos
                        </p>
                    )}
                </div>
            ) : (
                <DataTable
                    data={data}
                    columns={columns}
                    getItemId={getItemId}
                    getEditHref={editHref}
                    onView={aoVer}
                    onFilteredChange={handleFilteredChange}
                    onEdit={(item) => {
                        setEditing(item);
                        setDialogOpen(true);
                    }}
                    onDelete={setDeleting}
                />
            )}

            {dialogOpen && renderDialog !== undefined && (
                <Fragment key={editing === null ? 'new' : getItemId(editing)}>
                    {renderDialog({
                        item: editing,
                        onClose: () => setDialogOpen(false),
                    })}
                </Fragment>
            )}

            {viewing !== null && (
                <DetailsDialog
                    key={getItemId(viewing)}
                    title={detailTitle?.(viewing) ?? String(getItemId(viewing))}
                    className={detailDialogClassName}
                    fields={
                        detailFields !== undefined
                            ? detailFields(viewing)
                            : describeItem(viewing as object)
                    }
                    onClose={() => setViewing(null)}
                />
            )}

            {deleting !== null && (
                <ConfirmDeleteDialog
                    url={deleteUrl(deleting)}
                    description={deleteDescription?.(deleting)}
                    onClose={() => setDeleting(null)}
                />
            )}
        </div>
    );
}
