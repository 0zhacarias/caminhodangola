import { Trash2Icon, UploadIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Field } from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TIPOS_ACEITES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function filtrarImagens(ficheiros: File[]): File[] {
    return ficheiros.filter((ficheiro) =>
        TIPOS_ACEITES.includes(ficheiro.type),
    );
}

export function Dropzone({
    id,
    multiple,
    onFiles,
    className,
}: {
    id: string;
    multiple: boolean;
    onFiles: (ficheiros: File[]) => void;
    className?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [arrastando, setArrastando] = useState(false);

    const receberFicheiros = (lista: FileList | null) => {
        const ficheiros = filtrarImagens(Array.from(lista ?? []));

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
                    Arraste {multiple ? 'imagens' : 'uma imagem'} ou clique para
                    selecionar
                </span>
                <span className="text-xs text-muted-foreground">
                    JPG, PNG, WebP ou GIF até 5 MB
                </span>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept={TIPOS_ACEITES.join(',')}
                multiple={multiple}
                className="hidden"
                onChange={(event) => {
                    receberFicheiros(event.target.files);
                    event.target.value = '';
                }}
            />
        </>
    );
}

export default function ImageUpload({
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
                    <div className="overflow-hidden rounded-lg border">
                        <img
                            src={previewUrl}
                            alt={`Pré-visualização de ${label.toLowerCase()}`}
                            className="h-44 w-full object-cover"
                        />
                    </div>

                    <div className="flex items-stretch gap-2">
                        <Dropzone
                            id={`${id}-substituir`}
                            multiple={false}
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
                <Dropzone
                    id={id}
                    multiple={false}
                    onFiles={(ficheiros) => onChange(ficheiros[0] ?? null)}
                />
            )}
        </Field>
    );
}

export function ImageUploadMultiple({
    id,
    label,
    values,
    onChange,
    error,
}: {
    id: string;
    label: string;
    values: File[];
    onChange: (ficheiros: File[]) => void;
    error?: string;
}) {
    return (
        <Field id={id} label={label} error={error}>
            {values.length > 0 && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {values.map((ficheiro, indice) => (
                        <ImageThumb
                            key={`${ficheiro.name}-${indice}`}
                            ficheiro={ficheiro}
                            onRemove={() =>
                                onChange(
                                    values.filter(
                                        (_, posicao) => posicao !== indice,
                                    ),
                                )
                            }
                        />
                    ))}
                </div>
            )}

            <Dropzone
                id={id}
                multiple
                onFiles={(ficheiros) => onChange([...values, ...ficheiros])}
            />
        </Field>
    );
}

function ImageThumb({
    ficheiro,
    onRemove,
}: {
    ficheiro: File;
    onRemove: () => void;
}) {
    const previewUrl = useFilePreview(ficheiro);

    return (
        <div className="group relative overflow-hidden rounded-lg border">
            <img
                src={previewUrl ?? ''}
                alt={ficheiro.name}
                className="h-20 w-full object-cover"
            />
            <button
                type="button"
                aria-label="Remover imagem"
                onClick={onRemove}
                className="absolute top-1 right-1 rounded-md bg-background/90 p-1 text-destructive opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
                <Trash2Icon className="size-4" />
            </button>
        </div>
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

    return value ?? null;
}
