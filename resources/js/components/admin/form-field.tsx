import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function Field({
    id,
    label,
    error,
    className,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Label htmlFor={id}>{label}</Label>
            {children}
            <InputError className="mt-0" message={error} />
        </div>
    );
}

export function BooleanField({
    label,
    checked,
    onCheckedChange,
    className,
}: {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex items-center gap-2 self-start rounded-md border px-3 py-2',
                className,
            )}
        >
            <Checkbox
                checked={checked}
                onCheckedChange={(value) => onCheckedChange(value === true)}
            />
            <Label className="cursor-pointer font-normal">{label}</Label>
        </div>
    );
}
