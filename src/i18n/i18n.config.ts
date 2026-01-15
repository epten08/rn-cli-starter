import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import { STORAGE_KEYS } from '../constants/app.constants';
import { storage } from '../utils/storage';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

//get device language
const deviceLanguage = RNLocalize.getLocales()[0].languageCode || 'en';

// initialising i18n
const initI18n = async () => {
  const savedLanguage = await storage.getItem(STORAGE_KEYS.APP.LANGUAGE);
  const languageToUse = savedLanguage || deviceLanguage;

  await i18n.use(initReactI18next).init({
    resources,
    lng: languageToUse,
    fallbackLng: 'en',
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
  return i18n;
};

export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
  await storage.setItem(STORAGE_KEYS.APP.LANGUAGE, language);
};

export const getCurrentLanguage = () => i18n.language;

export const getAvailableLanguages = () => Object.keys(resources);

export { initI18n };
export default i18n;
