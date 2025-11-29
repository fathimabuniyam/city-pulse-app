export enum LocaleEnum {
  EN = 'en',
  AR = 'ar',
}

export type LocaleTypes = 'en' | 'ar';

export interface LocaleTextType {
  en: string;
  ar: string;
}

export const LocaleTaskMaster: Record<LocaleTypes, string> = {
  en: 'en',
  ar: 'en',
};
