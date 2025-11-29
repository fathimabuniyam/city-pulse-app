import Text from '@/components/ui/Text';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconButton, Modal, Portal } from 'react-native-paper';

const EventLocation = ({ event }: any) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const latitude = event?._embedded?.venues?.[0]?.location?.latitude || null;
  const longitude = event?._embedded?.venues?.[0]?.location?.longitude || null;

  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return <Text>N/A</Text>;
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  const renderMapView = (stylesObj: any) => (
    <MapView
      style={[stylesObj, StyleSheet.absoluteFillObject]}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      zoomEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      pitchEnabled={false}
    >
      <Marker coordinate={{ latitude: lat, longitude: lng }} />
    </MapView>
  );

  return (
    <View style={styles.container}>
      <Text size={18} weight={600} mb={10}>
        {t('location')} <Text size={11}>{t('click_to_see_full_view')}</Text>
      </Text>

      <TouchableOpacity onPress={openModal} activeOpacity={0.9}>
        <View style={styles.previewMap}>
          {renderMapView(styles.previewMap)}
        </View>
      </TouchableOpacity>

      {/* View to see it in full modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContainer}
        >
          {renderMapView(styles.fullMap)}

          <IconButton
            icon="close"
            size={28}
            style={styles.closeButton}
            onPress={closeModal}
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  previewMap: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  modalContainer: {
    width: '100%',
    height: '90%',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  fullMap: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});

export default EventLocation;
