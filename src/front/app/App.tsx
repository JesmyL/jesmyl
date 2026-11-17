import { defaultQueryClient } from '#basis/config/queryClient';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { routeTree } from '#routes/routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import { Toaster } from 'sonner';
import './App.scss';
import './tw.css';

declare module 'atomaric' {
  interface Register {
    keyPathSeparator: '/';
  }
}

/**
 * Страницу 404 грузим лениво: роутер создаётся до первой навигации, и тянуть
 * оформленный экран в стартовый бандл незачем.
 */
const NotFoundPage = React.lazy(() =>
  import('$index/pages/NotFoundPage').then(m => ({ default: m.IndexNotFoundPage })),
);

/**
 * `defaultNotFoundComponent` — общий запасной экран для всех маршрутов, у которых нет
 * собственного `notFoundComponent`. Без него вложенные layout-маршруты (cm, bible, ...)
 * при глобальном notFound показывают голый текст "Not Found" от TanStack Router.
 */
const router = createRouter({ routeTree, defaultNotFoundComponent: NotFoundPage });

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
