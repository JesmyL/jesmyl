import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { ThemeProvider } from '@mui/material';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
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

function App() {
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
}

export default App;
