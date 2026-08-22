import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function ConfirmDeleteDialog({
    url,
    description,
    onClose,
    preserveState = false,
}: {
    url: string;
    description?: string;
    onClose: () => void;
    preserveState?: boolean;
}) {
    const { delete: destroy, processing } = useForm({});

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        destroy(url, {
            preserveScroll: true,
            preserveState,
            onSuccess: onClose,
            onError: onClose,
        });
    };

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Eliminar registo</DialogTitle>
                    <DialogDescription>
                        {description ??
                            'Tem a certeza que pretende eliminar este registo? Esta ação não pode ser anulada.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit}>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {processing ? 'A eliminar...' : 'Eliminar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
