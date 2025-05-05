import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { IconProvider } from '#shared/ui/the-icon/IconProvider';
import { authIDB } from '$index/db/auth-idb';
import { ThemeProvider } from '@mui/material';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { registerReactUseSyncExternalStoreHookFunc } from 'atomaric';
import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
import { soki } from 'front/soki';
import { useSyncExternalStore } from 'react';
import { routeTree } from 'routeTree.gen';
import { BlockStylesProvider } from 'shared/values/cm/block-styles/BlockStylesProvider';
import './App.scss';
import { muiDarkThemePalette } from './lib/theme/lib/darkPalette';
import { muiLightThemePalette } from './lib/theme/lib/lightPalette';
import './tw.css';

registerReactUseSyncExternalStoreHookFunc(useSyncExternalStore);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const isDarkMode = complectIDB.useValue.isDarkMode();

  return (
    <BlockStylesProvider>
      <IconProvider>
        <AppDialogProvider title="app">
          <ThemeProvider
            theme={isDarkMode ? muiDarkThemePalette : muiLightThemePalette}
            defaultMode="light"
          >
            <RouterProvider router={router} />
          </ThemeProvider>
        </AppDialogProvider>
      </IconProvider>
    </BlockStylesProvider>
  );
};

soki.onTokenInvalidEvent.listen(() => {
  authIDB.remove.auth();
  authIDB.remove.token();
});
