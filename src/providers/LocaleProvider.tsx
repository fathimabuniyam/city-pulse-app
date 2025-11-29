import PageLoader from '@/components/ui/PageLoader';
import i18n from '@/i18n';
import { LocaleEnum } from '@/types/locale.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DevSettings, I18nManager } from 'react-native';

interface LocaleContextProps {
  locale: LocaleEnum;
  setLocale: (locale: LocaleEnum) => void;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: LocaleEnum.EN,
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

const LocaleProvider = ({ children }: any) => {
  const [locale, setLocaleState] = useState<LocaleEnum>(LocaleEnum.EN);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load saved language only once on app start
    const loadSavedLocale = async () => {
      try {
        const saved = await AsyncStorage.getItem('app_locale');
        if (saved && saved !== locale) {
          // Only update the state, don't trigger reload during initialization
          i18n.locale = saved as LocaleEnum;
          const isRTL = saved === LocaleEnum.AR;

          if (I18nManager.isRTL !== isRTL) {
            I18nManager.allowRTL(isRTL);
            I18nManager.forceRTL(isRTL);
          }

          setLocaleState(saved as LocaleEnum);
        }
      } catch (error) {
        console.error('Error loading saved locale:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadSavedLocale();
  }, []); // Empty dependency array - runs only once

  const changeLocale = async (newLocale: LocaleEnum) => {
    if (newLocale === locale) return;

    i18n.locale = newLocale;

    const isRTL = newLocale === LocaleEnum.AR;

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }

    await AsyncStorage.setItem('app_locale', newLocale);
    setLocaleState(newLocale);

    // Reload app
    if (__DEV__) {
      // Development
      if (DevSettings?.reload) {
        DevSettings.reload();
      }
    } else {
      // Production
      if (Updates.reloadAsync) {
        await Updates.reloadAsync();
      }
    }
  };

  const value = useMemo(() => ({ locale, setLocale: changeLocale }), [locale]);

  if (!isInitialized) {
    return <PageLoader />;
  }

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
