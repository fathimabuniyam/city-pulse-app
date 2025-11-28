import logoImg from '@/assets/pngs/logo.png';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useAuth } from '@/providers/AuthProvider';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeEvents from './HomeEvents';
import HomeSearch from './HomeSearch';

const Home = () => {
  const { logout } = useAuth();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('Dubai');

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Image
              source={logoImg}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />

            <View>
              <Text
                size={24}
                weight={700}
                color={Colors.PRIMARY}
                mb={-5}
                align="center"
              >
                {t('discover_events')}
              </Text>
              <Text size={13} color={Colors.TEXT_SECONDARY} align="center">
                {t('find_events_in_any_location')}
              </Text>
            </View>

            <TouchableOpacity onPress={logout}>
              <MaterialDesignIcons name="power" size={28} color={Colors.RED} />
            </TouchableOpacity>
          </View>

          <HomeSearch
            keyword={keyword}
            setKeyword={setKeyword}
            city={city}
            setCity={setCity}
          />
        </View>

        <HomeEvents keyword={keyword} city={city} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    borderBottomColor: Colors.BORDER_GRAY,
    borderBottomWidth: 1,
    paddingBottom: 15,
    gap: 5,
  },
});

export default Home;
