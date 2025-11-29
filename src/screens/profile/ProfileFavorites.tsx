import EventCard from '@/components/EventCard';
import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useGetFavoriteEvents } from '@/queries/useGetFavoriteEvents.query';
import { useGetFavoriteIds } from '@/queries/useGetFavoriteIds.query';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

const ProfileFavorites = () => {
  const { data: ids } = useGetFavoriteIds();
  const { data, refetch, isFetching, isRefetching } = useGetFavoriteEvents(
    ids || [],
  );

  return (
    <View>
      <Text size={22} color={Colors.PRIMARY} weight={700} mb={10}>
        {t('favorites')}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            tintColor={Colors.PRIMARY}
            onRefresh={refetch}
            refreshing={false}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text size={14} align="center" color={Colors.TEXT_SECONDARY}>
              {isFetching || isRefetching
                ? t('searching_for_events')
                : t('no_favorites_yet')}
            </Text>
          </View>
        }
        columnWrapperStyle={styles.columns}
      />
    </View>
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
});
export default ProfileFavorites;
