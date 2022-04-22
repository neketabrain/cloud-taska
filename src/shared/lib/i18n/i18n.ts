import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { locales } from 'shared/config/locales';

const detectorOptions = {
  caches: ['localStorage', 'cookie'],
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupQuerystring: 'lng',
  order: ['localStorage', 'navigator', 'cookie', 'htmlTag', 'querystring', 'path'],
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: detectorOptions,
    defaultNS: 'common',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    resources: locales,
  });

export { i18n };
