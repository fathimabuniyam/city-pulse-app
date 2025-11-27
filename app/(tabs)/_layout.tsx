import { HapticTab } from '@/components/ui/HapticTab';
import Colors from '@/constants/Colors.constants';
import { t } from '@/i18n';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
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
