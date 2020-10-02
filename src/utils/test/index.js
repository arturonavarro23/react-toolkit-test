import React from 'react';
import { ReactQueryCacheProvider, makeQueryCache } from 'react-query';

export const queryConfig = makeQueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
    },
  },
});

export const wrapper = ({ children }) => (
  <ReactQueryCacheProvider queryCache={queryConfig}>
    {children}
  </ReactQueryCacheProvider>
);
