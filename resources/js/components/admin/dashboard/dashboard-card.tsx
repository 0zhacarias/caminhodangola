import { MoreHorizontalIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function DashboardCard({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                'rounded-lg border border-slate-200 bg-white p-4 shadow-sm',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function DashboardCardHeader({
    title,
    action,
    className,
}: {
    title: string;
    action?: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('flex items-center justify-between', className)}>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            {action ?? (
                <MoreHorizontalIcon className="h-5 w-5 text-slate-400" />
            )}
        </div>
    );
}
