import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { URLs } from '@/utils/URLs.util';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import Text from '../ui/Text';
import EventCardFavorite from './EventCardFavorite';

const EventCard = ({ event }: any) => {
  const router = useRouter();
  const venueName = event?._embedded?.venues[0]?.city?.name;

  const handleGoToDetails = () => {
    router.push(`${URLs.EventDetails}/${event.id}` as any);
  };

  return (
    <Card style={styles.card} onPress={handleGoToDetails}>
      <View style={styles.coverBox}>
        <Card.Cover
          source={{ uri: event?.images?.[0]?.url }}
          resizeMode="cover"
        />
        <EventCardFavorite eventId={event?.id} />
      </View>

      <Card.Content style={styles.content}>
        <Text
          size={15}
          weight={500}
          numberOfLines={2}
          ellipsizeMode="tail"
          mb={5}
        >
          {event?.name || t('event_name')}
        </Text>

        <Text size={14} color={Colors.TEXT_SECONDARY} mb={4}>
          <MaterialDesignIcons
            name="map-marker-outline"
            size={16}
            color={Colors.TEXT_SECONDARY}
            numberOfLines={1}
            ellipsizeMode="tail"
          />{' '}
          {venueName}
        </Text>

        <Text size={14} color={Colors.TEXT_SECONDARY} mb={5}>
          <MaterialDesignIcons
            name="calendar-outline"
            size={16}
            color={Colors.TEXT_SECONDARY}
          />{' '}
          {event.dates?.start?.localDate || 'N/A'}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    width: '48%',
    backgroundColor: Colors.WHITE,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  coverBox: {
    position: 'relative',
  },
});

export default EventCard;
