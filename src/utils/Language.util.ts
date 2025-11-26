import i18n from '@/i18n';
import { LocaleEnum } from '@/types/locale.types';

// Returns 'en' or 'ar'
export const language = i18n.locale.startsWith(LocaleEnum.AR)
  ? LocaleEnum.AR
  : LocaleEnum.EN;
