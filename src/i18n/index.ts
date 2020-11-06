import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esJSON from './es.json';
import enJSON from './en.json';
import { DEFAULT_LANGUAGE } from '../utils/constants';

const resources = {
  es: { translation: esJSON },
  en: { translation: enJSON }
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  keySeparator: '.',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
