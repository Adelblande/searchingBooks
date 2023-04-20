import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../../screens/Home';
import { Details } from '../../screens/Details';

const Stack = createStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/" component={Home} />
      <Stack.Screen name="details" component={Details} />
    </Stack.Navigator>
  );
}
