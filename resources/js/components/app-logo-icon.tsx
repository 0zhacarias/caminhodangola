import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    const { className, ...rest } = props;

    return (
        <img
            src="/logotipo-caminhosdangola.svg"
            alt="Logotipo Caminhos de Angola"

            
            className={cn('h-5 w-auto object-contain', className)}
            {...rest}
        />
    );
}
