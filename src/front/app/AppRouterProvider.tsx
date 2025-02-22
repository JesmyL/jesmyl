import { atom, useAtomSet } from '#shared/lib/atoms';
import { useToast } from '#shared/ui/modal/useToast';
import { IndexMain } from 'front/components/index/parts/main/IndexMain';
import { soki } from 'front/soki';
import { useEffect } from 'react';
import { Route, useParams, useSearchParams } from 'react-router-dom';
import { useInitSoki } from '../basis/lib/useInitSoki';
import { AppName } from '../basis/model/App.model';
import { routingApps } from './routing-apps';

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
