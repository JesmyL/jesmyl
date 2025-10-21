import { QueryClient } from '@tanstack/react-query';

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 700000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
