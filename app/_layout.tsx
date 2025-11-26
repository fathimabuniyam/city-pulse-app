import ProvidersHub from '@/providers/ProvidersHub';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ProvidersHub>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'card',
            title: '',
            headerBackTitle: 'no',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ProvidersHub>
  );
}
