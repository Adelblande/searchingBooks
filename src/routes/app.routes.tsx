import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { Favorites } from '../screens/Favorites';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
