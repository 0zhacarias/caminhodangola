import { Check, ChevronsUpDown, Plus, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Option } from '@/types/admin';

export default function AutocompleteSelect({
    id,
    value,
    onChange,
    options,
    placeholder,
    disabled = false,
    className,
    onCreate,
    createLabel,
    createProcessing = false,
}: {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    onCreate?: (value: string) => void;
    createLabel?: (value: string) => string;
    createProcessing?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selected =
        options.find((option) => String(option.value) === String(value)) ??
        null;

    const filtered = useMemo(() => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label.toLowerCase().includes(normalized) ||
                String(option.value).toLowerCase().includes(normalized),
        );
    }, [options, query]);

    const queryTrimmed = query.trim();

    const showCreate = Boolean(
        onCreate &&
        queryTrimmed &&
        !options.some(
            (option) =>
                option.label === queryTrimmed ||
                String(option.value) === queryTrimmed,
        ),
    );

    const createIndex = filtered.length;
    const totalItems = filtered.length + (showCreate ? 1 : 0);

    const [previousValue, setPreviousValue] = useState(value);

    if (value !== previousValue) {
        setPreviousValue(value);
        setOpen(false);
        setQuery('');
    }

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () =>
            document.removeEventListener('pointerdown', handlePointerDown);
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        searchRef.current?.focus();
    }, [open]);

    useEffect(() => {
        listRef.current
            ?.querySelector('[data-active="true"]')
            ?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    const openList = () => {
        if (disabled) {
            return;
        }

        setQuery('');
        setActiveIndex(0);
        setOpen(true);
    };

    const selectOption = (option: Option) => {
        onChange(String(option.value));
        setOpen(false);
        triggerRef.current?.focus();
    };

    const handleTriggerKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
    ) => {
        if (
            event.key === 'Enter' ||
            event.key === ' ' ||
            event.key === 'ArrowDown'
        ) {
            event.preventDefault();
            openList();
        }
    };

    const handleSearchKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, totalItems - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === 'Enter') {
            event.preventDefault();

            if (showCreate && activeIndex === createIndex) {
                onCreate?.(queryTrimmed);

                return;
            }

            const option = filtered[activeIndex];

            if (option) {
                selectOption(option);
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
        }
    };

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <button
                ref={triggerRef}
                id={id}
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-controls={`${id}-listbox`}
                disabled={disabled}
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={handleTriggerKeyDown}
                className={cn(
                    'flex h-9 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
                    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                    !selected && 'text-muted-foreground',
                )}
            >
                <span className="truncate">
                    {((selected?.label ?? value) || placeholder) ??
                        'Selecionar'}
                </span>
                <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
                    <div className="flex items-center gap-2 border-b px-3">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <Input
                            ref={searchRef}
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setActiveIndex(0);
                            }}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Pesquisar..."
                            className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <ul
                        ref={listRef}
                        id={`${id}-listbox`}
                        role="listbox"
                        className="max-h-60 overflow-auto p-1"
                    >
                        {filtered.length === 0 && !showCreate && (
                            <li className="px-2 py-1.5 text-sm text-muted-foreground">
                                Sem resultados.
                            </li>
                        )}

                        {filtered.map((option, index) => {
                            const isSelected =
                                selected !== null &&
                                String(option.value) === String(selected.value);
                            const isActive = index === activeIndex;

                            return (
                                <li
                                    key={String(option.value)}
                                    role="option"
                                    aria-selected={isSelected}
                                    data-active={isActive || undefined}
                                    onPointerEnter={() => setActiveIndex(index)}
                                    className={cn(
                                        'flex cursor-default items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
                                        isActive &&
                                            'bg-accent text-accent-foreground',
                                    )}
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between gap-2 text-left"
                                        onClick={() => selectOption(option)}
                                    >
                                        <span className="truncate">
                                            {option.label}
                                        </span>
                                        {isSelected && (
                                            <Check className="size-4 shrink-0" />
                                        )}
                                    </button>
                                </li>
                            );
                        })}

                        {showCreate && (
                            <li
                                role="option"
                                aria-selected={false}
                                data-active={
                                    activeIndex === createIndex || undefined
                                }
                                onPointerEnter={() =>
                                    setActiveIndex(createIndex)
                                }
                                className={cn(
                                    'flex cursor-default items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
                                    activeIndex === createIndex &&
                                        'bg-accent text-accent-foreground',
                                )}
                            >
                                <button
                                    type="button"
                                    disabled={createProcessing}
                                    className="flex w-full items-center justify-between gap-2 text-left disabled:opacity-50"
                                    onClick={() => onCreate?.(queryTrimmed)}
                                >
                                    <span className="truncate">
                                        {createProcessing
                                            ? 'A criar...'
                                            : (createLabel?.(queryTrimmed) ??
                                              `Criar "${queryTrimmed}"`)}
                                    </span>
                                    {!createProcessing && (
                                        <Plus className="size-4 shrink-0" />
                                    )}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
