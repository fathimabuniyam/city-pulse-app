import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { StyleSheet, View } from 'react-native';

const EventDateTime = ({ event }: any) => {
  return (
    <View style={styles.row}>
      <View style={styles.date}>
        <MaterialDesignIcons name="calendar" size={22} />
        <View>
          <Text size={13}>{t('date')}</Text>
          <Text color={Colors.PRIMARY} size={15} weight={500}>
            {event?.dates?.start?.localDate || 'N/A'}
          </Text>
        </View>
      </View>
      <View style={styles.date}>
        <MaterialDesignIcons name="clock-outline" size={22} />
        <View>
          <Text size={13}>{t('time')}</Text>
          <Text color={Colors.PRIMARY} size={15} weight={500}>
            {event?.dates?.start?.localTime || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  date: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.BACKGROUND,
    marginTop: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BORDER_GRAY,
    gap: 8,
  },
  spacer: {
    marginLeft: 'auto',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});

export default EventDateTime;
