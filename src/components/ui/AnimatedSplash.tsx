import logoImg from '@/assets/pngs/logo-with-name.png';
import Colors from '@/constants/Colors.constants';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface AnimatedSplashProps {
  onFinish?: () => void;
}

const duration = 2000;

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }).start(async () => {
          setTimeout(async () => {
            await SplashScreen.hideAsync();
            setIsAnimating(false);
            if (onFinish) onFinish();
          }, duration / 2); // optional pause after pop
        });
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (!isAnimating) return null;

  return (
    <View style={[styles.container, { backgroundColor: Colors.WHITE }]}>
      <Animated.Image
        source={logoImg}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
});
