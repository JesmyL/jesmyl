import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { schLinkAction } from '#widgets/schedule/links';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ui/App.scss';
import { lastVisitedRouteLsName } from './ui/AppFooter';
import { AppRouter } from './ui/AppRouter';

export const App = () => {
  const [isNeedFirstNavigate, setIsNeedFirstNavigate] = useState(true);

  return (
    <>
      {isNeedFirstNavigate && <FirstNaver onSet={setIsNeedFirstNavigate} />}
      <AppRouter />
    </>
  );
};

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
