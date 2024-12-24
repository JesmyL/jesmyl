import { LinkAppActionFabric } from 'front/complect/link-app-actions';
import { listenSokiEventsForIndex } from 'front/components/index/complect/listenSokiEventsForIndex';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import { lastVisitedRouteLsName } from './AppFooter';
import AppRouter from './AppRouter';

function App() {
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);

  return (
    <>
      {isNeedFirstNavigate && <FirstNaver onSet={setIsNeedFirstNavigate} />}
      <AppRouter />
    </>
  );
}

listenSokiEventsForIndex();

const FirstNaver = ({ onSet }: { onSet: (is: false) => void }) => {
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    LinkAppActionFabric.onHrefData(navigate, window.location.href);
  }, [navigate]);

  useEffect(() => {
    onSet(false);
    if (loc.pathname.length > 1) return;
    navigate(localStorage.getItem(lastVisitedRouteLsName) || '/cm/i');
  }, [loc.pathname.length, navigate, onSet]);

  return <></>;
};

export default App;
