import PageLoader from '@/components/ui/PageLoader';
import toastConfig from '@/components/ui/Toast';
import { Fonts } from '@/constants/Fonts.constants';
import AuthProvider from '@/providers/AuthProvider';
import ProvidersHub from '@/providers/ProvidersHub';
import { TOAST_POSITION } from '@/utils/Toasts.util';
import { useFonts } from '@expo-google-fonts/jost';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return <PageLoader />;
  }

  return (
    <ProvidersHub>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
      <StatusBar style="auto" />
      <Toast config={toastConfig} position={TOAST_POSITION} />
    </ProvidersHub>
  );
}

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
