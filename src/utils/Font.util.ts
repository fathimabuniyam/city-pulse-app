import { LocaleEnum } from '@/types/locale.types';
import { language } from './Language.util';

export type FontWeightTypes =
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | 300
  | 400
  | 500
  | 600
  | 700;

/**
 * Utility to get font family by weight + italic
 * @param {String|Number} weight "300" | "400" | "500" | "600"
 * @param {Boolean} italic boolean (default false)
 * @example fontFamily(400)
 */
export const fontFamily = (
  weight: FontWeightTypes,
  italic: boolean = false,
) => {
  const fontWeight = weight ?? 400;
  const fontFamily = language === LocaleEnum.EN ? 'Montserrat' : 'Arabic';
  const fontStyle = italic ? `${fontWeight}i` : fontWeight;
  return `${fontFamily}-${fontStyle}`;
};

export const fontFamilyCss = (
  weight: FontWeightTypes,
  italic: boolean = false,
) => {
  const font = fontFamily(weight, italic);
  return { fontFamily: font };
};
