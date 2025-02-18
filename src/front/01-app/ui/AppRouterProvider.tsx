import { bibleRoutingApp } from '#app/router-configs/bible';
import IndexOtherRoute from '#app/router-net/index/Other';
import { useInitSoki } from '#basis/lib/hooks/+app/useInitSoki';
import { soki } from '#basis/lib/soki';
import { AppName, AppsRoutingAppConfigDict } from '#basis/model/App.model';
import { useToast } from '#shared/ui/modal';
import { atom, useAtomSet } from 'front/08-shared/lib/atoms';
import { useEffect } from 'react';
import { Route, useParams, useSearchParams } from 'react-router-dom';
import { tunerRoutingApp } from '../../components/apps/tuner/tunerRoutingApp';
import { cmRoutingApp } from '../router-configs/cm';

export const routingApps: AppsRoutingAppConfigDict = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
};

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
