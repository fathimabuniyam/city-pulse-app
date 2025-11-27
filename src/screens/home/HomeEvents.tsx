import EventCard from '@/components/EventCard';
import Colors from '@/constants/Colors.constants';
import { useGetAllEvents } from '@/queries/useGetAllEvents.query';
import { FlatList, RefreshControl } from 'react-native';
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
    refetch,
    isRefetching,
  } = useGetAllEvents({ keyword, city });

  // Flatten pages only for FlatList
  const events = data?.pages?.flatMap((page) => page.events) ?? [];

  return (
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
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      refreshControl={
        <RefreshControl
          tintColor={Colors.PRIMARY}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      }
    />
  );
};

export default HomeEvents;
