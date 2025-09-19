import { defaultQueryClient } from '#basis/lib/config/queryClient';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { authIDB } from '$index/db/auth-idb';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { configureAtomaric } from 'atomaric';
import { soki } from 'front/soki';
import { useSyncExternalStore } from 'react';
import { routeTree } from 'routeTree.gen';
import { BlockStylesProvider } from 'shared/values/cm/block-styles/BlockStylesProvider';
import { Toaster } from 'sonner';
import { makeStameskaIconStyledProvider } from 'stameska-icon/provider';
import styled, { css, keyframes } from 'styled-components';
import './App.scss';
import './tw.css';

configureAtomaric({ useSyncExternalStore });

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <StyledIconProvider>
        <BlockStylesProvider>
          <AppDialogProvider title="app">
            <RouterProvider router={router} />
          </AppDialogProvider>
        </BlockStylesProvider>
      </StyledIconProvider>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
};

const StyledIconProvider = makeStameskaIconStyledProvider(styled, css, keyframes);

soki.onTokenInvalidEvent.listen(() => {
  authIDB.remove.auth();
  authIDB.remove.token();
});
