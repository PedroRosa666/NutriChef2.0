import { useSettingsStore } from '../store/settings';
import { translations } from '../lib/i18n/translations';

export function useTranslation() {
  const { language } = useSettingsStore();
  console.log('Current language:', language); // Verifique o idioma no console
  return translations[language];
}