import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@chakra-ui/core';

export const wrapper = (store) => ({ children }) => (
  <Provider store={store}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);
