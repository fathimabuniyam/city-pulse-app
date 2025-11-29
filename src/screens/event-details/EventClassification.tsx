import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const EventClassification = ({ event }: any) => {
  const segment = event?.classifications?.[0]?.segment?.name;
  const genre = event?.classifications?.[0]?.genre?.name;

  return (
    <View style={styles.row}>
      {segment && (
        <Chip style={[styles.chip, styles.chip1]}>
          <Text color={Colors.WHITE} size={14} lineHeight={17}>
            {segment}
          </Text>
        </Chip>
      )}

      {genre && (
        <Chip style={[styles.chip, styles.chip2]} mode="outlined">
          <Text color={Colors.PRIMARY} size={14} lineHeight={17}>
            {genre}
          </Text>
        </Chip>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  chip: {
    maxHeight: 30,
    padding: 0,
    marginBottom: 10,
    borderRadius: 100,
  },
  chip1: {
    backgroundColor: Colors.PRIMARY,
  },
  chip2: {
    borderColor: Colors.PRIMARY,
  },
});

export default EventClassification;
