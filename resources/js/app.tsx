import { createInertiaApp, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import i18n from '@/i18n';
import AdminLayout from '@/layouts/admin/layout';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import PortalLayout from '@/layouts/portal-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function LocaleSynchronizer() {
    useEffect(() => {
        return router.on('navigate', (event) => {
            const locale = event.detail.page.props.locale;

            if (typeof locale === 'string' && i18n.language !== locale) {
                void i18n.changeLanguage(locale);
            }
        });
    }, []);

    return null;
}

function syncInitialLocale(): void {
    const locale = document.documentElement.lang;

    if (locale && i18n.language !== locale) {
        void i18n.changeLanguage(locale);
    }
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            case name.startsWith('admin/'):
                return [AppLayout, AdminLayout];
            case name.startsWith('site/'):
                return PortalLayout;
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                <LocaleSynchronizer />
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
syncInitialLocale();
