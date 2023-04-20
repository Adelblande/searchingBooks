import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Heart } from 'phosphor-react-native';

import { HomeNavigator } from '../navigators/HomeNavigator';
import { useTheme } from 'styled-components/native';
import { FavoritesNavigator } from '../navigators/FavoritesNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const tabIcon = {
            home: <House color={color} size={30} />,
            favorites: <Heart color={color} size={30} />,
          };

          return tabIcon[route.name];
        },
        tabBarActiveTintColor: theme.colors.secundary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Screen name="home" component={HomeNavigator} />
      <Screen name="favorites" component={FavoritesNavigator} />
    </Navigator>
  );
}
