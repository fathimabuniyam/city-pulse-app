import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Text from '../ui/Text';

const EventCard = ({ event }: any) => {
  const venueName = event?._embedded?.venues[0]?.city?.name;

  const getFormattedDateTime = () => {
    const dateString = event.dates?.start?.dateTime || null;

    if (!dateString) return null;

    const dateObj = new Date(dateString);
    const date = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const formattedDate = `${date}-${month}-${year}`;

    return formattedDate;
  };

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: event?.images?.[0]?.url }}
        resizeMode="cover"
      />

      <Card.Content style={styles.content}>
        <Text
          size={15}
          weight={500}
          numberOfLines={2}
          ellipsizeMode="tail"
          mb={10}
        >
          {event?.name || t('event_name')}
        </Text>

        <Text size={14} color={Colors.TEXT_SECONDARY}>
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
          {getFormattedDateTime()}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
});

export default EventCard;
