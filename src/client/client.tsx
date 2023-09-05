import { QueryClient, QueryClientProvider } from 'react-query';
import React, { FC } from 'react';

export const client = new QueryClient();

export const Client: FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);
