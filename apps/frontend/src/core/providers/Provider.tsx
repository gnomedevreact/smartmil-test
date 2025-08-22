import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Provider = (props: ProviderProps) => {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
