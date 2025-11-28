import searchImg from '@/assets/pngs/search.png';
import EventCard from '@/components/EventCard';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useGetAllEvents } from '@/queries/useGetAllEvents.query';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface HomeEventsProps {
  keyword: string;
  city: string;
}

const HomeEvents = ({ keyword, city }: HomeEventsProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
    isRefetching,
  } = useGetAllEvents({ keyword, city });

  // Flatten pages only for FlatList
  const events = data?.pages?.flatMap((page) => page.events) ?? [];

  return (
    <>
      {(isFetching || isRefetching) && (
        <ActivityIndicator color={Colors.PRIMARY} />
      )}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        refreshControl={
          <RefreshControl
            tintColor={Colors.PRIMARY}
            onRefresh={refetch}
            refreshing={false}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            {!isFetching && !isRefetching && (
              <Image
                source={searchImg}
                style={styles.logo}
                resizeMode="contain"
              />
            )}

            <Text size={14} align="center" color={Colors.TEXT_SECONDARY}>
              {isFetching || isRefetching
                ? t('searching_for_events')
                : t('no_events_found_please_search_using_a_different_ke')}
            </Text>
          </View>
        }
        columnWrapperStyle={styles.columns}
      />
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  columns: {
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 'auto',
    marginBottom: 30,
  },
});
export default HomeEvents;
