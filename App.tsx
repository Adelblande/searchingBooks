import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Home } from './src/screens/Home';
import theme from './src/global/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
