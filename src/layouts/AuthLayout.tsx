import logoImg from '@/assets/pngs/logo.png';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';

import { Image, StyleSheet, View } from 'react-native';

type Props = {
  type: 'login' | 'signup';
  children: React.ReactNode;
};

const AuthLayout = ({ type, children }: Props) => {
  const texts = {
    login: {
      title: t('welcome_back'),
      description: t('sign_in_to_continue_exploring_events'),
    },
    signup: {
      title: t('sign_up'),
      description: t('create_an_account_to_start_exploring'),
    },
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
      </View>

      <Text size={19} weight={600} mb={5}>
        {texts[type]?.title || ''}
      </Text>
      <Text size={16} color={Colors.TEXT_SECONDARY} mb={10}>
        {texts[type]?.description || ''}
      </Text>

      {children}

      {/* <AuthFooter mt={type === 'login' ? 30 : 5} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 30,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 'auto',
  },
  link: {
    color: Colors.PRIMARY,
  },
});
export default AuthLayout;
