import IndexOtherRoute from '#app/router-net/index/Other';
import { atom, useAtomSet } from '#shared/lib/atoms';
import { AppName } from '#shared/model/App.model';
import useToast from '#widgets/modal/useToast';
import { useEffect } from 'react';
import { Route, useParams, useSearchParams } from 'react-router-dom';
import { useInitSoki } from '../../02-processes/hooks/+app/useInitSoki';
import { routingApps } from '../../02-processes/routers';
import { soki } from '../../soki';

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
      element={<IndexOtherRoute />}
    />
  </>
);

const appNameAtom = atom<AppName>('cm');

export default AppRouterProvider;
