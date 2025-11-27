import { HapticTab } from '@/components/ui/HapticTab';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import { selectIsLoggedIn } from '@/store/reducers/auth-persist.reducer';
import { URLs } from '@/utils/URLs.util';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn === false) router.replace(URLs.Login);
  }, [isLoggedIn]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              size={28}
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              size={28}
              name={focused ? 'account' : 'account-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
