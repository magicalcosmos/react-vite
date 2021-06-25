import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh_CN from './zh-CN';
import en_US from './en-US';
export const defaultNS = 'zh-CN';
export const resources = {
  zh: { 'zh-CN': zh_CN },
  en: { 'en-US': en_US }
} as const;

i18n.use(initReactI18next).init({
  lng: 'zh', // set current language
  ns: ['zh', 'en'],
  defaultNS,
  resources
});
export default i18n;
