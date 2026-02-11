import { useAppSelector } from '@hooks/useRedux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, NotificationsScreen } from '@screens/Main';
import PlaceholderScreen from '@screens/PlaceholderScreen';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import type {
  MainStackParamList,
  MainTabsParamList,
} from '../types/navigation.types';

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createStackNavigator<MainStackParamList>();

// Tab icon component
const TabIcon = ({
  route,
  focused,
  color,
  size,
}: {
  route: { name: string };
  focused: boolean;
  color: string;
  size: number;
}) => {
  let iconName: string;

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Explore':
      iconName = focused ? 'compass' : 'compass-outline';
      break;
    case 'Notifications':
      iconName = focused ? 'notifications' : 'notifications-outline';
      break;
    case 'Account':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'circle';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

// bottom tabs navigator
const MainTabs = () => {
  const notificationBadge = useAppSelector(
    state => state.app.notifications.badge,
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          backgroundColor: '#ffffff',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Explore"
        component={PlaceholderScreen}
        // component={ExploreScreen}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarBadge: notificationBadge > 0 ? notificationBadge : undefined,
        }}
      />
      <Tab.Screen
        name="Account"
        component={PlaceholderScreen}
        // component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

// main stack navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={PlaceholderScreen}
        // component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="Settings"
        component={PlaceholderScreen}
        // component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={PlaceholderScreen}
        // component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
