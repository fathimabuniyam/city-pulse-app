import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useGetEvent } from '@/queries/useGetEvent.query';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useLocalSearchParams } from 'expo-router';
import { isArray, map } from 'lodash';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import EventClassification from './EventClassification';
import EventDateTime from './EventDateTime';
import EventLocation from './EventLocation';

const EventDetails = () => {
  const { id } = useLocalSearchParams();
  const eventId = isArray(id) ? id[0] : id;
  const { data } = useGetEvent(eventId);
  const event: any = data;

  const venue = event?._embedded?.venues[0];
  const venueName = `${venue?.name || ''}, ${venue?.city?.name || ''}, ${
    venue?.state?.name || ''
  }, ${venue?.country?.name || ''}`;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: event?.images?.[0]?.url }} // replace with your image
          style={styles.headerImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <EventClassification event={event} />

          <Text
            size={20}
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
              color={Colors.RED}
              numberOfLines={1}
              ellipsizeMode="tail"
            />{' '}
            {venueName}
          </Text>

          <EventDateTime event={event} />

          <EventLocation event={event} />

          <View style={styles.divider} />

          <View>
            <Text size={18} weight={600} mb={5}>
              {t('attractions')}
            </Text>
            {map(event?._embedded?.attractions, (item, index) => (
              <Text key={index} size={15}>
                <MaterialDesignIcons name="menu-right-outline" size={13} />
                {item?.name || 'N/A'}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingBottom: 40,
  },
  headerImage: {
    width: '100%',
    minHeight: 250,
    maxHeight: 300,
    justifyContent: 'flex-start', // content at bottom of image
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GRAY,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default EventDetails;
