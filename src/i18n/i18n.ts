import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import ar from './locales/ar.json';
import en from './locales/en.json';

const translations = { en, ar };

const i18n = new I18n(translations);

// Enable fallbacks if language is not available
i18n.enableFallback = true;

// Detect device locale from Expo
const deviceLocale = Localization.getLocales()[0]?.languageTag || 'en';
i18n.locale = deviceLocale;

type TranslationKeys = keyof typeof en | keyof typeof ar;

export const t = (
  key: TranslationKeys,
  options?: Record<string, any>
): string => i18n.t(key, options);

export default i18n;
