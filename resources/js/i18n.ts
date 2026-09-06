import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const supportedLocales = ['pt', 'en'] as const;
export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
    pt: 'pt',
    en: 'en',
};

void i18n.use(initReactI18next).init({
    resources: {
        pt: {
            translation: {
                language: 'Idioma',
                home: 'Início',
                reviews: 'Avaliações',
                privateTours: 'Tours privados',
                groupTours: 'Tours de grupo',
                aboutUs: 'Sobre nós',
                gallery: 'Galeria',
                reserve: 'Reservar',
                login: 'Entrar',
                portuguese: 'Português',
                english: 'English',
                settings: 'Definições',
                logout: 'Sair',
            },
        },
        en: {
            translation: {
                language: 'Language',
                home: 'Home',
                reviews: 'Reviews',
                privateTours: 'Private tours',
                groupTours: 'Group tours',
                aboutUs: 'About us',
                gallery: 'Gallery',
                reserve: 'Book now',
                login: 'Log in',
                portuguese: 'Portuguese',
                english: 'English',
                settings: 'Settings',
                logout: 'Log out',
            },
        },
    },
    fallbackLng: 'pt',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
