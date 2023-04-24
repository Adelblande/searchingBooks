import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import 'react-native-gesture-handler';
import { theme } from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import { UserProvider } from './src/hooks/user';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <UserProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
