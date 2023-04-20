import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Favorites } from '../../screens/Favorites';
import { Details } from '../../screens/Details';

const Stack = createStackNavigator();

export function FavoritesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/" component={Favorites} />
      <Stack.Screen name="details" component={Details} />
    </Stack.Navigator>
  );
}
