import { Link, router } from '@inertiajs/react';
import { Languages, LogOut, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { localeLabels, type Locale } from '@/i18n';
import { logout } from '@/routes';
import { update as updateLocale } from '@/routes/locale';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const { t } = useTranslation();

    const handleLocaleChange = (locale: string) => {
        if (locale === user.locale) {
            return;
        }

        router.patch(updateLocale().url, { locale }, { preserveScroll: true });
    };

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        {t('settings')}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex items-center gap-2">
                <Languages className="size-4" />
                {t('language')}
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
                value={user.locale}
                onValueChange={handleLocaleChange}
            >
                {(Object.keys(localeLabels) as Locale[]).map((locale) => (
                    <DropdownMenuRadioItem key={locale} value={locale}>
                        {localeLabels[locale]}
                    </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    {t('logout')}
                </Link>
            </DropdownMenuItem>
        </>
    );
}
