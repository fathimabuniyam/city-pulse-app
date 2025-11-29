import Colors from '@/constants/Colors.constants';
import { useLocale } from '@/providers/LocaleProvider';
import { LocaleEnum } from '@/types/locale.types';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

export interface TextProps extends RNTextProps {
  weight?: number;
  italic?: boolean;
  color?: TextStyle['color'];
  size?: TextStyle['fontSize'];
  align?: TextStyle['textAlign'];
  lineHeight?: TextStyle['lineHeight'];
  mb?: number;
}

const Text: React.FC<TextProps> = ({
  weight = 400,
  color,
  size,
  align,
  italic = false,
  mb,
  lineHeight,
  style,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  return (
    <RNText
      style={[
        {
          fontFamily: fontFamily(weight, italic, locale),
          color: color ?? Colors.TEXT_PRIMARY,
          fontSize: size ?? 17,
          textAlign: align ?? 'left',
          marginBottom: mb ? mb : 0,
          ...(lineHeight ? { lineHeight } : {}),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export const fontFamily = (
  weight: number,
  italic: boolean = false,
  locale: LocaleEnum,
) => {
  const fontWeight = weight ?? 400;
  const fontFamily = locale === LocaleEnum.AR ? 'Cairo' : 'Jost';
  const fontStyle = italic ? `${fontWeight}i` : fontWeight;
  return `${fontFamily}-${fontStyle}`;
};

export default Text;
