import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeEvents from './HomeEvents';
import HomeSearch from './HomeSearch';

const Home = () => {
  const { user } = useAuth();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('dubai');

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{t('discover_events')}</Text>
          <Text>Find events in your location</Text>

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
  header: {
    marginBottom: 20,
  },
  columns: {
    justifyContent: 'space-between',
  },
});

const aa = {
  _embedded: { events: [[Object]] },
  _links: {
    first: { href: '/discovery/v2/events.json?page=0&size=1' },
    last: { href: '/discovery/v2/events.json?page=302030&size=1' },
    next: { href: '/discovery/v2/events.json?page=1&size=1' },
    self: { href: '/discovery/v2/events.json?size=1' },
  },
  page: { number: 0, size: 1, totalElements: 302031, totalPages: 302031 },
};

export default Home;
