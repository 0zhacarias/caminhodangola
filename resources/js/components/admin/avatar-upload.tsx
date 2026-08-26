import { CameraIcon } from 'lucide-react';
import { useRef } from 'react';
import { useFilePreview } from '@/components/admin/image-upload';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const TIPOS_ACEITES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function iniciais(nome: string): string {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase();
}

export default function AvatarUpload({
    value,
    onChange,
    error,
    nome,
}: {
    value: string | File | null;
    onChange: (ficheiro: File | null) => void;
    error?: string;
    nome?: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const previewUrl = useFilePreview(value);
    const temFoto = previewUrl !== null;

    const receberFicheiro = (lista: FileList | null) => {
        const ficheiro = Array.from(lista ?? []).find((item) =>
            TIPOS_ACEITES.includes(item.type),
        );

        if (ficheiro !== undefined) {
            onChange(ficheiro);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 self-center">
            <div className="relative">
                <Avatar className="size-32 border-2 border-border shadow-sm">
                    <AvatarImage
                        src={previewUrl ?? undefined}
                        alt="Foto do membro"
                    />
                    <AvatarFallback className="bg-muted text-3xl font-semibold text-muted-foreground">
                        {iniciais(nome ?? '') || '?'}
                    </AvatarFallback>
                </Avatar>

                <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    aria-label="Alterar foto"
                    title="Alterar foto"
                    className="absolute -right-1 -bottom-1 size-9 rounded-full border shadow-md"
                    onClick={() => inputRef.current?.click()}
                >
                    <CameraIcon />
                </Button>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={TIPOS_ACEITES.join(',')}
                className="hidden"
                onChange={(event) => {
                    receberFicheiro(event.target.files);
                    event.target.value = '';
                }}
            />

            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => inputRef.current?.click()}
                >
                    {temFoto ? 'Alterar foto' : 'Adicionar foto'}
                </Button>

                {temFoto && (
                    <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="text-destructive"
                        onClick={() => onChange(null)}
                    >
                        Remover
                    </Button>
                )}
            </div>

            <InputError className="mt-0 text-center" message={error} />
        </div>
    );
}
