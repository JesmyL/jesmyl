import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { schLinkAction } from '#widgets/schedule/links';
import { ThemeProvider } from '@mui/material';
import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import AppRouter from './AppRouter';
import { lastVisitedRouteLsName } from './lib/consts';
import { muiDarkThemePalette } from './lib/theme/lib/darkPalette';
import { muiLightThemePalette } from './lib/theme/lib/lightPalette';
import './tw.css';

function App() {
  const isDarkMode = complectIDB.useValue.isDarkMode();
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);

  return (
    <>
      <ThemeProvider
        theme={isDarkMode ? muiDarkThemePalette : muiLightThemePalette}
        defaultMode="light"
      >
        {isNeedFirstNavigate && <FirstNaver onSet={setIsNeedFirstNavigate} />}
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

const FirstNaver = ({ onSet }: { onSet: (is: false) => void }) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const onHrefData = LinkAppActionFabric.useOnHrefData();
  schLinkAction.register();

  useEffect(() => {
    onHrefData(window.location.href);
  }, [navigate, onHrefData]);

  useEffect(() => {
    onSet(false);
    if (loc.pathname.length > 1) return;
    navigate(localStorage.getItem(lastVisitedRouteLsName) || '/cm/i');
  }, [loc.pathname.length, navigate, onSet]);

  return <></>;
};

export default App;
