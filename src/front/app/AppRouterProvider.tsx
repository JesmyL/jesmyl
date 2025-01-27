import useToast from 'front/complect/modal/useToast';
import { useEffect } from 'react';
import { Route, useParams, useSearchParams } from 'react-router-dom';
import { atom, useAtomSet } from '../complect/atoms';
import IndexMain from '../components/index/parts/main/IndexMain';
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

  useEffect(() => soki.onThrowErrorEvent.listen(errorMessage => toast(errorMessage, { mood: 'ko' })), [toast]);

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
