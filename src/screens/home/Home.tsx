import EventCard from '@/components/EventCard';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useAuth } from '@/providers/AuthProvider';
import { useGetAllEvents } from '@/queries/useGetAllEvents.query';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeSearch from './HomeSearch';

const Home = () => {
  const { user } = useAuth();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('dubai');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetAllEvents({ keyword, city });

  // Flatten pages only for FlatList
  const events = data?.pages?.flatMap((page) => page.events) ?? [];

  console.log('events : ', events);

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

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => <EventCard event={item} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator /> : null
          }
          refreshControl={
            <RefreshControl
              tintColor={Colors.PRIMARY}
              onRefresh={refetch}
              refreshing={isRefetching}
            />
          }
        />
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
