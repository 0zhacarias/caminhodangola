import { Trash2Icon, UploadIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Field } from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { cn, storageUrl } from '@/lib/utils';

const TIPOS_ACEITES = ['video/mp4', 'video/webm', 'video/quicktime'];

function filtrarVideos(ficheiros: File[]): File[] {
    return ficheiros.filter((ficheiro) =>
        TIPOS_ACEITES.includes(ficheiro.type),
    );
}

function VideoDropzone({
    id,
    onFiles,
    className,
}: {
    id: string;
    onFiles: (ficheiros: File[]) => void;
    className?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [arrastando, setArrastando] = useState(false);

    const receberFicheiros = (lista: FileList | null) => {
        const ficheiros = filtrarVideos(Array.from(lista ?? []));

        if (ficheiros.length > 0) {
            onFiles(ficheiros);
        }
    };

    return (
        <>
            <button
                id={id}
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    setArrastando(true);
                }}
                onDragLeave={() => setArrastando(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setArrastando(false);
                    receberFicheiros(event.dataTransfer.files);
                }}
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors',
                    arrastando
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/30',
                    className,
                )}
            >
                <UploadIcon className="size-6 text-muted-foreground" />
                <span className="text-sm font-medium">
                    Arraste um vídeo ou clique para selecionar
                </span>
                <span className="text-xs text-muted-foreground">
                    MP4, WebM ou MOV até 100 MB
                </span>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept={TIPOS_ACEITES.join(',')}
                className="hidden"
                onChange={(event) => {
                    receberFicheiros(event.target.files);
                    event.target.value = '';
                }}
            />
        </>
    );
}

export default function VideoUpload({
    id,
    label,
    value,
    onChange,
    error,
    className,
}: {
    id: string;
    label: string;
    value: string | File | null;
    onChange: (ficheiro: File | null) => void;
    error?: string;
    className?: string;
}) {
    const previewUrl = useFilePreview(value);

    return (
        <Field id={id} label={label} error={error} className={className}>
            {previewUrl ? (
                <div className="grid gap-2">
                    <div className="overflow-hidden rounded-lg border bg-slate-900">
                        <video
                            src={previewUrl}
                            controls
                            className="max-h-44 w-full"
                        />
                    </div>

                    <div className="flex items-stretch gap-2">
                        <VideoDropzone
                            id={`${id}-substituir`}
                            onFiles={(ficheiros) =>
                                onChange(ficheiros[0] ?? null)
                            }
                            className="flex-1 py-3"
                        />

                        <Button
                            type="button"
                            variant="outline"
                            className="px-3"
                            aria-label={`Remover ${label.toLowerCase()}`}
                            onClick={() => onChange(null)}
                        >
                            <Trash2Icon className="text-destructive" />
                        </Button>
                    </div>
                </div>
            ) : (
                <VideoDropzone
                    id={id}
                    onFiles={(ficheiros) => onChange(ficheiros[0] ?? null)}
                />
            )}
        </Field>
    );
}

export function useFilePreview(value: string | File | null): string | null {
    const [filePreview, setFilePreview] = useState<string | null>(null);

    useEffect(() => {
        if (!(value instanceof File)) {
            return;
        }

        const leitor = new FileReader();
        let ativo = true;

        leitor.onload = () => {
            if (ativo) {
                setFilePreview(leitor.result as string);
            }
        };

        leitor.readAsDataURL(value);

        return () => {
            ativo = false;
        };
    }, [value]);

    if (value instanceof File) {
        return filePreview;
    }

    return value ? storageUrl(value) : null;
}
