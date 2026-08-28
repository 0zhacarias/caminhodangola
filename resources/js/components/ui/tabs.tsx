import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
    value: string;
    setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
    const context = useContext(TabsContext);

    if (context === null) {
        throw new Error('Os componentes de Tabs devem ser usados dentro de <Tabs>');
    }

    return context;
}

export function Tabs({
    defaultValue,
    value,
    onValueChange,
    children,
    className,
}: {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
}) {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const activeValue = value ?? internalValue;

    const setValue = useCallback(
        (next: string) => {
            setInternalValue(next);
            onValueChange?.(next);
        },
        [onValueChange],
    );

    const contextValue = useMemo(
        () => ({ value: activeValue, setValue }),
        [activeValue, setValue],
    );

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={cn('space-y-4', className)}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function TabsTrigger({
    value,
    children,
    className,
}: {
    value: string;
    children: ReactNode;
    className?: string;
}) {
    const { value: activeValue, setValue } = useTabsContext();

    const isActive = activeValue === value;

    return (
        <button
            type="button"
            onClick={() => setValue(value)}
            data-state={isActive ? 'active' : 'inactive'}
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
                isActive && 'bg-background text-foreground shadow',
                className,
            )}
        >
            {children}
        </button>
    );
}

export function TabsContent({
    value,
    children,
    className,
}: {
    value: string;
    children: ReactNode;
    className?: string;
}) {
    const { value: activeValue } = useTabsContext();

    if (activeValue !== value) {
        return null;
    }

    return <div className={cn('mt-4', className)}>{children}</div>;
}
