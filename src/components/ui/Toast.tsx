import Colors from '@/constants/Colors.constants';
import { StyleSheet, View } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import Text, { TextProps } from './Text';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const titles: TextProps = {
  size: 13,
  weight: 500,
};
const subTitle: TextProps = { size: 13, lineHeight: 20 };

const toastConfig = {
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={styles.wrapper}>
      <View style={[styles.toast, styles.success]}>
        {text1 && (
          <Text color={Colors.GREEN} {...titles}>
            {text1}
          </Text>
        )}
        {text2 && <Text {...subTitle}>{text2}</Text>}
      </View>
    </View>
  ),
  error: ({ text1, text2 }: CustomToastProps) => (
    <View style={styles.wrapper}>
      <View style={[styles.toast, styles.error]}>
        {text1 && (
          <Text color={Colors.RED} {...titles}>
            {text1}
          </Text>
        )}
        {text2 && <Text {...subTitle}>{text2}</Text>}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    borderRadius: 30,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 10,
  },
  toast: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 3,
    borderRadius: 30,
  },
  success: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  error: {
    backgroundColor: Colors.LIGHT_RED,
  },
});

export default toastConfig;
