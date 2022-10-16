import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { Routes } from './src/routes/app.routes';
import theme from './src/global/styles/theme';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/auth';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
