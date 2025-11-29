import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useLocale } from '@/providers/LocaleProvider';
import { LocaleEnum } from '@/types/locale.types';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const ProfileLanguage = () => {
  const { locale, setLocale } = useLocale();
  console.log('locale : ', locale);

  const texts = {
    en: 'English',
    ar: 'Arabic',
  };

  const changeLanguage = () => {
    const nextLang = locale === LocaleEnum.EN ? LocaleEnum.AR : LocaleEnum.EN;
    setLocale(nextLang);
  };

  return (
    <View style={[styles.container, styles.rowAlign]}>
      <MaterialDesignIcons name="earth" size={22} />
      <Text size={15}>{t('language')}</Text>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.rowAlign} onPress={changeLanguage}>
        <MaterialDesignIcons
          name="swap-horizontal"
          size={20}
          color={Colors.PRIMARY}
        />
        <Text color={Colors.PRIMARY}>{texts[locale]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const shadowStyle = Platform.select({
  ios: {
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  android: {
    elevation: 4,
  },
});
const styles = StyleSheet.create({
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: Colors.BACKGROUND,
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 8,
    gap: 8,
    ...shadowStyle,
  },
  spacer: {
    marginLeft: 'auto',
  },
});

export default ProfileLanguage;
