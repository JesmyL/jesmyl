import { atom, useAtomSet } from '#shared/lib/atom';
import { useToast } from '#shared/ui/modal/hooks/useToast';
import { useEffect } from 'react';
import { Route, useParams, useSearchParams } from 'react-router-dom';
import { IndexMain } from '../components/index/parts/main/IndexMain';
import { soki } from '../soki';
import { AppName } from './App.model';
import { routingApps } from './routing-apps';
import { useInitSoki } from './useInitSoki';

const AppRouterProvider = () => {
  const params = useParams();
  const app = routingApps[params.appName as AppName] ?? routingApps['cm'];
  const [searchs] = useSearchParams();
  const setAppName = useAtomSet(appNameAtom);
  const [toastNode, toast] = useToast();

  useEffect(
    () => soki.onTokenInvalidEvent.listen(() => toast('Авторизация не действительна', { mood: 'ko' })),
    [toast],
  );

  useEffect(() => {
    soki.pushCurrentUrl();
    if (app) setAppName(app.appName);
  }, [app, params, searchs, setAppName]);
  useInitSoki();

  return (
    <>
      {app?.router(otherRoute)}
      {toastNode}
    </>
  );
};

const otherRoute = (
  <>
    <Route
      path="!other/*"
      element={<IndexMain />}
    />
  </>
);

const appNameAtom = atom<AppName>('cm');

export default AppRouterProvider;
