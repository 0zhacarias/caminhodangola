import type { DetailField } from '@/components/admin/describe-item';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function DetailsDialog({
    title,
    description,
    fields,
    onClose,
    className,
}: {
    title: string;
    description?: string;
    fields: DetailField[];
    onClose: () => void;
    className?: string;
}) {
    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className={cn('sm:max-w-2xl', className)}>
                <DialogHeader>
                    <DialogTitle>Detalhes — {title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                <dl className="grid max-h-[65vh] gap-x-6 gap-y-3 overflow-y-auto p-0.5 sm:grid-cols-2">
                    {fields.map((field, indice) => (
                        <div
                            key={`${field.label}-${indice}`}
                            className={
                                field.fullWidth
                                    ? 'min-w-0 border-b border-dashed pb-2 sm:col-span-2'
                                    : 'min-w-0 border-b border-dashed pb-2'
                            }
                        >
                            <dt className="text-xs font-medium text-muted-foreground">
                                {field.label}
                            </dt>
                            <dd
                                className={
                                    field.fullWidth
                                        ? 'mt-0.5 text-sm break-words whitespace-pre-line'
                                        : 'mt-0.5 text-sm break-words'
                                }
                            >
                                {field.value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
