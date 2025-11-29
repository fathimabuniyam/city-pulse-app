import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useAuth } from '@/providers/AuthProvider';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileFavorites from './ProfileFavorites';
import ProfileLanguage from './ProfileLanguage';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text size={24} weight={700} color={Colors.PRIMARY}>
            {t('my_profile')}
          </Text>

          <TouchableOpacity onPress={logout}>
            <MaterialDesignIcons name="power" size={28} color={Colors.RED} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileBox}>
          <Text mb={-5}>{user?.displayName || 'Anonymous User'}</Text>
          <Text size={13} color={Colors.TEXT_SECONDARY}>
            {user?.email || '-'}
          </Text>
        </View>

        <ProfileLanguage />

        <ProfileFavorites />
      </View>
    </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileBox: {
    padding: 15,
    backgroundColor: Colors.BACKGROUND,
    marginVertical: 20,
    borderRadius: 8,
    gap: 8,
    ...shadowStyle,
  },
});

export default Profile;
