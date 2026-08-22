import { Link } from '@inertiajs/react';
import { EyeIcon, PencilIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    getItemId: (item: T) => number | string;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    onView?: (item: T) => void;
    getEditHref?: (item: T) => string;
    searchPlaceholder?: string;
    onFilteredChange?: (filtered: T[], searchTerm: string) => void;
}

export function DataTable<T>({
    data,
    columns,
    getItemId,
    onEdit,
    onDelete,
    onView,
    getEditHref,
    searchPlaceholder = 'Pesquisar...',
    onFilteredChange,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');

    const filtered =
        search.trim() === ''
            ? data
            : data.filter((item) =>
                  columns.some((column) => {
                      const rendered = column.render
                          ? column.render(item)
                          : (item as Record<string, unknown>)[column.key];

                      if (
                          typeof rendered !== 'string' &&
                          typeof rendered !== 'number'
                      ) {
                          return false;
                      }

                      return String(rendered)
                          .toLowerCase()
                          .includes(search.toLowerCase());
                  }),
              );

    useEffect(() => {
        onFilteredChange?.(filtered, search);
    }, [filtered, search, onFilteredChange]);

    return (
        <div className="space-y-4">
            <div className="relative max-w-sm">
                <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="pl-8"
                />
            </div>

            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-muted/50">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3 font-medium whitespace-nowrap"
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="w-24 px-4 py-3 font-medium whitespace-nowrap">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="px-4 py-10 text-center text-muted-foreground"
                                >
                                    Nenhum registo encontrado.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item) => (
                                <tr
                                    key={getItemId(item)}
                                    className="border-t hover:bg-muted/30"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="px-4 py-3 align-middle"
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : String(
                                                      (
                                                          item as Record<
                                                              string,
                                                              unknown
                                                          >
                                                      )[column.key] ?? '—',
                                                  )}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            {onView !== undefined && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    aria-label="Visualizar"
                                                    onClick={() => onView(item)}
                                                >
                                                    <EyeIcon />
                                                </Button>
                                            )}
                                            {getEditHref !== undefined ? (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    aria-label="Editar"
                                                    asChild
                                                >
                                                    <Link
                                                        href={getEditHref(item)}
                                                    >
                                                        <PencilIcon />
                                                    </Link>
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    aria-label="Editar"
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <PencilIcon />
                                                </Button>
                                            )}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                aria-label="Eliminar"
                                                onClick={() => onDelete(item)}
                                            >
                                                <Trash2Icon className="text-destructive" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {data.length > 0 && (
                <p className="text-xs text-muted-foreground">
                    {filtered.length} de {data.length} registos
                </p>
            )}
        </div>
    );
}
