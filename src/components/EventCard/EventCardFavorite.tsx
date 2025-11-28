import Colors from '@/constants/Colors.constants';
import { useGetFavoriteIds } from '@/queries/useGetFavoriteIds.query';
import { useUpdateFavorite } from '@/queries/useUpdateFavorite.query';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface EventCardFavoriteProps {
  eventId: string;
}

const EventCardFavorite = ({ eventId }: EventCardFavoriteProps) => {
  const { data: ids } = useGetFavoriteIds();
  const { mutate: onUpdate, isPending } = useUpdateFavorite();

  const isFavorite = Boolean(ids?.includes(eventId));

  const handleFavorite = () => {
    onUpdate(
      { eventId, isFavorite },
      {
        onSuccess: () => {},
        onError: () => {},
      },
    );
  };
  return (
    <TouchableOpacity
      style={styles.heartBox}
      onPress={handleFavorite}
      disabled={isPending}
    >
      {isPending ? (
        <ActivityIndicator />
      ) : isFavorite ? (
        <MaterialDesignIcons name="heart" color={Colors.RED} size={20} />
      ) : (
        <MaterialDesignIcons
          name="heart-outline"
          size={20}
          color={Colors.WHITE}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heartBox: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#ffffff74',
    borderRadius: '50%',
    padding: 7,
  },
});

export default EventCardFavorite;
