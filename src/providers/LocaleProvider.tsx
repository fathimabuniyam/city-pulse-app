import i18n from '@/i18n';
import { LocaleEnum } from '@/types/locale.types';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { I18nManager } from 'react-native';

interface Props {
  children: ReactNode;
}

const LocaleProvider: React.FC<Props> = ({ children }) => {
  // Determine active language once per change
  const activeLocale = useMemo(() => {
    return i18n.locale.startsWith(LocaleEnum.AR)
      ? LocaleEnum.AR
      : LocaleEnum.EN;
  }, [i18n.locale]);

  useEffect(() => {
    // Update i18n locale if needed
    if (i18n.locale !== activeLocale) {
      i18n.locale = activeLocale;
    }

    // Handle RTL layout
    const isRTL = activeLocale === LocaleEnum.AR;
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      // ⚠️ TODO Note: changing RTL direction requires app reload for full effect
      // RNRestart.Restart();
    }
  }, [activeLocale]);

  return <>{children}</>;
};

export default LocaleProvider;
