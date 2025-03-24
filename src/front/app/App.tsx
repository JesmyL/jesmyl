import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { authIDB } from '$index/db/auth-idb';
import { ThemeProvider } from '@mui/material';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
import { soki } from 'front/soki';
import { routeTree } from 'routeTree.gen';
import './App.scss';
import { muiDarkThemePalette } from './lib/theme/lib/darkPalette';
import { muiLightThemePalette } from './lib/theme/lib/lightPalette';
import './tw.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const isDarkMode = complectIDB.useValue.isDarkMode();

  return (
    <AppDialogProvider title="app">
      <ThemeProvider
        theme={isDarkMode ? muiDarkThemePalette : muiLightThemePalette}
        defaultMode="light"
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppDialogProvider>
  );
};

soki.onTokenInvalidEvent.listen(() => {
  authIDB.remove.auth();
  authIDB.remove.token();
});
