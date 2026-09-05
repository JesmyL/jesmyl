import { defaultQueryClient } from '#basis/config/queryClient';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { routeTree } from '#routes/routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import './App.scss';
import './tw.css';

declare module 'atomaric' {
  interface Register {
    keyPathSeparator: '/';
  }
}

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <AppDialogProvider title="app">
        <RouterProvider router={router} />
      </AppDialogProvider>
      <Toaster
        position="bottom-center"
        style={{ bottom: '100px' }}
      />
    </QueryClientProvider>
  );
};
