import { LinkAppActionFabric } from 'front/complect/link-app-actions';
import { schLinkAction } from 'front/complect/schedule-widget/links';
import { cmSokiInvocatorBaseClient } from 'front/components/apps/cm/cm-invocator.base';
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
  const onHrefData = LinkAppActionFabric.useOnHrefData(schLinkAction);

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

cmSokiInvocatorBaseClient.$$register();
