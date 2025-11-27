import { Fonts } from '@/constants/Fonts.constants';
import ProvidersHub from '@/providers/ProvidersHub';
import { useFonts } from '@expo-google-fonts/jost';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ProvidersHub>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        {/* <Stack.Screen
          name="profile"
          options={{
            presentation: 'card',
            title: '',
            headerBackTitle: 'no',
          }}
        /> */}
      </Stack>
      <StatusBar style="auto" />
    </ProvidersHub>
  );
}
