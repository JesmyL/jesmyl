import { SetAppRootAnchorNodesContext } from '#basis/lib/App.contexts';
import { ThemeProvider } from '@mui/material';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
import React, { useState } from 'react';
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
  const [rootAnchorNodes, setRootAnchorNodes] = useState<Map<string, React.ReactNode>>(new Map());

  return (
    <>
      <SetAppRootAnchorNodesContext.Provider value={setRootAnchorNodes}>
        <ThemeProvider
          theme={isDarkMode ? muiDarkThemePalette : muiLightThemePalette}
          defaultMode="light"
        >
          <RouterProvider router={router} />
        </ThemeProvider>
      </SetAppRootAnchorNodesContext.Provider>

      {Array.from(rootAnchorNodes.entries()).map(([key, node]) => (
        <React.Fragment key={key}>{node}</React.Fragment>
      ))}
    </>
  );
}

export default App;
