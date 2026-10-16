import type { ComponentProps } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { AccountScreen } from '../screens/AccountScreen/AccountScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ServicesScreen } from '../screens/ServicesScreen/ServicesScreen';
import { ShopScreen } from '../screens/ShopScreen/ShopScreen';
import type { TabParamList } from '../types/navigation';
import { AppBottomTabBar } from './AppBottomTabBar';

type IconName = ComponentProps<typeof MaterialDesignIcons>['name'];

const Tab = createBottomTabNavigator<TabParamList>();

function tabIcon(name: IconName, color: string) {
  return <MaterialDesignIcons name={name} size={24} color={color} />;
}

function renderTabBar(props: BottomTabBarProps) {
  return <AppBottomTabBar {...props} />;
}

export function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={renderTabBar}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home',
          tabBarIcon: ({ color }) => tabIcon('home-outline', color),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: 'Services',
          tabBarAccessibilityLabel: 'Services',
          tabBarIcon: ({ color }) => tabIcon('calendar-outline', color),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarAccessibilityLabel: 'Shop',
          tabBarIcon: ({ color }) => tabIcon('shopping-outline', color),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarAccessibilityLabel: 'Account',
          tabBarIcon: ({ color }) => tabIcon('account-outline', color),
        }}
      />
    </Tab.Navigator>
  );
}

export type { TabParamList };
